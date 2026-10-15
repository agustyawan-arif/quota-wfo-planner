import { useState, useEffect, useMemo, useRef } from 'react';
import PeriodSelector from './PeriodSelector';
import CalendarGrid from './CalendarGrid';
import Legend from './Legend';
import PlannerControls, { type AppTheme } from './PlannerControls';
import ResultsPanel from './ResultsPanel';
import OnboardingHelper from './OnboardingHelper';
import ConfirmDialog from './ConfirmDialog';
import { getDefaultPeriod, getPeriodNavigation, getDaysInPeriod, isWeekend, formatDateStr } from '../utils/dateUtils';
import { getRequiredQuota, autoSelectWFODays, getBaseWfoQuota, type EmployeeGrade, type DayStatuses, type DayStatus } from '../utils/quotaUtils';
import { getEvaluationCycleInfo } from '../utils/evaluationUtils';
import { ID_HOLIDAYS } from '../data/holidays';
import { format, getWeek } from 'date-fns';

function getInitialPeriod() {
  try {
    const saved = localStorage.getItem('wfo-planner-data');
    if (saved) {
      const parsed = JSON.parse(saved);
      if (parsed.settings?.activePeriodStart && parsed.settings?.activePeriodEnd) {
        const s = new Date(parsed.settings.activePeriodStart);
        const e = new Date(parsed.settings.activePeriodEnd);
        if (!isNaN(s.getTime()) && !isNaN(e.getTime())) {
          return { start: s, end: e };
        }
      }
    }
  } catch (e) {
    console.error('Failed to load initial period', e);
  }
  return getDefaultPeriod();
}

function getInitialGrade(): EmployeeGrade {
  try {
    const saved = localStorage.getItem('wfo-planner-data');
    if (saved) return JSON.parse(saved).settings?.grade || 'D-E';
  } catch (e) {}
  return 'D-E';
}

function getSavedOrGeneratedStatuses(
  start: Date,
  end: Date,
  employeeGrade: EmployeeGrade
): DayStatuses {
  const periodKey = `${formatDateStr(start)}_${formatDateStr(end)}`;
  const days = getDaysInPeriod(start, end);
  const totalWorking = days.filter(d => !isWeekend(d)).length;

  try {
    const saved = localStorage.getItem('wfo-planner-data');
    if (saved) {
      const parsed = JSON.parse(saved);
      if (parsed.schedules) {
        let loaded = parsed.schedules[periodKey];

        // Check backward compatibility for old timestamp keys
        if (!loaded) {
          const matchedKey = Object.keys(parsed.schedules).find(k => {
            const ts = Number(k);
            if (!isNaN(ts) && ts > 1000000000000) {
              const d = new Date(ts);
              return formatDateStr(d) === formatDateStr(start);
            }
            return false;
          });
          if (matchedKey) {
            loaded = parsed.schedules[matchedKey];
          }
        }

        if (loaded) {
          if (Array.isArray(loaded)) {
            const migrated: DayStatuses = {};
            loaded.forEach((d: string) => { migrated[d] = 'WFO'; });
            return migrated;
          }
          return loaded;
        }
      }
    }
  } catch (e) {
    console.error('Failed to load saved schedules', e);
  }

  // If not saved yet, auto-generate default plan
  const autoStatuses: DayStatuses = {};
  days.forEach(d => {
    const dateStr = formatDateStr(d);
    if (ID_HOLIDAYS[dateStr]) {
      autoStatuses[dateStr] = 'Holiday';
    }
  });

  const leaveCount = Object.entries(autoStatuses).filter(
    ([dateStr, s]) => s === 'Leave' && !isWeekend(new Date(dateStr))
  ).length;
  const holidayCount = Object.entries(autoStatuses).filter(
    ([dateStr, s]) => s === 'Holiday' && !isWeekend(new Date(dateStr))
  ).length;
  const quota = getRequiredQuota(employeeGrade, totalWorking, leaveCount, holidayCount);

  return autoSelectWFODays(days, quota, employeeGrade, autoStatuses);
}

export type MascotMood = 'happy' | 'cautious' | 'warned';

function getMascotMood(status: 'safe' | 'caution' | 'danger'): MascotMood {
  if (status === 'safe') return 'happy';
  if (status === 'caution') return 'cautious';
  return 'warned';
}

const MASCOT_CONFIG: Record<Exclude<AppTheme, 'default'>, { name: string }> = {
  wfc: { name: 'Barista Cup' },
  wfa: { name: 'Nomad Coconut' },
  wfo: { name: 'Executive Briefcase' },
  halloween: { name: 'Spooky Pumpkin' },
};

const MASCOT_DIALOGUES: Record<Exclude<AppTheme, 'default'>, Record<MascotMood, string>> = {
  wfc: {
    happy: "Aroma kopi mantap, kuota WFO aman terkendali! ☕✨",
    cautious: "Kopinya mulai dingin... jangan kebanyakan bolos ngantor ya! ☕👀",
    warned: "Waduh tumpah! Defisit hari kantor udah lewat batas HR! ☕🚨",
  },
  wfa: {
    happy: "Kerja santai di mana saja, kuota kantor aman! 🌴🥥",
    cautious: "Ombak makin tinggi, perhatikan sisa jatah WFH-mu ya! 🌴⚠️",
    warned: "Badai datang! Batas aman evaluasi 9 hari terlewati! 🥥💥",
  },
  wfo: {
    happy: "Target terpenuhi sempurna, HR tersenyum lebar! 💼🎯",
    cautious: "Briefcase bergetar... kuota aman mulai menipis! 💼📝",
    warned: "Alarm HR bunyi kencang! Kamu masuk zona resiko evaluasi! 💼⚠️",
  },
  halloween: {
    happy: "Mantra kuotamu ampuh, bebas dari kutukan HR! 🎃🔮",
    cautious: "Hawa dingin mendekat... hati-hati jangan lengah! 🎃👻",
    warned: "Kutukan evaluasi bangkit! Batas 9 hari terlanggar! 🎃⚡",
  },
};

export default function WFOPlannerPage() {
  const [theme, setTheme] = useState<AppTheme>(() => {
    try {
      const saved = localStorage.getItem('wfo-planner-data');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.settings?.theme) {
          return parsed.settings.theme;
        }
      }
    } catch (e) {}
    return 'halloween';
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);

    if (theme === 'wfc' || theme === 'wfa' || theme === 'wfo' || theme === 'halloween') {
      const existingPreload = document.querySelector('link[data-bg-preload]');
      if (existingPreload) {
        existingPreload.setAttribute('href', `/backgrounds/${theme}.webp`);
      } else {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'image';
        link.type = 'image/webp';
        link.href = `/backgrounds/${theme}.webp`;
        link.setAttribute('data-bg-preload', 'true');
        document.head.appendChild(link);
      }
    }
  }, [theme]);

  const [period, setPeriod] = useState(getInitialPeriod);
  const currentStart = period.start;
  const currentEnd = period.end;
  
  const [grade, setGrade] = useState<EmployeeGrade>(getInitialGrade);

  const [dayStatuses, setDayStatuses] = useState<DayStatuses>(() =>
    getSavedOrGeneratedStatuses(period.start, period.end, getInitialGrade())
  );
  
  const [dialogConfig, setDialogConfig] = useState<{
    isOpen: boolean;
    title: string;
    message: string;
    onConfirm: () => void;
  } | null>(null);

  const periodDays = useMemo(() => getDaysInPeriod(currentStart, currentEnd), [currentStart, currentEnd]);
  
  // Compute counts from dayStatuses, ignoring weekends for leave/holiday
  const leaveCount = useMemo(() => 
    Object.entries(dayStatuses).filter(([dateStr, s]) => s === 'Leave' && !isWeekend(new Date(dateStr))).length
  , [dayStatuses]);
  
  const holidayCount = useMemo(() => 
    Object.entries(dayStatuses).filter(([dateStr, s]) => s === 'Holiday' && !isWeekend(new Date(dateStr))).length
  , [dayStatuses]);
  
  const wfoCount = useMemo(() => 
    Object.values(dayStatuses).filter(s => s === 'WFO').length
  , [dayStatuses]);
  
  const totalWorkingDays = useMemo(() => 
    periodDays.filter(d => !isWeekend(d)).length
  , [periodDays]);
  
  const requiredQuota = useMemo(() => getRequiredQuota(grade, totalWorkingDays, leaveCount, holidayCount), [grade, totalWorkingDays, leaveCount, holidayCount]);

  const periodKey = `${formatDateStr(currentStart)}_${formatDateStr(currentEnd)}`;

  // Auto-save effect
  useEffect(() => {
    try {
      const saved = localStorage.getItem('wfo-planner-data');
      const parsed = saved ? JSON.parse(saved) : { settings: {}, schedules: {} };
      
      parsed.settings = {
        ...parsed.settings,
        grade,
        theme,
        activePeriodStart: currentStart.toISOString(),
        activePeriodEnd: currentEnd.toISOString()
      };
      parsed.schedules = parsed.schedules || {};
      parsed.schedules[periodKey] = dayStatuses;
      
      localStorage.setItem('wfo-planner-data', JSON.stringify(parsed));
    } catch (e) {
      console.error('Failed to auto-save', e);
    }
  }, [dayStatuses, grade, theme, periodKey, currentStart, currentEnd]);

  const allSavedSchedules = useMemo(() => {
    try {
      const saved = localStorage.getItem('wfo-planner-data');
      if (saved) {
        return JSON.parse(saved).schedules || {};
      }
    } catch (e) {}
    return {};
  }, [dayStatuses, currentStart, currentEnd]);

  const evaluationInfo = useMemo(() => {
    return getEvaluationCycleInfo(
      currentStart,
      currentEnd,
      dayStatuses,
      grade,
      allSavedSchedules
    );
  }, [currentStart, currentEnd, dayStatuses, grade, allSavedSchedules]);

  const currentMood = getMascotMood(evaluationInfo.status);
  const [bubblePinned, setBubblePinned] = useState(false);
  const [isMascotHovered, setIsMascotHovered] = useState(false);
  const [autoShowBubble, setAutoShowBubble] = useState(false);
  const prevMoodRef = useRef<MascotMood>(currentMood);

  // Auto-pop speech bubble when mood changes (e.g. going from safe to caution/warned)
  useEffect(() => {
    if (prevMoodRef.current !== currentMood) {
      prevMoodRef.current = currentMood;
      setAutoShowBubble(true);
      const timer = setTimeout(() => {
        setAutoShowBubble(false);
      }, 4200);
      return () => clearTimeout(timer);
    }
  }, [currentMood]);

  // Preload all 3 mood mascot images for instant switching
  useEffect(() => {
    if (theme !== 'default') {
      (['happy', 'cautious', 'warned'] as MascotMood[]).forEach(m => {
        const img = new Image();
        img.src = `/mascots/${theme}-${m}.webp`;
      });
    }
  }, [theme]);

  // Handlers
  const handleToggleDay = (dateStr: string) => {
    setDayStatuses(prev => {
      const next = { ...prev };
      const current = next[dateStr];
      if (!current) {
        next[dateStr] = 'WFO';
      } else {
        delete next[dateStr];
      }
      return next;
    });
  };

  const handleSetDayStatus = (dateStr: string, status: DayStatus | null) => {
    setDayStatuses(prev => {
      const next = { ...prev };
      if (status === null) {
        delete next[dateStr];
      } else {
        next[dateStr] = status;
      }
      return next;
    });
  };

  const handlePrevPeriod = () => {
    const nav = getPeriodNavigation(currentStart);
    setPeriod(nav.prev);
    setDayStatuses(getSavedOrGeneratedStatuses(nav.prev.start, nav.prev.end, grade));
  };

  const handleNextPeriod = () => {
    const nav = getPeriodNavigation(currentStart);
    setPeriod(nav.next);
    setDayStatuses(getSavedOrGeneratedStatuses(nav.next.start, nav.next.end, grade));
  };

  const handleSelectPeriod = (newStart: Date, newEnd: Date) => {
    setPeriod({ start: newStart, end: newEnd });
    setDayStatuses(getSavedOrGeneratedStatuses(newStart, newEnd, grade));
  };

  const handleReset = () => {
    setDialogConfig({
      isOpen: true,
      title: "Reset this period's plan?",
      message: "This will regenerate suggested WFO dates and clear custom WFO selections, but keep your leaves and holidays.",
      onConfirm: () => {
        executeReset(grade);
        setDialogConfig(null);
      }
    });
  };

  const handleGradeChange = (newGrade: EmployeeGrade) => {
    if (newGrade === grade) return;
    
    setDialogConfig({
      isOpen: true,
      title: "Change Grade & Reset Plan?",
      message: `Changing your grade to ${newGrade} requires recalculating your WFO quota. This will regenerate suggested WFO dates and clear your custom WFO selections.`,
      onConfirm: () => {
        setGrade(newGrade);
        executeReset(newGrade);
        setDialogConfig(null);
      }
    });
  };

  const executeReset = (targetGrade: EmployeeGrade) => {
    
    const baselineStatuses: DayStatuses = {};
    let baselineLeaveCount = 0;
    let baselineHolidayCount = 0;
    
    periodDays.forEach(date => {
      const dateStr = formatDateStr(date);
      const current = dayStatuses[dateStr];
      
      if (current === 'Leave') {
        baselineStatuses[dateStr] = 'Leave';
        if (!isWeekend(date)) baselineLeaveCount++;
      } else if (current === 'Holiday' || ID_HOLIDAYS[dateStr]) {
        baselineStatuses[dateStr] = 'Holiday';
        if (!isWeekend(date)) baselineHolidayCount++;
      }
    });

    const baselineQuota = getRequiredQuota(targetGrade, totalWorkingDays, baselineLeaveCount, baselineHolidayCount);
    setDayStatuses(autoSelectWFODays(periodDays, baselineQuota, targetGrade, baselineStatuses));
  };

  const handleCopySummary = async () => {
    const periodText = `${format(currentStart, 'd MMM')} – ${format(currentEnd, 'd MMM')}`;
    const base = getBaseWfoQuota(grade, totalWorkingDays);
    
    // Group dates by week
    const sortedWfoDates = Object.entries(dayStatuses)
      .filter(([_, s]) => s === 'WFO')
      .map(([d]) => new Date(d))
      .sort((a, b) => a.getTime() - b.getTime());
      
    const grouped: Record<number, Date[]> = {};
    sortedWfoDates.forEach(date => {
      const weekNum = getWeek(date, { weekStartsOn: 1 });
      if (!grouped[weekNum]) grouped[weekNum] = [];
      grouped[weekNum].push(date);
    });

    let wfoText = '';
    Object.values(grouped).forEach((dates, idx) => {
      wfoText += `Week ${idx + 1}:\n`;
      dates.forEach(date => {
        wfoText += `- ${format(date, 'EEEE, d MMM')}\n`;
      });
      wfoText += '\n';
    });
    wfoText = wfoText.trim();
    
    let statusText = '';
    if (wfoCount < requiredQuota) statusText = `Only ${requiredQuota - wfoCount} more office days needed`;
    else if (wfoCount === requiredQuota) statusText = `Quota completed`;
    else statusText = `${wfoCount - requiredQuota} extra office days planned`;

    const evalStatusText = evaluationInfo.status === 'danger'
      ? `🚨 ${evaluationInfo.totalDeficit}/9 missed (Warning issued)`
      : evaluationInfo.status === 'caution'
      ? `⚠️ ${evaluationInfo.totalDeficit}/9 missed (Caution, ${9 - evaluationInfo.totalDeficit} days buffer remaining)`
      : `✅ ${evaluationInfo.totalDeficit}/9 missed (Safe, ${9 - evaluationInfo.totalDeficit} days buffer remaining)`;

    const summary = `WFO Plan
Period: ${periodText}
Grade: ${grade}
Base Quota: ${base} days
Leave: ${leaveCount} day${leaveCount !== 1 ? 's' : ''}
Holidays: ${holidayCount} day${holidayCount !== 1 ? 's' : ''}
Required: ${requiredQuota} days
Planned: ${wfoCount} days
Status: ${statusText}

Evaluation: ${evaluationInfo.name} (${evaluationInfo.dateRangeLabel}) - Month ${evaluationInfo.currentPeriodIndex}/3
Evaluation Status: ${evalStatusText}

Planned WFO dates:
${wfoText || 'None'}`;

    try {
      await navigator.clipboard.writeText(summary);
    } catch (err) {
      console.error('Failed to copy', err);
    }
  };

  const handleExportImage = async () => {
    // Capture the calendar workspace card
    const el = document.querySelector('.calendar-panel') as HTMLElement;
    if (!el) return;
    try {
      // dynamically import html2canvas
      const html2canvas = (await import('html2canvas')).default;
      
      const canvas = await html2canvas(el, {
        scale: 2,
        backgroundColor: '#ffffff',
      });
      
      const image = canvas.toDataURL('image/png');
      const a = document.createElement('a');
      a.href = image;
      a.download = `WFO_Plan_${format(currentStart, 'MMM_yyyy')}.png`;
      a.click();
    } catch (err) {
      console.error('Failed to export image', err);
    }
  };

  return (
    <>
      <div className="theme-bg-container" aria-hidden="true">
        <div className="theme-bg-layer theme-bg-wfc" />
        <div className="theme-bg-layer theme-bg-wfa" />
        <div className="theme-bg-layer theme-bg-wfo" />
        <div className="theme-bg-layer theme-bg-halloween" />
      </div>

      <div className="layout-container">
        {/* Left Column: Setup & Configuration */}
        <div className="card settings-panel">
          <h2 className="text-sm font-semibold mb-4 text-main">Setup & Settings</h2>
          <PlannerControls 
            theme={theme}
            onThemeChange={setTheme}
            grade={grade} 
            setGrade={handleGradeChange} 
            leaveCount={leaveCount}
            holidayCount={holidayCount}
            onReset={handleReset}
            onCopy={handleCopySummary}
            onExport={handleExportImage}
          />
        </div>

        {/* Center Column: Interactive Calendar Workspace */}
        <div className="card calendar-panel">
          <PeriodSelector 
            title={
              theme === 'wfc' ? 'Work From Cafe' :
              theme === 'wfa' ? 'Work From Anywhere' :
              theme === 'wfo' ? 'Work From Office' :
              theme === 'halloween' ? 'Haunted Quota' :
              'WFO Planner'
            }
            start={currentStart} 
            end={currentEnd} 
            onPrev={handlePrevPeriod} 
            onNext={handleNextPeriod} 
            evaluationBadge={`${evaluationInfo.name} (${evaluationInfo.dateRangeLabel}) • Month ${evaluationInfo.currentPeriodIndex}/3`}
          />
          
          <CalendarGrid 
            periodDays={periodDays} 
            dayStatuses={dayStatuses} 
            onToggleDay={handleToggleDay} 
            onSetDayStatus={handleSetDayStatus}
            theme={theme}
          />
          
          <Legend theme={theme} />

          {theme !== 'default' && (
            <div 
              className={`card-mascot-wrapper mood-${currentMood}`}
              onMouseEnter={() => setIsMascotHovered(true)}
              onMouseLeave={() => setIsMascotHovered(false)}
              onClick={() => setBubblePinned(prev => !prev)}
              style={{ cursor: 'pointer', pointerEvents: 'auto' }}
              role="button"
              tabIndex={0}
              aria-label={`${MASCOT_CONFIG[theme]?.name || 'Theme'} mascot, status ${currentMood}`}
            >
              <div 
                className={`mascot-speech-bubble ${isMascotHovered || bubblePinned || autoShowBubble ? 'visible' : ''}`}
                onClick={(e) => {
                  e.stopPropagation();
                  setBubblePinned(false);
                  setAutoShowBubble(false);
                }}
              >
                <span className="mascot-speech-text">
                  {MASCOT_DIALOGUES[theme]?.[currentMood] || "Kuota aman terkendali!"}
                </span>
                <div className="speech-arrow" />
              </div>

              <img 
                key={`${theme}-${currentMood}`}
                src={`/mascots/${theme}-${currentMood}.webp`} 
                alt={`${theme} mascot ${currentMood}`}
                className="card-mascot-img"
              />
            </div>
          )}
        </div>

        {/* Right Column: Overview, Quota & 3-Month Evaluation */}
        <div className="card results-panel-container">
          <h2 className="text-sm font-semibold mb-4 text-main">Overview & Results</h2>
          <ResultsPanel 
            currentStart={currentStart}
            currentEnd={currentEnd}
            grade={grade}
            totalWorkingDays={totalWorkingDays}
            requiredQuota={requiredQuota}
            plannedDays={wfoCount}
            evaluationInfo={evaluationInfo}
            onSelectPeriod={handleSelectPeriod}
          />
        </div>
      </div>
      <OnboardingHelper />
      
      <ConfirmDialog 
        isOpen={!!dialogConfig?.isOpen}
        title={dialogConfig?.title || ''}
        message={dialogConfig?.message || ''}
        onConfirm={() => dialogConfig?.onConfirm()}
        onCancel={() => setDialogConfig(null)}
      />
    </>
  );
}

import { useState, useEffect, useMemo } from 'react';
import PeriodSelector from './PeriodSelector';
import CalendarGrid from './CalendarGrid';
import Legend from './Legend';
import PlannerControls from './PlannerControls';
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

export default function WFOPlannerPage() {
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
        activePeriodStart: currentStart.toISOString(),
        activePeriodEnd: currentEnd.toISOString()
      };
      parsed.schedules = parsed.schedules || {};
      parsed.schedules[periodKey] = dayStatuses;
      
      localStorage.setItem('wfo-planner-data', JSON.stringify(parsed));
    } catch (e) {
      console.error('Failed to auto-save', e);
    }
  }, [dayStatuses, grade, periodKey, currentStart, currentEnd]);

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
      <div className="layout-container">
        {/* Left Column: Setup & Configuration */}
        <div className="card settings-panel">
          <h2 className="text-sm font-semibold mb-4 text-main">Setup & Settings</h2>
          <PlannerControls 
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
          />
          
          <Legend />
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

import { useState, useEffect, useMemo, useRef } from 'react';
import { X } from 'lucide-react';
import PeriodSelector from './PeriodSelector';
import ProgressSummary from './ProgressSummary';
import CalendarGrid from './CalendarGrid';
import Legend from './Legend';
import PlannerControls from './PlannerControls';
import OnboardingHelper from './OnboardingHelper';
import { getDefaultPeriod, getPeriodNavigation, getDaysInPeriod, isWeekend, formatDateStr } from '../utils/dateUtils';
import { getRequiredQuota, autoSelectWFODays, getBaseQuota, type EmployeeGrade, type DayStatuses, type DayStatus } from '../utils/quotaUtils';
import { ID_HOLIDAYS } from '../data/holidays';
import { format, getWeek } from 'date-fns';

export default function WFOPlannerPage() {
  const defaultPeriod = useMemo(() => getDefaultPeriod(), []);
  
  const [currentStart, setCurrentStart] = useState<Date>(defaultPeriod.start);
  const [currentEnd, setCurrentEnd] = useState<Date>(defaultPeriod.end);
  
  const [grade, setGrade] = useState<EmployeeGrade>(() => {
    try {
      const saved = localStorage.getItem('wfo-planner-data');
      if (saved) return JSON.parse(saved).settings?.grade || 'D-E';
    } catch (e) {}
    return 'D-E';
  });

  const [dayStatuses, setDayStatuses] = useState<DayStatuses>({});

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
  
  const requiredQuota = useMemo(() => getRequiredQuota(grade, leaveCount, holidayCount), [grade, leaveCount, holidayCount]);

  const periodKey = currentStart.getTime().toString();
  const [hasLoaded, setHasLoaded] = useState(false);


  // Load effect
  useEffect(() => {
    try {
      const saved = localStorage.getItem('wfo-planner-data');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.schedules && parsed.schedules[periodKey]) {
          let loadedStatuses = parsed.schedules[periodKey];
          
          // Backward compatibility check
          if (Array.isArray(loadedStatuses)) {
            const migrated: DayStatuses = {};
            loadedStatuses.forEach((dateStr: string) => migrated[dateStr] = 'WFO');
            loadedStatuses = migrated;
          }
          
          setDayStatuses(loadedStatuses);
        } else {
          setDayStatuses({});
        }
      } else {
        setDayStatuses({});
      }
    } catch (e) {
      setDayStatuses({});
    }
    setHasLoaded(true);
  }, [periodKey]);

  // Auto-save effect
  useEffect(() => {
    if (!hasLoaded) return;
    try {
      const saved = localStorage.getItem('wfo-planner-data');
      const parsed = saved ? JSON.parse(saved) : { settings: {}, schedules: {} };
      
      parsed.settings = { ...parsed.settings, grade };
      parsed.schedules = parsed.schedules || {};
      parsed.schedules[periodKey] = dayStatuses;
      
      localStorage.setItem('wfo-planner-data', JSON.stringify(parsed));
    } catch (e) {
      console.error('Failed to auto-save', e);
    }
  }, [dayStatuses, grade, periodKey, hasLoaded]);

  // Auto-fill effect
  useEffect(() => {
    if (!hasLoaded) return;
    
    // Only auto-generate if there are no manually set statuses for this period
    const hasManual = Object.keys(dayStatuses).length > 0;
    if (hasManual) return;

    const autoStatuses: DayStatuses = {};
    periodDays.forEach(date => {
      const dateStr = formatDateStr(date);
      if (ID_HOLIDAYS[dateStr]) {
        autoStatuses[dateStr] = 'Holiday';
      }
    });
    
    const mergedLeaveCount = Object.entries(autoStatuses).filter(([dateStr, s]) => s === 'Leave' && !isWeekend(new Date(dateStr))).length;
    const mergedHolidayCount = Object.entries(autoStatuses).filter(([dateStr, s]) => s === 'Holiday' && !isWeekend(new Date(dateStr))).length;
    const mergedQuota = getRequiredQuota(grade, mergedLeaveCount, mergedHolidayCount);
    
    setDayStatuses(autoSelectWFODays(periodDays, mergedQuota, grade, autoStatuses));
  }, [periodKey, grade, periodDays, hasLoaded]);

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
    setCurrentStart(nav.prev.start);
    setCurrentEnd(nav.prev.end);
    setHasLoaded(false);
  };

  const handleNextPeriod = () => {
    const nav = getPeriodNavigation(currentStart);
    setCurrentStart(nav.next.start);
    setCurrentEnd(nav.next.end);
    setHasLoaded(false);
  };

  const handleReset = () => {
    if (!window.confirm("Reset this period's plan?\n\nThis will regenerate suggested WFO dates and clear custom WFO selections, but keep your leaves and holidays.")) {
      return;
    }
    
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

    const baselineQuota = getRequiredQuota(grade, baselineLeaveCount, baselineHolidayCount);
    setDayStatuses(autoSelectWFODays(periodDays, baselineQuota, grade, baselineStatuses));
  };

  const handleCopySummary = async () => {
    const periodText = `${format(currentStart, 'd MMM')} – ${format(currentEnd, 'd MMM')}`;
    const base = getBaseQuota(grade);
    
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

    const summary = `WFO Plan
Period: ${periodText}
Grade: ${grade}
Base Quota: ${base} days
Leave: ${leaveCount} day${leaveCount !== 1 ? 's' : ''}
Holidays: ${holidayCount} day${holidayCount !== 1 ? 's' : ''}
Required: ${requiredQuota} days
Planned: ${wfoCount} days
Status: ${statusText}

Planned WFO dates:
${wfoText || 'None'}`;

    try {
      await navigator.clipboard.writeText(summary);
    } catch (err) {
      console.error('Failed to copy', err);
    }
  };

  const handleExportImage = async () => {
    // Only capture the calendar card, not the whole screen
    const el = document.querySelector('.left-panel') as HTMLElement;
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
      <div className="card left-panel">
        <PeriodSelector 
          start={currentStart} 
          end={currentEnd} 
          onPrev={handlePrevPeriod} 
          onNext={handleNextPeriod} 
        />
        
        <ProgressSummary 
          plannedDays={wfoCount} 
          requiredQuota={requiredQuota} 
        />
        
        <CalendarGrid 
          periodDays={periodDays} 
          dayStatuses={dayStatuses} 
          onToggleDay={handleToggleDay} 
          onSetDayStatus={handleSetDayStatus}
        />
        
        <Legend />
      </div>

      <div className="card right-panel">
        <h2 className="text-sm font-semibold mb-4 text-main">Settings</h2>
        <PlannerControls 
          grade={grade} 
          setGrade={setGrade} 
          leaveCount={leaveCount}
          holidayCount={holidayCount}
          onReset={handleReset}
          onCopy={handleCopySummary}
          onExport={handleExportImage}
        />
      </div>
    </div>
    <OnboardingHelper />
    </>
  );
}

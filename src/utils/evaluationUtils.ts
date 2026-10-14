import { getDaysInPeriod, isWeekend, formatDateStr } from './dateUtils';
import { getRequiredQuota, type EmployeeGrade, type DayStatuses } from './quotaUtils';
import { ID_HOLIDAYS } from '../data/holidays';
import { format, startOfDay } from 'date-fns';

export interface EvaluationPeriodItem {
  start: Date;
  end: Date;
  label: string; // e.g. "Mei – Jun"
  fullLabel: string; // e.g. "16 Mei – 15 Jun"
  key: string;
  isCurrent: boolean;
  requiredQuota: number;
  plannedDays: number;
  deficit: number;
}

export interface EvaluationCycleInfo {
  name: string; // e.g. "Periode Evaluasi 1"
  dateRangeLabel: string; // e.g. "Mei – Agu"
  cycleIndex: number;
  currentPeriodIndex: number; // 1, 2, or 3
  periods: EvaluationPeriodItem[];
  totalDeficit: number;
  maxSafeDeficit: number; // 9
  warningThreshold: number; // 10
  status: 'safe' | 'caution' | 'danger';
}

interface CycleDefinition {
  cycleIndex: number;
  name: string;
  dateRangeLabel: string;
  getMonthOffsets: (baseYear: number) => Array<{ startMonth: number; endMonth: number; startYear: number; endYear: number }>;
}

const CYCLES: Record<number, CycleDefinition> = {
  1: {
    cycleIndex: 1,
    name: 'Evaluation Cycle 1',
    dateRangeLabel: 'May – Aug',
    getMonthOffsets: (y) => [
      { startMonth: 4, endMonth: 5, startYear: y, endYear: y },     // May - Jun
      { startMonth: 5, endMonth: 6, startYear: y, endYear: y },     // Jun - Jul
      { startMonth: 6, endMonth: 7, startYear: y, endYear: y },     // Jul - Aug
    ]
  },
  2: {
    cycleIndex: 2,
    name: 'Evaluation Cycle 2',
    dateRangeLabel: 'Aug – Nov',
    getMonthOffsets: (y) => [
      { startMonth: 7, endMonth: 8, startYear: y, endYear: y },     // Aug - Sep
      { startMonth: 8, endMonth: 9, startYear: y, endYear: y },     // Sep - Oct
      { startMonth: 9, endMonth: 10, startYear: y, endYear: y },    // Oct - Nov
    ]
  },
  3: {
    cycleIndex: 3,
    name: 'Evaluation Cycle 3',
    dateRangeLabel: 'Nov – Feb',
    getMonthOffsets: (y) => [
      { startMonth: 10, endMonth: 11, startYear: y, endYear: y },   // Nov - Dec
      { startMonth: 11, endMonth: 0, startYear: y, endYear: y + 1 }, // Dec - Jan
      { startMonth: 0, endMonth: 1, startYear: y + 1, endYear: y + 1 }, // Jan - Feb
    ]
  },
  4: {
    cycleIndex: 4,
    name: 'Evaluation Cycle 4',
    dateRangeLabel: 'Feb – May',
    getMonthOffsets: (y) => [
      { startMonth: 1, endMonth: 2, startYear: y, endYear: y },     // Feb - Mar
      { startMonth: 2, endMonth: 3, startYear: y, endYear: y },     // Mar - Apr
      { startMonth: 3, endMonth: 4, startYear: y, endYear: y },     // Apr - May
    ]
  }
};

export function getEvaluationCycleInfo(
  currentStart: Date,
  currentEnd: Date,
  currentDayStatuses: DayStatuses,
  grade: EmployeeGrade,
  allSavedSchedules: Record<string, DayStatuses> = {}
): EvaluationCycleInfo {
  const m = currentStart.getMonth();
  const y = currentStart.getFullYear();

  let cycleIndex = 1;
  let baseYear = y;
  let periodIdx = 1;

  if (m >= 4 && m <= 6) {
    cycleIndex = 1;
    periodIdx = m - 4 + 1;
    baseYear = y;
  } else if (m >= 7 && m <= 9) {
    cycleIndex = 2;
    periodIdx = m - 7 + 1;
    baseYear = y;
  } else if (m === 10 || m === 11 || m === 0) {
    cycleIndex = 3;
    if (m === 10) periodIdx = 1;
    else if (m === 11) periodIdx = 2;
    else periodIdx = 3;
    baseYear = m === 0 ? y - 1 : y;
  } else {
    cycleIndex = 4;
    periodIdx = m - 1 + 1;
    baseYear = y;
  }

  const cycleDef = CYCLES[cycleIndex];
  const periodRanges = cycleDef.getMonthOffsets(baseYear);

  const currentKey = `${formatDateStr(currentStart)}_${formatDateStr(currentEnd)}`;

  const periods: EvaluationPeriodItem[] = periodRanges.map((range) => {
    const start = startOfDay(new Date(range.startYear, range.startMonth, 16));
    const end = startOfDay(new Date(range.endYear, range.endMonth, 15));
    const key = `${formatDateStr(start)}_${formatDateStr(end)}`;
    const isCurrent = key === currentKey;

    let statuses: DayStatuses;
    if (isCurrent) {
      statuses = currentDayStatuses;
    } else if (allSavedSchedules[key]) {
      statuses = allSavedSchedules[key];
    } else {
      // Find possible backward-compatible key or auto-generate
      const matchedKey = Object.keys(allSavedSchedules).find(k => {
        const ts = Number(k);
        if (!isNaN(ts) && ts > 1000000000000) {
          const d = new Date(ts);
          return formatDateStr(d) === formatDateStr(start);
        }
        return false;
      });

      if (matchedKey && allSavedSchedules[matchedKey]) {
        statuses = allSavedSchedules[matchedKey];
      } else {
        // Default plan for unvisited period
        const days = getDaysInPeriod(start, end);
        const autoStatuses: DayStatuses = {};
        days.forEach(d => {
          const dStr = formatDateStr(d);
          if (ID_HOLIDAYS[dStr]) autoStatuses[dStr] = 'Holiday';
        });
        const wDays = days.filter(d => !isWeekend(d)).length;
        const hCount = Object.entries(autoStatuses).filter(([dStr, s]) => s === 'Holiday' && !isWeekend(new Date(dStr))).length;
        const q = getRequiredQuota(grade, wDays, 0, hCount);
        statuses = Object.keys(autoStatuses).length > 0 ? autoStatuses : {};
        // If not customized yet, default planned days meet required quota
        statuses = { ...statuses, _isDefault: 'WFO' as any };
        return {
          start,
          end,
          label: `${format(start, 'MMM')} – ${format(end, 'MMM')}`,
          fullLabel: `${format(start, 'd MMM')} – ${format(end, 'd MMM')}`,
          key,
          isCurrent,
          requiredQuota: q,
          plannedDays: q,
          deficit: 0
        };
      }
    }

    const days = getDaysInPeriod(start, end);
    const totalWorking = days.filter(d => !isWeekend(d)).length;
    const leaveCount = Object.entries(statuses).filter(([dStr, s]) => s === 'Leave' && !isWeekend(new Date(dStr))).length;
    const holidayCount = Object.entries(statuses).filter(([dStr, s]) => s === 'Holiday' && !isWeekend(new Date(dStr))).length;
    const requiredQuota = getRequiredQuota(grade, totalWorking, leaveCount, holidayCount);
    const plannedDays = Object.values(statuses).filter(s => s === 'WFO').length;
    const deficit = Math.max(0, requiredQuota - plannedDays);

    return {
      start,
      end,
      label: `${format(start, 'MMM')} – ${format(end, 'MMM')}`,
      fullLabel: `${format(start, 'd MMM')} – ${format(end, 'd MMM')}`,
      key,
      isCurrent,
      requiredQuota,
      plannedDays,
      deficit
    };
  });

  const totalDeficit = periods.reduce((sum, p) => sum + p.deficit, 0);

  let status: 'safe' | 'caution' | 'danger' = 'safe';
  if (totalDeficit >= 10) {
    status = 'danger';
  } else if (totalDeficit >= 7) {
    status = 'caution';
  }

  return {
    name: cycleDef.name,
    dateRangeLabel: cycleDef.dateRangeLabel,
    cycleIndex,
    currentPeriodIndex: periodIdx,
    periods,
    totalDeficit,
    maxSafeDeficit: 9,
    warningThreshold: 10,
    status
  };
}

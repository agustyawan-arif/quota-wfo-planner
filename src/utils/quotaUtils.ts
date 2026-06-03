import { isWeekend, formatDateStr } from './dateUtils';
import { getDay } from 'date-fns';

export type EmployeeGrade = 'A-C' | 'D-E';
export type DayStatus = 'WFO' | 'Leave' | 'Holiday';
export type DayStatuses = Record<string, DayStatus>;

export function getBaseQuota(grade: EmployeeGrade): number {
  return grade === 'A-C' ? 20 : 16;
}

export function getRequiredQuota(grade: EmployeeGrade, leaveCount: number, holidayCount: number): number {
  const base = getBaseQuota(grade);
  return Math.max(0, base - leaveCount - holidayCount);
}

export function autoSelectWFODays(periodDays: Date[], requiredQuota: number, grade: EmployeeGrade, currentStatuses: DayStatuses = {}): DayStatuses {
  const newStatuses = { ...currentStatuses };
  
  // Wipe existing WFO dates before auto-generating
  Object.keys(newStatuses).forEach(dateStr => {
    if (newStatuses[dateStr] === 'WFO') {
      delete newStatuses[dateStr];
    }
  });

  if (requiredQuota <= 0) return newStatuses;

  const workingDays = periodDays.filter(d => {
    const dateStr = formatDateStr(d);
    const isLeaveOrHoliday = newStatuses[dateStr] === 'Leave' || newStatuses[dateStr] === 'Holiday';
    return !isWeekend(d) && !isLeaveOrHoliday;
  });

  let wfoCount = 0;

  if (grade === 'A-C') {
    for (const d of workingDays) {
      if (wfoCount >= requiredQuota) break;
      newStatuses[formatDateStr(d)] = 'WFO';
      wfoCount++;
    }
  } else {
    for (let i = 0; i < workingDays.length; i++) {
      if (wfoCount >= requiredQuota) break;
      const d = workingDays[i];
      const dayOfWeek = getDay(d);
      const remainingQuota = requiredQuota - wfoCount;
      const remainingAvailable = workingDays.length - i;
      
      if (dayOfWeek === 5 && remainingAvailable > remainingQuota) {
        continue;
      }
      
      newStatuses[formatDateStr(d)] = 'WFO';
      wfoCount++;
    }
  }

  return newStatuses;
}

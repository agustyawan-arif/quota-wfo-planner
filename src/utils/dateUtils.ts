import { addMonths, subMonths, setDate, startOfDay, isWeekend as dateFnsIsWeekend, format, eachDayOfInterval } from 'date-fns';

export function getDefaultPeriod(currentDate: Date = new Date()) {
  const normalizedDate = startOfDay(currentDate);
  const day = normalizedDate.getDate();
  
  let start: Date;
  let end: Date;

  if (day < 16) {
    // Previous month 16th to current month 15th
    const prevMonth = subMonths(normalizedDate, 1);
    start = startOfDay(setDate(prevMonth, 16));
    end = startOfDay(setDate(normalizedDate, 15));
  } else {
    // Current month 16th to next month 15th
    const nextMonth = addMonths(normalizedDate, 1);
    start = startOfDay(setDate(normalizedDate, 16));
    end = startOfDay(setDate(nextMonth, 15));
  }

  return { start, end };
}

export function getDaysInPeriod(start: Date, end: Date): Date[] {
  return eachDayOfInterval({ start: startOfDay(start), end: startOfDay(end) });
}

export function isWeekend(date: Date): boolean {
  return dateFnsIsWeekend(date);
}

export function getPeriodNavigation(currentStart: Date) {
  const normalized = startOfDay(currentStart);
  const prevStart = startOfDay(subMonths(normalized, 1));
  const prevEnd = startOfDay(setDate(normalized, 15));
  
  const nextStart = startOfDay(addMonths(normalized, 1));
  const nextEnd = startOfDay(setDate(addMonths(nextStart, 1), 15));
  
  return {
    prev: { start: prevStart, end: prevEnd },
    next: { start: nextStart, end: nextEnd }
  };
}

export function formatDateStr(date: Date): string {
  return format(date, 'yyyy-MM-dd');
}

import { addMonths, subMonths, setDate, isWeekend as dateFnsIsWeekend, format, eachDayOfInterval } from 'date-fns';

export function getDefaultPeriod(currentDate: Date = new Date()) {
  const day = currentDate.getDate();
  
  let start: Date;
  let end: Date;

  if (day < 16) {
    // Previous month 16th to current month 15th
    const prevMonth = subMonths(currentDate, 1);
    start = setDate(prevMonth, 16);
    end = setDate(currentDate, 15);
  } else {
    // Current month 16th to next month 15th
    const nextMonth = addMonths(currentDate, 1);
    start = setDate(currentDate, 16);
    end = setDate(nextMonth, 15);
  }

  return { start, end };
}

export function getDaysInPeriod(start: Date, end: Date): Date[] {
  return eachDayOfInterval({ start, end });
}

export function isWeekend(date: Date): boolean {
  return dateFnsIsWeekend(date);
}

export function getPeriodNavigation(currentStart: Date) {
  const prevStart = subMonths(currentStart, 1);
  const prevEnd = setDate(currentStart, 15);
  
  const nextStart = addMonths(currentStart, 1);
  const nextEnd = setDate(addMonths(nextStart, 1), 15);
  
  return {
    prev: { start: prevStart, end: prevEnd },
    next: { start: nextStart, end: nextEnd }
  };
}

export function formatDateStr(date: Date): string {
  return format(date, 'yyyy-MM-dd');
}

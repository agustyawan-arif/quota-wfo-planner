import { useState, useEffect } from 'react';
import { getDay, format, isToday } from 'date-fns';
import { isWeekend, formatDateStr } from '../utils/dateUtils';
import type { DayStatus, DayStatuses } from '../utils/quotaUtils';
import { ID_HOLIDAYS } from '../data/holidays';
import './CalendarGrid.css';

interface CalendarGridProps {
  periodDays: Date[];
  dayStatuses: DayStatuses;
  onToggleDay: (dateStr: string) => void;
  onSetDayStatus: (dateStr: string, status: DayStatus | null) => void;
}

const DAYS_OF_WEEK = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];

export default function CalendarGrid({ periodDays, dayStatuses, onToggleDay, onSetDayStatus }: CalendarGridProps) {
  const [menuPos, setMenuPos] = useState<{ x: number, y: number, dateStr: string } | null>(null);

  // Close menu on scroll or resize
  useEffect(() => {
    const closeMenu = () => setMenuPos(null);
    window.addEventListener('scroll', closeMenu);
    window.addEventListener('resize', closeMenu);
    return () => {
      window.removeEventListener('scroll', closeMenu);
      window.removeEventListener('resize', closeMenu);
    };
  }, []);

  if (periodDays.length === 0) return null;

  const firstDay = periodDays[0];
  let firstDayOfWeek = getDay(firstDay);
  firstDayOfWeek = firstDayOfWeek === 0 ? 6 : firstDayOfWeek - 1;

  const emptyPadding = Array.from({ length: firstDayOfWeek }, (_, i) => i);

  const handleContextMenu = (e: React.MouseEvent, dateStr: string, weekend: boolean) => {
    e.preventDefault();
    if (weekend) return;
    
    // Simple bounds checking to keep menu on screen
    let x = e.clientX;
    let y = e.clientY;
    
    if (x > window.innerWidth - 150) x -= 150;
    if (y > window.innerHeight - 200) y -= 160;

    setMenuPos({ x, y, dateStr });
  };

  const handleMenuAction = (status: DayStatus | null) => {
    if (menuPos) {
      onSetDayStatus(menuPos.dateStr, status);
      setMenuPos(null);
    }
  };

  return (
    <div className="calendar-container relative">
      <div className="calendar-header">
        {DAYS_OF_WEEK.map(day => (
          <div key={day} className="calendar-header-cell">{day}</div>
        ))}
      </div>
      
      <div className="calendar-grid">
        {emptyPadding.map(i => (
          <div key={`empty-${i}`} className="calendar-cell empty"></div>
        ))}
        
        {periodDays.map(date => {
          const dateStr = formatDateStr(date);
          const weekend = isWeekend(date);
          const status = dayStatuses[dateStr];
          const today = isToday(date);
          const dayNumber = format(date, 'd');
          
          let stateClass = 'available';
          let title = '';
          
          if (weekend) {
            stateClass = 'weekend';
          } else if (status === 'Holiday') {
            stateClass = 'holiday';
            title = ID_HOLIDAYS[dateStr] || 'Holiday';
          } else if (status === 'Leave') {
            stateClass = 'leave';
            title = 'Leave';
          } else if (status === 'WFO') {
            stateClass = 'wfo';
            title = 'WFO Planned';
          }
          
          if (today) stateClass += ' today';

          return (
            <button
              key={dateStr}
              data-tooltip={title || undefined}
              disabled={weekend}
              onClick={() => onToggleDay(dateStr)}
              onContextMenu={(e) => handleContextMenu(e, dateStr, weekend)}
              className={`calendar-cell ${stateClass}`}
            >
              {dayNumber}
            </button>
          );
        })}
      </div>

      {menuPos && (
        <div 
          className="menu-backdrop" 
          onClick={() => setMenuPos(null)} 
          onContextMenu={(e) => { e.preventDefault(); setMenuPos(null); }}
        />
      )}
      {menuPos && (
        <div 
          className="context-menu" 
          style={{ top: menuPos.y, left: menuPos.x }}
        >
          <div className="menu-header">Select Status</div>
          <button onClick={() => handleMenuAction('WFO')} className="menu-item wfo">Mark as WFO</button>
          <button onClick={() => handleMenuAction('Leave')} className="menu-item leave">Mark as Leave</button>
          <button onClick={() => handleMenuAction('Holiday')} className="menu-item holiday">Mark as Holiday</button>
          <div className="menu-divider"></div>
          <button onClick={() => handleMenuAction(null)} className="menu-item clear">Clear</button>
        </div>
      )}
    </div>
  );
}

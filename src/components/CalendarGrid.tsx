import { useState, useEffect, useRef, TouchEvent } from 'react';
import { getDay, format, isToday, isSameWeek } from 'date-fns';
import { Check } from 'lucide-react';
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
  const longPressTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isLongPress = useRef(false);

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

  const handleTouchStart = (e: TouchEvent, dateStr: string, weekend: boolean) => {
    if (weekend) return;
    
    isLongPress.current = false;
    const touchX = e.touches[0].clientX;
    const touchY = e.touches[0].clientY;

    longPressTimer.current = setTimeout(() => {
      longPressTimer.current = null;
      isLongPress.current = true;
      
      let x = touchX;
      let y = touchY;
      if (x > window.innerWidth - 180) x -= 180;
      if (y > window.innerHeight - 200) y -= 160;
      
      setMenuPos({ x, y, dateStr });
      if (navigator.vibrate) navigator.vibrate(50);
    }, 400);
  };

  const handleTouchEnd = () => {
    if (longPressTimer.current) {
      clearTimeout(longPressTimer.current);
      longPressTimer.current = null;
    }
  };

  const handleClick = (dateStr: string) => {
    if (isLongPress.current) {
      isLongPress.current = false;
      return;
    }
    onToggleDay(dateStr);
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
          const currentWeek = isSameWeek(date, new Date(), { weekStartsOn: 1 });
          const dayNumber = format(date, 'd');
          
          let stateClass = 'available';
          let title = '';
          
          if (weekend) {
            stateClass = 'weekend';
            title = 'Weekend';
          } else if (status === 'Holiday') {
            stateClass = 'holiday';
            title = ID_HOLIDAYS[dateStr] || 'Holiday';
          } else if (status === 'Leave') {
            stateClass = 'leave';
            title = 'Leave';
          } else if (status === 'WFO') {
            stateClass = 'wfo';
            title = 'Planned WFO';
          }
          
          const displayDate = format(date, 'MMM d');
          const tooltip = title ? `${displayDate} — ${title}` : displayDate;
          
          if (currentWeek) stateClass += ' current-week';
          if (today) stateClass += ' today';

          return (
            <button
              key={dateStr}
              data-tooltip={tooltip}
              aria-label={`${displayDate}, ${title || 'Available to plan'}`}
              disabled={weekend}
              onClick={() => handleClick(dateStr)}
              onContextMenu={(e) => handleContextMenu(e, dateStr, weekend)}
              onTouchStart={(e) => handleTouchStart(e, dateStr, weekend)}
              onTouchEnd={handleTouchEnd}
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
          <div className="menu-header">{format(new Date(menuPos.dateStr), 'MMM d, yyyy')}</div>
          
          <button 
            onClick={() => handleMenuAction('WFO')} 
            className={`menu-item wfo ${dayStatuses[menuPos.dateStr] === 'WFO' ? 'active' : ''}`}
          >
            <div className="flex items-center">
              <span className="status-dot"></span>
              Plan WFO
            </div>
            {dayStatuses[menuPos.dateStr] === 'WFO' && <Check size={14} className="text-indigo" />}
          </button>
          
          <button 
            onClick={() => handleMenuAction('Leave')} 
            className={`menu-item leave ${dayStatuses[menuPos.dateStr] === 'Leave' ? 'active' : ''}`}
          >
            <div className="flex items-center">
              <span className="status-dot"></span>
              Mark as Leave
            </div>
            {dayStatuses[menuPos.dateStr] === 'Leave' && <Check size={14} className="text-indigo" />}
          </button>
          
          <button 
            onClick={() => handleMenuAction('Holiday')} 
            className={`menu-item holiday ${dayStatuses[menuPos.dateStr] === 'Holiday' ? 'active' : ''}`}
          >
            <div className="flex items-center">
              <span className="status-dot"></span>
              Mark as Holiday
            </div>
            {dayStatuses[menuPos.dateStr] === 'Holiday' && <Check size={14} className="text-indigo" />}
          </button>
          
          <div className="menu-divider"></div>
          
          <button onClick={() => handleMenuAction(null)} className="menu-item clear justify-center">
            Clear date
          </button>
        </div>
      )}
    </div>
  );
}

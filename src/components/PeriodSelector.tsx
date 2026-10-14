import { format } from 'date-fns';
import { Calendar, ChevronLeft, ChevronRight } from 'lucide-react';
import './PeriodSelector.css';

interface PeriodSelectorProps {
  start: Date;
  end: Date;
  onPrev: () => void;
  onNext: () => void;
  evaluationBadge?: string;
}

export default function PeriodSelector({ start, end, onPrev, onNext, evaluationBadge }: PeriodSelectorProps) {
  const formattedStart = format(start, 'd MMM');
  const formattedEnd = format(end, 'd MMM');

  return (
    <div className="period-selector flex items-center justify-between">
      <div className="flex-col">
        <h1 className="text-sm font-semibold">WFO Planner</h1>
        {evaluationBadge && (
          <span className="text-xs font-medium text-muted block mt-0.5" style={{ fontSize: '11px' }}>
            {evaluationBadge}
          </span>
        )}
      </div>
      <div className="period-badge flex items-center gap-2">
        <button onClick={onPrev} className="nav-btn" aria-label="Previous period"><ChevronLeft size={16} /></button>
        <div className="period-text flex items-center gap-2">
          <Calendar size={14} className="text-indigo" />
          <span className="text-xs font-medium">{formattedStart} - {formattedEnd}</span>
        </div>
        <button onClick={onNext} className="nav-btn" aria-label="Next period"><ChevronRight size={16} /></button>
      </div>
    </div>
  );
}

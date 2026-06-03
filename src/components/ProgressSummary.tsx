import { CheckCircle2 } from 'lucide-react';
import './ProgressSummary.css';

interface ProgressSummaryProps {
  plannedDays: number;
  requiredQuota: number;
}

export default function ProgressSummary({ plannedDays, requiredQuota }: ProgressSummaryProps) {
  const percentage = requiredQuota === 0 ? 100 : Math.min(100, Math.round((plannedDays / requiredQuota) * 100));
  
  let mainText = `${plannedDays} / ${requiredQuota} Office Days Planned`;
  let subText = '';
  let isComplete = false;
  
  if (plannedDays === 0) {
    mainText = 'No office days planned yet';
    subText = 'Click working days on the calendar to start planning.';
  } else if (plannedDays < requiredQuota) {
    subText = `Only ${requiredQuota - plannedDays} more to go`;
  } else if (plannedDays === requiredQuota) {
    mainText = 'Quota completed 🎉';
    subText = 'You’re good for this period.';
    isComplete = true;
  } else {
    mainText = `${plannedDays - requiredQuota} extra office days planned`;
    subText = 'You can keep them or unselect some dates.';
    isComplete = true;
  }

  return (
    <div className="progress-summary flex-col gap-2">
      <div className="flex justify-between items-center">
        <div className="flex-col gap-1">
          <div className="text-indigo text-sm font-semibold">
            <span key={plannedDays} className="animate-update">{mainText}</span>
          </div>
          <div className="flex items-center gap-1 text-xs text-muted mt-1">
            {plannedDays > 0 && <CheckCircle2 size={14} className={isComplete ? 'text-indigo' : 'text-light'} />}
            <span>{subText}</span>
          </div>
        </div>
        <div className="flex-col items-end gap-1">
          <div key={percentage} className="text-indigo font-bold animate-update" style={{ fontSize: '1.5rem', lineHeight: 1 }}>
            {percentage}%
          </div>
          <div className="text-xs text-muted font-medium" style={{ letterSpacing: '0.05em' }}>
            COMPLETE
          </div>
        </div>
      </div>
      
      <div className="progress-bar-container">
        <div 
          className={`progress-bar-fill ${isComplete ? 'complete' : ''}`}
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
    </div>
  );
}

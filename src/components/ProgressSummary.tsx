import { CheckCircle2 } from 'lucide-react';
import './ProgressSummary.css';

interface ProgressSummaryProps {
  plannedDays: number;
  requiredQuota: number;
}

export default function ProgressSummary({ plannedDays, requiredQuota }: ProgressSummaryProps) {
  const percentage = requiredQuota === 0 ? 100 : Math.min(100, Math.round((plannedDays / requiredQuota) * 100));
  
  let statusText = '';
  let isComplete = false;
  
  if (plannedDays < requiredQuota) {
    statusText = `Only ${requiredQuota - plannedDays} more office days needed`;
  } else if (plannedDays === requiredQuota) {
    statusText = 'Quota completed';
    isComplete = true;
  } else {
    statusText = `${plannedDays - requiredQuota} extra office days planned`;
    isComplete = true;
  }

  return (
    <div className="progress-summary flex-col gap-2">
      <div className="flex justify-between items-center">
        <div className="flex-col gap-1">
          <div className="text-indigo text-sm font-semibold">
            {plannedDays} / {requiredQuota} Office Days Planned
          </div>
          <div className="flex items-center gap-1 text-xs text-muted">
            <CheckCircle2 size={14} className={isComplete ? 'text-indigo' : 'text-light'} />
            <span>{statusText}</span>
          </div>
        </div>
        <div className="flex-col items-end gap-1">
          <div className="text-indigo font-bold" style={{ fontSize: '1.5rem', lineHeight: 1 }}>
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

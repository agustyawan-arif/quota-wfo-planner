import { AlertTriangle, CheckCircle2, AlertOctagon } from 'lucide-react';
import type { EvaluationCycleInfo } from '../utils/evaluationUtils';
import './EvaluationStatusCard.css';

interface EvaluationStatusCardProps {
  info: EvaluationCycleInfo;
  onSelectPeriod: (start: Date, end: Date) => void;
}

export default function EvaluationStatusCard({ info, onSelectPeriod }: EvaluationStatusCardProps) {
  const { totalDeficit, maxSafeDeficit, status, periods, name, dateRangeLabel } = info;

  const remainingSafe = Math.max(0, maxSafeDeficit - totalDeficit);
  const percentage = Math.min(100, Math.round((totalDeficit / maxSafeDeficit) * 100));

  return (
    <div className="evaluation-card-direct">
      <label className="section-label-caption">3-MONTH EVALUATION</label>

      {/* Header Row */}
      <div className="eval-header-direct">
        <h3 className="eval-title-direct">{name} ({dateRangeLabel})</h3>
        <div className={`eval-pill-direct pill-${status}`}>
          {status === 'safe' && <CheckCircle2 size={13} className="shrink-0" />}
          {status === 'caution' && <AlertTriangle size={13} className="shrink-0" />}
          {status === 'danger' && <AlertOctagon size={13} className="shrink-0" />}
          <span>
            {status === 'safe' && 'Safe'}
            {status === 'caution' && 'Caution'}
            {status === 'danger' && 'Warning!'}
          </span>
        </div>
      </div>

      {/* Counter Row with generous breathing room */}
      <div className="eval-counter-direct">
        <div className="eval-counter-text">
          <span className="counter-main-label">Missed Office Days</span>
          <span className="counter-sub-label">Safe allowance max {maxSafeDeficit} days</span>
        </div>
        <div className="eval-counter-digits">
          <span className={`counter-number num-${status}`}>{totalDeficit}</span>
          <span className="counter-denom">/{maxSafeDeficit}d</span>
        </div>
      </div>

      {/* Risk Progress Bar */}
      <div className="eval-bar-track">
        <div 
          className={`eval-bar-fill fill-${status}`}
          style={{ width: `${status === 'danger' ? 100 : percentage}%` }}
        />
        <div className="eval-danger-marker" title="Warning threshold (10 days)" />
      </div>

      {/* Status Message Banner with comfortable margins matching Monthly Quota */}
      <div className={`eval-banner-box msg-${status}`}>
        {status === 'danger' && (
          <p>
            <strong>Warning!</strong> You have missed <strong>{totalDeficit} office days</strong> (exceeded safe limit of 9 days). Plan more office days immediately!
          </p>
        )}
        {status === 'caution' && (
          <p>
            <strong>Caution!</strong> You have missed <strong>{totalDeficit} office days</strong>. Safe buffer remaining: <strong>{remainingSafe} days</strong> before a warning.
          </p>
        )}
        {status === 'safe' && (
          <p>
            {totalDeficit === 0 ? (
              <><strong>Perfect!</strong> No missed office days. Safe buffer remaining: <strong>{remainingSafe} days</strong>.</>
            ) : (
              <><strong>Safe.</strong> {totalDeficit} missed office days. Safe buffer remaining: <strong>{remainingSafe} days</strong>.</>
            )}
          </p>
        )}
      </div>

      {/* Horizontal Stepper / Timeline with generous spacing */}
      <div className="eval-stepper-wrapper">
        <div className="stepper-track-line" />
        
        <div className="stepper-nodes-row">
          {periods.map((p, idx) => (
            <button
              key={p.key}
              type="button"
              className={`stepper-node-btn ${p.isCurrent ? 'is-active' : ''}`}
              onClick={() => onSelectPeriod(p.start, p.end)}
              title={`Switch to ${p.label}`}
            >
              {/* Node Circle on the Timeline */}
              <div className="stepper-bullet-wrap">
                <div className={`stepper-bullet ${p.isCurrent ? 'bullet-active' : ''} ${p.deficit > 0 ? 'bullet-deficit' : ''}`}>
                  {p.isCurrent && <span className="bullet-inner-dot" />}
                </div>
              </div>

              {/* Node Label Below */}
              <div className="stepper-node-info">
                <span className="node-step-title">Month {idx + 1}</span>
                <span className="node-date-text">{p.label}</span>
                <span className={`node-stat-chip ${p.deficit > 0 ? 'chip-deficit' : 'chip-ok'}`}>
                  {p.deficit > 0 ? `+${p.deficit} missed` : '0 missed'}
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

import { AlertTriangle, CheckCircle2 } from 'lucide-react';
import ProgressSummary from './ProgressSummary';
import EvaluationStatusCard from './EvaluationStatusCard';
import type { EmployeeGrade } from '../utils/quotaUtils';
import type { EvaluationCycleInfo } from '../utils/evaluationUtils';
import './ResultsPanel.css';

interface ResultsPanelProps {
  currentStart?: Date;
  currentEnd?: Date;
  grade: EmployeeGrade;
  totalWorkingDays: number;
  requiredQuota: number;
  plannedDays: number;
  evaluationInfo: EvaluationCycleInfo;
  onSelectPeriod: (start: Date, end: Date) => void;
}

export default function ResultsPanel({
  grade,
  totalWorkingDays,
  requiredQuota,
  plannedDays,
  evaluationInfo,
  onSelectPeriod
}: ResultsPanelProps) {
  const isQuotaMet = plannedDays >= requiredQuota;
  const missingDays = Math.max(0, requiredQuota - plannedDays);
  const lostAllowance = missingDays * 40000;

  return (
    <div className="results-panel flex flex-col gap-5">
      {/* Monthly Quota Section */}
      <div className="results-block">
        <label className="section-label-caption">MONTHLY QUOTA</label>
        
        <ProgressSummary 
          plannedDays={plannedDays} 
          requiredQuota={requiredQuota} 
        />

        <div className="target-rule-box mt-3">
          <div className="flex justify-between items-center text-xs text-main mb-1.5">
            <span className="text-muted">Working Days:</span>
            <span className="font-semibold">{totalWorkingDays} days</span>
          </div>
          <div className="flex justify-between items-center text-xs text-main mb-2">
            <span className="text-muted">Target Rule:</span>
            <span className="font-semibold text-indigo">
              {grade === 'A-C' ? 'Fully WFO (0 WFH)' : 'Max 4 Days WFH'}
            </span>
          </div>

          {!isQuotaMet ? (
            <div className="status-banner warning flex gap-2 items-start text-xs">
              <AlertTriangle size={15} className="shrink-0 text-red-500 mt-0.5" />
              <div className="text-red-700 leading-snug">
                <div>Missing <strong>{missingDays} WFO day{missingDays > 1 ? 's' : ''}</strong></div>
                <div className="text-[11px] opacity-85 mt-0.5">
                  Allowance lost: <strong>Rp {lostAllowance.toLocaleString('id-ID')}</strong>
                </div>
              </div>
            </div>
          ) : (
            <div className="status-banner success flex gap-2 items-center text-xs">
              <CheckCircle2 size={15} className="shrink-0 text-green-600" />
              <span className="text-green-700 font-medium">
                Quota met — meal allowance safe!
              </span>
            </div>
          )}
        </div>
      </div>

      <div className="section-divider" />

      {/* 3-Month Evaluation Section (Flat on white card, matching Monthly Quota) */}
      <div className="results-block">
        <EvaluationStatusCard 
          info={evaluationInfo} 
          onSelectPeriod={onSelectPeriod} 
        />
      </div>
    </div>
  );
}

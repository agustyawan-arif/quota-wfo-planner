import { useState } from 'react';
import { CalendarRange, Plane, RotateCcw, Info, Copy, Check, Image as ImageIcon, AlertTriangle, CheckCircle2 } from 'lucide-react';
import type { EmployeeGrade } from '../utils/quotaUtils';
import './PlannerControls.css';

interface PlannerControlsProps {
  grade: EmployeeGrade;
  setGrade: (grade: EmployeeGrade) => void;
  leaveCount: number;
  holidayCount: number;
  totalWorkingDays: number;
  requiredQuota: number;
  plannedDays: number;
  onReset: () => void;
  onCopy: () => Promise<void>;
  onExport: () => Promise<void>;
}

export default function PlannerControls({
  grade,
  setGrade,
  leaveCount,
  holidayCount,
  totalWorkingDays,
  requiredQuota,
  plannedDays,
  onReset,
  onCopy,
  onExport
}: PlannerControlsProps) {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopyClick = async () => {
    await onCopy();
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const handleExportClick = async () => {
    await onExport();
  };

  return (
    <div className="planner-controls-container flex flex-col flex-1">
      <div className="planner-controls flex flex-col gap-6">
        <div className="control-group flex-col gap-2 flex-1">
          <label className="text-xs font-semibold text-muted tracking-wide uppercase h-4 flex items-end">Grade</label>
          <div className="segmented-control flex p-1 h-10">
            <button 
              className={`segment-btn flex-1 flex items-center justify-center text-sm font-medium ${grade === 'A-C' ? 'active' : ''}`}
              onClick={() => setGrade('A-C')}
            >
              A-C
            </button>
            <button 
              className={`segment-btn flex-1 flex items-center justify-center text-sm font-medium ${grade === 'D-E' ? 'active' : ''}`}
              onClick={() => setGrade('D-E')}
            >
              D-E
            </button>
          </div>
        </div>

        <div className="control-group flex-col gap-2 flex-1">
          <label className="text-xs font-semibold text-muted tracking-wide uppercase h-4 flex items-end">Leave Days</label>
          <div className="input-wrapper flex items-center px-3 h-10 gap-2">
            <Plane size={16} className="text-muted" />
            <div className="text-sm font-medium w-full text-main flex items-center h-full">
              {leaveCount} selected
            </div>
          </div>
        </div>

        <div className="control-group flex-col gap-2 flex-1">
          <label className="text-xs font-semibold text-holiday tracking-wide uppercase h-4 flex items-end">Holidays</label>
          <div className="input-wrapper flex items-center px-3 h-10 gap-2">
            <CalendarRange size={16} className="text-holiday" />
            <div className="text-sm font-medium w-full text-main flex items-center h-full">
              {holidayCount} selected
            </div>
          </div>
        </div>
      </div>
      
      {/* Borderless Rule & Allowance Section */}
      <div className="section-divider mt-6 pt-4">
        <label className="text-xs font-semibold text-muted tracking-wide uppercase block mb-3">
          Rule & Target
        </label>
        
        <div className="flex justify-between items-center text-xs text-main mb-2">
          <span className="text-muted">Working Days:</span>
          <span className="font-semibold">{totalWorkingDays} days</span>
        </div>
        
        <div className="flex justify-between items-center text-xs text-main mb-3">
          <span className="text-muted">Target Rule:</span>
          <span className="font-semibold text-indigo">
            {grade === 'A-C' ? 'Fully WFO (0 WFH)' : 'Max 4 Days WFH'}
          </span>
        </div>
        
        {plannedDays < requiredQuota ? (
          <div className="status-banner warning flex gap-2 items-start text-xs">
            <AlertTriangle size={15} className="shrink-0 text-red-500 mt-0.5" />
            <div className="text-red-700 leading-snug">
              <div>Missing <strong>{requiredQuota - plannedDays} WFO day(s)</strong></div>
              <div className="text-[11px] opacity-80 mt-0.5">
                Allowance lost: <strong>Rp {((requiredQuota - plannedDays) * 40000).toLocaleString('id-ID')}</strong>
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

      {/* Quick Tip Card */}
      <div className="helper-box mt-4">
        <div className="font-semibold title-info">
          <Info size={16} className="shrink-0 icon-info" />
          <span>Quick Tip</span>
        </div>
        <div className="text-xs leading-relaxed">
          Click any date to plan WFO. <strong>Right-click</strong> (or long-press) to set a Leave or Holiday.
        </div>
      </div>
      
      <div className="mt-auto pt-4 flex gap-3">
        <button 
          className="action-btn flex-1"
          onClick={handleExportClick}
        >
          <ImageIcon size={18} />
          <span>Export Image</span>
        </button>
        <button 
          className="action-btn icon-only"
          onClick={handleCopyClick}
          title="Copy Summary"
        >
          {isCopied ? <Check size={18} /> : <Copy size={18} />}
        </button>
        <button 
          className="action-btn icon-only" 
          onClick={onReset} 
          title="Reset schedule"
        >
          <RotateCcw size={18} />
        </button>
      </div>

    </div>
  );
}

import { useState } from 'react';
import { CalendarRange, Plane, RotateCcw, Info, Copy, Check, Image as ImageIcon, Download } from 'lucide-react';
import type { EmployeeGrade } from '../utils/quotaUtils';
import './PlannerControls.css';

interface PlannerControlsProps {
  grade: EmployeeGrade;
  setGrade: (grade: EmployeeGrade) => void;
  leaveCount: number;
  holidayCount: number;
  onReset: () => void;
  onCopy: () => Promise<void>;
  onExport: () => Promise<void>;
}

export default function PlannerControls({
  grade,
  setGrade,
  leaveCount,
  holidayCount,
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
      
      <div className="helper-box mt-4 flex gap-2 items-start">
        <Info size={16} className="shrink-0 mt-0.5" />
        <div>
          Click dates to plan WFO. <strong>Right-click or long-press</strong> for options.
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

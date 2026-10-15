import { useState } from 'react';
import { CalendarRange, Plane, RotateCcw, Info, Copy, Check, Image as ImageIcon, Sparkles } from 'lucide-react';
import type { EmployeeGrade } from '../utils/quotaUtils';
import './PlannerControls.css';

export type AppTheme = 'default' | 'wfc' | 'wfa' | 'wfo' | 'halloween';

interface PlannerControlsProps {
  theme: AppTheme;
  onThemeChange: (theme: AppTheme) => void;
  grade: EmployeeGrade;
  setGrade: (grade: EmployeeGrade) => void;
  leaveCount: number;
  holidayCount: number;
  onReset: () => void;
  onCopy: () => Promise<void>;
  onExport: () => Promise<void>;
}

const THEMES: Array<{ id: Exclude<AppTheme, 'default'>; label: string; mascot: string }> = [
  { id: 'wfc', label: 'Cafe', mascot: '/mascots/wfc.webp' },
  { id: 'wfa', label: 'Nomad', mascot: '/mascots/wfa.webp' },
  { id: 'wfo', label: 'Office', mascot: '/mascots/wfo.webp' },
  { id: 'halloween', label: 'Spooky', mascot: '/mascots/halloween.webp' },
];

export default function PlannerControls({
  theme,
  onThemeChange,
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
      <div className="planner-controls flex flex-col gap-4">

        <div className="control-group flex-col gap-1.5 flex-1">
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

        <div className="control-group flex-col gap-1.5 flex-1">
          <label className="text-xs font-semibold text-muted tracking-wide uppercase h-4 flex items-end">Leave Days</label>
          <div className="input-wrapper flex items-center px-3 h-10 gap-2">
            <Plane size={16} className="text-muted" />
            <div className="text-sm font-medium w-full text-main flex items-center h-full">
              {leaveCount} selected
            </div>
          </div>
        </div>

        <div className="control-group flex-col gap-1.5 flex-1">
          <label className="text-xs font-semibold text-holiday tracking-wide uppercase h-4 flex items-end">Holidays</label>
          <div className="input-wrapper flex items-center px-3 h-10 gap-2">
            <CalendarRange size={16} className="text-holiday" />
            <div className="text-sm font-medium w-full text-main flex items-center h-full">
              {holidayCount} selected
            </div>
          </div>
        </div>
      </div>

      {/* Quick Tip Card */}
      <div className="helper-box mt-4">
        <div className="font-semibold title-info">
          <Info size={15} className="shrink-0 icon-info" />
          <span>Quick Tip</span>
        </div>
        <div className="text-xs leading-relaxed">
          Click dates to plan WFO. <strong>Right-click</strong> (or long-press) to set Leave or Holiday.
        </div>
      </div>

      {/* Theme Selector (Secondary Customization at Bottom) */}
      <div className="theme-selector-section mt-4 flex flex-col gap-1.5">
        <label className="text-xs font-semibold text-muted tracking-wide uppercase h-4 flex items-end">
          Theme
        </label>
        <div className="theme-grid-container">
          <div className="theme-grid-new">
            {THEMES.map((t) => {
              const isActive = theme === t.id;
              return (
                <button
                  key={t.id}
                  type="button"
                  className={`theme-chip-btn ${isActive ? 'active' : ''}`}
                  onClick={() => onThemeChange(isActive ? 'default' : t.id)}
                  title={`Switch to ${t.label} theme`}
                >
                  <img src={t.mascot} alt="" className="theme-chip-mascot" />
                  <span className="theme-chip-label">{t.label}</span>
                </button>
              );
            })}
          </div>

          <button
            type="button"
            className={`theme-reset-bar-btn ${theme === 'default' ? 'active' : ''}`}
            onClick={() => onThemeChange('default')}
            title="Switch to default theme"
          >
            <Sparkles size={13} className={theme === 'default' ? 'theme-reset-icon-active' : ''} />
            <span>Default Theme</span>
          </button>
        </div>
      </div>
      
      {/* Actions */}
      <div className="mt-auto pt-4 flex gap-2">
        <button 
          className="action-btn flex-1"
          onClick={handleExportClick}
          title="Export PNG of Calendar"
        >
          <ImageIcon size={16} />
          <span>Export</span>
        </button>
        <button 
          className="action-btn icon-only"
          onClick={handleCopyClick}
          title="Copy Summary"
        >
          {isCopied ? <Check size={16} /> : <Copy size={16} />}
        </button>
        <button 
          className="action-btn icon-only" 
          onClick={onReset} 
          title="Reset schedule"
        >
          <RotateCcw size={16} />
        </button>
      </div>

    </div>
  );
}

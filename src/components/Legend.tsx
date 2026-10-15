import type { AppTheme } from './PlannerControls';
import { getConditionIcon } from '../utils/themeIcons';
import './Legend.css';

interface LegendProps {
  theme?: AppTheme;
}

export default function Legend({ theme = 'default' }: LegendProps) {
  const PlannedIcon = getConditionIcon(theme, 'planned');
  const AvailableIcon = getConditionIcon(theme, 'available');
  const LeaveIcon = getConditionIcon(theme, 'leave');
  const HolidayIcon = getConditionIcon(theme, 'holiday');
  const WeekendIcon = getConditionIcon(theme, 'weekend');

  return (
    <div className="legend-container mt-6 flex justify-center gap-4 text-xs font-medium text-muted flex-wrap">
      <div className="legend-item flex items-center gap-1.5">
        <span className="legend-badge planned wfo">
          <PlannedIcon size={11} strokeWidth={2.4} />
        </span>
        <span>Planned</span>
      </div>
      <div className="legend-item flex items-center gap-1.5">
        <span className="legend-badge available">
          <AvailableIcon size={11} strokeWidth={2.4} />
        </span>
        <span>Available</span>
      </div>
      <div className="legend-item flex items-center gap-1.5">
        <span className="legend-badge leave">
          <LeaveIcon size={11} strokeWidth={2.4} />
        </span>
        <span>Leave</span>
      </div>
      <div className="legend-item flex items-center gap-1.5">
        <span className="legend-badge holiday">
          <HolidayIcon size={11} strokeWidth={2.4} />
        </span>
        <span>Holiday</span>
      </div>
      <div className="legend-item flex items-center gap-1.5">
        <span className="legend-badge weekend">
          <WeekendIcon size={11} strokeWidth={2.4} />
        </span>
        <span>Weekend</span>
      </div>
    </div>
  );
}

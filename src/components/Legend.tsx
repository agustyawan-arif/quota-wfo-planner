import './Legend.css';

export default function Legend() {
  return (
    <div className="legend-container mt-6 flex justify-center gap-4 text-xs font-medium text-muted flex-wrap">
      <div className="legend-item flex items-center gap-2">
        <div className="legend-color planned wfo"></div>
        Planned
      </div>
      <div className="legend-item flex items-center gap-2">
        <div className="legend-color available"></div>
        Available
      </div>
      <div className="legend-item flex items-center gap-2">
        <div className="legend-color leave"></div>
        Leave
      </div>
      <div className="legend-item flex items-center gap-2">
        <div className="legend-color holiday"></div>
        Holiday
      </div>
      <div className="legend-item flex items-center gap-2">
        <div className="legend-color weekend"></div>
        Weekend
      </div>
    </div>
  );
}

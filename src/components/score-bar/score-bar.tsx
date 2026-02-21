import "./score-bar.scss";

export function ScoreBar() {
  return (
    <div className="score-bar">
      <div className="icon-button">⏸</div>

      <div className="score-block">
        <div className="score-label">Score</div>
        <div className="score-value">12,450</div>
      </div>

      <div className="icon-button">⚙</div>
    </div>
  );
}

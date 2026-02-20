import { Logo } from "../logo/logo";
import "./start-screen.scss";

interface StartScreenProps {
  onStart: () => void;
  isReady: boolean;
}

export function StartScreen({ onStart, isReady }: StartScreenProps) {
  const buttonLabel = isReady ? "Start" : "Loading";

  return (
    <div className="start-screen">
      <div className="bg-letters">
        <span>W</span>
        <span>O</span>
        <span>R</span>
        <span>D</span>
        <span>B</span>
        <span>A</span>
        <span>S</span>
        <span>H</span>
      </div>

      <Logo />
      <span className="logo-spacer"></span>

      <div className="tagline">Type. Clear. Survive.</div>

      <div className="how-to-play">
        <p>Letters fall into the play area</p>
        <p>Tap letters or type to form words</p>
        <p>Longer words score more points</p>
        <p>Used letters disappear</p>
        <p>If the play area fills - game over</p>
      </div>

      <div
        className={`start-button ${isReady ? "" : "loading"}`}
        onClick={onStart}
      >
        {buttonLabel}
      </div>
    </div>
  );
}

import { Logo } from "../logo/logo";
import "./start-screen.scss";

export function StartScreen() {
  return (
    <div className="start-screen">
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

      <p className="start-button">Start</p>
    </div>
  );
}

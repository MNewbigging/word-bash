import { Logo } from "../logo/logo";
import "./start-screen.scss";

export function StartScreen() {
  return (
    <div className="start-screen">
      <Logo />
      <div className="how-to-play">
        Make words to prevent the play area overflowing with letters
      </div>
      <div className="start-button">Start</div>
    </div>
  );
}

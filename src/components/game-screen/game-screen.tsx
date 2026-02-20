import { Bucket } from "../bucket/bucket";
import "./game-screen.scss";

export function GameScreen() {
  return (
    <div className="game-screen">
      <div className="top-bar"></div>

      <div className="play-area">
        <Bucket />
      </div>

      <div className="word-bar"></div>
    </div>
  );
}

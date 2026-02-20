import { useRef } from "react";
import { Bucket } from "../bucket/bucket";
import "./game-screen.scss";
import { Game } from "../../game";

interface GameScreenProps {
  dictionary: Set<string>;
}

export function GameScreen({ dictionary }: GameScreenProps) {
  const gameRef = useRef<Game | null>(null);

  if (gameRef.current === null) {
    gameRef.current = new Game(dictionary);
  }

  // Needs to re-render on game events - see how Aakash did it for work recently

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

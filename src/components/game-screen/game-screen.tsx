import { useRef } from "react";
import { Bucket } from "../bucket/bucket";
import "./game-screen.scss";
import { Game } from "../../game";
import { GameEndOverlay } from "../game-end-overlay/game-end-overlay";
import { useEventUpdater } from "../hooks/use-event-updater";
import { useEventData } from "../hooks/use-event-data";

interface GameScreenProps {
  dictionary: Set<string>;
}

export function GameScreen({ dictionary }: GameScreenProps) {
  const gameOver = useEventData("game-over");

  const gameRef = useRef<Game | null>(null);

  if (gameRef.current === null) {
    gameRef.current = new Game(dictionary);
  }

  return (
    <>
      {gameOver && <GameEndOverlay />}
      <div className="game-screen">
        <div className="top-bar"></div>

        <div className="play-area">
          <Bucket game={gameRef.current} />
        </div>

        <div className="word-bar"></div>
      </div>
    </>
  );
}

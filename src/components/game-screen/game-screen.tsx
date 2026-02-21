import { useRef } from "react";
import { Bucket } from "../bucket/bucket";
import "./game-screen.scss";
import { Game } from "../../game";
import { GameEndOverlay } from "../game-end-overlay/game-end-overlay";
import { useEventData } from "../hooks/use-event-data";
import { ScoreBar } from "../score-bar/score-bar";
import { WordBar } from "../word-bar/word-bar";

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
        <div className="top-bar">
          <ScoreBar />
        </div>

        <div className="play-area">
          <Bucket game={gameRef.current} />
        </div>

        <div className="bot-bar">
          <WordBar />
        </div>
      </div>
    </>
  );
}

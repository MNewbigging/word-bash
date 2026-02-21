import { useReducer, useRef, useState } from "react";
import { Bucket } from "../bucket/bucket";
import "./game-screen.scss";
import { Game } from "../../game";
import { GameEndOverlay } from "../game-end-overlay/game-end-overlay";
import { useEventData } from "../hooks/use-event-data";
import { ScoreBar } from "../score-bar/score-bar";
import { WordBar } from "../word-bar/word-bar";
import { AnimatePresence } from "framer-motion";
import { RestartBanner } from "../restart-banner/restart-banner";
import { useEventUpdater } from "../hooks/use-event-updater";

interface GameScreenProps {
  dictionary: Set<string>;
}

export function GameScreen({ dictionary }: GameScreenProps) {
  const [viewBoard, setViewBoard] = useState(false);
  const [, forceUpdate] = useReducer((x) => x + 1, 0);
  useEventUpdater("game-over");

  function handleRestart() {
    gameRef.current = new Game(dictionary);
    if (viewBoard) setViewBoard(false);
    else forceUpdate();
  }

  // Setup game instance once
  const gameRef = useRef<Game | null>(null);
  if (gameRef.current === null) {
    gameRef.current = new Game(dictionary);
  }

  // Game end overlay condition
  const gameOver = gameRef.current.gameOver;
  const showOverlay = gameOver && !viewBoard;

  return (
    <>
      <AnimatePresence>
        {showOverlay && (
          <GameEndOverlay
            onViewBoard={() => setViewBoard(true)}
            onRestart={handleRestart}
          />
        )}
      </AnimatePresence>

      <div className="game-screen">
        <div className="top-bar">
          <ScoreBar />
        </div>

        <div className="play-area">
          <Bucket game={gameRef.current} />
        </div>

        <div className="bot-bar">
          <AnimatePresence>
            {!viewBoard && <WordBar game={gameRef.current} />}
            {viewBoard && <RestartBanner onRestart={handleRestart} />}
          </AnimatePresence>
        </div>
      </div>
    </>
  );
}

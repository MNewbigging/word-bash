import { useEffect, useReducer, useRef, useState } from "react";
import { Bucket } from "../bucket/bucket";
import "./game-screen.scss";
import { Game } from "../../game";
import { GameEndOverlay } from "../game-end-overlay/game-end-overlay";
import { ScoreBar } from "../score-bar/score-bar";
import { WordBar } from "../word-bar/word-bar";
import { AnimatePresence } from "framer-motion";
import { RestartBanner } from "../restart-banner/restart-banner";
import { useEventUpdater } from "../hooks/use-event-updater";

interface GameScreenProps {
  dictionary: Set<string>;
}

export function GameScreen({ dictionary }: GameScreenProps) {
  const [game, setGame] = useState(() => new Game(dictionary));
  const [viewBoard, setViewBoard] = useState(false);

  useEventUpdater("game-over");

  useEffect(() => {
    game.start();

    return () => {
      game.dispose();
    };
  }, [game]);

  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      game.onKeyDown(e);
    }

    window.addEventListener("keydown", handleKey);

    return () => {
      window.removeEventListener("keydown", handleKey);
    };
  }, [game]);

  function handleRestart() {
    game.dispose();
    setGame(new Game(dictionary));
    setViewBoard(false);
  }

  const gameOver = game.gameOver;
  const showOverlay = gameOver && !viewBoard;

  return (
    <>
      <AnimatePresence>
        {showOverlay && (
          <GameEndOverlay
            game={game}
            onViewBoard={() => setViewBoard(true)}
            onRestart={handleRestart}
          />
        )}
      </AnimatePresence>

      <div className="game-screen">
        <div className="top-bar">
          <ScoreBar game={game} />
        </div>

        <div className="play-area">
          <Bucket game={game} />
        </div>

        <div className="bot-bar">
          <AnimatePresence>
            {!viewBoard && <WordBar game={game} />}
            {viewBoard && <RestartBanner onRestart={handleRestart} />}
          </AnimatePresence>
        </div>
      </div>
    </>
  );
}

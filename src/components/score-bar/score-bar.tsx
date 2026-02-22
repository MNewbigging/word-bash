import { motion, useAnimationControls } from "framer-motion";
import "./score-bar.scss";
import { Game } from "../../game";
import { useEventUpdater } from "../hooks/use-event-updater";
import { useEventData } from "../hooks/use-event-data";
import { useEffect } from "react";

interface ScoreBarProps {
  game: Game;
}

export function ScoreBar({ game }: ScoreBarProps) {
  const paused = useEventData("pause-change");

  const pauseIcon = paused ? "▶" : "⏸";

  function togglePause() {
    if (paused) game.resumse();
    else game.pause();
  }

  return (
    <motion.div
      className="score-bar"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2, ease: "easeOut", delay: 0.1 }}
    >
      <div className="icon-button" onClick={togglePause}>
        {pauseIcon}
      </div>

      <Score game={game} />

      <div className="icon-button">⚙</div>
    </motion.div>
  );
}

function Score({ game }: { game: Game }) {
  useEventUpdater("score-changed");
  const controls = useAnimationControls();

  useEffect(() => {
    controls.start({
      scale: [1, 1.2, 1],
      transition: { duration: 0.22, ease: "easeOut" },
    });
  }, [game.score, controls]);

  return (
    <div className="score-block">
      <div className="score-label">Score</div>
      <motion.div className="score-value" animate={controls}>
        {game.score}
      </motion.div>
    </div>
  );
}

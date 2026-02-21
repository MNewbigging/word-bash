import { motion } from "framer-motion";
import "./game-end-overlay.scss";
import { Logo } from "../logo/logo";
import { PrimaryButton } from "../primary-button/primary-button";
import { SecondaryButton } from "../secondary-button/secondary-button";
import { Game } from "../../game";

interface GameEndOverlayProps {
  game: Game;
  onViewBoard: () => void;
  onRestart: () => void;
}

export function GameEndOverlay({
  game,
  onViewBoard,
  onRestart,
}: GameEndOverlayProps) {
  return (
    <motion.div
      className="overlay-backdrop"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.22, ease: "easeOut" }}
    >
      <motion.div
        className="overlay"
        initial={{ opacity: 0, y: 8, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 6, scale: 0.98 }}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 28,
          delay: 0.16,
        }}
      >
        <Logo altWord1="GAME" altWord2="OVER" />
        <OverlayStats game={game} />

        <div className="buttons">
          <PrimaryButton text="Restart" onClick={onRestart} size="md" />
          <SecondaryButton text="View board" onClick={onViewBoard} />
        </div>
      </motion.div>
    </motion.div>
  );
}

function OverlayStats({ game }: { game: Game }) {
  return (
    <div className="overlay-stats">
      <div className="stat">
        <span className="label">Score</span>
        <span className="value">{game.score}</span>
      </div>

      <div className="stat">
        <span className="label">Words Formed</span>
        <span className="value">{game.wordsFormed}</span>
      </div>

      <div className="stat">
        <span className="label">Longest Word</span>
        <span className="value">{game.longestWord}</span>
      </div>
    </div>
  );
}

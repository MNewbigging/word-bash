import { motion } from "framer-motion";
import "./game-end-overlay.scss";
import { Logo } from "../logo/logo";
import { PrimaryButton } from "../primary-button/primary-button";
import { SecondaryButton } from "../secondary-button/secondary-button";

interface GameEndOverlayProps {
  onViewBoard: () => void;
}

export function GameEndOverlay({ onViewBoard }: GameEndOverlayProps) {
  function onRestart() {
    console.log("restart");
  }

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
        <OverlayStats />

        <div className="buttons">
          <PrimaryButton text="Restart" onClick={onRestart} size="md" />
          <SecondaryButton text="View board" onClick={onViewBoard} />
        </div>
      </motion.div>
    </motion.div>
  );
}

function OverlayStats() {
  return (
    <div className="overlay-stats">
      <div className="stat">
        <span className="label">Score</span>
        <span className="value">12,345</span>
      </div>

      <div className="stat">
        <span className="label">Words Formed</span>
        <span className="value">52</span>
      </div>

      <div className="stat">
        <span className="label">Longest Word</span>
        <span className="value">Paperwork</span>
      </div>
    </div>
  );
}

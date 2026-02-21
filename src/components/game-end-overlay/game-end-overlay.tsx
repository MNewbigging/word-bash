import { motion } from "framer-motion";
import "./game-end-overlay.scss";
import { Logo } from "../logo/logo";
import { PrimaryButton } from "../primary-button/primary-button";
import { SecondaryButton } from "../secondary-button/secondary-button";

export function GameEndOverlay() {
  function onRestart() {
    console.log("restart");
  }

  function onViewBoard() {
    console.log("view board");
  }

  return (
    <motion.div
      className="overlay-backdrop"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.22, ease: "easeOut" }}
    >
      <motion.div
        className="overlay"
        initial={{ opacity: 0, y: 8, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
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

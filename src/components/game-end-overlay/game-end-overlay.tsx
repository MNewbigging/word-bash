import { motion } from "framer-motion";
import "./game-end-overlay.scss";

export function GameEndOverlay() {
  return (
    <motion.div
      className="overlay-backdrop"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
    >
      <motion.div
        className="overlay"
        initial={{ opacity: 0, y: 8, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ type: "spring", stiffness: 300, damping: 28 }}
      >
        <header>Game Over!</header>
      </motion.div>
    </motion.div>
  );
}

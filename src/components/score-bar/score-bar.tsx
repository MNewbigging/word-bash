import { motion } from "framer-motion";
import "./score-bar.scss";

export function ScoreBar() {
  return (
    <motion.div
      className="score-bar"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
    >
      <div className="icon-button">⏸</div>

      <div className="score-block">
        <div className="score-label">Score</div>
        <div className="score-value">12,450</div>
      </div>

      <div className="icon-button">⚙</div>
    </motion.div>
  );
}

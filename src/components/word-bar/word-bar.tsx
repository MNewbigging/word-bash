import { motion } from "framer-motion";
import { PrimaryButton } from "../primary-button/primary-button";
import "./word-bar.scss";
import { useEventUpdater } from "../hooks/use-event-updater";
import { Game } from "../../game";

interface WordBarProps {
  game: Game;
}

export function WordBar({ game }: WordBarProps) {
  useEventUpdater("letter-used-change");

  const word = game.wordBar.map((tile) => tile.letter).join("");

  function onSubmit() {
    console.log("submit");
  }

  return (
    <motion.div
      className="word-bar"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
    >
      <div className="word-display">{word}</div>

      <PrimaryButton text="✓" onClick={onSubmit} size="sm" />
    </motion.div>
  );
}

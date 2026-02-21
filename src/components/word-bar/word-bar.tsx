import { motion } from "framer-motion";
import { PrimaryButton } from "../primary-button/primary-button";
import "./word-bar.scss";
import { useEventUpdater } from "../hooks/use-event-updater";
import { Game } from "../../game";
import { useEffect, useRef } from "react";

interface WordBarProps {
  game: Game;
}

export function WordBar({ game }: WordBarProps) {
  useEventUpdater("word-bar-changed");
  const wordRef = useRef<HTMLDivElement>(null);

  const word = game.wordBar.map((tile) => tile.letter).join("");

  useEffect(() => {
    const el = wordRef.current;
    if (!el) return;

    // Keep the end of the word visible
    el.scrollLeft = el.scrollWidth;
  }, [word]);

  function onSubmit() {
    game.submitWord();
  }

  function onClear() {
    game.deleteWordBar();
  }

  return (
    <motion.div
      className="word-bar"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
    >
      <div className="word-display">
        <div className="word-scroll" ref={wordRef}>
          <span className="word-text">{word}</span>
        </div>

        {word.length > 0 && (
          <button className="clear-button" onClick={onClear}>
            x
          </button>
        )}
      </div>

      <PrimaryButton text="✓" onClick={onSubmit} size="sm" activeOnEnter />
    </motion.div>
  );
}

import { motion } from "framer-motion";
import { PrimaryButton } from "../primary-button/primary-button";
import "./word-bar.scss";
import { useEventUpdater } from "../hooks/use-event-updater";
import { Game } from "../../game";
import { useEffect, useRef, useState } from "react";
import { useEventData } from "../hooks/use-event-data";
import { useEvent } from "../hooks/use-event";

interface WordBarProps {
  game: Game;
}

export function WordBar({ game }: WordBarProps) {
  useEventUpdater("word-bar-changed");
  const [invalidWord, setInvalidWord] = useState(false);

  function onInvalidWord() {
    console.log("invalid word ");
    setInvalidWord(true);
    setTimeout(() => setInvalidWord(false), 350);
  }

  useEvent("invalid-word", onInvalidWord);

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
      <motion.div
        className="word-display"
        animate={
          invalidWord
            ? {
                x: [0, -6, 6, -4, 4, 0],
                backgroundColor: [
                  "rgba(255,255,255,0.6)",
                  "rgba(187,96,73,0.15)",
                  "rgba(255,255,255,0.6)",
                ],
              }
            : { x: 0, backgroundColor: "rgba(255,255,255,0.6)" }
        }
      >
        <div className="word-scroll" ref={wordRef}>
          <span className="word-text">{word}</span>
        </div>

        {word.length > 0 && (
          <button className="clear-button" onClick={onClear}>
            x
          </button>
        )}
      </motion.div>

      <PrimaryButton text="✓" onClick={onSubmit} size="sm" activeOnEnter />
    </motion.div>
  );
}

import { motion } from "framer-motion";
import { PrimaryButton } from "../primary-button/primary-button";
import "./word-bar.scss";
import { useEventUpdater } from "../hooks/use-event-updater";
import { Game } from "../../game";
import { useEffect, useRef, useState } from "react";
import { useEvent } from "../hooks/use-event";
import { ScoreFx } from "../score-fx/score.fx";

interface WordBarProps {
  game: Game;
}

const wordbarVariants = {
  //
  default: {
    x: 0,
    scale: 1,
    backgroundColor: "rgba(255,255,255,0.6)",
    transition: { duration: 0.18, ease: "easeOut" },
  },
  //
  invalid: {
    x: [0, -6, 6, -4, 4, 0],
    backgroundColor: [
      "rgba(255,255,255,0.6)",
      "rgba(187,96,73,0.15)",
      "rgba(255,255,255,0.6)",
    ],
    transition: {
      x: { duration: 0.32, ease: "easeInOut" },
      backgroundColor: { duration: 0.32, ease: "easeInOut" },
    },
  },
  //
  valid: {
    scale: [1, 0.96, 1],
    transition: { duration: 0.22, ease: "easeOut" },
  },
};

export function WordBar({ game }: WordBarProps) {
  useEventUpdater("word-bar-changed");
  const [invalidWord, setInvalidWord] = useState(false);
  const [validWord, setValidWord] = useState(false);

  function onInvalidWord() {
    setInvalidWord(true);
    setTimeout(() => setInvalidWord(false), 350);
  }

  function onValidWord() {
    setValidWord(true);
    setTimeout(() => setValidWord(false), 350);
  }

  useEvent("invalid-word", onInvalidWord);
  useEvent("valid-word", onValidWord);

  const wordRef = useRef<HTMLDivElement>(null);

  const word = game.wordBar.map((tile) => tile.letter).join("");

  useEffect(() => {
    const el = wordRef.current;
    if (!el) return;

    // Keep the end of the word visible
    el.scrollLeft = el.scrollWidth;
  }, [word]);

  // Animation properties
  const animateVariant = invalidWord
    ? "invalid"
    : validWord
      ? "valid"
      : "default";

  return (
    <motion.div
      className="word-bar"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2, ease: "easeOut", delay: 0.1 }}
    >
      <motion.div
        className="word-display"
        variants={wordbarVariants}
        initial="default"
        animate={animateVariant}
      >
        <div className="word-scroll" ref={wordRef}>
          <span className="word-text">{word}</span>
        </div>

        {word.length > 0 && (
          <button className="clear-button" onClick={() => game.deleteWordBar()}>
            x
          </button>
        )}
      </motion.div>

      <ScoreFx />

      <PrimaryButton
        text="✓"
        onClick={() => game.submitWord()}
        size="sm"
        activeOnEnter
      />
    </motion.div>
  );
}

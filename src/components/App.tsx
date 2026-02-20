import "./app.scss";
import { useEffect, useState } from "react";
import { StartScreen } from "./start-screen/start-screen";
import { AnimatePresence, motion } from "framer-motion";
import { GameScreen } from "./game-screen/game-screen";
import { loadDictionary } from "../load-dictionary";

export function App() {
  const [dict, setDict] = useState<Set<string> | null>(null);
  const [screen, setScreen] = useState("start");

  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      try {
        const dict = await loadDictionary();
        if (cancelled) return;
        setDict(dict);
      } catch (e) {
        if (cancelled) return;
        console.error("Failed to load dictionary", e);
      }
    };

    load();

    return () => {
      cancelled = true;
    };
  }, []); // only runs once on start

  return (
    <div className="app">
      <AnimatePresence mode="wait">
        {screen === "start" && (
          <motion.div
            key="start"
            className="screen"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
          >
            <StartScreen
              isReady={dict !== null}
              onStart={() => setScreen("game")}
            />
          </motion.div>
        )}

        {screen === "game" && (
          <motion.div
            key="game"
            className="screen"
            initial={{ opacity: 0, y: 10, filter: "blur(2px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.26, ease: "easeOut" }}
          >
            <GameScreen />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

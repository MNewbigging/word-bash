import "./app.scss";
import { useState } from "react";
import { StartScreen } from "./start-screen/start-screen";
import { AnimatePresence, motion } from "framer-motion";
import { GameScreen } from "./game-screen/game-screen";

export function App() {
  const [screen, setScreen] = useState("start");

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
            <StartScreen onStart={() => setScreen("game")} />
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

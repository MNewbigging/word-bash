import { useState } from "react";
import { StartScreen } from "./start-screen/start-screen";

export function App() {
  const [started, setStarted] = useState(false);

  function onStart() {
    setStarted(true);
  }

  return (
    <>
      <StartScreen />
    </>
  );
}

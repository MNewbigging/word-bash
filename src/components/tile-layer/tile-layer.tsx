import { AnimatePresence, motion } from "framer-motion";
import { COLS, Game, ROWS } from "../../game";
import { LetterTile } from "../../letter-spawner";
import { useEventUpdater } from "../hooks/use-event-updater";
import "./tile-layer.scss";

type RenderTile = {
  letterTile: LetterTile;
  col: number;
  row: number;
};

interface TileLayerProps {
  game: Game;
}

const removingAnim = {
  opacity: 0,
  scale: 0.96,
  filter: "blur(0.5px)",
  x: 0,
  y: 0,
};
const idleAnim = (top: string) => ({
  top,
  opacity: 1,
  scale: 1,
  x: 0,
  y: 0,
});

export function TileLayer({ game }: TileLayerProps) {
  useEventUpdater("grid-changed", "word-bar-changed");

  function onClickTile(tile: LetterTile) {
    if (tile.removing) return;
    if (tile.inUse) game.unuseLetter(tile);
    else game.useLetter(tile);
  }

  // Flatten grid to get list of tiles to render
  const grid = game.grid;
  const tiles: RenderTile[] = [];
  for (let col = 0; col < COLS; col++) {
    const column = grid[col];

    // Go over all existing rows in this column
    for (let i = 0; i < column.length; i++) {
      const letterTile = column[i];
      const row = ROWS - 1 - i; // Flip from top-down to bottom-up
      tiles.push({ letterTile, col, row });
    }
  }

  return (
    <div className="tile-layer">
      {tiles.map(({ letterTile, col, row }) => {
        return (
          <motion.div
            key={letterTile.id}
            className={`tile ${letterTile.inUse ? "in-use" : ""}`}
            onClick={() => onClickTile(letterTile)}
            style={{
              left: `calc(${col} * var(--cell-x))`,
              ["--tile-bg" as any]: letterTile.color,
            }}
            initial={false}
            animate={
              letterTile.removing
                ? removingAnim
                : idleAnim(`calc(${row} * var(--cell-y))`)
            }
            transition={
              letterTile.removing
                ? { duration: 0.2, ease: "easeOut" }
                : {
                    top: { type: "spring", stiffness: 900, damping: 60 },
                    scale: { type: "spring", stiffness: 900, damping: 60 },
                  }
            }
          >
            {letterTile.letter}
          </motion.div>
        );
      })}
    </div>
  );
}

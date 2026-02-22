import { motion } from "framer-motion";
import { Game, ROWS } from "../../game";
import { useEventUpdater } from "../hooks/use-event-updater";
import { TileLayer } from "../tile-layer/tile-layer";
import "./bucket.scss";

interface BucketProps {
  game: Game;
}

const dangerVariants = {
  safe: { opacity: 1 },
  danger: {
    opacity: [1, 1, 1],
    filter: ["saturate(1)", "saturate(1.6)", "saturate(1)"],
    transition: { duration: 0.9, repeat: Infinity, ease: "easeInOut" },
  },
};

export function Bucket({ game }: BucketProps) {
  useEventUpdater("grid-changed");

  // "filled within three rows of the top" => any tile whose row index is 0,1,2 (top 3)
  // Each column array is bottom-up, so:
  // if a column has length >= ROWS - 2, it reaches into top 3 rows.
  const danger =
    game.grid.some((col) => col.length >= ROWS - 2) && !game.gameOver;

  return (
    <div className="bucket">
      <motion.div
        className="danger-overlay"
        variants={dangerVariants}
        animate={danger ? "danger" : "safe"}
      >
        <div className="lethal-row"></div>
      </motion.div>

      <TileLayer game={game} />
    </div>
  );
}

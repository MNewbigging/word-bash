import { COLS, Game, Letter, LetterTile, ROWS } from "../../game";
import { useEventUpdater } from "../hooks/use-event-updater";
import "./bucket.scss";

interface BucketProps {
  game: Game;
}

export function Bucket({ game }: BucketProps) {
  return (
    <div className="bucket">
      <div className="danger-overlay">
        <div className="lethal-row"></div>
      </div>

      <TileLayer game={game} />
    </div>
  );
}

type RenderTile = {
  letterTile: LetterTile;
  col: number;
  row: number;
};

interface TileLayerProps {
  game: Game;
}

function TileLayer({ game }: TileLayerProps) {
  useEventUpdater("grid-changed");

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
          <div
            key={letterTile.id}
            className="tile"
            style={{
              ["--tx" as any]: `${col * 100}%`,
              ["--ty" as any]: `${row * 100}%`,
              ["--tile-bg" as any]: letterTile.color,
            }}
          >
            {letterTile.letter}
          </div>
        );
      })}
    </div>
  );
}

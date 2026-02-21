import { Game } from "../../game";
import { TileLayer } from "../tile-layer/tile-layer";
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

import { LetterTile } from "../../game";
import "./tile.scss";

export interface TileProps {
  tile: LetterTile;
}

export function Tile({ tile }: TileProps) {
  return <div className="tile">{tile.letter}</div>;
}

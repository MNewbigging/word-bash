import "./tile.scss";

export interface TileProps {
  letter: string;
}

export function Tile({ letter }: TileProps) {
  return <div className="tile">{letter}</div>;
}

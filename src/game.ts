import { eventDispatcher } from "./event-dispatcher";

export const COLS = 8;
export const ROWS = 14;

export type Letter = string; // A..Z

export type LetterTile = {
  id: string;
  letter: Letter;
};

export class Game {
  readonly grid: LetterTile[][] = Array.from({ length: COLS }, () => []);

  constructor(private dictionary: Set<string>) {
    setTimeout(() => {
      this.addLetterTile(
        {
          id: "tile",
          letter: "a",
        },
        0,
      );
    }, 1000);
  }

  isValidWord(word: string) {
    return this.dictionary.has(word);
  }

  addLetterTile(tile: LetterTile, col: number) {
    this.grid[col].push(tile);
    eventDispatcher.fire("grid-changed", this.grid);
  }
}

import { eventDispatcher } from "./event-dispatcher";
import { LetterSpawner } from "./letter-spawner";

export const COLS = 8;
export const ROWS = 14;

export type Letter = string; // A..Z

const TILE_COLORS = [
  "#4FA9A8", // teal
  "#E08C3C", // orange
  "#5C8DB8", // blue
  "#6DAA6B", // green
  "#B08A5A", // brown
  "#D9D3C7", // light gray
  "#B7B1A8", // mid gray
];

export type LetterTile = {
  id: string;
  letter: Letter;
  color: string;
};

export class Game {
  readonly grid: LetterTile[][] = Array.from({ length: COLS }, () => []);

  gameOver = false;

  private letterSpawner = new LetterSpawner();
  private nextId = 0;

  constructor(private dictionary: Set<string>) {
    this.getLetterTile();

    // setInterval(() => {
    //   if (!this.gameOver) this.getLetterTile();
    // }, 10);
  }

  isValidWord(word: string) {
    return this.dictionary.has(word);
  }

  addLetterTile(tile: LetterTile, col: number) {
    this.grid[col].push(tile);
    eventDispatcher.fire("grid-changed", this.grid);

    // Check for end game
    if (this.isGameOver()) {
      this.gameOver = true;
      eventDispatcher.fire("game-over", true);
    }
  }

  private getLetterTile() {
    // First, get the letter tile properties
    const id = `tile-${this.nextId++}`;
    const letter = this.letterSpawner.getLetter(this.grid);
    const color = TILE_COLORS[Math.floor(Math.random() * TILE_COLORS.length)];

    // Then, pick a column
    const col = this.getRandomColumnIndex();

    // Then add it
    this.addLetterTile({ id, letter, color }, col);
  }

  private getRandomColumnIndex() {
    const choices: number[] = [];

    // Pick 4 random columns
    for (let i = 0; i < 4; i++) {
      const rnd = Math.floor(Math.random() * COLS);
      choices.push(rnd);
    }

    // Choose shortest column
    let shortestLength = Infinity;
    let winningColumn = 0;

    for (let i = 0; i < 4; i++) {
      const colIndex = choices[i];
      const column = this.grid[colIndex];
      if (column.length < shortestLength) {
        shortestLength = column.length;
        winningColumn = colIndex;
      }
    }

    return winningColumn;
  }

  private isGameOver() {
    for (const col of this.grid) {
      if (col.length === ROWS) return true;
    }

    return false;
  }
}

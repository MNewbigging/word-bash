import { eventDispatcher } from "./event-dispatcher";
import { LetterSpawner, LetterTile } from "./letter-spawner";

export const COLS = 8;
export const ROWS = 14;

export class Game {
  readonly grid: LetterTile[][] = Array.from({ length: COLS }, () => []);

  gameOver = false;

  private letterSpawner: LetterSpawner;

  constructor(private dictionary: Set<string>) {
    this.letterSpawner = new LetterSpawner(this.grid, this.addLetterTile);
    this.letterSpawner.scheduleNextSpawn();
  }

  isValidWord(word: string) {
    return this.dictionary.has(word);
  }

  private addLetterTile = (tile: LetterTile, col: number) => {
    this.grid[col].push(tile);
    eventDispatcher.fire("grid-changed", this.grid);

    // Check for end game
    if (this.isGameOver()) {
      this.gameOver = true;
      eventDispatcher.fire("game-over", true);
    }
  };

  private isGameOver() {
    for (const col of this.grid) {
      if (col.length === ROWS) return true;
    }

    return false;
  }
}

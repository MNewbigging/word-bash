import { eventDispatcher } from "./event-dispatcher";
import { Letter, LetterSpawner, LetterTile } from "./letter-spawner";

export const COLS = 8;
export const ROWS = 14;

export class Game {
  readonly grid: LetterTile[][] = Array.from({ length: COLS }, () => []);

  gameOver = false;

  wordBarText = "";

  private letterSpawner: LetterSpawner;

  constructor(private dictionary: Set<string>) {
    this.letterSpawner = new LetterSpawner(this.grid, this.addLetterTile);
    this.letterSpawner.scheduleNextSpawn();

    window.addEventListener("keydown", this.onKeyDown);
  }

  isValidWord(word: string) {
    return this.dictionary.has(word);
  }

  private addLetterTile = (tile: LetterTile, col: number) => {
    this.grid[col].push(tile);
    eventDispatcher.fire("grid-changed", null);

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

  private onKeyDown = (e: KeyboardEvent) => {
    // Only bother with letter keys
    if (!this.isLetterKey(e)) return;

    // Get a matching tile in play that isn't already in use
    const tile = this.getLowestFreeMatchingLetter(e.key);
    if (!tile) return;

    // Use it
    tile.inUse = true;

    // Add it to the word bar
    this.wordBarText += tile.letter;
    eventDispatcher.fire("letter-used-change", null);
  };

  private isLetterKey(e: KeyboardEvent) {
    return /^[a-zA-Z]$/.test(e.key);
  }

  private getLowestFreeMatchingLetter(letter: Letter): LetterTile | undefined {
    // Not making creation timestamps for letters so can't get oldest
    // Which means the bottom right might be oldest, but any left of it in bot row will be taken first
    let lowestIndex = ROWS;
    let lowestTile: LetterTile | undefined = undefined;

    this.grid.forEach((col) => {
      col.forEach((tile, tileIndex) => {
        if (tile.inUse) return;
        if (tile.letter !== letter) return;

        if (tileIndex < lowestIndex) {
          lowestIndex = tileIndex;
          lowestTile = tile;
        }
      });
    });

    return lowestTile;
  }
}

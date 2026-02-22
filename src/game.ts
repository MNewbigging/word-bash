import { eventDispatcher } from "./event-dispatcher";
import { Letter, LetterSpawner, LetterTile } from "./letter-spawner";

export const COLS = 8;
export const ROWS = 14;

export class Game {
  private initialised = false;

  readonly grid: LetterTile[][] = Array.from({ length: COLS }, () => []);

  gameOver = false;
  wordBar: LetterTile[] = [];

  // Stats
  score = 0;
  wordsFormed = 0;
  longestWord = "";

  private minWordLength = 3;
  private letterSpawner: LetterSpawner;
  private LETTER_SCORES: Record<string, number> = {
    A: 1,
    B: 3,
    C: 3,
    D: 2,
    E: 1,
    F: 4,
    G: 2,
    H: 4,
    I: 1,
    J: 8,
    K: 5,
    L: 1,
    M: 3,
    N: 1,
    O: 1,
    P: 3,
    Q: 10,
    R: 1,
    S: 1,
    T: 1,
    U: 1,
    V: 4,
    W: 4,
    X: 8,
    Y: 4,
    Z: 10,
  };

  constructor(private dictionary: Set<string>) {
    this.letterSpawner = new LetterSpawner(this.grid, this.addLetterTile);
  }

  start() {
    if (!this.initialised) {
      this.initialised = true;
      this.letterSpawner.start();
      // Initial letter group
      for (let i = 0; i < 12; i++) {
        this.letterSpawner.spawnLetterTile();
      }
    }

    this.letterSpawner.resume();
  }

  pause() {
    this.letterSpawner.pause();
    eventDispatcher.fire("pause-change", true);
  }

  resumse() {
    this.letterSpawner.resume();
    eventDispatcher.fire("pause-change", false);
  }

  dispose() {
    this.letterSpawner.pause();
  }

  submitWord() {
    if (this.wordBar.length < this.minWordLength) return;

    // Submit the formed word for inspection!
    const word = this.wordBar.map((tile) => tile.letter).join("");
    if (this.isValidWord(word)) {
      // Great!
      this.scoreWord(word);
      this.clearWordBar();
      eventDispatcher.fire("valid-word", null);
    } else {
      // Feedback
      eventDispatcher.fire("invalid-word", null);
    }
  }

  useLetter(tile: LetterTile) {
    if (tile.inUse) return;

    // Use it
    tile.inUse = true;

    // Add it to the word bar
    this.wordBar.push(tile);
    eventDispatcher.fire("word-bar-changed", null);
  }

  unuseLetter(tile: LetterTile) {
    if (!tile.inUse) return;

    tile.inUse = false;

    // Remove from word bar
    this.wordBar = this.wordBar.filter((wbTile) => wbTile.id !== tile.id);
    eventDispatcher.fire("word-bar-changed", null);
  }

  deleteWordBar() {
    this.wordBar.forEach((tile) => (tile.inUse = false));
    this.wordBar = [];
    eventDispatcher.fire("word-bar-changed", null);
  }

  private isValidWord(word: string) {
    return this.dictionary.has(word.toLowerCase());
  }

  private addLetterTile = (tile: LetterTile, col: number) => {
    this.grid[col].push(tile);
    eventDispatcher.fire("grid-changed", null);

    // Check for end game
    if (this.isGameOver()) {
      this.gameOver = true;
      console.log("pausing");
      this.letterSpawner.pause();
      eventDispatcher.fire("game-over", true);
    }
  };

  private isGameOver() {
    for (const col of this.grid) {
      if (col.length === ROWS) return true;
    }

    return false;
  }

  onKeyDown = (e: KeyboardEvent) => {
    // Handle delete
    if (e.key === "Backspace") {
      if (e.ctrlKey) this.deleteWordBar();
      else this.deleteLastLetter();
      return;
    } else if (e.key === "Enter") {
      this.submitWord();
      return;
    }

    // Only bother with letter keys
    if (!this.isLetterKey(e)) return;

    // Get a matching tile in play that isn't already in use
    const tile = this.getLowestFreeMatchingLetter(e.key.toUpperCase());
    if (!tile) return;

    this.useLetter(tile);
  };

  private deleteLastLetter() {
    // Remove the last letter from the word bar
    const lastLetter = this.wordBar.pop();
    if (!lastLetter) return;

    // No longer in use
    lastLetter.inUse = false;
    eventDispatcher.fire("word-bar-changed", null);
  }

  private scoreWord(word: string) {
    // Use scrabble scores plus a length bonus
    const baseScore = [...word].reduce(
      (sum, letter) => sum + this.LETTER_SCORES[letter],
      0,
    );
    const multiplier = 1 + Math.max(0, word.length - 4) * 0.2; // bonus from 5+
    const wordPoints = Math.floor(baseScore * multiplier);
    this.score += wordPoints;

    // Track total number of words
    this.wordsFormed++;

    // Track longest word
    if (word.length > this.longestWord.length) this.longestWord = word;

    eventDispatcher.fire("score-changed", null);
  }

  private clearWordBar() {
    const ids = new Set(this.wordBar.map((tile) => tile.id));

    for (const col of this.grid) {
      for (let i = col.length - 1; i >= 0; i--) {
        const tile = col[i];
        if (ids.has(tile.id)) {
          col.splice(i, 1);
        }
      }
    }

    this.wordBar = [];
    eventDispatcher.fire("word-bar-changed", null);
  }

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

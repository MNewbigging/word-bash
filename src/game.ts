const COLS = 8;
const ROWS = 14;

type Letter = string; // A..Z
type Tile = {
  id: string;
  letter: Letter;
};

export class Game {
  private grid: Tile[][] = Array.from({ length: COLS }, () => []);

  constructor(private dictionary: Set<string>) {
    // Manually add letters to get rendering working
    this.grid[0].push({ id: "tile", letter: "a" });
  }

  isValidWord(word: string) {
    return this.dictionary.has(word);
  }
}

/**
 * Falling letters:
 *
 * Once a letter is spawned, it should fall downwards within its column and come to a stop at the last available row position (aka landing position).
 * This landing position might change during the fall; as players use existing letters, this may free up space.
 * So the falling letter needs to check each frame that it falls what the furthest available landing space is.
 */

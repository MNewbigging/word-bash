import { COLS } from "./game";

const TILE_COLORS = [
  "#4FA9A8", // teal
  "#E08C3C", // orange
  "#5C8DB8", // blue
  "#6DAA6B", // green
  "#B08A5A", // brown
  "#D9D3C7", // light gray
  "#B7B1A8", // mid gray
];

export type Letter = string; // A..Z

export type LetterTile = {
  id: string;
  letter: Letter;
  color: string;
  inUse: boolean;
};

export class LetterSpawner {
  private readonly SCRABBLE_WEIGHTS: Record<Letter, number> = {
    A: 9,
    B: 2,
    C: 2,
    D: 4,
    E: 12,
    F: 2,
    G: 3,
    H: 2,
    I: 9,
    J: 1,
    K: 1,
    L: 4,
    M: 2,
    N: 6,
    O: 8,
    P: 2,
    Q: 1,
    R: 6,
    S: 4,
    T: 6,
    U: 4,
    V: 2,
    W: 2,
    X: 1,
    Y: 2,
    Z: 1,
  };

  private VOWELS = new Set<Letter>(["A", "E", "I", "O", "U"]);
  private vowelChance = 0.45;

  private nextId = 0;
  private startTime = 0;
  private startSpawnInterval = 2000; // ms
  private minSpawnInterval = 300; // ms
  private spawnRampSpeed = 0.03; // smaller = slower ramp
  private spawnTimeout = 0;

  constructor(
    private grid: LetterTile[][],
    private addLetterTile: (tile: LetterTile, col: number) => void,
  ) {
    this.startTime = performance.now();
  }

  pause() {
    clearTimeout(this.spawnTimeout);
  }

  resume() {
    this.scheduleNextSpawn();
    // todo handle time spent paused - should not affect elapsed seconds
  }

  scheduleNextSpawn() {
    const elapsedSeconds = (performance.now() - this.startTime) / 1000;
    const spawnDelay = this.getNextSpawnInterval(elapsedSeconds);
    this.spawnTimeout = setTimeout(() => {
      // todo handle paused state
      this.spawnLetterTile();
      this.scheduleNextSpawn();
    }, spawnDelay);
  }

  private getNextSpawnInterval(elapsedSeconds: number) {
    return (
      this.minSpawnInterval +
      (this.startSpawnInterval - this.minSpawnInterval) *
        Math.exp(-this.spawnRampSpeed * elapsedSeconds)
    );
  }

  private spawnLetterTile() {
    // First, get the letter tile properties
    const id = `tile-${this.nextId++}`;
    const letter = this.getLetter(this.grid).toLowerCase();
    const color = TILE_COLORS[Math.floor(Math.random() * TILE_COLORS.length)];

    // Then, pick a column
    const col = this.getRandomColumnIndex();

    // Then add it
    this.addLetterTile({ id, letter, color, inUse: false }, col);
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

  private getLetter(grid: LetterTile[][]) {
    // Make a new weights object from the base weights
    const weights = { ...this.SCRABBLE_WEIGHTS };

    // Adjust weights
    this.applyQBiasToWeights(grid, weights);
    this.applyVowelBiasToWeights(weights);

    return this.getWeightedLetter(weights);
  }

  private applyQBiasToWeights(
    grid: LetterTile[][],
    weights: Record<Letter, number>,
  ) {
    let hasQ = false;
    let hasU = false;

    for (const col of grid) {
      for (const tile of col) {
        if (tile.letter === "Q") hasQ = true;
        if (tile.letter === "U") hasU = true;
        if (hasQ && hasU) break; // can exit row early since both are already true
      }
      if (hasQ && hasU) break; // early exit col
    }

    if (hasQ && !hasU) {
      weights["Q"] = 0; // don't allow a second Q without a U
      weights["U"] = 10; // boost U chance
    }
  }

  private applyVowelBiasToWeights(weights: Record<Letter, number>) {
    const wantVowel = Math.random() < this.vowelChance;

    for (const [letter, _weight] of Object.entries(weights)) {
      const isVowel = this.VOWELS.has(letter);

      if (wantVowel && !isVowel) weights[letter] = 0;
      if (!wantVowel && isVowel) weights[letter] = 0;
    }
  }

  private getWeightedLetter(weights: Record<Letter, number>) {
    // Get total weight
    let total = 0;
    for (const weight of Object.values(weights)) total += weight;

    let rnd = Math.random() * total;
    for (const [letter, weight] of Object.entries(weights)) {
      rnd -= weight;
      if (rnd <= 0) return letter;
    }

    // Fallback
    return "E";
  }
}

export class Game {
  constructor(private dictionary: Set<string>) {}

  isValidWord(word: string) {
    return this.dictionary.has(word);
  }
}

class Player {
  #name;

  #gamesPlayed;

  #won;

  #lost;

  #symbol;

  constructor(name, symbol) {
    this.#name = name;
    this.#gamesPlayed = 0;
    this.#won = 0;
    this.#lost = 0;
    this.#symbol = symbol;
  }

  getName() {
    return this.#name;
  }

  getGamesPlayed() {
    return this.#gamesPlayed;
  }

  getWon() {
    return this.#won;
  }

  getLost() {
    return this.#lost;
  }

  getSymbol() {
    return this.#symbol;
  }

  setGamesPlayed() {
    this.#gamesPlayed += 1;
  }

  setWon() {
    this.#won += 1;
  }

  setLost() {
    this.#lost += 1;
  }
}

export default Player;

class TicTacToeGame {
  constructor() {
    this.currentPlayer = 'X';
    this.turns = 0;
    this.plays = [];
  }

  init() {
    let cells = document.getElementsByClassName("cell");

    for (let i = 0; i < cells.length; i++) {
      cells[i].addEventListener('click', (e) => {
        this.markCell(i);
      })
    }
  }

  markCell(spot) {
    let cell = document.getElementsByClassName(spot.toString())[0];
    if (cell.innerHTML === 'X' || cell.innerHTML === 'O') {
      return;
    }
    cell.innerHTML = this.currentPlayer;
    this.changeCurrentPlayer();
  }

  changeCurrentPlayer() {
    if (this.currentPlayer === 'X') {
      this.currentPlayer = 'O';
    } else {
      this.currentPlayer = 'X';
    }
  }

  checkRounds() {
    console.log(this.turns);
  }

  displayMessage() {

  }
}

const myGame = new TicTacToeGame();
myGame.init();
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

    for (let i = 0; i < 9; i++) {
      this.plays.push(null);
    }
  }

  markCell(spot) {
    let cell = document.getElementsByClassName(spot.toString())[0];
    if (cell.innerHTML === 'X' || cell.innerHTML === 'O') {
      return;
    }
    cell.innerHTML = this.currentPlayer;
    this.placePiece(spot, this.currentPlayer);
    this.changeCurrentPlayer();
    this.checkAndIncrementTurns();

  }

  placePiece(spot, currentPlayer) {
    this.plays[spot] = currentPlayer;
    console.log(this.plays);
  }

  changeCurrentPlayer() {
    if (this.currentPlayer === 'X') {
      this.currentPlayer = 'O';
      document.getElementsByClassName('turn')[0].innerHTML = this.currentPlayer
    } else {
      this.currentPlayer = 'X';
      document.getElementsByClassName('turn')[0].innerHTML = this.currentPlayer
    }
  }

  checkAndIncrementTurns() {
    if (this.turns === 8) {
      this.turns++;
      document.getElementsByClassName('plays')[0].innerHTML = this.turns
      this.displayMessage();
    } else {
      this.turns++;
      document.getElementsByClassName('plays')[0].innerHTML = this.turns
    }
  }

  checkVertical() {
    for (let i = 0; i < 3; i++) {

    }
  }

  checkHorizontal() {

  }

  checkDiagonals() {

  }

  checkAll() {
    return this.checkVertical && this.checkHorizontal && this.checkDiagonals;
  }

  displayMessage() {

  }
}

const myGame = new TicTacToeGame();
myGame.init();
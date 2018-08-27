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
    this.checkVertical();
    this.checkHorizontal();
    // this.checkAll();
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
    // for (let i = 0; i < 3; i = i++) {
    //   const arrOfInputs = [];
    //   arrOfInputs.push(this.plays[i], this.plays[i + 3], this.plays[i + 6]);

    //   const allEqual = arrOfInputs.every((v) => {
    //     return v === arrOfInputs[0]
    //   });

    //   if (allEqual && !arrOfInputs.includes(null)) {
    //     console.log(arrOfInputs);
    //     console.log('WIN VERTICAL')
    //     return true;
    //   }
    // }
  }

  checkHorizontal() {
    // for (let i = 0; i < 9; i = i + 3) {
    //   const arrOfInputs = [];
    //   arrOfInputs.push(this.plays[i], this.plays[i + 1], this.plays[i + 2]);

    //   const allEqual = arrOfInputs.every((v) => {
    //     return v === arrOfInputs[0]
    //   });

    //   if (allEqual && !arrOfInputs.includes(null)) {
    //     console.log(arrOfInputs);
    //     console.log('WIN HORIZONTAL')
    //     return true;
    //   }
    // }
  }

  checkDiagonals() {

  }

  // checkAll() {
  //   return this.checkVertical() || this.checkHorizontal();
  // }

  displayMessage() {
    // let cells = document.getElementsByClassName("cell");
    // for (let i = 0; i < cells.length; i++) {
    //   cells[i].removeEventListener('click');
    // }
  }

  resetGame() {

  }
}

const myGame = new TicTacToeGame();
myGame.init();
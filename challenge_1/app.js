class TicTacToeGame {
  constructor() {
    this.currentPlayer = 'X';
    this.turns = 0;
    this.plays = [];
  }

  init() {
    console.log('GAME START');
    this.populatePlays();
    this.addListeners();
    this.clearBoard();
    this.resetGameInfo();
  }

  clearBoard() {
    let cells = document.getElementsByClassName("cell");
    for (let i = 0; i < cells.length; i++) {
      cells[i].innerHTML = '';
    }
  }

  resetGameInfo() {
    this.turns = 0;
    document.getElementsByClassName('plays')[0].innerHTML = '0';
    this.currentPlayer = 'X';
    document.getElementsByClassName('turn')[0].innerHTML = 'X'
    this.populatePlays();
  }

  addListeners() {
    let cells = document.getElementsByClassName("cell");
    for (let i = 0; i < cells.length; i++) {
      cells[i].addEventListener('click', (e) => {
        this.markCell(i);
      })
    }
    let reset = document.getElementsByClassName("reset")[0];
    reset.addEventListener('click', (e) => {
      this.init();
    })
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

    if (this.checkAll()) {
      this.displayMessage();
    }
    this.checkDiagonals();
  }

  changeCurrentPlayer() {
    document.getElementsByClassName('turn')[0].innerHTML = this.currentPlayer === 'X' ? 'O' : 'X'
    this.currentPlayer = this.currentPlayer === 'X' ? 'O' : 'X'
  }

  checkAndIncrementTurns() {
    if (this.turns === 8) {
      this.turns++;
      document.getElementsByClassName('plays')[0].innerHTML = this.turns
    } else {
      this.turns++;
      document.getElementsByClassName('plays')[0].innerHTML = this.turns
    }
  }

  checkVertical() {
    for (let i = 0; i < 3; i++) {
      const arrOfInputs = [];
      arrOfInputs.push(this.plays[i], this.plays[i + 3], this.plays[i + 6]);

      const allEqual = arrOfInputs.every((v) => {
        return v === arrOfInputs[0]
      });

      if (allEqual && !arrOfInputs.includes(null)) {
        // console.log(arrOfInputs);
        console.log('WIN VERTICAL')
        return true;
      }
    }
  }

  checkHorizontal() {
    for (let i = 0; i < 9; i = i + 3) {
      const arrOfInputs = [];
      arrOfInputs.push(this.plays[i], this.plays[i + 1], this.plays[i + 2]);

      const allEqual = arrOfInputs.every((v) => {
        return v === arrOfInputs[0]
      });

      if (allEqual && !arrOfInputs.includes(null)) {
        // console.log(arrOfInputs);
        console.log('WIN HORIZONTAL')
        return true;
      }
    }
  }

  checkDiagonals() {
    const leftDown = [];
    leftDown.push(this.plays[0], this.plays[4], this.plays[8]);
    const rightDown = [];
    rightDown.push(this.plays[2], this.plays[4], this.plays[6]);

    const leftEqual = leftDown.every((v) => {
      return v === leftDown[0]
    });

    if (leftEqual && !leftDown.includes(null)) {

      console.log('WIN LEFT DOWN');
      return true;
    }

    const rightEqual = rightDown.every((v) => {
      return v === rightDown[0]
    });

    if (rightEqual && !rightDown.includes(null)) {

      console.log('WIN RIGHT DOWN');
      return true;
    }

  }

  checkAll() {
    return this.checkVertical() || this.checkHorizontal();
  }

  displayMessage() {
    console.log('GAME OVER');
  }

  removeListeners() {
    let cells = document.getElementsByClassName("cell");
    for (let i = 0; i < cells.length; i++) {
      cells[i].removeEventListener('click');
    }
    console.log('GAME OVER');
  }

  populatePlays() {
    for (let i = 0; i < 9; i++) {
      this.plays.push(null);
    }
  }
}

const myGame = new TicTacToeGame();
myGame.init();
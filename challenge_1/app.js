class TicTacToeView { }
class TicTacToeController { }
class TicTacToeModel { }

class TicTacToeGame {
  constructor() {
    this.currentPlayer = undefined;
    this.turns = 0;
    this.plays = [];
    this.X = 0;
    this.O = 0;
    this.lastWinner = undefined;
  }

  init(firstPlayer = 'X') {
    console.log('GAME START');
    this.currentPlayer = firstPlayer;

    this.populatePlays();
    this.addListeners();
    this.clearBoard();
    this.resetGameInfo(firstPlayer);
  }

  populatePlays() {
    for (let i = 0; i < 9; i++) {
      this.plays[i] = null;
    }
  }

  addListeners() {
    let cells = document.getElementsByClassName("cell");

    for (let i = 0; i < cells.length; i++) {
      cells[i].addEventListener('click', (e) => {
        this.markCell(i);
      })
    }

    let addNameButton1 = document.getElementsByClassName("add-name-1")[0];

    addNameButton1.addEventListener('click', (e) => {
      console.log('hit');
      let name = document.getElementsByClassName('name-input-1')[0].value
      document.getElementsByClassName('name-input-1')[0].value = '';
      document.getElementsByClassName('player-1')[0].innerHTML = name.toUpperCase();
    })

    let addNameButton2 = document.getElementsByClassName("add-name-2")[0];
    addNameButton2.addEventListener('click', (e) => {
      console.log('hit');
      let name = document.getElementsByClassName('name-input-2')[0].value
      document.getElementsByClassName('name-input-2')[0].value = '';
      console.log(typeof name);
      document.getElementsByClassName('player-2')[0].innerHTML = name.toUpperCase();
    })

    let reset = document.getElementsByClassName("reset")[0];

    reset.addEventListener('click', (e) => {
      this.init(this.lastWinner);
    })
  }

  clearBoard() {
    let cells = document.getElementsByClassName("cell");
    for (let i = 0; i < cells.length; i++) {
      cells[i].innerHTML = '';
    }
  }

  resetGameInfo(firstPlayer = 'X') {
    this.turns = 0;
    this.currentPlayer = firstPlayer;
    document.getElementsByClassName('player-1')[0].classList.remove('winner');
    document.getElementsByClassName('player-2')[0].classList.remove('winner');
    document.getElementsByClassName('plays')[0].innerHTML = '0';
    document.getElementsByClassName('turn')[0].innerHTML = firstPlayer;
    this.populatePlays();
  }

  markCell(spot) {
    let cell = document.getElementsByClassName(spot.toString())[0];

    if (cell.innerHTML === 'X' || cell.innerHTML === 'O') {
      return;
    }

    cell.innerHTML = this.currentPlayer;
    this.placePiece(spot, this.currentPlayer);
    this.changeCurrentPlayer();
    this.incrementTurns();
  }

  placePiece(spot, currentPlayer) {
    this.plays[spot] = currentPlayer;

    if (this.checkAll()) {
      this.displayMessage();
    }
  }

  changeCurrentPlayer() {
    document.getElementsByClassName('turn')[0].innerHTML = this.currentPlayer === 'X' ? 'O' : 'X'
    this.currentPlayer = this.currentPlayer === 'X' ? 'O' : 'X'
  }

  incrementTurns() {
    document.getElementsByClassName('plays')[0].innerHTML = ++this.turns
  }

  setScore(winner) {
    this[winner]++;
    document.getElementsByClassName(this.lastWinner)[0].innerHTML = this[winner];
    console.log(winner);

    let highlight = winner === 'X' ? 'player-1' : 'player-2'
    document.getElementsByClassName(highlight)[0].classList.add("winner");
  }

  checkVertical() {
    for (let i = 0; i < 3; i++) {
      const arrOfInputs = [];
      arrOfInputs.push(this.plays[i], this.plays[i + 3], this.plays[i + 6]);

      const allEqual = arrOfInputs.every((v) => {
        return v === arrOfInputs[0]
      });

      if (allEqual && !arrOfInputs.includes(null)) {
        this.lastWinner = arrOfInputs[0]
        this.setScore(this.lastWinner);
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
        this.lastWinner = arrOfInputs[0]
        this.setScore(this.lastWinner);
        console.log('WIN HORIZONTAL')
        return true;
      }
    }
  }

  checkDiagonals() {
    return this.checkLeftDownDiagonal() || this.checkRightDownDiagonal();
  }

  checkLeftDownDiagonal() {
    const leftDown = [];
    leftDown.push(this.plays[0], this.plays[4], this.plays[8]);

    const leftEqual = leftDown.every((v) => {
      return v === leftDown[0]
    });

    if (leftEqual && !leftDown.includes(null)) {
      this.lastWinner = leftDown[0]
      this.setScore(this.lastWinner);
      console.log('WIN LEFT DOWN');
      return true;
    }
  }

  checkRightDownDiagonal() {
    const rightDown = [];
    rightDown.push(this.plays[2], this.plays[4], this.plays[6]);
    const rightEqual = rightDown.every((v) => {
      return v === rightDown[0]
    });

    if (rightEqual && !rightDown.includes(null)) {
      this.lastWinner = rightDown[0]
      this.setScore(this.lastWinner);
      console.log('WIN RIGHT DOWN');
      return true;
    }
  }

  checkAll() {
    return this.checkVertical() || this.checkHorizontal() || this.checkDiagonals();
  }

  displayMessage() {
    console.log('GAME OVER');
  }
}

const myGame = new TicTacToeGame();
myGame.init();
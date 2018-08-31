import React from 'react';
import ReactDOM from 'react-dom';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      board: [
        [null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null]
      ],
      currentPlayer: 'RED',
      active: true
    }

    this.handlePiecePlacement = this.handlePiecePlacement.bind(this);
    this.checkForHorizontalWins = this.checkForHorizontalWins.bind(this);
  }

  checkForHorizontalWins(row) {
    const rowToCheck = this.state.board[row].map((spot) => {
      return spot;
    });



    console.log(rowToCheck.join(''));
  }

  handlePiecePlacement(spot) {
    if (this.state.active) {
      const board = this.state.board;
      const currentPlayer = this.state.currentPlayer;
      const column = spot.column;
      let row = 0;

      const place = { column: column }

      if (board[row + 1][column] === null) {
        while (row < 5 && board[row + 1][column] === null) {
          row++
        }
      }

      if (board[row][column] === null) {
        place.row = row;

        const newBoard = this.state.board.map((row) => {
          return row.slice();
        })
        newBoard[place.row][place.column] = this.state.currentPlayer;

        let nextPlayer = currentPlayer === 'RED' ? 'BLK' : 'RED';

        this.setState({
          board: newBoard,
          currentPlayer: nextPlayer
        }, () => {
          this.checkForHorizontalWins(place.row);
        })
      }
    }
  }

  render() {
    return (
      <div className="app">
        <h1 className="title">connect4haha</h1>
        <h2 className="turn">TURN: {this.state.currentPlayer}</h2>

        {this.state.board.map((row, i) => {
          return (
            <Row
              key={i}
              spotInRow={i}
              row={row}
              placePiece={this.handlePiecePlacement}
            />
          )

        })}
      </div>
    )
  }
}

const Row = ({ row, spotInRow, placePiece }) => {
  return (
    <div className="row">
      {row.map((space, i) => {
        return (
          <Space
            row={row}
            placePiece={placePiece}
            key={i}
            spot={{ row: spotInRow, column: i }} />
        )
      })
      }
    </div>
  )
}

const Space = ({ placePiece, spot, row }) => {
  const occupancy = row[spot.column];
  let color;

  if (occupancy === 'RED') {
    color = 'red';
  } else if (occupancy === 'BLK') {
    color = 'black';
  } else {
    color = 'white';
  }

  return (
    <div style={
      { background: color }
    }
      className="space"
      onClick={() => { placePiece(spot) }}>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('app'));


import React from 'react';
import ReactDOM from 'react-dom';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      board: [
        ['NAH', 'NAH', 'NAH', 'NAH', 'NAH', 'NAH', 'NAH'],
        ['NAH', 'NAH', 'NAH', 'NAH', 'NAH', 'NAH', 'NAH'],
        ['NAH', 'NAH', 'NAH', 'NAH', 'NAH', 'NAH', 'NAH'],
        ['NAH', 'NAH', 'NAH', 'NAH', 'NAH', 'NAH', 'NAH'],
        ['NAH', 'NAH', 'NAH', 'NAH', 'NAH', 'NAH', 'NAH'],
        ['NAH', 'NAH', 'NAH', 'NAH', 'NAH', 'NAH', 'NAH']],
      currentPlayer: 'RED',
      winner: null,
      active: true
    }

    this.handlePiecePlacement = this.handlePiecePlacement.bind(this);
    this.checkForHorizontalWins = this.checkForHorizontalWins.bind(this);
    this.checkForVerticalWins = this.checkForVerticalWins.bind(this);
    this.generateLeftDiagonal = this.generateLeftDiagonal.bind(this);
    this.generateRightDiagonal = this.generateRightDiagonal.bind(this);
    this.generateRow = this.generateRow.bind(this);
  }

  checkForHorizontalWins(row) {
    const rowToCheck = this.state.board[row].map((spot) => {
      return spot;
    });

    let rowStr = rowToCheck.join('');

    if (rowStr.includes('REDREDREDRED') || rowStr.includes('BLKBLKBLKBLK')) {
      this.setState({
        active: false
      }, () => {
        console.log('WINNER: HORIZONTAL');
      })
    }
  }

  checkForVerticalWins(column) {
    const columnToCheck = this.state.board.map(row => {
      return row[column]
    })

    const columnStr = columnToCheck.join('');

    if (columnStr.includes('REDREDREDRED') || columnStr.includes('BLKBLKBLKBLK')) {
      this.setState({
        active: false
      }, () => {
        console.log('WINNER: VERTICAL');
      })
    }
  }

  checkForDiagonalWins(row, column) {
    const rightDiagonal = this.generateRightDiagonal(row, column);
    const leftDiagonal = this.generateLeftDiagonal(row, column);

    const comparator = (spot1, spot2) => {
      return spot1.column - spot2.column;
    }

    rightDiagonal.sort(comparator);
    leftDiagonal.sort(comparator);

    const rightCheck = this.generateRow(rightDiagonal);
    const leftCheck = this.generateRow(leftDiagonal);

    const rightStr = rightCheck.join('');
    const leftStr = leftCheck.join('');

    if (rightStr.includes('REDREDREDRED') || rightStr.includes('BLKBLKBLKBLK')) {
      this.setState({
        active: false
      }, () => {
        console.log('WINNER: RIGHT DIAGONAL');
      })
    } else if (leftStr.includes('REDREDREDRED') || rightStr.includes('BLKBLKBLKBLK')) {
      this.setState({
        active: false
      }, () => {
        console.log('WINNER: LEFT DIAGONAL');
      })
    }
  }

  generateRow(arrOfSpotsOnBoard) {
    console.log(arrOfSpotsOnBoard);
    return arrOfSpotsOnBoard.map((spot) => {
      return this.state.board[spot.row][spot.column];
    })
  }

  generateLeftDiagonal(row, column) {
    const LD = [{ row, column }];
    const top = [];
    const bottom = [];

    var topLDrow = row;
    var topLDcolumn = column;
    while (topLDrow > 0 && topLDcolumn > 0) {
      topLDrow -= 1;
      topLDcolumn -= 1;
      top.push({ row: topLDrow, column: topLDcolumn });
    }

    var bottomLDrow = row;
    var bottomLDcolumn = column;
    while (bottomLDrow < 5 && bottomLDcolumn < 6) {
      bottomLDrow += 1;
      bottomLDcolumn += 1;
      bottom.push({ row: bottomLDrow, column: bottomLDcolumn });
    }
    return LD.concat(top, bottom)
  }

  generateRightDiagonal(row, column) {
    const RD = [{ row, column }];
    const top = [];
    const bottom = []

    var topRDrow = row;
    var topRDcolumn = column;
    while (topRDrow > 0 && topRDcolumn < 6) {
      topRDrow -= 1;
      topRDcolumn += 1;
      top.push({ row: topRDrow, column: topRDcolumn });
    }

    var bottomRDrow = row;
    var bottomRDcolumn = column;
    while (bottomRDrow < 5 && bottomRDcolumn > 0) {
      bottomRDrow += 1;
      bottomRDcolumn -= 1;
      bottom.push({ row: bottomRDrow, column: bottomRDcolumn });
    }

    return RD.concat(top, bottom)
  }



  handlePiecePlacement(spot) {
    if (this.state.active) {
      const board = this.state.board;
      const currentPlayer = this.state.currentPlayer;
      const column = spot.column;
      let row = 0;

      const place = { column: column }

      if (board[row + 1][column] === 'NAH') {
        while (row < 5 && board[row + 1][column] === 'NAH') {
          row++
        }
      }

      if (board[row][column] === 'NAH') {
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
          this.checkForVerticalWins(place.column);
          this.checkForDiagonalWins(place.row, place.column);
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


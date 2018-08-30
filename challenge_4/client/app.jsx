import React from 'react';
import ReactDOM from 'react-dom';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      board: [
        [null, null, null, null, null, null, null], // R OW
        [null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null]
      ],
      currentPlayer: 'RED'
    }
  }

  handlePiecePlacement(spot) {

  }

  render() {
    return (
      <div className="app">
        <h1>connect4haha</h1>
        <h2>TURN: {this.state.currentPlayer}</h2>

        {this.state.board.map((row, column) => {
          return (
            <Row
              key={column}
              row={column}
              column={this.state.board[column]}
            />
          )

        })}
      </div>
    )
  }
}

const Row = ({ column, row }) => {
  return (
    <div className="row">
      {column.map((space, i) => {
        return <Space key={i} spot={{ row, i }} />
      })
      }
    </div>
  )
}

const Space = ({ spot }) => {
  return (
    <div
      className="space"
      onClick={() => { console.log(spot) }}>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('app'));


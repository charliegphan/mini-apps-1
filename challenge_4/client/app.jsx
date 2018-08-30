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
      ]
    }
  }

  componentDidMount() {

  }

  render() {
    return (
      <div>
        {this.state.board.map((row, column) => {
          return <Row key={column} column={this.state.board[column]} />
        })}
      </div>
    )
  }
}

const Row = ({ column }) => {
  return (
    <div className="row">
      {column.map((space, i) => {
        return <Space key={i} />
      })
      }
    </div>
  )
}

const Space = () => {

  return (<div className="space"></div>)
}

ReactDOM.render(<App />, document.getElementById('app'));


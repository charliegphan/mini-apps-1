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
    return (<div>APP</div>)
  }
}

const Row = () => {

}

const Space = () => {
  return (<div></div>)
}

ReactDOM.render(<App />, document.getElementById('app'));


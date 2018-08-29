class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      currentPage: 'home'
    }
  }

  render() {
    return (
      <div>
        <button>Checkout</button>
        <InfoForm />
      </div>
    )
  }
}

class InfoForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      email: '',
      password: ''
    }

    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    // this.handlePasswordChange = this.handlePassWordChange.bind(this);
  }

  handleNameChange(e) {
    this.setState({ name: e.target.value }, () => {
      console.log('name: ', this.state.name);
    });

  }

  handleEmailChange(e) {
    this.setState({ email: e.target.value }, () => {
      console.log('email: ', this.state.email);
    });
  }

  handlePasswordChange(e) {
    this.setState({ password: e.target.value }, () => {
      console.log('password: ', this.state.password);
    });
  }

  render() {
    return (
      <div>
        <form>
          <div>
            <label>
              Name
              <input value={this.state.name} onChange={this.handleNameChange}></input>
            </label>
          </div>

          <div>
            <label>
              Email
              <input value={this.state.email} onChange={this.handleEmailChange}></input>
            </label>
          </div>

          <div>
            <label>
              Password
            <input value={this.state.password} onChange={this.handlePasswordChange}></input>
            </label>
          </div>

        </form>
      </div>
    )
  }
}




// const ShippingForm = () => {
//   return (<div>shipping form lol</div>)
// }

// const BillingForm = () => {
//   return (<div>shipping form lol</div>)
// }

// const ConfirmationPage = () => {
//   return (
//     <div>ConfirmationPage</div>
//   )
// }

ReactDOM.render(<App />, document.getElementById('app'));


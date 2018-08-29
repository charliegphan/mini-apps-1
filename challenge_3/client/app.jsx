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
        <ShippingForm />
      </div>
    )
  }
}

// <InfoForm />

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
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
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

class ShippingForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      address1: '',
      address2: '',
      city: '',
      state: '',
      zipcode: '',
      phone: ''
    }

    this.handleAddress1Change = this.handleAddress1Change.bind(this);
    this.handleAddress2Change = this.handleAddress2Change.bind(this);
    this.handleCityChange = this.handleCityChange.bind(this);
    this.handleStateChange = this.handleStateChange.bind(this);
    this.handleZipcodeChange = this.handleZipcodeChange.bind(this);
    this.handlePhoneChange = this.handlePhoneChange.bind(this);
  }

  handleAddress1Change(e) {
    this.setState({ address1: e.target.value }, () => {
      // console.log(this.state.address1);
    });
  }

  handleAddress2Change(e) {
    this.setState({ address2: e.target.value }, () => {
      // console.log(this.state.address2);
    });
  }

  handleCityChange(e) {
    this.setState({ city: e.target.value }, () => {
      // console.log(this.state.city);
    });
  }

  handleStateChange(e) {
    this.setState({ state: e.target.value }, () => {
      // console.log(this.state.state);
    });
  }

  handleZipcodeChange(e) {
    this.setState({ zipcode: e.target.value }, () => {
      // console.log('zipcode:', this.state.zipcode);
    });
  }

  handlePhoneChange(e) {
    this.setState({ phone: e.target.value }, () => {
      // console.log('phone: ', this.state.phone);
    });
  }

  render() {
    return (
      <div>
        <form>
          <div>
            <label>
              Address Line 1
              <input value={this.state.address1} onChange={this.handleAddress1Change}></input>
            </label>
          </div>

          <div>
            <label>
              Address Line 2
            <input value={this.state.address2} onChange={this.handleAddress2Change}></input>
            </label>
          </div>

          <div>
            <label>
              City
              <input value={this.state.city} onChange={this.handleCityChange}></input>
            </label>
          </div>

          <div>
            <label>
              State
              <input value={this.state.state} onChange={this.handleStateChange}></input>
            </label>
          </div>

          <div>
            <label>
              Zipcode
            <input value={this.state.zipcode} onChange={this.handleZipcodeChange}></input>
            </label>
          </div>

          <div>
            <label>
              Phone
              <input value={this.state.phone} onChange={this.handlePhoneChange}></input>
            </label>
          </div>

        </form>
      </div>
    )
  }
}









// <div>
// <label>
//   TODOOOOOOO
// <input value={} onChange={}></input>
// </label>
// </div>


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


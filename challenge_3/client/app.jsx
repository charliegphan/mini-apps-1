class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      currentPage: 'home',
      id: '',
    }

    this.handleCheckoutClick = this.handleCheckoutClick.bind(this);
    this.handleNextPageClick = this.handleNextPageClick.bind(this);
  }

  handleNextPageClick(page) {
    console.log(page);
    this.setState({ currentPage: page });
  }

  handleCheckoutClick(page) {
    let data = { newRecord: 'son' };
    fetch('http://localhost:3000/checkout', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json; charset=utf-8"
      },
      body: JSON.stringify(data)
    }).then((response) => {
      this.handleNextPageClick(page);
      return response.json();
    }).then(data => {
      console.log(data)
      this.setState({ id: data })
    })
  };

  render() {
    const pages = {
      infoForm: <InfoForm id={this.state.id} handleNextPageClick={this.handleNextPageClick} />,
      shippingForm: <ShippingForm id={this.state.id} handleNextPageClick={this.handleNextPageClick} />,
      billingForm: <BillingForm id={this.state.id} handleNextPageClick={this.handleNextPageClick} />,
      summaryPage: <SummaryPage id={this.state.id} handleNextPageClick={this.handleNextPageClick} />
    }

    let show;

    if (this.state.currentPage === 'infoForm') {
      show = pages['infoForm']
    } else if (this.state.currentPage === 'shippingForm') {
      show = pages['shippingForm']
    } else if (this.state.currentPage === 'billingForm') {
      show = pages['billingForm']
    } else if (this.state.currentPage === 'summaryPage') {
      show = pages['summaryPage']
    } else {
      show = <button onClick={() => { this.handleCheckoutClick('infoForm') }}>Checkout</button>
    }

    console.log(axios);

    return (
      <div>
        {show}
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
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleNextClick = this.handleNextClick.bind(this);
  }

  handleNameChange(e) {
    this.setState({ name: e.target.value }, () => {
    });

  }

  handleEmailChange(e) {
    this.setState({ email: e.target.value }, () => {
    });
  }

  handlePasswordChange(e) {
    this.setState({ password: e.target.value }, () => {
    });
  }

  handleNextClick(page) {
    console.log(this.props.id, 'FROM INFO FORM');
    const data = {
      id: this.props.id,
      name: this.state.name,
      email: this.state.email,
      password: this.state.password
    }

    fetch('http://localhost:3000/infoForm', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json; charset=utf-8"
      },
      body: JSON.stringify(data)
    }).then(() => {
      this.props.handleNextPageClick(page);
    })
  }

  render() {
    return (
      <div>
        <label>Name</label>
        <div>
          <input value={this.state.name} onChange={this.handleNameChange}></input>
        </div>

        <label>Email</label>
        <div>
          <input value={this.state.email} onChange={this.handleEmailChange}></input>
        </div>

        <label>Password</label>
        <div>
          <input value={this.state.password} onChange={this.handlePasswordChange}></input>
        </div>

        <button onClick={() => { this.handleNextClick('shippingForm') }}>Next Page</button>
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
    this.handleNextClick = this.handleNextClick.bind(this);
  }

  handleAddress1Change(e) {
    this.setState({ address1: e.target.value }, () => {
    });
  }

  handleAddress2Change(e) {
    this.setState({ address2: e.target.value }, () => {
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

  handleNextClick(page) {
    console.log(this.props.id, 'FROM SHIPPING FORM');
    const data = {
      id: this.props.id,
      address1: this.state.address1,
      address2: this.state.address2,
      city: this.state.city,
      state: this.state.state,
      zipcode: this.state.zipcode,
      phone: this.state.phone
    }

    fetch('http://localhost:3000/shippingForm', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json; charset=utf-8"
      },
      body: JSON.stringify(data)
    }).then(() => {
      this.props.handleNextPageClick(page);
    })
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

        <button onClick={() => { this.handleNextClick('billingForm') }}>Next Page</button>
      </div>
    )
  }
}

class BillingForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      creditCard: '',
      expDate: '',
      CVV: '',
      billingZipcode: ''
    }

    this.handleCreditCardChange = this.handleCreditCardChange.bind(this);
    this.handleExpDateChange = this.handleExpDateChange.bind(this);
    this.handleCVVChange = this.handleCVVChange.bind(this);
    this.handleBillingZipcodeChange = this.handleBillingZipcodeChange.bind(this);
    this.handleNextClick = this.handleNextClick.bind(this);
  }

  handleCreditCardChange(e) {
    this.setState({ creditCard: e.target.value }, () => {
      console.log('credit card: ', this.state.creditCard);
    });
  }

  handleExpDateChange(e) {
    this.setState({ expDate: e.target.value }, () => {
      console.log('expDate: ', this.state.expDate);
    });
  }

  handleCVVChange(e) {
    this.setState({ CVV: e.target.value }, () => {
      console.log('CVV: ', this.state.CVV);
    });
  }

  handleBillingZipcodeChange(e) {
    this.setState({ billingZipcode: e.target.value }, () => {
      console.log('billingZipCode: ', this.state.billingZipcode);
    });
  }

  handleNextClick(page) {
    console.log(this.props.id, 'FROM BILLING FORM');

    const data = {
      id: this.props.id,
      creditCard: this.props.creditCard,
      expDate: this.state.expDate,
      CVV: this.state.CVV,
      billingZipCode: this.state.billingZipcode,
    }

    fetch('http://localhost:3000/billingForm', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json; charset=utf-8"
      },
      body: JSON.stringify(data)
    }).then((response) => {
      this.props.handleNextPageClick(page);
    })
  }

  render() {
    return (
      <div>
        <div>
          <label>
            Credit Card
            <input value={this.state.creditCard} onChange={this.handleCreditCardChange}></input>
          </label>
        </div>

        <div>
          <label>
            Exp Date
            <input value={this.state.expDate} onChange={this.handleExpDateChange}></input>
          </label>
        </div>

        <div>
          <label>
            CVV
            <input value={this.state.CVV} onChange={this.handleCVVChange}></input>
          </label>
        </div>

        <div>
          <label>
            Billing Zipcode
            <input value={this.state.billingZipcode} onChange={this.handleBillingZipcodeChange}></input>
          </label>
        </div>

        <button onClick={() => { this.handleNextClick('summaryPage') }}>Next Page</button>
      </div>
    )
  }
}

class SummaryPage extends React.Component {
  constructor(props) {
    super(props)
    this.state = { confirmationInfo: {} };
  }

  componentDidMount() {
    fetch('http://localhost:3000/confirmation', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json; charset=utf-8"
      },
      body: JSON.stringify({ id: this.props.id })
    }).then((response) => {
      return response.json()
    }).then(data => {
      this.handleFetch(data);
    })
  }

  handleFetch(data) {
    console.log(data);
    this.setState({ confirmationInfo: data }, () => {
      console.log(this.state);
    })
  }

  render() {
    return (
      <div>
        <h2>PURCHASE SUMMARY</h2>
        <h3>Personal Information</h3>
        <h3>Shipping Information</h3>
        <h3>Billing Information</h3>

        <button onClick={() => { this.props.handleNextPageClick('home') }}>Next Page</button>
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'));


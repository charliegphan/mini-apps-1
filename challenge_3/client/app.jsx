class App extends React.Component {
  constructor() {
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
        <ShippingForm />
        <BillingForm />
        <ConfirmationPage />
      </div>
    )
  }
}

const InfoForm = () => {
  return (
    <div>Info form</div>
  )
}

const ShippingForm = () => {
  return (
    <div>Shipping form</div>
  )
}

const BillingForm = () => {
  return (
    <div>Billing form</div>
  )
}

const ConfirmationPage = () => {
  return (
    <div>ConfirmationPage</div>
  )
}

ReactDOM.render(<App />, document.getElementById('app'));


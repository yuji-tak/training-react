import React, { Component } from 'react';

import CheckoutSummary from '../../Components/Order/CheckoutSummary/CheckoutSummary';

class Checkout extends Component {
  state = {
    ingredients: {
      salad: 1,
      meat: 1,
      cheese: 1,
      bacon: 1
    }
  }

  // class内でこのリテラルを用いるとthisが使える
  checktoutCancelledHandler = () => {
    this.props.history.goBack();
  }

  checktoutContinuedHandler = () => {
    this.props.history.replace('/checkout/contact-data')
  }

  render () {
    return (
      <>
        <CheckoutSummary
          ingredients={ this.state.ingredients }
          checktoutCancelled={ this.checktoutCancelledHandler }
          checktoutContinued={ this.checktoutContinuedHandler }/>
      </>
    );
  }

}

export default Checkout;

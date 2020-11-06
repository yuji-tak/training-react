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

  componentDidMount () {
    const query = new URLSearchParams(this.props.location.search);
    const ingredients = {};
    console.log('hihi', query)
    // Object.entries()で配列形式へ変換
    for ( let param of query.entries()) {
      // ここでparamのデータは[ 'salad', '1' ]の形になる
      // +はNumber型へ変換
      ingredients[param[0]] = +param[1];
    }
    this.setState({ ingredients: ingredients });
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

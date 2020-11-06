import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import CheckoutSummary from '../../Components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';

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
    // URLSearchParamsオブジェクトを返すコンストラクター
    // URLSearchParams.entries()このオブジェクトに含まれる全てのキーと値のペアを列挙するためのiteratorを返す
    // ?bacon=0&cheese=0&meat=1&salad=0
    const query = new URLSearchParams(this.props.location.search);
    const ingredients = {};
    // Object.entries()で配列形式へ変換
    for ( let param of query.entries()) {
      // ここでparamのデータは['salad', '1']の形になる
      // +はNumber型へ変換
      // ingredientsオブジェクトへプロパティと値を代入
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
          checkoutContinued={ this.checktoutContinuedHandler }/>
        <Route
          path={ this.props.match.path + '/contact-data' } component={ ContactData } />
      </>
    );
  }

}

export default Checkout;

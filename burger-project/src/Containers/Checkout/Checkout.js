import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import CheckoutSummary from '../../Components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';

class Checkout extends Component {
  state = {
    ingredients: null,
    price: 0
  }

  componentWillMount () {
    // URLSearchParamsオブジェクトを返すコンストラクター
    // URLSearchParams.entries()このオブジェクトに含まれる全てのキーと値のペアを列挙するためのiteratorを返す
    // ?bacon=0&cheese=0&meat=1&salad=0
    const query = new URLSearchParams(this.props.location.search);
    const ingredients = {};
    let price = 0;

    // Object.entries()で配列形式へ変換
    for ( let param of query.entries()) {
      // ここでparamのデータは['salad', '1']の形になる
      // +はNumber型へ変換
      // ingredientsオブジェクトへプロパティと値を代入

      if (param[0] === 'price') {
        price = param[1];
      } else {
        ingredients[param[0]] = +param[1];
      }

    }
    this.setState({ ingredients: ingredients, totalPrice: price });
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
          path={ this.props.match.path + '/contact-data' }
          // 引数を渡す為にcomponentではなくrenderで記述している？
          // 引数propsと属性に{...}展開で、子コンポーネントへprops.historyオブジェクトを渡している？
          render={ (props) => (<ContactData ingredients={ this.state.ingredients } price={ this.state.totalPrice } { ...props } />) } />
      </>
    );
  }

}

export default Checkout;

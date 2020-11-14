import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';

import CheckoutSummary from '../../Components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';

class Checkout extends Component {
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
          ingredients={ this.props.ings }
          checktoutCancelled={ this.checktoutCancelledHandler }
          checkoutContinued={ this.checktoutContinuedHandler }/>
        <Route
          path={ this.props.match.path + '/contact-data' }
          // 引数を渡す為にcomponentではなくrenderで記述している？
          // 引数propsと属性に{...}展開で、子コンポーネントへprops.historyオブジェクトを渡している？
          component={ ContactData } />
      </>
    );
  }
}

const mapStateToProps = state => {
  return {
    ings: state.ingredients,
    price: state.totalPrice
  }
}

export default connect(mapStateToProps)(Checkout);

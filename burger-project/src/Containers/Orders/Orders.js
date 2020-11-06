import React, { Component } from 'react';

import Order from '../../Components/Order/Order';
import axios from '../../_axios-order';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

class Orders extends Component {
  state = {
    orders: [],
    loading: true
  }

  componentDidMount() {
    axios.get('/orders.json')
      .then(res => {
        const fetchedOrders = [];
        // firebaseのドキュメント？idをkeyに中のオブジェクトを配列へ格納し、スプレッド演算子を用いつつ新たにidプロパティを作成し、keyを格納
        for (let key in res.data) {
          fetchedOrders.push({
            ...res.data[key],
            id: key
          });
        }
        this.setState({ loading: false, orders: fetchedOrders });
      })
      .catch(err => {
        // ここに下記記述いるのはなぜ？
        this.setState({ loading: false });
      });
  }

  render() {
    return (
      <>
        {/* 🥺ここでレンダリングする場合は、mapメソッド内は() */}
        {this.state.orders.map(order => (
          <Order
            key={ order.id }
            ingredients={ order.ingredients }
            price={ order.price } />
        ))}
      </>
    );
  }
}

export default withErrorHandler(Orders, axios);

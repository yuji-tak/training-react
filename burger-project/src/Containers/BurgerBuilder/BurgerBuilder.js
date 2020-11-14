import React, { Component } from 'react';
import { connect } from 'react-redux';

import Burger from '../../Components/Burger/_Burger';
import BuildControls from '../../Components/Burger/BuildControls/BuildControls';
// modalフォルダ名はミス。。。
import Modal from '../../Components/UI/modal/_Modal';
import OrderSummary from '../../Components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../Components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import axios from '../../_axios-order';
import * as actionTypes from '../../store/actions';

// containersだけがstateのシングルソースという感じかな？

class BurgerBuilder extends Component {
  state = {
    purchasing: false,
    loading: false,
    error: false
  }

  componentDidMount () {
    // エンドポイント末尾の.jsonがポイント
    // axios.get('https://react-my-burger-ce65e.firebaseio.com/ingredients.json')
    //   .then(res => {
    //     this.setState({ ingredients: res.data });
    //   })
    //   .catch(error => {
    //     this.setState({ error: true })
    //   });
  }

  // 常に引数で最新のstate.ingredientsを処理している
  updatePurchaseState (ingredients) {
    const sum = Object.keys(ingredients)
      .map(igKey => {
        return ingredients[igKey];
      })
      .reduce((sum, el) => {
        return sum + el;
        // 第二引数の0はinitialValue
      }, 0);
    return sum > 0;
  }

  // アロー関数でない場合、undefinedエラー
  purchaseHandler = () => {
    this.setState({ purchasing: true });
  }

  purchaseCancelHandler = () => {
    this.setState({ purchasing: false })
  }

  purchaseContinueHandler = () => {
    const queryParams = [];
    for (let i in this.state.ingredients) {
      // encodeURIComponent
      queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]));
    }

    // totalPriceをqueryParamsへ展開
    queryParams.push('price=' + this.props.price );

    const queryString = queryParams.join('&');
    this.props.history.push({
      pathname: '/checkout',
      search: '?' + queryString
    });

  }

  render() {
    const disabledInfo = {
      ...this.props.ings
    };
    for (let key in disabledInfo) {
      // 右辺は真偽値を返す
      disabledInfo[key] = disabledInfo[key] <= 0
    }
    // { salad: true, bacon: true, ... }

    let orderSummary = null;
    let burger = this.state.error ? <p>Ingredients cant't be loaded!</p> : <Spinner />;
    if (this.props.ings) {
      // なんやねんこの書き方？？？
      // 変数に代入する時もルートコンポーネントをシングルにしないといけないってことか？
      burger = (
        <>
          <Burger ingredients={ this.props.ings } />
          <BuildControls
            ingredientAdded={ this.props.onIngredientAdded }
            ingredientRemoved={ this.props.onIngredientRemoved }
            purchasable={ this.updatePurchaseState(this.props.ings) }
            disabled={ disabledInfo }
            ordered={ this.purchaseHandler }
            price={ this.props.price } />
        </>
      );
      orderSummary = (
        <OrderSummary
          ingredients={ this.props.ings }
          price={ this.props.price }
          purchaseCancelled={ this.purchaseCancelHandler }
          purchaseContinued={ this.purchaseContinueHandler } />
      );
    }
    if ( this.state.loading ) {
      orderSummary = <Spinner />
    }

    return (
      <>
        <Modal
          show={ this.state.purchasing }
          modalClosed={ this.purchaseCancelHandler }>
          { orderSummary }
        </Modal>
        { burger }
      </>
    );
  }
}

const mapStateTorProps = state => {
  return {
    ings: state.ingredients,
    price: state.totalPrice
  };
}

const mapDispatchToProps = dispatch => {
  return {
    onIngredientAdded: (ingName) => dispatch({ type: actionTypes.ADD_INGREDIENT, ingredientName: ingName }),
    onIngredientRemoved: (ingName) => dispatch({ type: actionTypes.REMOVE_INGREDIENT, ingredientName: ingName })
  };
}

export default connect(mapStateTorProps, mapDispatchToProps)( withErrorHandler(BurgerBuilder, axios));

import React, { Component } from 'react';

import Burger from '../../Components/Burger/_Burger';
import BuildControls from '../../Components/Burger/BuildControls/BuildControls';
// modalフォルダ名はミス。。。
import Modal from '../../Components/UI/modal/_Modal';
import OrderSummary from '../../Components/Burger/OrderSummary/OrderSummary';

// propsはimport元からのデータを取得

// containersだけがstateのシングルソースという感じかな？

const INGREDIENT_PRICES = {
  salad: 0.5,
  bacon: 0.7,
  cheese: 0.4,
  meat: 1.3
}

class BurgerBuilder extends Component {
  state = {
    ingredients: {
      salad: 0,
      bacon: 0,
      cheese: 0,
      meat: 0
    },
    totalPrice: 4,
    purchasable: false,
    purchasing: false
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
    this.setState({ purchasable: sum > 0 })
  }

  // <コンポーネント type>はコンポーネント経由でimport元にデータを渡す
  addIngredientHandler = (type) => {
    const oldCount = this.state.ingredients[type];
    const updatedCount = oldCount + 1;
    // なぜわざわざ展開するの？
    const updatedIngredients = {
      ...this.state.ingredients
    };
    updatedIngredients[type] = updatedCount;
    const priceAddition = INGREDIENT_PRICES[type];
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice + priceAddition;
    this.setState({ totalPrice: newPrice, ingredients: updatedIngredients });

    this.updatePurchaseState(updatedIngredients);
  };

  removeIngredientHandler = (type) => {
    const oldCount = this.state.ingredients[type];
    // なぜ < 0 ではダメなの？
    if (oldCount <= 0) {
      return;
    }
    const updatedCount = oldCount - 1;
    const updatedIngredients = {
      ...this.state.ingredients
    };
    updatedIngredients[type] = updatedCount;
    const priceDeduction = INGREDIENT_PRICES[type]
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice - priceDeduction;
    this.setState({ totalPrice: newPrice, ingredients: updatedIngredients });

    this.updatePurchaseState(updatedIngredients);
  };

  // アロー関数でない場合、undefinedエラー
  purchaseHandler = () => {
    this.setState({ purchasing: true });
  }

  purchaseCancelHandler = () => {
    this.setState({ purchasing: false })
  }

  purchaseContinueHandler = () => {
    alert('You continue!');
  }

  render() {
    const disabledInfo = {
      ...this.state.ingredients
    };
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0
    }
    // { salad: true, bacon: true, ... }

    return (
      <>
        <Modal show={ this.state.purchasing } modalClosed={ this.purchaseCancelHandler }>
          <OrderSummary
            ingredients={ this.state.ingredients }
            price={ this.state.totalPrice }
            purchaseCancelled={ this.purchaseCancelHandler }
            purchaseContinued={ this.purchaseContinueHandler } />
        </Modal>
        <Burger ingredients={ this.state.ingredients } />
        <BuildControls
          ingredientAdded={ this.addIngredientHandler }
          ingredientRemoved={ this.removeIngredientHandler }
          purchasable={ this.state.purchasable }
          disabled={ disabledInfo }
          ordered={ this.purchaseHandler }
          price={ this.state.totalPrice } />
      </>
    );
  }
}

export default BurgerBuilder;

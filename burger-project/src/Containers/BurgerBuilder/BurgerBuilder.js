import React, { Component } from 'react';

import Burger from '../../Components/Burger/_Burger';
import BuildControls from '../../Components/Burger/BuildControls/BuildControls';
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
    totalPrice: 4
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
  };

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
        <Burger ingredients={ this.state.ingredients } />
        <BuildControls
          ingredientAdded={ this.addIngredientHandler }
          ingredientRemoved={ this.removeIngredientHandler }
          disabled={ disabledInfo }
          price={ this.state.totalPrice } />
      </>
    );
  }
}

export default BurgerBuilder;

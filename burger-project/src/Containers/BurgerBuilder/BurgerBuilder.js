import React, { Component } from 'react';

import Burger from '../../Components/Burger/_Burger';

class BurgerBuilder extends Component {
  state = {
    ingredients: {
      salad: 1,
      bacon: 1,
      cheese: 2,
      meat: 2
    }
  }

  render() {
    return (
      <>
        <Burger ingredients={ this.state.ingredients } />
      </>
    );
  }
}

export default BurgerBuilder;

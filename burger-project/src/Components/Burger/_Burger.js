import React from 'react';

import classes from './Burger.module.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

const burger = (props) => {
  const transformedIngredients = Object.keys(props.ingredients).map(igKey => {
    // オブジェクトのキーで値を一つずつ取り出し、[[オブジェクトの値]...]
    return [...Array(props.ingredients[igKey])].map((_, i) => {
      // 問題は繰り返す回数
      return <BurgerIngredient key={ igKey + i } type={ igKey } />
    })
  });

  return (
    <div className={ classes.Burger }>
      <BurgerIngredient type="bread-top" />
        { transformedIngredients }
      <BurgerIngredient type="bread-bottom" />
    </div>
  );
};

export default burger;

import React from 'react';

import classes from './Burger.module.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

const burger = (props) => {
  let transformedIngredients = Object.keys(props.ingredients)
    .map(igKey => {
      // オブジェクトのキーで値を一つずつ取り出し、[[オブジェクトの値]...]
      return [...Array(props.ingredients[igKey])].map((_, i) => {
        // 問題は繰り返す回数
        return <BurgerIngredient key={ igKey + i } type={ igKey } />
      })
    })
    .reduce((arr, el) => {
      // 既存の配列を組み合わせ、新たな配列を生成
      return arr.concat(el)
    }, []);

  if (transformedIngredients.length === 0) {
    transformedIngredients = <p>Please start adding ingredients!</p>
  }

  return (
    <div className={ classes.Burger }>
      <BurgerIngredient type="bread-top" />
        { transformedIngredients }
      <BurgerIngredient type="bread-bottom" />
    </div>
  );
};

export default burger;

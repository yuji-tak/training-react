import React from 'react';

import classes from './Burger.module.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

// propsはimport元からのデータを取得
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
      // 前段で使用した複数の空配列[[],[]...]を分解し、新たな配列[]を生成
      return arr.concat(el)
    }, []);

  if (transformedIngredients.length === 0) {
    transformedIngredients = <p>Please start adding ingredients!</p>
  }

  // <コンポーネント type>はコンポーネント経由でimport元にデータを渡す
  return (
    <div className={ classes.Burger }>
      <BurgerIngredient type="bread-top" />
        { transformedIngredients }
      <BurgerIngredient type="bread-bottom" />
    </div>
  );
};

export default burger;

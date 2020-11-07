import React from 'react';

import classes from './Order.module.css';

const order = (props) => {
  const ingredients = [];

  for (let ingredientName in props.ingredients) {
    // [{ salad: 1, }]のデータを全て共有プロパティのnameとamountに集約している
    ingredients.push(
      {
        name: ingredientName,
        amount: props.ingredients[ingredientName],
      }
    );
  }

  const ingredientOutput = ingredients.map(ig => {
    return (
      <span
        style={{
          textTransform: 'capitalize',
          display: "inline-block",
          margin: '0 8px',
          border: '1px solid #ccc',
          padding: '5px'
        }}
        key={ ig.name }>{ig.name} ({ ig.amount })</span>
      );
  });

  // 👑priceがqueryParamsから受け取れるロジックはどこ？？？
  // Checkout.jsでURLSearchParamsをインスタンス化しprops.location.searchをパラメータとして渡しているあたりの記述

  return (
    <div className={ classes.Order }>
      <p>Ingredients: { ingredientOutput }</p>
      <p>Price: <strong>USD { Number.parseFloat( props.price ).toFixed( 2 ) }</strong></p>
    </div>
  );
};

export default order;

import React from 'react';

import classes from './Input.module.css';

const input = (props) => {
  let inputElement = null;

  // reactのjsxではキャメルケースは使えない？
  switch (props.elementType) {
    case ( 'input' ):
      // スプレッド演算子で展開しつつ渡す理由は？
      inputElement = <input
        className={ classes.InputElement }
        { ...props.elementConfig }
        value={ props.value } />;
      break;
    case ( 'textarea' ):
      inputElement = <textarea
        className={ classes.InputElement }
        { ...props.elementConfig }
        value={ props.value } />;
      break;
    default:
      inputElement = <input
        className={ classes.InputElement }
        { ...props.elementConfig }
        value={ props.value } />
  }

  return (
    <div className={ classes.Input }>
      <label className={ classes.Label }>{ props.label }</label>
      { inputElement }
    </div>
  );

};

export default input;

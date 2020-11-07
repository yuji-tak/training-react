import React from 'react';

import classes from './Input.module.css';

const input = (props) => {
  let inputElement = null;

  // reactのjsxではキャメルケースは使えない？
  switch (props.inputtype) {
    case ( 'input' ):
      // スプレッド演算子で展開しつつ渡す理由は？
      inputElement = <input className={ classes.InputElement } { ...props } />;
      break;
    case ( 'textarea' ):
      inputElement = <textarea className={ classes.InputElement } { ...props } />;
      break;
    default:
      inputElement = <input className={ classes.InputElement } { ...props } />
  }

  return (
    <div className={ classes.Input }>
      <label className={ classes.Label }>{ props.label }</label>
      { inputElement }
    </div>
  );

};

export default input;

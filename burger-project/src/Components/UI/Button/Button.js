import React from 'react';

import classes from './Button.module.css';

const button = (props) => (
  // joinは2つのクラス名を分離している
  <button
    disabled={ props.disabled }
    className={ [ classes.Button, classes[ props.btnType ] ].join(' ') }
    onClick={ props.clicked }>{ props.children }</button>
);

export default button;

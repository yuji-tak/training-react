import React from 'react';

import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import classes from './SideDrawer.module.css';
import Backdrop from '../../UI/Backdrop/Backdrop';

const sideDrawer = (props) => {

  let attachedClasses = [ classes.SideDrawer, classes.Close ]
  // importされたcomponentからprops.openで真偽値が渡ってくる
  if (props.open) {
    attachedClasses = [ classes.SideDrawer, classes.Open ]
  }

  return (
    <>
      {/* propsはimport先から元のcomponetへデータを渡す */}
      <Backdrop show={ props.open } clicked={ props.closed }/>
      <div className={ attachedClasses.join(' ') }>
        <Logo height="11%" />
        <nav>
          <NavigationItems />
        </nav>
      </div>
    </>
  );

}

export default sideDrawer;

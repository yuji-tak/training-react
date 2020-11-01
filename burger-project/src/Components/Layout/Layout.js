import React, { Component } from 'react';

// import Aux from '../../hoc/Aux';
import classes from './Layout.module.css';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';

class Layout extends Component {
  // なぜclassに書き換えたのか？関数リテラルとの違いは？

  state = {
    showSideDrawer: false
  }

  sideDrawerClosedHandler = () => {
    this.setState({ showSideDrawer: false })
  }

  render() {
    return (
      <>
        <Toolbar />
        {/* open=true closed=setState() */}
        <SideDrawer
          open={ this.state.showSideDrawer }
          closed={ this.sideDrawerClosedHandler }/>
        <main className={ classes.Content }>
          { this.props.children }
        </main>
      </>
    );
  }
}

export default Layout;

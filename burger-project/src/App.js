import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import Layout from './Components/Layout/Layout';
import BurgerBuilder from './Containers/BurgerBuilder/BurgerBuilder';
import Checkout from './Containers/Checkout/Checkout';

class App extends Component {
  render() {
    return (
      <>
        <Layout>
          <Switch>
            <Route path="/" exact component={ BurgerBuilder } />
            <Route path="/checkout" component={ Checkout } />
          </Switch>
        </Layout>
      </>
    );
  }
}

export default App;

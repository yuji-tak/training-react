import React, { Component } from 'react';

import Layout from './Components/Layout/Layout';
import BurgerBuilder from './Containers/BurgerBuilder/BurgerBuilder';
import Checkout from './Containers/Checkout/Checkout';

class App extends Component {
  render() {
    return (
      <>
        <Layout>
          <BurgerBuilder />
          <Checkout />
        </Layout>
      </>
    );
  }
}

export default App;

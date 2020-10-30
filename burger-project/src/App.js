import React, { Component } from 'react';

import Layout from './Components/Layout/Layout';
import BurgerBuilder from './Containers/BurgerBuilder/BurgerBuilder';

class App extends Component {
  render() {
    return (
      <>
        <Layout>
          <h1>Hello world!</h1>
          <BurgerBuilder />
        </Layout>
      </>
    );
  }
}

export default App;

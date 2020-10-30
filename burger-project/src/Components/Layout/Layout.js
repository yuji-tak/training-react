import React from 'react';

// import Aux from '../../hoc/Aux';

const layout = ( props ) => (
  <>
    <div>Toolbar, SideDrawer, Backdrop</div>
    <main>
      { props.children }
    </main>
  </>
);

export default layout;

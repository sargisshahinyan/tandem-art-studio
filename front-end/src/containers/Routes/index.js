import React, { Fragment } from 'react';
import { Route } from 'react-router-dom';

import Home from '../Home';
import Portfoio from '../Portfolio';

export function Routes() {
  return (
    <Fragment>
      <Route exact path="/portfolio" component={Portfoio} />
      <Route exact path="/" component={Home} />
    </Fragment>
  );
}

export default Routes;

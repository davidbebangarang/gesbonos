import React from 'react';
import { Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';

const history = createBrowserHistory();

const ProviderMock = props => (

    <Router history={history}>
      {props.children}
    </Router>

);
export default ProviderMock;
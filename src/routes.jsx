import React, { useContext } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import AuthContext from './contexts/auth';

import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';

const Routes = () => {
  const { isSignedIn } = useContext(AuthContext);

  return (
    <Router>
      <Switch>
        <Route path="/">
          <HomePage />
        </Route>
      </Switch>
    </Router>
  );
};

export default Routes;

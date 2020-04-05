import React, { useContext } from 'react';
import { Router, Switch, Route, Link } from 'react-router-dom';
import AuthContext from './contexts/auth';

import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';

const Routes = () => {
  const { isSignedIn } = useContext(AuthContext);

  return (
    <Router>
      <Switch>
        <Route path="/">{isSignedIn ? <HomePage /> : <LoginPage />}</Route>
      </Switch>
    </Router>
  );
};

export default Routes;

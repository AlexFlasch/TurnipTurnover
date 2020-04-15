import React, { useContext } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import styled from 'styled-components';

import palette from './theme-palette';

import AuthContext from './contexts/auth';

import HomePage from './pages/HomePage';
import TrackPage from './pages/TrackPage';
import AccountPage from './pages/AccountPage';

import SideNav from './components/sidenav/SideNav';
import SideNavItem from './components/sidenav-item/SideNavItem';
import CurrentUserItem from './components/current-user-sidenav-item/CurrentUserSideNavItem';

const StyledAppContainer = styled.main`
  width: 100vw;
  height: 100vh;

  background-color: ${palette.bg};
`;

const StyledContentContainer = styled.div`
  margin-left: 75px;
  padding: 15px;
`;

// a quick wrapper around react-router-dom's Route
// these routes will automatically redirect the user
// back to the home page if the user is no longer logged in
const AccountRoute = props => {
  const { isSignedIn } = useContext(AuthContext);

  return isSignedIn ? <Route {...props} /> : <Redirect to="/" />;
};

const Routes = () => {
  const { user, isSignedIn } = useContext(AuthContext);

  const bottomItemIcon = isSignedIn ? 'lnr-user' : 'lnr-enter';
  const bottomItemText =
    isSignedIn && user && user.displayName ? user.displayName : 'Sign in';
  const bottomItem = (
    <CurrentUserItem icon={bottomItemIcon} text={bottomItemText} />
  );

  return (
    <StyledAppContainer>
      <Router>
        <SideNav bottomItem={bottomItem}>
          <SideNavItem to="/" icon="lnr-home" text="Home" />
          {/* restrtict these items to users that are signed in */}
          {isSignedIn ? (
            <>
              <SideNavItem
                to="/track"
                icon="lnr-pencil"
                text="Log Your Prices"
              />
            </>
          ) : null}
        </SideNav>
        <Switch>
          <StyledContentContainer>
            <Route path="/">
              <HomePage />
            </Route>
            <AccountRoute path="/track">
              <TrackPage />
            </AccountRoute>
            <AccountRoute path="/account">
              <AccountPage />
            </AccountRoute>
          </StyledContentContainer>
        </Switch>
      </Router>
    </StyledAppContainer>
  );
};

export default Routes;

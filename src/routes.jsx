import React, { useContext } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import styled from 'styled-components';
import AuthContext from './contexts/auth';

import HomePage from './pages/HomePage';
import SideNav from './components/sidenav/SideNav';
import SideNavItem from './components/sidenav-item/SideNavItem';

const StyledAppContainer = styled.main`
  width: 100vw;
  height: 100vh;

  background-color: #232931;
`;

const StyledContentContainer = styled.div`
  margin-left: 75px;
  padding: 15px;
`;

const Routes = () => {
  const { isSignedIn } = useContext(AuthContext);

  return (
    <StyledAppContainer>
      <Router>
        <SideNav>
          <SideNavItem to="/" icon="lnr-home" text="Home" />
        </SideNav>
        <Switch>
          <StyledContentContainer>
            <Route path="/">
              <HomePage />
            </Route>
          </StyledContentContainer>
        </Switch>
      </Router>
    </StyledAppContainer>
  );
};

export default Routes;

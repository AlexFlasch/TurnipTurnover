import React, { useContext } from 'react';
import { Redirect } from 'react-router-dom';

import AuthContext from '../../contexts/auth';

import Button from '../../components/button/Button';

import StyledAccountPageWrapper from './styles/StyledAccountPageWrapper';

const AccountPage = props => {
  const { isSignedIn, signOutUser } = useContext(AuthContext);

  return (
    <StyledAccountPageWrapper>
      {!isSignedIn ? <Redirect to="/" /> : null}
      <Button text="Sign Out" color="primary" onClick={signOutUser} />
    </StyledAccountPageWrapper>
  );
};

export default AccountPage;

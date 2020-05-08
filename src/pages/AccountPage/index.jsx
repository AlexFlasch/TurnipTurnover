import React, { useContext } from 'react';
import { Redirect } from 'react-router-dom';

import AuthContext from '../../contexts/auth';
import ToastContext from '../../contexts/toast';

import Button from '../../components/button/Button';

import StyledAccountPageWrapper from './styles/StyledAccountPageWrapper';

const AccountPage = props => {
  const { isSignedIn, signOutUser } = useContext(AuthContext);
  const { sendToast } = useContext(ToastContext);

  return (
    <StyledAccountPageWrapper>
      {!isSignedIn ? <Redirect to="/" /> : null}
      <Button text="Sign Out" color="primary" onClick={signOutUser} />
      <Button
        text="Toast Top Left"
        color="standard"
        onClick={() => sendToast('top left', 'success', 'topLeft')}
      />
      <Button
        text="Toast Top"
        color="standard"
        onClick={() => sendToast('top', 'success', 'top')}
      />
      <Button
        text="Toast Top Right"
        color="standard"
        onClick={() => sendToast('top right', 'success', 'topRight')}
      />
      <Button
        text="Toast Right"
        color="standard"
        onClick={() => sendToast('right', 'success', 'right')}
      />
      <Button
        text="Toast Bottom Right"
        color="standard"
        onClick={() => sendToast('bottom right', 'success', 'bottomRight')}
      />
      <Button
        text="Toast Bottom"
        color="standard"
        onClick={() => sendToast('bottom', 'success', 'bottom')}
      />
      <Button
        text="Toast Bottom Left"
        color="standard"
        onClick={() => sendToast('bottom left', 'success', 'bottomLeft')}
      />
      <Button
        text="Toast Left"
        color="standard"
        onClick={() => sendToast('left', 'success', 'left')}
      />
    </StyledAccountPageWrapper>
  );
};

export default AccountPage;

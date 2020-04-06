import React, { useState } from 'react';

import Input from '../input/Input';
import Button from '../button/Button';

import StyledSignInModal from './styles/StyledSignInModal';

const SignInModal = props => {
  const [emailValue, setEmailValue] = useState('');
  const [passwordValue, setPasswordValue] = useState('');

  return (
    <StyledSignInModal
      isOpen={props.isOpen}
      onBackgroundClick={props.onBackgroundClick}
    >
      <p className="title">Sign in</p>
      <form>
        <Input label="Email" onChange={setEmailValue} />
        <Input label="Password" onChange={setPasswordValue} type="password" />
      </form>
      <div className="button-container">
        <Button type="primary" text="Sign In" />
      </div>
    </StyledSignInModal>
  );
};

export default SignInModal;

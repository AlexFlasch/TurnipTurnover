import React, { useState } from 'react';

import Input from '../input/Input';

import StyledSignInModal from './styles/StyledSignInModal';

const SignInModal = props => {
  const [emailValue, setEmailValue] = useState('');

  return (
    <StyledSignInModal
      isOpen={props.isOpen}
      onBackgroundClick={props.onBackgroundClick}
    >
      <p className="title">Sign in</p>
      <Input label="Email" onChange={setEmailValue} />
    </StyledSignInModal>
  );
};

export default SignInModal;

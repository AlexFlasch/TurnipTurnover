import React, { useState } from 'react';

import SignInForm from './SignInForm';

import StyledSignInModal from './styles/StyledSignInModal';

const SignInModal = props => {
  const [isRegistering, setIsRegistering] = useState(false);

  return (
    <StyledSignInModal
      isOpen={props.isOpen}
      onBackgroundClick={props.onBackgroundClick}
    >
      <SignInForm />
    </StyledSignInModal>
  );
};

export default SignInModal;

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';

import SignInForm from './SignInForm';
import RegisterForm from './RegisterForm';

import StyledSignInModal from './styles/StyledSignInModal';

const SignInModal = props => {
  const [isRegistering, setIsRegistering] = useState(false);

  const rotatableFormVariants = {
    isVisible: {
      rotateY: 0,
    },
    isHidden: {
      rotateY: 180,
    },
  };

  return (
    <StyledSignInModal
      isOpen={props.isOpen}
      onBackgroundClick={() => {
        props.onBackgroundClick();
        setIsRegistering(false);
      }}
    >
      <motion.div
        variants={rotatableFormVariants}
        initial="isVisible"
        animate={isRegistering ? 'isHidden' : 'isVisible'}
        className="no-backface rotatable-form"
      >
        <SignInForm
          handleFormChange={() => setIsRegistering(true)}
          handleCloseClick={props.handleCloseClick}
          closeModal={props.closeModal}
        />
      </motion.div>
      <motion.div
        variants={rotatableFormVariants}
        initial="isHidden"
        animate={isRegistering ? 'isVisible' : 'isHidden'}
        className="no-backface rotatable-form"
      >
        <RegisterForm
          handleFormChange={() => setIsRegistering(false)}
          handleCloseClick={() => {
            props.handleCloseClick();
            setIsRegistering(false);
          }}
          closeModal={props.closeModal}
        />
      </motion.div>
    </StyledSignInModal>
  );
};

SignInModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  handleCloseClick: PropTypes.func,
  closeModal: PropTypes.func,
};

SignInModal.defaultProps = {
  handleCloseClick: () => {},
  closeModal: () => {},
};

export default SignInModal;

import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import StyledToast from './styles/StyledToast';

const Toast = props => {
  const [animationState, setAnimationState] = useState('show');

  const variants = {
    initial: {
      scale: 0,
      opacity: 0,
    },
    show: {
      scale: 1,
      opacity: 1,
    },
    dismiss: {
      scale: 0,
      opacity: 0,
    },
  };

  const dismiss = () => {
    setAnimationState('dismiss');
    props.onDismiss();
  };

  const animationCompleted = () => {
    if (animationState === 'dismiss') {
      props.onDelete();
    }
  };

  useEffect(() => {
    if (props.isDismissed && animationState !== 'dismiss') {
      setAnimationState('dismiss');
    }
  }, [props.isDismissed, animationState]);

  return (
    <StyledToast
      positionTransition
      type={props.type}
      onAnimationComplete={animationCompleted}
      variants={variants}
      initial="initial"
      animate={animationState}
    >
      <span className="dismiss-btn lnr lnr-cross-circle" onClick={dismiss} />
      <span className="toast-message">{props.message}</span>
    </StyledToast>
  );
};

Toast.propTypes = {
  type: PropTypes.oneOf(['success', 'error', 'neutral']).isRequired,
  message: PropTypes.string.isRequired,
  onDismiss: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

Toast.defaultProps = {};

export default Toast;

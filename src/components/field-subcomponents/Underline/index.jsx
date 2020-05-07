import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import StyledUnderline from './styles/StyledUnderline';

import variants from './animationVariants';

const Underline = props => {
  // change underline animation state based on input state
  const [underlineVariant, setUnderlineVariant] = useState(
    props.disabled ? 'disabled' : 'inactive',
  );
  useEffect(() => {
    if (props.disabled) {
      setUnderlineVariant('disabled');
    } else if (!props.isPristine && props.validationStatus === 'valid') {
      setUnderlineVariant('valid');
    } else if (!props.isPristine && props.validationStatus === 'invalid') {
      setUnderlineVariant('invalid');
    } else {
      setUnderlineVariant(props.isActive ? 'active' : 'inactive');
    }
  }, [
    props.isPristine,
    props.isActive,
    props.validationStatus,
    props.disabled,
  ]);

  return (
    <StyledUnderline
      className={props.validationStatus}
      initial="inactive"
      variants={variants}
      animate={underlineVariant}
      disabled={props.disabled}
    />
  );
};

Underline.propTypes = {
  isPristine: PropTypes.bool.isRequired,
  isActive: PropTypes.bool.isRequired,
  disabled: PropTypes.bool.isRequired,
  validationStatus: PropTypes.string.isRequired,
};

export default Underline;

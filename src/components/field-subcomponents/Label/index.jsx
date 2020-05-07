import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import variants from './animationVariants';

import StyledLabel from './styles/StyledLabel';

const Label = props => {
  const [labelVariant, setLabelVariant] = useState('inactive');

  useEffect(() => {
    if (props.disabled) {
      setLabelVariant('disabled');
    } else if (props.isActive || props.inputValue !== '') {
      setLabelVariant('active');
    } else {
      setLabelVariant('inactive');
    }
  }, [props.disabled, props.isActive, props.inputValue]);

  return (
    <StyledLabel
      variants={variants}
      initial="inactive"
      animate={labelVariant}
      transformTemplate={({ y }) => `translateY(${y})`}
    >
      {props.children}
    </StyledLabel>
  );
};

Label.propTypes = {
  disabled: PropTypes.bool.isRequired,
  isActive: PropTypes.bool.isRequired,
  inputValue: PropTypes.any,
};

Label.defaultProps = {
  inputValue: '',
};

export default Label;

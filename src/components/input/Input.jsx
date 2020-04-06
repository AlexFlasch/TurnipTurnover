import React, { useState } from 'react';
import PropTypes from 'prop-types';

import palette from '../../theme-palette';

import StyledInputWrapper from './styles/StyledInputWrapper';
import StyledLabel from './styles/StyledLabel';
import StyledInput from './styles/StyledInput';
import StyledUnderline from './styles/StyledUnderline';

const Input = props => {
  const [isActive, setIsActive] = useState(false);

  const labelVariants = {
    active: {
      y: '-3vh',
      scale: 0.6,
      opacity: 1,
    },
    inactive: {
      y: 0,
      scale: 1,
      opacity: 0.5,
    },
  };

  const underlineVariants = {
    active: {
      height: 5,
      backgroundColor: palette.accentMint,
    },
    inactive: {
      height: 1,
      backgroundColor: palette.uiLight,
    },
  };

  return (
    <StyledInputWrapper>
      <StyledLabel
        variants={labelVariants}
        initial="inactive"
        animate={isActive ? 'active' : 'inactive'}
      >
        {props.label}
      </StyledLabel>
      <StyledUnderline
        initial="inactive"
        variants={underlineVariants}
        animate={isActive ? 'active' : 'inactive'}
      />
      <StyledInput
        type={props.type}
        className={{ active: isActive }}
        onChange={event => props.onChange(event.target.value)}
        onFocus={() => setIsActive(true)}
        onBlur={() => setIsActive(false)}
      />
    </StyledInputWrapper>
  );
};

Input.propTypes = {
  label: PropTypes.string,
  onChange: PropTypes.func,
  type: PropTypes.oneOf(['text', 'password']),
};

Input.defaultProps = {
  type: 'text',
};

export default Input;

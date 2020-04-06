import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import palette from '../../theme-palette';

import StyledInputWrapper from './styles/StyledInputWrapper';
import StyledLabel from './styles/StyledLabel';
import StyledInput from './styles/StyledInput';
import StyledUnderline from './styles/StyledUnderline';

const Input = props => {
  const [isActive, setIsActive] = useState(false);
  const [hasValue, setHasValue] = useState(false);
  const [isPristine, setIsPristine] = useState(true);

  const [validationClass, setValidationClass] = useState('');
  useEffect(() => {
    if (typeof props.isValid !== 'boolean') {
      setValidationClass('');
    } else if (props.isValid) {
      setValidationClass('valid');
    } else {
      setValidationClass('invalid');
    }
  }, [props.isValid]);

  const [underlineVariant, setUnderlineVariant] = useState('inactive');
  useEffect(() => {
    if (!isPristine && validationClass === 'valid') {
      setUnderlineVariant('valid');
    } else if (!isPristine && validationClass === 'invalid') {
      setUnderlineVariant('invalid');
    } else {
      setUnderlineVariant(isActive ? 'active' : 'inactive');
    }
  }, [isPristine, isActive, validationClass]);

  const labelVariants = {
    active: {
      y: '-3vh',
      fontSize: '1.5vh',
      opacity: 1,
    },
    inactive: {
      y: 0,
      fontSize: '3vh',
      opacity: 0.5,
    },
  };

  const underlineVariants = {
    active: {
      height: 3,
      backgroundColor: palette.accentMint,
    },
    valid: {
      height: 3,
      backgroundColor: palette.accentLime,
    },
    invalid: {
      height: 3,
      backgroundColor: palette.error,
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
        animate={isActive || hasValue ? 'active' : 'inactive'}
      >
        {props.label}
      </StyledLabel>
      <StyledUnderline
        className={validationClass}
        initial="inactive"
        variants={underlineVariants}
        animate={underlineVariant}
      />
      <StyledInput
        className={validationClass}
        type={props.type}
        onChange={event => {
          if (isPristine) {
            setIsPristine(false);
          }
          props.handleChange(event.target.value);
          event.target.value.length > 0
            ? setHasValue(true)
            : setHasValue(false);
        }}
        onFocus={() => setIsActive(true)}
        onBlur={() => setIsActive(false)}
        autoComplete={props.autoComplete}
      />
      {isPristine ? null : (
        <span className={`validation-msg ${validationClass}`}>
          {props.validationMessage}
        </span>
      )}
    </StyledInputWrapper>
  );
};

Input.propTypes = {
  label: PropTypes.string,
  handleChange: PropTypes.func,
  type: PropTypes.oneOf(['text', 'password']),
  autoComplete: PropTypes.string,
  validationMessage: PropTypes.string,
  isValid: PropTypes.bool,
};

Input.defaultProps = {
  type: 'text',
  autoComplete: undefined,
  handleChange: () => {},
};

export default Input;

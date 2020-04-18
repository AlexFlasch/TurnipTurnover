import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import palette from '../../theme-palette';

import StyledInputWrapper from './styles/StyledInputWrapper';
import StyledLabel from './styles/StyledLabel';
import StyledInput from './styles/StyledInput';
import StyledUnderline from './styles/StyledUnderline';

const Input = props => {
  const [isActive, setIsActive] = useState(false);
  const [value, setValue] = useState(props.value);
  const [isPristine, setIsPristine] = useState(true);

  // update value shown inside the input if the value prop changes
  useEffect(() => {
    setValue(props.value);
  }, [props.value]);

  // change validation state for animations/styles based on the isValid prop
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

  // change label animation state based on input state
  const [labelVariant, setLabelVariant] = useState('inactive');
  useEffect(() => {
    if (props.disabled) {
      setLabelVariant('disabled');
    } else if (isActive || value !== '') {
      setLabelVariant('active');
    } else {
      setLabelVariant('inactive');
    }
  }, [props.disabled, isActive, value]);

  // change underline animation state based on input state
  const [underlineVariant, setUnderlineVariant] = useState(
    props.disabled ? 'disabled' : 'inactive',
  );
  useEffect(() => {
    if (props.disabled) {
      setUnderlineVariant('disabled');
    } else if (!isPristine && validationClass === 'valid') {
      setUnderlineVariant('valid');
    } else if (!isPristine && validationClass === 'invalid') {
      setUnderlineVariant('invalid');
    } else {
      setUnderlineVariant(isActive ? 'active' : 'inactive');
    }
  }, [isPristine, isActive, validationClass, props.disabled]);

  // animation properties
  const labelVariants = {
    active: {
      y: `-${palette.scale(1.5)}`,
      fontSize: palette.scale(0),
      opacity: 1,
    },
    inactive: {
      y: '0em',
      fontSize: palette.scale(1),
      opacity: 0.5,
    },
    disabled: {
      y: 0,
      fontSize: palette.scale(1),
      opacity: 0.3,
    },
  };

  const underlineVariants = {
    active: {
      height: 3,
      backgroundColor: palette.accentMint,
      backgroundImage:
        'linear-gradient(90deg, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0) 75%, transparent 75%, transparent 100%)',
      backgroundSize: '10px 0px',
      opacity: 1,
    },
    valid: {
      height: 3,
      backgroundColor: palette.accentLime,
      backgroundImage:
        'linear-gradient(90deg, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0) 75%, transparent 75%, transparent 100%)',
      backgroundSize: '10px 0px',
      opacity: 1,
    },
    invalid: {
      height: 3,
      backgroundColor: palette.error,
      backgroundImage:
        'linear-gradient(90deg, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0) 75%, transparent 75%, transparent 100%)',
      backgroundSize: '10px 0px',
      opacity: 1,
    },
    inactive: {
      height: 1,
      backgroundColor: palette.uiLight,
      backgroundImage:
        'linear-gradient(90deg, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0) 75%, transparent 75%, transparent 100%)',
      backgroundSize: '10px 0px',
      opacity: 1,
    },
    disabled: {
      height: 1,
      backgroundColor: 'rgba(0, 0, 0, 0)',
      backgroundImage: `linear-gradient(90deg, ${palette.uiLight}, ${
        palette.uiLight
      } 75%, transparent 75%, transparent 100%)`,
      backgroundSize: '10px 1px',
      opacity: 0.3,
    },
  };

  return (
    <StyledInputWrapper className={props.className}>
      <StyledLabel
        variants={labelVariants}
        initial="inactive"
        animate={labelVariant}
        transformTemplate={({ y }) => `translateY(${y})`}
      >
        {props.label}
      </StyledLabel>
      <StyledUnderline
        className={validationClass}
        initial="inactive"
        variants={underlineVariants}
        animate={underlineVariant}
        disabled={props.disabled}
      />
      <StyledInput
        className={validationClass}
        type={props.type}
        onChange={event => {
          if (isPristine) {
            setIsPristine(false);
          }
          props.handleChange(event.target.value);
          setValue(event.target.value);
        }}
        value={value}
        onClick={props.onClick}
        onFocus={() => setIsActive(true)}
        onBlur={() => setIsActive(false)}
        autoComplete={props.autoComplete}
        disabled={props.disabled}
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
  onClick: PropTypes.func,
  type: PropTypes.oneOf(['text', 'password']),
  value: PropTypes.any,
  autoComplete: PropTypes.string,
  disabled: PropTypes.bool,
  validationMessage: PropTypes.string,
  isValid: PropTypes.bool,
};

Input.defaultProps = {
  handleChange: () => {},
  type: 'text',
  value: '',
  autoComplete: undefined,
  disabled: false,
};

export default Input;

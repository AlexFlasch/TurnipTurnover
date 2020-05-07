import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import StyledInputWrapper from './styles/StyledInputWrapper';
import StyledInput from './styles/StyledInput';

import Label from '../field-subcomponents/Label';
import Underline from '../field-subcomponents/Underline';

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

  return (
    <StyledInputWrapper className={props.className}>
      <Label
        isActive={isActive}
        isPristine={isPristine}
        disabled={props.disabled}
        inputValue={value}
      >
        {props.label}
      </Label>
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
      <Underline
        isActive={isActive}
        isPristine={isPristine}
        disabled={props.disabled}
        validationStatus={validationClass}
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

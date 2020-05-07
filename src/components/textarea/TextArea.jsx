import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import palette from '../../theme-palette';

import Label from '../field-subcomponents/Label';
import Underline from '../field-subcomponents/Underline';

import StyledTextAreaWrapper from './styles/StyledTextAreaWrapper';
import StyledTextArea from './styles/StyledTextArea';

const TextArea = props => {
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

  useEffect(() => {
    setValue(props.value);
  }, [props.value]);

  return (
    <StyledTextAreaWrapper>
      <Label
        isActive={isActive}
        isPristine={isPristine}
        isValid={props.isValid}
        disabled={props.disabled}
        inputValue={value}
      >
        {props.label}
      </Label>
      <StyledTextArea
        className={validationClass}
        onChange={event => {
          if (isPristine) {
            setIsPristine(false);
          }
          props.handleChange(event.target.value);
          setValue(event.target.value);
        }}
        onFocus={() => setIsActive(true)}
        onBlur={() => setIsActive(false)}
        autoComplete={props.autoComplete}
        value={value}
      />
      <Underline
        isActive={isActive}
        isPristine={isPristine}
        isValid={props.isValid}
        disabled={props.disabled}
        validationStatus={validationClass}
      />
    </StyledTextAreaWrapper>
  );
};

TextArea.propTypes = {
  value: PropTypes.string,
  maxHeight: PropTypes.string,
  label: PropTypes.string,
  autoComplete: PropTypes.string,
  isValid: PropTypes.bool,
  disabled: PropTypes.bool,
  handleChange: PropTypes.func,
};

TextArea.defaultProps = {
  value: '',
  maxHeight: palette.scale(10),
  handleChange: () => {},
  disabled: false,
  autoComplete: undefined,
};

export default TextArea;

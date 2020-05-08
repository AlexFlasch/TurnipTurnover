import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import useMaskedInput from '@viewstools/use-masked-input';

import palette from '../../theme-palette';

import StyledInputWrapper from '../input/styles/StyledInputWrapper';
import StyledLabel from '../input/styles/StyledLabel';
import StyledInput from '../input/styles/StyledInput';
import StyledUnderline from '../input/styles/StyledUnderline';

const MaskedInput = props => {
  const inputRef = useRef(null);

  const [isActive, setIsActive] = useState(false);
  const [value, setValue] = useState(props.value);
  const [parsedValue, setParseValue] = useState(
    props.parse ? props.parse(props.value) : props.value,
  );
  const [isPristine, setIsPristine] = useState(true);

  // update the input's internal value if the value prop changes
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

  // change underline animation state based on input state
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

  const handleMaskingChange = useMaskedInput({
    input: inputRef,
    mask: props.mask,
    value: props.parse ? parsedValue : value,
    onChange: event => {
      if (isPristine) {
        setIsPristine(false);
      }

      props.handleChange(event.target.value);

      setValue(event.target.value);
    },
  });

  // animation properties
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
      backgroundColor: palette.success,
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
        animate={isActive || value !== '' ? 'active' : 'inactive'}
        transformTemplate={({ y }) => `translateY(${y})`}
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
        ref={inputRef}
        className={validationClass}
        type={props.type}
        onChange={handleMaskingChange}
        value={props.parse ? props.parse(props.value) : props.value}
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

MaskedInput.propTypes = {
  label: PropTypes.string,
  handleChange: PropTypes.func,
  parse: PropTypes.func,
  mask: PropTypes.array.isRequired,
  keepCharPositions: PropTypes.bool,
  type: PropTypes.oneOf(['text', 'password']),
  value: PropTypes.any,
  autoComplete: PropTypes.string,
  validationMessage: PropTypes.string,
  isValid: PropTypes.bool,
};

MaskedInput.defaultProps = {
  keepCharPositions: false,
  type: 'text',
  value: '',
  autoComplete: undefined,
  handleChange: () => {},
};

export default MaskedInput;

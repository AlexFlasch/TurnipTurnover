import React from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';

import StyledDropdownContainer from './styles/StyledDropdownContainer';
import StyledDropdown from './styles/StyledDropdown';
import StyledDropdownIndicator from './styles/StyledDropdownIndicator';

const CustomDropdownContainer = ({ innerProps, isFocused }) => {
  return (
    <StyledDropdownIndicator {...innerProps} isFocused={isFocused}>
      <span className="lnr lnr-chevron-down" />
    </StyledDropdownIndicator>
  );
};

const Dropdown = props => {
  return (
    <StyledDropdownContainer
      className={props.className}
      disabled={props.disabled}
    >
      {props.label ? <label>{props.label}</label> : null}
      <Select
        {...props}
        isDisabled={props.disabled}
        options={props.options}
        styles={StyledDropdown}
        components={{ DropdownIndicator: CustomDropdownContainer }}
      />
    </StyledDropdownContainer>
  );
};

Dropdown.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.any,
      label: PropTypes.string,
    }),
  ).isRequired,
};

Dropdown.defaultProps = {};

export default Dropdown;

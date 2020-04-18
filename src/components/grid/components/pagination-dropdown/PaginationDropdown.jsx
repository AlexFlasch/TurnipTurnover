import React from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';

import StyledPaginationDropdownIndicator from './styles/StyledPaginationDropdownIndicator';
import StyledPaginationDropdown from './styles/StyledPaginationDropdown';

const CustomDropdownIndicator = ({ innerProps, isFocused }) => {
  return (
    <StyledPaginationDropdownIndicator {...innerProps} isFocused={isFocused}>
      <span className="lnr lnr-chevron-down" />
    </StyledPaginationDropdownIndicator>
  );
};

const PaginationDropdown = props => {
  return (
    <Select
      {...props}
      defaultValue={{ label: 1, value: 0 }}
      defaultInputValue="1"
      onChange={props.handleChange}
      styles={StyledPaginationDropdown(props.longestOptionWidth)}
      components={{ DropdownIndicator: CustomDropdownIndicator }}
    />
  );
};

PaginationDropdown.propTypes = {
  handleChange: PropTypes.func,
  longestOptionWidth: PropTypes.number,
};

PaginationDropdown.defaultProps = {
  handleChange: () => {},
};

export default PaginationDropdown;

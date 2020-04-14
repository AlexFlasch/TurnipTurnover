import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import ReactDatePicker, { CalendarContainer } from 'react-datepicker';

import Input from '../input/Input';

import StyledContainer from './styles/StyledContainer';

const CustomContainer = props => (
  <div className={props.className}>
    <StyledContainer>
      <CalendarContainer {...props}>{props.children}</CalendarContainer>
    </StyledContainer>
  </div>
);

const DatePicker = props => {
  const inputRef = useRef();

  const customInput = (
    <Input label={props.label} value={props.selected} innerRef={inputRef} />
  );

  return (
    <ReactDatePicker
      {...props}
      customInput={customInput}
      customInputRef={inputRef}
      calendarContainer={CustomContainer}
      showPopperArrow={false}
    />
  );
};

DatePicker.propTypes = {
  label: PropTypes.string,
};

DatePicker.defaultProps = {};

export default DatePicker;

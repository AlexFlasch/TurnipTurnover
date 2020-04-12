import React from 'react';
import PropTypes from 'prop-types';
import ReactDatePicker, { CalendarContainer } from 'react-datepicker';

import Input from '../input/Input';

import StyledContainer from './styles/StyledContainer';

const CustomContainer = props => (
  <div>
    <StyledContainer>
      <CalendarContainer {...props}>{props.children}</CalendarContainer>
    </StyledContainer>
  </div>
);

const DatePicker = props => (
  <ReactDatePicker
    {...props}
    customInput={<Input label={props.label} value={props.selected} />}
    calendarContainer={CustomContainer}
    showPopperArrow={false}
  />
);

DatePicker.propTypes = {
  label: PropTypes.string,
};

DatePicker.defaultProps = {};

export default DatePicker;

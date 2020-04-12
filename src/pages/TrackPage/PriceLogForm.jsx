import React, { useState, useEffect, useRef, useContext } from 'react';
import PropTypes from 'prop-types';
import subDays from 'date-fns/subDays';

import { isNumeric } from '../../utils/validation-fns';

import AuthContext from '../../contexts/auth';

import Dropdown from '../../components/dropdown/Dropdown';
import Input from '../../components/input/Input';
import DatePicker from '../../components/date-picker/DatePicker';
import Button from '../../components/button/Button';

import StyledPriceLogForm from './styles/StyledPriceLogForm';

const LOG_TYPES = {
  PRICE_CHECK: 'PRICE_CHECK',
  BUY: 'BUY',
  SELL: 'SELL',
};
const LOG_TYPES_OPTIONS = [
  { value: LOG_TYPES.PRICE_CHECK, label: 'Price Check' },
  { value: LOG_TYPES.BUY, label: 'Bought Turnips' },
  { value: LOG_TYPES.SELL, label: 'Sold Turnips' },
];

const PriceLogForm = props => {
  const {
    user: { id: userId },
  } = useContext(AuthContext);

  // const { data, loading } = useQuery();

  const [logType, setLogType] = useState(LOG_TYPES.PRICE_CHECK);
  const [price, setPrice] = useState(0);
  const [datetime, setDatetime] = useState(new Date());

  const [priceIsValid, setPriceIsValid] = useState(false);
  const [priceValidationMsg, setPriceValidationMsg] = useState('');
  useEffect(() => {
    const valid = isNumeric(price);
    setPriceIsValid(valid);

    if (valid) {
      setPriceValidationMsg('');
    } else {
      setPriceValidationMsg('Turnip prices should contain only whole numbers.');
    }
  }, [price]);

  const [datetimeIsValid, setDatetimeIsValid] = useState(true);
  const [datetimeValidationMsg, setDatetimeValidationMsg] = useState('');

  const [formIsValid, setFormIsValid] = useState(false);
  useEffect(() => {
    if (priceIsValid) {
      setFormIsValid(true);
    } else {
      setFormIsValid(false);
    }
  }, [priceIsValid]);

  const handleSubmit = event => {
    if (event) {
      event.preventDefault();
    }

    if (!formIsValid) {
      return;
    }

    console.log('submitting: ', {
      price,
      isBuy: logType === LOG_TYPES.BUY,
      isSell: logType === LOG_TYPES.SELL,
    });
  };

  return (
    <StyledPriceLogForm onSubmit={handleSubmit}>
      <Dropdown
        options={LOG_TYPES_OPTIONS}
        isSearchable={false}
        value={LOG_TYPES_OPTIONS[0]}
      />
      <Input
        label="Turnip Price"
        handleChange={setPrice}
        isValid={priceIsValid}
        validationMessage={priceValidationMsg}
      />
      <DatePicker
        label="Date and Time of Log"
        showTimeSelect={true}
        onChange={value => {
          console.log('setting datetime to: ', value);
          setDatetime(value);
        }}
        minDate={subDays(new Date(), 30)}
        maxDate={new Date()}
        timeFormat="HH:mm"
        timeInterval={15}
        selected={datetime}
        dateFormat="MM/dd/yyyy h:mm aa"
      />
      <Button
        type="submit"
        text="Submit Log"
        color="primary"
        onClick={handleSubmit}
        disabled={formIsValid}
      />
    </StyledPriceLogForm>
  );
};

PriceLogForm.propTypes = {};

PriceLogForm.defaultProps = {};

export default PriceLogForm;

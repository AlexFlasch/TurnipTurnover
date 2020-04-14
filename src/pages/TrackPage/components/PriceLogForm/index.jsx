import React, { useState, useEffect, useReducer, useContext } from 'react';
import PropTypes from 'prop-types';
import { useMutation } from '@apollo/react-hooks';
import subDays from 'date-fns/subDays';
import formatISO from 'date-fns/formatISO';

import { mutation } from '../../../../gql/mutations/addUserPriceLog';

import { formReducer, formInitialState } from './state';
import {
  LOG_TYPES,
  LOG_TYPES_OPTIONS,
  TURNIP_INPUT_MODES,
  TURNIP_INPUT_MODE_OPTIONS,
} from './constants';

import AuthContext from '../../../../contexts/auth';

import Dropdown from '../../../../components/dropdown/Dropdown';
import Input from '../../../../components/input/Input';
import DatePicker from '../../../../components/date-picker/DatePicker';
import Button from '../../../../components/button/Button';

import StyledPriceLogForm from './styles/StyledPriceLogForm';

// actual PriceLogForm component
const PriceLogForm = props => {
  const {
    user: { id: userId },
  } = useContext(AuthContext);

  const [addUserPriceLog] = useMutation(mutation);

  const [state, dispatch] = useReducer(formReducer, formInitialState);

  const [formIsValid, setFormIsValid] = useState(false);
  useEffect(() => {
    if (state.price.isValid && state.turnips.isValid) {
      setFormIsValid(true);
    } else {
      setFormIsValid(false);
    }
  }, [state.price.isValid, state.turnips.isValid]);

  const handleSubmit = event => {
    if (event && formIsValid) {
      event.stopPropagation();
      event.preventDefault();

      const amountTurnips =
        state.turnipInputMode === TURNIP_INPUT_MODES.STACK
          ? state.turnips.value * 10
          : state.turnips.value;

      addUserPriceLog({
        variables: {
          userId,
          price: state.price.value,
          isBuyLog: state.logType === LOG_TYPES.BUY,
          isSellLog: state.logType === LOG_TYPES.SELL,
          turnips: amountTurnips,
          datetime: formatISO(state.datetime),
        },
      });

      console.log('submitting: ', {
        userId,
        price: state.price.value,
        isBuy: state.logType === LOG_TYPES.BUY,
        isSell: state.logType === LOG_TYPES.SELL,
        turnips: amountTurnips,
        datetime: formatISO(state.datetime),
      });
    }
  };

  return (
    <StyledPriceLogForm onSubmit={handleSubmit}>
      <Dropdown
        className="log-type"
        options={LOG_TYPES_OPTIONS}
        isSearchable={false}
        defaultValue={LOG_TYPES_OPTIONS[0]}
        onChange={value => dispatch({ type: 'updateLogType', payload: value })}
      />
      <Input
        className="turnip-amount"
        label={state.turnipsInputLabel}
        disabled={state.turnipsInputDisabled}
        handleChange={value =>
          dispatch({ type: 'updateTurnipAmount', payload: value })
        }
      />
      <Dropdown
        className="turnip-input-mode"
        options={TURNIP_INPUT_MODE_OPTIONS}
        isSearchable={false}
        disabled={state.turnipsInputDisabled}
        onChange={value =>
          dispatch({ type: 'updateTurnipInputMode', payload: value })
        }
        value={state.turnipInputMode}
      />
      <Input
        className="turnip-price"
        label="Turnip Price"
        handleChange={value =>
          dispatch({ type: 'updatePrice', payload: value })
        }
        isValid={state.price.isValid}
        validationMessage={state.price.validationMsg}
      />
      <div className="log-datetime">
        <DatePicker
          label="Date and Time of Log"
          showTimeSelect={true}
          onChange={value =>
            dispatch({ type: 'updateDatetime', payload: value })
          }
          minDate={subDays(new Date(), 30)}
          maxDate={new Date()}
          timeFormat="HH:mm"
          timeInterval={15}
          selected={state.datetime}
          dateFormat="MM/dd/yyyy h:mm aa"
        />
      </div>
      <Button
        className="submit-btn"
        type="submit"
        text="Submit Log"
        color="primary"
        onClick={handleSubmit}
        disabled={!formIsValid}
      />
    </StyledPriceLogForm>
  );
};

PriceLogForm.propTypes = {
  handleSubmit: PropTypes.func,
};

PriceLogForm.defaultProps = {
  handleSubmit: () => {},
};

export default PriceLogForm;

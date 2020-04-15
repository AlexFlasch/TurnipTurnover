import { isNumeric } from '../../../../utils/validation-fns';

import {
  LOG_TYPES,
  LOG_TYPES_OPTIONS,
  TURNIP_INPUT_MODE_OPTIONS,
} from './constants';

const getTurnipValidationStatus = value => {
  let validationMsg = '';
  let isValid = undefined;

  if (value < 0) {
    validationMsg = 'Turnips must have a positive value.';
    isValid = false;
  } else if (!isNumeric(value)) {
    validationMsg = 'Turnips must be a numeric, whole number value.';
    isValid = false;
  } else if (value === '') {
    validationMsg = '';
    isValid = undefined;
  } else {
    validationMsg = '';
    isValid = true;
  }

  return {
    message: validationMsg,
    isValid,
  };
};

const getPriceValidationStatus = (value, isDisabled) => {
  let validationMsg = '';
  let isValid = undefined;

  if (isDisabled) {
    validationMsg = undefined;
    isValid = true;
  } else if (value < 0) {
    validationMsg = 'Price must have a positive value.';
    isValid = false;
  } else if (!isNumeric(value)) {
    validationMsg = 'Price must be a numeric, whole number value.';
    isValid = false;
  } else if (value === '') {
    validationMsg = '';
    isValid = undefined;
  } else {
    validationMsg = '';
    isValid = true;
  }

  return {
    message: validationMsg,
    isValid,
  };
};

const getTurnipsInputLabel = value => {
  if (value === LOG_TYPES.SELL) {
    return 'Turnips Sold';
  } else if (value === LOG_TYPES.BUY) {
    return 'Turnips Bought';
  } else {
    return '';
  }
};

export const formReducer = (state, action) => {
  const { payload } = action;

  let message, isValid;
  switch (action.type) {
    case 'updateLogType':
      const turnipsInputLabel = getTurnipsInputLabel(payload.value);
      ({ message, isValid } = getTurnipValidationStatus(
        state.turnips.value,
        payload.value !== LOG_TYPES.PRICE_CHECK,
      ));
      return {
        ...state,
        logType: payload.value,
        turnipsInputDisabled: payload.value === LOG_TYPES.PRICE_CHECK,
        turnipsInputLabel,
        turnips: {
          isValid: payload.value === LOG_TYPES.PRICE_CHECK,
        },
      };

    case 'updateTurnipAmount':
      ({ message, isValid } = getTurnipValidationStatus(
        payload,
        state.turnipsInputDisabled,
      ));
      return {
        ...state,
        turnips: {
          isValid,
          validationMsg: message,
          value: payload,
        },
      };

    case 'updateTurnipInputMode':
      return {
        ...state,
        turnipInputMode: payload,
      };

    case 'updatePrice':
      ({ message, isValid } = getPriceValidationStatus(payload));
      return {
        ...state,
        price: {
          isValid,
          validationMsg: message,
          value: payload,
        },
      };

    case 'updateDatetime':
      return {
        ...state,
        datetime: payload,
      };

    case 'resetForm':
      return {
        ...formInitialState,
      };

    default:
      return state;
  }
};

export const formInitialState = {
  logType: LOG_TYPES_OPTIONS[0],
  turnipsInputDisabled: true,
  turnipsInputLabel: '',
  turnips: {
    isValid: true,
    validationMsg: '',
    value: '',
  },
  turnipInputMode: TURNIP_INPUT_MODE_OPTIONS[0],
  price: {
    isValid: false,
    validationMsg: '',
    value: '',
  },
  datetime: new Date(),
};

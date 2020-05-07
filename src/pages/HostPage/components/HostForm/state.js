import { isValidDodoCode, isNumeric } from '../../../../utils/validation-fns';

export const initialState = {
  dodoCode: {
    value: '',
    isValid: false,
    validationMsg: undefined,
  },
  rules: {
    value: '',
    isValid: true,
    validationMsg: undefined,
  },
  queueSize: {
    value: 10,
    isValid: true,
    validationMsg: undefined,
  },
  maxVisitors: {
    value: 3,
    isValid: true,
    validationMsg: undefined,
  },
  entryFee: {
    value: 0,
    isValid: true,
    validationMsg: undefined,
  },
  isPublic: true,
  isSellSession: true,
  isBuySession: false,
  formIsValid: false,
};

// TODO: Should probably curry out the dispatch function
export const updateDodoCode = (dispatch, value) => {
  let payload;
  if (isValidDodoCode(value)) {
    payload = {
      value,
      isValid: true,
      validationMsg: undefined,
    };
  } else {
    payload = {
      value,
      isValid: false,
      validationMsg: 'Dodo Codes must be 5 alphanumeric characters.',
    };
  }

  dispatch({ type: 'updateDodoCode', payload });
};

export const updateEntryFee = (dispatch, value) => {
  let payload;
  if (value.length > 0) {
    payload = {
      value,
      isValid: true,
      validationMsg: undefined,
    };
  } else {
    payload = {
      value,
      isValid: false,
      validationMsg:
        "Entry Fee must have a value. If you don't want to have an entry fee enter 0.",
    };
  }

  dispatch({ type: 'updateEntryFee', payload });
};

export const updateQueueSize = (dispatch, value) => {
  let payload;
  if (isNumeric(value) && value <= 100) {
    payload = {
      value,
      isValid: true,
      validationMsg: undefined,
    };
  } else if (value > 100) {
    payload = {
      value,
      isValid: false,
      validationMsg: 'Only up to 100 visitors can be in line at once!',
    };
  } else {
    payload = {
      value,
      isValid: false,
      validationMsg: 'Max Visitors in Line must be a number.',
    };
  }

  dispatch({ type: 'updateQueueSize', payload });
};

export const updateMaxVisitors = (dispatch, value) => {
  let payload;
  if (isNumeric(value) && value <= 8) {
    payload = {
      value,
      isValid: true,
      validationMsg: undefined,
    };
  } else if (value > 8) {
    payload = {
      value,
      isValid: false,
      validationMsg:
        'You can only have up to 8 visitors on your island at once!',
    };
  } else {
    payload = {
      value,
      isValid: false,
      validationMsg: 'Max Visitors on Island must be a number.',
    };
  }

  dispatch({ type: 'updateMaxVisitors', payload });
};

export const updateRules = (dispatch, value) => {
  let payload;
  if (value.length > 0) {
    payload = {
      value,
      isValid: true,
      validationMsg: undefined,
    };
  } else {
    payload = {
      value,
      isValid: true,
      validationMsg: undefined,
    };
  }

  // should this field have validation? get feedback

  dispatch({ type: 'updateRules', payload });
};

export const updateSessionVisibility = (dispatch, value) => {
  let payload;
  payload = value;

  dispatch({ type: 'updateSessionVisibility', payload });
};

export const updateSessionType = (dispatch, value) => {
  let payload;
  if (value) {
    payload = {
      isSellSession: true,
      isBuySession: false,
    };
  } else {
    payload = {
      isSellSession: false,
      isBuySession: true,
    };
  }

  dispatch({ type: 'updateSessionType', payload });
};

export default (state, action) => {
  const { payload } = action;

  switch (action.type) {
    case 'updateDodoCode':
      return {
        ...state,
        dodoCode: {
          ...state.dodoCode,
          ...payload,
        },
        formIsValid:
          payload.isValid &&
          state.entryFee.isValid &&
          state.rules.isValid &&
          state.queueSize.isValid &&
          state.maxVisitors.isValid,
      };

    case 'updateEntryFee':
      return {
        ...state,
        entryFee: {
          ...state.entryFee,
          ...payload,
        },
        formIsValid:
          payload.isValid &&
          state.dodoCode.isValid &&
          state.rules.isValid &&
          state.queueSize.isValid &&
          state.maxVisitors.isValid,
      };

    case 'updateRules':
      return {
        ...state,
        rules: {
          ...state.rules,
          ...payload,
        },
        formIsValid:
          payload.isValid &&
          state.dodoCode.isValid &&
          state.entryFee.isValid &&
          state.queueSize.isValid &&
          state.maxVisitors.isValid,
      };

    case 'updateQueueSize':
      return {
        ...state,
        queueSize: {
          ...state.queueSize,
          ...payload,
        },
        formIsValid:
          payload.isValid &&
          state.dodoCode.isValid &&
          state.entryFee.isValid &&
          state.rules.isValid &&
          state.maxVisitors.isValid,
      };

    case 'maxVisitors':
      return {
        ...state,
        maxVisitors: {
          ...state.maxVisitors,
          ...payload,
        },
        formIsValid:
          payload.isValid &&
          state.dodoCode.isValid &&
          state.entryFee.isValid &&
          state.rules.isValid &&
          state.queueSize.isValid,
      };

    case 'updateSessionVisibility':
      return {
        ...state,
        isPublic: payload,
      };

    case 'updateSessionType':
      return {
        ...state,
        ...payload,
      };

    default:
      return {
        ...state,
      };
  }
};

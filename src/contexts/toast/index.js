import React, { createContext, useReducer } from 'react';

import StyledToastContainer from './styles/StyledToastContainer';

import Toast from './components/Toast';

/* eslint-disable no-fallthrough */

// code taken from https://www.w3resource.com/javascript-exercises/javascript-math-exercise-23.php
const createUuid = () => {
  var dt = new Date().getTime();
  var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
    var r = (dt + Math.random() * 16) % 16 | 0;
    dt = Math.floor(dt / 16);
    return (c === 'x' ? r : (r & 0x3) | 0x8).toString(16);
  });
  return uuid;
};

const deleteToast = dispatch => uuid => {
  dispatch({ type: 'deleteToast', payload: uuid });
};

const dismissToast = dispatch => uuid => {
  dispatch({ type: 'dismissToast', payload: uuid });
};

const sendToast = dispatch => (message, type, delay = 3000) => {
  const uuid = createUuid();

  const autoDismiss = setTimeout(() => {
    dismissToast(dispatch)(uuid);
  }, delay);

  const toastObj = {
    uuid,
    message,
    type,
    isDismissed: false,
    autoDismiss,
  };

  dispatch({ type: 'sendToast', payload: toastObj });
};

const context = createContext();

const toastReducer = (state, action) => {
  const { payload } = action;
  switch (action.type) {
    case 'sendToast':
      return {
        ...state,
        toasts: [...state.toasts, payload],
      };

    case 'manuallyDismissToast':
      const manuallyDismissedToast = state.toasts.find(
        toast => toast.uuid === payload,
      );
      clearTimeout(manuallyDismissedToast.autoDismiss);

    case 'dismissToast':
      const dismissedToastIndex = state.toasts.findIndex(
        toast => toast.uuid === payload,
      );
      const dismissedToast = state.toasts[dismissedToastIndex];
      dismissedToast.isDismissed = true;

      const afterDismiss = [
        ...state.toasts.slice(0, dismissedToastIndex),
        dismissedToast,
        ...state.toasts.slice(dismissedToastIndex + 1),
      ];

      return {
        ...state,
        toasts: afterDismiss,
      };

    case 'deleteToast':
      const deletedToastIndex = state.toasts.findIndex(
        toast => toast.uuid === payload,
      );
      const afterDelete = [
        ...state.toasts.slice(0, deletedToastIndex),
        ...state.toasts.slice(deletedToastIndex + 1),
      ];

      return {
        ...state,
        toasts: afterDelete,
      };

    default:
      return state;
  }
};

const initialState = {
  toasts: [],
};

export const ToastProvider = props => {
  const [state, dispatch] = useReducer(toastReducer, initialState);

  const providerValue = {
    ...state,
    sendToast: sendToast(dispatch),
    dismissToast: dismissToast(dispatch),
    deleteToast: deleteToast(dispatch),
  };

  return (
    <context.Provider value={providerValue}>
      {props.children}
      <StyledToastContainer>
        {state.toasts.map(toastObj => {
          return (
            <Toast
              key={`toast-${toastObj.uuid}`}
              onDismiss={() =>
                dispatch({
                  type: 'manuallyDismissToast',
                  payload: toastObj.uuid,
                })
              }
              onDelete={() =>
                dispatch({ type: 'deleteToast', payload: toastObj.uuid })
              }
              isDismissed={toastObj.isDismissed}
              message={toastObj.message}
              type={toastObj.type}
            />
          );
        })}
      </StyledToastContainer>
    </context.Provider>
  );
};

export default context;

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

const VALID_LOCATIONS = [
  'topLeft',
  'top',
  'topRight',
  'right',
  'bottomRight',
  'bottom',
  'bottomLeft',
  'left',
];

const sendToast = dispatch => (
  message,
  type,
  location = 'bottom',
  delay = 3000,
  persistent = false,
) => {
  if (!VALID_LOCATIONS.includes(location)) {
    console.warn(
      'An invalid toast location was specified. Defaulting to `bottom`.\n Valid locations include:\n\t`topLeft`\n\t`top`\n\t`topRight`\n\t`right`\n\t`bottomRight`\n\t`bottom`\n\t`bottomLeft`\n\t`left`',
    );
    location = 'bottom';
  }

  const uuid = `${location}-${createUuid()}`;

  const autoDismiss = !persistent
    ? setTimeout(() => {
        dismissToast(dispatch)(uuid);
      }, delay)
    : () => {};

  const toastObj = {
    uuid,
    message,
    location,
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
        toasts: {
          ...state.toasts,
          [payload.location]: [...state.toasts[payload.location], payload],
        },
      };

    case 'manuallyDismissToast':
      const manuallyDismissedToastLocation = payload.split('-')[0];
      const manuallyDismissedToast = state.toasts[
        manuallyDismissedToastLocation
      ].find(toast => toast.uuid === payload);
      clearTimeout(manuallyDismissedToast.autoDismiss);
    // make use of fallthrough here.
    // this allows the manual dismissal to function the same as a normal dismissal
    // but also clears the auto-dismiss timeout to avoid errors

    case 'dismissToast':
      const dismissedToastLocation = payload.split('-')[0];
      const dismissedToastIndex = state.toasts[
        dismissedToastLocation
      ].findIndex(toast => toast.uuid === payload);
      const dismissedToast =
        state.toasts[dismissedToastLocation][dismissedToastIndex];
      dismissedToast.isDismissed = true;

      const afterDismiss = [
        ...state.toasts[dismissedToastLocation].slice(0, dismissedToastIndex),
        dismissedToast,
        ...state.toasts[dismissedToastLocation].slice(dismissedToastIndex + 1),
      ];

      return {
        ...state,
        toasts: {
          ...state.toasts,
          [dismissedToastLocation]: afterDismiss,
        },
      };

    case 'deleteToast':
      const deletedToastLocation = payload.split('-')[0];
      const deletedToastIndex = state.toasts[deletedToastLocation].findIndex(
        toast => toast.uuid === payload,
      );
      const afterDelete = [
        ...state.toasts[deletedToastLocation].slice(0, deletedToastIndex),
        ...state.toasts[deletedToastLocation].slice(deletedToastIndex + 1),
      ];

      return {
        ...state,
        toasts: {
          ...state.toasts,
          [deletedToastLocation]: afterDelete,
        },
      };

    default:
      return state;
  }
};

const initialState = {
  toasts: {
    topLeft: [],
    top: [],
    topRight: [],
    right: [],
    bottomRight: [],
    bottom: [],
    bottomLeft: [],
    left: [],
  },
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
      {Object.keys(state.toasts).map(location => (
        <StyledToastContainer key={location} location={location}>
          {state.toasts[location].map(toastObj => {
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
      ))}
    </context.Provider>
  );
};

export default context;

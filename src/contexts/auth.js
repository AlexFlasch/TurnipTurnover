import { createContext } from 'react';

const defaultContextValues = {
  authStatusReported: false,
  isSignedIn: false,
  firebase: null,
};

const authContext = createContext(defaultContextValues);
// firebase util functions

export { authContext as default };

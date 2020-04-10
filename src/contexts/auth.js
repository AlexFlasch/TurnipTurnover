import React, { createContext, useReducer } from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';
import getUserData from '../gql/queries/getUserData';

// firebase setup
const firebaseConfig = {
  apiKey: 'AIzaSyAhTjSuKjMw-f_SrO6INQaV45LJGjylgWw',
  authDomain: 'turnip-turnover.firebaseapp.com',
  databaseURL: 'https://turnip-turnover.firebaseio.com',
  projectId: 'turnip-turnover',
  storageBucket: 'turnip-turnover.appspot.com',
  messagingSenderId: '304344327651',
  appId: '1:304344327651:web:3c52c93b563ed0b43dacd6',
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const signInUser = (dispatch, client) => async (email, password) => {
  try {
    await firebaseApp.auth().signInWithEmailAndPassword(email, password);
    const fbUser = firebaseApp.auth().currentUser;

    // get user data associated with the firebase uid
    const { data } = await client.query({
      query: getUserData,
      variables: { uuid: fbUser.uid },
    });
    // jesus christ I need optional chaining so bad
    const user = data && data.User && data.User[0] && data.User[0];

    // update the auth reducer with the user object retrieved from Hasura
    dispatch({ type: 'userSignIn', payload: user });

    // add the user to localStorage to persist user sessions
    localStorage.setItem('user', JSON.stringify(user));
  } catch (e) {
    return e;
  }
};

const signOutUser = dispatch => async () => {
  try {
    await firebaseApp.auth().signOut();

    // remove user from localStorage to end their session
    localStorage.removeItem('user');

    dispatch({ type: 'userSignOut', payload: null });
  } catch (e) {
    return e;
  }
};

const registerUser = dispatch => async (email, displayName, password) => {
  try {
    await firebaseApp.auth().createUserWithEmailAndPassword(email, password);
    const user = firebaseApp.auth().currentUser;
    dispatch({ type: 'userSignIn', payload: { user, displayName } });
  } catch (e) {
    return e;
  }
};

const resetPassword = async email => {
  try {
    await firebaseApp.auth().sendPasswordResetEmail(email);
  } catch (e) {
    return e;
  }
};

const initialState = {
  isSignedIn:
    (firebaseApp.auth().currentUser ||
      JSON.parse(localStorage.getItem('user'))) !== null,
  user:
    firebaseApp.auth().currentUser || JSON.parse(localStorage.getItem('user')),
};

const context = createContext();

const reducer = (state, action) => {
  const { payload } = action;
  switch (action.type) {
    case 'userSignIn':
      return {
        ...state,
        user: payload.user,
        isSignedIn: true,
      };

    case 'userSignOut':
      return {
        ...state,
        user: null,
        isSignedIn: false,
      };

    default:
      return state;
  }
};

export const AuthProvider = props => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const providerValue = {
    ...state,
    signInUser: signInUser(dispatch, props.gqlClient),
    registerUser: registerUser(dispatch),
    signOutUser: signOutUser(dispatch),
    resetPassword,
  };

  return (
    <context.Provider value={providerValue}>{props.children}</context.Provider>
  );
};

export default context;

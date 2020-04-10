import { createContext } from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';

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

// update user value in auth context whenever firebase auth state changes
let user;
firebaseApp.auth().onAuthStateChanged(u => (u ? (user = u) : (user = null)));

const signInUser = async (email, password) => {
  try {
    await firebaseApp.auth().signInWithEmailAndPassword(email, password);
  } catch (e) {
    return e;
  }
};
const registerUser = async (email, password) => {
  try {
    await firebaseApp.auth().createUserWithEmailAndPassword(email, password);
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

export const defaultContextValues = {
  authStatusReported: false,
  isSignedIn: false,
  firebase: firebaseApp,
  user,
  // auth functions
  signInUser,
  registerUser,
  resetPassword,
};

const authContext = createContext(defaultContextValues);

export default authContext;

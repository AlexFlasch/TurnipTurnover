import React from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';
import { ApolloProvider } from '@apollo/react-hooks';
import { ModalProvider } from 'styled-react-modal';

import gqlClient from './apollo-setup';
import AuthContext from './contexts/auth';
import Routes from './routes';

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

const App = () => {
  return (
    <AuthContext.Provider value={{ firebase: firebaseApp }}>
      <ApolloProvider client={gqlClient}>
        <ModalProvider>
          <Routes />
        </ModalProvider>
      </ApolloProvider>
    </AuthContext.Provider>
  );
};

export default App;

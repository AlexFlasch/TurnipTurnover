import React from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';
import { ModalProvider } from 'styled-react-modal';

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

// apollo client setup
const client = new ApolloClient({
  uri: 'https://turnip-turnover.herokuapp.com/v1/graphql',
});

const App = () => {
  return (
    <AuthContext.Provider value={{ firebase: firebaseApp }}>
      <ApolloProvider client={client}>
        <ModalProvider>
          <Routes />
        </ModalProvider>
      </ApolloProvider>
    </AuthContext.Provider>
  );
};

export default App;

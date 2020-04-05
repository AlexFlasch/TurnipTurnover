import React from 'react';
import dotenv from 'dotenv';
import firebase from 'firebase/app';
import 'firebase/auth';
import ApolloClient, { ApolloProvider } from 'apollo-boost';

import AuthContext from './contexts/auth';
import Routes from './routes';

const env = dotenv.config();

// firebase setup
const firebaseConfig = {
  apiKey: env.apiKey,
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
    <AuthContext.Provider value={{ firebaseApp }}>
      <ApolloProvider client={client}>
        <Routes />
      </ApolloProvider>
    </AuthContext.Provider>
  );
};

export default App;

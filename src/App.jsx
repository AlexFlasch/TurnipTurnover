import React from 'react';
import { ApolloProvider } from '@apollo/react-hooks';
import { ModalProvider } from 'styled-react-modal';

import gqlClient from './apollo-setup';
import { AuthProvider } from './contexts/auth';
import Routes from './routes';

import { modalBackdrop } from './components/sign-in-modal/styles/StyledSignInModal';

import 'react-datepicker/dist/react-datepicker.css';

const App = () => {
  return (
    <ApolloProvider client={gqlClient}>
      <AuthProvider gqlClient={gqlClient}>
        <ModalProvider backgroundComponent={modalBackdrop}>
          <Routes />
        </ModalProvider>
      </AuthProvider>
    </ApolloProvider>
  );
};

export default App;

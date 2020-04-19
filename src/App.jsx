import React from 'react';
import { ApolloProvider } from '@apollo/react-hooks';
import { ModalProvider } from 'styled-react-modal';

import gqlClient from './apollo-setup';
import { AuthProvider } from './contexts/auth';
import { ToastProvider } from './contexts/toast';
import Routes from './routes';

import { modalBackdrop } from './components/sign-in-modal/styles/StyledSignInModal';

import 'react-datepicker/dist/react-datepicker.css';

const App = () => {
  return (
    <ApolloProvider client={gqlClient}>
      <ToastProvider>
        <AuthProvider gqlClient={gqlClient}>
          <ModalProvider backgroundComponent={modalBackdrop}>
            <Routes />
          </ModalProvider>
        </AuthProvider>
      </ToastProvider>
    </ApolloProvider>
  );
};

export default App;

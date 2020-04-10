import React from 'react';
import { ApolloProvider } from '@apollo/react-hooks';
import { ModalProvider } from 'styled-react-modal';

import gqlClient from './apollo-setup';
import AuthContext, { defaultContextValues } from './contexts/auth';
import Routes from './routes';

import { modalBackdrop } from './components/sign-in-modal/styles/StyledSignInModal';

const App = () => {
  return (
    <AuthContext.Provider value={defaultContextValues}>
      <ApolloProvider client={gqlClient}>
        <ModalProvider backgroundComponent={modalBackdrop}>
          <Routes />
        </ModalProvider>
      </ApolloProvider>
    </AuthContext.Provider>
  );
};

export default App;

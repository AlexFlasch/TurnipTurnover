import React from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';
import AuthContext from './contexts/auth';
import Routes from './routes';

const firebaseConfig = {
  apiKey: 'AIzaSyAKONkFzoT1YiViMTt6nCoJ_ggpo402_64',
  authDomain: 'stalk-market-823eb.firebaseapp.com',
  databaseURL: 'https://stalk-market-823eb.firebaseio.com',
  projectId: 'stalk-market-823eb',
  storageBucket: 'stalk-market-823eb.appspot.com',
  messagingSenderId: '867737085488',
  appId: '1:867737085488:web:5e7b63557298443b23aff5',
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const App = () => {
  return (
    <AuthContext.Provider value={{ firebaseApp }}>
      <Routes />
    </AuthContext.Provider>
  );
};

export default App;

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-redux';
import { StatusBar } from 'react-native';
import AppNavigator from './src/navigation/AppNavigator';
import store from './src/store';

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <StatusBar barStyle="light-content" />
        <AppNavigator />
      </NavigationContainer>
    </Provider>
  );
};

export default App;
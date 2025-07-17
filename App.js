import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { StatusBar } from 'react-native';
import { store } from './src/store';
import { checkAuthStatus } from './src/store/slices/authSlice';
import AuthNavigator from './src/navigation/AuthNavigator';
import MainNavigator from './src/navigation/MainNavigator';
import SplashScreen from './src/screens/Auth/SplashScreen';

const AppContent = () => {
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.auth);
  const [isInitializing, setIsInitializing] = useState(true);

  useEffect(() => {
    const initializeApp = async () => {
      try {
        await dispatch(checkAuthStatus());
      } catch (error) {
        console.log('No existing auth found');
      } finally {
        setTimeout(() => setIsInitializing(false), 2000);
      }
    };

    initializeApp();
  }, [dispatch]);

  if (isInitializing) {
    return <SplashScreen />;
  }

  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <NavigationContainer>
        {isAuthenticated ? <MainNavigator /> : <AuthNavigator />}
      </NavigationContainer>
    </>
  );
};

const App = () => {
  return (
    <Provider store={store}>
      <AppContent />
    </Provider>
  );
};

export default App;
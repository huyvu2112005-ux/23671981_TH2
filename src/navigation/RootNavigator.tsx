import React from 'react';
import LoginScreen from '../screens/LoginScreen';
import MainTabs from './MainTabs';
import {useAuthStore} from '../stores/authStore';

export default function RootNavigator() {
  const token = useAuthStore(state => state.token);
  return token ? <MainTabs /> : <LoginScreen />;
}

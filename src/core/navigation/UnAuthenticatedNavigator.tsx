import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React, {type ReactElement} from 'react';
import LoginScreen from '../../screens/unauthenticated/Login/LoginScreen';
import {UnAuthenticatedStackNavigatorParamList} from '../../types/navigation';

const Stack =
  createNativeStackNavigator<UnAuthenticatedStackNavigatorParamList>();

export const UnAuthenticatedNavigator = (): ReactElement => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Login" component={LoginScreen} />
    </Stack.Navigator>
  );
};

export default UnAuthenticatedNavigator;

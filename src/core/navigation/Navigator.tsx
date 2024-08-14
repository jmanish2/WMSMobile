import {NavigationContainer} from '@react-navigation/native';
import React, {type ReactElement} from 'react';

import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationProps, RootNavigatorParamList} from '../../types/navigation';
import {AuthenticatedNavigator} from './AuthenticatedNavigator';
import UnAuthenticatedNavigator from './UnAuthenticatedNavigator';

export const Stack = createNativeStackNavigator<RootNavigatorParamList>();

export const Navigator = (props: NavigationProps): ReactElement => {
  const isLoggedIn = false;

  return (
    <NavigationContainer {...props}>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        {isLoggedIn ? (
          <Stack.Screen
            name="AuthenticatedStack"
            component={AuthenticatedNavigator}
          />
        ) : (
          <Stack.Screen
            name="UnAuthenticatedStack"
            component={UnAuthenticatedNavigator}
          />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigator;

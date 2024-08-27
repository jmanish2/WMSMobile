import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React, {type ReactElement} from 'react';
import {AuthenticatedStackNavigatorParamList} from '../../types/navigation';
import DashBoardScreen from '../../screens/authenticated/DashBoard/DashBoardScreen';
import ReceivingByOptionScreen from '../../screens/authenticated/ReceivingScreenByOption/ReceivingScreenByOption';
import ReceivingScreen from '../../screens/authenticated/Receiving/ReceivingScreen';
import BarCodeScanner from '../../screens/authenticated/Scanner/BarcodeScanner';
const Stack =
  createNativeStackNavigator<AuthenticatedStackNavigatorParamList>();

export const AuthenticatedNavigator = (): ReactElement => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Dashboard" component={DashBoardScreen} />
      <Stack.Screen name="Receiving" component={ReceivingScreen} />
      <Stack.Screen
        name="ReceivingByOptionScreen"
        component={ReceivingByOptionScreen}
      />
      <Stack.Screen name="BarCodeScanner" component={BarCodeScanner} />
    </Stack.Navigator>
  );
};

export default AuthenticatedNavigator;

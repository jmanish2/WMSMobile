import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React, {type ReactElement} from 'react';
import {AuthenticatedStackNavigatorParamList} from '../../types/navigation';
import DashBoardScreen from '../../screens/authenticated/DashBoard/DashBoardScreen';
import ReceivingByShipmentScreen from '../../screens/authenticated/ReceivingByShipment/ReceivingByShipmentScreen';
import ReceivingScreen from '../../screens/authenticated/Receiving/ReceivingScreen';

const Stack =
  createNativeStackNavigator<AuthenticatedStackNavigatorParamList>();

export const AuthenticatedNavigator = (): ReactElement => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Dashboard" component={DashBoardScreen} />
      <Stack.Screen name="Receiving" component={ReceivingScreen} />
      <Stack.Screen
        name="ReceivingByShipmeent"
        component={ReceivingByShipmentScreen}
      />
    </Stack.Navigator>
  );
};

export default AuthenticatedNavigator;

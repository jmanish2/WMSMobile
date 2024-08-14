import React, {FC} from 'react';
import {StyleSheet, Text} from 'react-native';
import Screen from '../../../ui/components/Screen';
import {UnAuthenticatedStackNavigatorScreenProps} from '../../../types/navigation';

interface LoginScreenProps
  extends UnAuthenticatedStackNavigatorScreenProps<'Login'> {}

const LoginScreen: FC<LoginScreenProps> = () => {
  return (
    <Screen>
      <Text>LoginScreen</Text>
    </Screen>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({});

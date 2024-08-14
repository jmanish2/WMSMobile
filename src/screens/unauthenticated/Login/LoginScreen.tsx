import React, {FC, useState} from 'react';
import {StyleSheet, Text} from 'react-native';

import {UnAuthenticatedStackNavigatorScreenProps} from '../../../types/navigation';
import Screen from '../../../ui/components/Screen';
import {Button, TextInput} from 'react-native-paper';

interface LoginScreenProps
  extends UnAuthenticatedStackNavigatorScreenProps<'Login'> {}

const LoginScreen: FC<LoginScreenProps> = () => {
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const handleLogin = () => {
    console.log('User ID:', userId);
    ``;
    console.log('Password:', password);
  };

  return (
    <Screen>
      <Text variant="headlineLarge">Login</Text>
      <TextInput
        label="User ID"
        mode="outlined"
        value={userId}
        onChangeText={text => setUserId(text)}
      />
      <TextInput
        label="Password"
        mode="outlined"
        secureTextEntry
        value={password}
        onChangeText={text => setPassword(text)}
      />
      <Button mode="contained" onPress={handleLogin}>
        Login
      </Button>
    </Screen>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({});

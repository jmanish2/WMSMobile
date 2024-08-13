import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import Screen from '../../../ui/components/Screen';
import {Button, Text, TextInput} from 'react-native-paper';

const LoginScreen = () => {
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const handleLogin = () => {
    console.log('User ID:', userId);``
    console.log('Password:', password);
  };

  return (
    <Screen>
      <View style={styles.container}>
        <Text variant="headlineLarge" style={styles.text}>
          Login
        </Text>
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
        <Button style={styles.button} mode="contained" onPress={handleLogin}>
          Login
        </Button>
      </View>
    </Screen>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    marginTop: '50%',
  },
  button: {
    marginTop: 16,
  },
  text: {
    textAlign: 'center',
    marginVertical: 16,
  },
});

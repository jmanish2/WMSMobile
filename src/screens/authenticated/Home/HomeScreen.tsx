import React, {FC} from 'react';
import {StyleSheet, Text} from 'react-native';
import {AuthenticatedStackNavigatorScreenProps} from '../../../types/navigation';
import Screen from '../../../ui/components/Screen';

interface HomeScreenProps
  extends AuthenticatedStackNavigatorScreenProps<'Home'> {}

const HomeScreen: FC<HomeScreenProps> = () => {
  return (
    <Screen>
      <Text>HomeScreen</Text>
    </Screen>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});

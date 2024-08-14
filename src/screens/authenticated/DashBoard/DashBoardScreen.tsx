import {StyleSheet, TouchableOpacity, View} from 'react-native';
import React, {FC} from 'react';
import Screen from '../../../ui/components/Screen';
import {Button, Card, Text} from 'react-native-paper';
import {
  AuthenticatedStackNavigatorParamList,
  AuthenticatedStackNavigatorScreenProps,
} from '../../../types/navigation';
import {useNavigation} from '@react-navigation/native';

interface DashboardScreenProps
  extends AuthenticatedStackNavigatorScreenProps<'Dashboard'> {}

const DashBoardScreen: FC<DashboardScreenProps> = () => {
  const navigation = useNavigation();

  const handleCardPress = (screenName: string) => {
    navigation.navigate(
      screenName as keyof AuthenticatedStackNavigatorParamList,
    );
  };
  const cardData = [
    {title: 'Receiving', screenName: 'Receiving'},
    {title: 'Shipping', screenName: 'Shipping'},
    {title: 'Maintenance', screenName: 'MaintenanceScreen'},
  ];
  return (
    <Screen>
      <Text variant="headlineSmall">Menu</Text>
      {cardData.map((card, index) => (
        <TouchableOpacity
          key={index}
          style={styles.cardContainer}
          onPress={() => handleCardPress(card.screenName)}>
          <Card>
            <Card.Content style={styles.cardContent}>
              <Text>{card.title}</Text>
            </Card.Content>
          </Card>
        </TouchableOpacity>
      ))}
      <Button style={styles.button} mode="contained">
        Logout
      </Button>
    </Screen>
  );
};

export default DashBoardScreen;

const styles = StyleSheet.create({
  cardContainer: {
    marginBottom: 8,
  },
  cardContent: {
    alignItems: 'center',
  },

  button: {
    marginTop: 16,
  },
});

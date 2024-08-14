import {StyleSheet, TouchableOpacity, View} from 'react-native';
import React, { FC } from 'react';
import Screen from '../../../ui/components/Screen';
import {Button, Card, Text} from 'react-native-paper';
import { AuthenticatedStackNavigatorScreenProps } from '../../../types/navigation';


interface DashboardScreenProps
  extends AuthenticatedStackNavigatorScreenProps<'Dashboard'> {}

const DashBoardScreen:FC<DashboardScreenProps> = () => {
  const cardData = [
    {title: 'Receiving', screenName: 'ReceivingScreen'},
    {title: 'Shipping', screenName: 'ShippingScreen'},
    {title: 'Maintenance', screenName: 'MaintenanceScreen'}
  ];
  return (
    <Screen>
      <View style={styles.container}>
        <Text variant="headlineLarge" style={styles.text}>
          Menu
        </Text>
        {cardData.map((card, index) => (
          <TouchableOpacity key={index} style={styles.cardContainer}>
            <Card style={styles.card}>
              <Card.Content style={styles.cardContent}>
                <Text style={styles.cardTitle}>{card.title}</Text>
              </Card.Content>
            </Card>
          </TouchableOpacity>
        ))}
        <Button style={styles.button} mode="contained">
          Login
        </Button>
      </View>
    </Screen>
  );
};

export default DashBoardScreen;

const styles = StyleSheet.create({
  container: {
    marginTop: '50%',
  },
  cardContainer: {
    marginBottom: 16,
  },
  card: {
    elevation: 4,
  },
  text: {
    textAlign: 'center',
    marginVertical: 16,
  },
  cardContent: {
    alignItems: 'center', // Center horizontally
    justifyContent: 'center', // Center vertically (if needed)
  },
  cardTitle: {
    fontSize: 18,
  },
  button: {
    marginTop: 16,
  },
});

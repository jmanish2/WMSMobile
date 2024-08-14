import {StyleSheet, TouchableOpacity, View} from 'react-native';
import React from 'react';
import Screen from '../../../ui/components/Screen';
import {Button, Card, Text} from 'react-native-paper';

const ReceivingScreen = () => {
  const cardData = [
    {title: 'By Shipment', screenName: 'ReceivingScreen'},
    {title: 'By Assests', screenName: 'ShippingScreen'},
  ];
  return (
    <Screen>
      <View style={styles.container}>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <Text variant="headlineLarge">Receiving</Text>
          <Button mode="contained">Back</Button>
        </View>
        <View style={{marginTop: 16}}>
          {cardData.map((card, index) => (
            <TouchableOpacity key={index} style={styles.cardContainer}>
              <Card style={styles.card}>
                <Card.Content style={styles.cardContent}>
                  <Text style={styles.cardTitle}>{card.title}</Text>
                </Card.Content>
              </Card>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </Screen>
  );
};

export default ReceivingScreen;

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
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardTitle: {
    fontSize: 18,
  },
});

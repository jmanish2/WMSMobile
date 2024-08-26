import {StyleSheet, TouchableOpacity, View} from 'react-native';
import React, {FC} from 'react';
import Screen from '../../../ui/components/Screen';
import {Button, Card, Text} from 'react-native-paper';
import {
  AuthenticatedStackNavigatorParamList,
  AuthenticatedStackNavigatorScreenProps,
} from '../../../types/navigation';
import {useNavigation} from '@react-navigation/native';

interface ReceivingScreenProps
  extends AuthenticatedStackNavigatorScreenProps<'Receiving'> {}

const ReceivingScreen: FC<ReceivingScreenProps> = () => {
  const navigation = useNavigation();
  const cardData = [
    {key: 1, title: 'By Shipment', screenName: 'ReceivingByOptionScreen'},
    {key: 2, title: 'By Assets', screenName: 'ReceivingByOptionScreen'},
  ];

  return (
    <Screen>
      <View style={styles.container}>
        <Text variant="headlineLarge">Receiving</Text>
        <Button mode="contained" onPress={() => navigation.goBack()}>
          Back
        </Button>
      </View>
      <View style={styles.cardContainer}>
        {cardData.map((card, index) => (
          <TouchableOpacity
            key={index}
            style={styles.cardContainer}
            onPress={() =>
              navigation.navigate(
                card.screenName as keyof AuthenticatedStackNavigatorParamList,
                {cardTitle: card.title, key: card.key},
              )
            }>
            <Card>
              <Card.Content style={styles.cardContent}>
                <Text>{card.title}</Text>
              </Card.Content>
            </Card>
          </TouchableOpacity>
        ))}
      </View>
    </Screen>
  );
};

export default ReceivingScreen;

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cardContainer: {
    marginBottom: 16,
  },

  cardContent: {
    alignItems: 'center',
  },
});

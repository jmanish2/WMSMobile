import {ScrollView, StyleSheet, TouchableOpacity, View} from 'react-native';
import React from 'react';
import Screen from '../../../ui/components/Screen';
import {Button, Text} from 'react-native-paper';
import RecivingCard from '../../../ui/widgets/RecivingCard';
interface Item {
  key: string;
  shipId: string;
  shipType: string;
  shipForm: string;
  status: string;
  created: string;
  refID: string;
}
const items: Item[] = [
  {
    key: '1',
    shipId: 'SH001',
    shipType: 'Asset',
    shipForm: 'Ware',
    status: 'In transit',
    created: 'Alica brown, 2023-05-04',
    refID: 'REF001',
  },
  {
    key: '2',
    shipId: 'SH002',
    shipType: 'Asset',
    shipForm: 'Dock',
    status: 'Delivered',
    created: 'Bob Smith, 2023-06-15',
    refID: 'REF002',
  },
  
];

const ReceivingByShipment = () => {
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

        <ScrollView >
          {items.map(item => (
            <RecivingCard
              key={item.key}
              shipID={item.shipId}
              refID={item.refID}
              shipFrom={item.shipForm}
              status={item.status}
              shipType={item.shipType}
              created={item.created}
            />
          ))}
        </ScrollView>
      </View>
    </Screen>
  );
};

export default ReceivingByShipment;

const styles = StyleSheet.create({
  container: {
    marginTop: '10%',
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

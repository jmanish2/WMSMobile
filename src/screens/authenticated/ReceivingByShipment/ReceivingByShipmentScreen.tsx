import {ScrollView, StyleSheet, TouchableOpacity, View} from 'react-native';
import React, {FC, useState} from 'react';
import Screen from '../../../ui/components/Screen';
import {Button, Text} from 'react-native-paper';
import RecivingCard from '../../../ui/widgets/RecivingCard';
import {AuthenticatedStackNavigatorScreenProps} from '../../../types/navigation';
import {useNavigation} from '@react-navigation/native';

interface Item {
  key: string;
  shipId: string;
  shipType: string;
  shipForm: string;
  status: string;
  created: string;
  refID: string;
}

const initialItems: Item[] = [
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
  {
    key: '3',
    shipId: 'SH003',
    shipType: 'Asset',
    shipForm: 'Dock',
    status: 'Pending',
    created: 'Bob Smith, 2023-06-15',
    refID: 'REF003',
  },
  {
    key: '4',
    shipId: 'SH004',
    shipType: 'Asset',
    shipForm: 'Dock',
    status: 'Pending',
    created: 'Bob Smith, 2023-06-15',
    refID: 'REF004',
  },
];

interface ReceivingByShipmentScreenProps
  extends AuthenticatedStackNavigatorScreenProps<'ReceivingByShipment'> {}

const ReceivingByShipmentScreen: FC<ReceivingByShipmentScreenProps> = () => {
  const navigation = useNavigation();
  const [items, setItems] = useState<Item[]>(initialItems);
  const handleDeleteCard = (key: string) => {
    setItems(prevItems => prevItems.filter(item => item.key !== key));
  };
  return (
    <ScrollView>
      <Screen>
        <View style={styles.container}>
          <Text variant="headlineLarge">Receiving</Text>
          <Button mode="contained" onPress={() => navigation.goBack()}>
            Back
          </Button>
        </View>
        <Text>Option : By Shipment</Text>
        {items.map(item => (
          <RecivingCard
            key={item.key}
            shipID={item.shipId}
            refID={item.refID}
            shipFrom={item.shipForm}
            status={item.status}
            shipType={item.shipType}
            created={item.created}
            handleReceive={async () => handleDeleteCard(item.key)}
          />
        ))}
      </Screen>
    </ScrollView>
  );
};

export default ReceivingByShipmentScreen;

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

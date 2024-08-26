import React, {FC, useState} from 'react';
import {ScrollView, StyleSheet, TouchableOpacity, View} from 'react-native';
import {Button, Text, TextInput} from 'react-native-paper';
import Screen from '../../../ui/components/Screen';
import CustomCard from '../../../ui/components/Card/CustomCard';
import {AuthenticatedStackNavigatorScreenProps} from '../../../types/navigation';
import {useNavigation, useRoute} from '@react-navigation/native';

interface Item {
  key: string;
  shipId: string;
  shipType: string;
  shipForm: string;
  status: string;
  created: string;
  refID: string;
}
interface AssestsItem {
  key: string;
  serialNo: string;
  barcode: string;
  assestType: string;
  alternateSerialNo: string;
}

const initialAssetsItem: AssestsItem[] = [
  {
    key: '1',
    serialNo: 'SNOO3',
    alternateSerialNo: 'AS003',
    barcode: 'BC003',
    assestType: 'cylindercal',
  },
  {
    key: '2',
    serialNo: 'SNOO4',
    alternateSerialNo: 'AS004',
    barcode: 'BC004',
    assestType: 'cylindercal',
  },
  {
    key: '3',
    serialNo: 'SNOO5',
    alternateSerialNo: 'AS005',
    barcode: 'BC005',
    assestType: 'cylindercal',
  },
  {
    key: '4',
    serialNo: 'SNOO6',
    alternateSerialNo: 'AS006',
    barcode: 'BC006',
    assestType: 'pneumatic',
  },
  {
    key: '5',
    serialNo: 'SNOO7',
    alternateSerialNo: 'AS007',
    barcode: 'BC007',
    assestType: 'pneumatic',
  },
  {
    key: '6',
    serialNo: 'SNOO8',
    alternateSerialNo: 'AS008',
    barcode: 'BC008',
    assestType: 'hydraulic',
  },
];

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

interface ReceivingByOptionScreenProps
  extends AuthenticatedStackNavigatorScreenProps<'ReceivingByOptionScreen'> {}

const ReceivingByOptionScreen: FC<ReceivingByOptionScreenProps> = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const {cardTitle, key} = route.params as {cardTitle?: string; key?: number};
  const [items, setItems] = useState<Item[]>(initialItems);
  const [assetItem] = useState<AssestsItem[]>(initialAssetsItem);
  const [input, setInput] = useState<string>('');
  const [filteredAssets, setFilteredAssets] = useState<AssestsItem[]>([]);
  const handleReceive = (key: string) => {
    console.log(`Received shipment with key: ${key}`);
  };

  const handleDeleteCard = (key: string) => {
    setItems(prevItems => prevItems.filter(item => item.key !== key));
  };
  const handleAssestDeleteCard = (key: string) => {
    setFilteredAssets(prevItems => prevItems.filter(item => item.key !== key));
  };

  const handleInputChange = (text: string) => {
    setInput(text);
  };
  const handleAddAssets = () => {
    if (input.trim() === '') {
      return;
    }

    const normalizedInput = input.toLowerCase();
    const filtered = assetItem.filter(
      item =>
        item.serialNo.toLowerCase().includes(normalizedInput) ||
        item.barcode.toLowerCase().includes(normalizedInput),
    );

    setFilteredAssets(prevResults => [
      ...prevResults,
      ...filtered.filter(
        item => !prevResults.some(addedItem => addedItem.key === item.key),
      ),
    ]);
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
        <Text>Option: {cardTitle}</Text>
        {key === 1 ? (
          <>
            {items.map(item => (
              <CustomCard
                key={item.key}
                title="Shipment Details"
                content={
                  <>
                    <View style={styles.shipmentView}>
                      <View style={styles.shipmentView}>
                        <Text variant="titleSmall">Shipment ID: </Text>
                        <Text>{item.shipId}</Text>
                      </View>
                      <View style={styles.shipmentView}>
                        <Text variant="titleSmall">Reference ID: </Text>
                        <Text>{item.refID}</Text>
                      </View>
                    </View>
                    <View style={styles.shipmentView}>
                      <View style={styles.shipmentView}>
                        <Text variant="titleSmall">Shipment Type: </Text>
                        <Text>{item.shipType}</Text>
                      </View>
                      <View style={styles.shipmentView}>
                        <Text variant="titleSmall"> Status: </Text>
                        <Text>{item.status}</Text>
                      </View>
                    </View>
                    <View style={styles.shipFormView}>
                      <Text variant="titleSmall">Ship From: </Text>
                      <Text>{item.shipForm}</Text>
                    </View>
                    <View style={styles.shipFormView}>
                      <Text variant="titleSmall">Created: </Text>
                      <Text style={styles.createdText}>{item.created}</Text>
                    </View>
                  </>
                }
                actions={
                  <View style={styles.shipFormView}>
                    <Button
                      mode="contained"
                      onPress={() => handleReceive(item.key)}>
                      Receive
                    </Button>
                    <Button
                      mode="outlined"
                      onPress={() => handleDeleteCard(item.key)}>
                      Cancel
                    </Button>
                  </View>
                }
              />
            ))}
          </>
        ) : (
          <>
            <View style={styles.container2}>
              <Text style={styles.label}>Serial#/Barcode:</Text>
              <TextInput
                style={styles.input}
                label="Serial#/Barcode"
                mode="outlined"
                value={input}
                onChangeText={handleInputChange}
              />
              <Button
                mode="contained"
                style={styles.button}
                labelStyle={styles.buttonLabel}
                onPress={handleAddAssets}>
                Add Assets
              </Button>
            </View>
            {filteredAssets.length > 0 ? (
              filteredAssets.map(item => (
                <CustomCard
                  key={item.key}
                  title="Shipment Details"
                  content={
                    <>
                      <View style={styles.shipmentView}>
                        <View style={styles.shipmentView}>
                          <Text variant="titleSmall">Action: </Text>
                          <TouchableOpacity
                            onPress={() => handleAssestDeleteCard(item.key)}>
                            <Text style={styles.deleteButton}>Delete</Text>
                          </TouchableOpacity>
                        </View>
                        <View style={styles.shipmentView}>
                          <Text variant="titleSmall">Serial: </Text>
                          <Text>{item.serialNo}</Text>
                        </View>
                      </View>
                      <View style={styles.shipmentView}>
                        <View style={styles.shipmentView}>
                          <Text variant="titleSmall">Alternate Serial: </Text>
                          <Text>{item.alternateSerialNo}</Text>
                        </View>
                        <View style={styles.shipmentView}>
                          <Text variant="titleSmall">Barcode: </Text>
                          <Text>{item.barcode}</Text>
                        </View>
                      </View>
                      <View style={styles.shipFormView}>
                        <Text variant="titleSmall">Asset: </Text>
                        <Text>{item.assestType}</Text>
                      </View>
                    </>
                  }
                  actions={
                    <View style={styles.shipFormView}>
                      <Button
                        mode="contained"
                        onPress={() => handleReceive(item.key)}>
                        Receive All
                      </Button>
                      <Button
                        mode="outlined"
                        onPress={() => handleDeleteCard(item.key)}>
                        Cancel All
                      </Button>
                    </View>
                  }
                />
              ))
            ) : (
              <Text>
                No assets found. Please enter a valid serial number or barcode.
              </Text>
            )}
          </>
        )}
      </Screen>
    </ScrollView>
  );
};

export default ReceivingByOptionScreen;

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  deleteButton:{
    color:"purple"
  },

  shipmentView: {
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  container2: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  shipFormView: {
    display: 'flex',
    flexDirection: 'row',
    gap: 4,
  },
  createdText: {
    marginLeft: 2,
    marginTop: 1,
  },
  label: {
    flex: 1,
    fontSize: 16,
    textAlign: 'left',
  },
  input: {
    flex: 2,
    marginHorizontal: 8,
  },
  button: {
    flex: 1,
    height: 40,
  },
  buttonLabel: {
    fontSize: 14,
  },
});

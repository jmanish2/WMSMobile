import React, {FC, useState, useEffect} from 'react';
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
    barcode: 'http://abce',
    assestType: 'cylindercal',
  },
  {
    key: '2',
    serialNo: 'SNOO4',
    alternateSerialNo: 'AS004',
    barcode: 'http://3333',
    assestType: 'cylindercal',
  },
  {
    key: '3',
    serialNo: 'SNOO5',
    alternateSerialNo: 'AS005',
    barcode: 'https://dscl.us/1ACCw3Fn2j',
    assestType: 'cylindercal',
  },
  {
    key: '4',
    serialNo: 'SNOO6',
    alternateSerialNo: 'AS006',
    barcode: 'https://dscl.us/1ACCpRJRy4',
    assestType: 'pneumatic',
  },
  {
    key: '5',
    serialNo: 'SNOO7',
    alternateSerialNo: 'AS007',
    barcode: 'https://dscl.us/1ACCwdh5ff',
    assestType: 'pneumatic',
  },
  {
    key: '6',
    serialNo: 'SNOO8',
    alternateSerialNo: 'AS008',
    barcode: 'https://dscl.us/1ACCpj9cg7',
    assestType: 'hydraulic',
  },
  {
    key: '7',
    serialNo: 'SNOO9',
    alternateSerialNo: 'AS009',
    barcode: 'http://abce',
    assestType: 'hydraulic',
  },
  {
    key: '8',
    serialNo: 'SNOO9',
    alternateSerialNo: 'AS009',
    barcode: 'http://00000',
    assestType: 'hydraulic',
  },
  {
    key: '9',
    serialNo: 'SNOO10',
    alternateSerialNo: 'AS0010',
    barcode: 'http://8989',
    assestType: 'hydraulic',
  },
  {
    key: '11',
    serialNo: 'SNOO11',
    alternateSerialNo: 'AS0011',
    barcode: 'http://2345',
    assestType: 'hydraulic',
  },
  {
    key: '12',
    serialNo: 'SNOO12',
    alternateSerialNo: 'AS0012',
    barcode: 'http://11111',
    assestType: 'hydraulic',
  },
  {
    key: '13',
    serialNo: 'SNOO13',
    alternateSerialNo: 'AS0013',
    barcode: 'http://67544',
    assestType: 'hydraulic',
  },
  {
    key: '14',
    serialNo: 'SNOO14',
    alternateSerialNo: 'AS0014',
    barcode: 'http://45435',
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
  const {cardTitle, key, barcodeData} = route.params as {
    cardTitle?: string;
    key?: number;
    barcodeData?: string[];
  };

  const [items, setItems] = useState<Item[]>(initialItems);
  const [assetItem] = useState<AssestsItem[]>(initialAssetsItem);
  const [input, setInput] = useState<string>('');
  const [filteredAssets, setFilteredAssets] = useState<AssestsItem[]>([]);

  useEffect(() => {
    if (barcodeData && barcodeData.length > 0) {
      const filtered = assetItem.filter(item =>
        barcodeData.includes(item.barcode),
      );
      setFilteredAssets(filtered);
    }
  }, [barcodeData, assetItem]);

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

  const handleScanner = () => {
    navigation.navigate('BarCodeScanner');
  };

  return (
    <ScrollView>
      <Screen>
        <View style={styles.container}>
          <Text variant="headlineLarge">Receiving</Text>
          <View style={{display: 'flex', flexDirection: 'row', gap: 10}}>
            <Button mode="contained" onPress={() => navigation.goBack()}>
              Back
            </Button>
            <Button mode="contained" onPress={handleScanner}>
              Scan
            </Button>
          </View>
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
                        <View style={[styles.shipmentView, {width: 150}]}>
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
                        Receive
                      </Button>
                      <Button
                        mode="outlined"
                        onPress={() => handleAssestDeleteCard(item.key)}>
                        Cancel
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
  deleteButton: {
    color: 'purple',
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
    marginHorizontal: 8,
  },
  buttonLabel: {
    fontSize: 14,
  },
});

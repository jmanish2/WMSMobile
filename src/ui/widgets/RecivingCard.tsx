import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Button, Card, Text} from 'react-native-paper';

interface RecivingCardProps {
  shipID: string;
  refID: string;
  shipFrom: string;
  status: string;
  shipType: string;
  created: string;
  handleReceive: () => {};
}

const RecivingCard: React.FC<RecivingCardProps> = ({
  shipID,
  refID,
  shipFrom,
  shipType,
  created,
  status,
  handleReceive,
}) => {
  return (
    <View style={styles.container}>
      <Card>
        <Card.Title title="Shipment Details" titleVariant="titleMedium" />
        <Card.Content>
          <View style={styles.shipmentView}>
            <View style={styles.shipmentView}>
              <Text variant="titleSmall">Shipment ID: </Text>
              <Text>{shipID}</Text>
            </View>
            <View style={styles.shipmentView}>
              <Text variant="titleSmall">Reference ID: </Text>
              <Text>{refID}</Text>
            </View>
          </View>
          <View style={styles.shipmentView}>
            <View style={styles.shipmentView}>
              <Text variant="titleSmall">Shipment Type: </Text>
              <Text>{shipType}</Text>
            </View>
            <View style={styles.shipmentView}>
              <Text variant="titleSmall"> Status: </Text>
              <Text>{status}</Text>
            </View>
          </View>
          <View
            style={styles.shipFormView}>
            <Text variant="titleSmall">Ship From :</Text>
            <Text>{shipFrom}</Text>
          </View>
          <View
            style={styles.shipFormView}>
            <Text variant="titleSmall">Created :</Text>
            <Text style={styles.createdText}>{created}</Text>
          </View>
        </Card.Content>

        <Card.Actions>
          <Button onPress={handleReceive}>Receive</Button>
          <Button>Cancel</Button>
        </Card.Actions>
      </Card>
    </View>
  );
};

export default RecivingCard;

const styles = StyleSheet.create({
  container: {
    marginTop: 4,
    margin: 2,
  },
  shipmentView: {
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  shipFormView:{
    display: 'flex',
    flexDirection: 'row',
  },
  createdText:{
    marginLeft: 2, marginTop: 1
  }
});

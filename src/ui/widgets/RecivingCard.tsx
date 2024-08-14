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
}

const RecivingCard: React.FC<RecivingCardProps> = ({
  shipID,
  refID,
  shipFrom,
  shipType,
  created,
  status,
}) => {
  return (
    <View style={styles.container}>
      <Card>
        <Card.Title title="Shipment Details" titleVariant="titleMedium" />
        <Card.Content>
          <View
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              flexDirection: 'row',
            }}>
            <Text variant="titleSmall">Shipment ID: </Text>
            <Text>{shipID}</Text>
            <Text variant="titleSmall">Reference ID: </Text>
            <Text>{refID}</Text>
          </View>
          <View
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              flexDirection: 'row',
            }}>
            <Text variant="titleSmall">Shipment Type: </Text>
            <Text>{shipType}</Text>
            <Text variant="titleSmall"> Status: </Text>
            <Text>{status}</Text>
          </View>
          <View
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              flexDirection: 'row',
            }}>
            <Text variant="titleSmall">Ship From :</Text>
            <Text>{shipFrom}</Text>
          </View>
          <View
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              flexDirection: 'row',
            }}>
            <Text variant="titleSmall">Created :</Text>
            <Text>{created}</Text>
          </View>
        </Card.Content>

        <Card.Actions>
          <Button>Receive</Button>
          <Button>Cancel</Button>
        </Card.Actions>
      </Card>
    </View>
  );
};

export default RecivingCard;

const styles = StyleSheet.create({
  container: {
    marginTop: 8,
  },
});

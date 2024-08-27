import {Alert, StyleSheet, TouchableOpacity, View} from 'react-native';
import React, {FC, useEffect} from 'react';
import Screen from '../../../ui/components/Screen';
import {Button, Card, Switch, Text} from 'react-native-paper';
import {
  AuthenticatedStackNavigatorParamList,
  AuthenticatedStackNavigatorScreenProps,
} from '../../../types/navigation';
import {useNavigation} from '@react-navigation/native';
import {useIsConnected} from 'react-native-offline';
interface ReceivingScreenProps
  extends AuthenticatedStackNavigatorScreenProps<'Receiving'> {}

const ReceivingScreen: FC<ReceivingScreenProps> = () => {
  const navigation = useNavigation();

  const [isSwitchOn, setIsSwitchOn] = React.useState(false);
  const isOffline = useIsConnected();
  const isSimulatedOffline = !isSwitchOn;

  const cardData = [
    {key: 1, title: 'By Shipment', screenName: 'ReceivingByOptionScreen'},
    {key: 2, title: 'By Assets', screenName: 'ReceivingByOptionScreen'},
  ];
  useEffect(() => {
    if (!isOffline) {
      if (!isSimulatedOffline) {
        setIsSwitchOn(true);
      }
    }
  }, [isOffline, isSimulatedOffline]);

  const onToggleSwitch = () => {
    setIsSwitchOn(prevState => !prevState);
  };

  return (
    <Screen>
      {!(isSimulatedOffline && isOffline) && (
        <View style={styles.cardContainer}>
          <Card>
            <Card.Content style={styles.cardContent}>
              <Text style={{color: 'red'}}>You are Offline</Text>
            </Card.Content>
          </Card>
        </View>
      )}
      <View style={styles.container}>
        <Text variant="headlineLarge">Receiving</Text>
        <Button mode="contained" onPress={() => navigation.goBack()}>
          Back
        </Button>
      </View>
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'flex-end',
        }}>
        <Text>{isSimulatedOffline && isOffline ? 'Online' : 'Offline'}</Text>
        <Switch value={!isSimulatedOffline} onValueChange={onToggleSwitch} />
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

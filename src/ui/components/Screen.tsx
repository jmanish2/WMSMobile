import React, {FC, PropsWithChildren} from 'react';
import {SafeAreaView, StyleSheet, View} from 'react-native';
import {Appbar} from 'react-native-paper';

type ScreenProps = PropsWithChildren;

const Screen: FC<ScreenProps> = ({children}) => {
  return (
    <SafeAreaView>
      <Appbar.Header>
        <Appbar.Content title="Asset Tracker" />
      </Appbar.Header>
      <View style={styles.screen}>{children}</View>
    </SafeAreaView>
  );
};

export default Screen;

const styles = StyleSheet.create({
  screen: {padding: 12, gap: 12},
});

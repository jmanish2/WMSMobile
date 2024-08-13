import React, {FC, PropsWithChildren} from 'react';
import {SafeAreaView, StyleSheet, View} from 'react-native';

type ScreenProps = PropsWithChildren;

const Screen: FC<ScreenProps> = ({children}) => {
  return (
    <SafeAreaView>
      <View style={styles.screen}>{children}</View>
    </SafeAreaView>
  );
};

export default Screen;

const styles = StyleSheet.create({
  screen: {padding: 12, gap: 12, flex: 1},
});

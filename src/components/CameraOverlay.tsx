import React, {PropsWithChildren} from 'react';
import {Dimensions, StyleSheet, View} from 'react-native';
import colors from '../theme/colors';

const CameraOverlay = ({children}: PropsWithChildren) => {
  const {width, height} = Dimensions.get('window');
  const focusSize = 240;

  return (
    <View style={styles.container}>
      {children}
      {/* Top overlay */}
      <View style={[styles.overlay, {height: (height - focusSize) / 2}]} />

      <View style={styles.middleContainer}>
        {/* Left overlay */}
        <View style={[styles.overlay, {width: (width - focusSize) / 2}]} />
        {/* Focused area */}
        <View style={styles.focusArea} />
        {/* Right overlay */}
        <View style={[styles.overlay, {width: (width - focusSize) / 2}]} />
      </View>

      {/* Bottom overlay */}
      <View style={[styles.overlay, {height: (height - focusSize) / 2}]} />
    </View>
  );
};

export default CameraOverlay;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.transparent,
  },
  overlay: {
    backgroundColor: colors.semiTransparent,
  },
  middleContainer: {
    flexDirection: 'row',
    height: 240,
  },
  focusArea: {
    width: 240,
    height: 240,
    backgroundColor: colors.transparent,
  },
});

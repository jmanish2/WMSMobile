import React, {FC} from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
} from 'react-native';
import colors from '../theme/colors';

type ButtonProps = TouchableOpacityProps & {
  title: string;
  onPress: () => void;
};

const Button: FC<ButtonProps> = ({
  title,
  onPress,
  ...touchableOpacityProps
}) => {
  return (
    <TouchableOpacity
      style={styles.button}
      onPress={onPress}
      {...touchableOpacityProps}>
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
};

export default Button;

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.primary,
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: 'bold',
  },
});

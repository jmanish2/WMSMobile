import React, {FC} from 'react';
import {StyleSheet, TextInput, View, Text, TextInputProps} from 'react-native';
import colors from '../theme/colors';

type InputProps = TextInputProps & {
  label?: string;
};

const Input: FC<InputProps> = ({label, style, ...textInputProps}) => {
  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}
      <TextInput
        style={[styles.input, style]}
        placeholderTextColor={colors.semiTransparent}
        {...textInputProps}
      />
    </View>
  );
};

export default Input;

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  label: {
    marginBottom: 8,
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.primary,
  },
  input: {
    height: 48,
    borderColor: colors.primary,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 16,
    fontSize: 16,
    color: colors.primary,
  },
});

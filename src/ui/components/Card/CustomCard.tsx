import React from 'react';
import { StyleSheet, View, ViewStyle, TextStyle } from 'react-native';
import { Card, Button, Text } from 'react-native-paper';

interface CustomCardProps {
  title: string;
  content: React.ReactNode;
  actions?: React.ReactNode;
  titleStyle?: TextStyle;
  contentStyle?: ViewStyle;
  cardStyle?: ViewStyle;
}

const CustomCard: React.FC<CustomCardProps> = ({
  title,
  content,
  actions,
  titleStyle,
  contentStyle,
  cardStyle,
}) => {
  return (
    <View style={[styles.container, cardStyle]}>
      <Card>
        <Card.Title title={title} titleVariant="titleMedium" style={titleStyle} />
        <Card.Content style={contentStyle}>
          {content}
        </Card.Content>
        {actions && <Card.Actions>{actions}</Card.Actions>}
      </Card>
    </View>
  );
};

export default CustomCard;

const styles = StyleSheet.create({
  container: {
    margin: 4,
  },
});

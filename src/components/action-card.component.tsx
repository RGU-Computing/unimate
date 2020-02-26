import React from 'react';
import { StyleSheet } from 'react-native';
import { ImageOverlay } from './image-overlay.component';
import {
  Card,
  CardElement,
  CardProps,
  StyleService,
  Text,
  useStyleSheet,
} from '@ui-kitten/components';
import { Action } from '../models/action';

export interface ActionCardProps extends Omit<CardProps, 'children'> {
  greeting: string;
  action: Action;
}

export const ActionCard = (props: ActionCardProps): CardElement => {

  const styles = useStyleSheet(ActionCardStyles);

  const {style, greeting, action, ...cardProps} = props;

  return (
    <Card
      {...cardProps}
      style={[styles.container, style]}>
      <ImageOverlay
        style={styles.image}
        source={action.image}>
          <Text
            style={styles.greeting}
            category='s1'
            status='control'>
            {greeting}
          </Text>
          <Text
            style={styles.title}
            category='h2'
            status='control'>
            {action.title}
          </Text>
          <Text
            style={styles.date}
            category='s1'
            status='control'>
            {action.date}
          </Text>
        </ImageOverlay>
      </Card>
  );
};

const ActionCardStyles = StyleService.create({
  container: {
      height: 200,
  },
  image: {
      ...StyleSheet.absoluteFillObject,
      height: 200,
      paddingVertical: 24,
      paddingHorizontal: 16,
  },
  greeting: {
      zIndex: 1,
      fontSize: 16,
      marginBottom: 4
  },
  title: {
      zIndex: 1,
  },
  date: {
      position: 'absolute',
      left: 16,
      bottom: 16,
      borderRadius: 16,
      paddingHorizontal: 0,
  },
});

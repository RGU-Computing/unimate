import React from 'react';
import { StyleSheet, View } from 'react-native';
import { ImageOverlay } from './image-overlay.component';
import {
  Card,
  CardElement,
  CardProps,
  StyleService,
  Text,
  useStyleSheet,
  Button,
} from '@ui-kitten/components';
import { Action } from '../models/action';
import { HeartIcon } from './icons';

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
          <View style={styles.itemFooter}>
            <Button
              style={styles.iconButton}
              appearance='ghost'
              status='control'
              icon={HeartIcon}>
              {'16'}
            </Button>
          </View>
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
    right: 16,
    bottom: 20,      
    paddingHorizontal: 0,
    //fontWeight: 'bold'
  },
  itemFooter: {
    position: 'absolute',
    flexDirection: 'row',
    left: 8,
    bottom: 8,
  },
  iconButton: {
    paddingHorizontal: 0,
  },
});
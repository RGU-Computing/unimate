import React, {useEffect} from 'react';
import {StyleSheet, View, ActivityIndicator} from 'react-native';
import {
  Card,
  CardElement,
  CardProps,
  StyleService,
  Text,
  useStyleSheet,
  Button,
  IconElement,
  Divider,
} from '@ui-kitten/components';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faThumbsUp, faHeart} from '@fortawesome/free-solid-svg-icons';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {ImageOverlay} from './image-overlay.component';
import {Action} from '../models/action';
import {AppStorage} from '../services/app-storage.service';
import {FirebaseService} from '../services/firebase.service';
import {ACTION_CARDS} from '../services/types';
import {UtilService} from '../services/util.service';

export interface ActionCardProps extends Omit<CardProps, 'children'> {
  data: any;
}

const LikeIcon = (): IconElement => (
  <FontAwesomeIcon icon={faThumbsUp} color={'white'} />
);

const HeartIcon = (): IconElement => (
  <FontAwesomeIcon icon={faHeart} color={'white'} />
);

const LikeIconCicked = (): IconElement => (
  <FontAwesomeIcon icon={faThumbsUp} color={'#712177'} />
);

const HeartIconClicked = (): IconElement => (
  <FontAwesomeIcon icon={faHeart} color={'#712177'} />
);

export const ActionCard = (props: ActionCardProps): CardElement => {
  const styles = useStyleSheet(ActionCardStyles);

  const [isLiked, setLiked] = React.useState<boolean>(false);

  const [isHearted, setHearted] = React.useState<boolean>(false);

  const [reaction, setReaction] = React.useState<Object>();

  const [likes, setLikes] = React.useState<number>(0);

  const [hearts, setHearts] = React.useState<number>(0);

  const {style, data, ...cardProps} = props;

  let ACTION = data;

  if (data && data !== 'empty')
    ACTION = new Action(
      data.id,
      UtilService.getDateFromDatabaseDateFormat(data.data().date),
      data.data().text,
    );

  useEffect(() => {
    if (data && data !== 'empty') {
      console.log('in');
      const subscriber = FirebaseService.subscribeForActionCardReacts(
        ACTION.id,
        onSuccess,
      );
      return async () => await subscriber();
    }
  }, [data]);

  const onSuccess = documentSnapshot => {
    console.log('action');
    const {uid} = AppStorage.getUser();
    let likes = 0;
    let hearts = 0;
    let react;
    setReaction(undefined);

    if (documentSnapshot.data().reacts) {
      documentSnapshot.data().reacts.forEach(reaction => {
        if (reaction.user === uid) {
          react = reaction;
          setReaction(reaction);
        }
        if (reaction.type === ACTION_CARDS.REACTS.LIKE) {
          likes++;
        } else if (reaction.type === ACTION_CARDS.REACTS.HEART) {
          hearts++;
        }
      });
    }

    if (react) {
      setLiked(react.type === ACTION_CARDS.REACTS.LIKE);
      setHearted(react.type === ACTION_CARDS.REACTS.HEART);
    } else {
      setLiked(false);
      setHearted(false);
    }

    setLikes(likes);
    setHearts(hearts);
  };

  const onLike = () => {
    if (_alreadyReacted()) {
      if (isLiked) {
        FirebaseService.removeActionCardReaction(ACTION.id, reaction);
      } else if (isHearted) {
        FirebaseService.updateActionCardReaction(
          ACTION.id,
          reaction,
          ACTION_CARDS.REACTS.LIKE,
        );
      }
    } else {
      FirebaseService.addActionCardReaction(
        ACTION.id,
        ACTION_CARDS.REACTS.LIKE,
      );
    }
  };

  const onHeart = () => {
    if (_alreadyReacted()) {
      if (isHearted) {
        FirebaseService.removeActionCardReaction(ACTION.id, reaction);
      } else if (isLiked) {
        FirebaseService.updateActionCardReaction(
          ACTION.id,
          reaction,
          ACTION_CARDS.REACTS.HEART,
        );
      }
    } else {
      FirebaseService.addActionCardReaction(
        ACTION.id,
        ACTION_CARDS.REACTS.HEART,
      );
    }
  };

  const _alreadyReacted = () => {
    return isLiked || isHearted;
  };

  if (!data) {
    return (
      <ActivityIndicator
        size="large"
        color="#712177"
        style={{marginVertical: 20}}
      />
    );
  }

  if (data === 'empty') {
    return (
      <Text style={{textAlign: 'center', marginTop: 40}}>
        No Action Cards found for today! 😕
      </Text>
    );
  }

  return (
    <Card {...cardProps} style={[styles.container, style]}>
      <ImageOverlay style={styles.image} source={ACTION.image}>
        <Text style={styles.greeting} category="s1" status="control">
          Tip of the day:
        </Text>
        <Text style={styles.date} category="s1" status="control">
          {ACTION.date}
        </Text>
        <Text style={styles.title} category="h4" status="control">
          {ACTION.title}
        </Text>
        <View style={styles.itemFooter}>
          <TouchableOpacity
            style={[styles.mr, isLiked ? styles.activeLike : styles.inactive]}
            onPress={onLike}>
            <Button
              style={styles.iconButton}
              appearance="ghost"
              status="control"
              textStyle={isLiked ? styles.activeLikeText : null}
              icon={isLiked ? LikeIconCicked : LikeIcon}>
              {likes.toString()}
            </Button>
          </TouchableOpacity>
          <TouchableOpacity
            style={isHearted ? styles.activeHeart : styles.inactive}
            onPress={onHeart}>
            <Button
              style={styles.iconButton}
              appearance="ghost"
              status="control"
              textStyle={isHearted ? styles.activeHeartText : null}
              icon={isHearted ? HeartIconClicked : HeartIcon}>
              {hearts.toString()}
            </Button>
          </TouchableOpacity>
        </View>
      </ImageOverlay>
    </Card>
  );
};

const ActionCardStyles = StyleService.create({
  container: {
    height: 180,
  },
  image: {
    ...StyleSheet.absoluteFillObject,
    height: 180,
    paddingVertical: 24,
    paddingHorizontal: 16,
    zIndex: -1,
  },
  greeting: {
    fontSize: 16,
    marginBottom: 8,
  },
  title: {
    marginBottom: 8,
  },
  date: {
    position: 'absolute',
    right: 16,
    bottom: 22,
    paddingHorizontal: 0,
    //fontWeight: 'bold'
  },
  itemFooter: {
    position: 'absolute',
    flexDirection: 'row',
    left: 8,
    bottom: 12,
  },
  iconButton: {
    paddingHorizontal: 0,
  },
  activeHeart: {
    borderRadius: 10,
  },
  activeLike: {
    borderRadius: 10,
  },
  activeHeartText: {
    color: '#712177',
  },
  activeLikeText: {
    color: '#712177',
  },
  inactive: {},
  mr: {
    marginRight: 4,
  },
});

import React from 'react';
import {
  ImageBackground,
  ListRenderItemInfo,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import { Button, List, Text } from '@ui-kitten/components';
import { ImageOverlay } from './image-overlay.component';
import { HeartIcon, MessageCircleIcon } from './icons';
import { Article } from '../models/article';
import { WebBrowserService } from '../services/web-browser.service';

const data: Article[] = [
  Article.one(),
  Article.one(),
  Article.two(),
  Article.three(),
  Article.four(),
];

const [headingArticle, ...listArticles] = data;

export default ({ navigation }): React.ReactElement => {

  const isItemReverse = (index: number): boolean => {
    return index % 2 === 1;
  };

  const onItemPress = (index: number): void => {
    //navigation && navigation.navigate('Article3');
    WebBrowserService.openBrowserAsync('https://www.actionforhappiness.org/');
  };

  const renderHeadingItem = (): React.ReactElement => (
    <ImageOverlay
      style={styles.headingArticleContainer}
      source={headingArticle.image}>
      <Text
        style={styles.headingArticleTitle}
        status='control'
        category='h3'>
        {headingArticle.title}
      </Text>
      <Text
        style={styles.headingArticleDescription}
        category='h6'
        status='control'>
        {headingArticle.description}
      </Text>
      <Button
        style={styles.readButton}
        status='control'
        onPress={() => onItemPress(0)}>
        READ
      </Button>
    </ImageOverlay>
  );

  const renderArticleItem = (info: ListRenderItemInfo<Article>): React.ReactElement => (
    <TouchableOpacity
      style={[styles.item, isItemReverse(info.index) && styles.itemReverse]}
      activeOpacity={0.95}
      //onPress={() => onItemPress(info.index + 1)}>
      onPress={() => WebBrowserService.openBrowserAsync(info.item.website)}>
      <ImageBackground
        style={styles.itemSection}
        source={info.item.image}
      />
      <View style={styles.itemSection}>
        <Text
          style={styles.itemTitle}
          category='h6'>
          {info.item.title}
        </Text>
        <View style={styles.footer}>
          {/*<Button
            style={styles.iconButton}
            appearance='ghost'
            status='basic'
            icon={MessageCircleIcon}>
            {`${info.item.comments.length}`}
          </Button>
          <Button
            style={styles.iconButton}
            appearance='ghost'
            status='danger'
            icon={HeartIcon}>
            {`${info.item.likes.length}`}
          </Button>*/}
            <Button
                style={styles.readButtonFull}
                onPress={() => WebBrowserService.openBrowserAsync(info.item.website)}>
                Read More
            </Button>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <List
      style={styles.list}
      data={listArticles}
      renderItem={renderArticleItem}
      //ListHeaderComponent={renderHeadingItem}
    />
  );
};

const styles = StyleSheet.create({
  list: {
    flex: 1,
  },
  readButton: {
    width: '50%',
    marginTop: 32,
  },
  readButtonFull: {
    width: '100%',
    marginTop: 32,
  },
  headingArticleContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 320,
  },
  headingArticleTitle: {
    zIndex: 1,
    textAlign: 'center',
  },
  headingArticleDescription: {
    zIndex: 1,
  },
  item: {
    flexDirection: 'row',
    minHeight: 188,
  },
  itemReverse: {
    flexDirection: 'row-reverse',
  },
  itemSection: {
    flex: 1,
    padding: 16,
  },
  footer: {
    flexDirection: 'row',
    //justifyContent: 'center',
    //marginTop: 24,
    //marginHorizontal: -8,
  },
  itemTitle: {
    flex: 1,
  },
  iconButton: {
    paddingHorizontal: 0,
  },
});

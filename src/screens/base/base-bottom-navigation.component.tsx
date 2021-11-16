import React from 'react';
import {BottomNavigationTab, Divider} from '@ui-kitten/components';
import {SafeAreaLayout} from '../../components/safe-area-layout.component';
import {BrandBottomNavigation} from '../../components/brand-bottom-navigation.component';
import {
  TraxivityIcon,
  BellIcon,
  HealthIcon,
  HomeIcon,
  EmotivityIcon,
  SaythanxIcon,
} from '../../components/icons';

export const BaseBottomNavigation = (props): React.ReactElement => {
  const onSelect = (index: number): void => {
    props.navigation.navigate(props.state.routeNames[index]);
  };

  return (
    <SafeAreaLayout insets="bottom">
      <Divider />
      <BrandBottomNavigation
        appearance="noIndicator"
        selectedIndex={props.state.index}
        onSelect={onSelect}>
        <BottomNavigationTab
          // title='Home'
          icon={HomeIcon}
        />
        <BottomNavigationTab
          // title='Emotivity'
          icon={EmotivityIcon}
        />
        <BottomNavigationTab
          // title='SayThanx'
          icon={SaythanxIcon}
        />
        <BottomNavigationTab
          // title='Traxivity'
          icon={TraxivityIcon}
        />
        <BottomNavigationTab
          // title='Notifications'
          icon={BellIcon}
        />
        <BottomNavigationTab
          // title='Info'
          icon={HealthIcon}
        />
      </BrandBottomNavigation>
    </SafeAreaLayout>
  );
};

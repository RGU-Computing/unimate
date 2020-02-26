import React from 'react';
import { BottomNavigationTab, Divider } from '@ui-kitten/components';
import { SafeAreaLayout } from '../../components/safe-area-layout.component';
import { BrandBottomNavigation } from '../../components/brand-bottom-navigation.component';
import { BarChartIcon, BellIcon, EyeIcon, HealthIcon, HomeIcon } from '../../components/icons';

export const BaseBottomNavigation = (props): React.ReactElement => {

  const onSelect = (index: number): void => {
    props.navigation.navigate(props.state.routeNames[index]);
  };

  return (
    <SafeAreaLayout insets='bottom'>
      <Divider/>
      <BrandBottomNavigation
        appearance='noIndicator'
        selectedIndex={props.state.index}
        onSelect={onSelect}>
        <BottomNavigationTab
          title='Home'
          icon={HomeIcon}
        />
        <BottomNavigationTab
          title='Traxivity'
          icon={BarChartIcon}
        />
        <BottomNavigationTab
          title='Emotivity'
          icon={EyeIcon}
        />
        <BottomNavigationTab
          title='Notifications'
          icon={BellIcon}
        />
        <BottomNavigationTab
          title='Health'
          icon={HealthIcon}
        />
      </BrandBottomNavigation>
    </SafeAreaLayout>
  );
};

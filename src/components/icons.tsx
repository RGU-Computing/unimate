import {
  faBell,
  faFirstAid,
  faGlobeAmericas,
  faHandHoldingHeart,
  faHome,
  faNewspaper,
  faSmile,
  faTrophy,
  faWalking,
} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {Avatar, Icon, IconElement, useTheme} from '@ui-kitten/components';
import React from 'react';
import {ImageStyle} from 'react-native';

export const EmotivityAvatar = props => (
  <Avatar
    {...props}
    style={[props.style, {tintColor: null}]}
    source={require('../assets/images/emotivity.png')}
  />
);

export const TraxivityAvatar = props => (
  <Avatar
    {...props}
    style={[props.style, {tintColor: null}]}
    source={require('../assets/images/traxivity.png')}
  />
);

export const ThanxAvatar = props => (
  <Avatar
    {...props}
    style={[props.style, {tintColor: null}]}
    source={require('../assets/images/thanks.jpg')}
  />
);

export const GratitudeAvatar = props => (
  <Avatar
    {...props}
    style={[props.style, {tintColor: null}]}
    source={require('../assets/images/gratitude.jpg')}
  />
);

export const ArrowHeadUpIcon = (style: ImageStyle): IconElement => (
  <Icon {...style} fill={'#712177'} name="arrowhead-up" />
);

export const ArrowHeadDownIcon = (style: ImageStyle): IconElement => (
  <Icon {...style} fill={'#712177'} name="arrowhead-down" />
);

export const ArrowIosBackIcon = (style: ImageStyle): IconElement => (
  <Icon
    {...style}
    fill={'#FFFFFF'}
    name="arrow-ios-back"
    width={24}
    height={24}
  />
);

export const ArrowIosForwardIcon = (style: ImageStyle): IconElement => (
  <Icon {...style} name="arrow-ios-forward" width={24} height={24} />
);

export const CheckIcon = (style: ImageStyle): IconElement => (
  <Icon
    {...style}
    name="checkmark-outline"
    fill={'rgba(255, 255, 255, .9)'}
    width={24}
    height={24}
  />
);

export const TraxivityIcon = (style: ImageStyle): IconElement => (
  <FontAwesomeIcon
    size={24}
    color={style.tintColor}
    icon={faWalking}
    style={{marginVertical: 2}}
  />
);

export const BellIcon = (style: ImageStyle): IconElement => (
  <FontAwesomeIcon
    size={24}
    color={style.tintColor}
    icon={faBell}
    style={{marginVertical: 2}}
  />
);

export const BookIcon = (style: ImageStyle): IconElement => (
  <Icon {...style} name="book" />
);

export const BookmarkIcon = (style: ImageStyle): IconElement => (
  <Icon {...style} name="bookmark" />
);

export const BookmarkOutlineIcon = (style: ImageStyle): IconElement => (
  <Icon {...style} name="bookmark-outline" />
);

export const ColorPaletteIcon = (style: ImageStyle): IconElement => (
  <Icon {...style} name="color-palette-outline" />
);

export const PrivacyLockIcon = (style: ImageStyle): IconElement => (
  <Icon {...style} name="lock" />
);

export const AddToDoIcon = (style: ImageStyle): IconElement => (
  <Icon {...style} name="plus-circle" />
);

export const CloseIcon = (style: ImageStyle): IconElement => (
  <Icon {...style} name="close" />
);

export const EmotivityIcon = (style: ImageStyle): IconElement => (
  <FontAwesomeIcon
    size={24}
    color={style.tintColor}
    icon={faSmile}
    style={{marginVertical: 2}}
  />
);

export const SaythanxIcon = (style: ImageStyle): IconElement => (
  <FontAwesomeIcon
    size={24}
    color={style.tintColor}
    icon={faHandHoldingHeart}
    style={{marginVertical: 2}}
  />
);

export const DoneAllIcon = (style: ImageStyle): IconElement => {
  const theme = useTheme();
  return (
    <Icon
      {...style}
      width={16}
      height={16}
      fill={theme['color-primary-default']}
      name="done-all"
    />
  );
};

export const InfoIcon = (style: ImageStyle): IconElement => (
  <FontAwesomeIcon color={'#FFFFFF'} icon={faFirstAid} size={24} />
);

export const MailIcon = (style: ImageStyle): IconElement => {
  const theme = useTheme();
  return (
    <Icon
      {...style}
      width={16}
      height={16}
      fill={theme['color-danger-500']}
      name="alert-circle"
    />
  );
};

export const MessageCircleIcon = (style: ImageStyle): IconElement => (
  <Icon {...style} name="message-circle-outline" />
);

export const GithubIcon = (style: ImageStyle): IconElement => (
  <Icon {...style} name="github" />
);

export const GridIcon = (style: ImageStyle): IconElement => (
  <Icon {...style} name="grid-outline" />
);

export const HealthIcon = (style: ImageStyle): IconElement => (
  <FontAwesomeIcon
    size={24}
    color={style.tintColor}
    icon={faNewspaper}
    style={{marginVertical: 2}}
  />
);

export const GoalIcon = (style: ImageStyle): IconElement => (
  <FontAwesomeIcon
    size={22}
    color={'#FFFFFF'}
    icon={faTrophy}
    style={{marginVertical: 2}}
  />
);

export const GlobeIcon = (style: ImageStyle): IconElement => (
  <FontAwesomeIcon
    size={20}
    color={style.tintColor}
    icon={faGlobeAmericas}
    style={{marginVertical: 2}}
  />
);

export const HeartIcon = (style: ImageStyle): IconElement => (
  <Icon {...style} name="heart" />
);

export const HomeIcon = (style: ImageStyle): IconElement => (
  <FontAwesomeIcon
    size={24}
    color={style.tintColor}
    icon={faHome}
    style={{marginVertical: 2}}
  />
);

export const LayoutIcon = (style: ImageStyle): IconElement => (
  <Icon {...style} name="layout-outline" />
);

export const ListIcon = (style: ImageStyle): IconElement => (
  <Icon {...style} name="list" />
);

export const MenuIcon = (style: ImageStyle): IconElement => (
  <Icon {...style} fill={'#FFFFFF'} name="menu" />
);

export const MoreVerticalIcon = (style: ImageStyle): IconElement => (
  <Icon {...style} name="more-vertical" />
);

export const PaperPlaneIcon = (style: ImageStyle): IconElement => (
  <Icon {...style} name="paper-plane" />
);

export const AboutIcon = (style: ImageStyle): IconElement => (
  <Icon {...style} name="award-outline" />
);

export const SearchIcon = (style: ImageStyle): IconElement => (
  <Icon {...style} name="search" />
);

export const SettingsIcon = (style: ImageStyle): IconElement => (
  <Icon {...style} name="settings-2" />
);

export const StarIcon = (style: ImageStyle): IconElement => (
  <Icon {...style} name="star" />
);

export const StarOutlineIcon = (style: ImageStyle): IconElement => (
  <Icon {...style} name="star-outline" />
);

export const TrashIcon = (style: ImageStyle): IconElement => (
  <Icon {...style} name="trash" />
);

export const AssetAuthIcon = (style: ImageStyle): IconElement => (
  <Icon {...style} pack="app" name="auth" />
);

export const AssetAuthDarkIcon = (style: ImageStyle): IconElement => (
  <Icon {...style} pack="app" name="auth-dark" />
);

export const AssetSocialIcon = (style: ImageStyle): IconElement => (
  <Icon {...style} pack="app" name="social" />
);

export const AssetSocialDarkIcon = (style: ImageStyle): IconElement => (
  <Icon {...style} pack="app" name="social-dark" />
);

export const AssetArticlesIcon = (style: ImageStyle): IconElement => (
  <Icon {...style} pack="app" name="articles" />
);

export const AssetArticlesDarkIcon = (style: ImageStyle): IconElement => (
  <Icon {...style} pack="app" name="articles-dark" />
);

export const AssetMessagingIcon = (style: ImageStyle): IconElement => (
  <Icon {...style} pack="app" name="messaging" />
);

export const AssetMessagingDarkIcon = (style: ImageStyle): IconElement => (
  <Icon {...style} pack="app" name="messaging-dark" />
);

export const AssetDashboardsIcon = (style: ImageStyle): IconElement => (
  <Icon {...style} pack="app" name="dashboards" />
);

export const AssetDashboardsDarkIcon = (style: ImageStyle): IconElement => (
  <Icon {...style} pack="app" name="dashboards-dark" />
);

export const AssetEcommerceIcon = (style: ImageStyle): IconElement => (
  <Icon {...style} pack="app" name="ecommerce" />
);

export const AssetEcommerceDarkIcon = (style: ImageStyle): IconElement => (
  <Icon {...style} pack="app" name="ecommerce-dark" />
);

export const AssetAutocompleteIcon = (style: ImageStyle): IconElement => (
  <Icon {...style} pack="app" name="autocomplete" />
);

export const AssetAutocompleteDarkIcon = (style: ImageStyle): IconElement => (
  <Icon {...style} pack="app" name="autocomplete-dark" />
);

export const AssetAvatarIcon = (style: ImageStyle): IconElement => (
  <Icon {...style} pack="app" name="avatar" />
);

export const AssetAvatarDarkIcon = (style: ImageStyle): IconElement => (
  <Icon {...style} pack="app" name="avatar-dark" />
);

export const AssetBottomNavigationIcon = (style: ImageStyle): IconElement => (
  <Icon {...style} pack="app" name="bottom-navigation" />
);

export const AssetBottomNavigationDarkIcon = (
  style: ImageStyle,
): IconElement => <Icon {...style} pack="app" name="bottom-navigation-dark" />;

export const AssetButtonIcon = (style: ImageStyle): IconElement => (
  <Icon {...style} pack="app" name="button" />
);

export const AssetButtonDarkIcon = (style: ImageStyle): IconElement => (
  <Icon {...style} pack="app" name="button-dark" />
);

export const AssetButtonGroupIcon = (style: ImageStyle): IconElement => (
  <Icon {...style} pack="app" name="button-group" />
);

export const AssetButtonGroupDarkIcon = (style: ImageStyle): IconElement => (
  <Icon {...style} pack="app" name="button-group-dark" />
);

export const AssetCalendarIcon = (style: ImageStyle): IconElement => (
  <Icon {...style} pack="app" name="calendar" />
);

export const AssetCalendarDarkIcon = (style: ImageStyle): IconElement => (
  <Icon {...style} pack="app" name="calendar-dark" />
);

export const AssetCardIcon = (style: ImageStyle): IconElement => (
  <Icon {...style} pack="app" name="card" />
);

export const AssetCardDarkIcon = (style: ImageStyle): IconElement => (
  <Icon {...style} pack="app" name="card-dark" />
);

export const AssetCheckBoxIcon = (style: ImageStyle): IconElement => (
  <Icon {...style} pack="app" name="check-box" />
);

export const AssetCheckBoxDarkIcon = (style: ImageStyle): IconElement => (
  <Icon {...style} pack="app" name="check-box-dark" />
);

export const AssetDatepickerIcon = (style: ImageStyle): IconElement => (
  <Icon {...style} pack="app" name="datepicker" />
);

export const AssetDatepickerDarkIcon = (style: ImageStyle): IconElement => (
  <Icon {...style} pack="app" name="datepicker-dark" />
);

export const AssetDrawerIcon = (style: ImageStyle): IconElement => (
  <Icon {...style} pack="app" name="drawer" />
);

export const AssetDrawerDarkIcon = (style: ImageStyle): IconElement => (
  <Icon {...style} pack="app" name="drawer-dark" />
);

export const AssetIconIcon = (style: ImageStyle): IconElement => (
  <Icon {...style} pack="app" name="icon" />
);

export const AssetIconDarkIcon = (style: ImageStyle): IconElement => (
  <Icon {...style} pack="app" name="icon-dark" />
);

export const AssetInputIcon = (style: ImageStyle): IconElement => (
  <Icon {...style} pack="app" name="input" />
);

export const AssetInputDarkIcon = (style: ImageStyle): IconElement => (
  <Icon {...style} pack="app" name="input-dark" />
);

export const AssetListIcon = (style: ImageStyle): IconElement => (
  <Icon {...style} pack="app" name="list" />
);

export const AssetListDarkIcon = (style: ImageStyle): IconElement => (
  <Icon {...style} pack="app" name="list-dark" />
);

export const AssetMenuIcon = (style: ImageStyle): IconElement => (
  <Icon {...style} pack="app" name="menu" />
);

export const AssetMenuDarkIcon = (style: ImageStyle): IconElement => (
  <Icon {...style} pack="app" name="menu-dark" />
);

export const AssetModalIcon = (style: ImageStyle): IconElement => (
  <Icon {...style} pack="app" name="modal" />
);

export const AssetModalDarkIcon = (style: ImageStyle): IconElement => (
  <Icon {...style} pack="app" name="modal-dark" />
);

export const AssetOverflowMenuIcon = (style: ImageStyle): IconElement => (
  <Icon {...style} pack="app" name="overflow-menu" />
);

export const AssetOverflowMenuDarkIcon = (style: ImageStyle): IconElement => (
  <Icon {...style} pack="app" name="overflow-menu-dark" />
);

export const AssetPopoverIcon = (style: ImageStyle): IconElement => (
  <Icon {...style} pack="app" name="popover" />
);

export const AssetPopoverDarkIcon = (style: ImageStyle): IconElement => (
  <Icon {...style} pack="app" name="popover-dark" />
);

export const AssetRadioIcon = (style: ImageStyle): IconElement => (
  <Icon {...style} pack="app" name="radio" />
);

export const AssetRadioDarkIcon = (style: ImageStyle): IconElement => (
  <Icon {...style} pack="app" name="radio-dark" />
);

export const AssetSelectIcon = (style: ImageStyle): IconElement => (
  <Icon {...style} pack="app" name="select" />
);

export const AssetSelectDarkIcon = (style: ImageStyle): IconElement => (
  <Icon {...style} pack="app" name="select-dark" />
);

export const AssetSpinnerIcon = (style: ImageStyle): IconElement => (
  <Icon {...style} pack="app" name="spinner" />
);

export const AssetSpinnerDarkIcon = (style: ImageStyle): IconElement => (
  <Icon {...style} pack="app" name="spinner-dark" />
);

export const AssetTabViewIcon = (style: ImageStyle): IconElement => (
  <Icon {...style} pack="app" name="tab-view" />
);

export const AssetTabViewDarkIcon = (style: ImageStyle): IconElement => (
  <Icon {...style} pack="app" name="tab-view-dark" />
);

export const AssetTextIcon = (style: ImageStyle): IconElement => (
  <Icon {...style} pack="app" name="text" />
);

export const AssetTextDarkIcon = (style: ImageStyle): IconElement => (
  <Icon {...style} pack="app" name="text-dark" />
);

export const AssetToggleIcon = (style: ImageStyle): IconElement => (
  <Icon {...style} pack="app" name="toggle" />
);

export const AssetToggleDarkIcon = (style: ImageStyle): IconElement => (
  <Icon {...style} pack="app" name="toggle-dark" />
);

export const AssetTooltipIcon = (style: ImageStyle): IconElement => (
  <Icon {...style} pack="app" name="tooltip" />
);

export const AssetTooltipDarkIcon = (style: ImageStyle): IconElement => (
  <Icon {...style} pack="app" name="tooltip-dark" />
);

export const AssetTopNavigationIcon = (style: ImageStyle): IconElement => (
  <Icon {...style} pack="app" name="top-navigation" />
);

export const AssetTopNavigationDarkIcon = (style: ImageStyle): IconElement => (
  <Icon {...style} pack="app" name="top-navigation-dark" />
);

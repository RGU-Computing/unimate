import React from 'react';
import { ImageBackground, ImageBackgroundProps, StyleProp, StyleSheet, View, ViewStyle } from 'react-native';

interface OverlayImageStyle extends ViewStyle {
  overlayColor?: string;
}

export interface ImageOverlayProps extends ImageBackgroundProps {
  style?: StyleProp<OverlayImageStyle>;
  children?: React.ReactNode;
}

// const DEFAULT_OVERLAY_COLOR = 'rgba(113, 33, 119, 1)'; 
const colors = ['rgba(113, 33, 119, 1)', '#856c8b', '#a4c5c6', '#6886c5', '#e58a8a']
const DEFAULT_OVERLAY_COLOR = colors[Math.floor(Math.random() * colors.length)];

export const ImageOverlay = (props?: ImageOverlayProps): React.ReactElement<ImageBackgroundProps> => {

  const { style, children, ...imageBackgroundProps } = props;
  const { overlayColor, ...imageBackgroundStyle } = StyleSheet.flatten(style);

  return (
    <ImageBackground
      {...imageBackgroundProps}
      style={imageBackgroundStyle}>
      <View style={[StyleSheet.absoluteFill, { backgroundColor: overlayColor || DEFAULT_OVERLAY_COLOR }]}/>
        {children}
    </ImageBackground>
  );
};

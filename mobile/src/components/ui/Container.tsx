import React from 'react';
import { View, StyleSheet, ViewStyle, StyleProp } from 'react-native';
import { useResponsive } from '../../hooks/useResponsive';

export interface ContainerProps {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  maxWidth?: number;
  padding?: boolean;
}

export function Container({ children, style, maxWidth, padding = true }: ContainerProps) {
  const { containerMaxWidth, contentPadding } = useResponsive();

  return (
    <View
      style={[
        styles.container,
        {
          maxWidth: maxWidth || containerMaxWidth,
          paddingHorizontal: padding ? contentPadding : 0
        },
        style
      ]}
    >
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignSelf: 'center'
  }
});

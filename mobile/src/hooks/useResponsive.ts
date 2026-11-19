import { useWindowDimensions } from 'react-native';

export interface ResponsiveState {
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  isWide: boolean;
  width: number;
  height: number;
  containerMaxWidth: number;
  contentPadding: number;
}

export function useResponsive(): ResponsiveState {
  const { width, height } = useWindowDimensions();

  const isMobile = width < 768;
  const isTablet = width >= 768 && width < 1024;
  const isDesktop = width >= 1024;
  const isWide = width >= 860;

  return {
    isMobile,
    isTablet,
    isDesktop,
    isWide,
    width,
    height,
    containerMaxWidth: 1200,
    contentPadding: isMobile ? 16 : isTablet ? 24 : 36
  };
}

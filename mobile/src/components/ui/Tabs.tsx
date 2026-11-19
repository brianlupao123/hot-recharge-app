import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ViewStyle, StyleProp } from 'react-native';
import { Tokens } from '../../theme/tokens';

export interface TabItemProps {
  id: string;
  label: string;
  icon?: React.ReactNode;
  active?: boolean;
  onPress?: () => void;
}

export function TabItem({ label, icon, active, onPress }: TabItemProps) {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={onPress}
      style={[styles.tabItem, active && styles.activeTabItem]}
    >
      {icon && <View style={styles.tabIcon}>{icon}</View>}
      <Text style={[styles.tabLabel, active && styles.activeTabLabel]}>{label}</Text>
    </TouchableOpacity>
  );
}

export interface TabsProps {
  children?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  tabs?: Array<{ id: string; label: string; icon?: React.ReactNode }>;
  activeTab?: string;
  onTabChange?: (tabId: string) => void;
}

export function Tabs({ tabs, activeTab, onTabChange, children, style }: TabsProps) {
  if (tabs && onTabChange) {
    return (
      <View style={[styles.tabContainer, style]}>
        {tabs.map((tab) => (
          <TabItem
            key={tab.id}
            id={tab.id}
            label={tab.label}
            icon={tab.icon}
            active={activeTab === tab.id}
            onPress={() => onTabChange(tab.id)}
          />
        ))}
      </View>
    );
  }

  return <View style={[styles.tabContainer, style]}>{children}</View>;
}

Tabs.Item = TabItem;

const styles = StyleSheet.create({
  tabContainer: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: Tokens.colors.surfaceBorder,
    marginBottom: Tokens.spacing.lg
  },
  tabItem: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: Tokens.spacing.md,
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
    gap: Tokens.spacing.xs
  },
  activeTabItem: {
    borderBottomColor: Tokens.colors.primary
  },
  tabIcon: {
    marginRight: 4
  },
  tabLabel: {
    fontSize: Tokens.typography.body.fontSize,
    fontWeight: '600',
    color: Tokens.colors.textMuted
  },
  activeTabLabel: {
    color: Tokens.colors.textPrimary,
    fontWeight: '800'
  }
});

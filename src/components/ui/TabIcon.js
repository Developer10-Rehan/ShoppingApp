import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { COLORS, SIZES } from '../../utils/constants';

const TabIcon = ({ 
  name, 
  focused, 
  color, 
  size = 24, 
  badge,
  badgeColor = COLORS.secondary,
  label 
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <Icon 
          name={name} 
          size={size} 
          color={focused ? COLORS.primary : color} 
        />
        {badge && badge > 0 && (
          <View style={[styles.badge, { backgroundColor: badgeColor }]}>
            <Text style={styles.badgeText}>
              {badge > 99 ? '99+' : badge.toString()}
            </Text>
          </View>
        )}
      </View>
      {label && (
        <Text style={[
          styles.label, 
          { color: focused ? COLORS.primary : color }
        ]}>
          {label}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 50,
  },
  iconContainer: {
    position: 'relative',
  },
  badge: {
    position: 'absolute',
    top: -8,
    right: -8,
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 4,
  },
  badgeText: {
    color: COLORS.white,
    fontSize: 10,
    fontWeight: 'bold',
  },
  label: {
    fontSize: 12,
    marginTop: 4,
  },
});

export default TabIcon;
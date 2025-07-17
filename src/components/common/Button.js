import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { COLORS, SIZES } from '../../utils/constants';

const Button = ({
  title,
  onPress,
  variant = 'primary',
  size = 'medium',
  disabled = false,
  loading = false,
  icon,
  iconPosition = 'left',
  style,
  textStyle,
  ...props
}) => {
  const getButtonStyle = () => {
    const baseStyle = [styles.button, styles[`${variant}Button`], styles[`${size}Button`]];
    
    if (disabled || loading) {
      baseStyle.push(styles.disabledButton);
    }
    
    if (style) {
      baseStyle.push(style);
    }
    
    return baseStyle;
  };

  const getTextStyle = () => {
    const baseStyle = [styles.text, styles[`${variant}Text`], styles[`${size}Text`]];
    
    if (textStyle) {
      baseStyle.push(textStyle);
    }
    
    return baseStyle;
  };

  const renderContent = () => {
    if (loading) {
      return (
        <ActivityIndicator 
          color={variant === 'primary' ? COLORS.white : COLORS.primary} 
          size="small" 
        />
      );
    }

    const iconComponent = icon && (
      <Icon 
        name={icon} 
        size={size === 'small' ? 16 : 20} 
        color={variant === 'primary' ? COLORS.white : COLORS.primary}
        style={iconPosition === 'left' ? { marginRight: 8 } : { marginLeft: 8 }}
      />
    );

    return (
      <View style={styles.content}>
        {iconPosition === 'left' && iconComponent}
        <Text style={getTextStyle()}>{title}</Text>
        {iconPosition === 'right' && iconComponent}
      </View>
    );
  };

  return (
    <TouchableOpacity
      style={getButtonStyle()}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.7}
      {...props}
    >
      {renderContent()}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  
  primaryButton: {
    backgroundColor: COLORS.primary,
  },
  secondaryButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: COLORS.primary,
  },
  outlineButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  ghostButton: {
    backgroundColor: 'transparent',
  },
  
  smallButton: {
    paddingHorizontal: SIZES.md,
    paddingVertical: SIZES.sm,
    height: 36,
  },
  mediumButton: {
    paddingHorizontal: SIZES.lg,
    paddingVertical: SIZES.md,
    height: 48,
  },
  largeButton: {
    paddingHorizontal: SIZES.xl,
    paddingVertical: SIZES.lg,
    height: 56,
  },
  
  primaryText: {
    color: COLORS.white,
    fontWeight: '600',
  },
  secondaryText: {
    color: COLORS.primary,
    fontWeight: '600',
  },
  outlineText: {
    color: COLORS.text,
    fontWeight: '500',
  },
  ghostText: {
    color: COLORS.primary,
    fontWeight: '500',
  },
  
  smallText: {
    fontSize: SIZES.sm,
  },
  mediumText: {
    fontSize: SIZES.md,
  },
  largeText: {
    fontSize: SIZES.lg,
  },
  
  disabledButton: {
    opacity: 0.6,
  },
  text: {
    textAlign: 'center',
  },
});

export default Button;
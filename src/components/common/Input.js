import React, { useState } from 'react';
import {
  View,
  TextInput,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { COLORS, SIZES } from '../../utils/constants';

const Input = ({
  label,
  placeholder,
  value,
  onChangeText,
  onBlur,
  onFocus,
  error,
  helperText,
  leftIcon,
  rightIcon,
  rightIconPress,
  secureTextEntry = false,
  editable = true,
  multiline = false,
  numberOfLines = 1,
  keyboardType = 'default',
  autoCapitalize = 'sentences',
  autoCorrect = true,
  style,
  inputStyle,
  containerStyle,
  ...props
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [isSecure, setIsSecure] = useState(secureTextEntry);

  const handleFocus = (e) => {
    setIsFocused(true);
    onFocus?.(e);
  };

  const handleBlur = (e) => {
    setIsFocused(false);
    onBlur?.(e);
  };

  const toggleSecureEntry = () => {
    setIsSecure(!isSecure);
    rightIconPress?.();
  };

  const getBorderColor = () => {
    if (error) return COLORS.error;
    if (isFocused) return COLORS.primary;
    return COLORS.border;
  };

  return (
    <View style={[styles.container, containerStyle]}>
      {label && <Text style={styles.label}>{label}</Text>}
      
      <View style={[
        styles.inputContainer,
        { borderColor: getBorderColor() },
        !editable && styles.disabled,
        style
      ]}>
        {leftIcon && (
          <Icon 
            name={leftIcon} 
            size={20} 
            color={isFocused ? COLORS.primary : COLORS.textSecondary}
            style={styles.leftIcon}
          />
        )}
        
        <TextInput
          style={[styles.input, inputStyle]}
          placeholder={placeholder}
          placeholderTextColor={COLORS.textSecondary}
          value={value}
          onChangeText={onChangeText}
          onFocus={handleFocus}
          onBlur={handleBlur}
          secureTextEntry={isSecure}
          editable={editable}
          multiline={multiline}
          numberOfLines={numberOfLines}
          keyboardType={keyboardType}
          autoCapitalize={autoCapitalize}
          autoCorrect={autoCorrect}
          {...props}
        />
        
        {(rightIcon || secureTextEntry) && (
          <TouchableOpacity 
            onPress={secureTextEntry ? toggleSecureEntry : rightIconPress}
            style={styles.rightIcon}
            disabled={!secureTextEntry && !rightIconPress}
          >
            <Icon 
              name={secureTextEntry ? (isSecure ? 'eye-off' : 'eye') : rightIcon} 
              size={20} 
              color={COLORS.textSecondary}
            />
          </TouchableOpacity>
        )}
      </View>
      
      {(error || helperText) && (
        <Text style={[styles.helperText, error && styles.errorText]}>
          {error || helperText}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: SIZES.md,
  },
  label: {
    fontSize: SIZES.sm,
    fontWeight: '500',
    color: COLORS.text,
    marginBottom: SIZES.xs,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.surface,
    borderRadius: 8,
    borderWidth: 1,
    paddingHorizontal: SIZES.md,
    minHeight: 48,
  },
  disabled: {
    backgroundColor: COLORS.border,
    opacity: 0.6,
  },
  input: {
    flex: 1,
    fontSize: SIZES.md,
    color: COLORS.text,
    paddingVertical: SIZES.sm,
  },
  leftIcon: {
    marginRight: SIZES.sm,
  },
  rightIcon: {
    marginLeft: SIZES.sm,
    padding: SIZES.xs,
  },
  helperText: {
    fontSize: SIZES.xs,
    color: COLORS.textSecondary,
    marginTop: SIZES.xs,
  },
  errorText: {
    color: COLORS.error,
  },
});

export default Input;
import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  Platform,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Feather';
import { COLORS, SIZES } from '../../utils/constants';

const Header = ({ 
  title, 
  showBackButton = false, 
  rightComponent,
  onBackPress,
  backgroundColor = COLORS.background,
  titleColor = COLORS.text,
  showBorder = true,
}) => {
  const navigation = useNavigation();

  const handleBackPress = () => {
    if (onBackPress) {
      onBackPress();
    } else {
      navigation.goBack();
    }
  };

  return (
    <>
      <StatusBar
        barStyle={backgroundColor === COLORS.background ? "dark-content" : "light-content"}
        backgroundColor={backgroundColor}
        translucent={false}
      />
      <View style={[
        styles.container, 
        { backgroundColor },
        showBorder && styles.borderBottom
      ]}>
        <View style={styles.leftContainer}>
          {showBackButton && (
            <TouchableOpacity 
              style={styles.backButton} 
              onPress={handleBackPress}
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            >
              <Icon 
                name="arrow-left" 
                size={24} 
                color={titleColor} 
              />
            </TouchableOpacity>
          )}
        </View>

        <View style={styles.titleContainer}>
          <Text style={[styles.title, { color: titleColor }]} numberOfLines={1}>
            {title}
          </Text>
        </View>

        <View style={styles.rightContainer}>
          {rightComponent}
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: SIZES.md,
    paddingTop: Platform.OS === 'ios' ? 44 : SIZES.md,
    paddingBottom: SIZES.md,
    minHeight: Platform.OS === 'ios' ? 88 : 56,
  },
  borderBottom: {
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  leftContainer: {
    flex: 1,
    alignItems: 'flex-start',
  },
  titleContainer: {
    flex: 2,
    alignItems: 'center',
  },
  rightContainer: {
    flex: 1,
    alignItems: 'flex-end',
  },
  backButton: {
    padding: SIZES.xs,
  },
  title: {
    fontSize: SIZES.lg,
    fontWeight: '600',
    textAlign: 'center',
  },
});

export default Header;
import React, { useEffect } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ScrollView,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import Icon from 'react-native-vector-icons/Feather';
import { logout, fetchUserProfile } from '../../store/slices/authSlice';
import { clearCart } from '../../store/slices/cartSlice';
import { COLORS, SIZES } from '../../utils/constants';

const ProfileScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(fetchUserProfile());
  }, [dispatch]);

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Logout',
          style: 'destructive',
          onPress: () => {
            dispatch(logout());
            dispatch(clearCart());
          },
        },
      ]
    );
  };

  const ProfileItem = ({ label, value }) => (
    <View style={styles.profileItem}>
      <Text style={styles.profileLabel}>{label}</Text>
      <Text style={styles.profileValue}>{value}</Text>
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Image
          source={{ 
            uri: user?.image || 'https://via.placeholder.com/120'
          }}
          style={styles.profileImage}
        />
        <Text style={styles.userName}>
          {user?.firstName && user?.lastName 
            ? `${user.firstName} ${user.lastName}` 
            : 'John Doe'}
        </Text>
      </View>

      <View style={styles.profileInfo}>
        <ProfileItem 
          label="Designation" 
          value={user?.company?.title || 'Software Test Engineer IV'} 
        />
        <ProfileItem 
          label="Works At" 
          value={user?.company?.name || 'ABC Pvt Ltd'} 
        />
        <ProfileItem 
          label="Gender" 
          value={user?.gender || 'Male'} 
        />
        <ProfileItem 
          label="Contact" 
          value={user?.phone || '01234435345'} 
        />
        <ProfileItem 
          label="Studies at" 
          value={user?.university || 'ABC University, UK'} 
        />
      </View>

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutText}>Log Out</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    alignItems: 'center',
    paddingTop: 80,
    paddingBottom: SIZES.xl,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: SIZES.lg,
  },
  userName: {
    fontSize: SIZES.xl,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  profileInfo: {
    paddingHorizontal: SIZES.lg,
    marginBottom: SIZES.xl,
  },
  profileItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: SIZES.md,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  profileLabel: {
    fontSize: SIZES.md,
    color: COLORS.text,
    fontWeight: '500',
  },
  profileValue: {
    fontSize: SIZES.md,
    color: COLORS.textSecondary,
    textAlign: 'right',
    flex: 1,
    marginLeft: SIZES.md,
  },
  logoutButton: {
    backgroundColor: COLORS.secondary,
    marginHorizontal: SIZES.lg,
    borderRadius: 25,
    paddingVertical: SIZES.md,
    alignItems: 'center',
    marginBottom: 50,
  },
  logoutText: {
    color: COLORS.white,
    fontSize: SIZES.md,
    fontWeight: '600',
  },
});

export default ProfileScreen;
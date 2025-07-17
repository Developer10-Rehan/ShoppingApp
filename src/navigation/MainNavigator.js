import React, { useEffect } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { useDispatch, useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/Feather';

import HomeScreen from '../screens/Home/HomeScreen';
import ProductDetailScreen from '../screens/Home/ProductDetailScreen';
import SearchScreen from '../screens/Search/SearchScreen';
import CartScreen from '../screens/Cart/CartScreen';
import ProfileScreen from '../screens/Profile/ProfileScreen';
import { loadCart } from '../store/slices/cartSlice';
import { loadRecentSearches } from '../store/slices/searchSlice';
import { COLORS } from '../utils/constants';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const HomeStack = () => (
  <Stack.Navigator>
    <Stack.Screen 
      name="HomeMain" 
      component={HomeScreen} 
      options={{ headerShown: false }}
    />
    <Stack.Screen 
      name="ProductDetail" 
      component={ProductDetailScreen}
      options={{ 
        title: 'Item Details',
        headerStyle: { backgroundColor: COLORS.background },
        headerTintColor: COLORS.text,
      }}
    />
    <Stack.Screen 
      name="Cart" 
      component={CartScreen}
      options={{ headerShown: false }}
    />
  </Stack.Navigator>
);

const MainNavigator = () => {
  const dispatch = useDispatch();
  const { totalItems } = useSelector((state) => state.cart);

  useEffect(() => {
    const loadStoredData = async () => {
      try {
        const cartData = await AsyncStorage.getItem('cart');
        if (cartData) {
          dispatch(loadCart(JSON.parse(cartData)));
        }

        const recentSearches = await AsyncStorage.getItem('recentSearches');
        if (recentSearches) {
          dispatch(loadRecentSearches(JSON.parse(recentSearches)));
        }
      } catch (error) {
        console.error('Error loading stored data:', error);
      }
    };

    loadStoredData();
  }, [dispatch]);

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = 'home';
          } else if (route.name === 'Search') {
            iconName = 'search';
          } else if (route.name === 'Profile') {
            iconName = 'user';
          }

          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: COLORS.white,
        tabBarInactiveTintColor: COLORS.textSecondary,
        tabBarStyle: {
          backgroundColor: COLORS.black,
          borderTopWidth: 0,
          paddingBottom: 5,
          height: 60,
        },
        headerShown: false,
      })}
    >
      <Tab.Screen name="Home" component={HomeStack} />
      <Tab.Screen name="Search" component={SearchScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
};

export default MainNavigator;
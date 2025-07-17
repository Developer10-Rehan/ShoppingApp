import React, { useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  RefreshControl,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import Icon from 'react-native-vector-icons/Feather';
import { fetchProducts } from '../../store/slices/productsSlice';
import { addToCart } from '../../store/slices/cartSlice';
import ProductCard from '../../components/common/ProductCard';
import { COLORS, SIZES } from '../../utils/constants';

const HomeScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const { products, isLoading } = useSelector((state) => state.products);
  const { user } = useSelector((state) => state.auth);
  const { totalItems } = useSelector((state) => state.cart);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const handleRefresh = () => {
    dispatch(fetchProducts());
  };

  const handleProductPress = (product) => {
    navigation.navigate('ProductDetail', { productId: product.id });
  };

  const handleAddToCart = (product) => {
    dispatch(addToCart({ product, quantity: 1 }));
    Alert.alert('Success', `${product.title} added to cart!`);
  };

  const handleCartPress = () => {
    navigation.navigate('Cart');
  };

  const renderHeader = () => (
    <View style={styles.header}>
      <View style={styles.userInfo}>
        <Image
          source={{ 
            uri: user?.image || 'https://via.placeholder.com/50'
          }}
          style={styles.userImage}
        />
        <View>
          <Text style={styles.greeting}>Good Morning</Text>
          <Text style={styles.userName}>
            {user?.firstName || 'John'}!
          </Text>
        </View>
      </View>
      <TouchableOpacity style={styles.cartButton} onPress={handleCartPress}>
        <Icon name="shopping-cart" size={24} color={COLORS.text} />
        {totalItems > 0 && (
          <View style={styles.cartBadge}>
            <Text style={styles.cartBadgeText}>{totalItems}</Text>
          </View>
        )}
      </TouchableOpacity>
    </View>
  );

  const renderProduct = ({ item }) => (
    <ProductCard
      product={item}
      onPress={() => handleProductPress(item)}
      onAddToCart={handleAddToCart}
      showAddButton={true}
    />
  );

  return (
    <View style={styles.container}>
      {renderHeader()}
      <Text style={styles.sectionTitle}>What's New</Text>
      <FlatList
        data={products}
        renderItem={renderProduct}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        contentContainerStyle={styles.productsList}
        refreshControl={
          <RefreshControl refreshing={isLoading} onRefresh={handleRefresh} />
        }
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: SIZES.lg,
    paddingTop: 50,
    paddingBottom: SIZES.lg,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  userImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: SIZES.md,
  },
  greeting: {
    fontSize: SIZES.sm,
    color: COLORS.textSecondary,
  },
  userName: {
    fontSize: SIZES.lg,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  cartButton: {
    position: 'relative',
    padding: 8,
  },
  cartBadge: {
    position: 'absolute',
    top: 0,
    right: 0,
    backgroundColor: COLORS.secondary,
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cartBadgeText: {
    color: COLORS.white,
    fontSize: 12,
    fontWeight: 'bold',
  },
  sectionTitle: {
    fontSize: SIZES.lg,
    fontWeight: 'bold',
    color: COLORS.text,
    paddingHorizontal: SIZES.lg,
    marginBottom: SIZES.md,
  },
  productsList: {
    paddingHorizontal: SIZES.md,
    paddingBottom: 100,
  },
});

export default HomeScreen;

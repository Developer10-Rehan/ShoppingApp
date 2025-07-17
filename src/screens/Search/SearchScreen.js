import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import Icon from 'react-native-vector-icons/Feather';
import { performSearch, addToRecentSearches, clearRecentSearches } from '../../store/slices/searchSlice';
import { addToCart } from '../../store/slices/cartSlice';
import ProductCard from '../../components/common/ProductCard';
import { COLORS, SIZES } from '../../utils/constants';

const SearchScreen = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const dispatch = useDispatch();
  const { results, recentSearches, isLoading } = useSelector((state) => state.search);

  const handleSearch = async (query) => {
    if (query.trim()) {
      await dispatch(performSearch(query.trim()));
      dispatch(addToRecentSearches(query.trim()));
    }
  };

  const handleRecentSearchPress = (query) => {
    setSearchQuery(query);
    handleSearch(query);
  };

  const handleAddToCart = (product) => {
    dispatch(addToCart({ product, quantity: 1 }));
    Alert.alert('Success', `${product.title} added to cart!`);
  };

  const handleProductPress = (product) => {
    navigation.navigate('Home', {
      screen: 'ProductDetail',
      params: { productId: product.id }
    });
  };

  const renderRecentSearch = ({ item }) => (
    <TouchableOpacity
      style={styles.recentSearchItem}
      onPress={() => handleRecentSearchPress(item)}
    >
      <Text style={styles.recentSearchText}>{item}</Text>
    </TouchableOpacity>
  );

  const renderProduct = ({ item }) => (
    <View style={styles.productContainer}>
      <ProductCard
        product={item}
        onPress={() => handleProductPress(item)}
        onAddToCart={handleAddToCart}
        showAddButton={true}
      />
    </View>
  );

  const renderEmptyState = () => (
    <View style={styles.emptyContainer}>
      <Icon name="search" size={80} color={COLORS.border} />
      <Text style={styles.emptyText}>No Result Found</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <View style={styles.searchInputContainer}>
          <Icon name="search" size={20} color={COLORS.textSecondary} style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search"
            placeholderTextColor={COLORS.textSecondary}
            value={searchQuery}
            onChangeText={setSearchQuery}
            onSubmitEditing={() => handleSearch(searchQuery)}
            returnKeyType="search"
          />
        </View>
      </View>

      {!searchQuery && recentSearches.length > 0 && (
        <View style={styles.recentContainer}>
          <View style={styles.recentHeader}>
            <Text style={styles.recentTitle}>Recent Searches</Text>
            <TouchableOpacity onPress={() => dispatch(clearRecentSearches())}>
              <Icon name="x" size={20} color={COLORS.textSecondary} />
            </TouchableOpacity>
          </View>
          <FlatList
            data={recentSearches}
            renderItem={renderRecentSearch}
            keyExtractor={(item, index) => index.toString()}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.recentList}
          />
        </View>
      )}

      {isLoading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={COLORS.primary} />
        </View>
      ) : results.length > 0 ? (
        <FlatList
          data={results}
          renderItem={renderProduct}
          keyExtractor={(item) => item.id.toString()}
          numColumns={2}
          contentContainerStyle={styles.productsList}
          showsVerticalScrollIndicator={false}
        />
      ) : searchQuery ? (
        renderEmptyState()
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    paddingTop: 50,
  },
  searchContainer: {
    paddingHorizontal: SIZES.lg,
    marginBottom: SIZES.lg,
  },
  searchInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.surface,
    borderRadius: 25,
    paddingHorizontal: SIZES.md,
    height: 50,
  },
  searchIcon: {
    marginRight: SIZES.sm,
  },
  searchInput: {
    flex: 1,
    fontSize: SIZES.md,
    color: COLORS.text,
  },
  recentContainer: {
    paddingHorizontal: SIZES.lg,
    marginBottom: SIZES.lg,
  },
  recentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SIZES.sm,
  },
  recentTitle: {
    fontSize: SIZES.md,
    fontWeight: '600',
    color: COLORS.text,
  },
  recentList: {
    paddingVertical: SIZES.sm,
  },
  recentSearchItem: {
    backgroundColor: '#FFF3E0',
    paddingHorizontal: SIZES.md,
    paddingVertical: SIZES.sm,
    borderRadius: 16,
    marginRight: SIZES.sm,
  },
  recentSearchText: {
    color: '#F57C00',
    fontSize: SIZES.sm,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  productsList: {
    paddingHorizontal: SIZES.md,
    paddingBottom: 100,
  },
  productContainer: {
    flex: 1,
    maxWidth: '50%',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: SIZES.lg,
    color: COLORS.textSecondary,
    marginTop: SIZES.md,
  },
});

export default SearchScreen;

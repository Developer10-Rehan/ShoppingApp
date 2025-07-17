import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import Icon from 'react-native-vector-icons/Feather';
import { fetchProductById } from '../../store/slices/productsSlice';
import { addToCart } from '../../store/slices/cartSlice';
import { COLORS, SIZES } from '../../utils/constants';

const ProductDetailScreen = ({ route, navigation }) => {
  const { productId } = route.params;
  const [quantity, setQuantity] = useState(1);
  const dispatch = useDispatch();
  const { selectedProduct, isLoading } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchProductById(productId));
  }, [dispatch, productId]);

  const handleAddToCart = () => {
    if (selectedProduct) {
      dispatch(addToCart({ product: selectedProduct, quantity }));
      Alert.alert('Success', `${selectedProduct.title} added to cart!`);
    }
  };

  const updateQuantity = (change) => {
    const newQuantity = quantity + change;
    if (newQuantity >= 1 && newQuantity <= selectedProduct?.stock) {
      setQuantity(newQuantity);
    }
  };

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    
    for (let i = 0; i < 5; i++) {
      stars.push(
        <Icon
          key={i}
          name="star"
          size={16}
          color={i < fullStars ? '#FFA726' : '#E0E0E0'}
        />
      );
    }
    return stars;
  };

  if (isLoading || !selectedProduct) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={COLORS.primary} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <Image
          source={{ uri: selectedProduct.thumbnail }}
          style={styles.productImage}
        />
        
        <View style={styles.productInfo}>
          <View style={styles.titleRow}>
            <Text style={styles.productTitle}>{selectedProduct.title}</Text>
            <View style={styles.ratingContainer}>
              {renderStars(selectedProduct.rating)}
              <Text style={styles.ratingText}>{selectedProduct.rating}</Text>
            </View>
          </View>

          <Text style={styles.description}>{selectedProduct.description}</Text>

          <View style={styles.tagsContainer}>
            <Text style={styles.tagsTitle}>Tags</Text>
            <View style={styles.tags}>
              <Text style={styles.tag}>#{selectedProduct.brand}</Text>
              <Text style={styles.tag}>#{selectedProduct.category}</Text>
            </View>
          </View>

          <View style={styles.quantityContainer}>
            <Text style={styles.quantityTitle}>Quantity</Text>
            <View style={styles.quantityControls}>
              <TouchableOpacity
                style={styles.quantityButton}
                onPress={() => updateQuantity(-1)}
              >
                <Icon name="minus" size={16} color={COLORS.text} />
              </TouchableOpacity>
              <Text style={styles.quantityText}>{quantity}</Text>
              <TouchableOpacity
                style={styles.quantityButton}
                onPress={() => updateQuantity(1)}
              >
                <Icon name="plus" size={16} color={COLORS.text} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <View>
          <Text style={styles.totalPriceLabel}>Total Price</Text>
          <Text style={styles.totalPrice}>
            ${(selectedProduct.price * quantity).toFixed(2)}
          </Text>
        </View>
        <TouchableOpacity style={styles.addToCartButton} onPress={handleAddToCart}>
          <Text style={styles.addToCartText}>Add to Cart</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    flex: 1,
  },
  productImage: {
    width: '100%',
    height: 300,
    resizeMode: 'contain',
    backgroundColor: COLORS.surface,
  },
  productInfo: {
    padding: SIZES.lg,
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: SIZES.md,
  },
  productTitle: {
    fontSize: SIZES.xl,
    fontWeight: 'bold',
    color: COLORS.text,
    flex: 1,
    marginRight: SIZES.md,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    marginLeft: SIZES.xs,
    color: COLORS.textSecondary,
    fontSize: SIZES.sm,
  },
  description: {
    fontSize: SIZES.md,
    color: COLORS.textSecondary,
    lineHeight: 24,
    marginBottom: SIZES.lg,
  },
  tagsContainer: {
    marginBottom: SIZES.lg,
  },
  tagsTitle: {
    fontSize: SIZES.md,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: SIZES.sm,
  },
  tags: {
    flexDirection: 'row',
  },
  tag: {
    backgroundColor: COLORS.surface,
    paddingHorizontal: SIZES.md,
    paddingVertical: SIZES.xs,
    borderRadius: 16,
    marginRight: SIZES.sm,
    color: COLORS.textSecondary,
  },
  quantityContainer: {
    marginBottom: SIZES.lg,
  },
  quantityTitle: {
    fontSize: SIZES.md,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: SIZES.sm,
  },
  quantityControls: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantityButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: COLORS.surface,
    justifyContent: 'center',
    alignItems: 'center',
  },
  quantityText: {
    fontSize: SIZES.lg,
    fontWeight: '600',
    color: COLORS.text,
    marginHorizontal: SIZES.lg,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: SIZES.lg,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    backgroundColor: COLORS.background,
  },
  totalPriceLabel: {
    fontSize: SIZES.sm,
    color: COLORS.textSecondary,
  },
  totalPrice: {
    fontSize: SIZES.xl,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  addToCartButton: {
    backgroundColor: COLORS.black,
    paddingHorizontal: SIZES.xl,
    paddingVertical: SIZES.md,
    borderRadius: 25,
  },
  addToCartText: {
    color: COLORS.white,
    fontSize: SIZES.md,
    fontWeight: '600',
  },
});

export default ProductDetailScreen;
import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Image,
  Alert,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import Icon from 'react-native-vector-icons/Feather';
import { updateQuantity, removeFromCart, clearCart } from '../../store/slices/cartSlice';
import { COLORS, SIZES } from '../../utils/constants';

const CartScreen = ({ navigation }) => {
  const [showClearMenu, setShowClearMenu] = useState(false);
  const dispatch = useDispatch();
  const { items, totalAmount, totalItems } = useSelector((state) => state.cart);

  const handleUpdateQuantity = (productId, newQuantity) => {
    if (newQuantity <= 0) {
      dispatch(removeFromCart(productId));
    } else {
      dispatch(updateQuantity({ productId, quantity: newQuantity }));
    }
  };

  const handleClearCart = () => {
    Alert.alert(
      'Clear Cart',
      'Are you sure you want to remove all items from your cart?',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Clear', 
          style: 'destructive',
          onPress: () => dispatch(clearCart())
        },
      ]
    );
    setShowClearMenu(false);
  };

  const handleCheckout = () => {
    Alert.alert('Checkout', 'Checkout functionality would be implemented here!');
  };

  const renderCartItem = ({ item }) => (
    <View style={styles.cartItem}>
      <Image source={{ uri: item.product.thumbnail }} style={styles.itemImage} />
      <View style={styles.itemDetails}>
        <Text style={styles.itemTitle} numberOfLines={2}>
          {item.product.title}
        </Text>
        <Text style={styles.itemDescription} numberOfLines={2}>
          {item.product.description}
        </Text>
        <Text style={styles.itemPrice}>${item.product.price.toFixed(2)}</Text>
      </View>
      <View style={styles.quantityContainer}>
        <TouchableOpacity
          style={styles.quantityButton}
          onPress={() => handleUpdateQuantity(item.product.id, item.quantity - 1)}
        >
          <Icon name="minus" size={16} color={COLORS.text} />
        </TouchableOpacity>
        <Text style={styles.quantityText}>{item.quantity}</Text>
        <TouchableOpacity
          style={styles.quantityButton}
          onPress={() => handleUpdateQuantity(item.product.id, item.quantity + 1)}
        >
          <Icon name="plus" size={16} color={COLORS.text} />
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderHeader = () => (
    <View style={styles.header}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Icon name="arrow-left" size={24} color={COLORS.text} />
      </TouchableOpacity>
      <Text style={styles.headerTitle}>Cart</Text>
      <TouchableOpacity onPress={() => setShowClearMenu(!showClearMenu)}>
        <Icon name="more-horizontal" size={24} color={COLORS.text} />
      </TouchableOpacity>
      
      {showClearMenu && (
        <View style={styles.clearMenu}>
          <TouchableOpacity style={styles.clearMenuItem} onPress={handleClearCart}>
            <Icon name="trash-2" size={16} color={COLORS.error} />
            <Text style={styles.clearMenuText}>Clear Cart</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );

  const renderFooter = () => (
    <View style={styles.footer}>
      <View style={styles.summaryRow}>
        <Text style={styles.summaryLabel}>Subtotal</Text>
        <Text style={styles.summaryValue}>${totalAmount.toFixed(2)}</Text>
      </View>
      <View style={styles.summaryRow}>
        <Text style={styles.summaryLabel}>Discounts</Text>
        <Text style={styles.summaryValue}>$11.86</Text>
      </View>
      <View style={styles.totalRow}>
        <Text style={styles.totalLabel}>Total</Text>
        <Text style={styles.totalValue}>${(totalAmount - 11.86).toFixed(2)}</Text>
      </View>
      <TouchableOpacity style={styles.checkoutButton} onPress={handleCheckout}>
        <Text style={styles.checkoutText}>Checkout</Text>
      </TouchableOpacity>
    </View>
  );

  if (items.length === 0) {
    return (
      <View style={styles.container}>
        {renderHeader()}
        <View style={styles.emptyContainer}>
          <Icon name="shopping-cart" size={80} color={COLORS.border} />
          <Text style={styles.emptyText}>Your cart is empty</Text>
          <TouchableOpacity
            style={styles.shopButton}
            onPress={() => navigation.navigate('Home')}
          >
            <Text style={styles.shopButtonText}>Start Shopping</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {renderHeader()}
      <FlatList
        data={items}
        renderItem={renderCartItem}
        keyExtractor={(item) => item.product.id.toString()}
        contentContainerStyle={styles.cartList}
        showsVerticalScrollIndicator={false}
      />
      {renderFooter()}
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
    position: 'relative',
  },
  headerTitle: {
    fontSize: SIZES.lg,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  clearMenu: {
    position: 'absolute',
    top: 80,
    right: SIZES.lg,
    backgroundColor: COLORS.white,
    borderRadius: 8,
    padding: SIZES.sm,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    zIndex: 1000,
  },
  clearMenuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: SIZES.sm,
    paddingHorizontal: SIZES.md,
  },
  clearMenuText: {
    marginLeft: SIZES.sm,
    color: COLORS.error,
    fontSize: SIZES.sm,
  },
  cartList: {
    paddingHorizontal: SIZES.lg,
  },
  cartItem: {
    flexDirection: 'row',
    backgroundColor: COLORS.white,
    borderRadius: 12,
    padding: SIZES.md,
    marginBottom: SIZES.md,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  itemImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    resizeMode: 'cover',
  },
  itemDetails: {
    flex: 1,
    marginLeft: SIZES.md,
    justifyContent: 'space-between',
  },
  itemTitle: {
    fontSize: SIZES.md,
    fontWeight: '600',
    color: COLORS.text,
  },
  itemDescription: {
    fontSize: SIZES.sm,
    color: COLORS.textSecondary,
    marginVertical: 4,
  },
  itemPrice: {
    fontSize: SIZES.md,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
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
    fontSize: SIZES.md,
    fontWeight: '600',
    color: COLORS.text,
    marginHorizontal: SIZES.md,
  },
  footer: {
    backgroundColor: COLORS.white,
    padding: SIZES.lg,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: SIZES.sm,
  },
  summaryLabel: {
    fontSize: SIZES.md,
    color: COLORS.textSecondary,
  },
  summaryValue: {
    fontSize: SIZES.md,
    color: COLORS.text,
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: SIZES.md,
    paddingTop: SIZES.md,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },
  totalLabel: {
    fontSize: SIZES.lg,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  totalValue: {
    fontSize: SIZES.lg,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  checkoutButton: {
    backgroundColor: COLORS.black,
    borderRadius: 25,
    paddingVertical: SIZES.md,
    alignItems: 'center',
    marginTop: SIZES.lg,
  },
  checkoutText: {
    color: COLORS.white,
    fontSize: SIZES.md,
    fontWeight: '600',
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
    marginBottom: SIZES.lg,
  },
  shopButton: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: SIZES.xl,
    paddingVertical: SIZES.md,
    borderRadius: 25,
  },
  shopButtonText: {
    color: COLORS.white,
    fontSize: SIZES.md,
    fontWeight: '600',
  },
});

export default CartScreen;
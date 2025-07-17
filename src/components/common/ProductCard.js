import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { COLORS, SIZES } from '../../utils/constants';

const ProductCard = ({ product, onPress, onAddToCart, showAddButton = false }) => {
  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    
    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(
          <Icon
            key={i}
            name="star"
            size={12}
            color="#FFA726"
            style={styles.star}
          />
        );
      } else if (i === fullStars && hasHalfStar) {
        stars.push(
          <View key={i} style={styles.halfStarContainer}>
            <Icon
              name="star"
              size={12}
              color="#E0E0E0"
              style={styles.star}
            />
            <View style={styles.halfStarOverlay}>
              <Icon
                name="star"
                size={12}
                color="#FFA726"
                style={styles.star}
              />
            </View>
          </View>
        );
      } else {
        stars.push(
          <Icon
            key={i}
            name="star"
            size={12}
            color="#E0E0E0"
            style={styles.star}
          />
        );
      }
    }
    return stars;
  };

  const formatPrice = (price) => {
    return `$${price.toFixed(2)}`;
  };

  const handleAddPress = (e) => {
    e.stopPropagation();
    if (onAddToCart) {
      onAddToCart(product);
    }
  };

  return (
    <TouchableOpacity 
      style={styles.container} 
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={styles.imageContainer}>
        <Image 
          source={{ uri: product.thumbnail }} 
          style={styles.image}
          resizeMode="cover"
        />
        {product.discountPercentage > 0 && (
          <View style={styles.discountBadge}>
            <Text style={styles.discountText}>
              -{Math.round(product.discountPercentage)}%
            </Text>
          </View>
        )}
      </View>
      
      <View style={styles.content}>
        <Text style={styles.title} numberOfLines={2}>
          {product.title}
        </Text>
        
        <View style={styles.ratingContainer}>
          <View style={styles.starsContainer}>
            {renderStars(product.rating)}
          </View>
          <Text style={styles.ratingText}>
            ({product.rating.toFixed(1)})
          </Text>
        </View>
        
        <View style={styles.priceContainer}>
          <Text style={styles.price}>
            {formatPrice(product.price)}
          </Text>
          {product.discountPercentage > 0 && (
            <Text style={styles.originalPrice}>
              {formatPrice(product.price / (1 - product.discountPercentage / 100))}
            </Text>
          )}
        </View>
        
        {product.stock < 10 && product.stock > 0 && (
          <Text style={styles.stockWarning}>
            Only {product.stock} left!
          </Text>
        )}
        
        {product.stock === 0 && (
          <Text style={styles.outOfStock}>
            Out of Stock
          </Text>
        )}
        
        {showAddButton && product.stock > 0 && (
          <TouchableOpacity
            style={styles.addButton}
            onPress={handleAddPress}
            activeOpacity={0.8}
          >
            <Icon name="plus" size={16} color={COLORS.white} />
          </TouchableOpacity>
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    borderRadius: 12,
    margin: 6,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
    width: 160,
    overflow: 'hidden',
  },
  imageContainer: {
    position: 'relative',
    width: '100%',
    height: 120,
  },
  image: {
    width: '100%',
    height: '100%',
    backgroundColor: COLORS.surface,
  },
  discountBadge: {
    position: 'absolute',
    top: 8,
    left: 8,
    backgroundColor: COLORS.secondary,
    borderRadius: 12,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  discountText: {
    color: COLORS.white,
    fontSize: 10,
    fontWeight: 'bold',
  },
  content: {
    padding: 12,
    position: 'relative',
  },
  title: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: 6,
    lineHeight: 18,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  starsContainer: {
    flexDirection: 'row',
    marginRight: 4,
  },
  star: {
    marginRight: 1,
  },
  halfStarContainer: {
    position: 'relative',
  },
  halfStarOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '50%',
    overflow: 'hidden',
  },
  ratingText: {
    fontSize: 10,
    color: COLORS.textSecondary,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.text,
    marginRight: 8,
  },
  originalPrice: {
    fontSize: 12,
    color: COLORS.textSecondary,
    textDecorationLine: 'line-through',
  },
  stockWarning: {
    fontSize: 10,
    color: COLORS.warning,
    fontWeight: '500',
    marginTop: 2,
  },
  outOfStock: {
    fontSize: 12,
    color: COLORS.error,
    fontWeight: '600',
    marginTop: 2,
  },
  addButton: {
    position: 'absolute',
    right: 8,
    bottom: 8,
    backgroundColor: COLORS.primary,
    borderRadius: 15,
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
});

export default ProductCard;
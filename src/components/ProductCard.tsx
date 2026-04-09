import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { Product } from '../services/products.service';
import { styles } from './ProductCard.styles';

interface ProductCardProps {
  product: Product;
  onPress: (id: number) => void;
}

export default function ProductCard({ product, onPress }: ProductCardProps) {
  const originalPrice = product.price / (1 - product.discountPercentage / 100);

  return (
    <TouchableOpacity style={styles.card} onPress={() => onPress(product.id)}>
      <Image source={{ uri: product.thumbnail }} style={styles.image} resizeMode="contain" />
      <View style={styles.info}>
        <Text style={styles.title} numberOfLines={1}>{product.title}</Text>
        <Text style={styles.description} numberOfLines={3}>{product.description}</Text>
        
        <View style={styles.priceContainer}>
          <Text style={styles.price}>R$ {product.price.toFixed(2).replace('.', ',')}</Text>
          {product.discountPercentage > 0 && (
            <Text style={styles.oldPrice}>R$ {originalPrice.toFixed(2).replace('.', ',')}</Text>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
}

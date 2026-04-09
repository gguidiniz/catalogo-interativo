import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, ActivityIndicator, ScrollView } from 'react-native';
import { useLocalSearchParams, useRouter, Stack } from 'expo-router';
import { getProductById, Product } from '@/src/services/products.service';
import { Ionicons } from '@expo/vector-icons';
import { styles } from './_id.styles';

export default function ProductDetailsScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        if (id) {
          const data = await getProductById(id as string);
          setProduct(data);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#2563EB" />
      </View>
    );
  }

  if (!product) {
    return (
      <View style={styles.center}>
        <Text>Produto não encontrado.</Text>
        <TouchableOpacity onPress={() => router.back()} style={{ marginTop: 16 }}>
          <Text style={{ color: '#2563EB' }}>Voltar</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const originalPrice = product.price / (1 - product.discountPercentage / 100);

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />
      
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#111827" />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} bounces={false}>
        <View style={styles.imageContainer}>
          <Image 
            source={{ uri: product.thumbnail }} 
            style={styles.image} 
            resizeMode="contain" 
          />
        </View>

        <View style={styles.content}>
          <Text style={styles.title}>{product.title}</Text>
          
          <View style={styles.priceContainer}>
            <Text style={styles.price}>R$ {product.price.toFixed(2).replace('.', ',')}</Text>
            {product.discountPercentage > 0 && (
              <Text style={styles.oldPrice}>R$ {originalPrice.toFixed(2).replace('.', ',')}</Text>
            )}
          </View>
          
          <Text style={styles.description}>{product.description}</Text>
        </View>
      </ScrollView>
    </View>
  );
}

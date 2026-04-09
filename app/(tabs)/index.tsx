import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, FlatList, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { getProductsByCategory, Product } from '@/src/services/products.service';
import ProductCard from '@/src/components/ProductCard';
import { useRouter } from 'expo-router';
import { styles } from './_index.styles';

export default function HomeScreen() {
  const [activeTab, setActiveTab] = useState<'men' | 'women'>('men');
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const fetchProducts = async () => {
    setLoading(true);
    setProducts([]);
    try {
      if (activeTab === 'men') {
        const [shirts, shoes, watches] = await Promise.all([
          getProductsByCategory('mens-shirts'),
          getProductsByCategory('mens-shoes'),
          getProductsByCategory('mens-watches')
        ]);
        setProducts([...shirts, ...shoes, ...watches]); 
      } else {
        const [bags, dresses, jewellery, wShoes, wWatches] = await Promise.all([
          getProductsByCategory('womens-bags'),
          getProductsByCategory('womens-dresses'),
          getProductsByCategory('womens-jewellery'),
          getProductsByCategory('womens-shoes'),
          getProductsByCategory('womens-watches')
        ]);
        setProducts([...bags, ...dresses, ...jewellery, ...wShoes, ...wWatches]);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [activeTab]);

  const handleProductPress = (id: number) => {
    router.push(`/product/${id}`);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.tabsContainer}>
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'men' && styles.activeTab]} 
          onPress={() => setActiveTab('men')}
        >
          <Text style={[styles.tabText, activeTab === 'men' && styles.activeTabText]}>
            Produtos Masculinos
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'women' && styles.activeTab]} 
          onPress={() => setActiveTab('women')}
        >
          <Text style={[styles.tabText, activeTab === 'women' && styles.activeTabText]}>
            Produtos Femininos
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        {loading ? (
          <View style={styles.center}>
            <ActivityIndicator size="large" color="#2563EB" />
          </View>
        ) : (
          <FlatList
            data={products}
            keyExtractor={(item) => item.id.toString()}
            numColumns={2}
            columnWrapperStyle={styles.row}
            renderItem={({ item }) => (
              <ProductCard product={item} onPress={handleProductPress} />
            )}
            showsVerticalScrollIndicator={false}
          />
        )}
      </View>
    </SafeAreaView>
  );
}

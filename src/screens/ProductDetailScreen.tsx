import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, ActivityIndicator, TouchableOpacity, Alert, ScrollView } from 'react-native';
import { useDispatch } from 'react-redux';
import { useRoute } from '@react-navigation/native';
import { getProductById } from '../api/product';
import { Product } from '../redux/types';
import { addToCart } from '../redux/actions/cartActions';
import { AppDispatch } from '../redux/store';
import Icon from 'react-native-vector-icons/FontAwesome';

interface ProductDetailRouteParams {
  productId: number;
}

const ProductDetailScreen = () => {
  const route = useRoute();
  const { productId } = route.params as ProductDetailRouteParams;
  const dispatch = useDispatch<AppDispatch>();

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDetail = async () => {
      try {
        setLoading(true);
        const data = await getProductById(productId);
        setProduct(data);
      } catch (e: any) {
        setError(e.message || 'Failed to fetch product details');
      } finally {
        setLoading(false);
      }
    };
    fetchDetail();
  }, [productId]);

  const handleAddToCart = () => {
    if (product) {
      dispatch(addToCart(product));
      Alert.alert('Success', `${product.title} added to cart!`);
    }
  };

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Loading Product Details...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centered}>
        <Text>Error: {error}</Text>
        <Text>Could not load product details. Please check your network or try again.</Text>
      </View>
    );
  }

  if (!product) {
    return (
      <View style={styles.centered}>
        <Text>Product not found.</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Image source={{ uri: product.image }} style={styles.productImage} resizeMode="contain" />
      <View style={styles.detailsContainer}>
        <Text style={styles.productTitle}>{product.title}</Text>
        <Text style={styles.productPrice}>${product.price.toFixed(2)}</Text>
        <View style={styles.ratingContainer}>
          <Text style={styles.ratingText}>Rating: {product.rating.rate} ({product.rating.count} reviews)</Text>
        </View>
        <Text style={styles.productDescription}>{product.description}</Text>

        <TouchableOpacity
          style={styles.addToCartButton}
          onPress={handleAddToCart}
        >
          <Text style={styles.addToCartButtonText}>Add to Cart</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  centered: {
    flex: 1,
    justifyContent: 'flext',
  },
  productImage: {
    width: '100%',
    height: 300,
    backgroundColor: '#f0f0f0',
  },
  detailsContainer: {
    padding: 20,
  },
  productTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  productPrice: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#007bff',
    marginBottom: 10,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  ratingText: {
    fontSize: 16,
    color: '#666',
  },
  productDescription: {
    fontSize: 16,
    lineHeight: 24,
    color: '#555',
    marginBottom: 20,
  },
  addToCartButton: {
    backgroundColor: '#28a745',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'flex-start',
  },
  addToCartButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default ProductDetailScreen;


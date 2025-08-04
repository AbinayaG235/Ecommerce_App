import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  Image,
  TouchableOpacity,
  ScrollView,
  Alert
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { RootState } from '../redux/reducers';
import {
  fetchProductsRequest,
  setActiveCategory,
} from '../redux/actions/productActions';
import { addToCart } from '../redux/actions/cartActions';
import { Product } from '../redux/types';
import { AppDispatch } from '../redux/store';

const categoryImages: { [key: string]: string } = {
  "electronics": "https://i.pinimg.com/736x/02/00/b7/0200b740f78ca6f3cb7bdab6e1114eaf.jpg",
  "jewelery": "https://i.pinimg.com/1200x/30/c7/d4/30c7d4903b2d369dc8f184daaa8561a0.jpg",
  "men's clothing": "https://i.pinimg.com/1200x/17/86/9a/17869aa87c2d0a6b3bbb80ba307b1398.jpg",
  "women's clothing": "https://i.pinimg.com/736x/e8/24/05/e82405bbee3101b11a84c7105ae07c89.jpg",
};

const HomeScreen = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigation = useNavigation();

  const { products, loading, error, activeCategory } = useSelector(
    (state: RootState) => state.products
  );

  const [productsByCategory, setProductsByCategory] = useState<Map<string, Product[]>>(new Map());
  const [uniqueCategories, setUniqueCategories] = useState<string[]>([]);

  useEffect(() => {
    dispatch(fetchProductsRequest());
  }, []);

  useEffect(() => {
    const a = null;
    const b = a.length;
    if (products.length > 0) {
      const allCategory = new Set<string>();
      const prodByCat = new Map<string, Product[]>();

      products.forEach(product => {
        const categoryName = product.category;
        allCategory.add(categoryName); 

        if (!prodByCat.has(categoryName)) {
          prodByCat.set(categoryName, []); 
        }
        prodByCat.get(categoryName)?.push(product);
      });

      setProductsByCategory(prodByCat);
      setUniqueCategories(Array.from(allCategory));
    }
  }, [products]); 

  const filteredProducts = activeCategory ? products.filter((product) => product.category === activeCategory) : products;

  const handleCategoryClick = (category: string | null) => {
    dispatch(setActiveCategory(category)); 

    const productsToLog = category
      ? productsByCategory.get(category) || []
      : products; 

    console.log(`--- Category Selected: ${category || 'All Products'} ---`);
    console.log(`No. of products : ${productsToLog.length}`);
    console.log('----------------------------------------------------');
  };

  const handleAddToCart = (product: Product) => {
    dispatch(addToCart(product));
    Alert.alert('Success', `${product.title} added to cart!`);
  };

  const renderProductItem = ({ item }: { item: Product }) => (
    <TouchableOpacity
      style={styles.productCard}
      onPress={() => navigation.navigate('ProductDetail', { productId: item.id })}
    >
      <Image source={{ uri: item.image }} style={styles.productImage} resizeMode="contain" />
      <Text style={styles.productTitle}>{item.title}</Text>
      <Text style={styles.productPrice}>${item.price.toFixed(2)}</Text>
      <TouchableOpacity
        style={styles.addToCartButton}
        onPress={() => handleAddToCart(item)}
      >
        <Text style={styles.addToCartButtonText}>Add to Cart</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );

  const renderCategoryCircle = ({ item }: { item: string }) => (
    <TouchableOpacity
      key={item}
      style={styles.categoryCircleContainer}
      onPress={() => handleCategoryClick(item)}
    >
      <View style={[
          styles.categoryCircle,
          activeCategory === item && styles.activeCategoryCircle,
      ]}>
        <Image 
          source={{ uri: categoryImages[item] || 'https://via.placeholder.com/50/CCCCCC/FFFFFF?text=?' }} 
          style={styles.categoryCircleImage} 
          resizeMode="cover"
        />
      </View>
      <Text 
        style={[
          styles.categoryCircleText,
          activeCategory === item && styles.activeCategoryCircleText,
        ]}
        numberOfLines={1}
      >
        {item}
      </Text>
    </TouchableOpacity>
  );

  if (loading && products.length === 0 && uniqueCategories.length === 0) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Loading Products and Categories data...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centered}>
        <Text>Error: {error}</Text>
        <Text>Could not load products. Please check your network or try again.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.categoryChipsContainer}
      >
        <TouchableOpacity
          style={styles.categoryCircleContainer} 
          onPress={() => handleCategoryClick(null)}
        >
          <View style={[
              styles.categoryCircle,
              activeCategory === null && styles.activeCategoryCircle,
          ]}>
            <Image 
              source={{ uri: 'https://www.techfunnel.com/wp-content/uploads/2019/07/Top-Benefits-of-ECommerce-for-Retailers-_-ECommerce-in-retail-1.png' }}
              style={styles.categoryCircleImage} 
              resizeMode="cover"
            />
          </View>
          <Text 
            style={[
              styles.categoryCircleText,
              activeCategory === null && styles.activeCategoryCircleText,
            ]}
            numberOfLines={1}
          >
            All
          </Text>
        </TouchableOpacity>
        
        <FlatList
          data={uniqueCategories}
          renderItem={renderCategoryCircle}
          keyExtractor={(item) => item}
          horizontal
          showsHorizontalScrollIndicator={false}
        />
      </ScrollView>

      <FlatList
        data={filteredProducts}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderProductItem}
        numColumns={2}
        contentContainerStyle={styles.productList}
        ListEmptyComponent={
          !loading && !error && filteredProducts.length === 0 ? (
            <View style={styles.centered}>
              <Text>No products found for this category.</Text>
            </View>
          ) : null
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  categoryChipsContainer: {
    paddingVertical: 10,
    paddingHorizontal: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    backgroundColor: '#fff',
    height: 120, 
    alignItems: 'center', 
  },
  categoryCircleContainer: {
    alignItems: 'center',
    marginHorizontal: 3,
    width: 80,
    //marginTop: -1
  },
  categoryCircle: {
    width: 60,
    height: 60,
    borderRadius: 30, 
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    overflow: 'hidden', 
  },
  activeCategoryCircle: {
    borderColor: '#007bff', 
    borderWidth: 2,
    backgroundColor: '#e6f2ff', 
  },
  categoryCircleImage: {
    width: '90%',
    height: '90%',
    borderRadius: 25, 
  },
  categoryCircleText: {
    fontSize: 12,
    fontWeight: 'bold',
    marginTop: 5,
    color: '#333',
    textAlign: 'center',
  },
  activeCategoryCircleText: {
    color: '#007bff',
  },
  productList: {
    padding: 10,
  },
  productCard: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    margin: 7,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
    minHeight: 280,
    justifyContent: 'space-between',
  },
  productImage: {
    width: '90%',
    height: 120,
    marginBottom: 10,
  },
  productTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 5,
    color: '#333',
  },
  productPrice: {
    fontSize: 17,
    fontWeight: '600',
    color: '#888',
    marginBottom: 10,
  },
  addToCartButton: {
    backgroundColor: '#28a745',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 25,
    marginTop: 10,
    alignSelf: 'stretch',
    alignItems: 'center',
  },
  addToCartButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  errorText: {
    color: 'red',
    fontSize: 16,
    textAlign: 'center',
  },
});

export default HomeScreen;

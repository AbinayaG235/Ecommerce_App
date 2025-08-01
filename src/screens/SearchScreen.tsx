import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Alert, TouchableOpacity, FlatList, Image } from 'react-native'; // Import Image
import Icon from 'react-native-vector-icons/FontAwesome';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../redux/store';
import { RootState } from '../redux/reducers';
import { setActiveCategory } from '../redux/actions/productActions';

import { useNavigation } from '@react-navigation/native';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { BottomTabParamList } from '../redux/types'; 
import { Product } from '../redux/types';


type SearchScreenNavigationProp = BottomTabNavigationProp<BottomTabParamList, 'SearchTab'>;

const SearchScreen = () => {
  const [searchText, setSearchText] = useState('');
  const dispatch = useDispatch<AppDispatch>();
  const navigation = useNavigation<SearchScreenNavigationProp>(); 

  const { products, categories, activeCategory } = useSelector(
    (state: RootState) => state.products
  );

  const handleSearch = () => {
    const normalizedSearchText = searchText.toLowerCase().trim();
    const foundCategory = categories.find(cat => cat.toLowerCase() === normalizedSearchText);

    if (foundCategory) {
      dispatch(setActiveCategory(foundCategory));

    } else {
      Alert.alert('Category Not Found', `No category matching "${searchText}" was found. Please try a different category name (e.g., electronics, jewelry).`);
      dispatch(setActiveCategory(null));
    }
  };

  const renderProductItem = ({ item }: { item: Product }) => (
    <TouchableOpacity
      style={styles.productItem}
      onPress={() => navigation.navigate('HomeTab', { screen: 'ProductDetail', params: { productId: item.id } })}
    >
      <Image source={{ uri: item.image }} style={styles.productImage} resizeMode="contain" />
      <View style={styles.productDetails}>
        <Text style={styles.productTitle}>{item.title}</Text>
        <Text style={styles.productCategory}>Category: {item.category}</Text>
        <Text style={styles.productPrice}>${item.price.toFixed(2)}</Text>
      </View>
    </TouchableOpacity>
  );

  const currentFilteredProducts = activeCategory
    ? products.filter(product => product.category === activeCategory)
    : []; 

  return (
    <View style={styles.container}>
      <View style={styles.searchBarContainer}> 
        <TextInput
          style={styles.searchInput}
          placeholder="Search category (e.g., electronics, jewelry)"
          placeholderTextColor="#999"
          value={searchText}
          onChangeText={setSearchText}
          onSubmitEditing={handleSearch}
        />
        <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
          <Icon name="search" size={20} color="#fff" />
        </TouchableOpacity>
      </View>

      {activeCategory && ( 
        <View style={styles.resultsContainer}>
          <Text style={styles.resultsHeader}>Products in "{activeCategory}":</Text>
          {currentFilteredProducts.length > 0 ? (
            <FlatList
              data={currentFilteredProducts}
              keyExtractor={(item) => item.id.toString()}
              renderItem={renderProductItem}
              style={styles.productList}
              contentContainerStyle={styles.productListContent}
            />
          ) : (
            <Text style={styles.noResultsText}>No products found in this category.</Text>
          )}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f8f8f8',
  },
  searchBarContainer: { 
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    marginBottom: 20,
  },
  searchInput: {
    flex: 1,
    height: 50, 
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 15,
    fontSize: 16,
    color: '#333',
    backgroundColor: '#fff',
    marginRight: 10, 
  },
  searchButton: {
    backgroundColor: '#007bff',
    height: 40, 
    width: 50, 
    borderRadius: 8, 
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchIcon: {
    height:8,
    width: 60,
    marginBottom:10,
    
  },
  resultsContainer: {
    marginTop: 10, 
    width: '100%',
    flex: 1,
  },
  resultsHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333',
  },
  productList: {
    flex: 1,
  },
  productListContent: {
    paddingBottom: 20,
  },
  productItem: {
    flexDirection: 'row', 
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
    alignItems: 'center', 
  },
  productImage: { 
    width: 60,
    height: 60,
    borderRadius: 5,
    marginRight: 10,
    backgroundColor: '#eee', 
  },
  productDetails: {
    flex: 1,
  },
  productTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  productCategory: {
    fontSize: 13,
    color: '#666',
    marginTop: 5,
  },
  productPrice: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#007bff',
    marginTop: 5,
  },
  noResultsText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginTop: 20,
  },
});

export default SearchScreen;

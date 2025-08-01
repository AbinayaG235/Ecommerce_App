import 'react-native-gesture-handler'; 

import React from 'react';
import { Provider } from 'react-redux';
import store from './src/redux/store';
import AppNavigator from './src/navigation/AppNavigator'; 
import SplashScreen from './src/screens/SplashScreen';
import FirstScreen from './src/screens/OnboardingScreen';
import LoginScreen from './src/screens/LoginScreen';
import { NavigationContainer } from '@react-navigation/native';
import AuthNavigator from './src/navigation/AuthNavigator';

function App(){
  return (
    <Provider store={store}>
         <AppNavigator /> 
    {/* <FirstScreen/> */}
    {/* <NavigationContainer> <LoginScreen/></NavigationContainer>  */}
           </Provider>

  );
}

export default App;

//========================

// import 'react-native-gesture-handler'; // Essential, keep at the top

// import React, { useEffect } from 'react';
// import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
// import { Provider, useDispatch, useSelector } from 'react-redux';
// import store, { AppDispatch } from './src/redux/store'; // Import store and AppDispatch
// import { fetchProductsRequest } from './src/redux/actions/productActions'; // Action to dispatch
// import { fetchCategoriesRequest } from './src/redux/actions/productActions';
// import { RootState } from './src/redux/reducers'; // Type for useSelector
// import { Product } from './src/redux/types'; // Product interface

// // This component will demonstrate the data fetching and logging
// const DataFetcherAndLogger = () => {
//   // Use AppDispatch to correctly type the dispatch function
//   const dispatch = useDispatch<AppDispatch>();
//   // Use useSelector to get products, loading, and error from Redux state
//   const { products, loading, error, categories } = useSelector((state: RootState) => state.products);

  
//   useEffect(() => {
//     console.log('--- Component (DataFetcher): Dispatching FETCH_PRODUCTS_REQUEST & FETCH_CATEGORIES_REQUEST ---');
//     dispatch(fetchProductsRequest());      // Triggers product fetching saga
//     dispatch(fetchCategoriesRequest());    // Triggers category fetching saga
//     // Make sure fetchCategoriesRequest is imported if uncommented
//     // import { fetchCategoriesRequest } from './src/redux/actions/productActions';
//   }, [dispatch]); // Dependency array ensures it runs only once on mount

//   // useEffect to log products when they are loaded or change in Redux state
//   useEffect(() => {
//     if (!loading && !error) {
//       if (products.length > 0) {
//         console.log('--- Component (DataFetcher): Products data loaded into Redux State! ---');
//         console.log('First 3 Products:', products.slice(0, 3).map(p => p.title));
//       }
//       if (categories.length > 0) {
//         console.log('--- Component (DataFetcher): Categories data loaded into Redux State! ---');
//         console.log('All Categories:', categories);
//       }
//     } else if (error) {
//         console.error('--- Component (DataFetcher): Error in Redux State ---', error);
//     }
//   }, [products, categories, loading, error]); // Re-run when these state values change


//   if (loading && products.length === 0) {
//     return (
//       <View style={styles.centered}>
//         <ActivityIndicator size="large" color="#0000ff" />
//         <Text>Loading Products and Categories...</Text>
//       </View>
//     );
//   }

//   if (error) {
//     return (
//       <View style={styles.centered}>
//         <Text style={styles.errorText}>Error: {error}</Text>
//         <Text style={styles.errorText}>Check your Metro Bundler terminal for detailed logs.</Text>
//       </View>
//     );
//   }

//   return (
//     <View style={styles.container}>
//       <Text style={styles.header}>Redux & Saga Setup Complete!</Text>
//       <Text style={styles.subHeader}>Check your Metro Bundler terminal for console logs:</Text>
//       <Text style={styles.infoText}>- Saga flow</Text>
//       <Text style={styles.infoText}>- API responses</Text>
//       <Text style={styles.infoText}>- Reducer processing</Text>
//       <Text style={styles.infoText}>- Component accessing Redux state</Text>
//       {products.length > 0 && (
//           <Text style={styles.successText}>Successfully loaded {products.length} products!</Text>
//       )}
//       {categories.length > 0 && (
//           <Text style={styles.successText}>Successfully loaded {categories.length} categories!</Text>
//       )}
//     </View>
//   );
// };

// // The root App component that wraps everything with the Redux Provider
// function App(): React.JSX.Element {
//   return (
//     <Provider store={store}>
//       <DataFetcherAndLogger />
//     </Provider>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     justifyContent: 'center',
//     alignItems: 'center',
//     padding: 20,
//   },
//   centered: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   header: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     textAlign: 'center',
//     marginBottom: 10,
//   },
//   subHeader: {
//     fontSize: 16,
//     textAlign: 'center',
//     marginBottom: 20,
//     color: '#666',
//   },
//   infoText: {
//     fontSize: 14,
//     textAlign: 'left',
//     color: '#333',
//     marginBottom: 5,
//   },
//   successText: {
//     fontSize: 16,
//     fontWeight: 'bold',
//     marginTop: 20,
//     color: 'green',
//   },
//   errorText: {
//     color: 'red',
//     fontSize: 16,
//     textAlign: 'center',
//   },
// });

// export default App;


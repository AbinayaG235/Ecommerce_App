import React, { useRef, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Dimensions, FlatList, NativeScrollEvent, NativeSyntheticEvent } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp, } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ASYNC_STORAGE_KEYS, RootStackParamList } from '../redux/types';


const { width, height } = Dimensions.get('window');

interface Slide {
  id: string;
  image: string;
  title: string;
  description: string;
}

const slides: Slide[] = [
  {
    id: '1',
    image: 'https://i.pinimg.com/736x/29/11/8b/29118b07cf389bf49edd373570fdc586.jpg',
    title: 'Welcome to Click & Connect!',
    description: 'Your one-stop destination for hassle-free online shopping. Find everything you need with ease.',
  },
  {
    id: '2',
    image: 'https://i.pinimg.com/1200x/21/1a/b8/211ab8ba4653674ffb471e5bc60bb11f.jpg',
    title: 'Real-time Tracking',
    description: 'Monitor your orders from purchase to delivery with our advanced tracking system.',
  },
  {
    id: '3',
    image: 'https://i.pinimg.com/736x/81/a0/ac/81a0ac499b68c60a8e03fbdb62ef7494.jpg',
    title: 'Fast & Secure Delivery',
    description: 'Get your products delivered quickly and safely right to your doorstep.',
  },
];

const OnboardingScreen = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef<FlatList<Slide>>(0);

  const handleGetStarted = async () => {
    try {
      await AsyncStorage.setItem(ASYNC_STORAGE_KEYS.ONBOARDING_COMPLETE, 'true');
      navigation.replace('Auth');
    } catch (e) {
      console.error('Failed to save onboarding status:', e);
    }
  };

  const renderSlide = ({ item }: { item: Slide }) => (
    <View style={styles.slide}>
      <View style={styles.slideTopSection}>
        <Image source={{ uri: item.image }} style={styles.slideImage} />
      </View>

      <View style={styles.slideBottomSection}>
        <Text style={styles.slideTitle}>{item.title}</Text>
        <Text style={styles.slideDescription}>{item.description}</Text>
      </View>
    </View>
  );

  const scrollToNext = () => {
    if (currentIndex < slides.length - 1) {
      const nextIndex = currentIndex + 1;
      flatListRef.current?.scrollToIndex({ index: nextIndex, animated: true });
      setCurrentIndex(nextIndex); 
    } else {
      handleGetStarted();
    }
  };

  const handleSkip = () => {
    handleGetStarted();
  };

  return (
    <View style={styles.container}>
      <FlatList
        ref={flatListRef}
        data={slides}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        renderItem={renderSlide}
        scrollEnabled={false}
        style={{ flex: 1 }}
      />

      
      {currentIndex < slides.length - 1 && (
        <TouchableOpacity style={styles.skipButton} onPress={handleSkip}>
          <Text style={styles.skipButtonText}>Skip</Text>
        </TouchableOpacity>
      )}

      <View style={styles.controlsContainer}>
        <View style={styles.paginationDots}>
          {slides.map((_, index) => (
            <View
              key={index}
              style={[
                styles.dot,
                currentIndex === index && styles.activeDot,
              ]}
            />
          ))}
        </View>

        <TouchableOpacity style={styles.button} onPress={scrollToNext}>
          <Text style={styles.buttonText}>
            {currentIndex === slides.length - 1 ? 'Get Started' : 'Next'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EAEDFF'
  },
  slide: {
    width: width,
    flex: 2,
    alignItems: 'center',
  },
  slideTopSection: {
    flex: 1.5,
    width: '100%',
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50,
  },
  slideImage: {
    width: width * 0.7,
    height: height * 0.3,
    marginBottom: 20,
  },
  slideBottomSection: {
    flex: 1,
    width: '100%',
    backgroundColor: '#EAEDFF',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 50,
  },
  slideDescription: {
    fontSize: 20,
    color: '#a5acd5ff',
    marginBottom: 73,
    textAlign: 'center',
  },
  slideTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#8494f4ff',
    marginBottom: 10,
    textAlign: 'center',
  },
  controlsContainer: {
    position: 'absolute',
    bottom: 30,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  paginationDots: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#ccc',
    marginHorizontal: 5,
  },
  activeDot: {
    backgroundColor: '#3377ffff', 
  },
  button: {
    backgroundColor: '#3377ffff',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 30,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 10,
    width: '80%',
    maxWidth: 300,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  skipButton: {
    position: 'absolute',
    top: 50,
    right: 20,
    //zIndex: 1, 
  },
  skipButtonText: {
    color: '#3377ffff',
    fontSize: 18,
    fontWeight: 'bold',
  }
});

export default OnboardingScreen;
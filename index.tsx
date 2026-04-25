import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, View, Animated, Image, Dimensions, Easing, Text } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import AuthScreen from './auth'; // Import file auth.tsx cùng cấp

const { height } = Dimensions.get('window');

export default function SplashScreen() {
  const [isFinished, setIsFinished] = useState(false);
  const animValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Đợi 2.5 giây ở màn hình xanh
    const timer = setTimeout(() => {
      Animated.timing(animValue, {
        toValue: 1,
        duration: 1000,
        easing: Easing.out(Easing.exp),
        useNativeDriver: true,
      }).start(() => setIsFinished(true));
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  const translateY = animValue.interpolate({
    inputRange: [0, 1],
    outputRange: [height / 2 - 100, 60],
  });

  const scale = animValue.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 0.7],
  });

  return (
    <View style={styles.container}>
      {/* Lớp Auth (Hình 2) hiện lên bên dưới */}
      <Animated.View style={[StyleSheet.absoluteFill, { opacity: animValue }]}>
        <AuthScreen hideHeader={!isFinished} />
      </Animated.View>

      {/* Lớp xanh (Hình 1) mờ dần khi logo bay lên */}
      {!isFinished && (
        <Animated.View style={[StyleSheet.absoluteFill, { 
          opacity: animValue.interpolate({ inputRange: [0, 0.8, 1], outputRange: [1, 0, 0] }),
          zIndex: 1 
        }]}>
          <LinearGradient colors={['#2E7DFF', '#E0F2FE']} style={StyleSheet.absoluteFill} />
        </Animated.View>
      )}

      {/* Cụm Logo bay */}
      {!isFinished && (
        <Animated.View style={[styles.movingBox, { transform: [{ translateY }, { scale }], zIndex: 10 }]}>
          <Image source={require('../assets/images/logo.png')} style={styles.logo} />
          <Text style={styles.appName}>Nova Travel</Text>
        </Animated.View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  movingBox: { position: 'absolute', width: '100%', alignItems: 'center' },
  logo: { width: 90, height: 90, borderRadius: 20 },
  appName: { fontSize: 30, fontWeight: 'bold', color: '#4F46E5', marginTop: 12 },
});
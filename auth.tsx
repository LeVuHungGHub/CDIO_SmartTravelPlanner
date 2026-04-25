import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView, Dimensions, SafeAreaView, StatusBar } from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { Smile } from 'lucide-react-native'; // Icon biểu trưng cho FaceID

const { width } = Dimensions.get('window');

export default function AuthScreen({ hideHeader = false }: { hideHeader?: boolean }) {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      
      <ScrollView 
        contentContainerStyle={styles.scrollContent} 
        showsVerticalScrollIndicator={false}
      >
        
        {/* --- PHẦN 1: HEADER (LOGO & APP NAME) --- */}
        
        {!hideHeader ? (
          <View style={styles.authHeader}>
            <Image source={require('../assets/images/logo.png')} style={styles.smallLogo} />
            <Text style={styles.authTitle}>Nova Travel</Text>
            <Text style={styles.authSubTitle}>Your Personal Digital Concierge</Text>
          </View>
        ) : (
          <View style={styles.headerPlaceholder} />
        )}

        {/* --- PHẦN 2: AI GENIUS CARD (HÌNH ẢNH CHÍNH) --- */}
        <View style={styles.imageCardContainer}>
          <Image 
            source={require('../assets/images/ai-genius.png')} 
            style={styles.geniusImage} 
            resizeMode="cover"
          />
          {/* Badge AI GENIUS nằm trên ảnh */}
          <View style={styles.aiBadge}>
            <Text style={styles.aiBadgeText}>AI GENIUS</Text>
          </View>
        </View>

        {/* --- PHẦN 3: TEXT CONTENT (TIÊU ĐỀ & MÔ TẢ) --- */}
        <View style={styles.textSection}>
          <Text style={styles.featureTitle}>Intelligent Itineraries</Text>
          <Text style={styles.featureDesc}>
            Our AI concierge crafts personalized journeys based on your unique travel style and preferences.
          </Text>
          
          {/* Pagination dots (Chỉ báo trang) */}
          <View style={styles.pagination}>
            <View style={styles.dotActive} />
            <View style={styles.dot} />
            <View style={styles.dot} />
          </View>
        </View>

        {/* --- PHẦN 4: BUTTONS (SOCIAL & EMAIL) --- */}
        <View style={styles.buttonGroup}>
          <View style={styles.socialRow}>
            {/* Nút Google */}
            <TouchableOpacity style={styles.socialBtn}>
              <Image source={{ uri: 'https://img.icons8.com/color/48/google-logo.png' }} style={styles.socialIcon} />
              <Text style={styles.socialText}>Google</Text>
            </TouchableOpacity>
            
            {/* Nút Apple */}
            <TouchableOpacity style={styles.socialBtn}>
              <Image source={{ uri: 'https://img.icons8.com/ios-filled/50/apple-logo.png' }} style={styles.socialIcon} />
              <Text style={styles.socialText}>Apple</Text>
            </TouchableOpacity>
          </View>

          {/* Nút Continue with Email - Chuyển sang màn hình Login */}
          <TouchableOpacity 
            style={styles.emailBtn} 
            activeOpacity={0.8}
            onPress={() => router.push('/login')} 
          >
            <LinearGradient 
              colors={['#4F46E5', '#6366F1']} 
              start={{ x: 0, y: 0 }} 
              end={{ x: 1, y: 0 }} 
              style={styles.gradientBtn}
            >
              <Text style={styles.emailBtnText}>Continue with Email</Text>
            </LinearGradient>
          </TouchableOpacity>

          {/* Quick Access FaceID */}
          <TouchableOpacity style={styles.faceIdBtn}>
            <View style={styles.faceIdContainer}>
                <Smile color="#4F46E5" size={18} style={styles.faceIdIcon} />
                <Text style={styles.faceIdText}>QUICK ACCESS WITH FACEID</Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* --- PHẦN 5: FOOTER (CREATE ACCOUNT) --- */}
        <View style={styles.footerSection}>
            <Text style={styles.footerText}>
                Don't have an account?{' '}
                <Text 
                    style={styles.linkText} 
                    onPress={() => router.push('/register')}
                >
                    Create Account
                </Text>
            </Text>
            
            <Text style={styles.termsText}>
                By continuing, you agree to our <Text style={styles.termsUnderline}>Terms of Service</Text> and Privacy Policy.
            </Text>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFFF' },
  scrollContent: { alignItems: 'center', paddingHorizontal: 25, paddingBottom: 40 },
  
  // Header
  authHeader: { alignItems: 'center', marginTop: 10, marginBottom: 10 },
  headerPlaceholder: { height: 160 }, 
  smallLogo: { width: 56, height: 56, borderRadius: 14 },
  authTitle: { fontSize: 24, fontWeight: 'bold', color: '#1E1B4B', marginTop: 10 },
  authSubTitle: { fontSize: 12, color: '#6B7280' },

  // AI Card
  imageCardContainer: { 
    width: '100%', 
    height: width * 0.75, 
    marginTop: 20, 
    borderRadius: 28, 
    overflow: 'hidden',
    backgroundColor: '#F3F4F6',
    elevation: 5, // Đổ bóng cho Android
    shadowColor: '#000', // Đổ bóng cho iOS
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
  },
  geniusImage: { width: '100%', height: '100%' },
  aiBadge: { 
    position: 'absolute', 
    bottom: 16, 
    left: 16, 
    backgroundColor: 'rgba(255,255,255,0.7)', 
    paddingHorizontal: 10, 
    paddingVertical: 5, 
    borderRadius: 8 
  },
  aiBadgeText: { color: '#4F46E5', fontSize: 10, fontWeight: 'bold' },

  // Text Content
  textSection: { alignItems: 'center', marginTop: 25 },
  featureTitle: { fontSize: 22, fontWeight: 'bold', color: '#1E1B4B' },
  featureDesc: { textAlign: 'center', color: '#6B7280', marginTop: 8, lineHeight: 20, fontSize: 14 },
  pagination: { flexDirection: 'row', marginTop: 18 },
  dotActive: { width: 24, height: 5, borderRadius: 3, backgroundColor: '#4F46E5', marginHorizontal: 3 },
  dot: { width: 5, height: 5, borderRadius: 3, backgroundColor: '#E5E7EB', marginHorizontal: 3 },

  // Buttons
  buttonGroup: { width: '100%', marginTop: 25 },
  socialRow: { flexDirection: 'row', justifyContent: 'space-between' },
  socialBtn: { 
    width: '48%', 
    height: 52, 
    borderWidth: 1, 
    borderColor: '#F3F4F6', 
    borderRadius: 15, 
    flexDirection: 'row',
    justifyContent: 'center', 
    alignItems: 'center',
    backgroundColor: '#FFFFFF'
  },
  socialIcon: { width: 18, height: 18, marginRight: 8 },
  socialText: { fontWeight: '600', color: '#1F2937', fontSize: 14 },
  
  emailBtn: { width: '100%', height: 56, marginTop: 15, borderRadius: 16, overflow: 'hidden' },
  gradientBtn: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  emailBtnText: { color: '#FFF', fontWeight: 'bold', fontSize: 16 },
  
  faceIdBtn: { alignItems: 'center', marginTop: 18 },
  faceIdContainer: { flexDirection: 'row', alignItems: 'center' },
  faceIdIcon: { marginRight: 6 },
  faceIdText: { fontSize: 10, color: '#4F46E5', fontWeight: 'bold', letterSpacing: 0.5 },

  // Footer
  footerSection: { marginTop: 30, alignItems: 'center' },
  footerText: { color: '#6B7280', fontSize: 13 },
  linkText: { color: '#4F46E5', fontWeight: 'bold' },
  termsText: { color: '#9CA3AF', fontSize: 10, textAlign: 'center', marginTop: 15, paddingHorizontal: 20 },
  termsUnderline: { textDecorationLine: 'underline' }
});
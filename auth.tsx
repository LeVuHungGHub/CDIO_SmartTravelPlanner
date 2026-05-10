import React, { useEffect } from 'react';
import { 
  StyleSheet, Text, View, Image, TouchableOpacity, ScrollView, 
  Dimensions, SafeAreaView, StatusBar, Platform 
} from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { Smile } from 'lucide-react-native';
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';
import * as AuthSession from 'expo-auth-session';

// Quan trọng: Phải có dòng này để trình duyệt đóng lại sau khi auth xong
WebBrowser.maybeCompleteAuthSession();

const { width } = Dimensions.get('window');


const BACKEND_URL = 'http://192.168.1.201:3000'; 

export default function AuthScreen({ hideHeader = false }: { hideHeader?: boolean }) {
  const router = useRouter();

  // Cấu hình Google Auth mới
  const [request, response, promptAsync] = Google.useAuthRequest({
    // Sử dụng ID phù hợp cho từng nền tảng Nhi đã tạo trên Google Console
    webClientId: "385744266977-hhbgmif37vs73f5pfrp3v6ifi0v7319i.apps.googleusercontent.com",
    androidClientId: "385744266977-jr0e107b9f3r3fp0ttv20ffodq399rgo.apps.googleusercontent.com",
    iosClientId: "385744266977-dfmdjo8o9ij8a60fivh1k17lti6d1vrc.apps.googleusercontent.com",
    
    // Sử dụng scheme đã khai báo trong app.json
    redirectUri: 'https://auth.expo.io/@tuancuong/NovaTravel',
    
  });

  useEffect(() => {
    // Xử lý khi có phản hồi từ Google
    if (response?.type === 'success') {
      const { authentication } = response;
      if (authentication?.accessToken) {
        console.log("Đăng nhập thành công!");
        
        // 1. Lấy thông tin user từ Google và lưu vào DB
        fetchUserInfo(authentication.accessToken);
        
        // 2. Chuyển hướng ngay lập tức về trang Home
        router.replace('/home'); 
      }
    } else if (response?.type === 'error') {
      console.log("Lỗi đăng nhập:", response.error);
    }
  }, [response]);

  const fetchUserInfo = async (token: string) => {
    try {
      const res = await fetch('https://www.googleapis.com/userinfo/v2/me', {
        headers: { Authorization: `Bearer ${token}` },
      });
      const user = await res.json();
      saveUserToDatabase(user);
    } catch (error) {
      console.log("Lỗi lấy thông tin Google:", error);
    }
  };

  const saveUserToDatabase = async (userData: any) => {
    try {
      // Nhớ kiểm tra port (ví dụ :3000) của Backend nhé
      await fetch(`${BACKEND_URL}/api/auth/google`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: userData.email,
          fullName: userData.name,
          socialId: userData.id
        }),
      });
    } catch (error) {
      console.log("Lỗi kết nối Backend:", error);
    }
  };

  // --- GIỮ NGUYÊN TOÀN BỘ GIAO DIỆN CỦA NHI ---
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />
      
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {!hideHeader ? (
          <View style={styles.authHeader}>
            <Image source={require('../assets/images/logo.png')} style={styles.smallLogo} />
            <Text style={styles.authTitle}>Nova Travel</Text>
            <Text style={styles.authSubTitle}>Your Personal Digital Concierge</Text>
          </View>
        ) : <View style={styles.headerPlaceholder} />}

        <View style={styles.imageCardContainer}>
          <Image source={require('../assets/images/ai-genius.png')} style={styles.geniusImage} resizeMode="cover" />
          <View style={styles.aiBadge}><Text style={styles.aiBadgeText}>AI GENIUS</Text></View>
        </View>

        <View style={styles.textSection}>
          <Text style={styles.featureTitle}>Intelligent Itineraries</Text>
          <Text style={styles.featureDesc}>
            Our AI concierge crafts personalized journeys based on your unique travel style and preferences.
          </Text>
        </View>

        <View style={styles.buttonGroup}>
          <View style={styles.socialRow}>
            <TouchableOpacity 
              style={styles.socialBtn} 
              onPress={() => promptAsync()} 
              disabled={!request}
            >
              <Image source={{ uri: 'https://img.icons8.com/color/48/google-logo.png' }} style={styles.socialIcon} />
              <Text style={styles.socialText}>Google</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.socialBtn}>
              <Image source={{ uri: 'https://img.icons8.com/ios-filled/50/apple-logo.png' }} style={styles.socialIcon} />
              <Text style={styles.socialText}>Apple</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity 
            style={styles.emailBtn} 
            activeOpacity={0.8} 
            onPress={() => router.push('/login')}
          >
            <LinearGradient colors={['#4F46E5', '#6366F1']} style={styles.gradientBtn}>
              <Text style={styles.emailBtnText}>Continue with Email</Text>
            </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity style={styles.faceIdBtn}>
            <View style={styles.faceIdContainer}>
              <Smile color="#4F46E5" size={18} style={styles.faceIdIcon} />
              <Text style={styles.faceIdText}>QUICK ACCESS WITH FACEID</Text>
            </View>
          </TouchableOpacity>
        </View>

        <View style={styles.footerSection}>
          <Text style={styles.footerText}>
            Don't have an account? <Text style={styles.linkText} onPress={() => router.push('/register')}>Create Account</Text>
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

// --- GIỮ NGUYÊN TOÀN BỘ STYLES CỦA NHI ---
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFFF', paddingTop: Platform.OS === 'android' ? (StatusBar.currentHeight ?? 0) : 0 },
  scrollContent: { alignItems: 'center', paddingHorizontal: 25, paddingBottom: 40, paddingTop: 20 },
  authHeader: { alignItems: 'center', marginBottom: 10 },
  headerPlaceholder: { height: 160 }, 
  smallLogo: { width: 56, height: 56, borderRadius: 14 },
  authTitle: { fontSize: 24, fontWeight: 'bold', color: '#1E1B4B', marginTop: 10 },
  authSubTitle: { fontSize: 12, color: '#6B7280' },
  imageCardContainer: { width: '100%', height: width * 0.75, marginTop: 20, borderRadius: 28, overflow: 'hidden', backgroundColor: '#F3F4F6', elevation: 5 },
  geniusImage: { width: '100%', height: '100%' },
  aiBadge: { position: 'absolute', bottom: 16, left: 16, backgroundColor: 'rgba(255,255,255,0.7)', padding: 5, borderRadius: 8 },
  aiBadgeText: { color: '#4F46E5', fontSize: 10, fontWeight: 'bold' },
  textSection: { alignItems: 'center', marginTop: 25 },
  featureTitle: { fontSize: 22, fontWeight: 'bold', color: '#1E1B4B' },
  featureDesc: { textAlign: 'center', color: '#6B7280', marginTop: 8, fontSize: 14 },
  buttonGroup: { width: '100%', marginTop: 25 },
  socialRow: { flexDirection: 'row', justifyContent: 'space-between' },
  socialBtn: { width: '48%', height: 52, borderWidth: 1, borderColor: '#F3F4F6', borderRadius: 15, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' },
  socialIcon: { width: 18, height: 18, marginRight: 8 },
  socialText: { fontWeight: '600', color: '#1F2937' },
  emailBtn: { width: '100%', height: 56, marginTop: 15, borderRadius: 16, overflow: 'hidden' },
  gradientBtn: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  emailBtnText: { color: '#FFF', fontWeight: 'bold', fontSize: 16 },
  faceIdBtn: { alignItems: 'center', marginTop: 18 },
  faceIdContainer: { flexDirection: 'row', alignItems: 'center' },
  faceIdIcon: { marginRight: 6 },
  faceIdText: { fontSize: 10, color: '#4F46E5', fontWeight: 'bold' },
  footerSection: { marginTop: 30, alignItems: 'center' },
  footerText: { color: '#6B7280', fontSize: 13 },
  linkText: { color: '#4F46E5', fontWeight: 'bold' },
});
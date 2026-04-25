import React, { useState } from 'react';
import { 
  StyleSheet, Text, View, TextInput, TouchableOpacity, 
  SafeAreaView, Platform, StatusBar, ScrollView, Image 
} from 'react-native';
import { useRouter } from 'expo-router';
// Import các icon cần thiết
import { ChevronLeft, User, Mail, Lock, Phone, Eye, EyeOff } from 'lucide-react-native';

export default function RegisterScreen() {
  const router = useRouter();
  const [showPass, setShowPass] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  return (
    <View style={styles.mainContainer}>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={styles.safeArea}>
        
        {/* Header có nút Back */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <ChevronLeft color="#1e293b" size={30} />
          </TouchableOpacity>
        </View>

        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
          
          {/* 1. THÊM LOGO Ở ĐẦU */}
          <View style={styles.logoSection}>
            <Image source={require('../assets/images/logo.png')} style={styles.logo} />
            <Text style={styles.NameLogo}>Nova Travel</Text>
            <Text style={styles.title}>Create Account</Text>
            <Text style={styles.subtitle}>Fill your information below to get started</Text>
          </View>

          {/* 2. CÁC Ô NHẬP LIỆU (Đã sửa lỗi gạch đỏ bằng cách gộp style chuẩn) */}
          <View style={styles.form}>
            {/* Full Name */}
            <View style={styles.inputBox}>
              <User color="#94a3b8" size={20} />
              <TextInput placeholder="Full Name" style={styles.input} placeholderTextColor="#94a3b8" />
            </View>

            {/* Phone Number */}
            <View style={styles.inputBox}>
              <Phone color="#94a3b8" size={20} />
              <TextInput placeholder="Phone Number" style={styles.input} keyboardType="phone-pad" placeholderTextColor="#94a3b8" />
            </View>

            {/* Email */}
            <View style={styles.inputBox}>
              <Mail color="#94a3b8" size={20} />
              <TextInput placeholder="Email Address" style={styles.input} keyboardType="email-address" placeholderTextColor="#94a3b8" />
            </View>

            {/* Password */}
            <View style={styles.inputBox}>
              <Lock color="#94a3b8" size={20} />
              <TextInput 
                placeholder="Password" 
                style={styles.input} 
                secureTextEntry={!showPass} 
                placeholderTextColor="#94a3b8" 
              />
              <TouchableOpacity onPress={() => setShowPass(!showPass)}>
                {showPass ? <EyeOff color="#94a3b8" size={20} /> : <Eye color="#94a3b8" size={20} />}
              </TouchableOpacity>
            </View>

            {/* Confirm Password */}
            <View style={styles.inputBox}>
              <Lock color="#94a3b8" size={20} />
              <TextInput 
                placeholder="Confirm Password" 
                style={styles.input} 
                secureTextEntry={!showConfirm} 
                placeholderTextColor="#94a3b8" 
              />
              <TouchableOpacity onPress={() => setShowConfirm(!showConfirm)}>
                {showConfirm ? <EyeOff color="#94a3b8" size={20} /> : <Eye color="#94a3b8" size={20} />}
              </TouchableOpacity>
            </View>
          </View>

          {/* Nút Sign Up */}
          <TouchableOpacity style={styles.btnSignUp}>
            <Text style={styles.btnText}>Sign Up</Text>
          </TouchableOpacity>

          {/* 3. LOGO GMAIL & APPLE */}
          <View style={styles.socialSection}>
            <View style={styles.divider}>
              <View style={styles.line} />
              <Text style={styles.dividerText}>Or register with</Text>
              <View style={styles.line} />
            </View>

            <View style={styles.socialBtns}>
              <TouchableOpacity style={styles.socialItem}>
                <Image source={{ uri: 'https://cdn-icons-png.flaticon.com/512/2991/2991148.png' }} style={styles.iconSm} />
                <Text style={styles.socialText}>Google</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.socialItem}>
                <Image source={{ uri: 'https://cdn-icons-png.flaticon.com/512/0/747.png' }} style={styles.iconSm} />
                <Text style={styles.socialText}>Apple</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Footer Link */}
          <View style={styles.footer}>
            <Text style={styles.footerText}>Already have an account? </Text>
            <TouchableOpacity onPress={() => router.push('/login')}>
              <Text style={styles.loginLink}>Log In</Text>
            </TouchableOpacity>
          </View>

        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: { flex: 1, backgroundColor: '#fff' },
  safeArea: { flex: 1, paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0 },
  header: { paddingHorizontal: 10, paddingVertical: 10 },
  backButton: { width: 50, height: 50, justifyContent: 'center' },
  scrollContent: { paddingHorizontal: 25, paddingBottom: 40 },
  
  // LOGO
  logoSection: { alignItems: 'center', marginBottom: 30 },
  logoCircle: { width: 100, height: 100, borderRadius: 50, backgroundColor: '#F8FAFC', justifyContent: 'center', alignItems: 'center', marginBottom: 20 },
  logoImg: { width: 60, height: 60, resizeMode: 'contain' },
  NameLogo: {fontSize: 24, fontWeight: '800', color: '#1e293b'},
  title: { fontSize: 35, fontWeight: '800', color: '#1e293b' },
  subtitle: { fontSize: 15, color: '#64748b', marginTop: 5 },
  logo: { width: 90, height: 90, borderRadius: 20 },

  // FORM
  form: { marginTop: 10 },
  inputBox: { 
    flexDirection: 'row', alignItems: 'center', backgroundColor: '#F8FAFC', 
    height: 60, borderRadius: 16, paddingHorizontal: 15, marginBottom: 15,
    borderWidth: 1, borderColor: '#F1F5F9' 
  },
  input: { flex: 1, marginLeft: 10, fontSize: 16, color: '#1e293b', fontWeight: '500' },
  
  btnSignUp: { 
    backgroundColor: '#4F46E5', height: 60, borderRadius: 16, 
    justifyContent: 'center', alignItems: 'center', marginTop: 10,
    shadowColor: '#4F46E5', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.2, shadowRadius: 8, elevation: 5
  },
  btnText: { color: '#fff', fontSize: 16, fontWeight: '700' },

  // SOCIAL
  socialSection: { marginTop: 30 },
  divider: { flexDirection: 'row', alignItems: 'center', marginBottom: 25 },
  line: { flex: 1, height: 1, backgroundColor: '#F1F5F9' },
  dividerText: { marginHorizontal: 10, color: '#94a3b8', fontSize: 14 },
  socialBtns: { flexDirection: 'row', justifyContent: 'space-between' },
  socialItem: { 
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center', 
    width: '48%', height: 56, borderRadius: 16, borderWidth: 1, borderColor: '#F1F5F9' 
  },
  iconSm: { width: 20, height: 20, marginRight: 10 },
  socialText: { fontSize: 15, fontWeight: '600', color: '#1e293b' },

  footer: { flexDirection: 'row', justifyContent: 'center', marginTop: 35 },
  footerText: { color: '#64748b', fontSize: 14 },
  loginLink: { color: '#4F46E5', fontSize: 14, fontWeight: '700', textDecorationLine: 'underline' }
});
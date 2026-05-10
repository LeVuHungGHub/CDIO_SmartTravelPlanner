import React, { useState } from 'react';
import { 
  StyleSheet, Text, View, TextInput, TouchableOpacity, 
  Platform, StatusBar, ScrollView, Image, Alert, ActivityIndicator 
} from 'react-native';
import { useRouter } from 'expo-router';
import { ChevronLeft, User, Mail, Lock, Phone, Eye, EyeOff } from 'lucide-react-native';

// Tính toán chiều cao thanh trạng thái để đệm thủ công
const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 44 : StatusBar.currentHeight || 0;

export default function RegisterScreen() {
  const router = useRouter();
  
  const [showPass, setShowPass] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSignUp = async () => {
    // 1. Kiểm tra đầu vào
    if (!fullName || !phone || !email || !password || !confirmPassword) {
      Alert.alert("Thông báo", "điền thiếu thông tin !");
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert("Lỗi", "Mật khẩu xác nhận không khớp!");
      return;
    }

    setLoading(true);
    try {
      // Gọi API với IP Server của Nhi
      const response = await fetch('http://192.168.1.201:3000/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fullName, phone, email, password }),
      });

      const data = await response.json();

      if (data.success) {
        Alert.alert("Thành công", "Đăng ký tài khoản mới thành công rồi nhé!", [
          { text: "Đăng nhập ngay", onPress: () => router.push('/login') }
        ]);
      } else {
        Alert.alert("Thất bại", data.message || "Có lỗi gì đó rồi.");
      }
    } catch (error) {
      console.error(error);
      Alert.alert("Lỗi kết nối", "Không kết nối được đến Server. kiểm tra lại Node.js và Wi-Fi nhé!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.mainContainer}>
      {/* 
         Thiết lập StatusBar trong suốt để giao diện tràn lên trên, 
         sau đó dùng View đệm (statusBarPad) để đẩy nội dung xuống.
      */}
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />
      <View style={styles.statusBarPad} />
      
      {/* Header với nút Back */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <ChevronLeft color="#1e293b" size={30} />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        
        {/* Logo & Tiêu đề */}
        <View style={styles.logoSection}>
          <Image source={require('../assets/images/logo.png')} style={styles.logo} />
          <Text style={styles.NameLogo}>Nova Travel</Text>
          <Text style={styles.title}>Create Account</Text>
          <Text style={styles.subtitle}>Fill your information below to get started</Text>
        </View>

        {/* Form nhập liệu */}
        <View style={styles.form}>
          <View style={styles.inputBox}>
            <User color="#94a3b8" size={20} />
            <TextInput 
              placeholder="Full Name" 
              style={styles.input} 
              placeholderTextColor="#94a3b8"
              value={fullName}
              onChangeText={setFullName} 
            />
          </View>

          <View style={styles.inputBox}>
            <Phone color="#94a3b8" size={20} />
            <TextInput 
              placeholder="Phone Number" 
              style={styles.input} 
              keyboardType="phone-pad" 
              placeholderTextColor="#94a3b8"
              value={phone}
              onChangeText={setPhone} 
            />
          </View>

          <View style={styles.inputBox}>
            <Mail color="#94a3b8" size={20} />
            <TextInput 
              placeholder="Email Address" 
              style={styles.input} 
              keyboardType="email-address" 
              placeholderTextColor="#94a3b8"
              value={email}
              onChangeText={setEmail}
              autoCapitalize="none"
            />
          </View>

          <View style={styles.inputBox}>
            <Lock color="#94a3b8" size={20} />
            <TextInput 
              placeholder="Password" 
              style={styles.input} 
              secureTextEntry={!showPass} 
              placeholderTextColor="#94a3b8" 
              value={password}
              onChangeText={setPassword}
            />
            <TouchableOpacity onPress={() => setShowPass(!showPass)}>
              {showPass ? <EyeOff color="#94a3b8" size={20} /> : <Eye color="#94a3b8" size={20} />}
            </TouchableOpacity>
          </View>

          <View style={styles.inputBox}>
            <Lock color="#94a3b8" size={20} />
            <TextInput 
              placeholder="Confirm Password" 
              style={styles.input} 
              secureTextEntry={!showConfirm} 
              placeholderTextColor="#94a3b8" 
              value={confirmPassword}
              onChangeText={setConfirmPassword}
            />
            <TouchableOpacity onPress={() => setShowConfirm(!showConfirm)}>
              {showConfirm ? <EyeOff color="#94a3b8" size={20} /> : <Eye color="#94a3b8" size={20} />}
            </TouchableOpacity>
          </View>
        </View>

        {/* Nút Đăng ký */}
        <TouchableOpacity 
          style={[styles.btnSignUp, loading && { opacity: 0.7 }]} 
          onPress={handleSignUp}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.btnText}>Sign Up</Text>
          )}
        </TouchableOpacity>

        {/* Đăng ký bằng MXH */}
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

        {/* Footer chuyển màn hình */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>Already have an account? </Text>
          <TouchableOpacity onPress={() => router.push('/login')}>
            <Text style={styles.loginLink}>Log In</Text>
          </TouchableOpacity>
        </View>

      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: { flex: 1, backgroundColor: '#fff' },
  statusBarPad: { 
    height: STATUSBAR_HEIGHT, 
    backgroundColor: '#fff' 
  },
  header: { 
    paddingHorizontal: 20, 
    height: 50, 
    justifyContent: 'center' 
  },
  backButton: { width: 40, height: 40, justifyContent: 'center' },
  scrollContent: { paddingHorizontal: 25, paddingBottom: 40 },
  logoSection: { alignItems: 'center', marginTop: 10 },
  logo: { width: 70, height: 70, resizeMode: 'contain' },
  NameLogo: { fontSize: 20, fontWeight: 'bold', color: '#4F46E5', marginTop: 5 },
  title: { fontSize: 26, fontWeight: 'bold', color: '#1e293b', marginTop: 15 },
  subtitle: { fontSize: 14, color: '#64748b', marginTop: 5, textAlign: 'center' },
  form: { marginTop: 25 },
  inputBox: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    backgroundColor: '#f8fafc', 
    paddingHorizontal: 15, 
    borderRadius: 12, 
    marginBottom: 12, 
    height: 55,
    borderWidth: 1,
    borderColor: '#e2e8f0'
  },
  input: { flex: 1, marginLeft: 10, color: '#1e293b', fontSize: 15 },
  btnSignUp: { 
    backgroundColor: '#4F46E5', 
    height: 55, 
    borderRadius: 12, 
    justifyContent: 'center', 
    alignItems: 'center', 
    marginTop: 15,
    elevation: 4,
    shadowColor: '#4F46E5',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  btnText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
  socialSection: { marginTop: 25 },
  divider: { flexDirection: 'row', alignItems: 'center', marginBottom: 20 },
  line: { flex: 1, height: 1, backgroundColor: '#e2e8f0' },
  dividerText: { marginHorizontal: 10, color: '#94a3b8', fontSize: 13 },
  socialBtns: { flexDirection: 'row', justifyContent: 'space-between' },
  socialItem: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'center', 
    width: '48%', 
    height: 50, 
    borderWidth: 1, 
    borderColor: '#e2e8f0', 
    borderRadius: 12 
  },
  iconSm: { width: 20, height: 20, marginRight: 10 },
  socialText: { fontSize: 14, fontWeight: '600', color: '#1e293b' },
  footer: { flexDirection: 'row', justifyContent: 'center', marginTop: 25 },
  footerText: { color: '#64748b', fontSize: 14 },
  loginLink: { color: '#4F46E5', fontSize: 14, fontWeight: 'bold' }
});
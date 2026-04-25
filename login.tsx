import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, SafeAreaView, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { ChevronLeft, Mail, Lock, Eye, EyeOff } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default function LoginScreen() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = () => {
  if (email === 'admin@gmail.com' && password === '12345') {
    // Thay thế màn hình hiện tại bằng màn hình Home
    router.replace('/home'); 
  } else {
    Alert.alert('Thất bại', 'Email hoặc mật khẩu không chính xác.');
  }
};

  return (
    <SafeAreaView style={styles.container}>
      {/* Nút Back */}
      <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
        <ChevronLeft color="#1E1B4B" size={28} />
      </TouchableOpacity>

      <View style={styles.content}>
        <Text style={styles.title}>Welcome Back</Text>
        <Text style={styles.subtitle}>Please enter your details to sign in</Text>

        {/* Input Email */}
        <View style={styles.inputWrapper}>
          <Mail color="#9CA3AF" size={20} />
          <TextInput 
            placeholder="Email" 
            style={styles.input} 
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>

        {/* Input Password */}
        <View style={styles.inputWrapper}>
          <Lock color="#9CA3AF" size={20} />
          <TextInput 
            placeholder="Password" 
            style={styles.input} 
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!showPassword}
          />
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            {showPassword ? <EyeOff color="#9CA3AF" size={20} /> : <Eye color="#9CA3AF" size={20} />}
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.forgotBtn}>
          <Text style={styles.forgotText}>Forgot Password?</Text>
        </TouchableOpacity>

        {/* Nút Login */}
        <TouchableOpacity style={styles.loginBtn} onPress={handleLogin}>
          <LinearGradient colors={['#4F46E5', '#6366F1']} style={styles.gradient}>
            <Text style={styles.loginText}>Sign In</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  backBtn: { padding: 20 },
  content: { paddingHorizontal: 25, marginTop: 20 },
  title: { fontSize: 30, fontWeight: 'bold', color: '#1E1B4B' },
  subtitle: { fontSize: 15, color: '#6B7280', marginTop: 8, marginBottom: 40 },
  inputWrapper: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    backgroundColor: '#F9FAFB', 
    height: 60, 
    borderRadius: 16, 
    paddingHorizontal: 15, 
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#F3F4F6'
  },
  input: { flex: 1, marginLeft: 12, fontSize: 15 },
  forgotBtn: { alignSelf: 'flex-end', marginBottom: 30 },
  forgotText: { color: '#4F46E5', fontWeight: '600' },
  loginBtn: { height: 60, borderRadius: 18, overflow: 'hidden' },
  gradient: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  loginText: { color: '#fff', fontSize: 18, fontWeight: 'bold' }
});
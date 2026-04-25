import React, { useState, useRef } from 'react';
import {
  StyleSheet, Text, View, TextInput, TouchableOpacity,
  FlatList, KeyboardAvoidingView, Platform, 
  ActivityIndicator, StatusBar, Image
} from 'react-native';
// Sử dụng SafeAreaView chuẩn để hết cảnh báo vàng
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons'; 
import Groq from "groq-sdk";

const groq = new Groq({ 
  apiKey: "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",
  dangerouslyAllowBrowser: true 
});

const COLORS = {
  primary: '#5A4AF4',
  bg: '#F6F8FB',
  white: '#ffffff',
  aiBubble: '#ffffff',
  userBubble: '#5A4AF4',
  textAI: '#1A1A1A',
  textUser: '#ffffff',
  border: '#E8EDF2',
};

export default function NovaChatScreen() {
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState([
    { id: 'start', text: "Chào bạn! Mình là NovaAI từ NovaTravel. Mọi thứ đã sẵn sàng, chúng ta bắt đầu nhé!", sender: 'ai' }
  ]);

  const flatListRef = useRef<FlatList>(null);

  const handleSend = async () => {
    if (!inputText.trim() || isLoading) return;
    
    const uniqueId = `m-${Date.now()}`;
    setMessages(prev => [...prev, { id: uniqueId, text: inputText, sender: 'user' }]);
    const currentInput = inputText;
    setInputText('');
    setIsLoading(true);

    try {
      const chatCompletion = await groq.chat.completions.create({
        messages: [{ role: "user", content: currentInput }],
        model: "llama-3.1-8b-instant", 
      });

      const aiText = chatCompletion.choices[0]?.message?.content || "Nova chưa nhận được phản hồi...";
      setMessages(prev => [...prev, { id: `ai-${Date.now()}`, text: aiText, sender: 'ai' }]);
    } catch (error) {
      setMessages(prev => [...prev, { id: `err-${Date.now()}`, text: "Lỗi kết nối API!", sender: 'ai' }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.white} />
      
      {/* HEADER CHUẨN */}
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <Image 
            source={require('../assets/images/logo.png')} style={styles.logo}
            
            resizeMode="contain"
          />
          <Text style={styles.headerTitle}>NovaTravel AI</Text>
        </View>
      </View>

      {/* FIX LỖI CHE THANH CHAT: Dùng behavior='height' cho Android */}
      <KeyboardAvoidingView 
        style={{ flex: 1 }} 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20} 
      >
        <FlatList
          ref={flatListRef}
          data={messages}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.chatContent}
          // FIX LỖI CUỘN: Kết hợp maintain và timeout
          maintainVisibleContentPosition={{ minIndexForVisible: 0 }}
          onContentSizeChange={() => {
            if (messages.length > 0) {
              setTimeout(() => {
                flatListRef.current?.scrollToEnd({ animated: true });
              }, 200); 
            }
          }}
          renderItem={({ item }) => (
            <View style={[styles.messageRow, item.sender === 'user' ? styles.userRow : styles.aiRow]}>
              {item.sender === 'ai' && (
                <View style={styles.aiAvatar}><Text style={styles.avatarText}>N</Text></View>
              )}
              <View style={[styles.bubble, item.sender === 'ai' ? styles.aiBubble : styles.userBubble]}>
                <Text style={[styles.messageText, item.sender === 'ai' ? styles.aiText : styles.userText]}>
                  {item.text}
                </Text>
              </View>
            </View>
          )}
        />
        
        {isLoading && <ActivityIndicator color={COLORS.primary} style={{ marginBottom: 10 }} />}

        {/* Ô NHẬP LIỆU: Đã bỏ absolute để không bị che */}
        <View style={styles.inputContainer}>
          <View style={styles.inputWrapper}>
            <TextInput 
              style={styles.textInput} 
              value={inputText} 
              onChangeText={setInputText} 
              placeholder="Hỏi Nova..."
              placeholderTextColor="#9EA6B5"
              multiline
            />
            <TouchableOpacity onPress={handleSend} style={styles.sendButton} disabled={!inputText.trim()}>
              <Ionicons 
                name="arrow-up-circle" 
                size={38} 
                color={inputText.trim() ? COLORS.primary : '#D1D7E0'} 
              />
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.bg },
  header: { 
    height: 60,
    backgroundColor: COLORS.white, 
    justifyContent: 'center',
    alignItems: 'center', 
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  headerContent: { flexDirection: 'row', alignItems: 'center' },
  logo: { width: 28, height: 28, marginRight: 8 },
  headerTitle: { fontSize: 18, fontWeight: '700', color: '#1A1A1A' },
  
  chatContent: { paddingHorizontal: 15, paddingTop: 10, paddingBottom: 20 },
  messageRow: { flexDirection: 'row', marginBottom: 16, maxWidth: '85%' },
  userRow: { alignSelf: 'flex-end', flexDirection: 'row-reverse' },
  aiRow: { alignSelf: 'flex-start' },
  aiAvatar: { width: 32, height: 32, borderRadius: 16, backgroundColor: '#E0DEFF', alignItems: 'center', justifyContent: 'center', marginRight: 8 },
  avatarText: { color: COLORS.primary, fontWeight: 'bold' },
  bubble: { paddingHorizontal: 16, paddingVertical: 12, borderRadius: 20 },
  aiBubble: { backgroundColor: COLORS.aiBubble, borderTopLeftRadius: 4, borderWidth: 1, borderColor: COLORS.border },
  userBubble: { backgroundColor: COLORS.userBubble, borderBottomRightRadius: 4 },
  messageText: { fontSize: 16, lineHeight: 22 },
  aiText: { color: COLORS.textAI },
  userText: { color: COLORS.textUser },

  inputContainer: { 
    paddingHorizontal: 15, 
    paddingBottom: Platform.OS === 'ios' ? 10 : 15,
    paddingTop: 10, 
    backgroundColor: COLORS.white,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },
  inputWrapper: {
    flexDirection: 'row', 
    backgroundColor: COLORS.bg, 
    borderRadius: 30, 
    alignItems: 'center',
    paddingLeft: 15, 
    paddingRight: 5,
  },
  textInput: { flex: 1, fontSize: 16, color: '#1A1A1A', maxHeight: 100, paddingVertical: 10 },
  sendButton: { padding: 2 },
});
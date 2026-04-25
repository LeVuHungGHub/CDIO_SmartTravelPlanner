import React, { useState } from 'react';
import { 
  StyleSheet, Text, View, TextInput, TouchableOpacity, 
  SafeAreaView, ScrollView, Dimensions, Platform, StatusBar 
} from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { 
  ArrowLeft, MapPin, Calendar, Wallet, Users, 
  Sparkles, Send, Compass, Music 
} from 'lucide-react-native';

const { width } = Dimensions.get('window');

export default function NovaAIPlanningScreen() {
  const router = useRouter();
  const [budget, setBudget] = useState('Medium');

  // Component phụ cho các ô nhập liệu
  const InputSection = ({ icon: Icon, label, placeholder, value }: any) => (
    <View style={styles.inputWrapper}>
      <Text style={styles.inputLabel}>{label}</Text>
      <View style={styles.inputBox}>
        <Icon color="#4F46E5" size={20} style={styles.innerIcon} />
        <TextInput 
          placeholder={placeholder} 
          style={styles.textInput} 
          placeholderTextColor="#94a3b8"
          defaultValue={value}
        />
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={styles.safeArea}>
        
        {/* --- HEADER --- */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
            <ArrowLeft color="#1e293b" size={24} />
          </TouchableOpacity>
          <View style={styles.headerTitleContainer}>
            <Sparkles color="#4F46E5" size={18} fill="#4F46E5" />
            <Text style={styles.headerTitle}>Nova AI Planner</Text>
          </View>
          <View style={{ width: 40 }} />
        </View>

        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
          <Text style={styles.mainTitle}>Where should we go next?</Text>
          <Text style={styles.subTitle}>Provide some details, and I'll craft your perfect journey.</Text>

          {/* --- FORM INPUTS --- */}
          <InputSection icon={MapPin} label="Destination" placeholder="e.g. Tokyo, Japan" />
          
          <View style={styles.row}>
            <View style={{ flex: 1, marginRight: 10 }}>
              <InputSection icon={Calendar} label="Duration" placeholder="5 Days" />
            </View>
            <View style={{ flex: 1, marginLeft: 10 }}>
              <InputSection icon={Users} label="Travelers" placeholder="2 People" />
            </View>
          </View>

          {/* --- BUDGET SELECTION --- */}
          <Text style={styles.inputLabel}>Budget Level</Text>
          <View style={styles.budgetContainer}>
            {['Economy', 'Medium', 'Luxury'].map((level) => (
              <TouchableOpacity 
                key={level} 
                style={[styles.budgetTab, budget === level && styles.activeBudgetTab]}
                onPress={() => setBudget(level)}
              >
                <Text style={[styles.budgetText, budget === level && styles.activeBudgetText]}>{level}</Text>
              </TouchableOpacity>
            ))}
          </View>

          <InputSection icon={Compass} label="Interests" placeholder="e.g. Anime, Food, Hiking" />

          {/* --- MAIN ACTION BUTTON --- */}
          <TouchableOpacity style={styles.generateBtn} activeOpacity={0.9}>
            <LinearGradient 
              colors={['#4F46E5', '#7C3AED']} 
              start={{x: 0, y: 0}} 
              end={{x: 1, y: 0}} 
              style={styles.gradientBtn}
            >
              <Text style={styles.generateBtnText}>Generate Smart Itinerary</Text>
              <Send color="#fff" size={18} style={{marginLeft: 10}} />
            </LinearGradient>
          </TouchableOpacity>

          <View style={{ height: 100 }} />
        </ScrollView>

        {/* --- NÚT NỔI (FAB) CÓ LOGO BÊN CẠNH --- */}
        <View style={styles.fabWrapper}>
            <View style={styles.fabLabelContainer}>
                <Text style={styles.fabLabelText}>Need help?</Text>
            </View>
            <TouchableOpacity style={styles.fabCircle} onPress={() => router.push('/AI_ChatBox')}>
                <LinearGradient 
                    colors={['#4F46E5', '#7C3AED']} 
                    style={styles.fabGradient}
                >
                    <Sparkles color="#fff" size={24} fill="#fff" />
                </LinearGradient>
            </TouchableOpacity>
        </View>

      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFFF' },
  safeArea: { flex: 1, paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0 },
  header: { 
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', 
    paddingHorizontal: 20, paddingVertical: 15, borderBottomWidth: 1, borderBottomColor: '#F1F5F9' 
  },
  backBtn: { padding: 5 },
  headerTitleContainer: { flexDirection: 'row', alignItems: 'center' },
  headerTitle: { fontSize: 16, fontWeight: '700', color: '#1e293b', marginLeft: 8 },
  
  scrollContent: { padding: 25 },
  mainTitle: { fontSize: 26, fontWeight: '800', color: '#1e293b' },
  subTitle: { fontSize: 15, color: '#64748b', marginTop: 8, marginBottom: 30, lineHeight: 22 },

  inputWrapper: { marginBottom: 20 },
  inputLabel: { fontSize: 14, fontWeight: '700', color: '#1e293b', marginBottom: 10, marginLeft: 4 },
  inputBox: { 
    flexDirection: 'row', alignItems: 'center', backgroundColor: '#F8FAFC', 
    borderRadius: 16, borderWidth: 1, borderColor: '#E2E8F0', paddingHorizontal: 15, height: 56 
  },
  innerIcon: { marginRight: 12 },
  textInput: { flex: 1, color: '#1e293b', fontSize: 15, fontWeight: '500' },
  
  row: { flexDirection: 'row' },
  
  budgetContainer: { flexDirection: 'row', marginBottom: 25, backgroundColor: '#F1F5F9', borderRadius: 12, padding: 4 },
  budgetTab: { flex: 1, paddingVertical: 10, alignItems: 'center', borderRadius: 10 },
  activeBudgetTab: { backgroundColor: '#fff', elevation: 2, shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 5 },
  budgetText: { fontSize: 14, fontWeight: '600', color: '#64748b' },
  activeBudgetText: { color: '#4F46E5' },

  generateBtn: { marginTop: 10, borderRadius: 16, overflow: 'hidden', elevation: 5, shadowColor: '#4F46E5', shadowOpacity: 0.3, shadowRadius: 10 },
  gradientBtn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', height: 60 },
  generateBtnText: { color: '#fff', fontSize: 16, fontWeight: '700' },

  // STYLE NÚT NỔI (FAB)
  fabWrapper: { 
    position: 'absolute', bottom: 30, right: 20, 
    flexDirection: 'row', alignItems: 'center' 
  },
  fabLabelContainer: { 
    backgroundColor: '#1e293b', paddingHorizontal: 15, paddingVertical: 8, 
    borderRadius: 20, marginRight: -15, paddingRight: 25, zIndex: -1 
  },
  fabLabelText: { color: '#fff', fontSize: 12, fontWeight: '700' },
  fabCircle: { 
    width: 60, height: 60, borderRadius: 30, 
    elevation: 8, shadowColor: '#4F46E5', shadowOpacity: 0.4, shadowRadius: 12 
  },
  fabGradient: { flex: 1, borderRadius: 30, justifyContent: 'center', alignItems: 'center' }
});
import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity, SafeAreaView, StatusBar, Dimensions } from 'react-native';
import { useRouter } from 'expo-router';
import { Home, Plane, Calendar, User, Plus, Bell } from 'lucide-react-native';

const { width } = Dimensions.get('window');

export default function TripsScreen() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('Upcoming');

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      
      {/* --- HEADER --- */}
      <View style={styles.header}>
        <View style={styles.userInfo}>
          <Image 
            source={{ uri: 'https://i.pravatar.cc/150?u=nova_user' }} 
            style={styles.avatar} 
          />
          <Text style={styles.title}>My Trips</Text>
        </View>
        <TouchableOpacity style={styles.notifBtn}>
          <Bell color="#1E1B4B" size={24} />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        
        {/* --- TAB SELECTOR --- */}
        <View style={styles.tabSelector}>
          <TouchableOpacity 
            style={[styles.subTab, activeTab === 'Upcoming' && styles.subTabActive]} 
            onPress={() => setActiveTab('Upcoming')}
          >
            <Text style={[styles.subTabText, activeTab === 'Upcoming' && styles.subTabTextActive]}>Upcoming</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.subTab, activeTab === 'Past' && styles.subTabActive]} 
            onPress={() => setActiveTab('Past')}
          >
            <Text style={[styles.subTabText, activeTab === 'Past' && styles.subTabTextActive]}>Past</Text>
          </TouchableOpacity>
        </View>

        {/* --- TRIP CARD: TOKYO --- */}
        <View style={styles.tripCard}>
          <Image source={require('../assets/images/Tokyo-Japan.png')} style={styles.tripImg} />
          <View style={[styles.badge, { backgroundColor: '#10B981' }]}>
            <Text style={styles.badgeText}>CONFIRMED</Text>
          </View>
          <View style={styles.tripOverlay}>
            <Text style={styles.locationName}>Tokyo, Japan</Text>
            <Text style={styles.tripDate}>Oct 12 — Oct 18</Text>
          </View>
        </View>

        {/* --- TRIP CARD: PARIS --- */}
        <View style={styles.tripCard}>
          <Image source={require('../assets/images/Paris-France.png')} style={styles.tripImg} />
          <View style={[styles.badge, { backgroundColor: '#F59E0B' }]}>
            <Text style={styles.badgeText}>PLANNING</Text>
          </View>
          <View style={styles.tripOverlay}>
            <Text style={styles.locationName}>Paris, France</Text>
            <Text style={styles.tripDate}>Dec 20 — Dec 27</Text>
          </View>
        </View>

        {/* --- EXPLORE BANNER --- */}
        <View style={styles.exploreBanner}>
          <View style={styles.bannerContent}>
            <Text style={styles.bannerTitle}>Ready to explore somewhere new?</Text>
            <Text style={styles.bannerSub}>Let us help you curate your next dream escape.</Text>
            <TouchableOpacity style={styles.planBtn}>
              <Text style={styles.planBtnText}>Plan a New Trip</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.bannerIconBg}>
            <Plane color="rgba(255,255,255,0.15)" size={120} />
          </View>
        </View>

      </ScrollView>

      {/* --- BOTTOM TAB BAR --- */}
      <View style={styles.bottomTab}>
        <TouchableOpacity style={styles.tabItem} onPress={() => router.push('/home')}>
          <Home color="#9CA3AF" size={24} />
          <Text style={styles.tabLabel}>HOME</Text>
        </TouchableOpacity>

        {/* Hiện tại đang ở Trips */}
        <TouchableOpacity style={styles.tabItem}>
          <View style={styles.activeTabCircle}>
            <Plane color="#4F46E5" size={24} />
            <Text style={[styles.tabLabel, {color: '#4F46E5'}]}>TRIPS</Text>
          </View>
        </TouchableOpacity>
        
        <View style={styles.fabSpace} />

        {/* NÚT PLANNER - Đã thêm chuyển hướng */}
        <TouchableOpacity style={styles.tabItem} onPress={() => router.push('/planner')}>
          <Calendar color="#9CA3AF" size={24} />
          <Text style={styles.tabLabel}>PLANNER</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.tabItem}onPress ={() => router.push('/profile')}>
          <User color="#9CA3AF" size={24} />
          <Text style={styles.tabLabel}>PROFILE</Text>
        </TouchableOpacity>

        {/* Nút FAB */}
        <TouchableOpacity style={styles.fabBtn}>
          <Plus color="#fff" size={30} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFFF' },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, paddingTop: 10 },
  userInfo: { flexDirection: 'row', alignItems: 'center' },
  avatar: { width: 40, height: 40, borderRadius: 12, marginRight: 12 },
  title: { fontSize: 22, fontWeight: 'bold', color: '#1E1B4B' },
  notifBtn: { backgroundColor: '#F3F4F6', padding: 8, borderRadius: 12 },
  scrollContent: { paddingHorizontal: 20, paddingBottom: 110 },
  tabSelector: { flexDirection: 'row', backgroundColor: '#F3F4F6', borderRadius: 14, padding: 4, marginTop: 20, marginBottom: 20 },
  subTab: { flex: 1, paddingVertical: 10, alignItems: 'center', borderRadius: 10 },
  subTabActive: { backgroundColor: '#FFFFFF', elevation: 2, shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 5 },
  subTabText: { color: '#9CA3AF', fontWeight: 'bold', fontSize: 14 },
  subTabTextActive: { color: '#4F46E5' },
  tripCard: { width: '100%', height: 200, borderRadius: 24, overflow: 'hidden', marginBottom: 20 },
  tripImg: { width: '100%', height: '100%' },
  tripOverlay: { position: 'absolute', bottom: 20, left: 20 },
  locationName: { color: '#fff', fontSize: 22, fontWeight: 'bold' },
  tripDate: { color: '#fff', fontSize: 13, marginTop: 4, opacity: 0.9 },
  badge: { position: 'absolute', top: 15, left: 15, paddingHorizontal: 12, paddingVertical: 6, borderRadius: 10 },
  badgeText: { color: '#fff', fontSize: 10, fontWeight: 'bold' },
  exploreBanner: { backgroundColor: '#3730A3', borderRadius: 24, padding: 25, overflow: 'hidden', marginTop: 10 },
  bannerContent: { zIndex: 1 },
  bannerTitle: { color: '#fff', fontSize: 20, fontWeight: 'bold', width: '75%' },
  bannerSub: { color: 'rgba(255,255,255,0.8)', fontSize: 13, marginTop: 8, width: '85%' },
  planBtn: { backgroundColor: '#fff', alignSelf: 'flex-start', paddingHorizontal: 20, paddingVertical: 12, borderRadius: 14, marginTop: 20 },
  planBtnText: { color: '#4F46E5', fontWeight: 'bold', fontSize: 14 },
  bannerIconBg: { position: 'absolute', bottom: -30, right: -20 },
  bottomTab: { position: 'absolute', bottom: 0, width: '100%', height: 85, backgroundColor: '#fff', flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', borderTopWidth: 1, borderTopColor: '#F3F4F6', paddingBottom: 15 },
  tabItem: { alignItems: 'center', justifyContent: 'center', minWidth: 60 },
  activeTabCircle: { alignItems: 'center', backgroundColor: '#EEF2FF', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 14 },
  tabLabel: { fontSize: 9, color: '#9CA3AF', fontWeight: 'bold', marginTop: 4 },
  fabSpace: { width: 60 },
  fabBtn: { position: 'absolute', bottom: 35, alignSelf: 'center', width: 60, height: 60, backgroundColor: '#4F46E5', borderRadius: 18, justifyContent: 'center', alignItems: 'center', elevation: 8, shadowColor: '#4F46E5', shadowOpacity: 0.4, shadowRadius: 10 }
});
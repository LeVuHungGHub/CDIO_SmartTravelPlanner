import React from 'react';
import { StyleSheet, Text, View, Image, TextInput, ScrollView, TouchableOpacity, SafeAreaView, StatusBar, Dimensions } from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { Search, Bell, Mic, ChevronRight, Plus, Home as HomeIcon, Plane, Calendar, Wallet, User, Sparkles } from 'lucide-react-native';

const { width } = Dimensions.get('window');

export default function HomeDashboard() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        
        {/* --- HEADER --- */}
        <View style={styles.header}>
          <View style={styles.userInfo}>
            <Image source={{ uri: 'https://i.pravatar.cc/150?u=nova' }} style={styles.avatar} />
            <Text style={styles.greeting}>Good Morning</Text>
          </View>
          <TouchableOpacity style={styles.iconCircle}>
            <Bell color="#4F46E5" size={20} />
          </TouchableOpacity>
        </View>

        {/* --- SEARCH SECTION --- */}
        <View style={styles.searchContainer}>
          <View style={styles.searchBar}>
            <Search color="#9CA3AF" size={18} />
            <TextInput placeholder="Where to next?" style={styles.searchInput} placeholderTextColor="#9CA3AF" />
            <Mic color="#4F46E5" size={18} />
          </View>
          <View style={styles.searchTags}>
            {['Kyoto, Japan', 'Paris Museums', 'Bali Beaches'].map((tag, i) => (
              <View key={i} style={styles.tag}><Text style={styles.tagText}>{tag}</Text></View>
            ))}
          </View>

          
          <TouchableOpacity 
            style={styles.novaAiButton} 
            activeOpacity={0.8}
            onPress={() => router.push('/AI_Plan')}
          >
            <LinearGradient 
              colors={['#4F46E5', '#7C3AED']} 
              start={{x: 0, y: 0}} 
              end={{x: 1, y: 0}} 
              style={styles.novaGradient}
            >
              <Image source={require('../assets/images/logo.png')} style={styles.logo} />
              <Text style={styles.novaAiText}>Plan with Nova AI</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>

        {/* --- ACTIVE TRIP CARD (DUBAI) --- */}
        <View style={styles.activeTripCard}>
          <Image source={{ uri: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=1000' }} style={styles.tripImg} />
          <LinearGradient colors={['transparent', 'rgba(0,0,0,0.8)']} style={styles.tripOverlay}>
            <View style={styles.activeBadge}><Text style={styles.badgeText}>ACTIVE TRIP</Text></View>
            <Text style={styles.tripName}>The Dubai Escape</Text>
            <View style={styles.tripStats}>
              <Text style={styles.statItem}>📅 4 days left</Text>
              <Text style={styles.statItem}>☀️ 32°C</Text>
            </View>
          </LinearGradient>
          <View style={styles.progressArea}>
            <View style={styles.progressInfo}>
              <Text style={styles.progressLabel}>ITINERARY PROGRESS</Text>
              <Text style={styles.progressValue}>65%</Text>
            </View>
            <View style={styles.progressTrack}><View style={[styles.progressFill, { width: '65%' }]} /></View>
          </View>
        </View>

        {/* --- AI UPDATES BANNER --- */}
        <LinearGradient colors={['#4F46E5', '#3730A3']} style={styles.aiBanner}>
          <View style={styles.aiIcon}><Text style={{color:'#fff'}}>✨</Text></View>
          <Text style={styles.aiTitle}>Ready for your next update?</Text>
          <Text style={styles.aiSub}>Your Burj Khalifa tour starts in 3 hours.</Text>
          <TouchableOpacity style={styles.detailsBtn}>
            <Text style={styles.detailsBtnText}>View Details</Text>
          </TouchableOpacity>
        </LinearGradient>

        {/* ---  AI CURATED --- */}
        <View style={styles.sectionTitleRow}>
          <View>
            <Text style={styles.sectionTitle}>AI Curated For You</Text>
            <Text style={styles.sectionSub}>Based on your recent interest in Asia</Text>
          </View>
          <TouchableOpacity><Text style={styles.seeAll}>See all</Text></TouchableOpacity>
        </View>
        
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.curatedList}>
          <View style={styles.curatedCard}>
             <View style={styles.curatedImgPlaceholder}><Text style={styles.cityLabel}>DA NANG</Text></View>
             <Text style={styles.curatedTitle}>Budget trip to Da Nang</Text>
             <View style={styles.curatedMeta}>
                <Text style={styles.price}>$450 • 5 Days</Text>
                <Text style={styles.rating}>⭐ 4.9</Text>
             </View>
          </View>
        </ScrollView>

        {/* --- UPCOMING JOURNEYS --- */}
        <Text style={[styles.sectionTitle, {marginTop: 30}]}>Upcoming Journeys</Text>
        <TouchableOpacity style={styles.journeyRow}>
          <Image source={{ uri: 'https://i.pravatar.cc/100?u=kyoto' }} style={styles.journeyImg} />
          <View style={styles.journeyInfo}>
            <Text style={styles.journeyDate}>OCT 12 - OCT 18</Text>
            <Text style={styles.journeyName}>Kyoto Traditional Tour</Text>
            <Text style={styles.journeyDetail}>2 Travelers • Flights Confirmed</Text>
          </View>
          <ChevronRight color="#9CA3AF" size={18} />
        </TouchableOpacity>

      </ScrollView>

      {/* --- BOTTOM TAB BAR --- */}
      <View style={styles.tabBar}>
        <TouchableOpacity style={styles.tabBtn}>
          <View style={styles.activeTab}><HomeIcon color="#4F46E5" size={24} /></View>
          <Text style={[styles.tabText, {color: '#4F46E5'}]}>HOME</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.tabBtn} onPress={() => router.push('/trips')}>
          <Plane color="#9CA3AF" size={24} />
          <Text style={styles.tabText}>TRIPS</Text>
        </TouchableOpacity>

        <View style={{width: 50}} />

        <TouchableOpacity style={styles.tabBtn} onPress={() => router.push('/planner')}>
          <Calendar color="#9CA3AF" size={24} />
          <Text style={styles.tabText}>PLANNER</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.tabBtn} onPress={() => router.push('/profile')}>
          <User color="#9CA3AF" size={24} />
          <Text style={styles.tabText}>PROFILE</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.fab}>
          <Plus color="#fff" size={28} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFFF' },
  scrollContent: { padding: 20, paddingBottom: 110 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  userInfo: { flexDirection: 'row', alignItems: 'center' },
  avatar: { width: 40, height: 40, borderRadius: 12, marginRight: 12 },
  greeting: { fontSize: 18, fontWeight: 'bold', color: '#1E1B4B' },
  iconCircle: { backgroundColor: '#F3F4F6', padding: 8, borderRadius: 12 },
  searchContainer: { marginTop: 20 },
  searchBar: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#F3F4F6', borderRadius: 16, paddingHorizontal: 15, height: 50 },
  searchInput: { flex: 1, marginLeft: 10, fontSize: 14 },
  searchTags: { flexDirection: 'row', marginTop: 12 },
  tag: { backgroundColor: '#F3F4F6', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 10, marginRight: 8 },
  tagText: { fontSize: 11, color: '#6B7280', fontWeight: '500' },
  logo: { width: 60, height: 60, borderRadius: 20 },

  
  // STYLE CHO NÚT NOVA AI MỚI
  novaAiButton: { marginTop: 15, borderRadius: 16, overflow: 'hidden', elevation: 3, shadowColor: '#4F46E5', shadowOpacity: 0.2, shadowRadius: 5, shadowOffset: {width: 0, height: 3} },
  novaGradient: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingVertical: 3 },
  novaLogoWrapper: { backgroundColor: 'rgba(255,255,255,0.2)', padding: 6, borderRadius: 8, marginRight: 10 },
  novaAiText: { color: '#FFF', fontSize: 15, fontWeight: 'bold', letterSpacing: 0.5 },

  activeTripCard: { marginTop: 25, borderRadius: 24, overflow: 'hidden', backgroundColor: '#fff', elevation: 4 },
  tripImg: { width: '100%', height: 210 },
  tripOverlay: { position: 'absolute', top: 0, left: 0, right: 0, height: 210, padding: 20, justifyContent: 'flex-end' },
  activeBadge: { backgroundColor: '#10B981', alignSelf: 'flex-start', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 8, marginBottom: 8 },
  badgeText: { color: '#fff', fontSize: 10, fontWeight: 'bold' },
  tripName: { color: '#fff', fontSize: 22, fontWeight: 'bold' },
  tripStats: { flexDirection: 'row', marginTop: 5 },
  statItem: { color: '#fff', fontSize: 12, marginRight: 15 },
  progressArea: { padding: 15 },
  progressInfo: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 },
  progressLabel: { fontSize: 10, color: '#9CA3AF', fontWeight: '800' },
  progressValue: { fontSize: 11, color: '#4F46E5', fontWeight: '800' },
  progressTrack: { height: 6, backgroundColor: '#F3F4F6', borderRadius: 3 },
  progressFill: { height: 6, backgroundColor: '#4F46E5', borderRadius: 3 },
  aiBanner: { marginTop: 20, borderRadius: 24, padding: 20, alignItems: 'center' },
  aiIcon: { width: 30, height: 30, backgroundColor: 'rgba(255,255,255,0.2)', borderRadius: 15, justifyContent: 'center', alignItems: 'center', marginBottom: 10 },
  aiTitle: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  aiSub: { color: 'rgba(255,255,255,0.8)', fontSize: 12, marginTop: 4 },
  detailsBtn: { backgroundColor: '#fff', width: '100%', padding: 12, borderRadius: 14, marginTop: 15, alignItems: 'center' },
  detailsBtnText: { color: '#4F46E5', fontWeight: 'bold' },
  sectionTitleRow: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 30 },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', color: '#1E1B4B' },
  sectionSub: { fontSize: 12, color: '#9CA3AF' },
  seeAll: { color: '#4F46E5', fontWeight: 'bold', fontSize: 13 },
  curatedList: { marginTop: 15 },
  curatedCard: { width: 220, backgroundColor: '#fff', borderRadius: 20, padding: 12, marginRight: 15, borderWidth: 1, borderColor: '#F3F4F6' },
  curatedImgPlaceholder: { width: '100%', height: 110, backgroundColor: '#06B6D4', borderRadius: 15, justifyContent: 'center', alignItems: 'center' },
  cityLabel: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
  curatedTitle: { fontSize: 14, fontWeight: 'bold', marginTop: 10 },
  curatedMeta: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 5 },
  price: { color: '#10B981', fontWeight: 'bold', fontSize: 12 },
  rating: { fontSize: 12, color: '#6B7280' },
  journeyRow: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#F9FAFB', padding: 12, borderRadius: 20, marginTop: 15 },
  journeyImg: { width: 60, height: 60, borderRadius: 15 },
  journeyInfo: { flex: 1, marginLeft: 15 },
  journeyDate: { fontSize: 10, color: '#4F46E5', fontWeight: 'bold' },
  journeyName: { fontSize: 14, fontWeight: 'bold', color: '#1E1B4B' },
  journeyDetail: { fontSize: 11, color: '#9CA3AF' },
  tabBar: { position: 'absolute', bottom: 0, width: '100%', height: 85, backgroundColor: '#fff', flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', borderTopWidth: 1, borderTopColor: '#F3F4F6' },
  tabBtn: { alignItems: 'center' },
  activeTab: { backgroundColor: '#EEF2FF', padding: 8, borderRadius: 12, marginBottom: 2 },
  tabText: { fontSize: 9, fontWeight: 'bold', color: '#9CA3AF' },
  fab: { position: 'absolute', bottom: 35, alignSelf: 'center', width: 56, height: 56, backgroundColor: '#4F46E5', borderRadius: 18, justifyContent: 'center', alignItems: 'center', elevation: 5, shadowColor: '#4F46E5', shadowOpacity: 0.3, shadowRadius: 8 }
});
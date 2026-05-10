import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
  ImageBackground,
  StatusBar,
  Platform,
} from 'react-native';
import { 
  Search, 
  Mic, 
  Bell, 
  Sparkles, 
  Calendar, 
  ChevronRight,
  Plus,
  Home as HomeIcon,
  Compass,
  CalendarDays,
  Wallet,
  User,
  Clock,
  Thermometer
} from 'lucide-react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient'; // Đảm bảo đã cài expo-linear-gradient
import { push } from 'expo-router/build/global-state/routing';

const Home = () => {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [activeTab, setActiveTab] = useState('HOME');

  const TabItem = ({ icon: Icon, label }: { icon: any, label: string }) => {
    const isActive = activeTab === label;
    return (
      <TouchableOpacity 
        style={[styles.tabItem, isActive && styles.activeTabBg]} 
        onPress={() => setActiveTab(label)}
      >
        <Icon size={22} color={isActive ? "#635BFF" : "#94A3B8"} />
        <Text style={[styles.tabLabel, isActive && styles.activeTabLabel]}>{label}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      
      {/* Header */}
      <View style={[styles.header, { paddingTop: insets.top + 10 }]}>
        <View style={styles.userInfo}>
          <Image source={{ uri: 'https://i.pravatar.cc/100?u=yennhi' }} style={styles.avatar} />
          <Text style={styles.greetingText}>Good Morning</Text>
        </View>
        <TouchableOpacity style={styles.iconButton}>
          <Bell color="#635BFF" size={20} />
        </TouchableOpacity>
      </View>

      <ScrollView 
        showsVerticalScrollIndicator={false} 
        contentContainerStyle={{ paddingBottom: insets.bottom + 100 }}
      >
        {/* Search Section */}
        <View style={styles.searchSection}>
          <View style={styles.searchBar}>
            <Search color="#94A3B8" size={18} />
            <TextInput placeholder="Where to next?" style={styles.searchInput} />
            <Mic color="#635BFF" size={18} />
          </View>
          <View style={styles.chipContainer}>
            {['Kyoto, Japan', 'Paris Museums', 'Bali Beaches'].map((item) => (
              <View key={item} style={styles.chip}><Text style={styles.chipText}>{item}</Text></View>
            ))}
          </View>
        </View>

        {/* Active Trip Card */}
        <View style={styles.activeTripCard}>
          <ImageBackground 
            source={{ uri: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c' }} 
            style={styles.activeTripImg}
            imageStyle={{ borderRadius: 24 }}
          >
            <View style={styles.activeTripOverlay}>
              <View style={styles.statusTag}><Text style={styles.statusText}>ACTIVE TRIP</Text></View>
              <Text style={styles.activeTripTitle}>The Dubai Escape</Text>
              <View style={styles.tripMeta}>
                <View style={styles.metaItem}><Clock color="#FFF" size={14} /><Text style={styles.metaText}>4 days left</Text></View>
                <View style={styles.metaItem}><Thermometer color="#FFF" size={14} /><Text style={styles.metaText}>32°C</Text></View>
              </View>
            </View>
          </ImageBackground>
          <View style={styles.progressSection}>
            <View style={styles.progressInfo}>
                <Text style={styles.progressLabel}>ITINERARY PROGRESS</Text>
                <Text style={styles.progressValue}>65%</Text>
            </View>
            <View style={styles.progressBarBg}><View style={[styles.progressBarFill, { width: '65%' }]} /></View>
          </View>
        </View>

        {/* Update Card */}
        <LinearGradient colors={['#4338CA', '#6366F1']} style={styles.updateCard}>
           <Sparkles color="#FFF" size={20} />
           <Text style={styles.updateTitle}>Ready for your next update?</Text>
           <Text style={styles.updateSub}>Your Burj Khalifa tour starts in 3 hours.</Text>
           <TouchableOpacity style={styles.viewBtn}><Text style={styles.viewBtnText}>View Details</Text></TouchableOpacity>
        </LinearGradient>

        {/* Plan with Nova AI Button */}
        <TouchableOpacity onPress={() => router.push('/AI_Plan')}>
            <LinearGradient colors={['#7C3AED', '#6366F1']} start={{x:0, y:0}} end={{x:1, y:0}} style={styles.aiButton}>
                <Sparkles color="#FFD700" size={18} fill="#FFD700" />
                <Text style={styles.aiButtonText}>Plan with Nova AI</Text>
            </LinearGradient>
        </TouchableOpacity>

        {/* AI Curated Section */}
        <View style={styles.sectionHeader}>
            <View>
                <Text style={styles.sectionTitle}>AI Curated For You</Text>
                <Text style={styles.sectionSub}>Based on your recent interest in Asia</Text>
            </View>
            <Text style={styles.seeAll} onPress={() => router.push('/AI_Curated')}>See all</Text>
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.horizontalList}>
            <View style={styles.curatedCard}>
                <Image source={{ uri: 'https://images.unsplash.com/photo-1559592490-3f19ed055822' }} style={styles.curatedImg} />
                <Text style={styles.curatedTitle}>Budget trip to Da Nang</Text>
                <View style={styles.curatedFooter}><Text style={styles.curatedPrice}>$450 • 5 Days</Text><Text style={styles.rating}>⭐ 4.9</Text></View>
            </View>
        </ScrollView>

        {/* Upcoming Journeys */}
        <View style={styles.sectionHeader}><Text style={styles.sectionTitle}>Upcoming Journeys</Text></View>
        <TouchableOpacity style={styles.journeyItem}>
            <Image source={{ uri: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e' }} style={styles.journeyImg} />
            <View style={styles.journeyInfo}>
                <Text style={styles.journeyDate}>OCT 12 - OCT 18</Text>
                <Text style={styles.journeyTitle}>Kyoto Traditional Tour</Text>
                <Text style={styles.journeySub}>2 Travelers • Flights Confirmed</Text>
            </View>
            <ChevronRight color="#94A3B8" size={20} />
        </TouchableOpacity>

      </ScrollView>

      {/* Floating Add Button */}
      <TouchableOpacity style={styles.fab}>
        <LinearGradient colors={['#4338CA', '#6366F1']} style={styles.fabGradient}>
            <Plus color="#FFF" size={28} />
        </LinearGradient>
      </TouchableOpacity>

      {/* Bottom Bar */}
      <View style={[styles.bottomBar, { paddingBottom: insets.bottom + 10 }]}>
        
        {/* HOME */}
        <TouchableOpacity 
          style={[styles.tabItem, activeTab === 'HOME' && styles.activeTabBg]} 
          onPress={() => {
            setActiveTab('HOME');
            router.replace('/home');
          }}
        >
          <HomeIcon size={22} color={activeTab === 'HOME' ? "#635BFF" : "#94A3B8"} />
          <Text style={[styles.tabLabel, activeTab === 'HOME' && styles.activeTabLabel]}>HOME</Text>
        </TouchableOpacity>

        {/* TRIPS */}
        <TouchableOpacity 
          style={[styles.tabItem, activeTab === 'TRIPS' && styles.activeTabBg]} 
          onPress={() => {
            setActiveTab('TRIPS');
            router.push('/trips');
          }}
        >
          <Compass size={22} color={activeTab === 'TRIPS' ? "#635BFF" : "#94A3B8"} />
          <Text style={[styles.tabLabel, activeTab === 'TRIPS' && styles.activeTabLabel]}>TRIPS</Text>
        </TouchableOpacity>

        {/* PLANNER */}
        <TouchableOpacity 
          style={[styles.tabItem, activeTab === 'PLANNER' && styles.activeTabBg]} 
          onPress={() => {
            setActiveTab('PLANNER');
            router.push('/planner');
          }}
        >
          <CalendarDays size={22} color={activeTab === 'PLANNER' ? "#635BFF" : "#94A3B8"} />
          <Text style={[styles.tabLabel, activeTab === 'PLANNER' && styles.activeTabLabel]}>PLANNER</Text>
        </TouchableOpacity>

        {/* BUDGET */}
        <TouchableOpacity 
          style={[styles.tabItem, activeTab === 'BUDGET' && styles.activeTabBg]} 
          onPress={() => router.push('budget')}
        >
          <Wallet size={22} color={activeTab === 'BUDGET' ? "#635BFF" : "#94A3B8"} />
          <Text style={[styles.tabLabel, activeTab === 'BUDGET' && styles.activeTabLabel]}>BUDGET</Text>
        </TouchableOpacity>

        {/* PROFILE */}
        <TouchableOpacity 
          style={[styles.tabItem, activeTab === 'PROFILE' && styles.activeTabBg]} 
          onPress={() => router.push('profile')}
        >
          <User size={22} color={activeTab === 'PROFILE' ? "#635BFF" : "#94A3B8"} />
          <Text style={[styles.tabLabel, activeTab === 'PROFILE' && styles.activeTabLabel]}>PROFILE</Text>
        </TouchableOpacity>

      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F1F5F9' },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 24, backgroundColor: 'transparent' },
  userInfo: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#FFF', padding: 6, borderRadius: 30, paddingRight: 16 },
  avatar: { width: 32, height: 32, borderRadius: 16, marginRight: 10 },
  greetingText: { fontSize: 16, fontWeight: '600', color: '#635BFF' },
  iconButton: { width: 40, height: 40, borderRadius: 20, backgroundColor: '#FFF', justifyContent: 'center', alignItems: 'center' },
  searchSection: { paddingHorizontal: 24, marginTop: 20 },
  searchBar: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#FFF', borderRadius: 20, paddingHorizontal: 15, height: 50 },
  searchInput: { flex: 1, marginLeft: 10, fontSize: 14 },
  chipContainer: { flexDirection: 'row', marginTop: 12 },
  chip: { backgroundColor: '#E2E8F0', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 15, marginRight: 8 },
  chipText: { fontSize: 11, color: '#475569', fontWeight: '500' },
  activeTripCard: { margin: 24, backgroundColor: '#FFF', borderRadius: 24, padding: 10 },
  activeTripImg: { width: '100%', height: 220 },
  activeTripOverlay: { flex: 1, padding: 20, backgroundColor: 'rgba(0,0,0,0.2)', borderRadius: 24, justifyContent: 'flex-end' },
  statusTag: { alignSelf: 'flex-start', backgroundColor: '#10B981', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 6, marginBottom: 8 },
  statusText: { color: '#FFF', fontSize: 10, fontWeight: '800' },
  activeTripTitle: { color: '#FFF', fontSize: 24, fontWeight: '800', marginBottom: 10 },
  tripMeta: { flexDirection: 'row' },
  metaItem: { flexDirection: 'row', alignItems: 'center', marginRight: 15 },
  metaText: { color: '#FFF', fontSize: 12, marginLeft: 4 },
  progressSection: { padding: 15 },
  progressInfo: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 },
  progressLabel: { fontSize: 10, fontWeight: '800', color: '#94A3B8' },
  progressValue: { fontSize: 12, fontWeight: '700', color: '#635BFF' },
  progressBarBg: { height: 6, backgroundColor: '#F1F5F9', borderRadius: 3 },
  progressBarFill: { height: 6, backgroundColor: '#635BFF', borderRadius: 3 },
  updateCard: { marginHorizontal: 24, borderRadius: 24, padding: 20, alignItems: 'center' },
  updateTitle: { color: '#FFF', fontSize: 18, fontWeight: '700', marginTop: 10 },
  updateSub: { color: 'rgba(255,255,255,0.8)', fontSize: 13, marginTop: 4, textAlign: 'center' },
  viewBtn: { backgroundColor: '#FFF', paddingHorizontal: 24, paddingVertical: 10, borderRadius: 12, marginTop: 15 },
  viewBtnText: { color: '#4338CA', fontWeight: '700' },
  aiButton: { marginHorizontal: 24, marginTop: 20, height: 55, borderRadius: 28, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', elevation: 4 },
  aiButtonText: { color: '#FFF', fontSize: 16, fontWeight: '700', marginLeft: 10 },
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end', paddingHorizontal: 24, marginTop: 30, marginBottom: 15 },
  sectionTitle: { fontSize: 20, fontWeight: '800', color: '#1E293B' },
  sectionSub: { fontSize: 12, color: '#64748B', marginTop: 2 },
  seeAll: { color: '#635BFF', fontWeight: '700', fontSize: 13 },
  horizontalList: { paddingLeft: 24 },
  curatedCard: { width: 200, backgroundColor: '#FFF', borderRadius: 20, padding: 10, marginRight: 15 },
  curatedImg: { width: '100%', height: 120, borderRadius: 15 },
  curatedTitle: { fontSize: 14, fontWeight: '700', marginTop: 10, color: '#1E293B' },
  curatedFooter: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 5 },
  curatedPrice: { fontSize: 11, color: '#64748B' },
  rating: { fontSize: 11, fontWeight: '600' },
  journeyItem: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#FFF', marginHorizontal: 24, padding: 12, borderRadius: 20, marginBottom: 12 },
  journeyImg: { width: 50, height: 50, borderRadius: 12 },
  journeyInfo: { flex: 1, marginLeft: 15 },
  journeyDate: { fontSize: 10, fontWeight: '800', color: '#635BFF' },
  journeyTitle: { fontSize: 14, fontWeight: '700', color: '#1E293B' },
  journeySub: { fontSize: 11, color: '#94A3B8' },
  fab: { position: 'absolute', bottom: 100, right: 24, zIndex: 10 },
  fabGradient: { width: 56, height: 56, borderRadius: 28, justifyContent: 'center', alignItems: 'center', elevation: 8 },
  bottomBar: { position: 'absolute', bottom: 0, left: 0, right: 0, backgroundColor: '#FFF', flexDirection: 'row', justifyContent: 'space-around', paddingTop: 15, borderTopLeftRadius: 25, borderTopRightRadius: 25, elevation: 20 },
  tabItem: { alignItems: 'center', padding: 8, borderRadius: 15 },
  activeTabBg: { backgroundColor: '#EEEDFF' },
  tabLabel: { fontSize: 10, fontWeight: '700', color: '#94A3B8', marginTop: 4 },
  activeTabLabel: { color: '#635BFF' },
});

export default Home;
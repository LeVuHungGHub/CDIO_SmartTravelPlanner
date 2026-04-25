import React, { useState } from 'react';
import { 
  StyleSheet, Text, View, Image, ScrollView, 
  TouchableOpacity, SafeAreaView, Switch, StatusBar 
} from 'react-native';
import { useRouter } from 'expo-router';
import { 
  Bell, Settings, Pencil, Download, Share2, 
  Moon, BellRing, Cpu, FileText, LifeBuoy, 
  Info, ChevronRight, Home as HomeIcon, Compass, 
  Calendar, Wallet, User 
} from 'lucide-react-native';

// --- ĐỊNH NGHĨA KIỂU DỮ LIỆU ---
interface SettingsItemProps {
  icon: React.ReactNode;
  label: string;
  trailing?: React.ReactNode;
  isLast?: boolean;
}

interface TabItemProps {
  icon: any;
  label: string;
  active?: boolean;
  onPress?: () => void;
}

export default function ProfileScreen() {
  const router = useRouter();
  const [isNotificationsEnabled, setIsNotificationsEnabled] = useState(true);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      
      {/* 1. HEADER */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Profile</Text>
        <View style={styles.headerIcons}>
          <TouchableOpacity style={styles.iconBtn}><Bell color="#4F46E5" size={22} /></TouchableOpacity>
          <TouchableOpacity style={styles.iconBtn}><Settings color="#4F46E5" size={22} onPress={() => router.push('/Setting')} /></TouchableOpacity>
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        
        {/* 2. USER INFO */}
        <View style={styles.profileSection}>
          <View style={styles.avatarContainer}>
            <Image 
              source={{ uri: 'https://i.pravatar.cc/150?u=alexandria' }} 
              style={styles.avatar} 
            />
            <TouchableOpacity style={styles.editBadge}>
              <Pencil color="#fff" size={12} />
            </TouchableOpacity>
          </View>
          <Text style={styles.userName}>Alexandria Rivera</Text>
          <Text style={styles.userEmail}>alexandria.rivera@concierge.travel</Text>
        </View>

        {/* 3. QUICK ACTIONS (CARDS) */}
        <View style={styles.cardRow}>
          <TouchableOpacity style={styles.actionCard}>
            <View style={[styles.cardIconBg, { backgroundColor: '#EEF2FF' }]}>
              <Download color="#4F46E5" size={20} />
            </View>
            <Text style={styles.cardTitle}>Download for Offline</Text>
            <Text style={styles.cardSub}>Keep your maps and tickets accessible without data.</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionCard}>
            <View style={[styles.cardIconBg, { backgroundColor: '#ECFDF5' }]}>
              <Share2 color="#10B981" size={20} />
            </View>
            <Text style={styles.cardTitle}>Share Trip</Text>
            <Text style={styles.cardSub}>Invite friends to view your itinerary and collaborate.</Text>
          </TouchableOpacity>
        </View>

        {/* 4. PREFERENCES SECTION */}
        <Text style={styles.sectionLabel}>PREFERENCES</Text>
        <View style={styles.menuGroup}>
          <SettingsItem 
            icon={<Moon color="#4F46E5" size={20} />} 
            label="Appearance" 
            trailing={
              <View style={styles.toggleGroup}>
                <View style={[styles.toggleBtn, styles.activeToggle]}><Text style={styles.activeToggleText}>Dark</Text></View>
                <View style={styles.toggleBtn}><Text style={styles.inactiveToggleText}>Light</Text></View>
              </View>
            }
          />
          <SettingsItem 
            icon={<BellRing color="#4F46E5" size={20} />} 
            label="Notifications" 
            trailing={
              <Switch 
                value={isNotificationsEnabled} 
                onValueChange={setIsNotificationsEnabled}
                trackColor={{ false: "#D1D5DB", true: "#4F46E5" }}
                thumbColor="#fff"
              />
            }
          />
          <SettingsItem 
            icon={<Cpu color="#4F46E5" size={20} />} 
            label="AI Preferences" 
            trailing={<ChevronRight color="#9CA3AF" size={20} />}
            isLast
          />
        </View>

        {/* 5. APP INFO SECTION */}
        <Text style={styles.sectionLabel}>APP INFO</Text>
        <View style={styles.menuGroup}>
          <SettingsItem 
            icon={<FileText color="#10B981" size={20} />} 
            label="Export Data" 
            trailing={<ChevronRight color="#9CA3AF" size={20} />}
          />
          <SettingsItem 
            icon={<LifeBuoy color="#111827" size={20} />} 
            label="Help & Support" 
            trailing={<ChevronRight color="#9CA3AF" size={20} />}
          />
          <SettingsItem 
            icon={<Info color="#9CA3AF" size={20} />} 
            label="Version" 
            trailing={<Text style={styles.versionText}>v4.12.0-stable</Text>}
            isLast
          />
        </View>

      </ScrollView>

      {/* 6. BOTTOM TAB BAR */}
      <View style={styles.tabBar}>
        <TabItem icon={HomeIcon} label="HOME" onPress={() => router.push('/home')} />
        <TabItem icon={Compass} label="TRIPS" onPress={() => router.push('/trips')}/>
        <TabItem icon={Calendar} label="PLANNER" onPress={() => router.push('/planner')}/>
        <TabItem icon={Wallet} label="BUDGET" onPress={() => router.push('/budget')} />
        <TabItem icon={User} label="PROFILE" active />
      </View>
    </SafeAreaView>
  );
}

// --- COMPONENTS CON ---
function SettingsItem({ icon, label, trailing, isLast }: SettingsItemProps) {
  return (
    <View style={[styles.menuItem, isLast && { borderBottomWidth: 0 }]}>
      <View style={styles.menuItemLeft}>
        {icon}
        <Text style={styles.menuLabel}>{label}</Text>
      </View>
      {trailing}
    </View>
  );
}

function TabItem({ icon: Icon, label, active, onPress }: TabItemProps) {
  return (
    <TouchableOpacity style={styles.tabBtn} onPress={onPress}>
      <View style={active ? styles.activeTabCircle : undefined}>
        <Icon color={active ? "#4F46E5" : "#9CA3AF"} size={22} />
      </View>
      <Text style={[styles.tabLabel, active && { color: '#4F46E5' }]}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F9FAFB' },
  header: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    paddingHorizontal: 20, 
    paddingVertical: 15 
  },
  headerTitle: { fontSize: 24, fontWeight: 'bold', color: '#4F46E5' },
  headerIcons: { flexDirection: 'row', gap: 15 },
  iconBtn: { padding: 5 },
  scrollContent: { paddingBottom: 100 },

  profileSection: { alignItems: 'center', marginVertical: 20 },
  avatarContainer: { position: 'relative' },
  avatar: { width: 100, height: 100, borderRadius: 50, backgroundColor: '#E5E7EB' },
  editBadge: { 
    position: 'absolute', 
    bottom: 0, 
    right: 0, 
    backgroundColor: '#4F46E5', 
    padding: 6, 
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#fff'
  },
  userName: { fontSize: 20, fontWeight: 'bold', color: '#111827', marginTop: 15 },
  userEmail: { fontSize: 13, color: '#6B7280', marginTop: 4 },

  cardRow: { flexDirection: 'row', paddingHorizontal: 20, gap: 15, marginBottom: 30 },
  actionCard: { 
    flex: 1, 
    backgroundColor: '#fff', 
    borderRadius: 20, 
    padding: 15,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 10,
  },
  cardIconBg: { width: 40, height: 40, borderRadius: 12, justifyContent: 'center', alignItems: 'center', marginBottom: 12 },
  cardTitle: { fontSize: 14, fontWeight: 'bold', color: '#111827', marginBottom: 6 },
  cardSub: { fontSize: 11, color: '#9CA3AF', lineHeight: 16 },

  sectionLabel: { paddingHorizontal: 25, fontSize: 12, fontWeight: 'bold', color: '#9CA3AF', marginBottom: 10 },
  menuGroup: { backgroundColor: '#fff', marginHorizontal: 20, borderRadius: 20, paddingHorizontal: 15, marginBottom: 25 },
  menuItem: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'space-between', 
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6'
  },
  menuItemLeft: { flexDirection: 'row', alignItems: 'center', gap: 15 },
  menuLabel: { fontSize: 15, fontWeight: '500', color: '#111827' },
  
  toggleGroup: { flexDirection: 'row', backgroundColor: '#F3F4F6', borderRadius: 10, padding: 3 },
  toggleBtn: { paddingHorizontal: 12, paddingVertical: 4, borderRadius: 8 },
  activeToggle: { backgroundColor: '#1E1B4B' },
  activeToggleText: { color: '#fff', fontSize: 10, fontWeight: 'bold' },
  inactiveToggleText: { color: '#9CA3AF', fontSize: 10, fontWeight: 'bold' },
  versionText: { fontSize: 12, color: '#9CA3AF' },

  tabBar: { 
    position: 'absolute', 
    bottom: 0, 
    flexDirection: 'row', 
    height: 85, 
    backgroundColor: '#fff', 
    borderTopWidth: 1, 
    borderTopColor: '#F3F4F6', 
    justifyContent: 'space-around', 
    alignItems: 'center', 
    paddingBottom: 20,
    width: '100%'
  },
  tabBtn: { alignItems: 'center' },
  tabLabel: { fontSize: 9, fontWeight: 'bold', color: '#9CA3AF', marginTop: 4 },
  activeTabCircle: { backgroundColor: '#EEF2FF', paddingHorizontal: 15, paddingVertical: 8, borderRadius: 16 },
});
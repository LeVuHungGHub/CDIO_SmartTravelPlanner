import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  StatusBar,
  Image,
  Platform,
} from 'react-native';
import { useRouter } from 'expo-router';
import { 
  User, Lock, Shield, Banknote, Languages, 
  Bell, Info, FileText, Users, Scale, LogOut, 
  ChevronRight, ArrowLeft 
} from 'lucide-react-native';

// Khai báo Component SettingItem với props để tránh lỗi Typescript
const SettingItem = ({ 
  icon: Icon, 
  label, 
  value = "", 
  color = '#64748b', 
  textColor = '#1e293b', 
  isLast = false, 
  showArrow = true, 
  onPress = () => {} 
}: any) => (
  <TouchableOpacity 
    style={styles.itemWrapper} 
    onPress={onPress}
    activeOpacity={0.6}
  >
    <View style={[styles.itemInner, isLast && styles.noBorder]}>
      <View style={styles.itemLeft}>
        <View style={styles.iconWidth}>
          <Icon color={color} size={20} />
        </View>
        <Text style={[styles.itemLabel, { color: textColor }]}>{label}</Text>
      </View>
      <View style={styles.itemRight}>
        {value !== "" && <Text style={styles.itemValueText}>{value}</Text>}
        {showArrow && <ChevronRight color="#cbd5e1" size={18} />}
      </View>
    </View>
  </TouchableOpacity>
);

const SectionHeader = ({ title }: { title: string }) => (
  <Text style={styles.sectionHeaderText}>{title}</Text>
);

export default function SettingsScreen() {
  const router = useRouter();

  return (
    <View style={styles.mainContainer}>
      {/* Khắc phục lỗi che đầu trên Android */}
      <StatusBar barStyle="dark-content" translucent backgroundColor="transparent" />
      
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.navHeader}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backAction}>
            <ArrowLeft color="#4F46E5" size={24} />
          </TouchableOpacity>
          <Text style={styles.navTitle}>Settings</Text>
          <Image 
            source={{ uri: 'https://i.pravatar.cc/150?u=alexandria' }} 
            style={styles.userAvatar} 
          />
        </View>

        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollPadding}>
          
          <SectionHeader title="ACCOUNT & SECURITY" />
          <View style={styles.settingCard}>
            <SettingItem icon={User} label="Account Information" />
            <SettingItem icon={Lock} label="Password & Security" />
            <SettingItem icon={Shield} label="Privacy Settings" isLast />
          </View>

          <SectionHeader title="GENERAL SETTINGS" />
          <View style={styles.settingCard}>
            <SettingItem icon={Banknote} label="Currency" value="VNĐ" />
            <SettingItem icon={Languages} label="Language" value="Tiếng Việt" isLast />
          </View>

          <SectionHeader title="NOTIFICATIONS" />
          <View style={styles.settingCard}>
            <SettingItem icon={Bell} label="Notification Settings" isLast />
          </View>

          <SectionHeader title="APP INFO" />
          <View style={styles.settingCard}>
            <SettingItem icon={Info} label="App Version" value="5.41.0" isLast />
          </View>

          <SectionHeader title="LEGAL & ABOUT" />
          <View style={styles.settingCard}>
            <SettingItem icon={FileText} label="Terms & Conditions" />
            <SettingItem icon={Shield} label="Privacy Policy" />
            <SettingItem icon={Users} label="About Us" />
            <SettingItem icon={Scale} label="Operating Regulations" isLast />
          </View>

          <SectionHeader title="ACTIONS" />
          <View style={styles.settingCard}>
            <SettingItem 
              icon={LogOut} 
              label="Log Out" 
              color="#ef4444" 
              textColor="#ef4444" 
              showArrow={false} 
              isLast 
            />
          </View>

          <View style={{ height: 50 }} />
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  safeArea: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  navHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: '#fff',
  },
  navTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#4F46E5',
    flex: 1,
    marginLeft: 15,
  },
  backAction: {
    padding: 5,
  },
  userAvatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
  },
  scrollPadding: {
    paddingHorizontal: 16,
    paddingBottom: 30,
  },
  sectionHeaderText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#64748b',
    marginTop: 25,
    marginBottom: 10,
    marginLeft: 4,
    textTransform: 'uppercase',
  },
  settingCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    paddingHorizontal: 16,
    marginBottom: 8,
  },
  itemWrapper: {
    width: '100%',
  },
  itemInner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
  },
  noBorder: {
    borderBottomWidth: 0,
  },
  itemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconWidth: {
    width: 35,
  },
  itemLabel: {
    fontSize: 15,
    fontWeight: '500',
  },
  itemRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemValueText: {
    fontSize: 14,
    color: '#94a3b8',
    marginRight: 8,
  },
});
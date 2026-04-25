import React from 'react';
import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity, SafeAreaView, TextInput, StatusBar } from 'react-native';
import { useRouter } from 'expo-router';
import { Home, Plane, Calendar, Wallet, User, Bell, CheckCircle2, List, Map, Plus, Download, FileText, Hotel } from 'lucide-react-native';

export default function PlannerScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      
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

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        
        {/* --- STEPPER (Tiến trình) --- */}
        <View style={styles.stepperContainer}>
          <View style={styles.stepItem}>
            <CheckCircle2 color="#10B981" size={24} />
            <Text style={styles.stepTextActive}>DESTINATIONS</Text>
          </View>
          <View style={styles.stepItem}>
            <CheckCircle2 color="#10B981" size={24} />
            <Text style={styles.stepTextActive}>DATES</Text>
          </View>
          <View style={styles.stepItem}>
            <CheckCircle2 color="#10B981" size={24} />
            <Text style={styles.stepTextActive}>BUDGET</Text>
          </View>
          <View style={styles.stepItem}>
            <View style={styles.activeStepCircle}>
                <Calendar color="#fff" size={14} />
            </View>
            <Text style={[styles.stepTextActive, {color: '#4F46E5'}]}>ACTIVITIES</Text>
          </View>
        </View>

        {/* --- TRIP TITLE --- */}
        <View style={styles.titleSection}>
          <Text style={styles.tripTitle}>Amalfi Coast Dream</Text>
          <Text style={styles.tripDates}>🗓️ Sep 12 — Sep 18, 2024</Text>
          
          <View style={styles.viewToggle}>
            <TouchableOpacity style={styles.toggleBtnActive}>
              <List color="#4F46E5" size={16} />
              <Text style={styles.toggleTextActive}>List</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.toggleBtn}>
              <Map color="#9CA3AF" size={16} />
              <Text style={styles.toggleText}>Map</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* --- DAY SELECTOR --- */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.dayScroll}>
          <TouchableOpacity style={styles.dayBtnActive}><Text style={styles.dayBtnTextActive}>Day 1</Text></TouchableOpacity>
          <TouchableOpacity style={styles.dayBtn}><Text style={styles.dayBtnText}>Day 2</Text></TouchableOpacity>
          <TouchableOpacity style={styles.dayBtn}><Text style={styles.dayBtnText}>Day 3</Text></TouchableOpacity>
          <TouchableOpacity style={styles.dayBtn}><Text style={styles.dayBtnText}>Day 4</Text></TouchableOpacity>
        </ScrollView>

        {/* --- TIMELINE --- */}
        <View style={styles.timelineContainer}>
          {/* Activity 1 */}
          <View style={styles.timelineItem}>
            <Text style={styles.timeText}>09:00 AM</Text>
            <View style={styles.activityCard}>
              <View style={styles.activityHeader}>
                <Text style={styles.activityName}>Private Boat Tour, Capri</Text>
                <View style={styles.confirmedBadge}><Text style={styles.badgeText}>CONFIRMED</Text></View>
              </View>
              <View style={styles.activityBody}>
                <Image source={{ uri: 'https://images.unsplash.com/photo-1534447677768-be436bb09401' }} style={styles.activityImg} />
                <Text style={styles.activityDesc}>Depart from Marina Grande. Visit the Blue Grotto and Faraglioni rocks. Drinks and snacks included.</Text>
              </View>
            </View>
          </View>

          {/* Activity 2 - Placeholder */}
          <View style={styles.timelineItem}>
            <Text style={styles.timeText}>12:30 PM</Text>
            <TouchableOpacity style={styles.addPlaceholder}>
              <Plus color="#9CA3AF" size={20} />
              <Text style={styles.placeholderText}>Schedule Lunch in Positano</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* --- ADD TO ITINERARY FORM --- */}
        <View style={styles.formCard}>
          <Text style={styles.formTitle}>Add to Itinerary</Text>
          <Text style={styles.inputLabel}>LOCATION</Text>
          <TextInput placeholder="Search places, restaurants..." style={styles.input} />
          
          <View style={styles.row}>
            <View style={{flex:1, marginRight:10}}>
              <Text style={styles.inputLabel}>START TIME</Text>
              <TextInput placeholder="-- : -- --" style={styles.input} />
            </View>
            <View style={{flex:1}}>
              <Text style={styles.inputLabel}>CATEGORY</Text>
              <TextInput placeholder="Activity" style={styles.input} />
            </View>
          </View>
          
          <TouchableOpacity style={styles.addBtn}>
            <Plus color="#fff" size={20} />
            <Text style={styles.addBtnText}>Add Activity</Text>
          </TouchableOpacity>
        </View>

        {/* --- TRIP DOCUMENTS --- */}
        <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Trip Documents</Text>
            <TouchableOpacity><Text style={styles.editAll}>EDIT ALL</Text></TouchableOpacity>
        </View>

        <View style={styles.docCard}>
            <View style={styles.docItem}>
                <View style={[styles.docIcon, {backgroundColor: '#EEF2FF'}]}><FileText color="#4F46E5" size={20} /></View>
                <View style={{flex: 1, marginLeft: 12}}>
                    <Text style={styles.docName}>Naples - Sorrento Ferry</Text>
                    <Text style={styles.docInfo}>PDF Document • 1.2 MB</Text>
                </View>
                <Download color="#9CA3AF" size={20} />
            </View>

            <View style={styles.docItem}>
                <View style={[styles.docIcon, {backgroundColor: '#ECFDF5'}]}><Hotel color="#10B981" size={20} /></View>
                <View style={{flex: 1, marginLeft: 12}}>
                    <Text style={styles.docName}>Hotel Miramare Booking</Text>
                    <Text style={styles.docInfo}>Confirmed • QR Ready</Text>
                </View>
                <Download color="#9CA3AF" size={20} />
            </View>
        </View>

        {/* --- PERSONAL NOTES --- */}
        <View style={styles.notesCard}>
            <Text style={styles.inputLabel}>PERSONAL NOTES</Text>
            <View style={styles.notesBox}>
                <Text style={styles.notesText}>
                    "Remember to bring extra cash for the Blue Grotto entrance fee (15€). Also, check if Salvatore's serves the lemon pasta for lunch."
                </Text>
            </View>
        </View>

      </ScrollView>

      {/* --- BOTTOM TAB BAR --- */}
      <View style={styles.tabBar}>
        <TouchableOpacity style={styles.tabBtn} onPress={() => router.push('/home')}>
          <Home color="#9CA3AF" size={24} />
          <Text style={styles.tabText}>HOME</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabBtn} onPress={() => router.push('/trips')}>
          <Plane color="#9CA3AF" size={24} />
          <Text style={styles.tabText}>TRIPS</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabBtn}>
          <View style={styles.activeTabIndicator}>
            <Calendar color="#4F46E5" size={24} />
          </View>
          <Text style={[styles.tabText, {color: '#4F46E5'}]}>PLANNER</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabBtn} onPress={() => router.push('/budget')}>
          <Wallet color="#9CA3AF" size={24} />
          <Text style={styles.tabText}>BUDGET</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabBtn} onPress={() => router.push('/profile')}>
          <User color="#9CA3AF" size={24} />
          <Text style={styles.tabText}>PROFILE</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8F9FB' },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 20, backgroundColor: '#fff' },
  userInfo: { flexDirection: 'row', alignItems: 'center' },
  avatar: { width: 35, height: 35, borderRadius: 10, marginRight: 10 },
  greeting: { fontSize: 16, fontWeight: 'bold', color: '#1E1B4B' },
  iconCircle: { backgroundColor: '#F3F4F6', padding: 8, borderRadius: 10 },
  
  scrollContent: { paddingBottom: 120 },

  stepperContainer: { flexDirection: 'row', justifyContent: 'space-around', backgroundColor: '#fff', paddingVertical: 15, borderBottomWidth: 1, borderBottomColor: '#F3F4F6' },
  stepItem: { alignItems: 'center' },
  stepTextActive: { fontSize: 8, fontWeight: 'bold', color: '#10B981', marginTop: 5 },
  activeStepCircle: { width: 24, height: 24, borderRadius: 12, backgroundColor: '#4F46E5', justifyContent: 'center', alignItems: 'center' },

  titleSection: { padding: 20, backgroundColor: '#fff' },
  tripTitle: { fontSize: 22, fontWeight: 'bold', color: '#1E1B4B' },
  tripDates: { fontSize: 13, color: '#6B7280', marginTop: 5 },
  viewToggle: { flexDirection: 'row', backgroundColor: '#F3F4F6', borderRadius: 12, padding: 4, marginTop: 15, width: 140 },
  toggleBtnActive: { flex: 1, flexDirection: 'row', backgroundColor: '#fff', padding: 8, borderRadius: 10, justifyContent: 'center', alignItems: 'center' },
  toggleBtn: { flex: 1, flexDirection: 'row', padding: 8, justifyContent: 'center', alignItems: 'center' },
  toggleTextActive: { fontSize: 12, fontWeight: 'bold', color: '#4F46E5', marginLeft: 5 },
  toggleText: { fontSize: 12, color: '#9CA3AF', marginLeft: 5 },

  dayScroll: { paddingHorizontal: 20, marginVertical: 10 },
  dayBtnActive: { backgroundColor: '#3730A3', paddingHorizontal: 20, paddingVertical: 10, borderRadius: 20, marginRight: 10 },
  dayBtn: { backgroundColor: '#F3F4F6', paddingHorizontal: 20, paddingVertical: 10, borderRadius: 20, marginRight: 10 },
  dayBtnTextActive: { color: '#fff', fontWeight: 'bold' },
  dayBtnText: { color: '#9CA3AF' },

  timelineContainer: { padding: 20 },
  timelineItem: { flexDirection: 'row', marginBottom: 20 },
  timeText: { width: 70, fontSize: 11, color: '#9CA3AF', fontWeight: 'bold', marginTop: 10 },
  activityCard: { flex: 1, backgroundColor: '#fff', borderRadius: 20, padding: 15, borderLeftWidth: 4, borderLeftColor: '#10B981', elevation: 2 },
  activityHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  activityName: { fontSize: 14, fontWeight: 'bold', color: '#1E1B4B' },
  confirmedBadge: { backgroundColor: '#ECFDF5', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 6 },
  badgeText: { color: '#10B981', fontSize: 8, fontWeight: 'bold' },
  activityBody: { flexDirection: 'row', marginTop: 10 },
  activityImg: { width: 60, height: 60, borderRadius: 10, marginRight: 12 },
  activityDesc: { flex: 1, fontSize: 11, color: '#6B7280', lineHeight: 16 },

  addPlaceholder: { flex: 1, borderStyle: 'dashed', borderWidth: 1, borderColor: '#D1D5DB', borderRadius: 20, padding: 15, alignItems: 'center', justifyContent: 'center', flexDirection: 'row' },
  placeholderText: { color: '#9CA3AF', fontSize: 13, marginLeft: 8 },

  formCard: { margin: 20, padding: 20, backgroundColor: '#fff', borderRadius: 24, elevation: 2 },
  formTitle: { fontSize: 16, fontWeight: 'bold', marginBottom: 15 },
  inputLabel: { fontSize: 10, color: '#9CA3AF', fontWeight: 'bold', marginBottom: 5 },
  input: { backgroundColor: '#F9FAFB', borderRadius: 12, padding: 12, marginBottom: 15, fontSize: 13, borderWidth: 1, borderColor: '#F3F4F6' },
  row: { flexDirection: 'row' },
  addBtn: { backgroundColor: '#4F46E5', flexDirection: 'row', padding: 15, borderRadius: 15, justifyContent: 'center', alignItems: 'center' },
  addBtnText: { color: '#fff', fontWeight: 'bold', marginLeft: 8 },

  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 20, marginTop: 10 },
  sectionTitle: { fontSize: 16, fontWeight: 'bold' },
  editAll: { fontSize: 10, color: '#4F46E5', fontWeight: 'bold' },
  docCard: { margin: 20, backgroundColor: '#fff', borderRadius: 24, padding: 15 },
  docItem: { flexDirection: 'row', alignItems: 'center', paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: '#F3F4F6' },
  docIcon: { padding: 10, borderRadius: 12 },
  docName: { fontSize: 13, fontWeight: 'bold', color: '#1E1B4B' },
  docInfo: { fontSize: 11, color: '#9CA3AF' },

  notesCard: { marginHorizontal: 20, marginBottom: 20 },
  notesBox: { backgroundColor: '#FFF7ED', padding: 15, borderRadius: 15, borderLeftWidth: 4, borderLeftColor: '#FDBA74' },
  notesText: { fontSize: 12, color: '#9A3412', fontStyle: 'italic', lineHeight: 18 },

  tabBar: { position: 'absolute', bottom: 0, width: '100%', height: 85, backgroundColor: '#fff', flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', paddingBottom: 15, borderTopWidth: 1, borderTopColor: '#F3F4F6' },
  tabBtn: { alignItems: 'center' },
  activeTabIndicator: { backgroundColor: '#EEF2FF', padding: 8, borderRadius: 12, marginBottom: 2 },
  tabText: { fontSize: 9, fontWeight: 'bold', color: '#9CA3AF' }
});
import React, { useState, useEffect } from 'react';
import { Dimensions, StyleSheet, Text, View, TouchableOpacity, SafeAreaView, Image, ScrollView, TextInput } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { ArrowLeft, HelpCircle, CheckCircle2, Calendar, Utensils, ChevronDown, MapPin, Pencil, RotateCcw, Navigation } from 'lucide-react-native';

const { width } = Dimensions.get('window');

export default function ConfirmReceiptScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  
  const [amount, setAmount] = useState((params.amount as string) || '0.00');
  const [date, setDate] = useState((params.date as string) || 'Select Date');
  const [location, setLocation] = useState((params.location as string) || 'Unknown Location');
  const [address, setAddress] = useState((params.address as string) || 'Address not found');
  const [category, setCategory] = useState((params.category as string) || 'Food & Drinks');

  useEffect(() => {
    if (params.amount) setAmount(params.amount as string);
    if (params.location) setLocation(params.location as string);
    if (params.address) setAddress(params.address as string);
  }, [params.amount, params.location, params.address]);

  return (
    <SafeAreaView style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.iconBtn}>
          <ArrowLeft color="#4F46E5" size={24} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Scan Receipt</Text>
        <TouchableOpacity style={styles.iconBtn}><HelpCircle color="#9CA3AF" size={24} /></TouchableOpacity>
      </View>

    
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.imageContainer}>
          <View style={styles.imageFrame}>
            {params.imageUri && <Image source={{ uri: params.imageUri as string }} style={styles.receiptImage} />}
            <View style={styles.scannedBadge}>
              <CheckCircle2 color="#10B981" size={16} />
              <Text style={styles.scannedText}>SCANNED</Text>
            </View>
          </View>
        </View>

        <View style={styles.detailsCard}>
          <View style={styles.reviewHeader}>
            <View style={styles.reviewIconBg}><Pencil color="#4F46E5" size={16} /></View>
            <Text style={styles.reviewTitle}>Review Details</Text>
          </View>

          <Text style={styles.inputLabel}>TOTAL AMOUNT</Text>
          <View style={styles.inputWrapper}>
            <Text style={styles.currencySymbol}>$</Text>
            <TextInput style={styles.amountInput} value={amount} onChangeText={setAmount} keyboardType="numeric" />
          </View>

          <Text style={styles.inputLabel}>DATE</Text>
          <TouchableOpacity style={styles.inputWrapper}>
            <Calendar color="#6B7280" size={20} /><Text style={styles.inputText}>{date}</Text>
          </TouchableOpacity>

          <Text style={styles.inputLabel}>CATEGORY</Text>
          <TouchableOpacity style={styles.inputWrapper}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Utensils color="#374151" size={20} /><Text style={[styles.inputText, { marginLeft: 10 }]}>{category}</Text>
            </View>
            <ChevronDown color="#9CA3AF" size={20} />
          </TouchableOpacity>

          
          <View style={styles.locationContainer}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <View style={styles.locationIconBg}><MapPin color="#4F46E5" size={18} /></View>
              <View style={{ flex: 1 }}>
                <Text style={styles.locationLabel}>DETECTED LOCATION</Text>
                <TextInput style={styles.locationText} value={location} onChangeText={setLocation} />
              </View>
            </View>
            
            <View style={styles.divider} />

            <View style={{ flexDirection: 'row', alignItems: 'flex-start', paddingLeft: 12 }}>
              <Navigation color="#6B7280" size={16} style={{ marginTop: 4 }} />
              <View style={{ flex: 1, marginLeft: 12 }}>
                <Text style={styles.locationLabel}>STREET ADDRESS</Text>
                <TextInput style={styles.addressText} value={address} onChangeText={setAddress} multiline />
              </View>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* FOOTER */}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.confirmBtn} onPress={() => router.push('/budget')}>
          <Text style={styles.confirmBtnText}>Confirm & Add Expense</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.retakeBtn} onPress={() => router.back()}>
          <RotateCcw color="#4B5563" size={18} /><Text style={styles.retakeBtnText}>Retake</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F9FAFB' },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 16, height: 60 },
  headerTitle: { fontSize: 18, fontWeight: '700', color: '#312E81' },
  iconBtn: { padding: 8 },
  scrollContent: { paddingHorizontal: 20, paddingBottom: 180 }, // Tăng padding để lướt qua footer
  imageContainer: { alignItems: 'center', marginVertical: 20 },
  imageFrame: { width: width * 0.7, height: 280, backgroundColor: '#fff', borderRadius: 12, padding: 10, elevation: 5 },
  receiptImage: { width: '100%', height: '100%', borderRadius: 8 },
  scannedBadge: { position: 'absolute', top: 15, right: 15, backgroundColor: '#fff', flexDirection: 'row', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 20, borderWidth: 1, borderColor: '#E5E7EB' },
  scannedText: { fontSize: 10, fontWeight: '800', color: '#10B981', marginLeft: 4 },
  detailsCard: { marginTop: 10 },
  reviewHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 20 },
  reviewIconBg: { width: 32, height: 32, borderRadius: 8, backgroundColor: '#EEF2FF', justifyContent: 'center', alignItems: 'center', marginRight: 10 },
  reviewTitle: { fontSize: 18, fontWeight: '700', color: '#111827' },
  inputLabel: { fontSize: 11, fontWeight: '700', color: '#9CA3AF', marginBottom: 8, marginTop: 15 },
  inputWrapper: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#F3F4F6', borderRadius: 16, paddingHorizontal: 16, height: 56, justifyContent: 'space-between' },
  currencySymbol: { fontSize: 20, fontWeight: '700', color: '#4F46E5', marginRight: 8 },
  amountInput: { flex: 1, fontSize: 24, fontWeight: '700', color: '#111827' },
  inputText: { fontSize: 16, color: '#1F2937', fontWeight: '500' },
  locationContainer: { backgroundColor: '#F3F4F6', borderRadius: 20, padding: 16, marginTop: 25 },
  locationIconBg: { width: 40, height: 40, borderRadius: 12, backgroundColor: '#fff', justifyContent: 'center', alignItems: 'center', marginRight: 12 },
  locationLabel: { fontSize: 10, fontWeight: '700', color: '#9CA3AF' },
  locationText: { fontSize: 14, fontWeight: '600', color: '#111827' },
  addressText: { fontSize: 12, fontWeight: '500', color: '#4B5563', marginTop: 2 },
  divider: { height: 1, backgroundColor: '#E5E7EB', marginVertical: 12, marginLeft: 52 },
  footer: { position: 'absolute', bottom: 0, width: '100%', padding: 20, backgroundColor: '#F9FAFB' },
  confirmBtn: { backgroundColor: '#4F46E5', height: 56, borderRadius: 25, justifyContent: 'center', alignItems: 'center', marginBottom: 12 },
  confirmBtnText: { color: '#fff', fontSize: 16, fontWeight: '700' },
  retakeBtn: { height: 56, borderRadius: 25, backgroundColor: '#E5E7EB', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 8 },
  retakeBtnText: { color: '#4B5563', fontSize: 16, fontWeight: '700' },
});
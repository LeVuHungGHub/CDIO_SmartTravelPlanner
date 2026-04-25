import React, { useState } from 'react';
import { 
  StyleSheet, Text, View, ScrollView, TouchableOpacity, 
  SafeAreaView, StatusBar, Modal, Pressable, TextInput 
} from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur'; // Đảm bảo bạn đã chạy: npx expo install expo-blur
import { 
  Plus, Scan, ArrowRightLeft, Car, Hotel, Utensils, Ticket, 
  Home as HomeIcon, Plane, Calendar, Wallet, User, TrendingUp, 
  X, ReceiptText, MoreHorizontal 
} from 'lucide-react-native';
import { opacity } from 'react-native-reanimated/lib/typescript/Colors';

// --- ĐỊNH NGHĨA KIỂU DỮ LIỆU ---
interface ExpenseItemProps {
  icon: React.ReactNode;
  title: string;
  sub: string;
  amount: string;
}

interface TabItemProps {
  icon: any;
  label: string;
  active?: boolean;
  onPress?: () => void;
}

export default function BudgetScreen() {
  const router = useRouter();
  // State quản lý việc hiển thị bảng Add Expense
  const [showAddExpense, setShowAddExpense] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      
      {/* HEADER */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Budget Tracker</Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        
        {/* 1. THẺ TỔNG KẾT */}
        <LinearGradient colors={['#059669', '#10B981']} style={styles.summaryCard}>
          <View>
            <Text style={styles.summaryLabel}>LEFTOVER BUDGET</Text>
            <Text style={styles.summaryAmount}>$1,420.50</Text>
            <Text style={styles.summarySub}>On track to save $240 this trip</Text>
          </View>
          <View style={styles.chartIconBg}>
            <TrendingUp color="#fff" size={20} />
          </View>
        </LinearGradient>

        {/* 2. BIỂU ĐỒ CHI TIÊU */}
        <View style={styles.chartCard}>
          <Text style={styles.cardTitleCenter}>Spending vs Planned</Text>
          <View style={styles.donutContainer}>
            <View style={styles.donutCircle}>
              <Text style={styles.totalSpentLabel}>TOTAL SPENT</Text>
              <Text style={styles.totalSpentValue}>$2,579</Text>
            </View>
          </View>
          <View style={styles.legendRow}>
            <View style={styles.legendItem}>
              <View style={[styles.dot, {backgroundColor: '#4F46E5'}]} />
              <Text style={styles.legendText}>Planned</Text>
            </View>
            <View style={styles.legendItem}>
              <View style={[styles.dot, {backgroundColor: '#10B981'}]} />
              <Text style={styles.legendText}>Actual</Text>
            </View>
          </View>
        </View>

        {/* 3. NÚT CHỨC NĂNG */}
        <View style={styles.actionRow}>
          <TouchableOpacity 
            style={styles.btnAdd} 
            onPress={() => setShowAddExpense(true)} // Mở Modal
          >
            <Plus color="#fff" size={18} />
            <Text style={styles.btnTextAdd}>Add Expense</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.btnScan} onPress = {() => router.push('/ScanReceipt')}>
            <Scan color="#4F46E5" size={18} />
            <Text style={styles.btnTextScan}>Scan Receipt</Text>
          </TouchableOpacity>
        </View>

        {/* 4. CHUYỂN ĐỔI TIỀN TỆ */}
        <View style={styles.converterCard}>
          <View style={styles.converterHeader}>
            <Text style={styles.converterTitle}>Quick Converter</Text>
            <Text style={styles.liveRateLink}>LIVE RATES</Text>
          </View>
          <View style={styles.converterInputs}>
            <View style={styles.currencyBox}><Text style={styles.curCode}>USD</Text><Text style={styles.curVal}>1.00</Text></View>
            <ArrowRightLeft color="#9CA3AF" size={18} />
            <View style={styles.currencyBox}><Text style={styles.curCode}>EUR</Text><Text style={styles.curVal}>0.92</Text></View>
          </View>
        </View>

        {/* 5. DANH SÁCH CHI TIÊU GẦN ĐÂY */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Recent Expenses</Text>
          <Text style={styles.viewAll}>View All</Text>
        </View>

        <ExpenseItem icon={<Car size={20} color="#4F46E5" />} title="Uber to Airport" sub="Transport • Today, 9:41 AM" amount="-$45.00" />
        <ExpenseItem icon={<Hotel size={20} color="#10B981" />} title="The Grand Heritage" sub="Hotel • Yesterday" amount="-$820.00" />
        <ExpenseItem icon={<Utensils size={20} color="#F59E0B" />} title="Street Food Market" sub="Food • Yesterday" amount="-$12.50" />
        <ExpenseItem icon={<Ticket size={20} color="#3B82F6" />} title="Museum Entrance" sub="Activity • 2 days ago" amount="-$25.00" />
      </ScrollView>

      {/* --- MODAL ADD EXPENSE --- */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={showAddExpense}
        onRequestClose={() => setShowAddExpense(false)}
      >
        <BlurView intensity={80} tint="dark" style={[StyleSheet.absoluteFill, { backgroundColor: 'rgba(140, 114, 114, 0.4)' }]}>
          <TouchableOpacity 
            style={styles.modalOverlay} 
            activeOpacity={1} 
            onPress={() => setShowAddExpense(false)}
          >
            <Pressable style={styles.modalContent} onPress={(e) => e.stopPropagation()}>
              <View style={styles.modalHandle} />
              
              <View style={styles.modalHeader}>
                <TouchableOpacity onPress={() => setShowAddExpense(false)}>
                  <X color="#9CA3AF" size={24} />
                </TouchableOpacity>
                <Text style={styles.modalHeaderTitle}>Add Expense</Text>
                <ReceiptText color="#4F46E5" size={24} />
              </View>

              <View style={styles.spendingInfoRow}>
                <Text style={styles.spendingInfoLabel}>Today's Spending</Text>
                <Text style={styles.spendingInfoValue}>$42.50</Text>
              </View>

              <View style={styles.amountInputSection}>
                <Text style={styles.amountInputLabel}>AMOUNT</Text>
                <View style={styles.amountInputRow}>
                  <Text style={styles.currencySymbol}>$</Text>
                  <TextInput 
                    style={styles.amountInput} 
                    placeholder="0.00" 
                    keyboardType="numeric"
                    autoFocus={true}
                    placeholderTextColor="#E5E7EB"
                  />
                </View>
              </View>

              <Text style={styles.inputLabel}>Category</Text>
              <View style={styles.categoryRow}>
                <CategoryBtn icon={<Car size={20} color="#4F46E5" />} label="Transport" active />
                <CategoryBtn icon={<Hotel size={20} color="#6B7280" />} label="Hotel" />
                <CategoryBtn icon={<Utensils size={20} color="#6B7280" />} label="Food" />
                <CategoryBtn icon={<Ticket size={20} color="#6B7280" />} label="Activity" />
                <CategoryBtn icon={<MoreHorizontal size={20} color="#6B7280" />} label="Other" />
              </View>

              <View style={styles.formRow}>
                <View style={styles.formCol}>
                  <Text style={styles.inputLabel}>Date</Text>
                  <TouchableOpacity style={styles.inputField}>
                    <Calendar size={18} color="#9CA3AF" />
                    <Text style={styles.inputText}>Today</Text>
                  </TouchableOpacity>
                </View>
                <View style={styles.formCol}>
                  <Text style={styles.inputLabel}>Note (Optional)</Text>
                  <TextInput style={styles.inputField} placeholder="Add note..." placeholderTextColor="#9CA3AF" />
                </View>
              </View>

              <TouchableOpacity style={styles.saveBtn} onPress={() => setShowAddExpense(false)}>
                <Text style={styles.saveBtnText}>Save Expense</Text>
              </TouchableOpacity>

              <View style={styles.modalFooterBtns}>
                <TouchableOpacity 
                  style={styles.scanFooterBtn}
                  onPress={() => {
                  setShowAddExpense(false); // đóng modal budget 
                  router.push('/ScanReceipt'); // mở modal Scan Receipt
                    }}
>
  <Scan size={18} color="#111827" />
  <Text style={styles.scanFooterText}>Scan Receipt</Text>
</TouchableOpacity>
                <TouchableOpacity onPress={() => setShowAddExpense(false)}>
                  <Text style={styles.cancelText}>Cancel</Text>
                </TouchableOpacity>
              </View>
            </Pressable>
          </TouchableOpacity>
        </BlurView>
      </Modal>

      {/* --- TAB BAR --- */}
      <View style={styles.tabBar}>
        <TabItem icon={HomeIcon} label="HOME" onPress={() => router.push('/home')} />
        <TabItem icon={Plane} label="TRIPS" onPress={() => router.push('/trips')}/>
        <TabItem icon={Calendar} label="PLANNER" onPress={() => router.push('/planner')} />
        <TabItem icon={Wallet} label="BUDGET" active />
        <TabItem icon={User} label="PROFILE" onPress ={() => router.push('/profile')}/>
      </View>
    </SafeAreaView>
  );
}

// --- SUB-COMPONENTS ---
function CategoryBtn({ icon, label, active }: { icon: React.ReactNode, label: string, active?: boolean }) {
  return (
    <View style={styles.catBtnContainer}>
      <TouchableOpacity style={[styles.catIconBox, active && styles.catIconBoxActive]}>
        {icon}
      </TouchableOpacity>
      <Text style={[styles.catLabel, active && styles.catLabelActive]}>{label}</Text>
    </View>
  );
}

function ExpenseItem({ icon, title, sub, amount }: ExpenseItemProps) {
  return (
    <View style={styles.expenseRow}>
      <View style={styles.expenseIconContainer}>{icon}</View>
      <View style={styles.expenseDetails}>
        <Text style={styles.expenseTitle}>{title}</Text>
        <Text style={styles.expenseSub}>{sub}</Text>
      </View>
      <Text style={styles.expenseAmount}>{amount}</Text>
    </View>
  );
}

function TabItem({ icon: Icon, label, active, onPress }: TabItemProps) {
  return (
    <TouchableOpacity style={styles.tabBtn} onPress={onPress}>
      <View style={active ? styles.activeTabCircle : undefined}>
        <Icon color={active ? "#4F46E5" : "#9CA3AF"} size={22} />
      </View>
      <Text style={[styles.tabLabel, active && {color: '#4F46E5'}]}>{label}</Text>
    </TouchableOpacity>
  );
}

// --- STYLES ---
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFFF' },
  header: { paddingHorizontal: 20, paddingTop: 10 },
  headerTitle: { fontSize: 24, fontWeight: 'bold', color: '#111827' },
  scrollContent: { padding: 20, paddingBottom: 100 },

  summaryCard: { borderRadius: 24, padding: 20, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
  summaryLabel: { color: 'rgba(255,255,255,0.8)', fontSize: 10, fontWeight: 'bold' },
  summaryAmount: { color: '#fff', fontSize: 32, fontWeight: 'bold' },
  summarySub: { color: '#fff', fontSize: 12, marginTop: 4 },
  chartIconBg: { backgroundColor: 'rgba(255,255,255,0.2)', padding: 10, borderRadius: 12 },

  chartCard: { backgroundColor: '#fff', borderRadius: 24, padding: 20, elevation: 2, shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 10, marginBottom: 20 },
  cardTitleCenter: { textAlign: 'center', fontSize: 16, fontWeight: 'bold', marginBottom: 15 },
  donutContainer: { alignItems: 'center' },
  donutCircle: { width: 140, height: 140, borderRadius: 70, borderWidth: 12, borderColor: '#10B981', justifyContent: 'center', alignItems: 'center' },
  totalSpentLabel: { fontSize: 9, color: '#9CA3AF', fontWeight: 'bold' },
  totalSpentValue: { fontSize: 22, fontWeight: 'bold', color: '#4F46E5' },
  legendRow: { flexDirection: 'row', justifyContent: 'center', marginTop: 15 },
  legendItem: { flexDirection: 'row', alignItems: 'center', marginHorizontal: 10 },
  dot: { width: 8, height: 8, borderRadius: 4, marginRight: 6 },
  legendText: { fontSize: 12, color: '#6B7280' },

  actionRow: { flexDirection: 'row', gap: 12, marginBottom: 20 },
  btnAdd: { flex: 1, backgroundColor: '#4F46E5', height: 50, borderRadius: 16, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 8 },
  btnTextAdd: { color: '#fff', fontWeight: 'bold' },
  btnScan: { flex: 1, backgroundColor: '#EEF2FF', height: 50, borderRadius: 16, borderWidth: 1, borderColor: '#E0E7FF', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 8 },
  btnTextScan: { color: '#4F46E5', fontWeight: 'bold' },

  converterCard: { backgroundColor: '#F3F4F6', borderRadius: 24, padding: 20, marginBottom: 25 },
  converterHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 12 },
  converterTitle: { fontWeight: 'bold', color: '#111827' },
  liveRateLink: { fontSize: 10, color: '#4F46E5', fontWeight: 'bold' },
  converterInputs: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  currencyBox: { backgroundColor: '#fff', width: '42%', padding: 12, borderRadius: 16 },
  curCode: { fontSize: 10, color: '#9CA3AF', fontWeight: 'bold' },
  curVal: { fontSize: 18, fontWeight: 'bold', marginTop: 2 },

  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 15 },
  sectionTitle: { fontSize: 18, fontWeight: 'bold' },
  viewAll: { color: '#4F46E5', fontWeight: 'bold', fontSize: 12 },
  expenseRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 16 },
  expenseIconContainer: { width: 44, height: 44, backgroundColor: '#F9FAFB', borderRadius: 14, justifyContent: 'center', alignItems: 'center' },
  expenseDetails: { flex: 1, marginLeft: 15 },
  expenseTitle: { fontSize: 15, fontWeight: 'bold' },
  expenseSub: { fontSize: 11, color: '#9CA3AF' },
  expenseAmount: { fontSize: 15, fontWeight: 'bold', color: '#EF4444' },

  tabBar: { flexDirection: 'row', height: 85, backgroundColor: '#fff', borderTopWidth: 1, borderTopColor: '#F3F4F6', justifyContent: 'space-around', alignItems: 'center', paddingBottom: 20 },
  tabBtn: { alignItems: 'center' },
  tabLabel: { fontSize: 9, fontWeight: 'bold', color: '#9CA3AF', marginTop: 4 },
  activeTabCircle: { backgroundColor: '#EEF2FF', paddingHorizontal: 15, paddingVertical: 8, borderRadius: 16 },

  // --- MODAL STYLES ---
  modalOverlay: { flex: 1, justifyContent: 'flex-end' },
  modalContent: { backgroundColor: '#F9FAFB', borderTopLeftRadius: 32, borderTopRightRadius: 32, padding: 25, paddingBottom: 40 },
  modalHandle: { width: 40, height: 4, backgroundColor: '#E5E7EB', borderRadius: 2, alignSelf: 'center', marginBottom: 15 },
  modalHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
  modalHeaderTitle: { fontSize: 18, fontWeight: 'bold', color: '#4F46E5' },
  
  spendingInfoRow: { backgroundColor: '#EEF2FF', padding: 15, borderRadius: 20, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 25 },
  spendingInfoLabel: { color: '#6B7280', fontSize: 14 },
  spendingInfoValue: { color: '#4F46E5', fontWeight: 'bold', fontSize: 16 },

  amountInputSection: { alignItems: 'center', marginBottom: 30 },
  amountInputLabel: { fontSize: 11, fontWeight: 'bold', color: '#9CA3AF', marginBottom: 10 },
  amountInputRow: { flexDirection: 'row', alignItems: 'center' },
  currencySymbol: { fontSize: 32, color: '#9CA3AF', marginRight: 10 },
  amountInput: { fontSize: 50, fontWeight: 'bold', color: '#111827' },

  inputLabel: { fontSize: 14, fontWeight: 'bold', color: '#4B5563', marginBottom: 10 },
  categoryRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 25 },
  catBtnContainer: { alignItems: 'center' },
  catIconBox: { width: 56, height: 56, backgroundColor: '#fff', borderRadius: 18, justifyContent: 'center', alignItems: 'center', marginBottom: 8 },
  catIconBoxActive: { backgroundColor: '#EEF2FF' },
  catLabel: { fontSize: 11, color: '#9CA3AF' },
  catLabelActive: { color: '#4F46E5', fontWeight: 'bold' },

  formRow: { flexDirection: 'row', gap: 15, marginBottom: 30 },
  formCol: { flex: 1 },
  inputField: { backgroundColor: '#fff', borderRadius: 16, height: 48, paddingHorizontal: 15, flexDirection: 'row', alignItems: 'center', gap: 8 },
  inputText: { color: '#111827' },

  saveBtn: { backgroundColor: '#4F46E5', height: 56, borderRadius: 20, justifyContent: 'center', alignItems: 'center', marginBottom: 20 },
  saveBtnText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  
  modalFooterBtns: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  scanFooterBtn: { backgroundColor: '#fff', paddingHorizontal: 20, height: 48, borderRadius: 16, flexDirection: 'row', alignItems: 'center', gap: 8 },
  scanFooterText: { fontWeight: 'bold', color: '#111827' },
  cancelText: { color: '#6B7280', fontWeight: 'bold' }
});
import React, { useState, useRef } from 'react';
import { 
  StyleSheet, Text, View, TouchableOpacity, SafeAreaView, 
  Dimensions, Alert, ActivityIndicator 
} from 'react-native';
import { BlurView } from 'expo-blur';
import { CameraView, useCameraPermissions } from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';
import { useRouter } from 'expo-router';
import { ArrowLeft, HelpCircle, Image as ImageIcon, Zap, ZapOff } from 'lucide-react-native';

const { width, height } = Dimensions.get('window');

// API Key Mindee bạn đã cung cấp
const MINDEE_API_KEY = "md_0r0pmuZAmz242ClcD2Vad_qinA5d0yvNTwuaKRoccTU"; 

export default function ScanReceiptScreen() {
  const router = useRouter();
  const [permission, requestPermission] = useCameraPermissions();
  const [flash, setFlash] = useState<'off' | 'on'>('off');
  const [isProcessing, setIsProcessing] = useState(false);
  const cameraRef = useRef<CameraView>(null);

  const processWithMindee = async (imageUri: string) => {
    setIsProcessing(true);
    try {
      const formData = new FormData();
      // Sử dụng FormData để gửi ảnh trực tiếp, tránh lỗi readAsStringAsync bị deprecated
      formData.append('document', {
        uri: imageUri,
        name: 'receipt.jpg',
        type: 'image/jpeg',
      } as any);

      const response = await fetch(
        "https://api.mindee.net/v1/products/mindee/expense_receipts/v5/predict",
        {
          method: "POST",
          headers: {
            "Authorization": `Token ${MINDEE_API_KEY}`,
            "Content-Type": "multipart/form-data",
          },
          body: formData,
        }
      );

      const result = await response.json();
      
      // Kiểm tra cấu trúc dữ liệu an toàn để tránh lỗi "AI không tìm thấy dữ liệu"
      const prediction = result?.document?.inference?.prediction;

      // Thiết lập dữ liệu an toàn (Safe Data): Nếu AI không đọc được, để giá trị mặc định thay vì báo lỗi
      const extractedData = {
        amount: prediction?.total_amount?.value?.toString() || "0",
        currency: prediction?.currency?.value || "VND",
        date: prediction?.date?.value || new Date().toISOString().split('T')[0],
        shop: prediction?.supplier_name?.value || "Cửa hàng thủ công",
        addr: prediction?.supplier_address?.value || "Địa chỉ chưa xác định"
      };

      // Chuyển sang màn hình ConfirmReceipt với dữ liệu đã bóc tách
      router.push({
        pathname: '/ConfirmReceipt',
        params: {
          imageUri,
          amount: extractedData.amount,
          currency: extractedData.currency,
          date: extractedData.date,
          location: extractedData.shop,
          address: extractedData.addr,
          category: "Food & Drinks"
        }
      });

    } catch (e: any) {
      console.error("Lỗi Mindee:", e);
      // Hiển thị thông báo nhẹ thay vì văng bảng lỗi đỏ Call Stack
      Alert.alert(
        "Thông báo", 
        "Nova không đọc rõ được hóa đơn. Bạn hãy kiểm tra lại thông tin ở bước tiếp theo nhé."
      );
      
      // Vẫn cho phép người dùng tiếp tục để nhập thủ công
      router.push({
        pathname: '/ConfirmReceipt',
        params: { imageUri, amount: "0", currency: "VND", location: "Chưa xác định" }
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const takePicture = async () => {
    if (cameraRef.current && !isProcessing) {
      const photo = await cameraRef.current.takePictureAsync({ quality: 0.7 }); 
      if (photo) processWithMindee(photo.uri);
    }
  };

  const pickImage = async () => {
    if (isProcessing) return;
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 0.7,
    });
    if (!result.canceled) processWithMindee(result.assets[0].uri);
  };

  if (!permission?.granted) {
    return (
      <View style={styles.container}>
        <TouchableOpacity style={styles.permissionBtn} onPress={requestPermission}>
          <Text style={styles.permissionBtnText}>Cấp quyền Camera</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <CameraView style={styles.camera} ref={cameraRef} enableTorch={flash === 'on'}>
        <SafeAreaView style={styles.overlay}>
          {/* Header UI */}
          <View style={styles.header}>
            <TouchableOpacity onPress={() => router.back()} style={styles.iconBtn}>
              <ArrowLeft color="#fff" size={24} />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Nova Scanner</Text>
            <TouchableOpacity style={styles.iconBtn}><HelpCircle color="#fff" size={24} /></TouchableOpacity>
          </View>

          {/* Scan Area UI */}
          <View style={styles.scanContainer}>
            <View style={styles.detectPill}><Text style={styles.detectText}>MINDEE AI ACTIVE</Text></View>
            <View style={styles.scanFrame}>
              <View style={[styles.corner, { top: 0, left: 0, borderBottomWidth: 0, borderRightWidth: 0 }]} />
              <View style={[styles.corner, { top: 0, right: 0, borderBottomWidth: 0, borderLeftWidth: 0 }]} />
              <View style={[styles.corner, { bottom: 0, left: 0, borderTopWidth: 0, borderRightWidth: 0 }]} />
              <View style={[styles.corner, { bottom: 0, right: 0, borderTopWidth: 0, borderLeftWidth: 0 }]} />
              <View style={styles.scanLine} />
            </View>
          </View>

          {/* Footer Controls */}
          <View style={styles.footer}>
            <TouchableOpacity style={styles.footerBtn} onPress={pickImage}>
              <View style={styles.footerIconBg}><ImageIcon color="#fff" size={24} /></View>
              <Text style={styles.footerBtnText}>Thư viện</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.captureBtn} onPress={takePicture}>
              <View style={styles.captureBtnOuter}><View style={styles.captureBtnInner} /></View>
            </TouchableOpacity>

            <TouchableOpacity style={styles.footerBtn} onPress={() => setFlash(f => f === 'off' ? 'on' : 'off')}>
              <View style={[styles.footerIconBg, flash === 'on' && { backgroundColor: 'rgba(255,215,0,0.3)' }]}>
                {flash === 'on' ? <Zap color="#FFD700" size={24} /> : <ZapOff color="#fff" size={24} />}
              </View>
              <Text style={styles.footerBtnText}>Đèn flash</Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>

        {isProcessing && (
          <View style={styles.loading}>
            <BlurView intensity={80} tint="dark" style={StyleSheet.absoluteFill} />
            <ActivityIndicator size="large" color="#4F46E5" />
            <Text style={styles.loadingText}>Nova đang phân tích hóa đơn...</Text>
          </View>
        )}
      </CameraView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000' },
  camera: { flex: 1 },
  overlay: { flex: 1, justifyContent: 'space-between' },
  header: { flexDirection: 'row', justifyContent: 'space-between', padding: 20, alignItems: 'center' },
  headerTitle: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
  iconBtn: { padding: 8 },
  scanContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  detectPill: { backgroundColor: 'rgba(255, 255, 255, 0.15)', paddingHorizontal: 16, paddingVertical: 6, borderRadius: 20, marginBottom: 20 },
  detectText: { color: '#fff', fontSize: 12, fontWeight: '700' },
  scanFrame: { width: width * 0.75, height: height * 0.45, position: 'relative' },
  corner: { position: 'absolute', width: 25, height: 25, borderColor: '#fff', borderWidth: 4, borderRadius: 5 },
  scanLine: { width: '100%', height: 2, backgroundColor: '#4F46E5', position: 'absolute', top: '50%', opacity: 0.5 },
  footer: { flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', paddingBottom: 40, paddingHorizontal: 20 },
  footerBtn: { alignItems: 'center', width: 80 },
  footerIconBg: { width: 50, height: 50, borderRadius: 15, backgroundColor: 'rgba(255,255,255,0.15)', justifyContent: 'center', alignItems: 'center', marginBottom: 5 },
  footerBtnText: { color: '#fff', fontSize: 12 },
  captureBtn: { width: 80, height: 80, borderRadius: 40, borderWidth: 4, borderColor: 'rgba(255,255,255,0.3)', justifyContent: 'center', alignItems: 'center' },
  captureBtnOuter: { width: 70, height: 70, borderRadius: 35, justifyContent: 'center', alignItems: 'center' },
  captureBtnInner: { width: 60, height: 60, borderRadius: 30, backgroundColor: '#fff' },
  loading: { ...StyleSheet.absoluteFillObject, justifyContent: 'center', alignItems: 'center' },
  loadingText: { color: '#fff', marginTop: 15, fontWeight: '600' },
  permissionBtn: { alignSelf: 'center', marginTop: 100, backgroundColor: '#4F46E5', padding: 15, borderRadius: 12 },
  permissionBtnText: { color: '#fff', fontWeight: 'bold' }
});
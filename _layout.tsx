import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" /> 
      <Stack.Screen name="auth" />
      <Stack.Screen name="login" /> 
      <Stack.Screen name="register" />
      <Stack.Screen name="home" />
      <Stack.Screen name="trips" />
      <Stack.Screen name="planner" />
      <Stack.Screen name="budget" />
      <Stack.Screen name="ScanReceipt" />
      <Stack.Screen name="ConfirmReceipt" />
      <Stack.Screen name="profile" />
      <Stack.Screen name="AI_Plan" />
    </Stack>
  );
}
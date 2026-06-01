import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { MissionProvider } from '../context/MissionContext';

export default function RootLayout() {
  return (
    <MissionProvider>
      <StatusBar style="light" />
      <Stack
        screenOptions={{
          headerStyle: { backgroundColor: '#0A0E1A' },
          headerTintColor: '#00E5FF',
          headerTitleStyle: { fontWeight: 'bold' },
          contentStyle: { backgroundColor: '#121824' },
        }}
      >
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="alerts" options={{ title: 'Alertas Ativos', presentation: 'modal' }} />
        <Stack.Screen name="settings" options={{ title: 'Configurações' }} />
      </Stack>
    </MissionProvider>
  );
}

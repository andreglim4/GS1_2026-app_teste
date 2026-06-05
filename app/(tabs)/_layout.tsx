import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarStyle: { backgroundColor: '#0A0E1A', borderTopColor: '#1A2333', paddingBottom: 6, height: 62 },
        tabBarActiveTintColor: '#00E5FF',
        tabBarInactiveTintColor: '#707E94',
        headerStyle: { backgroundColor: '#0A0E1A', borderBottomWidth: 1, borderBottomColor: '#1A2333' },
        headerTitleStyle: { color: '#FFFFFF', fontWeight: 'bold' },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Sensores',
          headerTitle: 'Sistemas e Telemetria',
          tabBarIcon: ({ color, size }) => <Ionicons name="hardware-chip-outline" size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="energy"
        options={{
          title: 'Energia',
          headerTitle: 'Matriz Energética',
          tabBarIcon: ({ color, size }) => <Ionicons name="flash-outline" size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="comms"
        options={{
          title: 'Comunicações',
          headerTitle: 'Link Orbital',
          tabBarIcon: ({ color, size }) => <Ionicons name="radio-outline" size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="two"
        options={{
          href: null, // Esconde essa aba do navegador
        }}
      />
    </Tabs>
  );
}
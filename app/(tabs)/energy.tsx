import { useRouter } from 'expo-router';
import { useContext } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { MissionContext } from '../../context/MissionContext';

export default function EnergyDashboard() {
  const router = useRouter();
  const context = useContext(MissionContext);

  if (!context) return null;
  const { telemetry } = context;

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.card}>
        <Text style={styles.cardLabel}>Carga das Baterias</Text>
        <Text style={styles.cardValue}>{telemetry.energyLevel}%</Text>
      </View>
      
      <View style={styles.card}>
        <Text style={styles.cardLabel}>Eficiência dos Painéis Solares</Text>
        <Text style={styles.cardValue}>Ideal</Text>
      </View>

      <TouchableOpacity style={styles.actionButton} onPress={() => router.push('/settings')}>
        <Text style={styles.actionText}>Ajustar Consumo</Text>
      </TouchableOpacity>
      
      <TouchableOpacity style={[styles.actionButton, styles.alertButton]} onPress={() => router.push('/alerts')}>
        <Text style={styles.actionText}>Ver Alertas de Energia</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#121824' },
  content: { padding: 16 },
  card: { backgroundColor: '#0A0E1A', padding: 20, borderRadius: 12, marginBottom: 16, borderLeftWidth: 4, borderLeftColor: '#F5A623' }, // Borda amarela/laranja para energia
  cardLabel: { color: '#707E94', fontSize: 12, textTransform: 'uppercase' },
  cardValue: { color: '#FFFFFF', fontSize: 32, fontWeight: 'bold', marginTop: 6 },
  actionButton: { backgroundColor: '#00E5FF', padding: 16, borderRadius: 8, alignItems: 'center', marginTop: 12 },
  alertButton: { backgroundColor: '#FF3B30' },
  actionText: { color: '#0A0E1A', fontWeight: 'bold', fontSize: 16 },
});
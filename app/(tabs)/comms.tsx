import { useRouter } from 'expo-router';
import { useContext } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { MissionContext } from '../../context/MissionContext';

export default function CommsDashboard() {
  const router = useRouter();
  const context = useContext(MissionContext);

  if (!context) return null;
  const { telemetry, telemetryHistory } = context;

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.card}>
        <Text style={styles.cardLabel}>Força do Sinal (Terra)</Text>
        <Text style={styles.cardValue}>{telemetry.signalStrength.toFixed(1)}%</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardLabel}>Status da Telemetria</Text>
        <Text style={styles.cardValue}>Estável</Text>
      </View>

      <View style={styles.chartContainer}>
        <Text style={styles.chartLabel}>Histórico de Sinal</Text>
        <View style={styles.historicList}>
          {telemetryHistory.slice(-5).reverse().map((item, idx) => (
            <Text key={idx} style={styles.historicItem}>
              {idx + 1}. {item.signalStrength.toFixed(1)}%
            </Text>
          ))}
        </View>
      </View>

      <TouchableOpacity style={styles.actionButton} onPress={() => router.push('/settings?tipo=comunicacoes')}>
        <Text style={styles.actionText}>Configurar Antenas</Text>
      </TouchableOpacity>

      <TouchableOpacity style={[styles.actionButton, styles.alertButton]} onPress={() => router.push('/alerts')}>
        <Text style={styles.actionText}>Ver Alertas de Conexão</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#121824' },
  content: { padding: 16 },
  card: { backgroundColor: '#0A0E1A', padding: 20, borderRadius: 12, marginBottom: 16, borderLeftWidth: 4, borderLeftColor: '#B8E986' },
  cardLabel: { color: '#707E94', fontSize: 12, textTransform: 'uppercase' },
  cardValue: { color: '#FFFFFF', fontSize: 32, fontWeight: 'bold', marginTop: 6 },
  chartContainer: { backgroundColor: '#0A0E1A', padding: 12, borderRadius: 12, marginBottom: 16, borderLeftWidth: 4, borderLeftColor: '#00E5FF' },
  chartLabel: { color: '#B8E986', fontSize: 12, textTransform: 'uppercase', fontWeight: 'bold', marginBottom: 8 },
  historicList: { paddingVertical: 8 },
  historicItem: { color: '#D0D6E0', fontSize: 14, lineHeight: 20, paddingVertical: 4 },
  actionButton: { backgroundColor: '#00E5FF', padding: 16, borderRadius: 8, alignItems: 'center', marginTop: 12 },
  alertButton: { backgroundColor: '#FF3B30' },
  actionText: { color: '#0A0E1A', fontWeight: 'bold', fontSize: 16 },
});
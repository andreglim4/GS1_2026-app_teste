import AsyncStorage from '@react-native-async-storage/async-storage';
import { useContext, useEffect, useState } from 'react';
import { ActivityIndicator, ScrollView, StyleSheet, Text, View } from 'react-native';
import { MissionContext } from '../context/MissionContext';

interface AlertItem {
  id: string;
  type: 'danger' | 'warning';
  message: string;
}

export default function AlertsScreen() {
  const context = useContext(MissionContext);
  const [activeAlerts, setActiveAlerts] = useState<AlertItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  if (!context) return null;
  const { telemetry } = context;

  useEffect(() => {
    checkAlerts();
  }, [telemetry]); // Recalcula sempre que a telemetria mudar

  const checkAlerts = async () => {
    try {
      const savedTemp = await AsyncStorage.getItem('@max_temp');
      const savedEnergy = await AsyncStorage.getItem('@min_energy');
      
      // Define limiares padrão caso o usuário ainda não tenha configurado
      const maxTempLimit = savedTemp ? Number(savedTemp) : 30;
      const minEnergyLimit = savedEnergy ? Number(savedEnergy) : 20;

      const newAlerts: AlertItem[] = [];

      // Lógica de Geração de Alertas
      if (telemetry.temperature >= maxTempLimit) {
        newAlerts.push({
          id: 'temp_high',
          type: 'danger',
          message: `CRÍTICO: Temperatura do núcleo (${telemetry.temperature}°C) excedeu o limite seguro de ${maxTempLimit}°C.`,
        });
      }

      if (telemetry.energyLevel <= minEnergyLimit) {
        newAlerts.push({
          id: 'energy_low',
          type: 'warning',
          message: `ATENÇÃO: Nível de energia (${telemetry.energyLevel}%) abaixo da reserva de contingência de ${minEnergyLimit}%.`,
        });
      }

      if (telemetry.signalStrength < 40) {
        newAlerts.push({
          id: 'signal_loss',
          type: 'danger',
          message: `CRÍTICO: Risco de perda de telemetria. Força do sinal em ${telemetry.signalStrength}%.`,
        });
      }

      setActiveAlerts(newAlerts);
    } catch (e) {
      console.log('Erro ao checar alertas', e);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <View style={[styles.container, styles.center]}>
        <ActivityIndicator size="large" color="#00E5FF" />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {activeAlerts.length === 0 ? (
        <View style={styles.emptyState}>
          <Text style={styles.emptyStateText}>Sistemas Operacionais Normais.</Text>
          <Text style={styles.emptyStateSub}>Nenhum alerta crítico detectado no momento.</Text>
        </View>
      ) : (
        activeAlerts.map((alert) => (
          <View 
            key={alert.id} 
            style={[
              styles.alertCard, 
              alert.type === 'danger' ? styles.cardDanger : styles.cardWarning
            ]}
          >
            <Text style={styles.alertTitle}>
              {alert.type === 'danger' ? 'ALERTA VERMELHO' : 'AVISO AMARELO'}
            </Text>
            <Text style={styles.alertMessage}>{alert.message}</Text>
          </View>
        ))
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#121824' },
  content: { padding: 16 },
  center: { justifyContent: 'center', alignItems: 'center' },
  emptyState: { backgroundColor: '#0A0E1A', padding: 24, borderRadius: 12, alignItems: 'center', borderStyle: 'dashed', borderWidth: 1, borderColor: '#1A2333', marginTop: 20 },
  emptyStateText: { color: '#00E5FF', fontSize: 18, fontWeight: 'bold', marginBottom: 8 },
  emptyStateSub: { color: '#707E94', fontSize: 14, textAlign: 'center' },
  alertCard: { padding: 20, borderRadius: 12, marginBottom: 16, borderLeftWidth: 6 },
  cardDanger: { backgroundColor: 'rgba(255, 59, 48, 0.1)', borderLeftColor: '#FF3B30' },
  cardWarning: { backgroundColor: 'rgba(245, 166, 35, 0.1)', borderLeftColor: '#F5A623' },
  alertTitle: { color: '#FFFFFF', fontWeight: 'bold', fontSize: 14, marginBottom: 8 },
  alertMessage: { color: '#D0D6E0', fontSize: 16, lineHeight: 24 },
});
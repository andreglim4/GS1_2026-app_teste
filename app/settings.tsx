import AsyncStorage from '@react-native-async-storage/async-storage';
import { useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { Alert, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function SettingsScreen() {
  const { tipo } = useLocalSearchParams<{ tipo?: string }>();

  const [maxTemp, setMaxTemp] = useState('');
  const [minEnergy, setMinEnergy] = useState('');
  const [minSignal, setMinSignal] = useState('');
  const [maxStability, setMaxStability] = useState('');

  const [errors, setErrors] = useState({ temp: '', energy: '', signal: '', stability: '' });
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    try {
      const savedTemp = await AsyncStorage.getItem('@max_temp');
      const savedEnergy = await AsyncStorage.getItem('@min_energy');
      const savedSignal = await AsyncStorage.getItem('@min_signal');
      const savedStability = await AsyncStorage.getItem('@max_stability');

      if (savedTemp) setMaxTemp(savedTemp);
      if (savedEnergy) setMinEnergy(savedEnergy);
      if (savedSignal) setMinSignal(savedSignal);
      if (savedStability) setMaxStability(savedStability);
    } catch (e) {
      console.log('Erro ao carregar configurações', e);
    }
  };

  const handleSave = async () => {
    let hasError = false;
    let newErrors = { temp: '', energy: '', signal: '', stability: '' };

    // Validação específica por tipo de dashboard
    if (tipo === 'sensores') {
      if (!maxTemp || isNaN(Number(maxTemp))) {
        newErrors.temp = 'Digite um valor numérico válido.';
        hasError = true;
      }
      if (!maxStability || isNaN(Number(maxStability))) {
        newErrors.stability = 'Digite um valor numérico válido.';
        hasError = true;
      }
    } else if (tipo === 'energia') {
      if (!minEnergy || isNaN(Number(minEnergy))) {
        newErrors.energy = 'Digite um valor numérico válido.';
        hasError = true;
      }
    } else if (tipo === 'comunicacoes') {
      if (!minSignal || isNaN(Number(minSignal))) {
        newErrors.signal = 'Digite um valor numérico válido.';
        hasError = true;
      }
    }

    setErrors(newErrors);
    if (hasError) return;

    try {
      // Salva baseado no tipo de dashboard
      if (tipo === 'sensores') {
        await AsyncStorage.setItem('@max_temp', maxTemp);
        await AsyncStorage.setItem('@max_stability', maxStability);
        Alert.alert('✅ Sensores Configurados', 'Parâmetros de temperatura e estabilidade orbital salvos!');
      } else if (tipo === 'energia') {
        await AsyncStorage.setItem('@min_energy', minEnergy);
        Alert.alert('✅ Energia Configurada', 'Limiar de energia mínima salvo!');
      } else if (tipo === 'comunicacoes') {
        await AsyncStorage.setItem('@min_signal', minSignal);
        Alert.alert('✅ Comunicações Configuradas', 'Limiar de sinal mínimo salvo!');
      }

      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    } catch (e) {
      Alert.alert('❌ Erro', 'Falha ao salvar as configurações.');
    }
  };

  // Define cores e conteúdo baseado no tipo
  const getConfig = () => {
    switch (tipo) {
      case 'sensores':
        return {
          title: '🔧 Sensores',
          subtitle: 'Configure temperatura e estabilidade orbital',
          accentColor: '#00E5FF',
          backgroundColor: 'rgba(0, 229, 255, 0.1)',
        };
      case 'energia':
        return {
          title: '⚡ Energia',
          subtitle: 'Configure nível mínimo de energia',
          accentColor: '#F5A623',
          backgroundColor: 'rgba(245, 166, 35, 0.1)',
        };
      case 'comunicacoes':
        return {
          title: '📡 Comunicações',
          subtitle: 'Configure força mínima de sinal',
          accentColor: '#B8E986',
          backgroundColor: 'rgba(184, 233, 134, 0.1)',
        };
      default:
        return {
          title: '⚙️  Configurações',
          subtitle: 'Defina parâmetros da missão',
          accentColor: '#00E5FF',
          backgroundColor: 'rgba(0, 229, 255, 0.1)',
        };
    }
  };

  const config = getConfig();

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        {/* Cabeçalho temático */}
        <View style={[styles.header, { borderBottomColor: config.accentColor, backgroundColor: config.backgroundColor }]}>
          <Text style={styles.headerTitle}>{config.title}</Text>
          <Text style={styles.headerSubtitle}>{config.subtitle}</Text>
        </View>

        {/* Renderiza campos específicos por tipo */}
        {(tipo === 'sensores' || !tipo) && (
          <>
            <View style={styles.inputGroup}>
              <Text style={[styles.label, { color: config.accentColor }]}>Temperatura Máxima do Núcleo (°C)</Text>
              <TextInput
                style={[styles.input, errors.temp ? styles.inputError : null]}
                value={maxTemp}
                onChangeText={setMaxTemp}
                keyboardType="numeric"
                placeholder="Ex: 30"
                placeholderTextColor="#707E94"
              />
              {errors.temp ? <Text style={styles.errorText}>{errors.temp}</Text> : null}
            </View>

            <View style={styles.inputGroup}>
              <Text style={[styles.label, { color: config.accentColor }]}>Estabilidade Orbital Mínima (%)</Text>
              <TextInput
                style={[styles.input, errors.stability ? styles.inputError : null]}
                value={maxStability}
                onChangeText={setMaxStability}
                keyboardType="numeric"
                placeholder="Ex: 85"
                placeholderTextColor="#707E94"
              />
              {errors.stability ? <Text style={styles.errorText}>{errors.stability}</Text> : null}
            </View>
          </>
        )}

        {(tipo === 'energia' || !tipo) && (
          <View style={styles.inputGroup}>
            <Text style={[styles.label, { color: config.accentColor }]}>Nível Mínimo de Energia (%)</Text>
            <TextInput
              style={[styles.input, errors.energy ? styles.inputError : null]}
              value={minEnergy}
              onChangeText={setMinEnergy}
              keyboardType="numeric"
              placeholder="Ex: 20"
              placeholderTextColor="#707E94"
            />
            {errors.energy ? <Text style={styles.errorText}>{errors.energy}</Text> : null}
          </View>
        )}

        {tipo === 'comunicacoes' && (
          <View style={styles.inputGroup}>
            <Text style={[styles.label, { color: config.accentColor }]}>Força Mínima de Sinal (%)</Text>
            <TextInput
              style={[styles.input, errors.signal ? styles.inputError : null]}
              value={minSignal}
              onChangeText={setMinSignal}
              keyboardType="numeric"
              placeholder="Ex: 40"
              placeholderTextColor="#707E94"
            />
            {errors.signal ? <Text style={styles.errorText}>{errors.signal}</Text> : null}
          </View>
        )}

        {/* Botão com feedback visual */}
        <TouchableOpacity
          style={[styles.saveButton, { backgroundColor: config.accentColor }]}
          onPress={handleSave}
        >
          <Text style={styles.saveButtonText}>{saved ? '✅ Salvo!' : 'Gravar Configurações'}</Text>
        </TouchableOpacity>

        {saved && (
          <View style={[styles.successMessage, { borderLeftColor: config.accentColor }]}>
            <Text style={styles.successText}>Configurações aplicadas com sucesso!</Text>
          </View>
        )}
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#121824' },
  content: { padding: 20 },

  header: {
    padding: 20,
    borderRadius: 12,
    marginBottom: 24,
    borderBottomWidth: 3,
  },

  headerTitle: { color: '#FFFFFF', fontSize: 24, fontWeight: 'bold', marginBottom: 4 },
  headerSubtitle: { color: '#707E94', fontSize: 14 },

  inputGroup: { marginBottom: 20 },
  label: { fontSize: 12, textTransform: 'uppercase', marginBottom: 8, fontWeight: 'bold' },

  input: {
    backgroundColor: '#0A0E1A',
    color: '#FFFFFF',
    padding: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#1A2333',
    fontSize: 16
  },
  inputError: { borderColor: '#FF3B30' },
  errorText: { color: '#FF3B30', fontSize: 12, marginTop: 4 },

  saveButton: { padding: 16, borderRadius: 8, alignItems: 'center', marginTop: 12 },
  saveButtonText: { color: '#0A0E1A', fontWeight: 'bold', fontSize: 16 },

  successMessage: {
    backgroundColor: 'rgba(52, 211, 153, 0.1)',
    borderLeftWidth: 4,
    padding: 12,
    borderRadius: 8,
    marginTop: 16,
  },
  successText: { color: '#34D399', fontSize: 14, fontWeight: '600' },
});

import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';
import { Alert, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function SettingsScreen() {
  // Estados para os inputs (limiares críticos)
  const [maxTemp, setMaxTemp] = useState('');
  const [minEnergy, setMinEnergy] = useState('');
  
  // Estado para feedback de erro na validação
  const [errors, setErrors] = useState({ temp: '', energy: '' });

  // Carrega os dados salvos assim que a tela abre
  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    try {
      const savedTemp = await AsyncStorage.getItem('@max_temp');
      const savedEnergy = await AsyncStorage.getItem('@min_energy');
      
      if (savedTemp) setMaxTemp(savedTemp);
      if (savedEnergy) setMinEnergy(savedEnergy);
    } catch (e) {
      console.log('Erro ao carregar configurações', e);
    }
  };

  const handleSave = async () => {
    let hasError = false;
    let newErrors = { temp: '', energy: '' };

    // Validação dos Inputs
    if (!maxTemp || isNaN(Number(maxTemp))) {
      newErrors.temp = 'Digite um valor numérico válido.';
      hasError = true;
    }
    if (!minEnergy || isNaN(Number(minEnergy))) {
      newErrors.energy = 'Digite um valor numérico válido.';
      hasError = true;
    }

    setErrors(newErrors);

    if (hasError) return; // Barra o salvamento se houver erro

    // Persistência com AsyncStorage
    try {
      await AsyncStorage.setItem('@max_temp', maxTemp);
      await AsyncStorage.setItem('@min_energy', minEnergy);
      Alert.alert('Sucesso', 'Parâmetros de missão atualizados e salvos no sistema.');
    } catch (e) {
      Alert.alert('Erro', 'Falha ao salvar as configurações.');
    }
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'} 
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.headerTitle}>Limiares de Alerta</Text>
        <Text style={styles.headerSubtitle}>Defina quando o sistema deve gerar avisos críticos.</Text>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Temperatura Máxima do Núcleo (°C)</Text>
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
          <Text style={styles.label}>Nível Mínimo de Energia (%)</Text>
          <TextInput
            style={[styles.input, errors.energy ? styles.inputError : null]}
            value={minEnergy}
            onChangeText={setMinEnergy}
            keyboardType="numeric"
            placeholder="Ex: 15"
            placeholderTextColor="#707E94"
          />
          {errors.energy ? <Text style={styles.errorText}>{errors.energy}</Text> : null}
        </View>

        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.saveButtonText}>Gravar Configurações</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#121824' },
  content: { padding: 20 },
  headerTitle: { color: '#FFFFFF', fontSize: 24, fontWeight: 'bold', marginBottom: 4 },
  headerSubtitle: { color: '#707E94', fontSize: 14, marginBottom: 24 },
  inputGroup: { marginBottom: 20 },
  label: { color: '#00E5FF', fontSize: 12, textTransform: 'uppercase', marginBottom: 8, fontWeight: 'bold' },
  input: { backgroundColor: '#0A0E1A', color: '#FFFFFF', padding: 16, borderRadius: 8, borderWidth: 1, borderColor: '#1A2333', fontSize: 16 },
  inputError: { borderColor: '#FF3B30' },
  errorText: { color: '#FF3B30', fontSize: 12, marginTop: 4 },
  saveButton: { backgroundColor: '#00E5FF', padding: 16, borderRadius: 8, alignItems: 'center', marginTop: 12 },
  saveButtonText: { color: '#0A0E1A', fontWeight: 'bold', fontSize: 16 },
});
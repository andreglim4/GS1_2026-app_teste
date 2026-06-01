import React, { createContext, useEffect, useState } from 'react';

export interface TelemetryData {
  temperature: number;
  energyLevel: number;
  signalStrength: number;
  orbitalStability: number;
}

interface MissionContextType {
  telemetry: TelemetryData;
  isDarkMode: boolean;
}

export const MissionContext = createContext<MissionContextType | undefined>(undefined);

export function MissionProvider({ children }: { children: React.ReactNode }) {
  const [telemetry, setTelemetry] = useState<TelemetryData>({
    temperature: 24.5,
    energyLevel: 88.2,
    signalStrength: 94.0,
    orbitalStability: 99.1,
  });

  const [isDarkMode] = useState<boolean>(true);

  // Motor de simulação em tempo real
  useEffect(() => {
    const interval = setInterval(() => {
      setTelemetry((prev) => {
        // Gera pequenas oscilações aleatórias para simular os sensores
        const tempFluctuation = (Math.random() * 2 - 1).toFixed(1);
        const energyDrop = (Math.random() * 0.5).toFixed(1);
        const signalFluctuation = (Math.random() * 4 - 2).toFixed(1);
        const stabilityFluctuation = (Math.random() * 0.2 - 0.1).toFixed(2);

        return {
          temperature: Number((prev.temperature + Number(tempFluctuation)).toFixed(1)),
          // A energia cai aos poucos, mas não passa de 0
          energyLevel: Math.max(0, Number((prev.energyLevel - Number(energyDrop)).toFixed(1))),
          // O sinal oscila entre 0 e 100
          signalStrength: Math.min(100, Math.max(0, Number((prev.signalStrength + Number(signalFluctuation)).toFixed(1)))),
          // Estabilidade oscila de leve
          orbitalStability: Math.min(100, Math.max(0, Number((prev.orbitalStability + Number(stabilityFluctuation)).toFixed(2)))),
        };
      });
    }, 3000); // Atualiza os dados a cada 3 segundos

    return () => clearInterval(interval);
  }, []);

  return (
    <MissionContext.Provider value={{ telemetry, isDarkMode }}>
      {children}
    </MissionContext.Provider>
  );
}
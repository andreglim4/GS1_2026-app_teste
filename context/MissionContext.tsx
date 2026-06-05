import React, { createContext, useEffect, useState, ReactNode } from 'react';

export interface Telemetry {
  temperature: number;
  energyLevel: number;
  signalStrength: number;
  orbitalStability: number;
}

export interface TelemetryHistoryItem {
  temperature: number;
  energyLevel: number;
  signalStrength: number;
  timestamp: number;
}

export interface MissionContextType {
  telemetry: Telemetry;
  telemetryHistory: TelemetryHistoryItem[];
  isDarkMode: boolean;
}

export const MissionContext = createContext<MissionContextType | undefined>(undefined);

interface MissionProviderProps {
  children: ReactNode;
}

export const MissionProvider: React.FC<MissionProviderProps> = ({ children }) => {
  const [telemetry, setTelemetry] = useState<Telemetry>({
    temperature: 24.5,
    energyLevel: 88.2,
    signalStrength: 94.0,
    orbitalStability: 99.1,
  });

  const [telemetryHistory, setTelemetryHistory] = useState<TelemetryHistoryItem[]>([
    { temperature: 20, energyLevel: 88, signalStrength: 90, timestamp: Date.now() - 10000 },
    { temperature: 21, energyLevel: 87, signalStrength: 91, timestamp: Date.now() - 8000 },
    { temperature: 24.5, energyLevel: 88.2, signalStrength: 94.0, timestamp: Date.now() },
  ]);

  const [isDarkMode] = useState<boolean>(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setTelemetry(prev => {
        const tempFluctuation = (Math.random() * 2 - 1).toFixed(1);
        const energyDrop = (Math.random() * 0.5).toFixed(1);
        const signalFluctuation = (Math.random() * 4 - 2).toFixed(1);
        const stabilityFluctuation = (Math.random() * 0.2 - 0.1).toFixed(2);

        const newTelemetry = {
          temperature: Number((prev.temperature + Number(tempFluctuation)).toFixed(1)),
          energyLevel: Math.max(0, Number((prev.energyLevel - Number(energyDrop)).toFixed(1))),
          signalStrength: Math.min(100, Math.max(0, Number((prev.signalStrength + Number(signalFluctuation)).toFixed(1)))),
          orbitalStability: Math.min(100, Math.max(0, Number((prev.orbitalStability + Number(stabilityFluctuation)).toFixed(2)))),
        };

        setTelemetryHistory(prevHistory => [
          ...prevHistory,
          {
            temperature: newTelemetry.temperature,
            energyLevel: newTelemetry.energyLevel,
            signalStrength: newTelemetry.signalStrength,
            timestamp: Date.now(),
          },
        ].slice(-20));

        return newTelemetry;
      });
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <MissionContext.Provider value={{ telemetry, telemetryHistory, isDarkMode }}>
      {children}
    </MissionContext.Provider>
  );
};

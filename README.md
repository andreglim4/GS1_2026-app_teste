# 🚀 Space Predictive Analytics
### Global Solution 2026.1 — Cross-Platform Application Development | FIAP

---

## 📋 Descrição

*Space Predictive Analytics* é uma plataforma inteligente de análise preditiva para monitoramento de sistemas espaciais e operações orbitais simuladas. A aplicação coleta, organiza e processa dados de telemetria em tempo real, apresentando dashboards analíticos com visualização de indicadores críticos, geração automática de alertas baseados em limiares configuráveis e interpretação das informações monitoradas. O diferencial da solução é a abordagem integrada de Context API para estado global, persistência robusta com AsyncStorage e interface temática espacial com paleta neon totalmente imersiva.

---

## 👥 Equipe

| Nome | RM |
|------|----|
| André Ayello de Nobrega | RM561754 |
|  André Gouveia de Lima  | RM564219 |
|   Mirella Mascarenhas   | RM562092 |

---

## 📱 Telas do Aplicativo

| Imagem                                                                                                                             | Tela                      | Descrição                                                                                                                             |

| ---------------------------------------------------------------------------------------------------------------------------------- | ------------------------- | ------------------------------------------------------------------------------------------------------------------------------------- |

| <img width="372" height="835" alt="image" src="https://github.com/user-attachments/assets/a4c35117-2d0f-4357-a8d6-26d93f04d729" /> | Sistemas e Telemetria     | Visão geral dos indicadores da missão: estabilidade orbital, temperatura do núcleo, com histórico e acesso a configurações e alertas. |

| <img width="373" height="825" alt="image" src="https://github.com/user-attachments/assets/42112502-de5a-4c0b-920c-92d8dd1542b7" /> | Config. Sensores          | Ajuste dos limites de temperatura máxima e estabilidade orbital mínima.                                                               |

| <img width="375" height="838" alt="image" src="https://github.com/user-attachments/assets/33fc24ec-80b2-43da-b5f8-c3cdf6498b64" /> | Confirmação Sensores      | Modal de sucesso confirmando salvamento dos parâmetros.                                                                               |

| <img width="371" height="824" alt="image" src="https://github.com/user-attachments/assets/1fcf3e25-38fe-44e1-b68d-48b9afef80a8" /> | Matriz Energética         | Visão geral da energia: carga das baterias, eficiência dos painéis solares e histórico de consumo.                                    |

| <img width="371" height="829" alt="image" src="https://github.com/user-attachments/assets/4a2878ee-2663-4376-8062-c6ee4de31c76" /> | Config. Energia           | Ajuste do nível mínimo de energia da bateria                                                                                          |

| <img width="378" height="830" alt="image" src="https://github.com/user-attachments/assets/c9f5b2e6-1ae9-4522-88d5-4210e00cf55b" /> | Confirmação Energia       | Modal confirmando salvamento do limite de energia.                                                                                    |

| <img width="370" height="834" alt="image" src="https://github.com/user-attachments/assets/3c53340b-00c2-4197-bcca-9ab79980a924" /> | Link Orbital              | Visão geral das comunicações: força do sinal, status da telemetria e histórico.                                                       |

| <img width="375" height="833" alt="image" src="https://github.com/user-attachments/assets/14650b53-e8fa-4ff5-b862-738f00a4eb35" /> | Config. Comunicações      | Ajuste da força mínima de sinal necessária.                                                                                           |

| <img width="374" height="825" alt="image" src="https://github.com/user-attachments/assets/982a8d32-21b5-4e23-9c95-39e2a401f975" /> | Alertas Ativos (Vazio)    | Tela de alertas sem eventos — sistema operacional normal.                                                                             |

| <img width="376" height="839" alt="image" src="https://github.com/user-attachments/assets/5cecb788-aa2d-4f1c-bad5-35e98b3f3b5d" /> | Alertas Ativos (Críticos) | Exibição de alertas vermelhos e avisos amarelos sobre temperatura, energia e sinal.                                                   |


---

## ✨ Funcionalidades

- [x] Dashboard com indicadores em tempo real (simulado)
- [x] Sistema de alertas automáticos por limiar crítico
- [x] Persistência de configurações com AsyncStorage
- [x] Navegação com Expo Router (Tabs + Stack)
- [x] Context API para estado global da missão
- [x] Formulário de configuração com validação
- [x] Simulação de dados de telemetria (3s interval)
- [x] Interface temática espacial com paleta neon
- [x] Layout responsivo
- [x] TypeScript para type safety
- [x] Histórico de telemetria (últimas 20 leituras)
- [x] Alertas dinâmicos com cores distintas (crítico/aviso)

---

## 🛠️ Tecnologias Utilizadas

- *React Native* + *Expo* - Framework cross-platform
- *Expo Router* - Roteamento e navegação (Tabs + Stack)
- *Context API* - Gerenciamento de estado global
- *AsyncStorage* - Persistência de dados
- *TypeScript* - Tipagem estática
- *@expo/vector-icons* - Ícones temáticos
- *React Native Web* - Suporte a plataforma web

---

## 🚀 Como Executar

### Pré-requisitos
- Node.js instalado (v14+)
- npm ou yarn
- Expo CLI: npm install -g expo-cli
- Expo Go instalado no celular (iOS ou Android) - opcional para testes móveis

### Instalação

1. *Clone o repositório*
bash
git clone https://github.com/andreglim4/GS1_2026-app_teste
cd GS1_2026-app_teste


2. *Instale as dependências*
bash
npm install


3. *Inicie o projeto*
bash
npx expo start


4. *Acesse a aplicação*
- *Web (Recomendado)*: Abra http://localhost:8081 no navegador ou pressione W no terminal
- *Android com Expo Go*: Pressione A no terminal e siga as instruções, ou escaneie o QR Code com Expo Go
- *iOS com Expo Go*: Pressione I no terminal, ou escaneie o QR Code com a câmera

---

## 📊 Estrutura de Pastas


GS1_2026-app_teste/
├── app/
│   ├── _layout.tsx                 # Root layout (Stack)
│   ├── (tabs)/
│   │   ├── _layout.tsx             # Tabs navigation
│   │   ├── index.tsx               # Dashboard Sensores
│   │   ├── energy.tsx              # Dashboard Energia
│   │   └── comms.tsx               # Dashboard Comunicações
│   ├── alerts.tsx                  # Tela de Alertas
│   ├── settings.tsx                # Tela de Configurações
│   └── modal.tsx                   # Modal genérico
├── context/
│   └── MissionContext.tsx          # Context API com telemetria
├── constants/
│   └── Colors.ts                   # Paleta de cores
├── components/
│   ├── EditScreenInfo.tsx
│   ├── ExternalLink.tsx
│   ├── StyledText.tsx
│   ├── Themed.tsx
│   └── useColorScheme.ts
├── assets/
│   ├── fonts/
│   ├── images/
│   └── screenshots/                # Screenshots das telas
├── package.json
├── tsconfig.json
└── README.md


---

## 🎨 Design & Temática

### Paleta de Cores (Espacial/Neon)

| Cor | Código | Uso |
|-----|--------|-----|
| Fundo Primário | #0A0E1A | Fundo de cards |
| Fundo Secundário | #121824 | Background geral |
| Destaque Ciano | #00E5FF | Sensor/Primário |
| Destaque Ouro | #F5A623 | Energia |
| Destaque Verde | #B8E986 | Comunicações |
| Crítico (Vermelho) | #FF3B30 | Alertas críticos |
| Texto Primário | #FFFFFF | Títulos e valores |
| Texto Secundário | #707E94 | Labels e hints |

---

## 📈 Fluxo de Dados


MissionContext (simulação 3s)
       ↓
   Dashboards → Alertas → Settings
       ↓
   AsyncStorage (persistência)


- *MissionContext* simula dados de telemetria atualizando a cada 3 segundos
- *Componentes* consomem via useContext(MissionContext)
- *AlertsScreen* lê limiares do AsyncStorage para gerar alertas dinâmicos
- *SettingsScreen* permite salvar novos limiares persistidos localmente

---

## 🔧 Configuração de Limiares

Os limiares padrão (caso o usuário não configure) são:

- *Temperatura Máxima do Núcleo*: 30°C
- *Estabilidade Orbital Mínima*: 85%
- *Nível Mínimo de Energia*: 20%
- *Força Mínima de Sinal*: 40%

Esses valores podem ser alterados via tela de Configurações e são salvos em AsyncStorage.

---

## 🚨 Sistema de Alertas

O sistema gera alertas baseado em 4 condições:

| Alerta | Tipo | Condição |
|--------|------|----------|
| Temperatura Crítica | 🔴 Danger | Temperatura ≥ Limite configurado |
| Estabilidade Baixa | 🟡 Warning | Estabilidade < Limite configurado |
| Energia Baixa | 🟡 Warning | Energia ≤ Limite configurado |
| Perda de Sinal | 🔴 Danger | Sinal < Limite configurado |

---

## 📹 Vídeo de Demonstração



https://github.com/user-attachments/assets/5de5711a-7951-445a-a155-c32c07947a20



Para assistir o vídeo completo clique [aqui](https://youtube.com/shorts/aQoDbs_oCZE?feature=share)

*Duração*: Máximo 3 minutos

---

## 📝 Critérios do Projeto

| Critério | Pontos | Status |
|----------|--------|--------|
| Navegação Expo Router | 10 | ✅ |
| Dashboards (3+) | 20 | ✅ |
| Gerenciamento Estado | 15 | ✅ |
| AsyncStorage | 10 | ✅ |
| Formulários | 10 | ✅ |
| Sistema Alertas | 10 | ✅ |
| Visual/UX | 10 | ✅ |
| Organização Código | 10 | ✅ |
| Vídeo | 5 | ⏳ |
| *TOTAL* | *100* | *95+* |

---

## 🎯 Diferenciais Implementados

✅ *TypeScript* — Tipagem consistente em todo o projeto  
✅ *Context API* — Gerenciamento robusto de estado global  
✅ *AsyncStorage* — Persistência de dados entre sessões  
✅ *Validação em Tempo Real* — Formulários com feedback visual  
✅ *Paleta Temática Neon* — Design imersivo espacial  
✅ *Responsividade* — Testado em múltiplos tamanhos de tela  

---

## 📌 Notas Importantes

- O app foi desenvolvido com *React Native + Expo* em *TypeScript*
- A simulação de dados ocorre a cada *3 segundos* via useEffect
- Histórico de telemetria mantém as últimas *20 leituras*
- Todos os dados de configuração são salvos em *AsyncStorage* e persistem entre sessões
- A navegação usa *Expo Router* com estrutura de *Tabs* para dashboards e *Stack* para modais

---

## 📄 Licença

Este projeto foi desenvolvido para fins acadêmicos — *FIAP 2026*.


#KeepCoding #ReactNative #FIAP #GlobalSolution2026

*"O único modo de aprender programação é programando."*

# 👁️ Pausa Occhi — Regola 20·20·20

App React Native (Expo) per proteggere i tuoi occhi seguendo la regola 20-20-20:
ogni 20 minuti di schermo, 20 secondi di pausa guardando a 6 metri di distanza.

---

## ✨ Funzionalità

| Funzione | Descrizione |
|---|---|
| **Timer Manuale** | Countdown circolare da 20 min → pausa 20 sec con animazione breathing |
| **Modalità Automatica** | Monitora lo schermo via `AppState` e invia notifiche dopo 20 min consecutivi |
| **Notifiche Push** | Notifiche native iOS/Android tramite `expo-notifications` |
| **Contatore Sessioni** | Traccia sessioni completate + promemoria automatici della giornata |
| **UI Zen Dark Mode** | Interfaccia minimale con accenti verde menta / blu pastello |

---

## 🚀 Setup Rapido

### 1. Prerequisiti

- **Node.js** ≥ 18
- **Expo CLI**: `npm install -g expo-cli`
- **Expo Go** installata sul telefono ([iOS](https://apps.apple.com/app/expo-go/id982107779) / [Android](https://play.google.com/store/apps/details?id=host.exp.exponent))

### 2. Installazione

```bash
# Clona o copia la cartella del progetto, poi:
cd pausa-occhi

# Installa dipendenze
npm install
```

### 3. Avvia il progetto

```bash
npx expo start
```

Scansiona il **QR code** dal terminale con l'app Expo Go.

---

## 📁 Struttura Progetto

```
pausa-occhi/
├── App.js                          # Entry point principale
├── app.json                        # Configurazione Expo
├── package.json                    # Dipendenze
├── babel.config.js                 # Babel config
├── assets/                         # Icone e splash screen
│   ├── icon.png
│   ├── adaptive-icon.png
│   ├── splash.png
│   └── notification-icon.png
└── src/
    ├── components/
    │   ├── CircularProgress.js     # Anello SVG del timer
    │   ├── PulsingCircle.js        # Animazione breathing (pausa)
    │   ├── TimerDisplay.js         # Display countdown centrale
    │   ├── Controls.js             # Pulsanti play/pause/reset
    │   ├── AutoModePanel.js        # Pannello Modalità Automatica
    │   └── StatsCard.js            # Card statistiche giornaliere
    ├── hooks/
    │   └── useAppState.js          # Hook monitoraggio AppState
    └── utils/
        └── notifications.js        # Setup e invio notifiche push
```

---

## 🔔 Come funziona la Modalità Automatica

1. Attiva lo **Switch** "Modalità Automatica"
2. L'hook `useAppState` ascolta `AppState.addEventListener('change')`
3. Quando lo schermo è **attivo** (`active`) → il timer auto conta i secondi
4. Se raggiungi **20 minuti consecutivi** → parte una **notifica push**
5. Se lo schermo si **spegne** (`background`/`inactive`) → il timer si **resetta a zero**
6. Questo evita notifiche inutili quando non stai usando il telefono

---

## 📦 Dipendenze Principali

| Pacchetto | Uso |
|---|---|
| `expo` | Framework di base |
| `expo-notifications` | Notifiche push native |
| `react-native-svg` | Anello circolare del timer |
| `lucide-react-native` | Icone (Eye, Play, Pause, Bell, ecc.) |
| `react-native-safe-area-context` | Safe area per notch/island |
| `@react-native-async-storage/async-storage` | Persistenza dati locale |

---

## 📱 Build di Produzione

```bash
# Installa EAS CLI
npm install -g eas-cli

# Login Expo
eas login

# Build Android APK
eas build --platform android --profile preview

# Build iOS (richiede account Apple Developer)
eas build --platform ios --profile preview
```

---

## 📝 Note

- Su **Expo Go**, le notifiche push funzionano direttamente su dispositivo fisico
- Su **emulatore iOS**, le notifiche push **non** funzionano (limitazione Apple)
- Per il **background monitoring** avanzato, considera `expo-background-fetch` o `expo-task-manager`
- Gli asset placeholder (`icon.png`, `splash.png`) vanno sostituiti con i tuoi

---

*Prenditi cura dei tuoi occhi* 👁️

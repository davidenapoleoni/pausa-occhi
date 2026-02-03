import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, Dimensions } from 'react-native';
import Svg, { Circle } from 'react-native-svg';
import { Eye, Play, Pause, RotateCcw } from 'lucide-react-native';

const { width } = Dimensions.get('window');
const WORK_DURATION = 20 * 60; // 20 minuti

export default function App() {
  const [timeLeft, setTimeLeft] = useState(WORK_DURATION);
  const [isRunning, setIsRunning] = useState(false);

  // Logica del Timer
  useEffect(() => {
    let interval;
    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isRunning, timeLeft]);

  const formatTime = (s) => {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${m.toString().padStart(2, "0")}:${sec.toString().padStart(2, "0")}`;
  };

  const resetTimer = () => {
    setIsRunning(false);
    setTimeLeft(WORK_DURATION);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Eye size={28} color="#93c5fd" />
        <Text style={styles.title}>PAUSA OCCHI</Text>
      </View>

      <View style={styles.timerContainer}>
        <Svg height="250" width="250" viewBox="0 0 100 100">
          <Circle
            cx="50"
            cy="50"
            r="45"
            stroke="rgba(255,255,255,0.05)"
            strokeWidth="3"
            fill="none"
          />
          <Circle
            cx="50"
            cy="50"
            r="45"
            stroke="#93c5fd"
            strokeWidth="3"
            fill="none"
            strokeDasharray="282.6"
            strokeDashoffset={282.6 * (1 - timeLeft / WORK_DURATION)}
            strokeLinecap="round"
          />
        </Svg>
        <View style={styles.timeOverlay}>
          <Text style={styles.timeText}>{formatTime(timeLeft)}</Text>
          <Text style={styles.statusText}>{isRunning ? "In corso" : "Pronto"}</Text>
        </View>
      </View>

      <View style={styles.controls}>
        <TouchableOpacity style={styles.resetBtn} onPress={resetTimer}>
          <RotateCcw size={24} color="#fff" />
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.playBtn} 
          onPress={() => setIsRunning(!isRunning)}
        >
          {isRunning ? (
            <Pause size={35} color="#0f172a" fill="#0f172a" />
          ) : (
            <Play size={35} color="#0f172a" fill="#0f172a" />
          )}
        </TouchableOpacity>
        
        <View style={{ width: 50 }} /> 
      </View>
      
      <Text style={styles.footerText}>REGOLA 20-20-20</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f172a', // Blu molto scuro
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 50,
  },
  title: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
    marginLeft: 10,
    letterSpacing: 3,
  },
  timerContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  timeOverlay: {
    position: 'absolute',
    alignItems: 'center',
  },
  timeText: {
    color: '#fff',
    fontSize: 54,
    fontWeight: '200',
    fontFamily: 'sans-serif-thin',
  },
  statusText: {
    color: '#94a3b8',
    fontSize: 12,
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginTop: 5,
  },
  controls: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 60,
    width: '100%',
  },
  playBtn: {
    backgroundColor: '#93c5fd',
    width: 80,
    height: 80,
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 10,
    shadowColor: '#93c5fd',
    shadowOpacity: 0.3,
    shadowRadius: 15,
  },
  resetBtn: {
    backgroundColor: 'rgba(255,255,255,0.05)',
    width: 55,
    height: 55,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 20,
  },
  footerText: {
    position: 'absolute',
    bottom: 40,
    color: '#475569',
    fontSize: 10,
    letterSpacing: 2,
  },
});
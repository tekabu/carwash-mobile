import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  TouchableOpacity,
} from 'react-native';

const { width } = Dimensions.get('window');

const phases = [
  {
    key: 'pre-rinse',
    title: 'Pre-Rinsing the vehicle',
    image: require('../../assets/step_1.png'),
  },
  {
    key: 'apply-soap',
    title: 'Applying soap and brushing the vehicle',
    image: require('../../assets/step_2.png'),
  },
  {
    key: 'rinse',
    title: 'Rinsing the vehicle',
    image: require('../../assets/step_3.png'),
  },
  {
    key: 'dry',
    title: 'Drying the vehicle',
    image: require('../../assets/step_4.png'),
  },
  {
    key: 'complete',
    title: 'Carwash complete!',
    image: require('../../assets/step_5.png'),
  },
];

export default function ProgressScreen({ navigation, route }) {
  const [phaseIndex, setPhaseIndex] = useState(0);
  const customerType = route?.params?.customerType ?? 'guest';

  const currentPhase = phases[phaseIndex];
  const completion = Math.min(100, (phaseIndex + 1) * 20);
  const stepLabel = `STEP ${phaseIndex + 1} \u2022 ${completion}%`;

  const handleNextPhase = () => {
    if (phaseIndex >= phases.length - 1) {
      if (customerType === 'member') {
        navigation.navigate('Congrats', { customerType });
      } else {
        navigation.navigate('Balance', { customerType });
      }
      return;
    }

    setPhaseIndex((prev) => prev + 1);
  };

  return (
    <View style={styles.page}>
      <View style={styles.card}>
        <Text style={styles.header}>Carwash Progress</Text>
        <TouchableOpacity style={styles.iconWrap} onPress={handleNextPhase} activeOpacity={0.85}>
          <Image source={currentPhase.image} style={styles.icon} resizeMode="contain" />
        </TouchableOpacity>
        <Text style={styles.stepLabel}>{stepLabel}</Text>
        <Text style={styles.status}>{currentPhase.title}</Text>
        <View style={styles.progressTrack} accessibilityLabel="Progress bar">
          <View style={[styles.progressFill, { width: `${completion}%` }]} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: '#ededed',
    paddingTop: 32,
    paddingBottom: 24,
    paddingHorizontal: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    width: '100%',
    maxWidth: 500,
    backgroundColor: '#fff',
    borderRadius: 32,
    padding: 28,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 16 },
    shadowOpacity: 0.12,
    shadowRadius: 25,
    elevation: 10,
  },
  header: {
    backgroundColor: '#1f7b2c',
    color: '#fff',
    borderRadius: 999,
    paddingVertical: 10,
    paddingHorizontal: 18,
    marginBottom: 10,
    fontWeight: '600',
    fontSize: 20,
  },
  iconWrap: {
    marginTop: 14,
    width: Math.min(width * 0.65, 220),
    height: Math.min(width * 0.65, 220),
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fdfdfd',
    padding: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.1,
    shadowRadius: 24,
    elevation: 6,
  },
  icon: {
    width: '100%',
    height: '100%',
  },
  stepLabel: {
    marginTop: 16,
    fontSize: 14,
    fontWeight: '600',
    color: '#4a4a4a',
    letterSpacing: 1,
  },
  status: {
    marginTop: 4,
    fontSize: 20,
    fontWeight: '700',
    color: '#111',
    textAlign: 'center',
  },
  progressTrack: {
    marginTop: 18,
    width: '100%',
    height: 18,
    borderRadius: 999,
    backgroundColor: '#d9e2f0',
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 999,
    backgroundColor: '#1f7b2c',
  },
});

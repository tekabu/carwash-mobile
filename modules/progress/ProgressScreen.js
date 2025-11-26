import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
} from 'react-native';
import mqtt from 'mqtt';
import customerService from '../../services/customerService';

const { width } = Dimensions.get('window');
const MQTT_BROKER_URL = 'wss://broker.emqx.io:8084/mqtt';
const PROGRESS_TOPIC = '6UJaRjVcx1AFd9H6zfNky9DgKG08ix_carwash_progress';

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
  const [isCompletingCheckout, setIsCompletingCheckout] = useState(false);
  const [pointsAwarded, setPointsAwarded] = useState(null);
  const customerType = route?.params?.customerType ?? 'guest';
  const checkoutReference = route?.params?.checkoutReference;
  const totalAmount = route?.params?.totalAmount ?? 0;

  const currentPhase = phases[phaseIndex];
  const completion = Math.min(100, (phaseIndex + 1) * 20);
  const stepLabel = `STEP ${phaseIndex + 1} \u2022 ${completion}%`;

  useEffect(() => {
    const clientId = `carwash_progress_${Date.now()}`;
    const client = mqtt.connect(MQTT_BROKER_URL, {
      clientId,
      clean: true,
      reconnectPeriod: 3000,
      connectTimeout: 30000,
      protocolVersion: 4,
    });

    const handleMessage = (topic, rawMessage) => {
      if (topic !== PROGRESS_TOPIC || !rawMessage) {
        return;
      }
      const payload = rawMessage.toString().trim();
      if (!payload) {
        return;
      }
      if (payload.toLowerCase() === 'done') {
        navigateToCompletion();
        return;
      }
      const targetIndex = phases.findIndex((phase) => phase.key === payload);
      if (targetIndex >= 0) {
        setPhaseIndex((prev) => (prev === targetIndex ? prev : targetIndex));
      }
    };

  const navigateToCompletion = async () => {
    if (isCompletingCheckout) {
      return;
    }
    try {
      setIsCompletingCheckout(true);
      let awardedPoints = null;
      if (checkoutReference) {
        const payload = await customerService.markCheckoutSuccess(checkoutReference);
        const awarded = payload?.data?.points_awarded;
        if (Number.isFinite(Number(awarded))) {
          awardedPoints = Number(awarded);
          setPointsAwarded(awardedPoints);
        } else {
          setPointsAwarded(null);
        }
      }
      if (customerType === 'member') {
        navigation.navigate('Congrats', {
          customerType,
          pointsAwarded: awardedPoints,
        });
        return;
      }
      navigation.navigate('Balance', { customerType, totalAmount });
      return;
    } catch (error) {
      console.error('Failed to mark checkout success', error);
    } finally {
      setIsCompletingCheckout(false);
    }
  };

    client.on('connect', () => {
      client.subscribe(PROGRESS_TOPIC, (err) => {
        if (err) {
          console.error('Failed to subscribe to progress topic', err);
        }
      });
    });
    client.on('message', handleMessage);
    client.on('error', (error) => {
      console.error('MQTT connection error', error);
    });

    return () => {
      client.removeListener('message', handleMessage);
      client.end(true);
    };
  }, []);

  return (
    <View style={styles.page}>
      <View style={styles.card}>
        <Text style={styles.header}>Carwash Progress</Text>
        <View style={styles.iconWrap}>
          <Image source={currentPhase.image} style={styles.icon} resizeMode="contain" />
        </View>
        <Text style={styles.stepLabel}>{stepLabel}</Text>
        <Text style={styles.status}>{currentPhase.title}</Text>
        <View style={styles.progressTrack} accessibilityLabel="Progress bar">
          <View style={[styles.progressFill, { width: `${completion}%` }]} />
        </View>
        {customerType === 'member' && Number.isFinite(pointsAwarded) && (
          <Text style={styles.pointsAwarded}>
            Points awarded: {pointsAwarded.toFixed(2)}
          </Text>
        )}
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
  pointsAwarded: {
    marginTop: 12,
    fontSize: 16,
    fontWeight: '600',
    color: '#1f7b2c',
  },
});

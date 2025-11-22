import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');
const iconSource = require('../../assets/congrats_icon.png');

export default function CongratsScreen({ navigation }) {
  const handleProceed = () => {
    navigation.navigate('ThankYou');
  };

  return (
    <View style={styles.page}>
      <View style={styles.card}>
        <Image source={iconSource} style={styles.icon} resizeMode="contain" />
        <Text style={styles.title}>Congrats!</Text>
        <Text style={styles.copy}>You earned +20 points for this wash!</Text>
      </View>
      <TouchableOpacity style={styles.cta} onPress={handleProceed} activeOpacity={0.8}>
        <Text style={styles.ctaText}>Proceed</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: '#ededed',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  card: {
    width: '100%',
    maxWidth: 460,
    backgroundColor: '#fff',
    borderRadius: 28,
    paddingTop: 32,
    paddingBottom: 28,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.08,
    shadowRadius: 22,
    elevation: 8,
    marginBottom: 20,
  },
  icon: {
    width: 76,
    height: 76,
  },
  title: {
    marginTop: 18,
    fontSize: 24,
    fontWeight: '700',
    color: '#111',
  },
  copy: {
    marginTop: 6,
    fontSize: 16,
    color: '#3c3c3c',
    textAlign: 'center',
  },
  cta: {
    width: '100%',
    maxWidth: 460,
    borderRadius: 999,
    backgroundColor: '#1f7b2c',
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#1f7b2c',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.3,
    shadowRadius: 18,
    elevation: 10,
  },
  ctaText: {
    color: '#fff',
    fontSize: 17,
    fontWeight: '600',
  },
});

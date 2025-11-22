import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

export default function ThankYouScreen({ navigation }) {
  const handleContinue = () => {
    navigation.popToTop();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Thank You</Text>

      <View style={styles.logoCircle}>
        <Image
          source={require('../../assets/logo.png')}
          style={styles.logoImage}
          resizeMode="cover"
        />
      </View>

      <Text style={styles.brandHeading}>WASH2GO</Text>
      <TouchableOpacity style={styles.cta} onPress={handleContinue} activeOpacity={0.85}>
        <Text style={styles.ctaText}>Continue</Text>
      </TouchableOpacity>
      <Text style={styles.footer}>Come Again</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
    paddingVertical: 32,
  },
  heading: {
    fontSize: Math.min(width * 0.08, 43),
    letterSpacing: 7.7,
    fontWeight: '600',
    marginBottom: 22,
  },
  logoCircle: {
    width: Math.min(width * 0.5, 240),
    height: Math.min(width * 0.5, 240),
    borderRadius: Math.min(width * 0.25, 120),
    backgroundColor: '#f1f1f1',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 40,
    padding: 13,
    shadowColor: '#141414',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  logoImage: {
    width: '100%',
    height: '100%',
    borderRadius: Math.min(width * 0.25, 120),
  },
  brandHeading: {
    fontSize: Math.min(width * 0.1, 45),
    fontWeight: '700',
    marginBottom: 4,
  },
  cta: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#1b7f1c',
    borderRadius: 999,
    paddingVertical: 15,
    paddingHorizontal: 100,
    shadowColor: '#1b7f1c',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.35,
    shadowRadius: 15,
    elevation: 10,
    marginTop: 40,
  },
  ctaText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    marginRight: 8,
  },
  footer: {
    fontSize: 18,
    fontWeight: '600',
    marginTop: 24,
    letterSpacing: 1,
  },
});

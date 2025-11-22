import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

export default function HowToStartScreen({ navigation }) {
  const handleContinue = () => {
    navigation.navigate('CustomerType');
  };

  return (
    <View style={styles.container}>
      <View style={styles.hero}>
        <View style={styles.infoIconOuter}>
          <View style={styles.infoIconInner}>
            <Text style={styles.infoIconText}>i</Text>
          </View>
        </View>
      </View>

      <ScrollView style={styles.content} contentContainerStyle={styles.contentInner}>
        <Text style={styles.title}>HOW TO START</Text>
        <Text style={styles.subtitle}>Guide on how to use:</Text>

        <View style={styles.instructionsList}>
          <View style={styles.instructionItem}>
            <Text style={styles.instructionNumber}>1.</Text>
            <Text style={styles.instructionText}>Choose Member or Guest at the kiosk</Text>
          </View>

          <View style={styles.instructionItem}>
            <Text style={styles.instructionNumber}>2.</Text>
            <Text style={styles.instructionText}>Scan RFID (for members) or select vehicle type (for guests)</Text>
          </View>

          <View style={styles.instructionItem}>
            <Text style={styles.instructionNumber}>3.</Text>
            <View style={styles.instructionTextContainer}>
              <Text style={styles.instructionText}>Customize wash options.</Text>
              <Text style={styles.instructionNote}>Select Vehicle (for guests) • Select type of soap: Basic & Premium</Text>
            </View>
          </View>

          <View style={styles.instructionItem}>
            <Text style={styles.instructionNumber}>4.</Text>
            <Text style={styles.instructionText}>Top-up or redeem points if balance is low (members)</Text>
          </View>

          <View style={styles.instructionItem}>
            <Text style={styles.instructionNumber}>5.</Text>
            <Text style={styles.instructionText}>Tap the Start wash button to begin the carwash.</Text>
          </View>
        </View>
      </ScrollView>

      <TouchableOpacity style={styles.continueBtn} onPress={handleContinue}>
        <Text style={styles.continueBtnText}>Continue</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  hero: {
    backgroundColor: '#1f7b2c',
    height: 120,
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
    position: 'relative',
  },
  infoIconOuter: {
    width: 82,
    height: 82,
    borderRadius: 41,
    backgroundColor: '#e5e5e5',
    position: 'absolute',
    left: '50%',
    bottom: -42,
    marginLeft: -41,
    alignItems: 'center',
    justifyContent: 'center',
  },
  infoIconInner: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#e5e5e5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  infoIconText: {
    fontSize: 29,
    fontWeight: '700',
    color: '#1f7b2c',
  },
  content: {
    flex: 1,
  },
  contentInner: {
    paddingTop: 64,
    paddingHorizontal: 32,
    paddingBottom: 40,
    alignItems: 'center',
  },
  title: {
    fontSize: 30,
    fontWeight: '700',
    letterSpacing: 0.6,
    marginBottom: 16,
    color: '#0f0f0f',
  },
  subtitle: {
    fontSize: 18,
    fontWeight: '500',
    color: '#3d3d3d',
    marginBottom: 10,
    alignSelf: 'flex-start',
  },
  instructionsList: {
    width: '100%',
    gap: 12,
  },
  instructionItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 8,
  },
  instructionNumber: {
    fontSize: 16,
    color: '#1b1b1b',
    fontWeight: '500',
    minWidth: 20,
  },
  instructionText: {
    flex: 1,
    fontSize: 16,
    color: '#1b1b1b',
    lineHeight: 28,
  },
  instructionTextContainer: {
    flex: 1,
  },
  instructionNote: {
    fontSize: 15,
    color: '#3c3c3c',
    marginTop: 4,
    lineHeight: 22,
  },
  continueBtn: {
    marginHorizontal: 32,
    marginVertical: 32,
    paddingVertical: 15,
    backgroundColor: '#1f7b2c',
    borderRadius: 999,
    alignItems: 'center',
    shadowColor: '#1f7b2c',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.35,
    shadowRadius: 25,
    elevation: 10,
  },
  continueBtnText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
});

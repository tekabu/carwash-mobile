import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';

export default function BalanceScreen({ navigation }) {
  const handleContinue = () => {
    navigation.navigate('ThankYou');
  };

  return (
    <View style={styles.page}>
      <View style={styles.container}>
        <View style={styles.headerPill}>
          <Text style={styles.headerText}>Summary</Text>
        </View>
        <View style={styles.card}>
          <View style={styles.checkCircle}>
            <Text style={styles.checkMark}>{'\u2713'}</Text>
          </View>
          <Text style={styles.status}>Completed</Text>
          <View style={styles.summaryRow}>
            <View>
              <Text style={styles.label}>Total</Text>
              <Text style={styles.label}>Balance</Text>
            </View>
            <View>
              <Text style={styles.value}>P200.00</Text>
              <Text style={styles.value}>-----</Text>
            </View>
          </View>
          <Text style={styles.note}>Please pay at the counter.</Text>
        </View>
        <TouchableOpacity style={styles.button} onPress={handleContinue} activeOpacity={0.85}>
          <Text style={styles.buttonText}>Continue</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  container: {
    width: '100%',
    maxWidth: 460,
    alignItems: 'center',
  },
  headerPill: {
    alignSelf: 'flex-start',
    backgroundColor: '#1f7b2c',
    borderRadius: 999,
    paddingVertical: 8,
    paddingHorizontal: 18,
    marginBottom: 10,
  },
  headerText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
  card: {
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 32,
    padding: 24,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.08,
    shadowRadius: 28,
    elevation: 10,
  },
  checkCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#1f7b2c',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 14,
  },
  checkMark: {
    color: '#fff',
    fontSize: 36,
    fontWeight: '700',
  },
  status: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 14,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 14,
    marginBottom: 12,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#4a4a4a',
  },
  value: {
    fontSize: 16,
    fontWeight: '700',
    textAlign: 'right',
  },
  note: {
    fontSize: 14,
    color: '#4a4a4a',
    marginTop: 12,
    textAlign: 'center',
  },
  button: {
    width: '100%',
    maxWidth: 460,
    borderRadius: 999,
    backgroundColor: '#1f7b2c',
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#1f7b2c',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.35,
    shadowRadius: 20,
    elevation: 10,
    marginTop: 14,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

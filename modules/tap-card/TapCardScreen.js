import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

export default function TapCardScreen({ navigation }) {
  const handleReaderPress = () => {
    navigation.navigate('Cart');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tap Your Card</Text>

      <TouchableOpacity
        style={styles.readerWrapper}
        onPress={handleReaderPress}
        activeOpacity={0.85}
        accessibilityRole="button"
        accessibilityLabel="Tap RFID reader"
      >
        <View style={styles.reader}>
          <Image
            source={require('../../assets/logo.png')}
            style={styles.readerImage}
            resizeMode="contain"
          />
        </View>
      </TouchableOpacity>

      <Text style={styles.description}>Please tap your RFID card to continue.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
    paddingVertical: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    letterSpacing: 0.5,
    color: '#111',
    textAlign: 'center',
  },
  readerWrapper: {
    marginVertical: 28,
    borderRadius: 34,
    borderWidth: 2,
    borderColor: '#b7b7b7',
    padding: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.08,
    shadowRadius: 18,
    elevation: 8,
    backgroundColor: '#fff',
  },
  reader: {
    width: Math.min(width * 0.65, 260),
    height: Math.min(width * 0.65, 260),
    borderRadius: 28,
    borderWidth: 2,
    borderColor: '#dcdcdc',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  readerImage: {
    width: '92%',
    height: '92%',
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    color: '#3c3c3c',
    textAlign: 'center',
  },
});

import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Dimensions } from 'react-native';
import Svg, { Circle, Path, Rect, Line } from 'react-native-svg';

const { width } = Dimensions.get('window');

export default function CustomerTypeScreen({ navigation }) {
  const handleGuestPress = () => {
    console.log('Guest selected');
    navigation.navigate('Cart');
  };

  const handleMemberPress = () => {
    console.log('Member selected');
    navigation.navigate('TapCard');
  };

  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        <View style={styles.choices}>
          <TouchableOpacity
            style={styles.card}
            onPress={handleGuestPress}
            activeOpacity={0.7}
          >
            <Svg width="44" height="44" viewBox="0 0 64 64">
              <Circle cx="32" cy="24" r="10" stroke="#111" strokeWidth="2" fill="none" />
              <Path d="M14 56c0-11 9-20 20-20s20 9 20 20" stroke="#111" strokeWidth="2" fill="none" />
            </Svg>
            <Text style={styles.cardText}>Guest</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.card}
            onPress={handleMemberPress}
            activeOpacity={0.7}
          >
            <Svg width="44" height="44" viewBox="0 0 64 64">
              <Rect x="8" y="16" width="48" height="32" rx="6" stroke="#111" strokeWidth="2" fill="none" />
              <Line x1="8" y1="26" x2="56" y2="26" stroke="#111" strokeWidth="2" />
              <Line x1="18" y1="42" x2="30" y2="42" stroke="#111" strokeWidth="2" />
            </Svg>
            <Text style={styles.cardText}>Member</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  wrapper: {
    width: Math.min(360, width - 32),
  },
  choices: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'stretch',
    width: '100%',
  },
  card: {
    borderWidth: 1,
    borderColor: '#bbb',
    borderRadius: 16,
    paddingVertical: 24,
    paddingHorizontal: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 6,
    marginVertical: 6,
    backgroundColor: '#fff',
    minHeight: 140,
    flex: 1,
    maxWidth: 180,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.08,
    shadowRadius: 20,
    elevation: 3,
  },
  cardText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#111',
  },
});

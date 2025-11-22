import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { useSelection } from '../select-base/SelectionContext';

const { width } = Dimensions.get('window');

export default function CartScreen({ navigation }) {
  const handleRedeem = () => {
    console.log('Redeem points');
  };

  const handleProceed = () => {
    console.log('Proceed to payment');
  };

  const handleEditVehicle = () => {
    navigation.navigate('SelectVehicle');
  };

  const handleEditSoap = () => {
    navigation.navigate('SelectSoap');
  };

  const { selectedVehicle, selectedSoap } = useSelection();
  const vehicleLabel = selectedVehicle
    ? `${selectedVehicle.title.toUpperCase()} (${selectedVehicle.subtitle})`
    : 'Select vehicle';
  const soapLabel = selectedSoap ? selectedSoap.title : 'Select soap';

  return (
    <View style={styles.page}>
      <ScrollView contentContainerStyle={styles.main}>
        <View style={[styles.card, styles.accountCard]}>
          <View style={styles.account}> 
            <View style={styles.icon}>
              <FontAwesome name="user-circle" size={30} color="#4b4b4b" />
            </View>
            <View style={styles.accountInfo}>
              <Text style={styles.name}>Joshua Lacambra</Text>
              <Text style={styles.balance}>Balance: P 70.00</Text>
            </View>
          </View>
        </View>

        <View style={[styles.card, styles.pointsCard]}>
          <View style={styles.pointsRow}>
            <View style={styles.pointsDetails}>
              <Text style={styles.pointsLabel}>Points:</Text>
              <Text style={styles.pointsValue}>200 pts</Text>
            </View>
            <TouchableOpacity style={styles.redeemButton} onPress={handleRedeem} activeOpacity={0.8}>
              <Text style={styles.redeemButtonText}>Redeem</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={[styles.card, styles.detailsCard]}>
          <View style={styles.detailRow}>
            <View style={styles.detailInfo}>
              <Text style={styles.detailLabel}>Vehicle Type:</Text>
              <Text style={styles.detailValue}>{vehicleLabel}</Text>
            </View>
            <TouchableOpacity onPress={handleEditVehicle} activeOpacity={0.7}>
              <Text style={styles.editText}>Edit</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.detailRow}>
            <View style={styles.detailInfo}>
              <Text style={styles.detailLabel}>Soap Type:</Text>
              <Text style={styles.detailValue}>{soapLabel}</Text>
            </View>
            <TouchableOpacity onPress={handleEditSoap} activeOpacity={0.7}>
              <Text style={styles.editText}>Edit</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      <TouchableOpacity style={styles.proceedButton} onPress={handleProceed} activeOpacity={0.8}>
        <Text style={styles.proceedButtonText}>Proceed</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: '#fdfdfd',
    paddingTop: 32,
    paddingHorizontal: 16,
    paddingBottom: 20,
  },
  main: {
    alignItems: 'center',
    paddingBottom: 16,
  },
  card: {
    width: '100%',
    maxWidth: 460,
    backgroundColor: '#fff',
    borderRadius: 24,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 16 },
    shadowOpacity: 0.08,
    shadowRadius: 25,
    elevation: 6,
    margin: 12,
  },
  account: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    width: 50,
    height: 50,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: '#dcdcdc',
    alignItems: 'center',
    justifyContent: 'center',
  },
  accountInfo: {
    flex: 1,
    marginLeft: 16,
  },
  name: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111',
  },
  balance: {
    fontSize: 14,
    color: '#4b4b4b',
  },
  pointsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  pointsLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111',
  },
  pointsValue: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1f7b2c',
    marginLeft: 6,
  },
  pointsDetails: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  redeemButton: {
    backgroundColor: '#1f7b2c',
    paddingVertical: 10,
    paddingHorizontal: 22,
    borderRadius: 999,
    alignSelf: 'flex-start',
    shadowColor: '#1f7b2c',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.35,
    shadowRadius: 16,
    elevation: 6,
  },
  redeemButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 14,
  },
  accountCard: {
    paddingBottom: 20,
    justifyContent: 'center',
  },
  pointsCard: {
    paddingBottom: 20,
    justifyContent: 'center',
  },
  detailsCard: {
    paddingBottom: 1,
    justifyContent: 'center',
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 18,
  },
  detailInfo: {
    flex: 1,
    marginRight: 14,
  },
  detailLabel: {
    fontSize: 13,
    color: '#4c4c4c',
    marginBottom: 4,
  },
  detailValue: {
    fontSize: 16,
    fontWeight: '700',
    color: '#111',
  },
  editText: {
    color: '#1f7b2c',
    fontWeight: '600',
  },
  proceedButton: {
    marginTop: 8,
    alignSelf: 'center',
    width: width - 32,
    maxWidth: 460,
    paddingVertical: 16,
    borderRadius: 999,
    backgroundColor: '#1f7b2c',
    alignItems: 'center',
    shadowColor: '#1f7b2c',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.35,
    shadowRadius: 22,
    elevation: 12,
  },
  proceedButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
});

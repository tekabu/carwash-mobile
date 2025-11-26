import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { useSelection } from '../select-base/SelectionContext';

const formatCurrency = (value) => {
  const numeric =
    typeof value === 'number'
      ? value
      : typeof value === 'string'
        ? Number(value)
        : NaN;
  if (Number.isFinite(numeric)) {
    return `P ${numeric.toFixed(2)}`;
  }
  if (value !== undefined && value !== null) {
    return `P ${value}`;
  }
  return 'P 0.00';
};

const formatPoints = (value) => {
  const numeric =
    typeof value === 'number'
      ? value
      : typeof value === 'string'
        ? Number(value)
        : NaN;
  if (Number.isFinite(numeric)) {
    return `${numeric.toFixed(2)} pts`;
  }
  if (value !== undefined && value !== null) {
    return `${value} pts`;
  }
  return '0 pts';
};

export default function CartScreen({ navigation, route }) {
  const customerType = route?.params?.customerType ?? 'guest';
  const customerData = route?.params?.customerData;
  const handleRedeem = () => {
    console.log('Redeem points');
  };

  const handleProceed = () => {
    navigation.navigate('Checkout', { customerType });
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
  const displayName = customerData?.name || 'Guest Customer';
  const displayBalance = formatCurrency(customerData?.balance);
  const displayPoints = formatPoints(customerData?.points);

  return (
    <View style={styles.page}>
      <View style={styles.cardWrapper}>
        <View style={styles.cardContent}>
          <Text style={styles.header}>Cart</Text>

          <View style={[styles.childCard, styles.accountCard]}>
            <View style={styles.account}>
              <View style={styles.icon}>
                <FontAwesome name="user-circle" size={30} color="#4b4b4b" />
              </View>
              <View style={styles.accountInfo}>
                <Text style={styles.name}>{displayName}</Text>
                <Text style={styles.balance}>Balance: {displayBalance}</Text>
              </View>
            </View>
          </View>

          <View style={[styles.childCard, styles.pointsCard]}>
            <View style={styles.pointsRow}>
              <View style={styles.pointsDetails}>
                <Text style={styles.pointsLabel}>Points:</Text>
                <Text style={styles.pointsValue}>{displayPoints}</Text>
              </View>
              <TouchableOpacity style={styles.redeemButton} onPress={handleRedeem} activeOpacity={0.8}>
                <Text style={styles.redeemButtonText}>Redeem</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={[styles.childCard, styles.detailsCard]}>
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
        </View>

        <TouchableOpacity style={styles.proceedButton} onPress={handleProceed} activeOpacity={0.8}>
          <Text style={styles.proceedButtonText}>Proceed</Text>
        </TouchableOpacity>
      </View>
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
    alignItems: 'center',
  },
  cardWrapper: {
    flex: 1,
    width: '100%',
    maxWidth: 480,
    margin: 16,
    backgroundColor: '#fff',
    borderRadius: 30,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 16 },
    shadowOpacity: 0.08,
    shadowRadius: 25,
    elevation: 8,
    justifyContent: 'space-between',
  },
  cardContent: {
    flex: 1,
    justifyContent: 'flex-start',
  },
  header: {
    backgroundColor: '#1f7b2c',
    color: '#fff',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 999,
    fontWeight: '600',
    fontSize: 18,
    alignSelf: 'flex-start',
    marginBottom: 14,
  },
  childCard: {
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 26,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.08,
    shadowRadius: 18,
    elevation: 6,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#f0f0f0',
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
    marginTop: 12,
    alignSelf: 'stretch',
    width: '100%',
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

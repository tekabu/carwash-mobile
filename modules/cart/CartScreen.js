import React, { useEffect, useState } from 'react';
import { Alert, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { useSelection } from '../select-base/SelectionContext';
import customerService from '../../services/customerService';

const formatCurrency = (value) => {
  const numeric =
    typeof value === 'number'
      ? value
      : typeof value === 'string'
        ? Number(value)
        : NaN;
  if (Number.isFinite(numeric)) {
    return `P ${numeric.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`;
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
    const formatted = numeric.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    return `${formatted} pts`;
  }
  if (value !== undefined && value !== null) {
    return `${value} pts`;
  }
  return '0 pts';
};

const extractLabel = (item, fallback) => {
  if (!item) {
    return fallback;
  }
  const title = item.title || item.name || '';
  const subtitle = item.subtitle || item.description || '';
  if (title && subtitle) {
    return `${title} (${subtitle})`;
  }
  return title || subtitle || fallback;
};

const extractAmount = (item) => {
  if (!item) return 0;
  const raw = item.price ?? item.amount ?? item.cost ?? item.rate;
  const numeric =
    typeof raw === 'number' ? raw : typeof raw === 'string' ? Number(raw) : NaN;
  return Number.isFinite(numeric) ? numeric : 0;
};

export default function CartScreen({ navigation, route }) {
  const customerType = route?.params?.customerType ?? 'guest';
  const customerData = route?.params?.customerData;
  const vehicleTypes = route?.params?.vehicleTypes ?? [];
  const soapTypes = route?.params?.soapTypes ?? [];
  const [currentCustomer, setCurrentCustomer] = useState(customerData);
  const [isRedeeming, setIsRedeeming] = useState(false);
  const customerId = currentCustomer?.id ?? customerData?.id;

  useEffect(() => {
    setCurrentCustomer(customerData);
  }, [customerData]);
  const remoteVehicle = vehicleTypes[0];
  const remoteSoap = soapTypes[0];
  const handleRedeem = () => {
    if (isRedeeming) {
      return;
    }
    if (!customerId) {
      Alert.alert('Redeem Points', 'Customer information is unavailable.');
      return;
    }
    Alert.alert(
      'Redeem Points',
      'Are you sure you want to redeem available points for balance?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Redeem',
          onPress: () => processRedeem(customerId),
        },
      ],
    );
  };

  const processRedeem = async (id) => {
    try {
      setIsRedeeming(true);
      const payload = await customerService.redeemPoints(id);
      const details = payload?.data ?? {};
      const newBalance =
        details.new_balance ?? details.balance ?? currentCustomer?.balance;
      const newPoints =
        details.new_points ?? details.remaining_points ?? currentCustomer?.points;
      setCurrentCustomer((prev) => ({
        ...(prev ?? {}),
        balance: newBalance,
        points: newPoints,
      }));
      Alert.alert('Success', payload?.message || 'Points redeemed successfully.');
    } catch (error) {
      Alert.alert(
        'Redeem Failed',
        error?.message || 'Unable to redeem points. Please try again.',
      );
    } finally {
      setIsRedeeming(false);
    }
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
  const vehicleLabel = extractLabel(
    remoteVehicle,
    selectedVehicle
      ? `${selectedVehicle.title.toUpperCase()} (${selectedVehicle.subtitle})`
      : 'Select vehicle',
  );
  const soapLabel = extractLabel(
    remoteSoap,
    selectedSoap ? selectedSoap.title : 'Select soap',
  );
  const displayName = currentCustomer?.name || 'Guest Customer';
  const displayBalance = formatCurrency(currentCustomer?.balance);
  const displayPoints = formatPoints(currentCustomer?.points);
  const vehicleAmount = extractAmount(remoteVehicle);
  const soapAmount = extractAmount(remoteSoap);
  const totalAmount = vehicleAmount + soapAmount;

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
              <Text style={styles.detailAmount}>{formatCurrency(vehicleAmount)}</Text>
              <TouchableOpacity onPress={handleEditVehicle} activeOpacity={0.7}>
                <Text style={styles.editText}>Edit</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.detailRow}>
              <View style={styles.detailInfo}>
                <Text style={styles.detailLabel}>Soap Type:</Text>
                <Text style={styles.detailValue}>{soapLabel}</Text>
              </View>
              <Text style={styles.detailAmount}>{formatCurrency(soapAmount)}</Text>
              <TouchableOpacity onPress={handleEditSoap} activeOpacity={0.7}>
                <Text style={styles.editText}>Edit</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.totalRow}>
              <Text style={styles.totalLabel}>Total Amount</Text>
              <Text style={styles.totalValue}>{formatCurrency(totalAmount)}</Text>
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
  detailAmount: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1f7b2c',
    marginRight: 12,
    paddingTop: 25
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
    paddingTop: 25,
    color: '#1f7b2c',
    fontWeight: '600',
  },
  totalRow: {
    marginTop: 6,
    paddingTop: 12,
    marginBottom: 15,
    borderTopWidth: 1,
    borderTopColor: '#e4e4e4',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: '700',
    color: '#111',
  },
  totalValue: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1f7b2c',
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

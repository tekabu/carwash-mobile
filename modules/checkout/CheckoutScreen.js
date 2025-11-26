import React, { useState, useMemo } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Dimensions,
  Alert,
} from 'react-native';
import { useSelection } from '../select-base/SelectionContext';
import customerService from '../../services/customerService';

const { width } = Dimensions.get('window');

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

const extractAmount = (item) => {
  if (!item) return 0;
  const raw = item.price ?? item.amount ?? item.cost ?? item.rate;
  const numeric =
    typeof raw === 'number' ? raw : typeof raw === 'string' ? Number(raw) : NaN;
  return Number.isFinite(numeric) ? numeric : 0;
};

export default function CheckoutScreen({ navigation, route }) {
  const { selectedVehicle, selectedSoap } = useSelection();
  const [confirmVisible, setConfirmVisible] = useState(false);
  const [isProcessingCheckout, setIsProcessingCheckout] = useState(false);
  const customerType = route?.params?.customerType ?? 'guest';
  const isGuest = customerType === 'guest';
  const customerId = route?.params?.customerId;
  const routeBalance = route?.params?.balance;
  const normalizedBalance =
    typeof routeBalance === 'number'
      ? routeBalance
      : typeof routeBalance === 'string'
        ? Number(routeBalance)
        : 0;
  const balanceValue = Number.isFinite(normalizedBalance)
    ? normalizedBalance
    : 0;

  const vehicleLabel = selectedVehicle ? selectedVehicle.title.toUpperCase() : 'SELECT VEHICLE';
  const vehicleSubtitle = selectedVehicle?.subtitle ?? '';
  const soapLabel = selectedSoap ? selectedSoap.title : 'SELECT SOAP';
  const soapSubtitle = selectedSoap?.subtitle ?? '';
  const vehicleAmount = extractAmount(selectedVehicle);
  const soapAmount = extractAmount(selectedSoap);
  const totalAmount = vehicleAmount + soapAmount;
  const totalAmountDisplay = formatCurrency(totalAmount);
  const balanceAmount = formatCurrency(balanceValue);

  const vehicleImage = selectedVehicle?.assetSource ?? require('../../assets/logo.png');
  const soapImage = selectedSoap?.assetSource ?? require('../../assets/logo.png');
  const hasBalance = !isGuest;

  const handleProceed = () => {
    setConfirmVisible(true);
  };

  const handleCancel = () => {
    setConfirmVisible(false);
  };

  const handleConfirm = async () => {
    if (isProcessingCheckout) {
      return;
    }
    if (!selectedVehicle?.id || !selectedSoap?.id) {
      Alert.alert('Missing selections', 'Please select both vehicle and soap types.');
      return;
    }
    if (!isGuest && !customerId) {
      Alert.alert(
        'Missing customer',
        'Customer information is required to continue checkout.',
      );
      return;
    }
    try {
      setIsProcessingCheckout(true);
      const payload = await customerService.createCheckout({
        customerId: isGuest ? undefined : customerId,
        vehicleTypeId: selectedVehicle.id,
        soapTypeId: selectedSoap.id,
      });
      const checkoutData = payload?.data ?? {};
      const reference = checkoutData?.reference;
      setConfirmVisible(false);
      navigation.navigate('Progress', {
        customerType,
        checkoutReference: reference,
        checkoutId: checkoutData?.checkout_id,
        checkoutData,
        totalAmount,
      });
    } catch (error) {
      Alert.alert(
        'Checkout Failed',
        error?.message || 'Unable to process checkout. Please try again.',
      );
    } finally {
      setIsProcessingCheckout(false);
    }
  };

  const summaryItems = useMemo(
    () => [
      {
        key: 'vehicle',
        label: vehicleLabel,
        subtitle: vehicleSubtitle,
        image: vehicleImage,
        price: vehicleAmount,
      },
      {
        key: 'soap',
        label: soapLabel,
        subtitle: soapSubtitle,
        image: soapImage,
        price: soapAmount,
      },
    ],
    [
      vehicleLabel,
      vehicleSubtitle,
      soapLabel,
      soapSubtitle,
      vehicleImage,
      soapImage,
      vehicleAmount,
      soapAmount,
    ]
  );

  return (
    <View style={styles.page}>
    <View style={styles.card}>
        <View style={styles.cardContent}>
          <Text style={styles.header}>Summary</Text>
          {summaryItems.map((item) => (
            <View key={item.key} style={styles.item}>
              <Image source={item.image} style={styles.itemImage} resizeMode="contain" />
              <View style={styles.info}>
                <Text style={styles.itemLabel}>{item.label}</Text>
                {item.subtitle ? <Text style={styles.itemSub}>{`(${item.subtitle})`}</Text> : null}
              </View>
              <Text style={styles.price}>{formatCurrency(item.price)}</Text>
            </View>
          ))}
          <View style={styles.summary}>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>TOTAL:</Text>
              <Text style={styles.summaryValue}>{totalAmountDisplay}</Text>
            </View>
            {hasBalance && (
              <View style={styles.summaryRow}>
                <Text style={styles.balanceLabel}>Balance:</Text>
                <Text style={styles.balanceValue}>{balanceAmount}</Text>
              </View>
            )}
          </View>
        </View>
        <TouchableOpacity style={styles.proceedButton} onPress={handleProceed} activeOpacity={0.85}>
          <Text style={styles.proceedText}>Proceed</Text>
        </TouchableOpacity>
      </View>

      {confirmVisible && (
        <View style={styles.confirmBackdrop}>
          <View style={styles.blurLayer} />
          <View style={styles.confirmCard}>
            <Text style={styles.confirmTitle}>Confirm checkout?</Text>
            <Text style={styles.confirmCopy}>Tap YES to start the wash or NO to keep editing.</Text>
            <View style={styles.confirmActions}>
              <TouchableOpacity style={styles.cancelButton} onPress={handleCancel} activeOpacity={0.8} disabled={isProcessingCheckout}>
                <Text style={styles.cancelText}>NO</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.confirmButton,
                  isProcessingCheckout && styles.disabledButton,
                ]}
                onPress={handleConfirm}
                activeOpacity={0.8}
                disabled={isProcessingCheckout}
              >
                <Text style={styles.confirmText}>
                  {isProcessingCheckout ? 'PROCESSING...' : 'YES'}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}
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
  },
  card: {
    flex: 1,
    maxWidth: 480,
    margin: 16,
    alignSelf: 'center',
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 28,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 16 },
    shadowOpacity: 0.08,
    shadowRadius: 25,
    elevation: 8,
    paddingHorizontal: 24,
    paddingVertical: 28,
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
    marginBottom: 4,
  },
  item: {
    backgroundColor: '#fff',
    borderRadius: 26,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#f0f0f0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.05,
    shadowRadius: 18,
    elevation: 4,
    marginVertical: 10,
  },
  itemImage: {
    width: Math.min(width * 0.18, 96),
    height: Math.min(width * 0.14, 72),
    borderRadius: 16,
    backgroundColor: '#f7f7f7',
    padding: 6,
  },
  info: {
    flex: 1,
    flexDirection: 'column',
    marginLeft: 12,
  },
  itemLabel: {
    fontWeight: '700',
    fontSize: 16,
    color: '#111',
    textTransform: 'uppercase',
  },
  itemSub: {
    fontSize: 13,
    color: '#4c4c4c',
  },
  price: {
    fontWeight: '700',
    fontSize: 14,
    textAlign: 'right',
  },
  summary: {
    marginTop: 12,
    borderRadius: 26,
    padding: 20,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.08,
    shadowRadius: 20,
    elevation: 6,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  summaryLabel: {
    fontWeight: '700',
    fontSize: 20,
  },
  summaryValue: {
    fontSize: 20,
    fontWeight: '700',
  },
  balanceLabel: {
    fontSize: 14,
    color: '#4a4a4a',
  },
  balanceValue: {
    fontSize: 14,
    color: '#1f7b2c',
    fontWeight: '700',
  },
  proceedButton: {
    marginTop: 20,
    borderRadius: 999,
    backgroundColor: '#1f7b2c',
    paddingVertical: 14,
    alignItems: 'center',
    shadowColor: '#1f7b2c',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.35,
    shadowRadius: 22,
    elevation: 10,
  },
  proceedText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  confirmCard: {
    width: Math.min(360, width - 40),
    backgroundColor: '#fff',
    borderRadius: 28,
    padding: 24,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.2,
    shadowRadius: 26,
    elevation: 12,
  },
  confirmTitle: {
    fontSize: 20,
    fontWeight: '700',
  },
  confirmCopy: {
    textAlign: 'center',
    fontSize: 14,
    color: '#4a4a4a',
  },
  confirmActions: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    marginTop: 12,
  },
  cancelButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: '#1f7b2c',
    alignItems: 'center',
    marginRight: 6,
  },
  cancelText: {
    color: '#1f7b2c',
    fontWeight: '600',
  },
  confirmButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 999,
    backgroundColor: '#1f7b2c',
    alignItems: 'center',
    marginLeft: 6,
  },
  confirmText: {
    color: '#fff',
    fontWeight: '600',
  },
  disabledButton: {
    opacity: 0.6,
  },
  confirmBackdrop: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
  },
  blurLayer: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255,255,255,0.6)',
  },
});

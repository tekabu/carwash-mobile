import React, { useState, useMemo } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';
import { useSelection } from '../select-base/SelectionContext';

const { width } = Dimensions.get('window');

export default function CheckoutScreen({ navigation }) {
  const { selectedVehicle, selectedSoap } = useSelection();
  const [confirmVisible, setConfirmVisible] = useState(false);

  const vehicleLabel = selectedVehicle ? selectedVehicle.title.toUpperCase() : 'SELECT VEHICLE';
  const vehicleSubtitle = selectedVehicle?.subtitle ?? '';
  const soapLabel = selectedSoap ? selectedSoap.title : 'SELECT SOAP';
  const soapSubtitle = selectedSoap?.subtitle ?? '';
  const totalAmount = 'P200.00';
  const balanceAmount = 'P70.00';

  const vehicleImage = selectedVehicle?.assetSource ?? require('../../assets/logo.png');
  const soapImage = selectedSoap?.assetSource ?? require('../../assets/logo.png');

  const handleProceed = () => {
    setConfirmVisible(true);
  };

  const handleCancel = () => {
    setConfirmVisible(false);
  };

  const handleConfirm = () => {
    setConfirmVisible(false);
    navigation.navigate('Progress');
  };

  const summaryItems = useMemo(
    () => [
      {
        key: 'vehicle',
        label: vehicleLabel,
        subtitle: vehicleSubtitle,
        image: vehicleImage,
      },
      {
        key: 'soap',
        label: soapLabel,
        subtitle: soapSubtitle,
        image: soapImage,
      },
    ],
    [vehicleLabel, vehicleSubtitle, soapLabel, soapSubtitle, vehicleImage, soapImage]
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
              <Text style={styles.price}>{totalAmount}</Text>
            </View>
          ))}
          <View style={styles.summary}>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>TOTAL:</Text>
              <Text style={styles.summaryValue}>{totalAmount}</Text>
            </View>
            <View style={styles.summaryRow}>
              <Text style={styles.balanceLabel}>Balance:</Text>
              <Text style={styles.balanceValue}>{balanceAmount}</Text>
            </View>
          </View>
        </View>
        <TouchableOpacity style={styles.proceedButton} onPress={handleProceed} activeOpacity={0.85}>
          <Text style={styles.proceedText}>Proceed</Text>
        </TouchableOpacity>
      </View>

      {confirmVisible && (
        <View style={styles.confirmOverlay}>
          <View style={styles.confirmCard}>
            <Text style={styles.confirmTitle}>Confirm checkout?</Text>
            <Text style={styles.confirmCopy}>Tap YES to start the wash or NO to keep editing.</Text>
            <View style={styles.confirmActions}>
              <TouchableOpacity style={styles.cancelButton} onPress={handleCancel} activeOpacity={0.8}>
                <Text style={styles.cancelText}>NO</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.confirmButton} onPress={handleConfirm} activeOpacity={0.8}>
                <Text style={styles.confirmText}>YES</Text>
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
  confirmOverlay: {
    position: 'absolute',
    inset: 0,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
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
});

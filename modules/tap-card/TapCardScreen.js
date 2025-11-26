import React, { useRef, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Dimensions,
  TextInput,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import customerService from '../../services/customerService';
import vehicleTypeService from '../../services/vehicleTypeService';
import soapTypeService from '../../services/soapTypeService';

const { width } = Dimensions.get('window');

export default function TapCardScreen({ navigation, route }) {
  const customerType = route?.params?.customerType ?? 'member';
  const [rfidInput, setRfidInput] = useState('');
  const [statusMessage, setStatusMessage] = useState('');
  const [isChecking, setIsChecking] = useState(false);
  const inputRef = useRef(null);
  const isCheckingRef = useRef(false);
  const focusTimeout = useRef(null);

  useFocusEffect(
    React.useCallback(() => {
      setRfidInput('');
      setStatusMessage('');
      setIsChecking(false);
      isCheckingRef.current = false;
      focusTimeout.current = setTimeout(() => {
        inputRef.current?.focus();
      }, 50);
      return () => {
        if (focusTimeout.current) {
          clearTimeout(focusTimeout.current);
          focusTimeout.current = null;
        }
      };
    }, []),
  );

  const handleReaderSubmit = async (cardId = rfidInput) => {
    if (isCheckingRef.current) {
      return;
    }
    const trimmedId = cardId?.trim();
    if (!trimmedId) {
      return;
    }
    setRfidInput('');
    isCheckingRef.current = true;
    setIsChecking(true);
    setStatusMessage('Validating RFID card...');
    try {
      const payload = await customerService.checkRfid(trimmedId);
      if (payload?.status) {
        setStatusMessage(payload?.message || 'Customer found.');
        let vehicleTypes = [];
        let soapTypes = [];
        try {
          [vehicleTypes, soapTypes] = await Promise.all([
            vehicleTypeService.getAll(),
            soapTypeService.getAll(),
          ]);
        } catch (serviceError) {
          console.error('Failed to load reference data', serviceError);
          setStatusMessage(
            serviceError?.message
              ? `Unable to load selections: ${serviceError.message}`
              : 'Unable to load vehicle/soap data. Please try again.',
          );
          return;
        }
        navigation.navigate('Cart', {
          customerType,
          rfidId: trimmedId,
          customerData: payload?.data,
          vehicleTypes,
          soapTypes,
        });
        return;
      }
      setStatusMessage(payload?.message || 'Customer not found.');
    } catch (error) {
      console.error('RFID validation failed', error);
      setStatusMessage(
        error?.message
          ? `Error validating card: ${error.message}`
          : 'Unable to validate card. Please try again.',
      );
    } finally {
      isCheckingRef.current = false;
      setIsChecking(false);
      setRfidInput('');
    }
  };

  const handleReaderPress = () => {
    inputRef.current?.focus();
    if (rfidInput.trim()) {
      handleReaderSubmit();
      return;
    }
    navigation.navigate('Cart', { customerType });
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
      <Text style={styles.hint}>
        {statusMessage || `Ready for RFID input${rfidInput ? `: ${rfidInput}` : ''}.`}
      </Text>
      <View style={styles.hiddenInputShell} pointerEvents="none">
        <TextInput
          ref={inputRef}
          style={styles.hiddenInput}
          value={rfidInput}
          onChangeText={setRfidInput}
          onSubmitEditing={() => handleReaderSubmit()}
          keyboardType="default"
          returnKeyType="done"
          blurOnSubmit={false}
          autoFocus
          textContentType="none"
          caretHidden
          underlineColorAndroid="transparent"
          autoCorrect={false}
          importantForAutofill="no"
          accessibilityElementsHidden
          allowFontScaling={false}
          contextMenuHidden
          selectionColor="transparent"
          showSoftInputOnFocus={false}
        />
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
  hint: {
    fontSize: 12,
    lineHeight: 18,
    color: '#7a7a7a',
    marginTop: 12,
  },
  hiddenInputShell: {
    ...StyleSheet.absoluteFillObject,
    opacity: 0,
    zIndex: -1,
  },
  hiddenInput: {
    position: 'absolute',
    opacity: 0,
    width: '100%',
    height: '100%',
    top: 0,
    left: 0,
    color: 'transparent',
    backgroundColor: 'transparent',
    borderWidth: 0,
    padding: 0,
    fontSize: 1,
    lineHeight: 1,
    zIndex: -1,
  },
});

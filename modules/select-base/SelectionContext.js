import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react';
import vehicleSoapConfig from '../../config/vehicle-soap.config';

const SelectionContext = createContext(null);

const defaultVehicles = vehicleSoapConfig.vehicles;
const defaultSoap = vehicleSoapConfig.soap;

const findMatchingItem = (list, current) => {
  if (!Array.isArray(list) || !current) {
    return null;
  }
  return (
    list.find(
      (item) =>
        (item.id && current.id && item.id === current.id) ||
        (item.name && current.name && item.name === current.name) ||
        (item.title && current.title && item.title === current.title),
    ) ?? null
  );
};

export function SelectionProvider({ children }) {
  const [vehicles, setVehicles] = useState(defaultVehicles);
  const [soap, setSoap] = useState(defaultSoap);
  const [selectedVehicle, setSelectedVehicle] = useState(defaultVehicles[0]);
  const [selectedSoap, setSelectedSoap] = useState(defaultSoap[0]);

  const updateVehicles = useCallback((nextVehicles) => {
    const normalized =
      Array.isArray(nextVehicles) && nextVehicles.length
        ? nextVehicles
        : defaultVehicles;
    setVehicles(normalized);
    setSelectedVehicle((prev) => {
      if (!normalized.length) {
        return null;
      }
      const match = findMatchingItem(normalized, prev);
      return match || normalized[0];
    });
  }, []);

  const updateSoap = useCallback((nextSoap) => {
    const normalized =
      Array.isArray(nextSoap) && nextSoap.length ? nextSoap : defaultSoap;
    setSoap(normalized);
    setSelectedSoap((prev) => {
      if (!normalized.length) {
        return null;
      }
      const match = findMatchingItem(normalized, prev);
      return match || normalized[0];
    });
  }, []);

  const value = useMemo(
    () => ({
      vehicles,
      soap,
      selectedVehicle,
      selectedSoap,
      setSelectedVehicle,
      setSelectedSoap,
      setVehiclesList: updateVehicles,
      setSoapList: updateSoap,
    }),
    [
      vehicles,
      soap,
      selectedVehicle,
      selectedSoap,
      updateVehicles,
      updateSoap,
    ],
  );

  return (
    <SelectionContext.Provider value={value}>
      {children}
    </SelectionContext.Provider>
  );
}

export function useSelection() {
  const context = useContext(SelectionContext);
  if (!context) {
    throw new Error('useSelection must be used within a SelectionProvider');
  }
  return context;
}

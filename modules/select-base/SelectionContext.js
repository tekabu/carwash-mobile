import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react';

const placeholderImage = require('../../assets/logo.png');

const SelectionContext = createContext(null);

const normalizeVehicleOptions = (items = []) =>
  items
    .filter(Boolean)
    .map((item, index) => {
      const title =
        item.vehicle_type ?? item.title ?? item.name ?? `Vehicle ${index + 1}`;
      const subtitle =
        item.sub_title ??
        item.subtitle ??
        item.description ??
        item.type ??
        '';
      const priceRaw =
        item.amount ?? item.price ?? item.rate ?? item.cost ?? item.total;
      const numeric =
        typeof priceRaw === 'number'
          ? priceRaw
          : typeof priceRaw === 'string'
            ? Number(priceRaw)
            : 0;
      return {
        ...item,
        id: item.id ?? item.name ?? `vehicle-${index}`,
        name: item.name ?? item.slug ?? title,
        title,
        subtitle,
        price: Number.isFinite(numeric) ? numeric : 0,
        assetSource: item.image_url
          ? { uri: item.image_url }
          : item.assetSource ?? placeholderImage,
      };
    });

const normalizeSoapOptions = (items = []) =>
  items
    .filter(Boolean)
    .map((item, index) => {
      const title =
        item.soap_type ?? item.title ?? item.name ?? `Soap ${index + 1}`;
      const subtitle =
        item.sub_title ?? item.subtitle ?? item.description ?? '';
      const priceRaw =
        item.amount ?? item.price ?? item.rate ?? item.cost ?? item.total;
      const numeric =
        typeof priceRaw === 'number'
          ? priceRaw
          : typeof priceRaw === 'string'
            ? Number(priceRaw)
            : 0;
      return {
        ...item,
        id: item.id ?? item.name ?? `soap-${index}`,
        name: item.name ?? item.slug ?? title,
        title,
        subtitle,
        price: Number.isFinite(numeric) ? numeric : 0,
        assetSource: item.image_url
          ? { uri: item.image_url }
          : item.assetSource ?? placeholderImage,
      };
    });

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
  const [vehicles, setVehicles] = useState([]);
  const [soap, setSoap] = useState([]);
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [selectedSoap, setSelectedSoap] = useState(null);

  const updateVehicles = useCallback((nextVehicles = []) => {
    const normalized = normalizeVehicleOptions(nextVehicles);
    setVehicles(normalized);
    setSelectedVehicle((prev) => {
      if (!normalized.length) {
        return null;
      }
      const match = findMatchingItem(normalized, prev);
      return match || normalized[0];
    });
  }, []);

  const updateSoap = useCallback((nextSoap = []) => {
    const normalized = normalizeSoapOptions(nextSoap);
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

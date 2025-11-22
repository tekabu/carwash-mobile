import React, { createContext, useContext, useMemo, useState } from 'react';
import vehicleSoapConfig from '../../config/vehicle-soap.config';

const SelectionContext = createContext(null);

export function SelectionProvider({ children }) {
  const { vehicles, soap } = vehicleSoapConfig;
  const [selectedVehicle, setSelectedVehicle] = useState(vehicles[0]);
  const [selectedSoap, setSelectedSoap] = useState(soap[0]);

  const value = useMemo(
    () => ({
      vehicles,
      soap,
      selectedVehicle,
      selectedSoap,
      setSelectedVehicle,
      setSelectedSoap,
    }),
    [vehicles, soap, selectedVehicle, selectedSoap]
  );

  return <SelectionContext.Provider value={value}>{children}</SelectionContext.Provider>;
}

export function useSelection() {
  const context = useContext(SelectionContext);
  if (!context) {
    throw new Error('useSelection must be used within a SelectionProvider');
  }
  return context;
}

import React from 'react';
import SelectionScreenBase from '../select-base/SelectionScreenBase';
import { useSelection } from '../select-base/SelectionContext';

export default function SelectVehicleScreen({ navigation }) {
  const { vehicles, selectedVehicle, setSelectedVehicle } = useSelection();
  const currentIndex = vehicles.findIndex((item) => item.name === selectedVehicle?.name);

  const handleSelect = (item) => {
    setSelectedVehicle(item);
  };

  return (
    <SelectionScreenBase
      navigation={navigation}
      items={vehicles}
      title="Select Vehicle"
      subtitle="Choose your vehicle"
      buttonLabel="Select Vehicle"
      initialIndex={currentIndex >= 0 ? currentIndex : 0}
      onSelect={handleSelect}
    />
  );
}

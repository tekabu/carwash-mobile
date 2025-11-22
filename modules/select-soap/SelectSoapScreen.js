import React from 'react';
import SelectionScreenBase from '../select-base/SelectionScreenBase';
import { useSelection } from '../select-base/SelectionContext';

export default function SelectSoapScreen({ navigation }) {
  const { soap, selectedSoap, setSelectedSoap } = useSelection();
  const currentIndex = soap.findIndex((item) => item.name === selectedSoap?.name);

  const handleSelect = (item) => {
    setSelectedSoap(item);
  };

  return (
    <SelectionScreenBase
      navigation={navigation}
      items={soap}
      title="Select Soap"
      subtitle="Pick your wash foam"
      buttonLabel="Select Soap"
      initialIndex={currentIndex >= 0 ? currentIndex : 0}
      onSelect={handleSelect}
    />
  );
}

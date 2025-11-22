import raw from './vehicle-soap.json';

const assetSources = {
  'assets/small_1.png': require('../assets/small_1.png'),
  'assets/small_2.png': require('../assets/small_2.png'),
  'assets/medium_1.png': require('../assets/medium_1.png'),
  'assets/medium_2.png': require('../assets/medium_2.png'),
  'assets/large_1.png': require('../assets/large_1.png'),
  'assets/soap_1.png': require('../assets/soap_1.png'),
  'assets/soap_2.png': require('../assets/soap_2.png'),
};

const attachAsset = (item) => ({
  ...item,
  assetSource: assetSources[item.image] ?? require('../assets/logo.png'),
});

export const vehicles = raw.vehicles.map(attachAsset);
export const soap = raw.soap.map(attachAsset);

export default {
  vehicles,
  soap,
};

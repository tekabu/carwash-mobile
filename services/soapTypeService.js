import api from './api';

const normalizeResponse = (payload) => {
  if (Array.isArray(payload)) {
    return payload;
  }
  if (Array.isArray(payload?.data)) {
    return payload.data;
  }
  return [];
};

const soapTypeService = {
  async getAll() {
    const response = await api.get('/api/soap-types');
    return normalizeResponse(response);
  },
};

export default soapTypeService;

// example return of /api/soap-types
// {
//     "status": true,
//     "message": "Soap types retrieved successfully.",
//     "data": [
//         {
//             "id": 1,
//             "soap_type": "Basic",
//             "sub_title": null,
//             "image_url": "http://localhost:8011/storage/soap-types/PaFvoSj8PSb4kjNFlveepZnPC0WIa4f1NTmhfLHL.png",
//             "amount": "57.64"
//         },
//         {
//             "id": 2,
//             "soap_type": "Premium",
//             "sub_title": null,
//             "image_url": "http://localhost:8011/storage/soap-types/tkR2XxB0z0V6jTNqPdctfdSK2Nbhq1jrCdPRRhI7.png",
//             "amount": "97.34"
//         }
//     ]
// }
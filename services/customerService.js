import api from './api';

const customerService = {
  async checkRfid(rfid = '') {
    const trimmed = rfid.trim();
    if (!trimmed) {
      const error = new Error('Missing RFID value.');
      error.status = 400;
      throw error;
    }
    return api.post(`/api/customer/rfid/${encodeURIComponent(trimmed)}/check`);
  },
  async redeemPoints(customerId) {
    if (!customerId) {
      const error = new Error('Missing customer information.');
      error.status = 400;
      throw error;
    }
    return api.post(`/api/customer/${customerId}/points/redeem`);
  },
};

export default customerService;

// example return of /api/customer/rfid/{rfid}/check
// {
//     "status": true,
//     "message": "Customer found.",
//     "data": {
//         "id": 1,
//         "name": "Jaqueline Pollich V",
//         "email": "nbins@example.net",
//         "phone": "(763) 977-9317",
//         "rfid": "RFID00000001",
//         "balance": "-1020.00",
//         "points": 58.2112
//     }
// }

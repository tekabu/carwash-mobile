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

const vehicleTypeService = {
  async getAll() {
    const response = await api.get('/api/vehicle-types');
    return normalizeResponse(response);
  },
};

export default vehicleTypeService;

// example return of /api/vehicle-types
// {
//     "status": true,
//     "message": "Vehicle types retrieved successfully.",
//     "data": [
//         {
//             "id": 3,
//             "vehicle_type": "SMALL 1",
//             "sub_title": "Motorcycle",
//             "image_url": "http://localhost:8011/storage/vehicle-types/E9p2ZyhBGAcKqoPJ0usDzafwyUOduBFBvWwzlgx2.png",
//             "amount": "50.00"
//         },
//         {
//             "id": 4,
//             "vehicle_type": "SMALL 2",
//             "sub_title": "Sedan",
//             "image_url": "http://localhost:8011/storage/vehicle-types/HJAbebaK5ecthJOPwrsaBIR2hndTqRaDyVpMekVA.png",
//             "amount": "75.00"
//         },
//         {
//             "id": 5,
//             "vehicle_type": "MEDIUM 1",
//             "sub_title": "SUV",
//             "image_url": "http://localhost:8011/storage/vehicle-types/Ve8XqcHXsHJMZPzs3AS0eoOQddtMYVWjRsuQCXbH.png",
//             "amount": "100.00"
//         },
//         {
//             "id": 6,
//             "vehicle_type": "MEDIUM 2",
//             "sub_title": "Pickup",
//             "image_url": "http://localhost:8011/storage/vehicle-types/XzEFUcv3gjR550vV1K0kmqSODxlDnRt5jzo5Osbu.png",
//             "amount": "100.00"
//         },
//         {
//             "id": 7,
//             "vehicle_type": "LARGE",
//             "sub_title": "Van",
//             "image_url": "http://localhost:8011/storage/vehicle-types/mJhN75zehduIFy3wE6GqamU6SO9Yj8vh6ShKlxei.png",
//             "amount": "150.00"
//         }
//     ]
// }

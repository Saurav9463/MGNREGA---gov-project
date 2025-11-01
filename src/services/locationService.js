import { UP_DISTRICTS } from '../constants/districts';

export const locationService = {
  detectUserLocation() {
    return new Promise((resolve, reject) => {
      if (!('geolocation' in navigator)) {
        reject(new Error('Geolocation not supported'));
        return;
      }

      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          const nearestDistrict = this.findNearestDistrict(latitude, longitude);
          resolve(nearestDistrict);
        },
        (error) => {
          reject(error);
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 0
        }
      );
    });
  },

  findNearestDistrict(lat, lng) {
    let nearest = UP_DISTRICTS[0];
    let minDist = Infinity;

    UP_DISTRICTS.forEach(district => {
      const dist = Math.sqrt(
        Math.pow(lat - district.lat, 2) + 
        Math.pow(lng - district.lng, 2)
      );
      if (dist < minDist) {
        minDist = dist;
        nearest = district;
      }
    });

    return nearest;
  }
};
import { storageService } from './storageService';
import { generateMockData } from '../utils/mockData';

export const apiService = {
  async fetchDistrictData(districtCode) {
    
    const cachedData = await storageService.getDistrictData(districtCode);
    
    if (cachedData && storageService.isCacheValid(cachedData)) {
      return { data: cachedData.data, fromCache: true };
    }

    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const mockData = generateMockData(districtCode);
      
      
      await storageService.setDistrictData(districtCode, mockData);
      
      return { data: mockData, fromCache: false };
    } catch (error) {
      
      if (cachedData) {
        return { data: cachedData.data, fromCache: true, error: true };
      }
      throw error;
    }
  }
};
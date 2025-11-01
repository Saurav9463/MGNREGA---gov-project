export const storageService = {
  async getDistrictData(districtCode) {
    try {
      const result = await window.storage.get(`district_${districtCode}`);
      if (result) {
        return JSON.parse(result.value);
      }
      return null;
    } catch (error) {
      console.error('Storage get error:', error);
      return null;
    }
  },

  async setDistrictData(districtCode, data) {
    try {
      const payload = {
        data,
        timestamp: Date.now()
      };
      await window.storage.set(`district_${districtCode}`, JSON.stringify(payload));
      return true;
    } catch (error) {
      console.error('Storage set error:', error);
      return false;
    }
  },

  isCacheValid(cachedData, maxAge = 24 * 60 * 60 * 1000) {
    if (!cachedData || !cachedData.timestamp) return false;
    const age = Date.now() - cachedData.timestamp;
    return age < maxAge;
  }
};
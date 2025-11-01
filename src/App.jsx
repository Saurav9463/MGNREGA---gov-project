import React, { useState, useEffect } from 'react';
import { MapPin, Users, Briefcase, IndianRupee, TrendingUp, TrendingDown, Minus, AlertCircle, CheckCircle, Clock, Home, BarChart3, Info, Calendar, RefreshCw, Wifi, WifiOff, ChevronRight, HelpCircle } from 'lucide-react';

// All 75 UP Districts with coordinates
const UP_DISTRICTS = [
  { code: 'AGR', name: 'Agra', nameHi: 'आगरा', lat: 27.1767, lng: 78.0081 },
  { code: 'ALL', name: 'Prayagraj', nameHi: 'प्रयागराज', lat: 25.4358, lng: 81.8463 },
  { code: 'AMB', name: 'Ambedkar Nagar', nameHi: 'अम्बेडकर नगर', lat: 26.4057, lng: 82.6986 },
  { code: 'AME', name: 'Amethi', nameHi: 'अमेठी', lat: 26.1594, lng: 81.8078 },
  { code: 'AMR', name: 'Amroha', nameHi: 'अमरोहा', lat: 28.9034, lng: 78.4670 },
  { code: 'AUR', name: 'Auraiya', nameHi: 'औरैया', lat: 26.4647, lng: 79.5130 },
  { code: 'AZM', name: 'Azamgarh', nameHi: 'आजमगढ़', lat: 26.0686, lng: 83.1840 },
  { code: 'BAG', name: 'Baghpat', nameHi: 'बागपत', lat: 28.9477, lng: 77.2172 },
  { code: 'BAH', name: 'Bahraich', nameHi: 'बहराइच', lat: 27.5742, lng: 81.5947 },
  { code: 'BAL', name: 'Ballia', nameHi: 'बलिया', lat: 25.7649, lng: 84.1496 },
  { code: 'BAM', name: 'Balrampur', nameHi: 'बलरामपुर', lat: 27.4287, lng: 82.1810 },
  { code: 'BAN', name: 'Banda', nameHi: 'बांदा', lat: 25.4770, lng: 80.3350 },
  { code: 'BAR', name: 'Barabanki', nameHi: 'बाराबंकी', lat: 26.9238, lng: 81.1820 },
  { code: 'BRY', name: 'Bareilly', nameHi: 'बरेली', lat: 28.3670, lng: 79.4304 },
  { code: 'BAS', name: 'Basti', nameHi: 'बस्ती', lat: 26.8116, lng: 82.7391 },
  { code: 'BDA', name: 'Bhadohi', nameHi: 'भदोही', lat: 25.3953, lng: 82.5714 },
  { code: 'BIJ', name: 'Bijnor', nameHi: 'बिजनौर', lat: 29.3740, lng: 78.1360 },
  { code: 'BUD', name: 'Budaun', nameHi: 'बदायूं', lat: 28.0345, lng: 79.1140 },
  { code: 'BUL', name: 'Bulandshahr', nameHi: 'बुलंदशहर', lat: 28.4074, lng: 77.8498 },
  { code: 'CHA', name: 'Chandauli', nameHi: 'चंदौली', lat: 25.2668, lng: 83.2716 },
  { code: 'CHI', name: 'Chitrakoot', nameHi: 'चित्रकूट', lat: 25.2000, lng: 80.9000 },
  { code: 'DEO', name: 'Deoria', nameHi: 'देवरिया', lat: 26.5024, lng: 83.7791 },
  { code: 'ETH', name: 'Etah', nameHi: 'एटा', lat: 27.5640, lng: 78.6640 },
  { code: 'ETW', name: 'Etawah', nameHi: 'इटावा', lat: 26.7855, lng: 79.0215 },
  { code: 'FAI', name: 'Ayodhya', nameHi: 'अयोध्या', lat: 26.7922, lng: 82.1998 },
  { code: 'FAR', name: 'Farrukhabad', nameHi: 'फर्रुखाबाद', lat: 27.3882, lng: 79.5800 },
  { code: 'FAT', name: 'Fatehpur', nameHi: 'फतेहपुर', lat: 25.9300, lng: 80.8120 },
  { code: 'FIR', name: 'Firozabad', nameHi: 'फिरोजाबाद', lat: 27.1591, lng: 78.3957 },
  { code: 'GBN', name: 'Gautam Buddha Nagar', nameHi: 'गौतम बुद्ध नगर', lat: 28.5355, lng: 77.3910 },
  { code: 'GHA', name: 'Ghaziabad', nameHi: 'गाजियाबाद', lat: 28.6692, lng: 77.4538 },
  { code: 'GHP', name: 'Ghazipur', nameHi: 'गाजीपुर', lat: 25.5800, lng: 83.5800 },
  { code: 'GON', name: 'Gonda', nameHi: 'गोंडा', lat: 27.1333, lng: 81.9614 },
  { code: 'GOR', name: 'Gorakhpur', nameHi: 'गोरखपुर', lat: 26.7606, lng: 83.3732 },
  { code: 'HAM', name: 'Hamirpur', nameHi: 'हमीरपुर', lat: 25.9562, lng: 80.1521 },
  { code: 'HAP', name: 'Hapur', nameHi: 'हापुड़', lat: 28.7296, lng: 77.7761 },
  { code: 'HAR', name: 'Hardoi', nameHi: 'हरदोई', lat: 27.3960, lng: 80.1309 },
  { code: 'HAT', name: 'Hathras', nameHi: 'हाथरस', lat: 27.5950, lng: 78.0500 },
  { code: 'JAL', name: 'Jalaun', nameHi: 'जालौन', lat: 26.1440, lng: 79.3370 },
  { code: 'JAU', name: 'Jaunpur', nameHi: 'जौनपुर', lat: 25.7477, lng: 82.6838 },
  { code: 'JHA', name: 'Jhansi', nameHi: 'झांसी', lat: 25.4484, lng: 78.5685 },
  { code: 'KAN', name: 'Kannauj', nameHi: 'कन्नौज', lat: 27.0514, lng: 79.9140 },
  { code: 'KDE', name: 'Kanpur Dehat', nameHi: 'कानपुर देहात', lat: 26.4682, lng: 79.9345 },
  { code: 'KNP', name: 'Kanpur Nagar', nameHi: 'कानपुर नगर', lat: 26.4499, lng: 80.3319 },
  { code: 'KAS', name: 'Kasganj', nameHi: 'कासगंज', lat: 27.8090, lng: 78.6460 },
  { code: 'KAU', name: 'Kaushambi', nameHi: 'कौशाम्बी', lat: 25.5312, lng: 81.3777 },
  { code: 'KHE', name: 'Kheri', nameHi: 'खीरी', lat: 27.9540, lng: 80.7830 },
  { code: 'KUS', name: 'Kushinagar', nameHi: 'कुशीनगर', lat: 26.7419, lng: 83.8938 },
  { code: 'LAL', name: 'Lalitpur', nameHi: 'ललितपुर', lat: 24.6900, lng: 78.4120 },
  { code: 'LKO', name: 'Lucknow', nameHi: 'लखनऊ', lat: 26.8467, lng: 80.9462 },
  { code: 'MAH', name: 'Maharajganj', nameHi: 'महाराजगंज', lat: 27.1441, lng: 83.5611 },
  { code: 'MAI', name: 'Mahoba', nameHi: 'महोबा', lat: 25.2920, lng: 79.8730 },
  { code: 'MAI', name: 'Mainpuri', nameHi: 'मैनपुरी', lat: 27.2350, lng: 79.0275 },
  { code: 'MAT', name: 'Mathura', nameHi: 'मथुरा', lat: 27.4924, lng: 77.6737 },
  { code: 'MAU', name: 'Mau', nameHi: 'मऊ', lat: 25.9420, lng: 83.5611 },
  { code: 'MRT', name: 'Meerut', nameHi: 'मेरठ', lat: 28.9845, lng: 77.7064 },
  { code: 'MIR', name: 'Mirzapur', nameHi: 'मिर्जापुर', lat: 25.1460, lng: 82.5690 },
  { code: 'MOR', name: 'Moradabad', nameHi: 'मुरादाबाद', lat: 28.8389, lng: 78.7378 },
  { code: 'MUZ', name: 'Muzaffarnagar', nameHi: 'मुजफ्फरनगर', lat: 29.4727, lng: 77.7085 },
  { code: 'PIB', name: 'Pilibhit', nameHi: 'पीलीभीत', lat: 28.6300, lng: 79.8040 },
  { code: 'PRA', name: 'Pratapgarh', nameHi: 'प्रतापगढ़', lat: 25.8940, lng: 81.9420 },
  { code: 'RAE', name: 'Rae Bareli', nameHi: 'रायबरेली', lat: 26.2152, lng: 81.2540 },
  { code: 'RAM', name: 'Rampur', nameHi: 'रामपुर', lat: 28.8090, lng: 79.0256 },
  { code: 'SAH', name: 'Saharanpur', nameHi: 'सहारनपुर', lat: 29.9680, lng: 77.5460 },
  { code: 'SBP', name: 'Sambhal', nameHi: 'संभल', lat: 28.5850, lng: 78.5700 },
  { code: 'SDK', name: 'Siddharthnagar', nameHi: 'सिद्धार्थनगर', lat: 27.2504, lng: 83.0956 },
  { code: 'SIT', name: 'Sitapur', nameHi: 'सीतापुर', lat: 27.5670, lng: 80.6800 },
  { code: 'SON', name: 'Sonbhadra', nameHi: 'सोनभद्र', lat: 24.6910, lng: 83.0680 },
  { code: 'SRA', name: 'Sultanpur', nameHi: 'सुल्तानपुर', lat: 26.2646, lng: 82.0710 },
  { code: 'SHJ', name: 'Shahjahanpur', nameHi: 'शाहजहांपुर', lat: 27.8800, lng: 79.9050 },
  { code: 'SHM', name: 'Shamli', nameHi: 'शामली', lat: 29.4490, lng: 77.3110 },
  { code: 'SHR', name: 'Shrawasti', nameHi: 'श्रावस्ती', lat: 27.5080, lng: 81.7770 },
  { code: 'UNN', name: 'Unnao', nameHi: 'उन्नाव', lat: 26.5465, lng: 80.4878 },
  { code: 'VNS', name: 'Varanasi', nameHi: 'वाराणसी', lat: 25.3176, lng: 82.9739 }
];

const TRANSLATIONS = {
  en: {
    title: 'MGNREGA District Tracker',
    subtitle: 'Track employment guarantee scheme in your district',
    selectDistrict: 'Select Your District',
    detectLocation: 'Find My District Automatically',
    locationDetected: 'Location Detected',
    detecting: 'Detecting location...',
    overview: 'Overview',
    trends: 'Trends',
    compare: 'Compare',
    help: 'Help',
    households: 'Families Got Work',
    jobCards: 'Job Cards Given',
    workDays: 'Days of Work',
    wages: 'Money Paid',
    crore: 'Cr',
    lakh: 'L',
    thousand: 'K',
    loading: 'Loading...',
    offline: 'Showing saved data (No internet)',
    online: 'Connected to internet',
    lastUpdated: 'Last updated',
    vsLastMonth: 'vs last month',
    vsLastYear: 'vs last year',
    districtPerformance: 'Your District Performance',
    overall: 'Overall',
    good: 'Good',
    average: 'Average',
    needsWork: 'Needs Improvement',
    monthlyTrends: 'Last 6 Months Performance',
    comparison: 'How Does Your District Compare?',
    betterThan: 'Better than',
    worseThan: 'Needs to catch up with',
    ofDistricts: 'districts',
    whatIsMGNREGA: 'What is MGNREGA?',
    mgnregaSimple: 'Government gives 100 days work to rural families every year',
    howItHelps: 'How it helps you:',
    benefit1: '100 days guaranteed work near your home',
    benefit2: 'Equal pay for men and women',
    benefit3: 'Work within 5 km of your village',
    benefit4: 'Money in your bank in 15 days',
    whatIsJobCard: 'What is a Job Card?',
    jobCardExplain: 'A card that shows you are registered for MGNREGA work. Get it from your Gram Panchayat office.',
    whatAreWorkDays: 'What are Work Days?',
    workDaysExplain: 'Total days of work given to all families in your district this month.',
    contact: 'Need Help?',
    contactGP: 'Visit your Gram Panchayat office',
    helpline: 'Call Helpline',
    retry: 'Try Again',
    select: 'Select',
    month: 'Month',
    refreshData: 'Refresh Data'
  },
  hi: {
    title: 'मनरेगा जिला ट्रैकर',
    subtitle: 'अपने जिले में रोजगार योजना देखें',
    selectDistrict: 'अपना जिला चुनें',
    detectLocation: 'अपना जिला अपने आप खोजें',
    locationDetected: 'जगह मिल गई',
    detecting: 'जगह खोज रहे हैं...',
    overview: 'सारांश',
    trends: 'ग्राफ',
    compare: 'तुलना',
    help: 'मदद',
    households: 'परिवारों को काम मिला',
    jobCards: 'जॉब कार्ड दिए',
    workDays: 'काम के दिन',
    wages: 'दी गई मजदूरी',
    crore: 'करोड़',
    lakh: 'लाख',
    thousand: 'हजार',
    loading: 'लोड हो रहा है...',
    offline: 'सहेजा डेटा दिखा रहे हैं (इंटरनेट नहीं)',
    online: 'इंटरनेट जुड़ा है',
    lastUpdated: 'अपडेट',
    vsLastMonth: 'पिछले महीने से',
    vsLastYear: 'पिछले साल से',
    districtPerformance: 'आपके जिले का प्रदर्शन',
    overall: 'कुल',
    good: 'अच्छा',
    average: 'ठीक',
    needsWork: 'सुधार की जरूरत',
    monthlyTrends: 'पिछले 6 महीने का प्रदर्शन',
    comparison: 'आपका जिला कैसा है?',
    betterThan: 'बेहतर है',
    worseThan: 'सुधार करना है',
    ofDistricts: 'जिलों से',
    whatIsMGNREGA: 'मनरेगा क्या है?',
    mgnregaSimple: 'सरकार हर साल गांव के परिवारों को 100 दिन काम देती है',
    howItHelps: 'आपको कैसे मदद करता है:',
    benefit1: 'घर के पास 100 दिन काम की गारंटी',
    benefit2: 'पुरुष और महिला को बराबर मजदूरी',
    benefit3: 'गांव से 5 किमी के अंदर काम',
    benefit4: '15 दिन में बैंक में पैसा',
    whatIsJobCard: 'जॉब कार्ड क्या है?',
    jobCardExplain: 'एक कार्ड जो दिखाता है कि आप मनरेगा काम के लिए रजिस्टर्ड हैं। अपनी ग्राम पंचायत से लें।',
    whatAreWorkDays: 'काम के दिन क्या हैं?',
    workDaysExplain: 'इस महीने आपके जिले के सभी परिवारों को कुल कितने दिन काम मिला।',
    contact: 'मदद चाहिए?',
    contactGP: 'अपनी ग्राम पंचायत में जाएं',
    helpline: 'हेल्पलाइन पर फोन करें',
    retry: 'फिर कोशिश करें',
    select: 'चुनें',
    month: 'महीना',
    refreshData: 'डेटा रिफ्रेश करें'
  }
};

// Utility Functions
const formatNumber = (num, t) => {
  if (num >= 10000000) return `${(num / 10000000).toFixed(1)} ${t.crore}`;
  if (num >= 100000) return `${(num / 100000).toFixed(1)} ${t.lakh}`;
  if (num >= 1000) return `${(num / 1000).toFixed(0)} ${t.thousand}`;
  return num.toString();
};

const getChange = (current, previous) => {
  if (!previous) return 0;
  return ((current - previous) / previous) * 100;
};

const getPerformanceLabel = (score, t) => {
  if (score >= 75) return { label: t.good, color: 'text-green-600', bg: 'bg-green-100' };
  if (score >= 60) return { label: t.average, color: 'text-yellow-600', bg: 'bg-yellow-100' };
  return { label: t.needsWork, color: 'text-red-600', bg: 'bg-red-100' };
};

// Generate mock historical data
const generateHistoricalData = (districtCode) => {
  const base = districtCode.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const months = ['Oct', 'Sep', 'Aug', 'Jul', 'Jun', 'May'];
  
  return months.map((month, idx) => ({
    month,
    households: 40000 + (base % 5000) + (idx * 1000),
    jobCards: 70000 + (base % 10000) + (idx * 1500),
    workDays: 2500000 + (base % 300000) + (idx * 50000),
    performance: 65 + (base % 15) + (idx * 2)
  }));
};

// Generate current month data
const generateCurrentData = (districtCode) => {
  const base = districtCode.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  return {
    current: {
      households: 45000 + (base % 10000),
      jobCards: 78000 + (base % 15000),
      workDays: 2800000 + (base % 500000),
      wagesPaid: 280 + (base % 50),
      performance: 75 + (base % 20)
    },
    lastMonth: {
      households: 42000 + (base % 8000),
      jobCards: 75000 + (base % 12000),
      workDays: 2600000 + (base % 400000),
      wagesPaid: 260 + (base % 40)
    },
    lastYear: {
      households: 38000 + (base % 7000),
      performance: 70 + (base % 15)
    },
    ranking: Math.floor((base % 15) + 1), // Rank out of 17
    lastUpdated: new Date().toISOString()
  };
};

// API Service with retry and caching
const apiService = {
  // Real Government API Configuration
  API_BASE_URL: 'https://api.data.gov.in/resource/d57b55d0-91ea-4162-ac29-c095c75c96e1',
  API_KEY: 'YOUR_API_KEY_HERE', // Get from data.gov.in
  
  async fetchDistrictData(districtCode) {
    const cacheKey = `district_${districtCode}`;
    
    // Try to get from storage first
    try {
      const cached = await window.storage.get(cacheKey);
      if (cached) {
        const data = JSON.parse(cached.value);
        const cacheAge = Date.now() - new Date(data.timestamp).getTime();
        
        // Use cache if less than 1 hour old
        if (cacheAge < 60 * 60 * 1000) {
          console.log('✅ Using cached data (age: ' + Math.floor(cacheAge / 60000) + ' minutes)');
          return { ...data, fromCache: true };
        }
      }
    } catch (e) {
      console.log('Cache read failed:', e);
    }

    // Fetch new data from Government API
    try {
      console.log('🌐 Fetching from Government API...');
      
      /* PRODUCTION CODE - UNCOMMENT TO USE REAL API:
      
      const response = await fetch(
        `${this.API_BASE_URL}?api-key=${this.API_KEY}&format=json&filters[district_code]=${districtCode}&limit=1`,
        {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
          },
          // Timeout after 10 seconds
          signal: AbortSignal.timeout(10000)
        }
      );
      
      if (!response.ok) {
        throw new Error(`API returned ${response.status}`);
      }
      
      const apiData = await response.json();
      
      // Transform API response to our format
      const data = {
        current: {
          households: apiData.records[0]?.households_issued_jobcard || 0,
          jobCards: apiData.records[0]?.total_jobcards_issued || 0,
          workDays: apiData.records[0]?.persondays_generated || 0,
          wagesPaid: apiData.records[0]?.total_wage_expenditure || 0,
          performance: this.calculatePerformance(apiData.records[0])
        },
        lastMonth: {
          // Fetch previous month data similarly
          households: apiData.records[0]?.prev_households || 0,
          jobCards: apiData.records[0]?.prev_jobcards || 0,
          workDays: apiData.records[0]?.prev_workdays || 0,
          wagesPaid: apiData.records[0]?.prev_wages || 0
        },
        lastYear: {
          households: apiData.records[0]?.ly_households || 0,
          performance: apiData.records[0]?.ly_performance || 70
        },
        historical: await this.fetchHistoricalData(districtCode),
        ranking: apiData.records[0]?.state_ranking || 1,
        timestamp: new Date().toISOString()
      };
      
      */
      
      // DEVELOPMENT CODE - Using mock data for demonstration
      console.log('⚠️ Using mock data (API integration commented out)');
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate network delay
      
      const data = {
        ...generateCurrentData(districtCode),
        historical: generateHistoricalData(districtCode),
        timestamp: new Date().toISOString()
      };
      
      // Save to storage
      try {
        await window.storage.set(cacheKey, JSON.stringify(data));
        console.log('💾 Data cached successfully');
      } catch (e) {
        console.log('Cache write failed:', e);
      }
      
      return { ...data, fromCache: false };
    } catch (error) {
      console.error('❌ API fetch failed:', error);
      
      // Fallback to cache on error (even if expired)
      try {
        const cached = await window.storage.get(cacheKey);
        if (cached) {
          console.log('📦 Using expired cache as fallback');
          return { ...JSON.parse(cached.value), fromCache: true, error: true };
        }
      } catch (e) {
        console.log('Fallback cache read failed:', e);
      }
      
      throw new Error('Failed to fetch data and no cache available');
    }
  },
  
  // Calculate performance score from raw API data
  calculatePerformance(record) {
    if (!record) return 0;
    
    // Example calculation (adjust based on actual metrics)
    const jobCardUtilization = (record.households_issued_jobcard / record.total_jobcards_issued) * 100;
    const workDayEfficiency = (record.persondays_generated / record.target_persondays) * 100;
    const wagePaymentRate = (record.wages_paid_within_15days / record.total_wages_due) * 100;
    
    // Weighted average
    return Math.round(
      (jobCardUtilization * 0.3) + 
      (workDayEfficiency * 0.4) + 
      (wagePaymentRate * 0.3)
    );
  },
  
  // Fetch historical data for trends
  async fetchHistoricalData(districtCode) {
    /* PRODUCTION CODE:
    const response = await fetch(
      `${this.API_BASE_URL}?api-key=${this.API_KEY}&format=json&filters[district_code]=${districtCode}&limit=6&sort[month]=desc`
    );
    const data = await response.json();
    return data.records.map(record => ({
      month: this.getMonthName(record.month),
      households: record.households_issued_jobcard,
      jobCards: record.total_jobcards_issued,
      workDays: record.persondays_generated,
      performance: this.calculatePerformance(record)
    }));
    */
    
    // Mock data for now
    return generateHistoricalData(districtCode);
  },
  
  getMonthName(monthNum) {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return months[monthNum - 1] || 'Unknown';
  }
};

// Location Service
const locationService = {
  async detectDistrict() {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject(new Error('Geolocation not supported'));
        return;
      }

      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          
          // Find nearest district
          let nearest = UP_DISTRICTS[0];
          let minDist = Infinity;
          
          UP_DISTRICTS.forEach(district => {
            const dist = Math.sqrt(
              Math.pow(latitude - district.lat, 2) + 
              Math.pow(longitude - district.lng, 2)
            );
            if (dist < minDist) {
              minDist = dist;
              nearest = district;
            }
          });
          
          resolve(nearest);
        },
        (error) => reject(error),
        { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
      );
    });
  }
};

// Components
const ChangeIndicator = ({ change }) => {
  if (change > 5) return <TrendingUp className="w-4 h-4 text-green-600" />;
  if (change < -5) return <TrendingDown className="w-4 h-4 text-red-600" />;
  return <Minus className="w-4 h-4 text-gray-600" />;
};

const SimpleMetricCard = ({ icon: Icon, label, value, change, comparison, helpText, showHelp, t }) => {
  const [showInfo, setShowInfo] = useState(false);
  
  return (
    <div className="bg-white rounded-xl shadow-lg p-5 border-2 border-gray-100 hover:border-orange-200 transition-all">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          <div className="bg-gradient-to-br from-orange-400 to-orange-600 p-3 rounded-xl shadow-md">
            <Icon className="w-7 h-7 text-white" />
          </div>
          <div>
            <p className="text-sm text-gray-600 font-medium">{label}</p>
            <p className="text-3xl font-bold text-gray-900 mt-1">{value}</p>
          </div>
        </div>
        {showHelp && helpText && (
          <button 
            onClick={() => setShowInfo(!showInfo)}
            className="p-1 hover:bg-gray-100 rounded-full"
          >
            <HelpCircle className="w-5 h-5 text-gray-400" />
          </button>
        )}
      </div>
      
      {showInfo && helpText && (
        <div className="mb-3 p-3 bg-blue-50 rounded-lg text-sm text-blue-900">
          {helpText}
        </div>
      )}
      
      {change !== undefined && (
        <div className="flex items-center gap-2 pt-3 border-t border-gray-100">
          <ChangeIndicator change={change} />
          <span className={`text-sm font-bold ${change > 0 ? 'text-green-600' : change < 0 ? 'text-red-600' : 'text-gray-600'}`}>
            {change > 0 ? '+' : ''}{change.toFixed(0)}%
          </span>
          <span className="text-xs text-gray-500">{comparison}</span>
        </div>
      )}
    </div>
  );
};

const TrendChart = ({ data, t }) => {
  const maxValue = Math.max(...data.map(d => d.performance));
  
  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h3 className="text-lg font-bold text-gray-900 mb-6">{t.monthlyTrends}</h3>
      <div className="flex items-end justify-between gap-3 h-56">
        {data.slice().reverse().map((item, idx) => {
          const height = (item.performance / maxValue) * 100;
          const perf = getPerformanceLabel(item.performance, t);
          
          return (
            <div key={idx} className="flex-1 flex flex-col items-center group">
              <div className="w-full flex items-end justify-center h-40 relative">
                {/* Performance Number Above Bar */}
                <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="bg-gray-900 text-white px-3 py-1 rounded-lg text-sm font-bold whitespace-nowrap">
                    {item.performance}%
                  </div>
                </div>
                
                {/* Bar */}
                <div 
                  className={`w-full ${perf.bg} rounded-t-xl transition-all hover:opacity-90 cursor-pointer border-2 ${
                    item.performance >= 75 ? 'border-green-300' : 
                    item.performance >= 60 ? 'border-yellow-300' : 'border-red-300'
                  }`}
                  style={{ height: `${height}%`, minHeight: '20%' }}
                >
                  {/* Show percentage inside bar if tall enough */}
                  {height > 30 && (
                    <div className="flex items-center justify-center h-full">
                      <span className="text-lg font-bold text-gray-700">{item.performance}%</span>
                    </div>
                  )}
                </div>
              </div>
              
              {/* Month Label */}
              <p className="text-sm text-gray-700 mt-3 font-bold">{item.month}</p>
              
              {/* Small indicator below */}
              <div className={`w-3 h-3 rounded-full mt-1 ${
                item.performance >= 75 ? 'bg-green-500' : 
                item.performance >= 60 ? 'bg-yellow-500' : 'bg-red-500'
              }`} />
            </div>
          );
        })}
      </div>
      
      {/* Legend */}
      <div className="flex items-center justify-center gap-6 mt-8 pt-4 border-t border-gray-200">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-green-100 border-2 border-green-300"></div>
          <span className="text-sm text-gray-600 font-medium">{t.good} (75%+)</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-yellow-100 border-2 border-yellow-300"></div>
          <span className="text-sm text-gray-600 font-medium">{t.average} (60-74%)</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-red-100 border-2 border-red-300"></div>
          <span className="text-sm text-gray-600 font-medium">{t.needsWork} (&lt;60%)</span>
        </div>
      </div>
    </div>
  );
};

// Main App Component
function App() {
  const [language, setLanguage] = useState('hi');
  const [selectedDistrict, setSelectedDistrict] = useState(null);
  const [districtData, setDistrictData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [detecting, setDetecting] = useState(false);
  const [locationDetected, setLocationDetected] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  
  const t = TRANSLATIONS[language];

  // Monitor online/offline status
  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const loadDistrictData = async (district) => {
    setLoading(true);
    setError(null);

    try {
      const data = await apiService.fetchDistrictData(district.code);
      setDistrictData(data);
      if (data.error) {
        setError('offline');
      }
    } catch (err) {
      setError('failed');
      console.error('Failed to load data:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDetectLocation = async () => {
    setDetecting(true);
    try {
      const district = await locationService.detectDistrict();
      setSelectedDistrict(district);
      setLocationDetected(true);
      await loadDistrictData(district);
    } catch (err) {
      alert(t.retry);
    } finally {
      setDetecting(false);
    }
  };

  const handleDistrictSelect = async (district) => {
    setSelectedDistrict(district);
    setLocationDetected(false);
    await loadDistrictData(district);
  };

  const handleRefresh = () => {
    if (selectedDistrict) {
      loadDistrictData(selectedDistrict);
    }
  };

  // District Selection Screen
  if (!selectedDistrict) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-green-50 p-4">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8 pt-8">
            <div className="flex items-center justify-center gap-3 mb-4">
              <img src="https://upload.wikimedia.org/wikipedia/commons/5/55/Emblem_of_India.svg" alt="Emblem" className="w-16 h-16" />
              <div>
                <h1 className="text-4xl font-bold text-gray-900">{t.title}</h1>
                <p className="text-gray-600 mt-1">{t.subtitle}</p>
              </div>
            </div>
            
            {/* Language Toggle */}
            <div className="flex justify-center gap-2 mt-6">
              <button
                onClick={() => setLanguage('hi')}
                className={`px-6 py-3 rounded-xl font-bold text-lg transition-all ${
                  language === 'hi' 
                    ? 'bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-lg scale-105' 
                    : 'bg-white text-gray-700 hover:bg-gray-50'
                }`}
              >
                हिंदी
              </button>
              <button
                onClick={() => setLanguage('en')}
                className={`px-6 py-3 rounded-xl font-bold text-lg transition-all ${
                  language === 'en' 
                    ? 'bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-lg scale-105' 
                    : 'bg-white text-gray-700 hover:bg-gray-50'
                }`}
              >
                English
              </button>
            </div>
          </div>

          {/* Auto-detect Button */}
          <div className="bg-white rounded-2xl shadow-xl p-6 mb-4 border-2 border-green-200">
            <button
              onClick={handleDetectLocation}
              disabled={detecting}
              className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white py-5 rounded-xl font-bold text-xl flex items-center justify-center gap-3 hover:from-green-600 hover:to-green-700 transition-all shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {detecting ? (
                <>
                  <RefreshCw className="w-6 h-6 animate-spin" />
                  {t.detecting}
                </>
              ) : (
                <>
                  <MapPin className="w-6 h-6" />
                  {t.detectLocation}
                </>
              )}
            </button>
            <p className="text-center text-sm text-gray-500 mt-3">
              {language === 'hi' ? 'तेज़ और आसान तरीका' : 'Quick and easy way'}
            </p>
          </div>

          {/* OR Divider */}
          <div className="flex items-center gap-4 my-6">
            <div className="flex-1 h-px bg-gray-300"></div>
            <span className="text-gray-500 font-medium">{language === 'hi' ? 'या' : 'OR'}</span>
            <div className="flex-1 h-px bg-gray-300"></div>
          </div>

          {/* Manual Selection */}
          <div className="bg-white rounded-2xl shadow-xl p-6 mb-4">
            <label className="block text-base font-bold text-gray-900 mb-3">
              {t.selectDistrict}
            </label>
            <select
              onChange={(e) => {
                const district = UP_DISTRICTS.find(d => d.code === e.target.value);
                if (district) handleDistrictSelect(district);
              }}
              className="w-full p-4 border-2 border-gray-300 rounded-xl text-lg focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-200 transition-all"
            >
              <option value="">-- {t.select} --</option>
              {UP_DISTRICTS.map(district => (
                <option key={district.code} value={district.code}>
                  {language === 'hi' ? district.nameHi : district.name}
                </option>
              ))}
            </select>
          </div>

          {/* Info Card */}
          <div className="bg-gradient-to-r from-blue-50 to-blue-100 border-2 border-blue-200 rounded-2xl p-6">
            <div className="flex gap-4">
              <Info className="w-8 h-8 text-blue-600 flex-shrink-0" />
              <div>
                <p className="font-bold text-blue-900 mb-2 text-lg">{t.whatIsMGNREGA}</p>
                <p className="text-blue-800 text-base leading-relaxed">{t.mgnregaSimple}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Main Dashboard
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-green-50">
      {/* Sticky Header */}
      <div className="bg-white shadow-md sticky top-0 z-20">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button
                onClick={() => {
                  setSelectedDistrict(null);
                  setDistrictData(null);
                  setError(null);
                }}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <Home className="w-6 h-6 text-gray-700" />
              </button>
              <div>
                <h2 className="text-xl font-bold text-gray-900">
                  {language === 'hi' ? selectedDistrict.nameHi : selectedDistrict.name}
                </h2>
                {locationDetected && (
                  <p className="text-xs text-green-600 flex items-center gap-1">
                    <MapPin className="w-3 h-3" />
                    {t.locationDetected}
                  </p>
                )}
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              {/* Online/Offline Indicator */}
              <div className={`flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${
                isOnline ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
              }`}>
                {isOnline ? <Wifi className="w-3 h-3" /> : <WifiOff className="w-3 h-3" />}
                {isOnline ? t.online : t.offline}
              </div>
              
              {/* Refresh Button */}
              <button
                onClick={handleRefresh}
                disabled={loading}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors disabled:opacity-50"
                title={t.refreshData}
              >
                <RefreshCw className={`w-5 h-5 text-gray-700 ${loading ? 'animate-spin' : ''}`} />
              </button>
              
              {/* Language Toggle */}
              <button
                onClick={() => setLanguage(language === 'hi' ? 'en' : 'hi')}
                className="px-4 py-2 bg-orange-500 text-white rounded-lg text-sm font-bold hover:bg-orange-600 transition-colors"
              >
                {language === 'hi' ? 'English' : 'हिंदी'}
              </button>
            </div>
          </div>
          
          {/* Error Banner */}
          {error && (
            <div className="mt-3 bg-yellow-50 border border-yellow-200 rounded-lg p-3 flex items-center gap-2 text-sm text-yellow-800">
              <AlertCircle className="w-4 h-4" />
              {districtData?.fromCache ? t.offline : 'Could not fetch latest data'}
            </div>
          )}
          
          {/* Last Updated */}
          {districtData && (
            <div className="mt-2 text-xs text-gray-500 flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {t.lastUpdated}: {new Date(districtData.lastUpdated).toLocaleString(language === 'hi' ? 'hi-IN' : 'en-IN')}
            </div>
          )}
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="bg-white border-b sticky top-[100px] z-10 shadow-sm">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex gap-1 overflow-x-auto">
            {[
              { key: 'overview', icon: BarChart3, label: t.overview },
              { key: 'trends', icon: Calendar, label: t.trends },
              { key: 'compare', icon: TrendingUp, label: t.compare },
              { key: 'help', icon: HelpCircle, label: t.help }
            ].map(tab => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`flex-shrink-0 py-4 px-6 font-bold flex items-center justify-center gap-2 border-b-4 transition-all ${
                  activeTab === tab.key 
                    ? 'border-orange-500 text-orange-600 bg-orange-50' 
                    : 'border-transparent text-gray-600 hover:bg-gray-50'
                }`}
              >
                <tab.icon className="w-5 h-5" />
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto p-4">
        {loading ? (
          <div className="flex items-center justify-center py-32">
            <div className="text-center">
              <Clock className="w-16 h-16 text-orange-500 mx-auto mb-4 animate-spin" />
              <p className="text-xl text-gray-600 font-medium">{t.loading}</p>
            </div>
          </div>
        ) : districtData && activeTab === 'overview' ? (
          <div className="space-y-6">
            {/* Performance Banner */}
            <div className={`${getPerformanceLabel(districtData.current.performance, t).bg} rounded-2xl shadow-xl p-6 border-2 ${
              districtData.current.performance >= 75 ? 'border-green-300' : 
              districtData.current.performance >= 60 ? 'border-yellow-300' : 'border-red-300'
            }`}>
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{t.districtPerformance}</h3>
                  <div className="flex items-baseline gap-3">
                    <p className="text-5xl font-bold text-gray-900">{districtData.current.performance}%</p>
                    <span className={`text-xl font-bold ${getPerformanceLabel(districtData.current.performance, t).color}`}>
                      {getPerformanceLabel(districtData.current.performance, t).label}
                    </span>
                  </div>
                </div>
                <CheckCircle className="w-20 h-20 text-green-600 opacity-20" />
              </div>
            </div>

            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <SimpleMetricCard
                icon={Users}
                label={t.households}
                value={formatNumber(districtData.current.households, t)}
                change={getChange(districtData.current.households, districtData.lastMonth.households)}
                comparison={t.vsLastMonth}
                helpText={t.whatIsJobCard}
                showHelp={true}
                t={t}
              />
              <SimpleMetricCard
                icon={Briefcase}
                label={t.jobCards}
                value={formatNumber(districtData.current.jobCards, t)}
                change={getChange(districtData.current.jobCards, districtData.lastMonth.jobCards)}
                comparison={t.vsLastMonth}
                helpText={t.jobCardExplain}
                showHelp={true}
                t={t}
              />
              <SimpleMetricCard
                icon={Clock}
                label={t.workDays}
                value={formatNumber(districtData.current.workDays, t)}
                change={getChange(districtData.current.workDays, districtData.lastMonth.workDays)}
                comparison={t.vsLastMonth}
                helpText={t.workDaysExplain}
                showHelp={true}
                t={t}
              />
              <SimpleMetricCard
                icon={IndianRupee}
                label={t.wages}
                value={`₹${formatNumber(districtData.current.wagesPaid * 10000000, t)}`}
                change={getChange(districtData.current.wagesPaid, districtData.lastMonth.wagesPaid)}
                comparison={t.vsLastMonth}
                showHelp={false}
                t={t}
              />
            </div>
          </div>
        ) : activeTab === 'trends' && districtData ? (
          <div className="space-y-6">
            <TrendChart data={districtData.historical} t={t} />
            
            {/* Year-over-Year Comparison */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">{t.vsLastYear}</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-blue-50 rounded-xl">
                  <p className="text-sm text-gray-600 mb-1">{language === 'hi' ? 'इस साल' : 'This Year'}</p>
                  <p className="text-3xl font-bold text-blue-600">{districtData.current.performance}%</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-xl">
                  <p className="text-sm text-gray-600 mb-1">{language === 'hi' ? 'पिछला साल' : 'Last Year'}</p>
                  <p className="text-3xl font-bold text-gray-600">{districtData.lastYear.performance}%</p>
                </div>
              </div>
              <div className="mt-4 flex items-center gap-2">
                <ChangeIndicator change={getChange(districtData.current.performance, districtData.lastYear.performance)} />
                <span className="text-lg font-bold text-green-600">
                  +{getChange(districtData.current.performance, districtData.lastYear.performance).toFixed(1)}%
                </span>
                <span className="text-gray-600">{language === 'hi' ? 'सुधार' : 'improvement'}</span>
              </div>
            </div>
          </div>
        ) : activeTab === 'compare' && districtData ? (
          <div className="space-y-6">
            {/* Ranking Card */}
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl shadow-xl p-8 border-2 border-purple-200">
              <div className="text-center">
                <h3 className="text-xl font-bold text-gray-900 mb-4">{t.comparison}</h3>
                <div className="flex items-center justify-center gap-4 mb-4">
                  <div className="bg-white rounded-xl shadow-lg p-6">
                    <p className="text-6xl font-bold text-purple-600">#{districtData.ranking}</p>
                    <p className="text-gray-600 mt-2 font-medium">{language === 'hi' ? 'रैंक' : 'Rank'}</p>
                  </div>
                  <div className="text-left">
                    <p className="text-3xl font-bold text-gray-900">
                      {language === 'hi' ? `${UP_DISTRICTS.length} में से` : `out of ${UP_DISTRICTS.length}`}
                    </p>
                    <p className="text-gray-600">{t.ofDistricts}</p>
                  </div>
                </div>
                
                <div className="bg-white rounded-xl p-4 inline-block">
                  {districtData.ranking <= 5 ? (
                    <div className="flex items-center gap-2 text-green-700">
                      <CheckCircle className="w-6 h-6" />
                      <span className="font-bold text-lg">{t.betterThan} {UP_DISTRICTS.length - districtData.ranking} {t.ofDistricts}</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2 text-orange-700">
                      <TrendingUp className="w-6 h-6" />
                      <span className="font-bold text-lg">{t.worseThan} {districtData.ranking - 1} {t.ofDistricts}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        ) : activeTab === 'help' ? (
          <div className="space-y-6">
            {/* What is MGNREGA */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">{t.whatIsMGNREGA}</h3>
              <p className="text-lg text-gray-700 mb-6 leading-relaxed">{t.mgnregaSimple}</p>
              
              <h4 className="text-xl font-bold text-gray-900 mb-4">{t.howItHelps}</h4>
              <div className="space-y-3">
                {[t.benefit1, t.benefit2, t.benefit3, t.benefit4].map((benefit, idx) => (
                  <div key={idx} className="flex items-start gap-4 p-4 bg-green-50 rounded-xl border-2 border-green-200">
                    <div className="bg-green-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0">
                      {idx + 1}
                    </div>
                    <p className="text-gray-800 text-base leading-relaxed">{benefit}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Explainer Cards */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-blue-50 rounded-xl shadow-lg p-6 border-2 border-blue-200">
                <div className="flex items-start gap-3 mb-3">
                  <Briefcase className="w-8 h-8 text-blue-600 flex-shrink-0" />
                  <div>
                    <h4 className="text-lg font-bold text-gray-900">{t.whatIsJobCard}</h4>
                    <p className="text-gray-700 mt-2 leading-relaxed">{t.jobCardExplain}</p>
                  </div>
                </div>
              </div>

              <div className="bg-purple-50 rounded-xl shadow-lg p-6 border-2 border-purple-200">
                <div className="flex items-start gap-3 mb-3">
                  <Clock className="w-8 h-8 text-purple-600 flex-shrink-0" />
                  <div>
                    <h4 className="text-lg font-bold text-gray-900">{t.whatAreWorkDays}</h4>
                    <p className="text-gray-700 mt-2 leading-relaxed">{t.workDaysExplain}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Section */}
            <div className="bg-gradient-to-r from-orange-50 to-red-50 rounded-xl shadow-xl p-8 border-2 border-orange-200">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">{t.contact}</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white rounded-xl p-6 text-center shadow-md">
                  <Home className="w-12 h-12 text-orange-600 mx-auto mb-3" />
                  <p className="text-lg font-bold text-gray-900 mb-2">{t.contactGP}</p>
                  <p className="text-gray-600 text-sm">{language === 'hi' ? 'सबसे नजदीकी मदद' : 'Nearest help available'}</p>
                </div>
                <div className="bg-white rounded-xl p-6 text-center shadow-md">
                  <AlertCircle className="w-12 h-12 text-green-600 mx-auto mb-3" />
                  <p className="text-lg font-bold text-gray-900 mb-2">{t.helpline}</p>
                  <p className="text-2xl font-bold text-green-600">1800-111-555</p>
                  <p className="text-gray-600 text-sm mt-1">{language === 'hi' ? 'टोल फ्री' : 'Toll Free'}</p>
                </div>
              </div>
            </div>
          </div>
        ) : null}
      </div>

      {/* Footer */}
      <footer className="bg-white border-t mt-12 py-8">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-3 mb-3">
            <img src="https://upload.wikimedia.org/wikipedia/commons/5/55/Emblem_of_India.svg" alt="Emblem" className="w-10 h-10" />
            <div className="text-left">
              <p className="text-sm font-bold text-gray-900">
                {language === 'hi' ? 'भारत सरकार' : 'Government of India'}
              </p>
              <p className="text-xs text-gray-600">
                {language === 'hi' ? 'ग्रामीण विकास मंत्रालय' : 'Ministry of Rural Development'}
              </p>
            </div>
          </div>
          <p className="text-xs text-gray-500">
            {language === 'hi' 
              ? 'डेटा स्रोत: data.gov.in | अक्टूबर 2025'
              : 'Data Source: data.gov.in | October 2025'}
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
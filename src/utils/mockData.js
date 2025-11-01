export const generateMockData = (districtCode) => {
  const base = districtCode.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  return {
    current: {
      households: 45000 + (base % 10000),
      jobCards: 78000 + (base % 15000),
      workDays: 2800000 + (base % 500000),
      wagesPaid: 280 + (base % 50)
    },
    previous: {
      households: 42000 + (base % 8000),
      jobCards: 75000 + (base % 12000),
      workDays: 2600000 + (base % 400000),
      wagesPaid: 260 + (base % 40)
    },
    stateAvg: {
      households: 48000,
      jobCards: 82000,
      workDays: 3000000,
      wagesPaid: 300
    },
    performance: {
      overall: 75 + (base % 20),
      wagePayment: 85 + (base % 10),
      workCompletion: 70 + (base % 25)
    },
    timestamp: Date.now()
  };
};
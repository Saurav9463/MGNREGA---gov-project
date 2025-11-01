export const getChange = (current, previous) => {
  return ((current - previous) / previous) * 100;
};

export const getPerformanceColor = (score) => {
  if (score >= 75) return 'green';
  if (score >= 60) return 'yellow';
  return 'red';
};

export const getPerformanceClass = (score) => {
  if (score >= 75) return 'bg-green-100';
  if (score >= 60) return 'bg-yellow-100';
  return 'bg-red-100';
};
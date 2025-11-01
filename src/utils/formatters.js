export const formatNumber = (num, translations) => {
  if (num >= 10000000) return `${(num / 10000000).toFixed(2)} ${translations.crore}`;
  if (num >= 100000) return `${(num / 100000).toFixed(1)} ${translations.lakh}`;
  return num.toLocaleString('en-IN');
};

export const formatCurrency = (amount) => {
  return `₹${amount.toLocaleString('en-IN')}`;
};
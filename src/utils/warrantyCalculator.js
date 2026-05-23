const WARRANTY_PERIODS = {
  // PC Components
  cpu: { standard: 3, extended: 4, premium: 5 },
  motherboard: { standard: 3, extended: 4, premium: 5 },
  ram: { standard: 10, extended: 15, premium: 'lifetime' },
  ssd: { standard: 5, extended: 6, premium: 7 },
  hdd: { standard: 2, extended: 3, premium: 5 },
  psu: { standard: 5, extended: 7, premium: 10 },
  monitor: { standard: 3, extended: 4, premium: 5 },
  // Security Systems
  cctv_camera: { standard: 1, extended: 2, premium: 3 },
  nvr: { standard: 1, extended: 2, premium: 3 },
  dvr: { standard: 1, extended: 2, premium: 3 },
  default: { standard: 1, extended: 2, premium: 3 }
};

export const calculateWarrantyEndDate = (purchaseDate, category, warrantyType = 'standard', customRules = null) => {
  const rules = customRules || WARRANTY_PERIODS;
  const periodConfig = rules[category] || rules.default || { standard: 1, extended: 2, premium: 3 };
  let yearsToAdd = periodConfig[warrantyType];
  
  if (typeof yearsToAdd === 'string' && yearsToAdd.toLowerCase() === 'lifetime') {
    yearsToAdd = 25; // Lifetime treated as 25 years
  } else {
    yearsToAdd = parseInt(yearsToAdd) || 1;
  }
  
  const endDate = new Date(purchaseDate);
  endDate.setFullYear(endDate.getFullYear() + yearsToAdd);
  
  return endDate;
};

export const formatWarrantyRemaining = (endDate) => {
  const now = new Date();
  const end = new Date(endDate);
  const diff = end.getTime() - now.getTime();
  
  if (diff <= 0) {
    return { years: 0, months: 0, days: 0, hours: 0, minutes: 0, seconds: 0, isExpired: true };
  }
  
  const years = Math.floor(diff / (1000 * 60 * 60 * 24 * 365));
  const months = Math.floor((diff % (1000 * 60 * 60 * 24 * 365)) / (1000 * 60 * 60 * 24 * 30));
  const days = Math.floor((diff % (1000 * 60 * 60 * 24 * 30)) / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);
  
  return { years, months, days, hours, minutes, seconds, isExpired: false };
};

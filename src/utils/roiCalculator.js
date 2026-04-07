const SOLAR_SLABS = [
  {
    systemKw: 1,
    grossCostRange: [55000, 75000],
    subsidyAmount: 30000,
    monthlySavingRange: [800, 1200],
  },
  {
    systemKw: 2,
    grossCostRange: [110000, 150000],
    subsidyAmount: 60000,
    monthlySavingRange: [1800, 2500],
  },
  {
    systemKw: 3,
    grossCostRange: [165000, 225000],
    subsidyAmount: 78000,
    monthlySavingRange: [3000, 4500],
  },
  {
    systemKw: 5,
    grossCostRange: [275000, 375000],
    subsidyAmount: 78000,
    monthlySavingRange: [5500, 7500],
  },
  {
    systemKw: 10,
    grossCostRange: [550000, 750000],
    subsidyAmount: 78000,
    monthlySavingRange: [11000, 15000],
  },
];

export function calculatePmSuryaGharSubsidy(systemKw) {
  const normalizedKw = Math.max(0, Number(systemKw) || 0);
  if (normalizedKw <= 0) return 0;

  if (normalizedKw <= 2) {
    return Math.round(normalizedKw * 30000);
  }

  if (normalizedKw <= 3) {
    return Math.round(2 * 30000 + (normalizedKw - 2) * 18000);
  }

  return 78000;
}

function pickSlabByBill(monthlyBill) {
  if (monthlyBill <= 1500) return SOLAR_SLABS[0];
  if (monthlyBill <= 3500) return SOLAR_SLABS[1];
  if (monthlyBill <= 6500) return SOLAR_SLABS[2];
  if (monthlyBill <= 10000) return SOLAR_SLABS[3];
  return SOLAR_SLABS[4];
}

function compoundFactor(years, annualTariffIncrease) {
  let factor = 0;
  for (let year = 0; year < years; year += 1) {
    factor += Math.pow(1 + annualTariffIncrease, year);
  }
  return factor;
}

function computePaybackYear(monthlySaving, netInvestment, years, annualTariffIncrease) {
  let cumulative = 0;
  for (let year = 1; year <= years; year += 1) {
    const yearlySaving = monthlySaving * 12 * Math.pow(1 + annualTariffIncrease, year - 1);
    cumulative += yearlySaving;
    if (cumulative >= netInvestment) {
      return year;
    }
  }
  return null;
}

export function calculateRoiProjection(
  monthlyBill,
  { years = 25, annualTariffIncrease = 0.05 } = {}
) {
  const normalizedBill = Math.max(0, Number(monthlyBill) || 0);
  const slab = pickSlabByBill(normalizedBill);
  const [grossCostMin, grossCostMax] = slab.grossCostRange;
  const subsidyAmount = calculatePmSuryaGharSubsidy(slab.systemKw);
  const netCostRange = [grossCostMin - subsidyAmount, grossCostMax - subsidyAmount];
  const [monthlySavingMin, monthlySavingMax] = slab.monthlySavingRange;
  const factor = compoundFactor(years, annualTariffIncrease);
  const totalSavingsRange = [
    Math.round(monthlySavingMin * 12 * factor),
    Math.round(monthlySavingMax * 12 * factor),
  ];

  const paybackYearRange = [
    computePaybackYear(monthlySavingMin, netCostRange[1], years, annualTariffIncrease),
    computePaybackYear(monthlySavingMax, netCostRange[0], years, annualTariffIncrease),
  ];

  return {
    systemKw: slab.systemKw,
    subsidyAmount,
    grossCostRange: [Math.round(grossCostMin), Math.round(grossCostMax)],
    netCostRange: [Math.round(netCostRange[0]), Math.round(netCostRange[1])],
    monthlySavingRange: [Math.round(monthlySavingMin), Math.round(monthlySavingMax)],
    totalSavingsRange,
    paybackYearRange,
  };
}

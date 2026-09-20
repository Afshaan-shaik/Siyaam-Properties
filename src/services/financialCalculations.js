/**
 * Financial Calculations Engine
 * Stamp duty, registration, legal clearances, loan amortization,
 * rental yield stress testing, and 10-year investment projections.
 */

export const TAX_CONSTANTS = {
  STAMP_DUTY_RATE: 0.056, // 5.6% in Karnataka for properties above 45L
  REGISTRATION_RATE: 0.010, // 1%
  CESS_SURCHARGE_RATE: 0.001, // 0.1% approx
  LEGAL_DUE_DILIGENCE_ESTIMATE: 35000,
  DUBAI_DLD_FEE_RATE: 0.040, // 4% DLD in Dubai, 0% capital gains / income tax
};

export function calculateTotalAcquisitionCost(basePrice, interiorBudgetPercent = 8) {
  const numericBase = Number(basePrice) || 0;
  const stampDuty = Math.round(numericBase * TAX_CONSTANTS.STAMP_DUTY_RATE);
  const registration = Math.round(numericBase * TAX_CONSTANTS.REGISTRATION_RATE);
  const cess = Math.round(numericBase * TAX_CONSTANTS.CESS_SURCHARGE_RATE);
  const legalClearance = TAX_CONSTANTS.LEGAL_DUE_DILIGENCE_ESTIMATE;
  const interiorFitout = Math.round(numericBase * (interiorBudgetPercent / 100));
  const total = numericBase + stampDuty + registration + cess + legalClearance + interiorFitout;

  return {
    basePrice: numericBase,
    stampDuty,
    registration,
    cess,
    legalClearance,
    interiorFitout,
    totalAcquisitionCost: total,
    governmentFeesTotal: stampDuty + registration + cess
  };
}

export function calculateEMI(principal, annualRatePercent = 8.5, tenureYears = 20) {
  const monthlyRate = (annualRatePercent / 12) / 100;
  const totalMonths = tenureYears * 12;
  
  if (monthlyRate === 0) return principal / totalMonths;

  const emi = (principal * monthlyRate * Math.pow(1 + monthlyRate, totalMonths)) / 
              (Math.pow(1 + monthlyRate, totalMonths) - 1);
  
  const totalPayment = emi * totalMonths;
  const totalInterest = totalPayment - principal;

  return {
    monthlyEMI: Math.round(emi),
    totalPayment: Math.round(totalPayment),
    totalInterest: Math.round(totalInterest),
    principal,
    annualRatePercent,
    tenureYears
  };
}

export function calculateInvestmentProjection(basePrice, cagrPercent = 9.5, rentalYieldPercent = 4.2, years = 10) {
  const numericBase = Number(basePrice) || 0;
  const projection = [];
  let currentVal = numericBase;
  let cumulativeRental = 0;

  for (let y = 1; y <= years; y++) {
    const annualRental = currentVal * (rentalYieldPercent / 100);
    cumulativeRental += annualRental;
    currentVal = currentVal * (1 + cagrPercent / 100);

    projection.push({
      year: y,
      propertyValue: Math.round(currentVal),
      annualRental: Math.round(annualRental),
      cumulativeRental: Math.round(cumulativeRental),
      totalReturn: Math.round((currentVal - numericBase) + cumulativeRental),
      netROI: (((currentVal - numericBase + cumulativeRental) / numericBase) * 100).toFixed(1)
    });
  }

  return {
    initialPrice: numericBase,
    cagrPercent,
    rentalYieldPercent,
    finalValue: Math.round(currentVal),
    totalGain: Math.round(currentVal - numericBase + cumulativeRental),
    projection
  };
}

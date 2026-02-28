import { personalTaxBrackets2024 } from '../../config/tax-brackets';

export interface IndividualTaxResult {
  grossProfit: number;
  ptkp: number;
  taxableIncome: number;
  taxAmount: number;
  netCash: number;
  effectiveRate: number;
}

export function calculateIndividualTax(
  grossProfit: number,
  ptkpAmount: number
): IndividualTaxResult {
  const taxableIncome = Math.max(0, grossProfit - ptkpAmount);
  
  let remainingTaxable = taxableIncome;
  let taxAmount = 0;

  for (const bracket of personalTaxBrackets2024) {
    if (remainingTaxable <= 0) break;

    const bracketSize = bracket.max - bracket.min;
    const amountInBracket = Math.min(remainingTaxable, bracketSize);

    taxAmount += amountInBracket * bracket.rate;
    remainingTaxable -= amountInBracket;
  }

  const netCash = grossProfit - taxAmount;
  const effectiveRate = grossProfit > 0 ? (taxAmount / grossProfit) * 100 : 0;

  return {
    grossProfit,
    ptkp: ptkpAmount,
    taxableIncome,
    taxAmount,
    netCash,
    effectiveRate
  };
}

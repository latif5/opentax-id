import { CORPORATE_BASE_RATE, DIVIDEND_WITHHOLDING_RATE } from '../../config/corporate-rates';
import { calculateIndividualTax } from './calculate-individual';

export interface CorporateTaxResult {
  grossProfit: number;
  directorSalary: number;
  corporateProfit: number;
  corporateTax: number;
  personalTaxOnSalary: number;
  dividendAmount: number;
  dividendTax: number;
  netCash: number;
  effectiveRate: number;
}

export function calculateCorporateTax(
  grossProfit: number,
  directorSalary: number,
  ptkpAmount: number,
  distributeDividends: boolean = true
): CorporateTaxResult {
  // Director Salary is an expense for the company
  const corporateProfit = Math.max(0, grossProfit - directorSalary);
  
  // Assuming standard 22% rate for simplicity. Can be extended to 0.5% UMKM rule later if requested.
  const corporateTax = corporateProfit * CORPORATE_BASE_RATE;
  
  const personalTaxResult = calculateIndividualTax(directorSalary, ptkpAmount);
  const personalTaxOnSalary = personalTaxResult.taxAmount;

  let dividendAmount = 0;
  let dividendTax = 0;

  if (distributeDividends) {
    dividendAmount = corporateProfit - corporateTax;
    dividendTax = dividendAmount * DIVIDEND_WITHHOLDING_RATE;
  }

  const totalTax = corporateTax + personalTaxOnSalary + dividendTax;
  const netCash = grossProfit - totalTax;
  const effectiveRate = grossProfit > 0 ? (totalTax / grossProfit) * 100 : 0;

  return {
    grossProfit,
    directorSalary,
    corporateProfit,
    corporateTax,
    personalTaxOnSalary,
    dividendAmount,
    dividendTax,
    netCash,
    effectiveRate
  };
}

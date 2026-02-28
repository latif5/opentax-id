import { calculateIndividualTax, IndividualTaxResult } from './calculate-individual';
import { calculateCorporateTax, CorporateTaxResult } from './calculate-corporate';

export interface ComparisonResult {
  individual: IndividualTaxResult;
  corporate: CorporateTaxResult;
  recommendation: 'INDIVIDUAL' | 'CORPORATE';
  savings: number;
}

export function compareTaxScenarios(
  grossProfit: number,
  directorSalary: number,
  ptkpAmount: number
): ComparisonResult {
  const individual = calculateIndividualTax(grossProfit, ptkpAmount);
  const corporate = calculateCorporateTax(grossProfit, directorSalary, ptkpAmount);

  const savings = Math.abs(individual.netCash - corporate.netCash);
  const recommendation = individual.netCash >= corporate.netCash ? 'INDIVIDUAL' : 'CORPORATE';

  return {
    individual,
    corporate,
    recommendation,
    savings
  };
}

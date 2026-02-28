import { expect, test, describe } from "bun:test";
import { calculateIndividualTax } from "./calculate-individual";
import { calculateCorporateTax } from "./calculate-corporate";
import { PTKP_BASE } from "../../config/ptkp";

describe("Tax Calculations", () => {
  test("Individual Tax (Nil)", () => {
    const res = calculateIndividualTax(50000000, PTKP_BASE); // 50m < 54m ptkp
    expect(res.taxAmount).toBe(0);
    expect(res.taxableIncome).toBe(0);
  });

  test("Individual Tax (Bracket 1)", () => {
    const res = calculateIndividualTax(100000000, PTKP_BASE); 
    // Taxable = 100m - 54m = 46m 
    // 5% of 46m = 2.3m
    expect(res.taxableIncome).toBe(46000000);
    expect(res.taxAmount).toBe(2300000);
  });

  test("Corporate Tax", () => {
    const res = calculateCorporateTax(200000000, 50000000, PTKP_BASE, true);
    // Corp Profit = 200m - 50m = 150m
    // Corp Tax = 22% of 150m = 33m
    expect(res.corporateTax).toBe(33000000);
    expect(res.corporateProfit).toBe(150000000);
  });
});

"use client";

import { useState, useMemo } from 'react';
import { Star, UserCircle, Briefcase, AlertTriangle } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { PTKP_OPTIONS } from '@/config/ptkp';
import { compareTaxScenarios } from '@/lib/tax/compare';
import { formatRupiah } from '@/lib/utils';
import { Separator } from '@/components/ui/separator';

export default function CalculatorPage() {
  const [grossProfitStr, setGrossProfitStr] = useState<string>('150000000');
  const [directorSalaryStr, setDirectorSalaryStr] = useState<string>('60000000');
  const [ptkp, setPtkp] = useState<number>(PTKP_OPTIONS[0].amount);

  const grossProfit = parseInt(grossProfitStr.replace(/\D/g, '') || '0', 10);
  const directorSalary = parseInt(directorSalaryStr.replace(/\D/g, '') || '0', 10);

  const handleProfitChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.replace(/\D/g, '');
    setGrossProfitStr(val);
  };

  const handleSalaryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.replace(/\D/g, '');
    setDirectorSalaryStr(val);
  };

  const result = useMemo(() => {
    return compareTaxScenarios(grossProfit, directorSalary, ptkp);
  }, [grossProfit, directorSalary, ptkp]);

  const { individual, corporate, recommendation, savings } = result;

  return (
    <div className="max-w-6xl mx-auto pt-32 pb-24 px-6 md:px-8 space-y-16 hero-gradient relative">
      <div className="absolute top-1/2 left-0 -translate-y-1/2 -translate-x-1/2 w-96 h-96 bg-brand-100 rounded-full blur-3xl opacity-50 -z-10 animate-pulse"></div>
      <div className="absolute top-0 right-0 translate-x-1/3 -translate-y-1/3 w-[500px] h-[500px] bg-sand-100 rounded-full blur-3xl opacity-40 -z-10 animate-pulse"></div>
      
      <div className="text-center space-y-6 animate-up">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-50 border border-brand-100 text-brand-700 text-xs tracking-wide uppercase font-medium mb-4">
          <span className="w-1.5 h-1.5 rounded-full bg-brand-500"></span>
          Transparan & Jujur
        </div>
        <h1 className="font-serif text-5xl md:text-7xl tracking-tight text-brand-900 leading-[1.1] font-medium">
          Perbandingan Pajak <br />
          <i className="italic text-brand-600">Pribadi vs Badan</i>
        </h1>
        <p className="text-lg md:text-xl text-brand-700/80 max-w-2xl mx-auto leading-relaxed font-light mt-4">
          Bandingkan beban pajak Orang Pribadi (Usaha Sendiri) dengan Badan Usaha (PT/CV) secara instan.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start animate-up delay-100 relative z-10">
        {/* Input Panel */}
        <div className="md:col-span-4 bg-white p-8 rounded-3xl shadow-xl shadow-brand-200/40 border border-sand-100">
          <div className="mb-6">
            <h3 className="font-serif text-2xl text-brand-900 font-medium">Profil Keuangan</h3>
            <p className="text-sm text-brand-600/80 font-light mt-1">Masukkan estimasi usaha dalam setahun.</p>
          </div>
          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="profit" className="text-brand-800 font-medium text-sm">Laba Bersih Setahun (Rp)</Label>
              <div className="relative">
                <span className="absolute left-4 top-3 text-brand-400 font-bold">Rp</span>
                <Input 
                  id="profit" 
                  value={new Intl.NumberFormat('id-ID').format(grossProfit)} 
                  onChange={handleProfitChange} 
                  className="pl-12 py-6 rounded-xl border-brand-200 focus:border-brand-500 focus:ring-brand-500/20 bg-sand-50 text-brand-900 font-semibold text-lg"
                />
              </div>
              <p className="text-xs text-brand-600/70">Target keuntungan bersih sebelum pajak.</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="salary" className="text-brand-800 font-medium text-sm">Gaji Direktur per Tahun (Rp)</Label>
              <div className="relative">
                <span className="absolute left-4 top-3 text-brand-400 font-bold">Rp</span>
                <Input 
                  id="salary" 
                  value={new Intl.NumberFormat('id-ID').format(directorSalary)} 
                  onChange={handleSalaryChange} 
                  className="pl-12 py-6 rounded-xl border-brand-200 focus:border-brand-500 focus:ring-brand-500/20 bg-sand-50 text-brand-900 font-semibold text-lg"
                />
              </div>
              <p className="text-xs text-brand-600/70">Hanya berlaku untuk skema Badan.</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="ptkp" className="text-brand-800 font-medium text-sm">Status PTKP</Label>
              <Select value={ptkp.toString()} onValueChange={(v) => setPtkp(parseInt(v))}>
                <SelectTrigger id="ptkp" className="w-full py-6 rounded-xl border-brand-200 focus:border-brand-500 bg-sand-50 text-brand-900 relative">
                  <SelectValue placeholder="Pilih status perkawinan" />
                </SelectTrigger>
                <SelectContent className="bg-white border-brand-200 rounded-xl">
                  {PTKP_OPTIONS.map((opt) => (
                    <SelectItem key={opt.value} value={opt.amount.toString()} className="focus:bg-brand-50 focus:text-brand-900 cursor-pointer">
                      {opt.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Results Panel */}
        <div className="md:col-span-8 space-y-6">
          <div className="bg-brand-800 text-white rounded-3xl p-8 shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 p-12 bg-white/5 rounded-bl-full w-48 h-48 opacity-50 blur-xl"></div>
            <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-6">
              <div>
                <h3 className="font-serif text-3xl font-medium mb-2">Rekomendasi Terbaik</h3>
                <p className="text-brand-200/80 text-sm font-light">Beban pajak paling efisien untuk profil Anda.</p>
              </div>
              <div className="px-6 py-3 bg-white text-brand-900 font-bold text-xl rounded-2xl shadow-md uppercase tracking-wide">
                {recommendation === 'INDIVIDUAL' ? 'Orang Pribadi' : 'Badan (PT/CV)'}
              </div>
            </div>
            
            <div className="relative z-10 mt-6 pt-6 border-t border-brand-700/50">
              <p className="text-lg font-light flex flex-col md:flex-row items-start md:items-center gap-2">
                Efisiensi biaya pajak sebesar 
                <span className="text-white font-bold text-2xl px-3 py-1 bg-brand-600/40 border border-brand-500 rounded-xl overflow-hidden relative group">
                  <span className="absolute inset-0 w-full h-full -rotate-45 scale-150 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] bg-linear-to-r from-transparent via-white/10 to-transparent"></span>
                  {formatRupiah(savings)}
                </span>
                per tahun.
              </p>
            </div>
          </div>

          {/* Comparison Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Orang Pribadi */}
            <div className={`relative flex flex-col p-8 rounded-3xl bg-white transition-all duration-300 ${recommendation === 'INDIVIDUAL' ? 'ring-2 ring-brand-500 shadow-xl shadow-brand-500/20' : 'border border-sand-100 shadow-sm'}`}>
              {recommendation === 'INDIVIDUAL' && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-brand-800 text-white px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider shadow-md whitespace-nowrap z-10">
                  <span className="flex items-center gap-1">
                    <Star className="w-3.5 h-3.5 fill-current" /> Optimal
                  </span>
                </div>
              )}
              
              <div className="mb-6">
                <div className="w-12 h-12 rounded-full bg-brand-50 flex items-center justify-center text-brand-700 mb-4">
                  <UserCircle className="w-6 h-6" />
                </div>
                <h4 className="font-serif text-2xl text-brand-900 font-medium tracking-tight">Pribadi</h4>
                <p className="text-sm text-brand-600 font-light mt-1">Sederhana & Langsung</p>
              </div>

              <div className="space-y-4 text-sm font-medium flex-1">
                <div className="flex justify-between items-center text-brand-800">
                  <span className="text-brand-600">Laba Bersih</span>
                  <span>{formatRupiah(individual.grossProfit)}</span>
                </div>
                <div className="flex justify-between items-center text-red-700/80">
                  <span>PTKP (Pengurang)</span>
                  <span>- {formatRupiah(individual.ptkp)}</span>
                </div>
                <div className="h-px bg-brand-100 w-full my-2"></div>
                <div className="flex justify-between items-center text-brand-800">
                  <span className="text-brand-600">PKP</span>
                  <span>{formatRupiah(individual.taxableIncome)}</span>
                </div>
                
                <div className="flex justify-between items-center pt-2 text-brand-900">
                  <span className="font-semibold flex items-center gap-1 text-red-700">
                    <AlertTriangle className="w-4 h-4" /> Beban Pajak
                  </span>
                  <span className="font-bold">- {formatRupiah(individual.taxAmount)}</span>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-brand-100 flex flex-col gap-1">
                <div className="flex justify-between items-center text-lg">
                  <span className="text-brand-600 text-sm">Kas Bersih</span>
                  <span className="font-bold text-brand-900">{formatRupiah(individual.netCash)}</span>
                </div>
                <p className="text-xs text-brand-500 w-full text-right mt-1">Tarif Efektif: {individual.effectiveRate.toFixed(1)}%</p>
              </div>
            </div>

            {/* Badan */}
            <div className={`relative flex flex-col p-8 rounded-3xl bg-white transition-all duration-300 ${recommendation === 'CORPORATE' ? 'ring-2 ring-brand-500 shadow-xl shadow-brand-500/20' : 'border border-sand-100 shadow-sm'}`}>
              {recommendation === 'CORPORATE' && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-brand-800 text-white px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider shadow-md whitespace-nowrap z-10">
                  <span className="flex items-center gap-1">
                     <Star className="w-3.5 h-3.5 fill-current" /> Optimal
                  </span>
                </div>
              )}
              
              <div className="mb-6">
                 <div className="w-12 h-12 rounded-full bg-brand-50 flex items-center justify-center text-brand-700 mb-4">
                  <Briefcase className="w-6 h-6" />
                </div>
                <h4 className="font-serif text-2xl text-brand-900 font-medium tracking-tight">Badan</h4>
                <p className="text-sm text-brand-600 font-light mt-1">Manajemen Terstruktur</p>
              </div>

              <div className="space-y-4 text-sm font-medium flex-1">
                <div className="flex justify-between items-center text-brand-800">
                  <span className="text-brand-600">Laba Usaha (Kotor)</span>
                  <span>{formatRupiah(corporate.grossProfit)}</span>
                </div>
                <div className="flex justify-between items-center text-red-700/80">
                  <span>Gaji (Pengurang)</span>
                  <span>- {formatRupiah(corporate.directorSalary)}</span>
                </div>
                <div className="h-px bg-brand-100 w-full my-2"></div>
                <div className="flex justify-between items-center text-brand-800">
                  <span className="text-brand-600">Laba Badan</span>
                  <span>{formatRupiah(corporate.corporateProfit)}</span>
                </div>
                <div className="flex justify-between items-center text-red-700/80">
                  <span className="flex items-center gap-1">Pajak Badan</span>
                  <span>- {formatRupiah(corporate.corporateTax)}</span>
                </div>
                <div className="flex justify-between items-center text-red-700/80">
                  <span className="flex items-center gap-1">Pajak Gaji</span>
                  <span>- {formatRupiah(corporate.personalTaxOnSalary)}</span>
                </div>
                <div className="flex justify-between items-center text-red-700/80">
                  <span className="flex items-center gap-1">Pajak Dividen</span>
                  <span>- {formatRupiah(corporate.dividendTax)}</span>
                </div>
                <div className="flex justify-between items-center pt-2 text-brand-900 border-t border-brand-100/50">
                  <span className="font-semibold flex items-center gap-1 text-red-700">
                    <AlertTriangle className="w-4 h-4" /> Beban Pajak
                  </span>
                  <span className="font-bold">
                    - {formatRupiah(corporate.corporateTax + corporate.personalTaxOnSalary + corporate.dividendTax)}
                  </span>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-brand-100 flex flex-col gap-1">
                <div className="flex justify-between items-center text-lg">
                  <span className="text-brand-600 text-sm">Kas Total</span>
                  <span className="font-bold text-brand-900">{formatRupiah(corporate.netCash)}</span>
                </div>
                <p className="text-xs text-brand-500 w-full text-right mt-1">Tarif Efektif: {corporate.effectiveRate.toFixed(1)}%</p>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

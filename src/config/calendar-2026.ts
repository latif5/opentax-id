export interface TaxDeadline {
  id: string;
  date: string;
  title: string;
  month: string;
  type: 'bulanan' | 'tahunan' | 'info';
  target: string[];
  description: string;
}

export const taxCalendar2026: TaxDeadline[] = [
  {
    id: '1',
    date: 'Setiap tanggal 15',
    title: 'Batas Penyetoran PPh',
    month: 'Setiap Bulan',
    type: 'bulanan',
    target: ['Pemotong PPh 21', 'PPh 22', 'PPh 23', 'PPh 4 ayat 2'],
    description: 'Penyetoran berbagai jenis PPh pemotongan/pemungutan bulan sebelumnya.'
  },
  {
    id: '2',
    date: 'Setiap tanggal 20',
    title: 'Batas Pelaporan SPT Masa',
    month: 'Setiap Bulan',
    type: 'bulanan',
    target: ['Wajib Pajak Pemotong'],
    description: 'Pelaporan SPT Masa PPh (Unifikasi/21) dan SPT Masa PPN bulan sebelumnya.'
  },
  {
    id: '3',
    date: '31 Maret 2026',
    title: 'SPT Tahunan Orang Pribadi',
    month: 'Maret',
    type: 'tahunan',
    target: ['Orang Pribadi'],
    description: 'Batas akhir penyampaian SPT Tahunan PPh Orang Pribadi tahun pajak 2025.'
  },
  {
    id: '4',
    date: '30 April 2026',
    title: 'Batas Lapor SPT Tahunan Badan',
    month: 'April',
    type: 'tahunan',
    target: ['Badan'],
    description: 'Batas pelaporan SPT Tahunan PPh Wajib Pajak Badan Tahun Pajak 2025.'
  }
];

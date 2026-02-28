import Link from 'next/link';
import { Calculator, CalendarDays, ShieldCheck } from 'lucide-react';

export default function HomePage() {
  return (
    <div className="max-w-6xl mx-auto pt-32 pb-24 px-6 md:px-8 space-y-16 hero-gradient relative">
      <div className="absolute top-1/2 left-0 -translate-y-1/2 -translate-x-1/2 w-96 h-96 bg-brand-100 rounded-full blur-3xl opacity-50 -z-10 animate-pulse"></div>
      <div className="absolute top-0 right-0 translate-x-1/3 -translate-y-1/3 w-[500px] h-[500px] bg-sand-100 rounded-full blur-3xl opacity-40 -z-10 animate-pulse"></div>
      
      <div className="text-center space-y-6 animate-up">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-50 border border-brand-100 text-brand-700 text-xs tracking-wide uppercase font-medium mb-4">
          <span className="w-1.5 h-1.5 rounded-full bg-brand-500"></span>
          Transparansi Perpajakan Indonesia
        </div>
        <h1 className="font-serif text-5xl md:text-7xl tracking-tight text-brand-900 leading-[1.1] font-medium">
          Hitung Pajak <br />
          <i className="italic text-brand-600">Lebih Menenangkan</i>
        </h1>
        <p className="text-lg md:text-xl text-brand-700/80 max-w-2xl mx-auto leading-relaxed font-light mt-4">
          PajakKu adalah proyek open-source edukasi untuk membantu Anda memahami estimasi beban pajak dan mengambil keputusan finansial yang lebih baik antara Orang Pribadi atau Badan Usaha.
        </p>
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mt-8 pt-4">
          <Link href="/calculator" className="px-8 py-4 bg-brand-800 text-white rounded-2xl font-medium hover:bg-brand-900 transition-colors shadow-lg shadow-brand-500/20 text-center w-full sm:w-auto">
            Coba Kalkulator Pajak
          </Link>
          <Link href="/calendar" className="px-8 py-4 bg-white text-brand-800 border border-brand-200 rounded-2xl font-medium hover:bg-brand-50 transition-colors text-center w-full sm:w-auto">
            Lihat Kalender Edukasi
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-32 animate-up delay-100">
        <div className="p-8 rounded-3xl bg-white border border-sand-100 shadow-sm hover:shadow-xl hover:shadow-brand-200/40 hover:-translate-y-1 transition-all duration-300">
          <div className="w-14 h-14 rounded-2xl bg-brand-50 flex items-center justify-center text-brand-600 mb-6 border border-brand-100">
            <Calculator className="w-7 h-7" />
          </div>
          <h3 className="font-serif text-2xl font-medium text-brand-900 mb-2">Simulasi Akurat</h3>
          <p className="text-brand-600/80 font-light leading-relaxed">
            Bandingkan beban pajak antara Orang Pribadi dan PT/CV secara instan berdasarkan target laba bersih dan status PTKP Anda.
          </p>
        </div>

        <div className="p-8 rounded-3xl bg-white border border-sand-100 shadow-sm hover:shadow-xl hover:shadow-brand-200/40 hover:-translate-y-1 transition-all duration-300">
          <div className="w-14 h-14 rounded-2xl bg-brand-50 flex items-center justify-center text-brand-600 mb-6 border border-brand-100">
            <CalendarDays className="w-7 h-7" />
          </div>
          <h3 className="font-serif text-2xl font-medium text-brand-900 mb-2">Kalender Kepatuhan</h3>
          <p className="text-brand-600/80 font-light leading-relaxed">
            Pantau jadwal penting pembayaran dan pelaporan SPT bulanan hingga tahunan agar Anda selalu patuh tepat waktu.
          </p>
        </div>

        <div className="p-8 rounded-3xl bg-white border border-sand-100 shadow-sm hover:shadow-xl hover:shadow-brand-200/40 hover:-translate-y-1 transition-all duration-300">
          <div className="w-14 h-14 rounded-2xl bg-brand-50 flex items-center justify-center text-brand-600 mb-6 border border-brand-100">
            <ShieldCheck className="w-7 h-7" />
          </div>
          <h3 className="font-serif text-2xl font-medium text-brand-900 mb-2">Adaptasi Lokal</h3>
          <p className="text-brand-600/80 font-light leading-relaxed">
            Meniru inspirasi dari opentaxation, versi ini disesuaikan sepenuhnya dengan peraturan UU HPP dan PPh terbaru di Indonesia.
          </p>
        </div>
      </div>
    </div>
  );
}

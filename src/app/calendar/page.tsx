"use client";

import { Info, CalendarPlus } from 'lucide-react';
import { taxCalendar2026, TaxDeadline } from '@/config/calendar-2026';
import { generateIcsContent } from '@/lib/tax/export-ics';

export default function CalendarPage() {
  return (
    <div className="max-w-6xl mx-auto pt-32 pb-24 px-6 md:px-8 space-y-16">
      
      <div className="text-center space-y-6 animate-up">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-50 border border-brand-100 text-brand-700 text-xs tracking-wide uppercase font-medium mb-4">
          <span className="w-1.5 h-1.5 rounded-full bg-brand-500"></span>
          Kalender Tepat Waktu
        </div>
        <h1 className="font-serif text-5xl md:text-6xl tracking-tight text-brand-900 leading-[1.1] font-medium">
          Jadwal Pajak <br />
          <i className="italic text-brand-600">Tahun 2026</i>
        </h1>
        <p className="text-lg md:text-xl text-brand-700/80 max-w-2xl mx-auto leading-relaxed font-light mt-4 mb-8">
          Panduan lengkap batas waktu pelaporan dan pembayaran pajak untuk Orang Pribadi dan Badan agar bisnis Anda tetap patuh dan tenang.
        </p>
        
        <button 
          onClick={() => {
            const icsData = generateIcsContent();
            const blob = new Blob([icsData], { type: 'text/calendar;charset=utf-8' });
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'kalender-pajak-2026.ics');
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
          }}
          className="inline-flex items-center gap-2 bg-brand-800 hover:bg-brand-900 text-white px-6 py-3 rounded-xl font-medium shadow-md shadow-brand-900/10 transition-all active:scale-95"
        >
          <CalendarPlus className="w-5 h-5" />
          Simpan ke Kalender
        </button>
      </div>

      <div className="grid grid-cols-1 gap-6 animate-up delay-100">
        {taxCalendar2026.map((event: TaxDeadline) => (
          <div key={`${event.month}-${event.date}`} className="bg-white p-6 rounded-3xl border border-sand-100 shadow-sm hover:shadow-xl hover:shadow-brand-200/40 hover:-translate-y-1 transition-all duration-300 flex flex-col group">
            <div className="flex items-start justify-between mb-6 border-b border-brand-100/50 pb-4">
              <div>
                <h3 className="font-serif text-xl font-medium text-brand-900">{event.title}</h3>
                <p className="text-brand-500 text-sm mt-1">{event.type}</p>
              </div>
              <div className="flex flex-col items-center justify-center bg-brand-50 px-4 py-3 min-w-20 shrink-0 rounded-2xl border border-brand-100 group-hover:bg-brand-600 group-hover:text-white transition-colors duration-300 text-center ml-4">
                <span className="text-xs font-medium uppercase tracking-widest opacity-80 mb-1">{event.month.substring(0, 3)}</span>
                <span className="text-base sm:text-lg font-bold leading-tight">{event.date}</span>
              </div>
            </div>
            
            <div className="space-y-4 flex-1">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-brand-400 mb-1">Target</p>
                <div className="flex flex-wrap gap-2">
                  {event.target.map(t => (
                    <span key={t} className="inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium bg-sand-100 text-brand-800">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
              
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-brand-400 mb-1">Keterangan</p>
                <p className="text-sm text-brand-700 leading-relaxed font-light">
                  {event.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-12 p-6 bg-brand-50 rounded-3xl border border-brand-100 flex items-center gap-4 max-w-3xl mx-auto">
        <div className="w-12 h-12 rounded-full bg-brand-100 flex items-center justify-center text-brand-600 shrink-0">
          <Info className="w-6 h-6" />
        </div>
        <div>
          <h4 className="font-medium text-brand-900">Catatan Penting</h4>
          <p className="text-sm text-brand-700 font-light mt-1">Jadwal bisa sewaktu-waktu berubah tergantung dari kebijakan Direktorat Jenderal Pajak (DJP). Selalu pantau informasi resmi Kemenkeu.</p>
        </div>
      </div>
    </div>
  );
}

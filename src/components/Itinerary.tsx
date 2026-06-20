import React from 'react';
import { Calendar, Clock, MapPin, ExternalLink } from 'lucide-react';
import { ToporIcon, MukutIcon, ShankhaPolaIcon } from './BengaliIcons';

export const Itinerary: React.FC = () => {
  return (
    <div className="space-y-8" id="itinerary-section">
      <div className="text-center">
        <span className="font-display text-xs tracking-wider text-amber-600 font-bold block mb-1">THE CELEBRATIONS</span>
        <h3 className="font-serif text-3xl text-red-950 font-extrabold flex items-center justify-center gap-2">
          📅 অনুষ্ঠানসূচী ও বিয়ের লগ্ন (Event Itinerary)
        </h3>
        <p className="text-xs text-stone-600 max-w-md mx-auto mt-1.5 leading-relaxed font-sans">
          শুভ বিবাহের পুণ্যলগ্নে আপনাদের সপরিবারে আমন্ত্রণ জানাই। নিচে অনুষ্ঠানের দিন ও নির্দিষ্ট মানচিত্রের হদিস দেওয়া রইল।
        </p>
      </div>

      {/* Timeline Grid */}
      <div className="max-w-4xl mx-auto relative border-l-2 border-dashed border-amber-800/30 pl-6 md:pl-10 ml-4 md:mx-auto space-y-12">
        
        {/* 1. Gaye Holud */}
        <div className="relative" id="itinerary-gaye-holud">
          {/* Decorative left point icon */}
          <div className="absolute -left-[39px] md:-left-[55px] top-1 bg-[#FDFBF7] p-1.5 rounded-full border-2 border-amber-600 shadow-sm shrink-0">
            <span className="text-lg">🥣</span>
          </div>
          
          <div className="bg-white border border-stone-200 p-5 rounded-3xl shadow-sm hover:shadow-md transition-shadow">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-2.5 border-b border-stone-100 pb-3 mb-4">
              <div>
                <span className="bg-amber-100 text-amber-950 text-[10px] uppercase font-bold px-3 py-1 rounded-full">
                  মঙ্গল সূচনা (Inaugural)
                </span>
                <h4 className="font-serif text-2xl text-red-950 font-bold mt-1.5 flex items-center gap-2">
                  গায়ে হলুদ (Gaye Holud)
                </h4>
              </div>
              <div className="flex items-center gap-2 text-stone-600 text-xs font-semibold">
                <Calendar className="h-4 w-4 text-amber-600 shrink-0" />
                <span>৯ই ডিসেম্বর ২০২৬ (9th December 2026)</span>
              </div>
            </div>

            <p className="text-sm text-stone-700 leading-relaxed max-w-2xl font-serif">
              হলুদের ছোঁয়ায় নতুন শুভযাত্রার সূচনা। বরের এবং কনের উভয় পক্ষেই আনন্দঘন পরিবেশে এই মাঙ্গলিক গায়ে হলুদ অনুষ্ঠান সম্পন্ন হবে।
            </p>
          </div>
        </div>

        {/* 2. Subho Bibhaho */}
        <div className="relative" id="itinerary-subho-bibhaho">
          {/* Decorative left point icon */}
          <div className="absolute -left-[39px] md:-left-[55px] top-1 bg-[#FDFBF7] p-1.5 rounded-full border-2 border-red-800 shadow-sm shrink-0 text-red-800">
            <ToporIcon className="h-6 w-6 md:h-7 md:w-7" />
          </div>

          <div className="bg-white border-2 border-red-900/10 p-5 rounded-3xl shadow-sm hover:shadow-md transition-shadow">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-2.5 border-b border-red-900/5 pb-3 mb-4">
              <div>
                <span className="bg-red-800 text-amber-50 text-[10px] uppercase font-bold px-3 py-1 rounded-full">
                  শুভ বিবাহ (Wedding Day)
                </span>
                <h4 className="font-serif text-2xl text-red-950 font-bold mt-1.5">
                   শুভ বিবাহ (Subho Bibhaho)
                </h4>
              </div>
              <div className="space-y-1 text-left md:text-right">
                <div className="flex items-center md:justify-end gap-2 text-stone-600 text-xs font-semibold">
                  <Calendar className="h-4 w-4 text-red-800" />
                  <span>৯ই ডিসেম্বর ২০২৬ (9th December 2026)</span>
                </div>
                <div className="flex items-center md:justify-end gap-2 text-red-900 text-xs font-bold">
                  <Clock className="h-4 w-4" />
                  <span>সন্ধ্যা ৭:০০ টা থেকে (7:00 PM onwards)</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="space-y-3">
                <p className="text-sm text-stone-700 leading-relaxed font-serif">
                  বাঁশি ও সানাইয়ের সুরে মালাবদল, শুভদৃষ্টি এবং অগ্নি সাক্ষী রেখে সাতপাকে বাঁধা পড়ার পুণ্যক্ষণ।
                </p>
                <div className="space-y-1.5 pt-2">
                  <span className="text-[10px] text-stone-500 uppercase font-bold block">বিবাহের ভেন্যু</span>
                  <div className="flex items-start gap-1.5 text-stone-900 text-sm font-semibold">
                    <MapPin className="h-4 w-4 mt-0.5 text-red-800 shrink-0" />
                    <span>পারুই প্যালেস, হাওড়া (Parui Palace, Howrah)</span>
                  </div>
                </div>
                <div className="pt-2">
                  <a
                    href="https://www.google.com/maps/search/?api=1&query=Parui+Palace,+Howrah"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs bg-red-800 hover:bg-red-900 text-white px-4 py-2 rounded-lg font-medium shadow-sm transition-transform active:scale-95 cursor-pointer"
                    id="open-map-btn-ranihati"
                  >
                    Open in Google Maps <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                </div>
              </div>

              {/* Map Iframe */}
              <div className="rounded-2xl overflow-hidden border border-stone-200 h-40 shadow-inner">
                <iframe
                  title="Parui Palace Howrah Map"
                  src="https://maps.google.com/maps?q=Parui%20Palace,%20Howrah&t=&z=13&ie=UTF8&iwloc=&output=embed"
                  className="w-full h-full border-0"
                  allowFullScreen
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </div>

        {/* 3. Reception */}
        <div className="relative" id="itinerary-reception">
          {/* Decorative left point icon */}
          <div className="absolute -left-[39px] md:-left-[55px] top-1 bg-[#FDFBF7] p-1.5 rounded-full border-2 border-amber-500 shadow-sm shrink-0 text-amber-600">
            <ShankhaPolaIcon className="h-6 w-6 md:h-7 md:w-7" />
          </div>

          <div className="bg-white border border-stone-200 p-5 rounded-3xl shadow-sm hover:shadow-md transition-shadow">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-2.5 border-b border-stone-100 pb-3 mb-4">
              <div>
                <span className="bg-amber-150 text-amber-950 text-[10px] uppercase font-bold px-3 py-1 bg-amber-100/50 rounded-full">
                  বৌভাত প্রীতিভোজ (Reception Party)
                </span>
                <h4 className="font-serif text-2xl text-red-950 font-bold mt-1.5">
                   বৌভাত ও রিসেপশন (Boubhaat & Reception)
                </h4>
              </div>
              <div className="space-y-1 text-left md:text-right">
                <div className="flex items-center md:justify-end gap-2 text-stone-600 text-xs font-semibold">
                  <Calendar className="h-4 w-4 text-amber-600" />
                  <span>১১ই ডিসেম্বর ২০২৬ (11th December 2026)</span>
                </div>
                <div className="flex items-center md:justify-end gap-2 text-stone-900 text-xs font-bold">
                  <Clock className="h-4 w-4 text-amber-600" />
                  <span>সন্ধ্যা ৭:০০ টা থেকে (7:00 PM onwards)</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="space-y-3">
                <p className="text-sm text-stone-700 leading-relaxed font-serif">
                   নতুন জীবনসাথীকে প্রীতিভোজের মাধ্যমে বরণ করে নেওয়া। আপনাদের সকলের প্রীতিপূর্ণ মিলন আকাঙ্ক্ষী।
                </p>
                <div className="space-y-1.5 pt-2">
                  <span className="text-[10px] text-stone-500 uppercase font-bold block">রিসেপশনের ভেন্যু</span>
                  <div className="flex items-start gap-1.5 text-stone-900 text-sm font-semibold">
                    <MapPin className="h-4 w-4 mt-0.5 text-amber-600 shrink-0" />
                    <span>মাঙ্গলিক, সিটি সেন্টার, দুর্গাপুর (Mangalik, City Centre, Durgapur)</span>
                  </div>
                </div>
                <div className="pt-2">
                  <a
                    href="https://www.google.com/maps/search/?api=1&query=Mangalik,+City+Centre,+Durgapur"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 rounded-lg font-medium shadow-sm transition-transform active:scale-95 cursor-pointer"
                    id="open-map-btn-mangalik"
                  >
                    Open in Google Maps <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                </div>
              </div>

              {/* Map Iframe */}
              <div className="rounded-2xl overflow-hidden border border-stone-200 h-40 shadow-inner">
                <iframe
                  title="Mangalik Durgapur Map"
                  src="https://maps.google.com/maps?q=Mangalik,%20City%20Centre,%20Durgapur&t=&z=13&ie=UTF8&iwloc=&output=embed"
                  className="w-full h-full border-0"
                  allowFullScreen
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

import React, { useState, useEffect } from 'react';
import { Rsvp, Blessing } from '../types';
import { submitRsvp, submitBlessing, listenToBlessings } from '../firebase';
import { Heart, Send, CheckCircle, Users } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// Seeding standard high-quality romantic/auspicious initial blessings to make the wall look elegant right away!
const DEFAULT_BLESSINGS: Blessing[] = [
  {
    id: "bless-seed-1",
    name: "নির্মল চ্যাটার্জী (কাকু)",
    message: "বিয়াস ও শুভ্রাংশুকে নতুন জীবনের অনেক অনেক শুভকামনা ও আশীবার্দ জানাই। জীবনের সুন্দর পথচলা চিরকাল প্রদীপ্ত হোক।",
    createdAt: "2026-06-15T10:00:00.000Z"
  },
  {
    id: "bless-seed-2",
    name: "রোহন ও প্রিয়া (বন্ধুরা)",
    message: "শুভ পরিণয়! তোদের এই নতুন ইনিংসে ভরপুর আনন্দ আর হাসি থাকুক! সবসময় হাসিখুশি থাকিস দোস্ত!",
    createdAt: "2026-06-16T15:30:00.000Z"
  },
  {
    id: "bless-seed-3",
    name: "মৌসুমী পিসি",
    message: "আশীর্বাদ করি তোদের এই নতুন বাঁধন যেন ভালোবাসার সুখ শান্তিতে চিরকাল অটুট থাকে। শুভ বিবাহ আজ!",
    createdAt: "2026-06-18T08:12:00.000Z"
  }
];

export const RsvpBlessings: React.FC = () => {
  // Blessings Form State
  const [blessingName, setBlessingName] = useState('');
  const [blessingMsg, setBlessingMsg] = useState('');
  const [blessingSuccess, setBlessingSuccess] = useState(false);
  const [blessingError, setBlessingError] = useState('');
  const [blessingSubmitting, setBlessingSubmitting] = useState(false);

  // Live Wall State
  const [blessings, setBlessings] = useState<Blessing[]>([]);

  useEffect(() => {
    // Sync blessings from Firestore
    const unsubscribe = listenToBlessings((dbBlessings) => {
      // Merge: Live blessings first, then predefined seeds
      setBlessings([...dbBlessings, ...DEFAULT_BLESSINGS]);
    });
    return () => unsubscribe();
  }, []);

  const handleBlessingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!blessingName.trim()) {
      setBlessingError('অনুগ্রহ করে আপনার নাম লিখুন।');
      return;
    }
    if (!blessingMsg.trim()) {
      setBlessingError('আপনার আশীবার্দ বার্তাটি লিখুন।');
      return;
    }

    setBlessingSubmitting(true);
    setBlessingError('');
    setBlessingSuccess(false);

    try {
      await submitBlessing({
        name: blessingName.trim(),
        message: blessingMsg.trim(),
        createdAt: new Date().toISOString()
      });
      setBlessingSuccess(true);
      setBlessingName('');
      setBlessingMsg('');
    } catch (err) {
      console.error(err);
      setBlessingError('আশীর্বাদ বার্তা পাঠাতে সমস্যা হয়েছে। আবার চেষ্টা করুন।');
    } finally {
      setBlessingSubmitting(false);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 px-1.5 md:px-0">
      
      {/* RSVP Board (4 cols on lg) */}
      <div className="lg:col-span-5 bg-stone-50 border-2 border-amber-800/20 p-2 sm:p-6 rounded-3xl shadow-sm h-fit" id="rsvp-section-board">
        <div className="text-center mb-4">
          <span className="font-display text-[10px] tracking-wider text-amber-600 font-bold block mb-1">WILL YOU ATTEND?</span>
        </div>
        
        <div className="w-full flex justify-center overflow-hidden rounded-xl">
          <iframe 
            src="https://docs.google.com/forms/d/e/1FAIpQLSfOTkFIVnoRCAHc5r8wN_TCzEjCIkmYYAuIZhgl_e2KFTF9gQ/viewform?embedded=true" 
            width="100%" 
            frameBorder="0" 
            marginHeight={0} 
            marginWidth={0}
            className="max-w-[640px] w-full min-h-[1200px] sm:min-h-[900px] md:min-h-[800px]"
          >
            Loading…
          </iframe>
        </div>
      </div>

      {/* Greetings Portal (7 cols on lg) */}
      <div className="lg:col-span-7 space-y-6">
        
        {/* Blessings Submit Card */}
        <div className="bg-stone-50 border-2 border-amber-800/20 p-6 rounded-3xl shadow-sm" id="blessing-submission-card">
          <div className="text-center mb-5">
            <span className="font-display text-[10px] tracking-wider text-amber-600 font-bold block mb-1 font-sans">SEND YOUR BEST WISHES</span>
            <h3 className="font-serif text-2xl text-red-950 font-bold mb-1">
               আশীর্বাদ বার্তা প্রেরণ (Send Your Blessings)
            </h3>
            <p className="text-xs text-stone-600 max-w-lg mx-auto font-sans leading-relaxed">
               যেসব সুহৃদ আত্মীয় বা বন্ধুরা বিবাহবাসরে উপস্থিত থাকতে পারছেন না, তারা এখানে তাদের আন্তরিক ভালোবাসামাখা আশীর্বাদ ও বাণী লিখে পাঠাতে পারেন।
            </p>
          </div>

          {blessingSuccess ? (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-emerald-50 border border-emerald-200/50 rounded-2xl p-5 text-center space-y-2.5"
              id="blessing-success-msg"
            >
              <div className="inline-flex items-center justify-center text-emerald-850 p-1">
                <Heart className="h-6 w-6 text-red-650 fill-current animate-pulse" />
              </div>
              <h4 className="font-serif text-base font-bold text-stone-900">আশীর্বাদটি হৃদয়ে স্থান পেলো!</h4>
              <p className="text-xs text-stone-700">
                আপনার স্নেহের বাণীটি আমাদের লাইভ ব্লেসিংস দেওয়ালে ভেসে উঠেছে।
              </p>
              <button 
                onClick={() => setBlessingSuccess(false)}
                className="text-xs text-red-800 font-bold hover:underline"
                type="button"
              >
                আরেকটি বার্তা পাঠান
              </button>
            </motion.div>
          ) : (
            <form onSubmit={handleBlessingSubmit} className="space-y-4">
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1" htmlFor="bless-author">আপনার নাম (Your Name) *</label>
                  <input
                    id="bless-author"
                    type="text"
                    required
                    value={blessingName}
                    onChange={(e) => setBlessingName(e.target.value)}
                    placeholder="নাম..."
                    className="w-full text-xs font-sans rounded-lg border border-stone-300 px-3 py-2 bg-white text-stone-900 focus:outline-none focus:border-red-800"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1" htmlFor="bless-msg-content">আশীর্বাদ বার্তা (Blessings & Wishes) *</label>
                  <textarea
                    id="bless-msg-content"
                    rows={3}
                    required
                    value={blessingMsg}
                    onChange={(e) => setBlessingMsg(e.target.value)}
                    placeholder="আপনার আন্তরিক শুভেচ্ছা ও আশীর্বাদ বাণীটি লিখুন..."
                    className="w-full text-xs font-sans rounded-lg border border-stone-300 px-3 py-2 bg-white text-stone-900 focus:outline-none focus:border-red-800 resize-none"
                  />
                </div>
              </div>

              {blessingError && <p className="text-xs text-red-700 text-center">{blessingError}</p>}

              <div className="text-right">
                <button
                  type="submit"
                  disabled={blessingSubmitting}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 bg-red-800 hover:bg-red-900 text-white font-serif text-xs px-6 py-2.5 rounded-lg font-bold transition-all shadow-md active:scale-95 cursor-pointer"
                  id="blessing-submit-btn"
                >
                  {blessingSubmitting ? (
                    <>
                      <span className="animate-spin h-3.5 w-3.5 border-2 border-white rounded-full border-t-transparent" />
                      <span>পাঠানো হচ্ছে...</span>
                    </>
                  ) : (
                    <>
                      <Send className="h-3.5 w-3.5" />
                      <span>শুভেচ্ছা বাণী পাঠান (Send Wish)</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>

        {/* Live Blessings Wall with scrollable elegant cards */}
        <div className="space-y-3" id="live-blessings-wall-section">
          <div className="flex items-center gap-2 border-b border-stone-200 pb-2">
            <Heart className="h-4 w-4 text-red-700 fill-current shrink-0" />
            <h4 className="font-serif text-lg font-bold text-stone-950">
               শুভেচ্ছা দেওয়াল (Live Blessings Wall)
            </h4>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-h-[350px] overflow-y-auto pr-1.5 scrollbar-thin scrollbar-thumb-amber-800/10 hover:scrollbar-thumb-amber-800/20">
            {blessings.map((bless, idx) => (
              <div 
                key={bless.id || idx}
                className="bg-amber-50/40 border border-amber-800/10 p-4 rounded-2xl relative flex flex-col justify-between hover:bg-amber-100/30 transition-colors shadow-sm"
                id={`wish-post-${idx}`}
              >
                <div className="space-y-2">
                  <p className="font-serif text-xs leading-relaxed text-stone-800 italic">
                    "{bless.message}"
                  </p>
                </div>
                <div className="mt-3 pt-2.5 border-t border-amber-800/5 flex items-center justify-between">
                  <span className="text-[11px] font-bold text-red-950 font-serif">
                     — {bless.name}
                  </span>
                  <span className="text-[9px] text-stone-500 font-sans">
                     ❤ আশীবাদ
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
};

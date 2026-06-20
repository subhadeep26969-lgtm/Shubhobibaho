import React, { useState, useEffect } from 'react';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export const CountdownTimer: React.FC = () => {
  const targetDate = new Date('2026-12-09T19:00:00'); // 9th Dec 2026, 7:00 PM
  const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(null);

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date();
      const difference = targetDate.getTime() - now.getTime();

      if (difference <= 0) {
        setTimeLeft(null);
        return;
      }

      setTimeLeft({
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60)
      });
    };

    calculateTimeLeft();
    const interval = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(interval);
  }, []);

  if (!timeLeft) {
    return (
      <div className="text-center py-4">
        <span className="font-serif text-xl font-bold text-red-950 block">🎉 শুভ বিবাহ সুসম্পন্ন হয়েছে 🎉</span>
        <span className="text-xs text-amber-900 mt-1 block">The wedding celebration is happily completed!</span>
      </div>
    );
  }

  // Helper to convert English digits to Bengali numerals
  const toBengaliNumerals = (num: number): string => {
    const bengaliDigits = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
    const padded = num.toString().padStart(2, '0');
    return padded.split('').map(digit => {
      const parsed = parseInt(digit, 10);
      return isNaN(parsed) ? digit : bengaliDigits[parsed];
    }).join('');
  };

  return (
    <div className="flex justify-center items-center gap-3 md:gap-4 my-6">
      {/* Days */}
      <div className="flex flex-col items-center">
        <div className="bg-red-800 text-amber-50 h-16 w-16 md:h-20 md:w-20 rounded-2xl flex flex-col justify-center items-center shadow-md border border-amber-500/30">
          <span className="font-serif text-2xl md:text-3xl font-extrabold tracking-tight">
            {toBengaliNumerals(timeLeft.days)}
          </span>
          <span className="text-[10px] md:text-xs text-amber-300 font-sans tracking-wide">দিন (Days)</span>
        </div>
      </div>

      {/* Colon */}
      <span className="text-red-800 text-2xl font-serif font-bold animate-pulse">:</span>

      {/* Hours */}
      <div className="flex flex-col items-center">
        <div className="bg-red-800 text-amber-50 h-16 w-16 md:h-20 md:w-20 rounded-2xl flex flex-col justify-center items-center shadow-md border border-amber-500/30">
          <span className="font-serif text-2xl md:text-3xl font-extrabold tracking-tight">
            {toBengaliNumerals(timeLeft.hours)}
          </span>
          <span className="text-[10px] md:text-xs text-amber-300 font-sans tracking-wide">ঘণ্টা (Hrs)</span>
        </div>
      </div>

      {/* Colon */}
      <span className="text-red-800 text-2xl font-serif font-bold animate-pulse">:</span>

      {/* Minutes */}
      <div className="flex flex-col items-center">
        <div className="bg-red-800 text-amber-50 h-16 w-16 md:h-20 md:w-20 rounded-2xl flex flex-col justify-center items-center shadow-md border border-amber-500/30">
          <span className="font-serif text-2xl md:text-3xl font-extrabold tracking-tight">
            {toBengaliNumerals(timeLeft.minutes)}
          </span>
          <span className="text-[10px] md:text-xs text-amber-300 font-sans tracking-wide">মিনিট (Mins)</span>
        </div>
      </div>

      {/* Colon */}
      <span className="text-red-800 text-2xl font-serif font-bold animate-pulse">:</span>

      {/* Seconds */}
      <div className="flex flex-col items-center">
        <div className="bg-red-950 text-amber-50 h-16 w-16 md:h-20 md:w-20 rounded-2xl flex flex-col justify-center items-center shadow-md border border-amber-500/30">
          <span className="font-serif text-2xl md:text-3xl font-extrabold tracking-tight">
            {toBengaliNumerals(timeLeft.seconds)}
          </span>
          <span className="text-[10px] md:text-xs text-amber-300 font-sans tracking-wide">সেকেন্ড (Secs)</span>
        </div>
      </div>
    </div>
  );
};

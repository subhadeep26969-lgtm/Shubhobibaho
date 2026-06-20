import React, { useState } from 'react';
import { Riddle } from '../types';
import { HelpCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const RIDDLES: Riddle[] = [
  {
    id: 1,
    question: "সোনার কেল্লা কোথায় লুকিয়ে রয়েছে, যার খোঁজে লালমোহন বাবু আর ফেলুদা মরুভূমির বুকে টো টো করে ঘুরলেন?",
    hint: "মরুরাজ্য রাজস্থানের একটি ঐতিহাসিক শহর এবং দুর্গ।",
    answer: "জয়সলমীর (Jaisalmer)"
  },
  {
    id: 2,
    question: "ফেলুদার প্রিয় সিগারেট ব্র্যান্ড কোনটি, যার ধোঁয়া উশখুশ মগজাস্ত্রকে শান্ত করে?",
    hint: "হায়দ্রাবাদের একটি বিখ্যাত চার-স্তম্ভ বিশিষ্ট স্মৃতিসৌধের নামে এর নাম।",
    answer: "চারমিনার (Charminar)"
  },
  {
    id: 3,
    question: "তোপসে আর ফেলুদার সাথে জটায়ু (লালমোহন বাবু)-র প্রথম সাক্ষাৎ কোন উপন্যাসের গল্পে ঘটেছিল?",
    hint: "এটিই প্রথম উপন্যাস যা নিয়ে সত্যজিৎ রায় রাজস্থানের মরুভূমিতে শুটিং করেছিলেন।",
    answer: "সোনার কেল্লা (Sonar Kella)"
  },
  {
    id: 4,
    question: "ফেলুদার গোয়েন্দা মগজাস্ত্রের গুরু যাকে তিনি মনে করেন, লন্ডনের বেকের স্ট্রিটের সেই কাল্পনিক সত্যসন্ধানী মানুষটির নাম কী?",
    hint: "স্যার আর্থার কোনান ডয়েলের বিশ্বখ্যাত গোয়েন্দা সৃষ্টি যিনি বেহালা বাজাতেন।",
    answer: "শার্লক হোমস (Sherlock Holmes)"
  },
  {
    id: 5,
    question: "ফেলুদা কাহিনীর রহস্য রোমাঞ্চ ঔপন্যাসিক লালমোহন বাবুর ছদ্মনামটি কী, যা দিয়ে তিনি রোমহর্ষক বই লিখতেন?",
    hint: "রামায়ণের একটি মহাকাব্যিক দানব-পাখির নাম যিনি সীতাকে বাঁচাতে প্রাণ দিয়েছিলেন।",
    answer: "জটায়ু (Jatayu)"
  },
  {
    id: 6,
    question: "ফেলুদা এবং তোপসে কলকাতায় যাতায়াত বা কেস সলভের জন্য লালমোহন বাবুর একটি বিশেষ কালারের কোন গাড়িটি ব্যবহার করতেন?",
    hint: "আটের দশকের ঐতিহ্যবাহী কলকাতার একটি ক্লাসিক চার-চাকার মডেল ও সবুজ রঙ।",
    answer: "সবুজ অ্যাম্বাসেডর (Green Ambassador)"
  }
];

export const FeludaRiddles: React.FC = () => {
  const [revealed, setRevealed] = useState<{ [key: number]: boolean }>({});
  const [userGuess, setUserGuess] = useState<{ [key: number]: string }>({});
  const [checked, setChecked] = useState<{ [key: number]: boolean }>({});

  const toggleReveal = (id: number) => {
    setRevealed(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const checkGuess = (id: number, answer: string) => {
    setChecked(prev => ({ ...prev, [id]: true }));
    setRevealed(prev => ({ ...prev, [id]: true }));
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h3 className="font-serif text-2xl text-red-900 flex items-center justify-center gap-2">
          🕵️‍♂️ ফেলুদার ধাঁধা (Feluda's Riddles)
        </h3>
        <p className="text-sm text-amber-900 mt-1 font-sans">
          মগজাস্ত্রের ব্যায়াম! ফেলুদা কাহিনীর উপর নির্ভর করে ৬টি সহজ ধাঁধার উত্তর দিন।
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {RIDDLES.map((riddle) => {
          const isRevealed = revealed[riddle.id] || false;
          const guess = userGuess[riddle.id] || "";
          const isChecked = checked[riddle.id] || false;

          return (
            <div 
              key={riddle.id} 
              className="bg-stone-50 border-2 border-amber-800/20 p-5 rounded-xl shadow-sm hover:shadow-md transition-shadow relative flex flex-col justify-between"
              id={`riddle-card-${riddle.id}`}
            >
              <div>
                <div className="flex items-center gap-2 text-red-800 font-serif font-bold text-lg mb-2">
                  <span>ধাঁধা #০{riddle.id}</span>
                </div>
                <p className="text-stone-800 font-serif leading-relaxed mb-4 text-base min-h-[4.5rem]">
                  "{riddle.question}"
                </p>

                <div className="mb-4">
                  <label className="block text-xs font-semibold text-stone-600 mb-1">আপনার উত্তর লিখুন:</label>
                  <input 
                    type="text" 
                    value={guess}
                    onChange={(e) => setUserGuess(prev => ({ ...prev, [riddle.id]: e.target.value }))}
                    placeholder="উত্তরের ধারণা..."
                    className="w-full text-sm bg-white border border-stone-300 rounded px-2 py-1.5 focus:outline-none focus:border-red-800 text-stone-900"
                    id={`riddle-input-${riddle.id}`}
                  />
                </div>
              </div>

              <div>
                {/* Expandable Hint Section */}
                <div className="mb-3 p-2 bg-amber-50/50 rounded border border-amber-100 flex items-start gap-1.5 text-xs text-amber-900">
                  <HelpCircle className="h-3.5 w-3.5 mt-0.5 text-amber-700 shrink-0" />
                  <span><strong>ইঙ্গিত (Hint):</strong> {riddle.hint}</span>
                </div>

                <div className="flex gap-2">
                  <button 
                    onClick={() => checkGuess(riddle.id, riddle.answer)}
                    className="flex-1 bg-red-800 text-white rounded text-xs py-2 font-medium hover:bg-red-900 transition-colors"
                    id={`riddle-btn-check-${riddle.id}`}
                    type="button"
                  >
                    উত্তর মেলান
                  </button>
                  <button 
                    onClick={() => toggleReveal(riddle.id)}
                    className="bg-amber-100 text-amber-900 border border-amber-200 rounded text-xs px-3 py-2 font-medium hover:bg-amber-200 transition-colors"
                    id={`riddle-btn-toggle-${riddle.id}`}
                    type="button"
                  >
                    {isRevealed ? "লুকিয়ে রাখুন" : "উত্তর দেখুন"}
                  </button>
                </div>

                <AnimatePresence>
                  {isRevealed && (
                    <motion.div 
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="mt-3 pt-3 border-t border-dashed border-stone-300"
                    >
                      <p className="text-xs text-stone-500 font-semibold">সঠিক উত্তর:</p>
                      <p className="text-sm font-serif font-bold text-emerald-800 bg-emerald-50 px-2 py-1.5 rounded mt-1">
                        {riddle.answer}
                      </p>
                      {guess && (
                        <p className="text-[11px] text-stone-600 mt-1 italic">
                          আপনার অনুমিত উত্তর: "{guess}"
                        </p>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

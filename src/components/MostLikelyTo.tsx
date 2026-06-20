import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Sparkles, CheckCircle } from 'lucide-react';

interface Question {
  id: number;
  bengali: string;
  english: string;
  seedBride: number;
  seedGroom: number;
}

const MOST_LIKELY_QUESTIONS: Question[] = [
  {
    id: 1,
    bengali: "নিজের জিনিসপত্র হারিয়ে ফেলে বা সহজে ভুলে যায়?",
    english: "Lose their stuff / forgets things?",
    seedBride: 42,
    seedGroom: 68
  },
  {
    id: 2,
    bengali: "গরম রসগোল্লা পরিবেশন করা হচ্ছে কিনা দেখতে স্টেজ ছেড়ে পালিয়ে যাবে?",
    english: "Abandon couple stage to check if the hot rosogollas are being served?",
    seedBride: 74,
    seedGroom: 51
  },
  {
    id: 3,
    bengali: "বিয়ের অদ্ভূত অসময় বা গভীর লগ্নের চোটে স্টেজে বসেই ঘুমিয়ে পড়বে?",
    english: "Fall asleep due to this odd logno timings?",
    seedBride: 53,
    seedGroom: 82
  },
  {
    id: 4,
    bengali: "কোন আত্মীয় কী উপহার দিলো তা নিয়ে পরবর্তীতে ময়নাতদন্ত বা চুলচেরা বিশ্লেষণ করবে?",
    english: "Do post mortem of which relative gave what gift?",
    seedBride: 88,
    seedGroom: 39
  }
];

export const MostLikelyTo: React.FC = () => {
  const [votes, setVotes] = useState<{ [key: number]: 'bride' | 'groom' }>({});
  const [extraVotes, setExtraVotes] = useState<{ [key: number]: { bride: number; groom: number } }>({});

  useEffect(() => {
    // Load existing personal votes from localStorage
    const savedVotes = localStorage.getItem('wedding_most_likely_votes');
    if (savedVotes) {
      try {
        setVotes(JSON.parse(savedVotes));
      } catch (e) {
        console.error("Error reading votes", e);
      }
    }

    // Load any incremental vote counters so user action persists
    const savedExtra = localStorage.getItem('wedding_most_likely_extra');
    if (savedExtra) {
      try {
        setExtraVotes(JSON.parse(savedExtra));
      } catch (e) {
        console.error("Error reading extras", e);
      }
    }
  }, []);

  const handleVote = (qId: number, target: 'bride' | 'groom') => {
    if (votes[qId]) return; // Single vote per question
    
    const newVotes = { ...votes, [qId]: target };
    setVotes(newVotes);
    localStorage.setItem('wedding_most_likely_votes', JSON.stringify(newVotes));

    const currentExtra = extraVotes[qId] || { bride: 0, groom: 0 };
    const newExtra = {
      ...extraVotes,
      [qId]: {
        ...currentExtra,
        [target]: currentExtra[target] + 1
      }
    };
    setExtraVotes(newExtra);
    localStorage.setItem('wedding_most_likely_extra', JSON.stringify(newExtra));
  };

  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      <div className="text-center mb-6">
        <h3 className="font-serif text-2xl text-red-950 flex items-center justify-center gap-2">
          🗳️ কে বেশি সম্ভাব্য? (Who is Most Likely To?)
        </h3>
        <p className="text-xs text-stone-600 mt-1 font-sans">
          বিয়াস ও শুভ্রাংশুর মধ্যে কে কোন বিষয়ে এগিয়ে? অতিথিদের লাইভ মতামত ও ভোট জোন!
        </p>
      </div>

      <div className="space-y-5">
        {MOST_LIKELY_QUESTIONS.map((q) => {
          const userVote = votes[q.id];
          const hasVoted = !!userVote;
          
          // Calculate total counts including dynamic user actions
          const extraB = extraVotes[q.id]?.bride || 0;
          const extraG = extraVotes[q.id]?.groom || 0;
          const totalBride = q.seedBride + extraB;
          const totalGroom = q.seedGroom + extraG;
          const grandTotal = totalBride + totalGroom;
          
          const bridePercent = Math.round((totalBride / grandTotal) * 100);
          const groomPercent = 100 - bridePercent;

          return (
            <div 
              key={q.id} 
              className="bg-stone-50 border-2 border-amber-800/10 p-5 rounded-2xl shadow-sm transition-all hover:bg-white hover:shadow-md"
              id={`most-likely-card-${q.id}`}
            >
              <div className="mb-3 text-center md:text-left">
                <span className="text-[10px] uppercase tracking-wide font-bold text-amber-600 bg-amber-100/50 px-2.5 py-1 rounded-full mb-2 inline-block">
                  মজার ভোট ০{q.id}
                </span>
                <h4 className="font-serif text-base md:text-lg text-red-955 font-bold leading-snug">
                  {q.bengali}
                </h4>
                <p className="text-xs text-stone-500 italic mt-0.5 font-sans">
                  ({q.english})
                </p>
              </div>

              {!hasVoted ? (
                <div className="grid grid-cols-2 gap-3.5 mt-4">
                  <button
                    onClick={() => handleVote(q.id, 'bride')}
                    className="p-3 bg-red-50 hover:bg-red-100 hover:border-red-400 active:scale-95 transition-all text-red-950 border border-red-200 rounded-xl text-center cursor-pointer flex flex-col items-center justify-center gap-1 group"
                    id={`vote-bride-btn-${q.id}`}
                    type="button"
                  >
                    <span className="text-xl group-hover:scale-110 transition-transform">👰</span>
                    <span className="font-serif font-bold text-xs select-none">বিয়াস (Bride)</span>
                  </button>

                  <button
                    onClick={() => handleVote(q.id, 'groom')}
                    className="p-3 bg-amber-50 hover:bg-amber-100 hover:border-amber-400 active:scale-95 transition-all text-amber-950 border border-amber-200 rounded-xl text-center cursor-pointer flex flex-col items-center justify-center gap-1 group"
                    id={`vote-groom-btn-${q.id}`}
                    type="button"
                  >
                    <span className="text-xl group-hover:scale-110 transition-transform">🤵</span>
                    <span className="font-serif font-bold text-xs select-none">শুভ্রাংশু (Groom)</span>
                  </button>
                </div>
              ) : (
                <div className="mt-4 space-y-3">
                  {/* Results bars */}
                  <div className="space-y-1.5">
                    {/* Progress Track */}
                    <div className="w-full h-8 bg-stone-200 rounded-xl overflow-hidden flex relative items-center justify-between text-xs font-bold text-white shadow-inner">
                      {/* Bride bar */}
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${bridePercent}%` }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                        className="bg-gradient-to-r from-red-600 to-red-800 h-full flex items-center pl-3 gap-1 relative z-10"
                      >
                        <span className="text-white drop-shadow-[0_1px_1px_rgba(0,0,0,0.5)] flex items-center gap-1">
                          👰 বিয়াস {bridePercent}% 
                          {userVote === 'bride' && <Sparkles className="h-3 w-3 fill-current text-yellow-300 inline" />}
                        </span>
                      </motion.div>

                      {/* Groom bar */}
                      <div className="absolute right-0 top-0 h-full bg-amber-500 rounded-r-xl flex items-center pr-3 justify-end text-white text-right font-bold" style={{ width: `${groomPercent}%` }}>
                        <span className="drop-shadow-[0_1px_1px_rgba(0,0,0,0.4)] flex items-center gap-1 select-none">
                          {userVote === 'groom' && <Sparkles className="h-3 w-3 fill-current text-yellow-100 inline" />}
                          শুভ্রাংশু {groomPercent}% 🤵
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 justify-center text-[10px] text-emerald-800 font-bold bg-emerald-50 py-1 px-3 rounded-full w-max mx-auto border border-emerald-100">
                    <CheckCircle className="h-3 w-3" />
                    <span>আপনার মূল্যবান ভোটটি জমা নেওয়া হয়েছে! মোট মতামত: {grandTotal}</span>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

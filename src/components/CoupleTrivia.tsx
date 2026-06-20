import React, { useState } from 'react';
import { TriviaQuestion } from '../types';
import { CheckCircle2, XCircle, RotateCcw, Award } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const QUESTIONS: TriviaQuestion[] = [
  {
    id: 1,
    question: "কনের প্রিয় শখের জিনিস কোনটি? (What is the bride's favourite hobby?)",
    options: ["ছবি আঁকা (Painting)", "গান করা (Singing)", "বই পড়া (Reading books)", "রান্না করা (Cooking)"],
    correctIndex: 0,
    explanation: "কনে বিয়াস অবসর পেলেই ক্যানভাস আর জলরং দিয়ে ছবি আঁকতে ভালোবাসেন।"
  },
  {
    id: 2,
    question: "রংমিলন্তি এই মিষ্টি জুটির প্রথম কোথায় দেখা হয়েছিল? (Where did they first meet?)",
    options: ["কফি হাউসে (Coffee House)", "কলেজ ক্যাম্পাসে (College Campus)", "কলকাতা বইমেলায় (Book Fair)", "বন্ধুর জন্মদিনের পার্টিতে (At a friend's birthday party)"],
    correctIndex: 1,
    explanation: "কলেজ ক্যাম্পাসের প্রথম আলাপ থেকেই তাদের মধুর বন্ধুত্বের শুভ সূচনা হয়েছিল!"
  },
  {
    id: 3,
    question: "বরের প্রিয় মিষ্টি কোনটি? (What is the groom's favourite sweet?)",
    options: ["রসগোল্লা (Rosogolla)", "সন্দেশ (Sandesh)", "মিষ্টি দই (Mishti Doi)", "ল্যাংচা (Lengcha)"],
    correctIndex: 0,
    explanation: "বাঙালি বর শুভ্রাংশুর কাছে গরম মিষ্টি সাদা রসগোল্লার চেয়ে প্রিয় আর কিছু হতেই পারে না!"
  },
  {
    id: 4,
    question: "রিসেপশন মেনুতে বরের পছন্দের সবচেয়ে স্পেশাল পদ কোনটি? (What is the groom's favourite dish in reception?)",
    options: ["সর্ষে ইলিশ (Sorshe Ilish)", "চিংড়ির মালাইকারি (Chingri Malaikari)", "মাটন বিরিয়ানি (Mutton Biryani)", "কচি পাঁঠার ঝোল (Mutton Curry)"],
    correctIndex: 2,
    explanation: "বিরিয়ানি ছাড়া শুভ্রাংশুর যেকোনো ভোজ বা উৎসবই অসম্পূর্ণ!"
  },
  {
    id: 5,
    question: "হানিমুনের জন্য কনের প্রথম পছন্দের সেরা জায়গাটি কোনটি? (What is the bride's dream honeymoon destination?)",
    options: ["দার্জিলিং (Darjeeling)", "কাশ্মীর (Kashmir)", "থাইল্যান্ড (Thailand)", "কেরালা (Kerala)"],
    correctIndex: 1,
    explanation: "বিয়াস চিরকাল বরফের স্বর্গরাজ্য কাশ্মীরে বেড়াতে যাওয়ার স্বপ্ন দেখেন।"
  }
];

export const CoupleTrivia: React.FC = () => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedOpt, setSelectedOpt] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [isAnswered, setIsAnswered] = useState(false);
  const [quizFinished, setQuizFinished] = useState(false);

  const handleOptionClick = (idx: number) => {
    if (isAnswered) return;
    setSelectedOpt(idx);
    setIsAnswered(true);
    if (idx === QUESTIONS[currentIdx].correctIndex) {
      setScore(prev => prev + 1);
    }
  };

  const handleNext = () => {
    if (currentIdx < QUESTIONS.length - 1) {
      setCurrentIdx(prev => prev + 1);
      setSelectedOpt(null);
      setIsAnswered(false);
    } else {
      setQuizFinished(true);
    }
  };

  const handleReset = () => {
    setCurrentIdx(0);
    setSelectedOpt(null);
    setScore(0);
    setIsAnswered(false);
    setQuizFinished(false);
  };

  return (
    <div className="max-w-xl mx-auto bg-stone-50 border-2 border-amber-800/20 p-6 rounded-2xl shadow-sm relative overflow-hidden">
      <div className="absolute top-0 right-0 bg-amber-100 text-amber-900 text-[10px] px-3 py-1 font-bold rounded-bl-lg uppercase tracking-wider">
        কুইজ জোন (Trivia)
      </div>

      <AnimatePresence mode="wait">
        {!quizFinished ? (
          <motion.div
            key={currentIdx}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-4"
          >
            <div className="flex items-center justify-between text-xs text-amber-900 font-medium">
              <span>প্রশ্ন {currentIdx + 1} / {QUESTIONS.length}</span>
              <span>স্কোর: {score}</span>
            </div>

            {/* Progress Bar */}
            <div className="w-full h-1.5 bg-stone-200 rounded-full overflow-hidden">
              <div 
                className="h-full bg-red-800 transition-all duration-300" 
                style={{ width: `${((currentIdx + 1) / QUESTIONS.length) * 100}%` }}
              />
            </div>

            <h4 className="font-serif text-lg text-stone-950 font-bold leading-snug mt-2">
              {QUESTIONS[currentIdx].question}
            </h4>

            <div className="grid gap-2.5 mt-4">
              {QUESTIONS[currentIdx].options.map((opt, idx) => {
                const isSelected = selectedOpt === idx;
                const isCorrect = idx === QUESTIONS[currentIdx].correctIndex;
                const showSuccess = isAnswered && isCorrect;
                const showDanger = isAnswered && isSelected && !isCorrect;

                let btnStyles = "border border-stone-200 bg-white hover:bg-stone-100 text-stone-800";
                if (showSuccess) btnStyles = "border-emerald-500 bg-emerald-50 text-emerald-900 font-semibold";
                else if (showDanger) btnStyles = "border-red-500 bg-red-50 text-red-900 font-semibold";
                else if (isSelected) btnStyles = "border-red-800 bg-red-50/50 text-red-900 font-semibold";

                return (
                  <button
                    key={idx}
                    onClick={() => handleOptionClick(idx)}
                    disabled={isAnswered}
                    className={`w-full text-left p-3.5 rounded-xl text-sm transition-all duration-200 flex items-center justify-between ${btnStyles}`}
                    id={`opt-btn-${currentIdx}-${idx}`}
                    type="button"
                  >
                    <span>{opt}</span>
                    {isAnswered && (
                      <span className="shrink-0 ml-2">
                        {isCorrect && <CheckCircle2 className="h-5 w-5 text-emerald-600" />}
                        {isSelected && !isCorrect && <XCircle className="h-5 w-5 text-red-600" />}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            {isAnswered && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-4 p-3.5 bg-amber-50 border border-amber-200/60 rounded-xl"
              >
                <p className="text-xs text-amber-950 leading-relaxed">
                  <strong className="text-red-900">জানেন কি?</strong> {QUESTIONS[currentIdx].explanation}
                </p>
                <div className="text-right mt-3">
                  <button
                    onClick={handleNext}
                    className="bg-red-800 hover:bg-red-900 text-white font-serif text-sm px-5 py-2 rounded-lg font-medium transition-colors"
                    id="trivia-next-btn"
                    type="button"
                  >
                    {currentIdx < QUESTIONS.length - 1 ? "পরবর্তী প্রশ্ন →" : "ফলাফল দেখুন 🏆"}
                  </button>
                </div>
              </motion.div>
            )}
          </motion.div>
        ) : (
          <motion.div
            key="result"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-6 space-y-4"
          >
            <div className="inline-flex items-center justify-center bg-amber-100 p-4 rounded-full text-amber-800 mb-2">
              <Award className="h-10 w-10 animate-bounce" />
            </div>
            
            <h4 className="font-serif text-2xl text-red-950 font-bold">অভিনন্দন! (Congratulations)</h4>
            
            <p className="text-stone-700 max-w-sm mx-auto text-sm leading-relaxed">
              আপনি কুইজে <strong>{QUESTIONS.length}</strong> এর মধ্যে <strong>{score}</strong> স্কোর করেছেন!
            </p>

            <div className="py-2.5 px-4 bg-amber-50 border border-amber-100 rounded-full inline-block">
              <span className="text-sm font-semibold text-amber-950">
                {score === QUESTIONS.length ? "🌟 আপনি বর-কনেকে ভীষণ ভালোভাবে চেনেন!" : 
                 score >= 3 ? "😊 আপনি বেশ ভালোই চেনেন তাদের!" : 
                 "👋 বিয়েবাড়ি এসে আরও মেলামেশা করুন!"}
              </span>
            </div>

            <div className="pt-4">
              <button
                onClick={handleReset}
                className="inline-flex items-center gap-1.5 bg-red-800 hover:bg-red-900 text-white text-xs font-serif px-5 py-2.5 rounded-lg transition-colors font-medium cursor-pointer"
                id="reset-trivia-btn"
                type="button"
              >
                <RotateCcw className="h-3.5 w-3.5" /> আবার খেলুন
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

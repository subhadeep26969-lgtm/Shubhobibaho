import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { HeartPulse, Stethoscope, Clipboard, CheckSquare, Square, ThumbsUp } from 'lucide-react';

interface ResultSlip {
  diagnosis: string;
  prescription: string;
  recoveryChance: string;
}

export const DoctorQuiz: React.FC = () => {
  // Storing answers to Question 1
  const [q1Answer, setQ1Answer] = useState<number | null>(null);
  
  // Storing answers/selection to Question 2 (Checkbox multi-select)
  const [q2Selections, setQ2Selections] = useState<{ [key: number]: boolean }>({
    0: false,
    1: false,
    2: false,
    3: false
  });

  const [diagnosticResult, setDiagnosticResult] = useState<ResultSlip | null>(null);

  const q1Options = [
    "The Bride—she’s already psychoanalyzed everyone's outfit.",
    "The Groom—he’s just observing the \"herd behavior\" at the buffet line.",
    "Both—they are currently taking notes on the Mashi who is crying too loudly.",
    "Neither—they are off-duty and pretending to be normal."
  ];

  const q2Options = [
    {
      title: "Acute Wedding-Planner Syndrome",
      desc: "A dangerous condition characterized by obsession with color palettes and floor plans."
    },
    {
      title: "The Buffet Reflex",
      desc: "A hyper-alert state triggered by the smell of hot Mutton Kosha."
    },
    {
      title: "Performance Anxiety",
      desc: "Fear of the Bengali 'Saat Paak' turning into an unexpected marathon."
    },
    {
      title: "Terminal Exhaustion",
      desc: "The inevitable, comatose state of any medical intern after a 24-hour ward shift."
    }
  ];

  const toggleQ2Selection = (idx: number) => {
    if (diagnosticResult) return; // Locked once calculated
    setQ2Selections(prev => ({
      ...prev,
      [idx]: !prev[idx]
    }));
  };

  const calculateDiagnosis = () => {
    if (q1Answer === null) return;

    let diagnosisText = "";
    let rxText = "";
    let rateText = "99.9% (High chances with food)";

    const matchesCount = Object.values(q2Selections).filter(Boolean).length;

    // Custom witty combinations based on answers
    if (q1Answer === 2) {
      diagnosisText = "Highly Contagious Clinical Wedding-Sight Disorder (Mashi-Observation Variant)";
      rxText = "Take 2 doses of hot Rosogollas and stay 10 feet away from crying aunts.";
    } else if (q1Answer === 0) {
      diagnosisText = "Acute Couture Psychoanalysis Syndrome";
      rxText = "Prescribed to avoid looking in mirrors or inspecting silk thread counts for 48 hours.";
    } else if (q1Answer === 1) {
      diagnosisText = "Buffet-Line Herd Behavioral Congestion";
      rxText = "Double dosage of Basanti Pulao and Mutton Kosha strictly taken with medical friends.";
    } else {
      diagnosisText = "Off-Duty Camouflage Reflex (Mild Denial Stage)";
      rxText = "Accept your Doctor identity immediately, then consume 3 pieces of Fish Fry.";
    }

    if (matchesCount >= 3) {
      diagnosisText += " with Multi-Symptom Academic Burnout";
      rxText += " Strictly no on-call bleepers allowed during reception hours!";
      rateText = "45% (Subject to availability of hot coffee)";
    } else if (matchesCount === 0) {
      diagnosisText += " (Asymptomatic Grooming)";
      rxText += " Keep smiling at the camera and nodding.";
    }

    setDiagnosticResult({
      diagnosis: diagnosisText,
      prescription: rxText,
      recoveryChance: rateText
    });
  };

  const handleReset = () => {
    setQ1Answer(null);
    setQ2Selections({ 0: false, 1: false, 2: false, 3: false });
    setDiagnosticResult(null);
  };

  return (
    <div className="max-w-2xl mx-auto bg-[#FDFBF7] border-2 border-red-900/10 p-6 rounded-3xl shadow-sm relative overflow-hidden">
      
      {/* Upper header with stethoscope brand */}
      <div className="flex items-center gap-3 border-b border-red-900/5 pb-4 mb-6">
        <div className="bg-red-100 p-2.5 rounded-full text-red-800 shrink-0">
          <Stethoscope className="h-6 w-6" />
        </div>
        <div>
          <h3 className="font-serif text-xl text-red-950 font-bold flex items-center gap-1.5">
            🩺 ডাক্তার বন্ধুদের বিশেষ কুইজ (Doctor Friends Quiz)
          </h3>
          <p className="text-[11px] text-stone-500 font-sans tracking-wide">
            Designed exclusively for the couple's medical batch mates and savior squad!
          </p>
        </div>
      </div>

      <div className="space-y-6">
        {/* Question 1 */}
        <div className="space-y-3">
          <h4 className="font-serif text-sm md:text-base text-red-950 font-bold flex items-start gap-1.5">
            <span className="bg-red-900 text-white text-[10px] uppercase font-bold px-2 py-0.5 rounded-md mt-0.5">Q1</span>
            <span>Which one of the couple is more likely to accidentally diagnose a guest at the wedding reception?</span>
          </h4>
          
          <div className="grid gap-2.5 pl-0 md:pl-6">
            {q1Options.map((opt, idx) => {
              const isSelected = q1Answer === idx;
              return (
                <button
                  key={idx}
                  onClick={() => !diagnosticResult && setQ1Answer(idx)}
                  disabled={!!diagnosticResult}
                  className={`w-full text-left p-3 rounded-xl text-xs sm:text-sm border transition-all flex items-center gap-3 ${
                    isSelected 
                      ? 'border-red-800 bg-red-50 text-red-900 font-semibold shadow-xs' 
                      : 'border-stone-200 bg-white hover:bg-stone-50 text-stone-700'
                  }`}
                  id={`doc-q1-opt-${idx}`}
                  type="button"
                >
                  <div className={`h-4.5 w-4.5 rounded-full border flex items-center justify-center shrink-0 ${
                    isSelected ? 'border-red-800 text-red-800 bg-white' : 'border-stone-300'
                  }`}>
                    {isSelected && <div className="h-2 w-2 rounded-full bg-red-800" />}
                  </div>
                  <span>{opt}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Question 2 */}
        <div className="space-y-3 pt-2">
          <h4 className="font-serif text-sm md:text-base text-red-950 font-bold flex items-start gap-1.5">
            <span className="bg-red-800 text-white text-[10px] uppercase font-bold px-2 py-0.5 rounded-md mt-0.5">Q2</span>
            <span>The "Wedding Day Diagnosis" (Select all that apply to you):</span>
          </h4>
          
          <div className="grid gap-2.5 pl-0 md:pl-6">
            {q2Options.map((opt, idx) => {
              const isSelected = q2Selections[idx];
              return (
                <button
                  key={idx}
                  onClick={() => toggleQ2Selection(idx)}
                  disabled={!!diagnosticResult}
                  className={`w-full text-left p-3.5 rounded-xl border transition-all flex items-start gap-3 ${
                    isSelected 
                      ? 'border-red-800 bg-red-50 text-red-900 shadow-xs' 
                      : 'border-stone-200 bg-white hover:bg-stone-50 text-stone-700'
                  }`}
                  id={`doc-q2-opt-${idx}`}
                  type="button"
                >
                  <div className="mt-0.5 shrink-0 text-red-800">
                    {isSelected ? <CheckSquare className="h-4.5 w-4.5" /> : <Square className="h-4.5 w-4.5 text-stone-400" />}
                  </div>
                  <div>
                    <p className="text-xs sm:text-sm font-bold text-stone-900">{opt.title}</p>
                    <p className="text-[11px] text-stone-500 mt-0.5 leading-normal">{opt.desc}</p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Action Button */}
        {!diagnosticResult ? (
          <div className="pt-4 text-center">
            <button
              onClick={calculateDiagnosis}
              disabled={q1Answer === null}
              className={`font-serif px-8 py-3 rounded-full font-bold text-sm transition-all inline-flex items-center gap-2 shadow-md ${
                q1Answer !== null
                  ? 'bg-red-800 hover:bg-red-900 text-white cursor-pointer active:scale-95'
                  : 'bg-stone-200 text-stone-400 cursor-not-allowed'
              }`}
              id="doc-diagnose-btn"
              type="button"
            >
              <HeartPulse className="h-4 w-4" />
              <span>রোগ নির্ণয় করুন (Generate Diagnosis & Rx)</span>
            </button>
          </div>
        ) : (
          <AnimatePresence>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="mt-6 border-2 border-dashed border-red-800/30 bg-amber-50/20 rounded-2xl p-5 relative overflow-hidden shadow-inner"
            >
              {/* Presciption Watermark watermark */}
              <div className="absolute right-4 bottom-4 text-red-900/5 select-none text-9xl font-serif font-black pointer-events-none">
                Rx
              </div>

              <div className="flex justify-between items-start border-b border-stone-300 pb-3 mb-4">
                <div className="flex items-center gap-2 text-red-900 font-bold">
                  <Clipboard className="h-5 w-5" />
                  <span className="font-serif tracking-widest uppercase text-xs">PRESCRIPTION SLIP</span>
                </div>
                <div className="text-[10px] text-stone-500 font-mono">
                  DATE: {new Date().toLocaleDateString()}
                </div>
              </div>

              <div className="space-y-4 font-serif">
                <div>
                  <span className="text-[10px] uppercase font-bold text-amber-800 block">PROBABLE DIAGNOSIS / রোগাক্রান্ত বিবরণ:</span>
                  <p className="text-stone-900 font-bold text-base mt-0.5">
                    {diagnosticResult.diagnosis}
                  </p>
                </div>

                <div>
                  <span className="text-[10px] uppercase font-bold text-amber-800 block">RECOMMENDED TREATMENT / ব্যবস্থাপত্র:</span>
                  <p className="text-stone-850 font-sans italic text-sm mt-0.5 leading-relaxed bg-white border border-stone-200 p-2.5 rounded-lg">
                    "{diagnosticResult.prescription}"
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 pt-2 border-t border-stone-200 text-xs">
                  <div>
                    <span className="text-[10px] font-sans font-semibold text-stone-500 block uppercase">PROGNOSIS (RECOVERY RATE)</span>
                    <span className="font-sans font-extrabold text-emerald-800 text-sm">{diagnosticResult.recoveryChance}</span>
                  </div>
                  
                  <button
                    onClick={handleReset}
                    className="bg-stone-200 hover:bg-stone-300 transition-colors text-stone-800 px-4 py-1.5 rounded-lg text-[11px] font-bold inline-flex items-center gap-1 cursor-pointer"
                    id="doc-reset-btn"
                    type="button"
                  >
                    <ThumbsUp className="h-3 w-3" />
                    <span>আইনসম্মত ডিসচার্জ (Discharge & Retry)</span>
                  </button>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        )}
      </div>
    </div>
  );
};

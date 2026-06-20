import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { 
  Heart, 
  MapPin, 
  Calendar, 
  Image as ImageIcon, 
  Smile, 
  Gift, 
  ChevronDown
} from 'lucide-react';
import { CountdownTimer } from './components/CountdownTimer';
import { RsvpBlessings } from './components/RsvpBlessings';
import { Itinerary } from './components/Itinerary';
import { PhotoHub } from './components/PhotoHub';
import { FeludaRiddles } from './components/FeludaRiddles';
import { CoupleTrivia } from './components/CoupleTrivia';
import { TicTacToe } from './components/TicTacToe';
import { MostLikelyTo } from './components/MostLikelyTo';
import { DoctorQuiz } from './components/DoctorQuiz';
import { 
  ToporIcon, 
  MukutIcon, 
  ShankhaPolaIcon, 
  AlpanaDivider, 
  AlpanaMotif 
} from './components/BengaliIcons';
import { signInGuestAnonymously } from './firebase';

export default function App() {
  const [activeTab, setActiveTab] = useState<'rsvps' | 'itinerary' | 'photos' | 'games'>('itinerary');
  const [funZoneTab, setFunZoneTab] = useState<'feluda' | 'trivia' | 'tictactoe' | 'mostlikely' | 'doctor'>('trivia');

  useEffect(() => {
    // Authenticate guest anonymously in background to satisfy strict security rules
    signInGuestAnonymously();
  }, []);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#FDFBF7] selection:bg-red-800 selection:text-white relative">
      
      {/* Traditional Alpana Border Top */}
      <div className="w-full h-2 bg-gradient-to-r from-red-800 via-amber-500 to-red-800 shrink-0"></div>
      <div className="w-full opacity-10 h-10 alpana-pattern bg-repeat-x shrink-0"></div>

      {/* Top ambient notification bar */}
      <div className="bg-red-950 text-amber-100 text-center py-2 px-4 border-b border-amber-500/20 text-xs font-semibold flex items-center justify-between">
        <div className="flex items-center gap-1.5 mx-auto">
          <Heart className="h-3 w-3 fill-current text-red-500 shrink-0" />
          <span>বিয়াস ও শুভ্রাংশুর শুভ বিবাহ উৎসবে আপনাকে স্বাগত!</span>
          <Heart className="h-3 w-3 fill-current text-red-500 shrink-0" />
        </div>
      </div>

      {/* Floating Quick Tab Access Navigation (Stays fixed at the top of scroll for instant mobile access!) */}
      <div className="sticky top-0 z-40 bg-[#FDFBF7]/90 backdrop-blur-md border-b border-amber-500/20 shadow-xs p-2">
        <div className="max-w-xl mx-auto px-2 py-2 flex justify-around gap-3 overflow-x-auto no-scrollbar">
          <button 
            onClick={() => scrollToSection('itinerary-anchor')} 
            className="flex-1 flex flex-col items-center gap-1.5 text-[10px] sm:text-xs text-white bg-gradient-to-br from-amber-500 to-orange-500 font-bold hover:opacity-90 transition-all cursor-pointer rounded-2xl py-2.5 px-2 min-w-[70px] shadow-sm transform hover:scale-105"
            id="nav-itinerary-btn"
          >
            <Calendar className="h-4 w-4 md:h-5 md:w-5 drop-shadow-sm" />
            <span className="drop-shadow-sm">স্থান ও সময়</span>
          </button>
          
          <button 
            onClick={() => scrollToSection('photo-anchor')} 
            className="flex-1 flex flex-col items-center gap-1.5 text-[10px] sm:text-xs text-white bg-gradient-to-br from-emerald-500 to-teal-500 font-bold hover:opacity-90 transition-all cursor-pointer rounded-2xl py-2.5 px-2 min-w-[70px] shadow-sm transform hover:scale-105"
            id="nav-photos-btn"
          >
            <ImageIcon className="h-4 w-4 md:h-5 md:w-5 drop-shadow-sm" />
            <span className="drop-shadow-sm">স্মৃতি চিত্র</span>
          </button>

          <button 
            onClick={() => scrollToSection('games-anchor')} 
            className="flex-1 flex flex-col items-center gap-1.5 text-[10px] sm:text-xs text-white bg-gradient-to-br from-indigo-500 to-purple-500 font-bold hover:opacity-90 transition-all cursor-pointer rounded-2xl py-2.5 px-2 min-w-[70px] shadow-sm transform hover:scale-105"
            id="nav-games-btn"
          >
            <Smile className="h-4 w-4 md:h-5 md:w-5 drop-shadow-sm" />
            <span className="drop-shadow-sm">খেলাধূলা</span>
          </button>

          <button 
            onClick={() => scrollToSection('rsvp-anchor')} 
            className="flex-1 flex flex-col items-center gap-1.5 text-[10px] sm:text-xs text-white bg-gradient-to-br from-rose-500 to-red-600 font-bold hover:opacity-90 transition-all cursor-pointer rounded-2xl py-2.5 px-2 min-w-[70px] shadow-sm transform hover:scale-105"
            id="nav-rsvp-btn"
          >
            <Heart className="h-4 w-4 md:h-5 md:w-5 drop-shadow-sm" />
            <span className="drop-shadow-sm">উপস্থিতি</span>
          </button>
        </div>
      </div>

      {/* ROYAL HERO CONTAINER BAR */}
      <div className="relative overflow-hidden py-16 md:py-24 text-center px-4 max-w-4xl mx-auto flex flex-col justify-center items-center">
        
        {/* Elegant traditional corner patterns inside hero */}
        <div className="absolute top-4 left-4 text-red-850 opacity-15 select-none font-light text-6xl">✿</div>
        <div className="absolute top-4 right-4 text-red-850 opacity-15 select-none font-light text-6xl">✿</div>
        
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="space-y-4"
        >
          {/* Main Subho Bibhaho Calligraphic Design */}
          <div className="inline-flex items-center justify-center gap-4 text-red-900 opacity-90">
            <ToporIcon className="h-10 w-10 md:h-12 md:w-12 animate-float" />
            <span className="font-serif text-3xl md:text-5xl font-extrabold tracking-tight">শুভ বিবাহ</span>
            <MukutIcon className="h-10 w-10 md:h-12 md:w-12 animate-float" />
          </div>

          <p className="font-display text-sm tracking-widest text-amber-600 font-bold uppercase pt-1">
             SUBHO BIBHAHO • WEDDING INVITATION
          </p>

          <AlpanaDivider className="mx-auto" />

          {/* Couple Typography */}
          <div className="space-y-1">
            <h1 className="font-serif text-4xl md:text-6xl font-black text-red-950 tracking-tight">
               বিয়াস <span className="text-amber-500 font-sans text-3xl md:text-4xl">&</span> শুভ্রাংশু
            </h1>
            <p className="text-stone-500 font-sans text-xs md:text-sm tracking-widest font-medium uppercase pt-1">
               Biyas & Suvrangshu
            </p>
          </div>

          {/* Slogan */}
          <p className="text-stone-700 italic max-w-md mx-auto text-sm font-serif leading-relaxed px-4 pt-2">
             "নতুন আশার আলোয় ভেসে, নতুন জীবন নতুন সাজে,
             সাতপাকেতে বাঁধা পরি, সানাইয়ের ওই সুরের মাঝে..."
          </p>

          <div className="pt-2">
            <span className="inline-block bg-red-950 text-amber-50 text-[10px] md:text-xs font-bold px-4 py-1.5 rounded-full border border-amber-400">
               ৯ই ডিসেম্বর, ২০২৬ (9th December 2026)
            </span>
          </div>

        </motion.div>

        {/* Countdown Ticker */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="mt-8 bg-white border border-amber-800/10 p-5 rounded-3xl shadow-sm max-w-md w-full relative"
        >
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-amber-50 border border-amber-300 text-amber-900 text-[10px] px-3.5 py-0.5 rounded-full font-bold uppercase tracking-wider">
             COUNTDOWN TO LOGNA
          </div>
          <CountdownTimer />
        </motion.div>

        <button 
          onClick={() => scrollToSection('itinerary-anchor')} 
          className="mt-8 text-xs font-bold text-red-800 hover:text-red-950 flex flex-col items-center gap-1 group cursor-pointer"
          id="scroll-to-celebrate"
        >
          <span>আমন্ত্রণপত্রটি স্ক্রোল করুন (Scroll to Invite)</span>
          <ChevronDown className="h-4 w-4 animate-bounce group-hover:translate-y-0.5 transition-transform" />
        </button>

      </div>

      {/* MAIN CONTAINER */}
      <main className="max-w-6xl mx-auto px-4 pb-24 space-y-24">

        {/* SECTION 1: ITINERARY & VENUE (With Anchored ID for navigation) */}
        <section id="itinerary-anchor" className="scroll-mt-20 pt-8">
          <div className="bg-amber-50/20 rounded-[40px] border border-amber-800/5 p-6 md:p-12 relative">
            <div className="absolute top-6 right-6 opacity-5 pointer-events-none select-none">
              <AlpanaMotif className="h-32 w-32 text-amber-800" />
            </div>
            <Itinerary />
          </div>
        </section>

        {/* SECTION 2: SMRITI CHITRO (PHOTO GALLERY) - Moved up as requested */}
        <section id="photo-anchor" className="scroll-mt-20 pt-8">
          <div className="bg-amber-50/20 rounded-[40px] border border-amber-800/5 p-6 md:p-12">
            <PhotoHub />
          </div>
        </section>

        {/* SECTION 3: FUN ZONE (Interactive Mini Games) - Moved up as requested */}
        <section id="games-anchor" className="scroll-mt-20 pt-8">
          <div className="bg-white border border-stone-200 rounded-[40px] p-6 md:p-12 shadow-sm relative">
            
            <div className="text-center mb-8">
              <span className="font-display text-xs tracking-wider text-amber-600 font-bold block mb-1">FUN & INTERACTIVE</span>
              <h3 className="font-serif text-3xl text-red-950 font-extrabold flex items-center justify-center gap-2">
                🎮 বিয়েবাড়ির আনন্দ আসর (Fun Zone)
              </h3>
              <p className="text-xs text-stone-600 max-w-sm mx-auto mt-1 leading-relaxed">
                 উন্মুক্ত আড্ডার আসরে অতিথিদের মনোরঞ্জনের জন্য সাজানো ছোট ৫টি খেলা। অংশ নিন এবং পরম আনন্দ উপভোগ করুন!
              </p>
            </div>

            {/* Custom Interactive Tab Bar for games in wrapping layout with English in brackets */}
            <div className="max-w-4xl mx-auto flex flex-wrap gap-2 justify-center bg-stone-100 p-2 rounded-2xl border border-stone-200 mb-8">
              <button
                onClick={() => setFunZoneTab('trivia')}
                className={`text-xs py-2 px-3 sm:px-4 rounded-xl font-serif font-bold transition-all ${
                  funZoneTab === 'trivia'
                    ? 'bg-red-800 text-white shadow-sm'
                    : 'text-stone-600 hover:text-stone-900 hover:bg-stone-200'
                } cursor-pointer`}
                id="tab-trivia-btn"
                type="button"
              >
                বর-কনে কুইজ (Couple Trivia)
              </button>

              <button
                onClick={() => setFunZoneTab('mostlikely')}
                className={`text-xs py-2 px-3 sm:px-4 rounded-xl font-serif font-bold transition-all ${
                  funZoneTab === 'mostlikely'
                    ? 'bg-red-800 text-white shadow-sm'
                    : 'text-stone-600 hover:text-stone-900 hover:bg-stone-200'
                } cursor-pointer`}
                id="tab-mostlikely-btn"
                type="button"
              >
                কে বেশি সম্ভাব্য? (Most Likely To)
              </button>

              <button
                onClick={() => setFunZoneTab('doctor')}
                className={`text-xs py-2 px-3 sm:px-4 rounded-xl font-serif font-bold transition-all ${
                  funZoneTab === 'doctor'
                    ? 'bg-red-800 text-white shadow-sm'
                    : 'text-stone-600 hover:text-stone-900 hover:bg-stone-200'
                } cursor-pointer`}
                id="tab-doctor-btn"
                type="button"
              >
                ডাক্তার বন্ধুদের কুইজ (Doctor Friends Quiz)
              </button>
              
              <button
                onClick={() => setFunZoneTab('feluda')}
                className={`text-xs py-2 px-3 sm:px-4 rounded-xl font-serif font-bold transition-all ${
                  funZoneTab === 'feluda'
                    ? 'bg-red-800 text-white shadow-sm'
                    : 'text-stone-600 hover:text-stone-900 hover:bg-stone-200'
                } cursor-pointer`}
                id="tab-feluda-btn"
                type="button"
              >
                ফেলুদার ধাঁধা (Feluda's Riddles)
              </button>
              
              <button
                onClick={() => setFunZoneTab('tictactoe')}
                className={`text-xs py-2 px-3 sm:px-4 rounded-xl font-serif font-bold transition-all ${
                  funZoneTab === 'tictactoe'
                    ? 'bg-red-800 text-white shadow-sm'
                    : 'text-stone-600 hover:text-stone-900 hover:bg-stone-200'
                } cursor-pointer`}
                id="tab-tictactoe-btn"
                type="button"
              >
                কাটাকুটি খেলা (Tic-Tac-Toe)
              </button>
            </div>

            {/* Game Screen Content */}
            <motion.div
              layout
              transition={{ duration: 0.2 }}
            >
              {funZoneTab === 'trivia' && <CoupleTrivia />}
              {funZoneTab === 'mostlikely' && <MostLikelyTo />}
              {funZoneTab === 'doctor' && <DoctorQuiz />}
              {funZoneTab === 'feluda' && <FeludaRiddles />}
              {funZoneTab === 'tictactoe' && <TicTacToe />}
            </motion.div>

          </div>
        </section>

        {/* SECTION 4: RSVP & BLESSINGS WALL - Moved to bottom */}
        <section id="rsvp-anchor" className="scroll-mt-20 pt-8">
          <div className="bg-red-900/5 rounded-[40px] border border-red-900/5 p-6 md:p-12 relative overflow-hidden">
            {/* Ambient gold circles */}
            <div className="absolute -bottom-10 -left-10 h-36 w-36 bg-amber-200/10 rounded-full blur-2xl" />
            <div className="absolute -top-10 -right-10 h-36 w-36 bg-red-800/5 rounded-full blur-2xl" />
            <RsvpBlessings />
          </div>
        </section>

      </main>

      {/* CLASSIC TRADITIONAL FOOTER */}
      <footer className="bg-stone-900 text-amber-100 py-12 px-6 border-t border-amber-500/20 text-center relative overflow-hidden pb-16">
        {/* Subtle decorative motif behind footer background */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 opacity-5 pointer-events-none select-none">
          <AlpanaMotif className="h-64 w-64 text-amber-500" />
        </div>
        
        <div className="max-w-2xl mx-auto space-y-4 relative z-10">
          <div className="flex justify-center items-center gap-1.5 text-amber-400">
            <span>✦</span>
            <span>✦</span>
            <AlpanaMotif className="h-10 w-10 text-amber-400" />
            <span>✦</span>
            <span>✦</span>
          </div>

          <h5 className="font-serif text-lg font-bold">আপনাদের উপস্থিতি ও মাঙ্গলিক মৈত্রী কামনা করি</h5>
          <p className="text-xs text-stone-400 max-w-md mx-auto leading-relaxed">
             Wedding invitation webpage beautifully compiled with Firebase firestore real-time database support. Built with love and blessings for <strong>Biyas & Suvrangshu</strong>.
          </p>

          <p className="text-[10px] text-amber-500/60 uppercase tracking-widest pt-4">
             শুভ পরিণয় • ৯ই ও ১১ই ডিসেম্বর ২০২৬
          </p>
        </div>
      </footer>

      {/* Traditional Alpana Border Bottom */}
      <div className="w-full opacity-10 h-10 alpana-pattern bg-repeat-x scale-y-[-1] shrink-0"></div>
      <div className="w-full h-2 bg-gradient-to-r from-red-800 via-amber-500 to-red-800 shrink-0"></div>

    </div>
  );
}

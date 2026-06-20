import React from 'react';

// Custom, highly detailed SVGs for traditional Bengali marriage symbols.

// 1. Alpana / Kolka Motif
export const AlpanaMotif: React.FC<{ className?: string }> = ({ className = "h-16 w-16" }) => (
  <svg 
    viewBox="0 0 100 100" 
    className={`${className} fill-current`}
    aria-hidden="true"
  >
    {/* Central lotus & paisley elements representing Bengali wedding Alpana/Kolka */}
    <path d="M 50 10 
             C 65 30, 85 40, 85 60 
             C 85 75, 75 85, 50 85 
             C 25 85, 15 75, 15 60 
             C 15 40, 35 30, 50 10 Z" 
          stroke="currentColor" 
          strokeWidth="2" 
          fill="none" 
    />
    <path d="M 50 20 
             C 60 35, 75 42, 75 58 
             C 75 70, 65 78, 50 78 
             C 35 78, 25 70, 25 58 
             C 25 42, 40 35, 50 20 Z" 
          stroke="currentColor" 
          strokeWidth="1.5" 
          fill="none" 
          opacity="0.8"
    />
    <circle cx="50" cy="55" r="8" stroke="currentColor" strokeWidth="1.5" fill="none" />
    <circle cx="50" cy="55" r="3" fill="currentColor" />
    {/* Decorative dots and petals */}
    <path d="M 50 10 L 50 5" stroke="currentColor" strokeWidth="2" />
    <circle cx="50" cy="3" r="2.5" fill="currentColor" />
    <circle cx="10" cy="60" r="2" fill="currentColor" />
    <circle cx="90" cy="60" r="2" fill="currentColor" />
    <circle cx="20" cy="45" r="2" fill="currentColor" />
    <circle cx="80" cy="45" r="2" fill="currentColor" />
    <circle cx="32" cy="33" r="24" stroke="currentColor" strokeWidth="1" strokeDasharray="3,3" fill="none" opacity="0.5" />
    <circle cx="68" cy="33" r="24" stroke="currentColor" strokeWidth="1" strokeDasharray="3,3" fill="none" opacity="0.5" />
  </svg>
);

// 2. Topor (Groom's Crown)
export const ToporIcon: React.FC<{ className?: string }> = ({ className = "h-12 w-12" }) => (
  <svg 
    viewBox="0 0 100 120" 
    className={`${className} text-amber-600`}
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2"
  >
    {/* Conical base */}
    <path d="M 50 10 L 15 90 L 85 90 Z" fill="#FDFBF7" strokeWidth="2.5" />
    {/* Bottom head ring */}
    <rect x="12" y="90" width="76" height="10" rx="3" fill="currentColor" stroke="currentColor" />
    {/* Internal traditional spire details */}
    <path d="M 50 10 L 50 90" stroke="currentColor" strokeWidth="1.5" strokeDasharray="2,2" />
    <circle cx="50" cy="5" r="3" fill="currentColor" />
    {/* Horizontal bands */}
    <path d="M 25 65 L 75 65" stroke="currentColor" strokeWidth="2" />
    <path d="M 35 40 L 65 40" stroke="currentColor" strokeWidth="2" />
    {/* Side ornaments/hangings */}
    <path d="M 15 95 C 10 105, 10 115, 15 118" stroke="currentColor" strokeWidth="1.5" />
    <circle cx="15" cy="118" r="2" fill="currentColor" />
    <path d="M 85 95 C 90 105, 90 115, 85 118" stroke="currentColor" strokeWidth="1.5" />
    <circle cx="85" cy="118" r="2" fill="currentColor" />
    {/* Traditional floral/ball toppings */}
    <circle cx="35" cy="40" r="2" fill="currentColor" />
    <circle cx="65" cy="40" r="2" fill="currentColor" />
    <circle cx="25" cy="65" r="2" fill="currentColor" />
    <circle cx="75" cy="65" r="2" fill="currentColor" />
    <circle cx="50" cy="25" r="4" fill="none" stroke="currentColor" />
    <circle cx="50" cy="52" r="5" fill="none" stroke="currentColor" />
  </svg>
);

// 3. Mukut (Bride's Crown)
export const MukutIcon: React.FC<{ className?: string }> = ({ className = "h-12 w-12" }) => (
  <svg 
    viewBox="0 0 100 80" 
    className={`${className} text-amber-500`}
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2"
  >
    {/* Crescent tiara shape */}
    <path d="M 10 60 C 25 35, 75 35, 90 60" strokeWidth="2.5" />
    <path d="M 10 60 C 25 20, 75 20, 90 60" strokeWidth="1.5" />
    {/* Bottom band */}
    <path d="M 8 64 C 25 45, 75 45, 92 64" strokeWidth="2" />
    {/* Crown ornamental peaks */}
    <path d="M 50 15 L 43 35 L 57 35 Z" fill="#FDFBF7" />
    <circle cx="50" cy="10" r="3" fill="currentColor" />
    
    <path d="M 33 22 L 28 42 L 38 42 Z" fill="#FDFBF7" />
    <circle cx="33" cy="17" r="2" fill="currentColor" />
    
    <path d="M 67 22 L 62 42 L 72 42 Z" fill="#FDFBF7" />
    <circle cx="67" cy="17" r="2" fill="currentColor" />

    <path d="M 18 35 L 14 52 L 22 52 Z" fill="#FDFBF7" />
    <circle cx="18" cy="30" r="2" fill="currentColor" />

    <path d="M 82 35 L 78 52 L 86 52 Z" fill="#FDFBF7" />
    <circle cx="82" cy="30" r="2" fill="currentColor" />

    {/* Elegant drops */}
    <circle cx="50" cy="55" r="2.5" fill="currentColor" />
    <circle cx="35" cy="53" r="2" fill="currentColor" />
    <circle cx="65" cy="53" r="2" fill="currentColor" />
  </svg>
);

// 4. Shankha (Conch Shell) & Pola (Red Coral Bangle) representing divine bond
export const ShankhaPolaIcon: React.FC<{ className?: string }> = ({ className = "h-14 w-14" }) => (
  <svg 
    viewBox="0 0 100 80" 
    className={`${className}`}
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2"
  >
    {/* Red Bangle (Pola) */}
    <ellipse cx="38" cy="40" rx="20" ry="14" stroke="#DC2626" strokeWidth="4.5" />
    {/* White Conch Bangle (Shankha) */}
    <ellipse cx="62" cy="40" rx="20" ry="14" stroke="#F1F5F9" strokeWidth="4" />
    <ellipse cx="62" cy="40" rx="20" ry="14" stroke="#CBD5E1" strokeWidth="1" />
    {/* Engravings on Shankha */}
    <path d="M 52 32 C 55 35, 55 45, 52 48" stroke="#94A3B8" strokeWidth="1" />
    <path d="M 72 32 C 69 35, 69 45, 72 48" stroke="#94A3B8" strokeWidth="1" />
  </svg>
);

// 5. Elegant Alpana Divider Pattern
export const AlpanaDivider: React.FC<{ className?: string }> = ({ className = "w-full max-w-md" }) => (
  <div className={`flex items-center justify-center space-x-2 my-6 ${className}`}>
    <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent to-red-800" />
    <div className="text-red-800 opacity-80 flex items-center space-x-1">
      <span className="text-[8px] opacity-60">◆</span>
      <span className="text-xs">✦</span>
      <AlpanaMotif className="h-10 w-10 text-red-800" />
      <span className="text-xs">✦</span>
      <span className="text-[8px] opacity-60">◆</span>
    </div>
    <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent to-red-800" />
  </div>
);

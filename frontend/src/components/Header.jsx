import React from 'react';
import { HelpCircle, Car, Globe, User } from 'lucide-react';

export default function Header({ onResetView, isResultsPage, searchParams, onEditSearch }) {
  if (isResultsPage) {
    return (
      <header className="w-full bg-black text-white select-none z-50 sticky top-0 left-0 border-b border-neutral-800/80">
        <div className="w-full max-w-[1100px] mx-auto px-4 py-3 flex items-center justify-between h-[64px]">
          {/* Logo */}
          <div 
            onClick={onResetView}
            className="flex flex-col cursor-pointer select-none leading-none active:scale-95 transition-transform duration-100"
          >
            <div className="flex items-baseline font-condensed font-black text-2xl tracking-tighter italic text-white leading-none">
              <span>S</span>
              <span className="relative">
                I
                <span className="absolute -top-0.5 left-0 w-2 h-0.5 bg-[#FF5000] rounded-full transform rotate-[25deg] skew-x-[-10deg]"></span>
              </span>
              <span>XT</span>
            </div>
            <span className="text-[5px] tracking-[0.22em] font-black text-white mt-0.5 uppercase block text-left">
              RENT THE CAR
            </span>
          </div>

          {/* Search Capsule */}
          <div 
            onClick={onEditSearch}
            className="flex items-center gap-4 bg-[#191919] hover:bg-[#252525] border border-neutral-800/60 rounded-full px-5 py-1.5 cursor-pointer premium-transition group max-w-[480px] w-full mx-4"
          >
            <div className="flex-grow text-left">
              <p className="text-[11px] font-black text-white tracking-wide leading-tight">
                {searchParams?.pickupLocation || 'Munich Airport'}
              </p>
              <p className="text-[9px] font-medium text-neutral-400 leading-tight mt-0.5">
                {searchParams?.pickupDate || 'Jun 26'} | {searchParams?.pickupTime || '12:00 PM'} - {searchParams?.returnDate || 'Jun 28'} | {searchParams?.returnTime || '12:00 PM'}
              </p>
            </div>
            <button className="text-white hover:text-[#FF5000] premium-transition">
              <svg className="w-3.5 h-3.5 text-neutral-400 group-hover:text-white stroke-[2.5]" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                <path d="M18.5 2.5a2.121 2.121 0 1 1 3 3L12 15l-4 1 1-4z" />
              </svg>
            </button>
          </div>

          {/* Right options */}
          <div className="flex items-center gap-5 text-xs font-black text-white">
            <button className="flex items-center gap-1.5 hover:text-neutral-300 premium-transition">
              <Globe className="w-4 h-4 text-white stroke-[2]" />
              <span>EN | $</span>
            </button>
            <button 
              className="flex items-center gap-1.5 hover:text-neutral-300 premium-transition"
              onClick={() => alert("Registration and member accounts are currently visual-only in this demonstration.")}
            >
              <User className="w-4 h-4 text-white stroke-[2]" />
              <span>Log in | Register</span>
            </button>
          </div>
        </div>
      </header>
    );
  }

  return (
    <header className="w-full flex flex-col z-50 absolute top-0 left-0 select-none">
      {/* Top Thin Orange Banner with Exact Capitalization */}
      <div className="w-full bg-[#FF5000] text-black text-[9px] font-black text-center py-1 tracking-[0.05em] uppercase font-condensed">
        113 years of SIXT. 113 years of tradition.
      </div>

      {/* Main Navbar */}
      <div className="w-full bg-transparent text-white px-6 md:px-12 py-3 flex items-center justify-between">
        
        {/* Left Side: Logo */}
        <div className="flex items-center gap-5">
          <div 
            onClick={onResetView}
            className="flex flex-col cursor-pointer select-none leading-none active:scale-95 transition-transform duration-100"
          >
            {/* Custom High-Fidelity Brand SIXT Logo with swoosh on the 'I' */}
            <div className="flex items-baseline font-condensed font-black text-3xl tracking-tighter italic text-white leading-none">
              <span>S</span>
              <span className="relative">
                I
                {/* Curved Orange Swoosh matching official SIXT logo */}
                <span className="absolute -top-1 left-0 w-2.5 h-1 bg-[#FF5000] rounded-full transform rotate-[25deg] skew-x-[-10deg]"></span>
              </span>
              <span>XT</span>
            </div>
            <span className="text-[5.5px] tracking-[0.22em] font-black text-white mt-1 uppercase block text-left">
              RENT THE CAR
            </span>
          </div>
        </div>

        {/* Right Side: Exact Flat Navigation Links */}
        <div className="flex items-center gap-5 text-xs font-black text-white">
          
          {/* Help Link */}
          <button className="flex items-center gap-2 hover:text-neutral-300 premium-transition">
            <HelpCircle className="w-4 h-4 text-white" />
            <span>Help</span>
          </button>
          
          {/* Manage Bookings Link */}
          <button 
            onClick={onResetView}
            className="flex items-center gap-2 hover:text-neutral-300 premium-transition"
          >
            <Car className="w-4 h-4 text-white" />
            <span>Manage bookings</span>
          </button>

          {/* Language/Currency Link */}
          <button className="flex items-center gap-2 hover:text-neutral-300 premium-transition">
            <Globe className="w-4 h-4 text-white" />
            <span>EN | $</span>
          </button>

          {/* Log In / Register Flat Link */}
          <button 
            className="flex items-center gap-2 hover:text-neutral-300 premium-transition"
            onClick={() => alert("Registration and member accounts are currently visual-only in this demonstration.")}
          >
            <User className="w-4 h-4 text-white" />
            <span>Log in | Register</span>
          </button>

        </div>
      </div>
    </header>
  );
}

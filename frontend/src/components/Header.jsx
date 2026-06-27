import React from 'react';
import { HelpCircle, Car, Globe, User, Menu } from 'lucide-react';

export default function Header({ onResetView, isResultsPage, searchParams, onEditSearch, onOpenFilters }) {
  if (isResultsPage) {
    return (
      <>
        {/* --- DESKTOP RESULTS HEADER --- */}
        <header className="hidden md:block w-full bg-black text-white select-none z-50 sticky top-0 left-0 border-b border-neutral-800/80">
          <div className="w-full max-w-[1100px] mx-auto px-4 py-3 h-[64px]">
            <div className="flex items-center justify-between h-full">
              {/* Logo */}
              <div 
                onClick={onResetView}
                className="flex flex-col cursor-pointer select-none leading-none active:scale-95 transition-transform duration-100"
              >
                <span className="font-condensed font-extrabold text-3xl tracking-tighter text-[#C5A059] leading-none">
                  W
                </span>
                <span className="text-[5px] tracking-[0.22em] font-black text-white mt-0.5 uppercase block text-left">
                  LUXURY RENTAL
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
                <button className="text-white hover:text-[#C5A059] premium-transition">
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
          </div>
        </header>

        {/* --- MOBILE RESULTS HEADER (White Sticky Bar) --- */}
        <header className="md:hidden w-full bg-white text-neutral-900 select-none z-50 sticky top-0 left-0 border-b border-neutral-200">
          {/* Top row: Back button, Globe, User */}
          <div className="flex items-center justify-between px-4 py-2">
            <button onClick={onResetView} className="p-1 -ml-2">
              <svg className="w-5 h-5 text-neutral-900 stroke-[2.5]" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M15 18l-6-6 6-6"/></svg>
            </button>
            <div className="flex items-center gap-4">
              <button><Globe className="w-5 h-5 text-neutral-900" /></button>
              <button onClick={() => alert("Registration and member accounts are currently visual-only in this demonstration.")}>
                <User className="w-5 h-5 text-neutral-900" />
              </button>
            </div>
          </div>
          
          {/* Bottom row: Search capsule + Filter icon */}
          <div className="px-4 pb-3 flex items-center gap-3">
             <div onClick={onEditSearch} className="flex-grow flex items-center justify-between bg-neutral-100/80 rounded-xl px-4 py-2.5 cursor-pointer">
               <div>
                 <p className="text-sm font-bold text-neutral-900 leading-tight">
                   {searchParams?.pickupLocation || 'Frankfurt Airport'}
                 </p>
                 <p className="text-[10px] font-bold text-neutral-500 leading-tight mt-0.5">
                   {searchParams?.pickupDate || 'Jun 29'} | {searchParams?.pickupTime || '12:00 PM'} - {searchParams?.returnDate || 'Jul 03'} | {searchParams?.returnTime || '12:00 PM'}
                 </p>
               </div>
               <svg className="w-4 h-4 text-neutral-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>
             </div>
             {/* Filter icon button */}
             <button onClick={onOpenFilters} className="flex-shrink-0 w-[46px] h-[46px] bg-neutral-100/80 rounded-xl flex items-center justify-center cursor-pointer">
               <svg className="w-4 h-4 text-neutral-900" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <line x1="4" y1="7" x2="20" y2="7"/>
                  <line x1="8" y1="12" x2="20" y2="12"/>
                  <line x1="12" y1="17" x2="20" y2="17"/>
               </svg>
             </button>
          </div>
        </header>
      </>
    );
  }


  return (
    <header className="w-full flex flex-col z-50 absolute top-0 left-0 select-none">
      {/* Top Gold Banner */}
      <div className="w-full bg-[#C5A059] text-black text-[9px] font-black text-center py-1 tracking-[0.05em] uppercase font-condensed">
        W LUXURY CAR RENTAL. EXCLUSIVITY REDEFINED.
      </div>

      {/* Main Navbar */}
      <div className="w-full bg-black md:bg-transparent text-white px-4 md:px-12 py-3 h-[64px]">
        
        {/* --- MOBILE LAYOUT --- */}
        <div className="flex items-center justify-between h-full md:hidden">
          <div className="flex items-center gap-4">

            <div 
              onClick={onResetView}
              className="flex items-center gap-2 cursor-pointer select-none active:scale-95 transition-transform duration-100"
            >
              <span className="font-condensed font-extrabold text-2xl tracking-tighter text-[#C5A059] leading-none">W</span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button><HelpCircle className="w-5 h-5 text-white" /></button>
            <button onClick={onResetView}><Car className="w-5 h-5 text-white" /></button>
            <button><Globe className="w-5 h-5 text-white" /></button>
            <button onClick={() => alert("Registration and member accounts are currently visual-only in this demonstration.")}>
              <User className="w-5 h-5 text-white" />
            </button>
          </div>
        </div>

        {/* --- DESKTOP LAYOUT --- */}
        <div className="hidden md:flex items-center justify-between h-full">
          {/* Left Side: Logo */}
          <div className="flex items-center gap-5">
            <div 
              onClick={onResetView}
              className="flex flex-col cursor-pointer select-none leading-none active:scale-95 transition-transform duration-100"
            >
              <span className="font-condensed font-extrabold text-4xl tracking-tighter text-[#C5A059] leading-none">
                W
              </span>
              <span className="text-[5.5px] tracking-[0.22em] font-black text-white mt-1 uppercase block text-left">
                LUXURY RENTAL
              </span>
            </div>
          </div>

          {/* Right Side: Navigation Links */}
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

            {/* Log In / Register */}
            <button 
              className="flex items-center gap-2 hover:text-neutral-300 premium-transition"
              onClick={() => alert("Registration and member accounts are currently visual-only in this demonstration.")}
            >
              <User className="w-4 h-4 text-white" />
              <span>Log in | Register</span>
            </button>

          </div>
        </div>
      </div>
    </header>
  );
}

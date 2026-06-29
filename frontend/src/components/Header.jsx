import React, { useState } from 'react';
import { HelpCircle, Car, Globe, User, Menu, X, Sparkles } from 'lucide-react';
import LanguageCurrencyModal from './LanguageCurrencyModal';

export default function Header({ onResetView, isResultsPage, searchParams, onEditSearch, onOpenFilters }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isLangModalOpen, setIsLangModalOpen] = useState(false);
  if (isResultsPage) {
    return (
      <>
        {isLangModalOpen && <LanguageCurrencyModal onClose={() => setIsLangModalOpen(false)} />}
        {/* --- DESKTOP RESULTS HEADER --- */}
        <header className="hidden md:block w-full bg-black text-white select-none z-50 relative border-b border-neutral-800/80">
          <div className="w-full max-w-[1100px] mx-auto px-4 py-3 h-[64px]">
            <div className="flex items-center justify-between h-full">
              {/* Logo */}
              <div className="flex items-center gap-4">
                <div 
                  onClick={onResetView}
                  className="flex flex-col cursor-pointer select-none leading-none active:scale-95 transition-transform duration-100"
                >
                  <span className="font-condensed font-extrabold text-3xl tracking-tighter text-[#C5A059] leading-none">
                    W
                  </span>
                  <span className="text-[7px] tracking-[0.22em] font-black text-white mt-0.5 uppercase block text-left">
                    LUXURY RENTAL  
                  </span>
                </div>
              </div>

              {/* Search Capsule */}
              <div 
                onClick={onEditSearch}
                className="flex items-center gap-4 bg-[#191919] hover:bg-[#252525] rounded-full px-6 py-2 cursor-pointer premium-transition group max-w-[500px] w-full mx-4 shadow-sm"
              >
                <div className="flex-grow text-left">
                  <p className="text-[13px] font-bold text-white tracking-wide leading-tight">
                    {searchParams?.pickupLocation || 'Frankfurt Airport'}
                  </p>
                  <p className="text-[11px] font-semibold text-neutral-300 leading-tight mt-0.5">
                    {searchParams?.pickupDate || 'Jun 30'} | {searchParams?.pickupTime || '12:00 PM'} - {searchParams?.returnDate || 'Jul 15'} | {searchParams?.returnTime || '12:00 PM'}
                  </p>
                </div>
                <button className="text-white hover:text-[#C5A059] premium-transition ml-2">
                  <svg className="w-4 h-4 text-white stroke-[2.5]" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path d="M12 20h9" />
                    <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
                  </svg>
                </button>
              </div>

              {/* Right options */}
              <div className="flex items-center gap-6 text-[15px] font-bold text-white tracking-wide">
                <button className="flex items-center gap-1.5 hover:text-neutral-300 premium-transition">
                  <Globe className="w-[18px] h-[18px] text-white stroke-[2.5]" />
                  <span>EN | $</span>
                </button>
                <button 
                  className="flex items-center gap-1.5 hover:text-neutral-300 premium-transition"
                  onClick={() => alert("Registration and member accounts are currently visual-only in this demonstration.")}
                >
                  <svg className="w-[18px] h-[18px] fill-white" viewBox="0 0 24 24"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>
                  <span>Log in | Register</span>
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* --- MOBILE RESULTS HEADER (White Sticky Bar) --- */}
        <header className="md:hidden w-full bg-white text-neutral-900 select-none z-50 relative border-b border-neutral-200">
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
    <>
      <header className="w-full flex flex-col z-50 absolute top-0 left-0 select-none">
      {/* Top Gold Banner */}
      <div className="w-full bg-[#C5A059] text-black text-[9px] font-black text-center py-1 tracking-[0.05em] uppercase font-condensed">
        W LUXURY CAR RENTAL. EXCLUSIVITY REDEFINED.
      </div>

      {/* Main Navbar */}
      <div className="w-full bg-black md:bg-transparent text-white px-4 md:px-6 py-3 h-[64px]">
        <div className="w-full max-w-[1100px] mx-auto h-full flex flex-col justify-center">
        
        {/* --- MOBILE LAYOUT --- */}
        <div className="flex items-center justify-between h-full md:hidden">
          <div className="flex items-center gap-4">
            <button onClick={() => setIsSidebarOpen(true)} className="flex items-center justify-center p-1 group">
              <Menu className="w-6 h-6 text-white group-hover:text-[#C5A059] transition-colors" />
            </button>

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
          <div className="flex items-center gap-4">
            <button onClick={() => setIsSidebarOpen(true)} className="flex items-center justify-center p-1 group mr-1 -mt-2">
              <Menu className="w-6 h-6 text-white group-hover:text-[#C5A059] transition-colors" />
            </button>
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
          <div className="flex items-center gap-7 text-[15px] font-bold text-white tracking-wide">
            
            {/* Help Link */}
            <button className="flex items-center gap-2 text-white hover:text-[#C5A059] premium-transition">
              <svg className="w-[20px] h-[20px] fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" clipRule="evenodd" d="M3 5C3 3.89543 3.89543 3 5 3H19C20.1046 3 21 3.89543 21 5V16C21 17.1046 20.1046 18 19 18H14.1L12 21L9.9 18H5C3.89543 18 3 17.1046 3 16V5ZM12 15.5C12.8284 15.5 13.5 14.8284 13.5 14C13.5 13.1716 12.8284 12.5 12 12.5C11.1716 12.5 10.5 13.1716 10.5 14C10.5 14.8284 11.1716 15.5 12 15.5ZM11.1674 9.14432C11.5432 8.41624 12.4302 8.1224 13.1582 8.49826C13.8863 8.87413 14.1802 9.76106 13.8043 10.4891L13.8043 9.73307C13.7291 9.87877 13.5786 9.98222 13.3904 10.018L12.9184 10.1078C11.676 10.3441 10.5979 11.2625 10.2919 12.4866C10.1717 12.9674 10.4628 13.4534 10.9436 13.5736C11.4243 13.6938 11.9103 13.4026 12.0305 12.9219C12.1581 12.4116 12.6074 12.0289 13.125 11.9304L13.597 11.8407C14.1206 11.7411 14.595 11.453 14.8291 10.9996C15.5858 9.53385 14.9936 7.7465 13.5279 6.98978C12.0622 6.23306 10.2748 6.82522 9.51811 8.29093C9.28371 8.74519 9.46178 9.30784 9.91605 9.54224C10.3703 9.77665 10.9329 9.59858 11.1674 9.14432Z"/>
              </svg>
              <span>Help</span>
            </button>
            
            {/* Manage Bookings Link */}
            <button 
              onClick={onResetView}
              className="flex items-center gap-2 text-white hover:text-[#C5A059] premium-transition"
            >
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.21.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.5 7h11l1.04 3H5.46l1.04-3zM7.5 17a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm9 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z"/>
              </svg>
              <span>Manage bookings</span>
            </button>

            {/* Language/Currency Link */}
            <button 
              onClick={() => setIsLangModalOpen(true)}
              className="flex items-center gap-2 text-white hover:text-[#C5A059] premium-transition"
            >
              <Globe className="w-5 h-5 stroke-current stroke-[2.5]" />
              <span>EN | $</span>
            </button>

            {/* Log In / Register */}
            <button 
              className="flex items-center gap-2 text-white hover:text-[#C5A059] premium-transition"
              onClick={() => alert("Registration and member accounts are currently visual-only in this demonstration.")}
            >
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
              </svg>
              <span>Log in | Register</span>
            </button>

          </div>
        </div>
        </div>
      </div>
    </header>

    {/* --- SIDEBAR DRAWER --- */}
    {/* Black overlay */}
    <div 
      className={`fixed inset-0 bg-black/60 z-[100] transition-opacity duration-300 ${isSidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
      onClick={() => setIsSidebarOpen(false)}
    />
    
    {/* Sidebar Panel */}
    <div className={`fixed top-0 left-0 h-full w-[320px] sm:w-[420px] bg-white z-[110] transform transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] flex flex-col shadow-2xl ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
      <div className="relative flex items-center justify-center p-10 pb-8 border-b border-neutral-100">
        <button 
          onClick={() => setIsSidebarOpen(false)} 
          className="absolute left-6 top-1/2 -translate-y-1/2 p-2 hover:bg-neutral-100 rounded-full transition-colors flex items-center justify-center"
        >
          <X className="w-7 h-7 text-neutral-400 hover:text-black transition-colors" />
        </button>
        {/* Logo in sidebar */}
        <div className="flex flex-col select-none leading-none cursor-pointer" onClick={() => { setIsSidebarOpen(false); onResetView && onResetView(); }}>
          <span className="font-condensed font-extrabold text-[56px] tracking-normal text-[#191919] leading-none text-center">
            <span className="text-[#C5A059]">W</span>
          </span>
          <span className="text-[9px] tracking-[0.3em] font-black text-neutral-500 mt-2 uppercase block text-center">
            LUXURY RENTAL
          </span>
        </div>
      </div>
      
      {/* Navigation Items */}
      <div className="flex flex-col items-center text-center px-6 py-12 space-y-10 flex-1 overflow-y-auto">
        
        <div className="flex flex-col group cursor-pointer transition-transform duration-300 ease-out hover:-translate-y-1" onClick={() => setIsSidebarOpen(false)}>
          <span className="font-condensed font-black uppercase tracking-[0.1em] text-2xl text-[#191919] group-hover:text-[#C5A059] transition-colors">Car rental</span>
        </div>
        
        <div className="flex flex-col group cursor-pointer transition-transform duration-300 ease-out hover:-translate-y-1" onClick={() => setIsSidebarOpen(false)}>
          <span className="font-condensed font-black uppercase tracking-[0.1em] text-2xl text-[#191919] group-hover:text-[#C5A059] transition-colors">Locations</span>
          <span className="text-[13px] text-neutral-400 group-hover:text-[#C5A059] transition-colors mt-2 font-medium">Car rental locations</span>
        </div>

        <div className="flex flex-col group cursor-pointer transition-transform duration-300 ease-out hover:-translate-y-1" onClick={() => setIsSidebarOpen(false)}>
          <span className="font-condensed font-black uppercase tracking-[0.1em] text-2xl text-[#191919] group-hover:text-[#C5A059] transition-colors">W one</span>
          <span className="text-[13px] text-neutral-400 group-hover:text-[#C5A059] transition-colors mt-2 font-medium">Car subscription</span>
        </div>

        <div className="flex flex-col group cursor-pointer transition-transform duration-300 ease-out hover:-translate-y-1" onClick={() => setIsSidebarOpen(false)}>
          <span className="font-condensed font-black uppercase tracking-[0.1em] text-2xl text-[#191919] group-hover:text-[#C5A059] transition-colors">Business</span>
        </div>
        
      </div>
    </div>
    
    <LanguageCurrencyModal isOpen={isLangModalOpen} onClose={() => setIsLangModalOpen(false)} />
    </>
  );
}

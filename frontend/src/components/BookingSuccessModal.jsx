import React from 'react';
import { Check } from 'lucide-react';

export default function BookingSuccessModal({ 
  email, 
  firstName, 
  lastName, 
  carName, 
  totalPrice, 
  onContinue 
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="bg-[#191919] w-full max-w-[500px] rounded-[16px] overflow-hidden shadow-2xl flex flex-col">
        
        {/* Header Section */}
        <div className="p-8 pb-6 flex flex-col items-center text-center">
          <div className="w-14 h-14 bg-[#1FC75A] rounded-full flex items-center justify-center mb-6 shadow-[0_0_20px_rgba(31,199,90,0.4)]">
            <Check className="w-8 h-8 text-white stroke-[3]" />
          </div>
          
          <h2 className="text-white font-condensed font-black text-2xl uppercase tracking-wide leading-tight mb-3">
            Booking Request Sent<br />Successful!
          </h2>
          
          <p className="text-neutral-400 text-[13px] leading-relaxed max-w-[85%] mx-auto">
            Your rental request has been sent Successfully. A confirmation receipt has been sent to <strong className="text-white font-semibold">{email || 'your email'}</strong>.
          </p>
        </div>

        {/* Details Table */}
        <div className="bg-[#121212] px-8 py-5 border-y border-white/5">
          <div className="flex flex-col gap-4">
            
            <div className="flex justify-between items-center text-[11px] uppercase font-bold tracking-wider">
              <span className="text-neutral-500">Booking Reference</span>
              <span className="text-[#1FC75A]">SX-{Math.floor(1000000 + Math.random() * 9000000)}</span>
            </div>

            <div className="flex justify-between items-center text-[11px] font-bold tracking-wide">
              <span className="text-neutral-500">Driver</span>
              <span className="text-white capitalize">{firstName} {lastName}</span>
            </div>

            <div className="flex justify-between items-center text-[11px] uppercase font-bold tracking-wide">
              <span className="text-neutral-500">Vehicle</span>
              <span className="text-white">{carName}</span>
            </div>

            <div className="flex justify-between items-center text-[11px] font-bold tracking-wide">
              <span className="text-neutral-500">Pickup</span>
              <span className="text-white">Munich Airport</span>
            </div>
            
            <div className="w-full h-px bg-white/5 my-1"></div>

            <div className="flex justify-between items-center text-[11px] font-bold tracking-wide">
              <span className="text-neutral-500">Estimated Total</span>
              <span className="text-[#C5A059] text-[13px]">${totalPrice}</span>
            </div>

          </div>
        </div>

        {/* Footer / Action */}
        <div className="p-8">
          <button 
            onClick={onContinue}
            className="w-full bg-[#C5A059] hover:bg-[#B49048] active:scale-[0.98] transition-all text-white font-bold text-[13px] py-4 rounded-xl uppercase tracking-widest"
          >
            Continue
          </button>
        </div>

      </div>
    </div>
  );
}

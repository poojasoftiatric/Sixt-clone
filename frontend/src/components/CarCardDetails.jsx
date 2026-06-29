import React, { useState, useEffect } from 'react';
import { X, User, Briefcase, Info, Navigation, Check } from 'lucide-react';
import PriceDetailsModal from './PriceDetailsModal';

export default function CarCardDetails({ car, onClose, onNext, searchParams }) {
  const [bookingOption, setBookingOption] = useState('bestPrice');
  const [mileage, setMileage] = useState('included');
  const [isPriceDetailsModalOpen, setIsPriceDetailsModalOpen] = useState(false);

  // Rates directly matching screenshot
  const stayFlexibleRate = 4.79;
  const unlimitedMileageRate = 4.55;

  // Calculate rental days
  const getDays = () => {
    if (searchParams?.pickupDate && searchParams?.returnDate) {
      const start = new Date(searchParams.pickupDate);
      const end = new Date(searchParams.returnDate);
      const diffTime = Math.abs(end - start);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) || 1;
      return diffDays;
    }
    return 15; // default for UI math based on screenshot (1381.69 / 92.11 ≈ 15 days)
  };
  const days = getDays();
  
  // Calculate daily rate
  // Base rate logic to closely match the screenshot if possible, or fallback to car.baseRate
  let dailyRate = car.baseRate || 92.11; 
  if (bookingOption === 'stayFlexible') dailyRate += stayFlexibleRate;
  if (mileage === 'unlimited') dailyRate += unlimitedMileageRate;
  
  const totalRate = dailyRate * days;

  // No longer locking body scroll because this is now an inline accordion, not a fullscreen modal.

  const handleNext = () => {
    // Pass selection upward to App.jsx to open BookingWizard
    onNext(car, bookingOption, mileage);
  };

  return (
    <div className="relative bg-white w-full min-h-[420px] rounded-2xl shadow-2xl flex flex-col md:flex-row overflow-hidden animate-fadeIn border border-neutral-200">
      {/* ── LEFT PANE: CAR DETAILS ── */}
        <div 
          className="relative w-full md:w-1/2 p-6 md:p-8 flex flex-col items-center justify-between text-center overflow-hidden shrink-0"
          style={{
            background: 'linear-gradient(to bottom, #725845 0%, #16181b 75%, #0a0a0c 100%)'
          }}
        >
          {/* Header text */}
          <div className="z-10 w-full">
            <h3 className="font-condensed font-black text-4xl text-white uppercase tracking-wide leading-none drop-shadow-md">
              {car.name}
            </h3>
            <p className="text-white/90 font-bold text-sm mt-2">{car.category}</p>
          </div>
          
          {/* Car Image */}
          <div className="z-10 flex-grow flex items-center justify-center my-2">
            <img 
              src={car.image} 
              alt={car.name}
              className="w-full max-w-[340px] h-auto object-contain drop-shadow-2xl scale-110" 
            />
          </div>

          {/* Specs Footer */}
          <div className="z-10 w-full flex flex-col items-center gap-5 mt-auto">
            {/* Premium Pill */}
            <div className="bg-[#C5A059] text-white px-3.5 py-1 rounded-full text-[11px] font-bold flex items-center gap-1.5 shadow-md w-fit">
              Premium Brand <Info className="w-3.5 h-3.5" />
            </div>
            
            <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-[13px] font-bold text-white w-full">
              <span className="flex items-center gap-1.5"><User className="w-4 h-4 text-white"/> {car.seats} Seats</span>
              <span className="flex items-center gap-1.5"><Briefcase className="w-4 h-4 text-white"/> {car.suitcases} Suitcase(s)</span>
              <span className="flex items-center gap-1.5"><Briefcase className="w-4 h-4 text-white"/> {car.bags} Bag(s)</span>
              <span className="flex items-center gap-1.5">
                <span className="w-4 h-4 bg-white text-black rounded flex items-center justify-center text-[11px] font-black leading-none">A</span>
                {car.transmission}
              </span>
            </div>
            
            <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-[13px] font-bold text-white w-full">
              <span className="flex items-center gap-1.5">🚘 {car.doors} Doors</span>
              {car.gps && <span className="flex items-center gap-1.5"><Navigation className="w-4 h-4 text-white"/> GPS</span>}
              <span className="flex items-center gap-1.5">
                👤 Minimum age of the youngest driver: {car.minAge}
              </span>
            </div>
          </div>
        </div>

        {/* ── RIGHT PANE: BOOKING OPTIONS ── */}
        <div className="w-full md:w-1/2 bg-white flex flex-col relative shrink-0 min-h-[420px]">
          
          <div className="p-6 md:px-8 flex-grow overflow-y-auto pb-36">
            <div className="flex items-center justify-between mb-4">
              <h4 className="font-bold text-[14px] text-[#191919]">Booking option</h4>
              <button onClick={onClose} className="text-neutral-900 hover:text-black">
                <X className="w-5 h-5 stroke-[2]" />
              </button>
            </div>
            
            {/* Booking option cards */}
            <div className="space-y-2 mb-6">
              {/* Best Price */}
              <div 
                onClick={() => setBookingOption('bestPrice')}
                className={`border rounded-lg p-3.5 flex cursor-pointer transition-colors ${bookingOption === 'bestPrice' ? 'border-[2px] border-[#191919] shadow-sm' : 'border-neutral-200 hover:border-neutral-300'}`}
              >
                <div className={`flex-shrink-0 w-5 h-5 rounded-full border-[2px] flex items-center justify-center mr-3.5 mt-0.5 ${bookingOption === 'bestPrice' ? 'border-[#191919]' : 'border-neutral-200'}`}>
                  {bookingOption === 'bestPrice' && <div className="w-2.5 h-2.5 bg-[#191919] rounded-full" />}
                </div>
                <div className="flex-grow">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-[#191919] text-[13px]">Best price</span>
                    <span className="font-bold text-[#191919] text-[12px] flex items-center gap-1">
                      Included <Info className="w-3.5 h-3.5 text-neutral-800" />
                    </span>
                  </div>
                  <p className="text-neutral-500 text-[12px] mt-0.5 pr-6 leading-snug">Pay now, cancel and rebook for a fee</p>
                </div>
              </div>
              
              {/* Stay Flexible */}
              <div 
                onClick={() => setBookingOption('stayFlexible')}
                className={`border rounded-lg p-3.5 flex cursor-pointer transition-colors ${bookingOption === 'stayFlexible' ? 'border-[2px] border-[#191919] shadow-sm' : 'border-neutral-200 hover:border-neutral-300'}`}
              >
                <div className={`flex-shrink-0 w-5 h-5 rounded-full border-[2px] flex items-center justify-center mr-3.5 mt-0.5 ${bookingOption === 'stayFlexible' ? 'border-[#191919]' : 'border-neutral-200'}`}>
                  {bookingOption === 'stayFlexible' && <div className="w-2.5 h-2.5 bg-[#191919] rounded-full" />}
                </div>
                <div className="flex-grow">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-[#191919] text-[13px]">Stay flexible</span>
                    <div className="flex items-center gap-2">
                      <span className="bg-[#C5A059] text-white text-[10px] font-bold px-2 py-0.5 rounded-full">Popular</span>
                      <span className="font-bold text-[#191919] text-[12px] flex items-center gap-1">
                        + $ {stayFlexibleRate.toFixed(2)} / day <Info className="w-3.5 h-3.5 text-neutral-800" />
                      </span>
                    </div>
                  </div>
                  <p className="text-neutral-500 text-[12px] mt-0.5 pr-4 leading-snug">Pay at pickup, free cancellation and rebooking any time before pickup time</p>
                </div>
              </div>
            </div>

            <h4 className="font-bold text-[14px] text-[#191919] mb-4">Mileage</h4>
            
            {/* Mileage options */}
            <div className="space-y-2">
              {/* Included Mileage */}
              <div 
                onClick={() => setMileage('included')}
                className={`border rounded-lg p-3.5 flex cursor-pointer transition-colors ${mileage === 'included' ? 'border-[2px] border-[#191919] shadow-sm' : 'border-neutral-200 hover:border-neutral-300'}`}
              >
                <div className={`flex-shrink-0 w-5 h-5 rounded-full border-[2px] flex items-center justify-center mr-3.5 mt-0.5 ${mileage === 'included' ? 'border-[#191919]' : 'border-neutral-200'}`}>
                  {mileage === 'included' && <div className="w-2.5 h-2.5 bg-[#191919] rounded-full" />}
                </div>
                <div className="flex-grow">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-[#191919] text-[13px]">2,820 km</span>
                    <span className="font-bold text-[#191919] text-[12px]">Included</span>
                  </div>
                  <p className="text-neutral-500 text-[12px] mt-0.5 leading-snug">+$0.91 for every additional km</p>
                </div>
              </div>
              
              {/* Unlimited Mileage */}
              <div 
                onClick={() => setMileage('unlimited')}
                className={`border rounded-lg p-3.5 flex cursor-pointer transition-colors ${mileage === 'unlimited' ? 'border-[2px] border-[#191919] shadow-sm' : 'border-neutral-200 hover:border-neutral-300'}`}
              >
                <div className={`flex-shrink-0 w-5 h-5 rounded-full border-[2px] flex items-center justify-center mr-3.5 mt-0.5 ${mileage === 'unlimited' ? 'border-[#191919]' : 'border-neutral-200'}`}>
                  {mileage === 'unlimited' && <div className="w-2.5 h-2.5 bg-[#191919] rounded-full" />}
                </div>
                <div className="flex-grow">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-[#191919] text-[13px]">Unlimited kilometers</span>
                    <span className="font-bold text-[#191919] text-[12px]">
                      + $ {unlimitedMileageRate.toFixed(2)} / day
                    </span>
                  </div>
                  <p className="text-neutral-500 text-[12px] mt-0.5 leading-snug">All kilometers are included in the price</p>
                </div>
              </div>
            </div>

          </div>

          {/* ── FOOTER STICKY ── */}
          <div className="absolute bottom-0 left-0 right-0 bg-white border-t border-[#e5e5e5] px-6 py-4 flex flex-col gap-4 shadow-[0_-10px_15px_-10px_rgba(0,0,0,0.05)]">
            <div className="flex justify-between items-start">
              <div className="flex flex-col">
                <span className="font-bold text-[16px] text-[#191919]">Total</span>
                <button 
                  onClick={() => setIsPriceDetailsModalOpen(true)}
                  className="text-[#191919] font-bold text-[13px] underline hover:text-[#C5A059] mt-1 text-left transition-colors w-fit"
                >
                  Price details
                </button>
              </div>
              <span className="font-black text-[22px] text-[#191919]">${totalRate.toFixed(2)}</span>
            </div>
            
            <button 
              onClick={handleNext}
              className="bg-[#C5A059] hover:bg-[#A88746] active:scale-95 text-white w-full py-3.5 rounded-lg font-bold text-[16px] transition-all flex items-center justify-center"
            >
              Next
            </button>
          </div>

        </div>
      <PriceDetailsModal 
        isOpen={isPriceDetailsModalOpen} 
        onClose={() => setIsPriceDetailsModalOpen(false)} 
        totalPrice={totalRate} 
      />
    </div>
  );
}

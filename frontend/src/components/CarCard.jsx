import React from 'react';
import { User, Briefcase, Info, Check, Tag } from 'lucide-react';

export default function CarCard({ car, onClick, index = 0, viewMode = 'results', isSelected = false }) {
  const getCardTitle = () => {
    let cat = car.category;
    // Remove body types from the main title category text
    cat = cat.replace(/SUV|Convertible|Sedan|Sports|Electric|Automatic|Car/ig, '').trim();
    return `${cat.toUpperCase()} (${car.name.toUpperCase()})`;
  };

  const getCardSubtitle = () => {
    const catLower = car.category.toLowerCase();
    const bodyType = catLower.includes('suv')
      ? 'SUV'
      : catLower.includes('convertible')
        ? 'Convertible'
        : catLower.includes('sports')
          ? 'Sports'
          : catLower.includes('electric')
            ? 'Electric'
            : 'Sedan';
    return `or similar | ${bodyType}`;
  };

  // Fleet View variant (Spotlight background, check availability button, no pricing)
  if (viewMode === 'fleet') {
    return (
      <div
        onClick={() => onClick(car)}
        className="relative w-full h-[400px] rounded-2xl overflow-hidden p-7 cursor-pointer transform hover:-translate-y-1 hover:shadow-2xl transition-all duration-300 group flex flex-col justify-between border border-neutral-800/60 shadow-xl select-none bg-gradient-to-br from-[#1c1c1c] to-[#0a0a0a]"
      >
        {/* Top Details */}
        <div className="z-10 relative text-left">
          <h3 className="font-condensed font-black text-[22px] md:text-2xl text-white tracking-wide uppercase leading-tight group-hover:text-[#C5A059] premium-transition">
            {getCardTitle()}
          </h3>
          <p className="text-xs font-bold text-neutral-400 mt-1">
            {getCardSubtitle()}
          </p>

          {/* Feature Badges Row (Single horizontal row) */}
          <div className="flex flex-wrap items-center gap-2 mt-4 text-[11px] font-bold">
            <span className="bg-white/10 text-white px-2.5 py-1.5 rounded-full flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-white stroke-[2.5]" /> {car.seats}
            </span>
            <span className="bg-white/10 text-white px-2.5 py-1.5 rounded-full flex items-center gap-1.5">
              <Briefcase className="w-3.5 h-3.5 text-white stroke-[2.5]" /> {car.suitcases}
            </span>
            <span className="bg-white/10 text-white px-2.5 py-1.5 rounded-full flex items-center gap-1.5">
              <span className="w-4 h-4 bg-white text-black rounded flex items-center justify-center text-[9px] font-black leading-none">
                {car.transmission === 'Automatic' ? 'A' : 'M'}
              </span>
              {car.transmission}
            </span>
          </div>
        </div>

        {/* Studio Background Gradient matching reference image */}
        <div
          className="absolute inset-0 z-0 pointer-events-none transition-transform duration-700 group-hover:scale-105"
          style={{
            background: 'linear-gradient(to bottom, #1b1d1f 0%, #2b2f33 35%, #464f54 55%, #8c9da3 75%, #131416 85%, #0e0e10 100%)'
          }}
        >
          {/* Add a subtle radial glow in the center to make it look like a spotlight on the wall */}
          <div
            className="absolute inset-0 opacity-60"
            style={{
              background: 'radial-gradient(120% 60% at 50% 75%, #a6b8be 0%, transparent 50%)'
            }}
          />
        </div>

        {/* Center Car Image */}
        <div className="absolute inset-0 z-0 pointer-events-none select-none overflow-hidden flex flex-col items-center justify-center">
          <img
            src={car.image}
            alt={car.name}
            className="relative z-10 w-[85%] h-auto object-contain translate-y-4 transform group-hover:scale-[1.04] transition-all duration-500 ease-out drop-shadow-2xl"
            style={car.image.endsWith('.webp') ? { mixBlendMode: 'multiply' } : {}}
          />
        </div>

        {/* Bottom Check Availability Button */}
        <div className="z-10 text-left mt-auto">
          <button
            type="button"
            className="border-[1.5px] border-white/80 hover:border-white hover:bg-white hover:text-black text-white text-xs font-bold uppercase tracking-wider px-6 py-2.5 rounded-full transition-all duration-200"
          >
            Check availability
          </button>
        </div>
      </div>
    );
  }

  // Search Results View variant (Dark bronze gradient, pricing details, mileage info, no button, watermark)
  return (
    <div className={`relative ${isSelected ? 'z-40' : 'z-10'}`}>
      <div
        onClick={() => onClick(car)}
        className={`relative w-full h-[450px] rounded-3xl overflow-hidden p-7 cursor-pointer transform hover:-translate-y-1 hover:shadow-2xl transition-all duration-300 group flex flex-col justify-between shadow-xl select-none bg-[#101010] ${isSelected ? 'border-[3px] border-[#C5A059]' : 'border border-neutral-800/40 hover:border-neutral-400 hover:ring-[5px] hover:ring-inset hover:ring-white'}`}
      >
        {/* Background Gradient Layers */}
        <div className="absolute inset-0 pointer-events-none z-0 bg-[#0a0a0a]">
          {/* Top right orange glow */}
          <div
            className="absolute inset-0 opacity-80"
            style={{ background: 'radial-gradient(circle at 100% 0%, #853d19 0%, transparent 50%)' }}
          ></div>

          {/* Studio floor horizon line */}
          <div
            className="absolute inset-0 opacity-90"
            style={{
              background: 'linear-gradient(to bottom, transparent 35%, #2a2d33 50%, #abbbd0 66%, #0a0a0a 76%, #0a0a0a 100%)'
            }}
          ></div>
        </div>
        {/* Background watermark parallelogram badge */}
        {index === 0 && (
          <div className="absolute right-6 top-[35%] z-0 pointer-events-none select-none transform rotate-[-8deg] opacity-75">
            <div className="border-[2px] border-white/40 bg-white/5 px-6 py-4 rounded-md skew-x-[-15deg] text-center">
              <div className="font-condensed font-black text-xl text-white tracking-widest leading-none">TOP</div>
              <div className="font-condensed font-black text-xl text-white tracking-widest leading-none mt-1">PICK</div>
            </div>
          </div>
        )}
        {index === 1 && (
          <div className="absolute right-6 top-[35%] z-0 pointer-events-none select-none transform rotate-[-8deg] opacity-75">
            <div className="border-[2px] border-white/40 bg-white/5 px-6 py-4 rounded-md skew-x-[-15deg] text-center">
              <div className="font-condensed font-black text-xl text-white tracking-widest leading-none">HIGHLY</div>
              <div className="font-condensed font-black text-xl text-white tracking-widest leading-none mt-1">RATED</div>
            </div>
          </div>
        )}

        {/* Top Details */}
        <div className="z-10 relative text-left">
          <h3 className="font-condensed font-black text-[22px] md:text-2xl text-white tracking-wide uppercase leading-tight group-hover:text-[#C5A059] premium-transition">
            {car.name.toUpperCase()}
          </h3>
          <p className="text-xs font-bold text-neutral-200 mt-1">
            {car.category} {car.transmission}
          </p>

          {/* Feature Badges Row */}
          <div className="flex flex-wrap items-center gap-2 mt-3.5 text-[10px] font-bold">
            {car.isGuaranteedModel ? (
              <span className="bg-[#1A1C20] border border-neutral-800 text-neutral-300 px-3 py-1 rounded-full flex items-center gap-1 text-[10px] font-bold">
                Guaranteed model <Info className="w-3 h-3 text-neutral-400" />
              </span>
            ) : (
              <span className="bg-[#C43F0E] text-white px-3 py-1 rounded-full flex items-center gap-1 text-[10px] font-bold">
                Premium Brand <Info className="w-3 h-3 text-white" />
              </span>
            )}
            <span className="bg-white/10 text-white px-3 py-1 rounded-full flex items-center gap-1.5 text-[10px] font-bold">
              <User className="w-3.5 h-3.5 text-white stroke-[2.5]" /> {car.seats}
            </span>
            <span className="bg-white/10 text-white px-3 py-1 rounded-full flex items-center gap-1.5 text-[10px] font-bold">
              <Briefcase className="w-3.5 h-3.5 text-white stroke-[2.5]" /> {car.suitcases}
            </span>
            <span className="bg-white/10 text-white px-3 py-1 rounded-full flex items-center gap-1.5 text-[10px] font-bold">
              <span className="w-3.5 h-3.5 bg-white text-black rounded flex items-center justify-center text-[9px] font-black leading-none mr-0.5">
                {car.transmission === 'Automatic' ? 'A' : 'M'}
              </span>
              {car.transmission}
            </span>
          </div>
        </div>

        {/* Center Car Image */}
        <div className="absolute inset-0 z-0 pointer-events-none select-none overflow-hidden flex items-center justify-center">
          <img
            src={car.image}
            alt={car.name}
            className="w-[85%] h-auto object-contain translate-y-4 transform group-hover:scale-[1.04] transition-all duration-500 ease-out"
            style={car.image.endsWith('.webp') ? { mixBlendMode: 'multiply' } : {}}
          />
        </div>

        {/* Bottom Pricing & Mileage block */}
        <div className="z-10 text-left mt-auto">
          <div className="flex flex-col gap-1">
            {/* Hot offer pill */}
            {car.isHotOffer && (
              <div className="flex items-center gap-2 mb-1.5">
                <span className="bg-[#C43F0E] text-white px-3 py-1 rounded-full flex items-center gap-1 text-[9px] font-extrabold uppercase tracking-wider w-fit">
                  🔥 Hot offer
                </span>
              </div>
            )}

            {/* Unlimited kilometers available */}
            <div className="flex items-center gap-1.5 text-xs text-white font-semibold mb-1.5">
              <Check className="w-3.5 h-3.5 text-green-500 stroke-[3]" />
              <span>Unlimited kilometers available</span>
            </div>

            {/* Price row */}
            <div className="flex items-baseline gap-0.5">
              <span className="text-[#C5A059] text-3xl font-black font-condensed">$</span>
              <span className="text-[#C5A059] text-3xl font-black font-condensed">{car.baseRate}</span>
              <span className="text-[#C5A059] text-lg font-black font-condensed">.44</span>
              <span className="text-[#C5A059] text-xs font-bold uppercase tracking-wider ml-0.5">/day</span>
              <span className="text-neutral-400 text-xs font-semibold ml-2.5">
                ${car.baseRate * 2}.88 total
              </span>
            </div>

            {/* Bottom Promo bar */}
            <div className="bg-[#381a0b] -mx-7 -mb-7 py-3.5 flex items-center justify-center gap-2 border-t border-white/5 mt-3 select-none relative z-10">
              <Tag className="w-3.5 h-3.5 text-white" />
              <span className="text-xs text-white font-bold underline hover:text-[#C5A059] transition-colors cursor-pointer tracking-wide">
                Unlock member rates: Save up to 20%
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Downward pointing caret for selected state */}
      {isSelected && (
        <div className="absolute -bottom-[10px] left-1/2 -translate-x-1/2 w-5 h-5 bg-[#C5A059] rotate-45 z-[-1]" />
      )}
    </div>
  );
}

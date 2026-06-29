import React, { useState } from 'react';
import { X, ChevronDown, ChevronUp } from 'lucide-react';
import { useUserSettings } from '../hooks/useUserSettings';

export default function PriceDetailsModal({ isOpen, onClose, totalPrice }) {
  const [taxesExpanded, setTaxesExpanded] = useState(false);
  const { currencySymbol } = useUserSettings();

  if (!isOpen) return null;

  // Mock calculations for the visual demonstration
  // The screenshot shows 15 days x $79.98 = $1199.64 and $327.62 taxes = $1527.25
  // If a different total is provided, we approximate the values
  const total = Number(totalPrice) || 1527.25;
  const days = 15;
  const baseRate = (total / 1.273).toFixed(2);
  const rentalCharges = (baseRate * 1).toFixed(2); // assuming 1 quantity of the base package
  const taxes = (total - rentalCharges).toFixed(2);
  const perDay = (rentalCharges / days).toFixed(2);

  const formattedTotal = total.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  const formattedRentalCharges = Number(rentalCharges).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  const formattedTaxes = Number(taxes).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-300">
      <div className="bg-white rounded-2xl w-full max-w-[500px] relative shadow-2xl animate-in zoom-in-95 duration-300 flex flex-col max-h-[90vh]">
        
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute right-4 top-4 p-2 rounded-full hover:bg-neutral-100 transition-colors z-10"
        >
          <X className="w-5 h-5 text-[#191919]" />
        </button>

        <div className="p-8 pb-6">
          <h2 className="text-2xl font-black font-condensed uppercase tracking-wider text-[#191919] mb-8">
            Price Details
          </h2>
          
          <div className="space-y-6">
            <div>
              <div className="font-bold text-[15px] text-[#191919] mb-2">Rental charges</div>
              <div className="flex justify-between items-center text-[14px] text-neutral-600">
                <span>{days} Rental days x {currencySymbol}{perDay}</span>
                <span>{currencySymbol}{formattedRentalCharges}</span>
              </div>
            </div>

            <div className="border-t border-neutral-200 pt-6">
              <button 
                onClick={() => setTaxesExpanded(!taxesExpanded)}
                className="w-full flex justify-between items-center text-[15px] font-bold text-[#191919] group"
              >
                <div className="flex items-center gap-1">
                  Taxes and fees
                  {taxesExpanded ? (
                    <ChevronUp className="w-4 h-4 text-neutral-500 group-hover:text-black transition-colors" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-neutral-500 group-hover:text-black transition-colors" />
                  )}
                </div>
                <span>{currencySymbol}{formattedTaxes}</span>
              </button>
              
              {taxesExpanded && (
                <div className="mt-3 space-y-2 text-[14px] text-neutral-600 animate-in slide-in-from-top-2 duration-200">
                  <div className="flex justify-between">
                    <span>Location surcharge (20%)</span>
                    <span>{currencySymbol}{(taxes * 0.55).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Vehicle registration fee</span>
                    <span>{currencySymbol}{(taxes * 0.15).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>VAT (19%)</span>
                    <span>{currencySymbol}{(taxes * 0.30).toFixed(2)}</span>
                  </div>
                </div>
              )}
            </div>
            
            <div className="border-t border-black pt-5 flex justify-between items-center">
              <div className="font-bold text-[16px] text-[#191919]">Total (incl. tax)</div>
              <div className="font-black text-[20px] text-[#191919]">
                {currencySymbol}{formattedTotal}
              </div>
            </div>
          </div>
        </div>
        
      </div>
    </div>
  );
}

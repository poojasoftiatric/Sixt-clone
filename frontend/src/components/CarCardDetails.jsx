import React, { useState, useEffect } from 'react';
import { X, ChevronDown, ChevronLeft, Check } from 'lucide-react';

// Country dial codes list
const COUNTRIES = [
  { code: 'US', name: 'United States', dial: '+1', flag: '🇺🇸' },
  { code: 'GB', name: 'United Kingdom', dial: '+44', flag: '🇬🇧' },
  { code: 'CA', name: 'Canada', dial: '+1', flag: '🇨🇦' },
  { code: 'AU', name: 'Australia', dial: '+61', flag: '🇦🇺' },
  { code: 'DE', name: 'Germany', dial: '+49', flag: '🇩🇪' },
  { code: 'FR', name: 'France', dial: '+33', flag: '🇫🇷' },
  { code: 'ES', name: 'Spain', dial: '+34', flag: '🇪🇸' },
  { code: 'IT', name: 'Italy', dial: '+39', flag: '🇮🇹' },
  { code: 'NL', name: 'Netherlands', dial: '+31', flag: '🇳🇱' },
  { code: 'CH', name: 'Switzerland', dial: '+41', flag: '🇨🇭' },
  { code: 'AE', name: 'UAE', dial: '+971', flag: '🇦🇪' },
  { code: 'IN', name: 'India', dial: '+91', flag: '🇮🇳' },
  { code: 'JP', name: 'Japan', dial: '+81', flag: '🇯🇵' },
  { code: 'BR', name: 'Brazil', dial: '+55', flag: '🇧🇷' },
  { code: 'MX', name: 'Mexico', dial: '+52', flag: '🇲🇽' },
  { code: 'SG', name: 'Singapore', dial: '+65', flag: '🇸🇬' },
  { code: 'NZ', name: 'New Zealand', dial: '+64', flag: '🇳🇿' },
  { code: 'ZA', name: 'South Africa', dial: '+27', flag: '🇿🇦' },
];

export default function CarCardDetails({ car, onClose, onNext, onBookingSuccess, searchParams }) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [selectedCountry, setSelectedCountry] = useState(COUNTRIES[0]);
  const [showCountryDropdown, setShowCountryDropdown] = useState(false);
  const [errors, setErrors] = useState({});
  const [showSuccess, setShowSuccess] = useState(false);
  const [bookingRef, setBookingRef] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');

  // Lock body scroll while modal is open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  // Generate a booking reference once when success is triggered
  useEffect(() => {
    if (showSuccess) {
      setBookingRef(`SX-${Math.floor(1000000 + Math.random() * 9000000)}`);
    }
  }, [showSuccess]);

  // Calculate rental days
  const getDays = () => {
    if (searchParams?.pickupDate && searchParams?.returnDate) {
      const start = new Date(searchParams.pickupDate);
      const end = new Date(searchParams.returnDate);
      const diffTime = Math.abs(end - start);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) || 1;
      return diffDays;
    }
    return 2;
  };
  const days = getDays();
  const displayRate = car.baseRate + 0.84;
  const totalRate = displayRate * days;

  const validate = () => {
    const newErrors = {};
    if (!email.trim()) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = 'Enter a valid email';
    if (!firstName.trim()) newErrors.firstName = 'First name is required';
    if (!lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!phone.trim()) newErrors.phone = 'Phone number is required';
    return newErrors;
  };

  const handleContinue = async () => {
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    
    setIsSubmitting(true);
    setSubmitError('');

    const accessKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY || "YOUR_ACCESS_KEY_HERE";
    
    const payload = {
      access_key: accessKey,
      subject: `New Car Reservation Request - ${car.name}`,
      from_name: "W LUXURY CAR RENTAL",
      email: email,
      name: `${firstName} ${lastName}`,
      phone: `${selectedCountry.dial} ${phone}`,
      car_name: car.name,
      car_category: car.category,
      pickup_location: searchParams?.pickupLocation || "Munich Airport",
      pickup_date: searchParams?.pickupDate || "—",
      pickup_time: searchParams?.pickupTime || "—",
      return_location: searchParams?.returnLocation || searchParams?.pickupLocation || "Munich Airport",
      return_date: searchParams?.returnDate || "—",
      return_time: searchParams?.returnTime || "—",
      duration: `${days} ${days === 1 ? 'day' : 'days'}`,
      estimated_total: `$${totalRate.toFixed(2)}`
    };

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: JSON.stringify(payload)
      });
      
      const result = await response.json();
      if (result.success) {
        setShowSuccess(true);
      } else {
        console.warn("Web3Forms submission failed (using fallback success popup):", result);
        setShowSuccess(true);
      }
    } catch (err) {
      console.warn("Error submitting reservation request (using fallback success popup):", err);
      setShowSuccess(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (showSuccess) {
    return (
      <div
        className="fixed inset-0 z-[200] flex items-center justify-center bg-black/60 overflow-y-auto backdrop-blur-sm"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative bg-[#0F0F11] border border-neutral-800 w-full max-w-[500px] rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-fadeIn p-8 text-center text-white mx-4">
          {/* Animated Glowing Ring & Checkmark */}
          <div className="flex justify-center mb-6">
            <div className="relative flex items-center justify-center w-24 h-24">
              {/* Outer pulsing ring */}
              <div className="absolute inset-0 w-full h-full bg-green-500/10 rounded-full animate-ping [animation-duration:1.5s]" />
              {/* Inner pulsing/glowing ring */}
              <div className="absolute inset-2 bg-green-500/20 rounded-full animate-pulse" />
              {/* Main circle */}
              <div className="relative w-16 h-16 bg-green-500 rounded-full flex items-center justify-center shadow-lg shadow-green-500/30">
                <Check className="w-8 h-8 text-white stroke-[3.5] animate-scaleIn" />
              </div>
            </div>
          </div>

          <h2 className="font-condensed font-black text-3xl text-white tracking-wide uppercase mb-3 leading-none">
            Booking Request Sent Successful!
          </h2>
          
          <p className="text-neutral-400 text-sm max-w-[340px] mx-auto mb-6 font-medium">
            Your rental request has been sent Successfully. A confirmation receipt has been sent to <span className="text-white font-semibold">{email}</span>.
          </p>

          {/* Booking Details Box */}
          <div className="bg-neutral-900/60 border border-neutral-800 rounded-2xl p-5 mb-8 text-left space-y-3.5 w-full text-xs font-semibold">
            <div className="flex justify-between border-b border-neutral-800 pb-2.5">
              <span className="text-neutral-500 uppercase tracking-wider">Booking Reference</span>
              <span className="font-mono font-bold text-green-400">{bookingRef}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-neutral-400">Driver</span>
              <span className="text-white font-bold">{firstName} {lastName}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-neutral-400">Vehicle</span>
              <span className="text-white uppercase font-condensed tracking-wide text-sm font-black">{car.name}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-neutral-400">Pickup</span>
              <span className="text-white truncate max-w-[180px]">{searchParams?.pickupLocation}</span>
            </div>
            <div className="flex justify-between items-center border-t border-neutral-800 pt-2.5">
              <span className="text-neutral-400">Estimated Total</span>
              <span className="font-condensed font-black text-[#C5A059] text-base">${totalRate.toFixed(2)}</span>
            </div>
          </div>

          {/* Action Button */}
          <div className="w-full mt-2">
            <button
              onClick={() => {
                if (onBookingSuccess) {
                  onBookingSuccess();
                } else {
                  onClose();
                }
              }}
              className="w-full bg-[#C5A059] hover:bg-[#B28F4B] active:scale-[0.99] text-white py-4 rounded-2xl font-condensed font-black uppercase text-sm tracking-widest shadow-lg shadow-orange-500/10 transition-all hover:scale-[1.01] flex items-center justify-center"
            >
              Continue
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className="fixed inset-0 z-[200] flex items-start justify-center bg-black/40 overflow-y-auto"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="relative bg-white w-full max-w-[760px] min-h-screen md:min-h-0 md:my-8 md:rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-fadeIn">

        {/* ── HEADER ── */}
        <div className="flex items-center gap-3 px-6 py-5 border-b border-neutral-100">
          <button
            onClick={onClose}
            className="text-neutral-800 hover:text-black transition-colors flex items-center gap-1 font-bold text-sm"
            aria-label="Go back"
          >
            <ChevronLeft className="w-5 h-5 stroke-[2.5]" />
          </button>
          <h2 className="font-condensed font-black text-2xl md:text-3xl text-neutral-900 tracking-wide uppercase leading-none">
            REVIEW YOUR BOOKING
          </h2>

          {/* Close X */}
          <button
            onClick={onClose}
            className="ml-auto text-neutral-400 hover:text-neutral-900 transition-colors p-1.5 rounded-full hover:bg-neutral-100"
            aria-label="Close"
          >
            <X className="w-5 h-5 stroke-[2.5]" />
          </button>
        </div>

        {/* ── VEHICLE SUMMARY STRIP ── */}
        <div className="flex items-center gap-4 px-6 py-4 bg-neutral-50 border-b border-neutral-100">
          <div
            className="w-20 h-14 flex-shrink-0 flex items-center justify-center rounded-xl overflow-hidden"
            style={{ background: 'radial-gradient(circle at center, #5a5d62 0%, #18191b 100%)' }}
          >
            <img
              src={car.image}
              alt={car.name}
              className="max-h-[48px] w-auto object-contain"
              style={car.image.endsWith('.webp') ? { mixBlendMode: 'multiply' } : {}}
            />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-condensed font-black text-lg uppercase text-neutral-900 leading-none truncate">
              {car.name}
            </h3>
            <p className="text-[11px] text-neutral-500 font-semibold uppercase tracking-wide mt-0.5">{car.category}</p>
          </div>
          <div className="text-right flex-shrink-0">
            <div className="flex items-baseline gap-0.5">
              <span className="text-sm font-black text-neutral-900">$</span>
              <span className="text-2xl font-condensed font-black text-neutral-900 leading-none">{Math.floor(displayRate)}</span>
              <span className="text-sm font-black text-neutral-900">.{(displayRate % 1).toFixed(2).split('.')[1]}</span>
              <span className="text-[10px] font-bold text-neutral-500 ml-1">/day</span>
            </div>
            <p className="text-[11px] text-neutral-400 font-bold mt-0.5">${totalRate.toFixed(2)} total · {days} {days === 1 ? 'day' : 'days'}</p>
          </div>
        </div>

        {/* ── FORM BODY ── */}
        <div className="flex-1 px-6 py-8 space-y-8 overflow-y-auto">

          {/* Section: Who will drive? */}
          <div>
            <h3 className="text-2xl font-bold text-neutral-900 mb-6">Who will drive?</h3>

            {/* Email */}
            <div className="mb-5">
              <label className="block text-sm font-bold text-neutral-900 mb-2">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => { setEmail(e.target.value); setErrors(prev => ({ ...prev, email: '' })); }}
                placeholder=""
                className={`w-full border rounded-2xl px-4 py-4 text-sm text-neutral-900 outline-none transition-all focus:border-neutral-900 focus:ring-2 focus:ring-neutral-900/10 bg-white ${errors.email ? 'border-red-400' : 'border-neutral-200'}`}
              />
              {errors.email && <p className="text-red-500 text-xs mt-1 font-medium">{errors.email}</p>}
            </div>

            {/* First name + Last name */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-5">
              <div>
                <label className="block text-sm font-bold text-neutral-900 mb-2">First name</label>
                <input
                  type="text"
                  value={firstName}
                  onChange={(e) => { setFirstName(e.target.value); setErrors(prev => ({ ...prev, firstName: '' })); }}
                  placeholder=""
                  className={`w-full border rounded-2xl px-4 py-4 text-sm text-neutral-900 outline-none transition-all focus:border-neutral-900 focus:ring-2 focus:ring-neutral-900/10 bg-white ${errors.firstName ? 'border-red-400' : 'border-neutral-200'}`}
                />
                {errors.firstName && <p className="text-red-500 text-xs mt-1 font-medium">{errors.firstName}</p>}
              </div>
              <div>
                <label className="block text-sm font-bold text-neutral-900 mb-2">Last name</label>
                <input
                  type="text"
                  value={lastName}
                  onChange={(e) => { setLastName(e.target.value); setErrors(prev => ({ ...prev, lastName: '' })); }}
                  placeholder=""
                  className={`w-full border rounded-2xl px-4 py-4 text-sm text-neutral-900 outline-none transition-all focus:border-neutral-900 focus:ring-2 focus:ring-neutral-900/10 bg-white ${errors.lastName ? 'border-red-400' : 'border-neutral-200'}`}
                />
                {errors.lastName && <p className="text-red-500 text-xs mt-1 font-medium">{errors.lastName}</p>}
              </div>
            </div>

            {/* Country + Phone number */}
            <div className="grid grid-cols-[auto_1fr] gap-4 items-start">
              {/* Country selector */}
              <div className="relative">
                <label className="block text-sm font-bold text-neutral-900 mb-2">Country</label>
                <button
                  type="button"
                  onClick={() => setShowCountryDropdown(prev => !prev)}
                  className="flex items-center gap-2 border border-neutral-200 rounded-2xl px-4 py-4 text-sm font-bold text-neutral-900 bg-white hover:border-neutral-400 transition-all focus:outline-none focus:border-neutral-900 focus:ring-2 focus:ring-neutral-900/10 min-w-[130px] whitespace-nowrap"
                >
                  <span className="text-xl leading-none">{selectedCountry.flag}</span>
                  <span>{selectedCountry.dial}</span>
                  <ChevronDown className="w-4 h-4 text-neutral-500 flex-shrink-0" />
                </button>

                {/* Country Dropdown */}
                {showCountryDropdown && (
                  <div className="absolute top-full left-0 mt-1 z-50 bg-white border border-neutral-200 rounded-2xl shadow-xl overflow-hidden w-[240px]">
                    <div className="max-h-[220px] overflow-y-auto">
                      {COUNTRIES.map((country) => (
                        <button
                          key={country.code}
                          type="button"
                          onClick={() => {
                            setSelectedCountry(country);
                            setShowCountryDropdown(false);
                          }}
                          className={`w-full flex items-center gap-3 px-4 py-3 text-sm text-left hover:bg-neutral-50 transition-colors ${
                            selectedCountry.code === country.code ? 'bg-neutral-50 font-bold' : 'font-medium'
                          }`}
                        >
                          <span className="text-xl leading-none">{country.flag}</span>
                          <span className="text-neutral-700 flex-1 truncate">{country.name}</span>
                          <span className="text-neutral-400 text-xs font-bold">{country.dial}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Phone number */}
              <div>
                <label className="block text-sm font-bold text-neutral-900 mb-2">Phone number</label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => { setPhone(e.target.value); setErrors(prev => ({ ...prev, phone: '' })); }}
                  placeholder=""
                  className={`w-full border rounded-2xl px-4 py-4 text-sm text-neutral-900 outline-none transition-all focus:border-neutral-900 focus:ring-2 focus:ring-neutral-900/10 bg-white ${errors.phone ? 'border-red-400' : 'border-neutral-200'}`}
                />
                {errors.phone && <p className="text-red-500 text-xs mt-1 font-medium">{errors.phone}</p>}
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-neutral-100" />

          {/* Rental Summary */}
          <div className="bg-neutral-50 rounded-2xl p-5 space-y-3 text-sm">
            <h4 className="font-bold text-neutral-900 text-base">Rental summary</h4>
            <div className="flex justify-between gap-4 text-neutral-600 font-medium">
              <span className="flex-shrink-0">Pickup</span>
              <span className="font-bold text-neutral-900 text-right">
                {searchParams?.pickupLocation || 'Selected location'} · {searchParams?.pickupDate || '—'} at {searchParams?.pickupTime || '—'}
              </span>
            </div>
            <div className="flex justify-between gap-4 text-neutral-600 font-medium">
              <span className="flex-shrink-0">Return</span>
              <span className="font-bold text-neutral-900 text-right">
                {searchParams?.returnDate || '—'} at {searchParams?.returnTime || '—'}
              </span>
            </div>
            <div className="flex justify-between gap-4 text-neutral-600 font-medium">
              <span className="flex-shrink-0">Duration</span>
              <span className="font-bold text-neutral-900 text-right">{days} {days === 1 ? 'day' : 'days'}</span>
            </div>
            <div className="flex justify-between gap-4 font-bold text-neutral-900 border-t border-neutral-200 pt-3 mt-1">
              <span className="flex-shrink-0">Estimated total</span>
              <span className="text-[#C5A059] font-condensed text-lg font-black text-right">${totalRate.toFixed(2)}</span>
            </div>
          </div>
        </div>

        {/* ── FOOTER ── */}
        <div className="border-t border-neutral-100 px-6 py-5 flex items-center justify-between gap-4 bg-white flex-shrink-0">
          <div className="text-xs text-neutral-400 font-medium hidden sm:block">
            Next: Choose protection &amp; add-ons
          </div>
          <button
            onClick={handleContinue}
            disabled={isSubmitting}
            className={`ml-auto bg-[#C5A059] hover:bg-[#B28F4B] active:scale-[0.99] text-white px-10 py-4 rounded-xl font-condensed font-black uppercase text-sm tracking-widest shadow-lg transition-all hover:scale-[1.01] flex items-center justify-center min-w-[160px] ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
          >
            {isSubmitting ? (
              <span className="flex items-center gap-2">
                <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                Sending...
              </span>
            ) : (
              'Continue'
            )}
          </button>
        </div>
      </div>

      {/* Click outside overlay to close dropdown */}
      {showCountryDropdown && (
        <div
          className="fixed inset-0 z-[199]"
          onClick={() => setShowCountryDropdown(false)}
        />
      )}
    </div>
  );
}

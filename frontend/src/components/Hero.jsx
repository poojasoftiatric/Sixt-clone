import React, { useState, useEffect, useRef } from 'react';
import { Plane, Calendar, Clock, User, Info, RotateCcw, ChevronLeft, ChevronRight, Briefcase, Globe, Car, ShieldCheck, Check, Sparkles, Building, HandHeart, CarFront } from 'lucide-react';
import CarCard from './CarCard.jsx';

// Hardcoded location data matching the reference details
const stationsData = {
  'Munich Airport': {
    name: 'Munich Airport',
    address: 'Terminalstr. Mitte/MWZ, München, 85356, DE',
    hours: '05:00 AM - 11:59 PM',
    holidays: '05:00 AM - 11:59 PM'
  },
  'Frankfurt Airport': {
    name: 'Frankfurt Airport',
    address: 'Hugo-Eckener-Ring, Frankfurt am Main, 60549, DE',
    hours: '06:00 AM - 11:30 PM',
    holidays: '06:00 AM - 11:30 PM'
  },
  'San Francisco Int Airport': {
    name: 'San Francisco Int Airport',
    address: 'SFO Rental Car Center, San Francisco, CA 94128, US',
    hours: '05:00 AM - 11:59 PM',
    holidays: '05:00 AM - 11:59 PM'
  },
  'Los Angeles Int Airport': {
    name: 'Los Angeles Int Airport',
    address: '9000 Airport Blvd, Los Angeles, CA 90045, US',
    hours: '05:00 AM - 11:59 PM',
    holidays: '05:00 AM - 11:59 PM'
  },
  'New York City Long Island City': {
    name: 'New York City Long Island City',
    address: '21-16 44th Dr, Long Island City, NY 11101, US',
    hours: '07:00 AM - 07:00 PM',
    holidays: '08:00 AM - 04:00 PM'
  }
};

const SolidPlaneIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M21,16v-2l-8-5V3.5C13,2.67 12.33,2 11.5,2S10,2.67 10,3.5V9l-8,5v2l8-2.5V19l-2,1.5V22l3.5-1l3.5,1v-1.5L13,19v-5.5L21,16z"/>
  </svg>
);

const SolidCalendarIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M19 4h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V10h14v10zm0-12H5V6h14v2z"/>
  </svg>
);

// Calendar days for June, July, August 2026
const juneDays = [
  { day: null },
  { day: 1 }, { day: 2 }, { day: 3 }, { day: 4 }, { day: 5 }, { day: 6 },
  { day: 7 }, { day: 8 }, { day: 9 }, { day: 10 }, { day: 11 }, { day: 12 }, { day: 13 },
  { day: 14 }, { day: 15 }, { day: 16 }, { day: 17 }, { day: 18 }, { day: 19 }, { day: 20 },
  { day: 21 }, { day: 22 }, { day: 23 }, { day: 24 }, { day: 25 }, { day: 26 }, { day: 27 },
  { day: 28 }, { day: 29 }, { day: 30 }
];

const julyDays = [
  { day: null }, { day: null }, { day: null },
  { day: 1 }, { day: 2 }, { day: 3 }, { day: 4 }, { day: 5 }, { day: 6 }, { day: 7 },
  { day: 8 }, { day: 9 }, { day: 10 }, { day: 11 }, { day: 12 }, { day: 13 }, { day: 14 },
  { day: 15 }, { day: 16 }, { day: 17 }, { day: 18 }, { day: 19 }, { day: 20 }, { day: 21 },
  { day: 22 }, { day: 23 }, { day: 24 }, { day: 25 }, { day: 26 }, { day: 27 }, { day: 28 },
  { day: 29 }, { day: 30 }, { day: 31 }
];

const augustDays = [
  { day: null }, { day: null }, { day: null }, { day: null }, { day: null }, { day: null },
  { day: 1 }, { day: 2 }, { day: 3 }, { day: 4 }, { day: 5 }, { day: 6 }, { day: 7 },
  { day: 8 }, { day: 9 }, { day: 10 }, { day: 11 }, { day: 12 }, { day: 13 }, { day: 14 },
  { day: 15 }, { day: 16 }, { day: 17 }, { day: 18 }, { day: 19 }, { day: 20 }, { day: 21 },
  { day: 22 }, { day: 23 }, { day: 24 }, { day: 25 }, { day: 26 }, { day: 27 }, { day: 28 },
  { day: 29 }, { day: 30 }, { day: 31 }
];


// ── Time Picker Popup sub-component ──────────────────────────────────────────
const TIME_GROUPS = [
  {
    label: 'Early Morning',
    slots: ['5:00 AM', '5:30 AM', '6:00 AM', '6:30 AM', '7:00 AM', '7:30 AM'],
  },
  {
    label: 'Morning - afternoon',
    slots: [
      '8:00 AM', '8:30 AM', '9:00 AM', '9:30 AM',
      '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM',
      '12:00 PM', '12:30 PM', '1:00 PM', '1:30 PM',
      '2:00 PM', '2:30 PM', '3:00 PM', '3:30 PM',
      '4:00 PM', '4:30 PM',
    ],
  },
  {
    label: 'Evening',
    slots: [
      '5:00 PM', '5:30 PM', '6:00 PM', '6:30 PM',
      '7:00 PM', '7:30 PM', '8:00 PM', '8:30 PM',
    ],
  },
  {
    label: 'Night',
    slots: [
      '9:00 PM', '9:30 PM', '10:00 PM', '10:30 PM',
      '11:00 PM', '11:30 PM', '12:00 AM',
    ],
  },
];

function TimePickerPopup({ activeTimeField, currentTime, selectTime }) {
  const scrollRef = useRef(null);
  const selectedRef = useRef(null);

  // Auto-scroll to selected time slot when popup opens
  useEffect(() => {
    if (selectedRef.current && scrollRef.current) {
      const container = scrollRef.current;
      const el = selectedRef.current;
      const elTop = el.offsetTop;
      const elHeight = el.offsetHeight;
      const containerHeight = container.clientHeight;
      container.scrollTop = elTop - containerHeight / 2 + elHeight / 2;
    }
  }, []);

  return (
    <>
      {/* Header */}
      <div className="pt-5 pb-4 px-5">
        <p className="text-[16px] font-bold text-center text-neutral-900 mb-4">
          Select {activeTimeField} time
        </p>
        <div className="flex items-center gap-2">
          <Clock className="w-[14px] h-[14px] text-black stroke-[2.5]" />
          <span className="text-[13px] text-neutral-800 font-normal">
            {activeTimeField === 'return' ? '24-hour return' : 'Opening Times: -'}
          </span>
        </div>
      </div>

      {/* Scrollable body */}
      <div ref={scrollRef} className="max-h-[220px] overflow-y-auto px-5 pb-3">
        {TIME_GROUPS.map((group) => (
          <div key={group.label} className="mb-4">
            {/* Section heading */}
            <p className="text-[13px] font-bold text-neutral-900 mb-3">
              {group.label}
            </p>
            {/* Slot buttons */}
            <div className="grid grid-cols-2 gap-2">
              {group.slots.map((slot) => {
                const isSelected = slot === currentTime;
                return (
                  <button
                    key={slot}
                    ref={isSelected ? selectedRef : null}
                    type="button"
                    onClick={() => selectTime(slot, activeTimeField)}
                    className={`text-[13px] font-semibold py-3 px-3 rounded-xl text-center transition-colors premium-transition ${
                      isSelected
                        ? 'bg-[#191919] text-white'
                        : 'bg-[#fafafa] text-neutral-800 hover:bg-[#f3f3f3]'
                    }`}
                  >
                    {slot}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
// ─────────────────────────────────────────────────────────────────────────────
const moreSixtCards = [
  {
    title: "FASTER BOOKINGS. INSTANT REWARDS.",
    subtext: "Earn, skip the counter, redeem - all in one app.",
    buttonText: "Get the W App",
    image: "/assets/cars/more_sixt_app_bg.png",
    isApp: true
  },
  {
    title: "W ONE. LOYALTY REWARDED.",
    subtext: "You're ONE membership away from discounts and priority service.",
    buttonText: "Join for free",
    image: "/assets/cars/more_sixt_loyalty_bg.png"
  },
  {
    title: "W BUSINESS",
    subtext: "Custom mobility solutions for all businesses.",
    buttonText: "Register now",
    image: "/assets/cars/more_sixt_business_bg.png"
  },
  {
    title: "W+ CAR SUBSCRIPTION",
    subtext: "The better way of owning a car.",
    buttonText: "Learn more",
    image: "/assets/cars/more_sixt_subscription_bg.png"
  },
  {
    title: "W SHARE",
    subtext: "On-the-go flexibility with premium car sharing.",
    buttonText: "Learn more",
    image: "/assets/cars/more_sixt_share_bg.png"
  },
  {
    title: "W RIDE",
    subtext: "Sit back with your personal chauffeur.",
    buttonText: "Learn more",
    image: "/assets/cars/more_sixt_ride_bg.png"
  }
];

export default function Hero({ onSearch, initialMobilePanel, onPanelClosed, isDropdownMode = false, initialSearchParams = null }) {
  const [pickupLocation, setPickupLocation] = useState(initialSearchParams?.pickupLocation || 'Munich Airport');
  const [pickupDate, setPickupDate] = useState(initialSearchParams?.pickupDate || 'Jun 30');
  const [pickupTime, setPickupTime] = useState(initialSearchParams?.pickupTime || '12:00 PM');
  const [returnDate, setReturnDate] = useState(initialSearchParams?.returnDate || 'Jul 15');
  const [returnTime, setReturnTime] = useState(initialSearchParams?.returnTime || '12:00 PM');
  const [driverAge, setDriverAge] = useState(initialSearchParams?.driverAge || '30+');
  const [activeTab, setActiveTab] = useState('Cars');

  const [isDifferentReturn, setIsDifferentReturn] = useState(false);
  const [returnLocation, setReturnLocation] = useState('');
  const [showReturnPopup, setShowReturnPopup] = useState(false);
  const [hoveredReturnStationKey, setHoveredReturnStationKey] = useState('Munich Airport');

  // Popup triggers
  const [showLocationPopup, setShowLocationPopup] = useState(false);
  const [hoveredStationKey, setHoveredStationKey] = useState('Munich Airport');
  const [isSticky, setIsSticky] = useState(false);
  const [showCalendarPopup, setShowCalendarPopup] = useState(false);
  const [activeDateField, setActiveDateField] = useState(null); // 'pickup' or 'return'
  const [showTimePopup, setShowTimePopup] = useState(false);
  const [activeTimeField, setActiveTimeField] = useState(null); // 'pickup' or 'return'
  const [showAgeDropdown, setShowAgeDropdown] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [moreSixtSlide, setMoreSixtSlide] = useState(0);
  const [activeFaqIndex, setActiveFaqIndex] = useState(0);
  const [activeRegionTab, setActiveRegionTab] = useState('Australia');
  // Mobile step-by-step panel: null | 'location' | 'details' | 'calendar' | 'time-pickup' | 'time-return'
  const [mobilePanel, setMobilePanel] = useState(initialMobilePanel || null);

  useEffect(() => {
    if (initialMobilePanel) {
      setMobilePanel(initialMobilePanel);
    }
  }, [initialMobilePanel]);

  useEffect(() => {
    if (mobilePanel === null && onPanelClosed) {
      onPanelClosed();
    }
  }, [mobilePanel, onPanelClosed]);

  const handleScrollToListings = () => {
    const el = document.getElementById('listings-container');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    } else {
      onSearch({
        pickupLocation,
        pickupDate,
        pickupTime,
        returnDate,
        returnTime,
        driverAge
      });
    }
  };

  const handleDestinationClick = (city) => {
    if (city.toLowerCase().includes('los angeles')) {
      setPickupLocation('Los Angeles Int Airport');
      setHoveredStationKey('Los Angeles Int Airport');
    } else if (city.toLowerCase().includes('san francisco')) {
      setPickupLocation('San Francisco Int Airport');
      setHoveredStationKey('San Francisco Int Airport');
    } else if (city.toLowerCase().includes('munich')) {
      setPickupLocation('Munich Airport');
      setHoveredStationKey('Munich Airport');
    } else {
      setPickupLocation(city);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };


  const openTimePopup = (e, field) => {
    e.stopPropagation();
    setShowCalendarPopup(false);
    setActiveTimeField(field);
    setShowTimePopup(true);
  };

  const selectTime = (slot, field) => {
    if (field === 'pickup') setPickupTime(slot);
    else setReturnTime(slot);
    setShowTimePopup(false);
    setActiveTimeField(null);
  };

  const getDayValue = (dateStr) => {
    if (!dateStr) return null;
    const parts = dateStr.split(' ');
    if (parts.length < 2) return null;
    const month = parts[0];
    const day = parseInt(parts[1], 10);
    if (isNaN(day)) return null;
    if (month.startsWith('Jun')) return day;
    if (month.startsWith('Jul')) return 30 + day;
    if (month.startsWith('Aug')) return 61 + day;
    return null;
  };


  useEffect(() => {
    const handleScroll = () => {
      // Threshold is 120px (when the header/navbar scrolls away)
      if (window.scrollY > 120) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const historyStations = ['Munich Airport', 'Frankfurt Airport'];
  const popularStations = ['Frankfurt Airport', 'San Francisco Int Airport', 'Munich Airport', 'Los Angeles Int Airport'];

  const getFilteredStations = (list) => {
    if (!pickupLocation || list.includes(pickupLocation)) {
      return list;
    }
    const filtered = list.filter(name => 
      name.toLowerCase().includes(pickupLocation.toLowerCase())
    );
    return filtered.length > 0 ? filtered : list;
  };

  const renderMonth = (monthName, daysList, baseValueOffset) => {
    return (
      <div className="w-full">
        <h3 className="text-center font-black text-neutral-900 mb-5 text-xl tracking-tight">
          {monthName}
        </h3>
        
        {/* Days of week header */}
        <div className="grid grid-cols-7 text-center mb-3">
          {['SU', 'MO', 'TU', 'WE', 'TH', 'FR', 'SA'].map(day => (
            <span key={day} className="text-[11px] font-bold text-neutral-400">
              {day}
            </span>
          ))}
        </div>

        {/* Days grid */}
        <div className="grid grid-cols-7 text-center gap-y-1 text-sm font-semibold">
          {daysList.map((item, idx) => {
            if (item.day === null) {
              return <div key={`empty-${idx}`} />;
            }

            const dayVal = baseValueOffset + item.day;

            const today = new Date();
            const m = today.getMonth();
            const d = today.getDate();
            let todayVal = 25; // default fallback
            if (m === 5) todayVal = d; // June
            else if (m === 6) todayVal = 30 + d; // July
            else if (m === 7) todayVal = 61 + d; // August
            else todayVal = 30; // fallback to Jun 30 if testing outside

            const isPast = dayVal < todayVal;
            const isToday = dayVal === todayVal;
            
            const startVal = getDayValue(pickupDate);
            const endVal = getDayValue(returnDate);
            
            const isStart = dayVal === startVal;
            const isEnd = dayVal === endVal;
            const inRange = startVal && endVal && dayVal > startVal && dayVal < endVal;

            let dayClass = "w-9 h-9 flex items-center justify-center mx-auto rounded-full transition-colors cursor-pointer ";
            if (isPast) {
              dayClass += "text-neutral-300 cursor-not-allowed pointer-events-none";
            } else if (isStart || isEnd) {
              dayClass += "bg-black text-white font-bold rounded-full";
            } else if (inRange) {
              dayClass += "bg-neutral-100 text-neutral-900 font-bold rounded-lg";
            } else if (isToday) {
              dayClass += "text-[#C5A059] font-bold hover:bg-neutral-50";
            } else {
              dayClass += "text-neutral-800 hover:bg-neutral-50";
            }

            // Click handler
            const handleDateClick = () => {
              if (isPast) return;
              
              const monthPrefix = monthName.split(' ')[0].substring(0, 3); // "Jun", "Jul", "Aug"
              const dateStr = `${monthPrefix} ${item.day}`;

              if (activeDateField === 'pickup') {
                setPickupDate(dateStr);
                // Clear return date if it's before the new pickup date
                if (endVal && dayVal >= endVal) {
                  setReturnDate('');
                }
                setActiveDateField('return');
              } else if (activeDateField === 'return') {
                if (startVal && dayVal > startVal) {
                  setReturnDate(dateStr);
                  setShowCalendarPopup(false);
                  setActiveDateField(null);
                } else {
                  // If return date is before pickup date, treat it as new pickup date
                  setPickupDate(dateStr);
                  setReturnDate('');
                  setActiveDateField('return');
                }
              }
            };

            return (
              <div 
                key={`day-${item.day}`}
                onClick={handleDateClick}
                className={dayClass}
              >
                {item.day}
              </div>
            );
          })}
        </div>
      </div>
    );
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch({
      pickupLocation,
      returnLocation: isDifferentReturn ? returnLocation : pickupLocation,
      pickupDate,
      pickupTime,
      returnDate,
      returnTime,
      driverAge
    });
  };

  const currentStation = stationsData[hoveredStationKey] || stationsData['Munich Airport'];

  const carouselSlides = [
    [
      {
        name: "BMW 7 Series",
        category: "Luxury Sedan",
        seats: 5,
        suitcases: 4,
        transmission: "Automatic",
        image: "/assets/cars/7_series.png"
      },
      {
        name: "Mercedes E-Class",
        category: "Premium Sedan",
        seats: 5,
        suitcases: 4,
        transmission: "Automatic",
        image: "/assets/cars/mercedes_e_class.png"
      }
    ],
    [
      {
        name: "Mercedes G-Class",
        category: "Luxury 5 Seater SUV",
        seats: 5,
        suitcases: 4,
        transmission: "Automatic",
        image: "/assets/cars/g_class.png"
      },
      {
        name: "BMW X7",
        category: "Luxury 7 Seater SUV",
        seats: 7,
        suitcases: 4,
        transmission: "Automatic",
        image: "/assets/cars/x7.png"
      }
    ],
    [
      {
        name: "BMW Z4",
        category: "Luxury Convertible",
        seats: 2,
        suitcases: 1,
        transmission: "Automatic",
        image: "/assets/cars/z4.png"
      },
      {
        name: "BMW 8 Series",
        category: "Luxury Sports Car",
        seats: 4,
        suitcases: 2,
        transmission: "Automatic",
        image: "/assets/cars/sports_car.png"
      }
    ]
  ];

  const popularTypesList = [
    {
      title: "LUXURY 5 SEATER SUV",
      subtitle: "Mercedes-Benz G-Class or similar",
      seats: 5,
      suitcases: 4,
      transmission: "Automatic",
      image: "/assets/cars/g_class.png",
      desc: "Travel in comfort with space for five."
    },
    {
      title: "LUXURY 7 SEATER SUV",
      subtitle: "BMW X7 or similar",
      seats: 7,
      suitcases: 4,
      transmission: "Automatic",
      image: "/assets/cars/x7.png",
      desc: "Bring everyone together with extra seating and comfort."
    },
    {
      title: "LUXURY CONVERTIBLE",
      subtitle: "BMW Z4 Convertible or similar",
      seats: 2,
      suitcases: 2,
      transmission: "Automatic",
      image: "/assets/cars/z4.png",
      desc: "Stylish open-air drives with premium comfort."
    },
    {
      title: "LUXURY ELECTRIC VEHICLE",
      subtitle: "GMC Hummer or similar",
      seats: 5,
      suitcases: 3,
      transmission: "Range ~303 mi",
      image: "/assets/cars/hummer.png",
      desc: "Discover advanced tech with powerful electric driving."
    },
    {
      title: "LUXURY SEDANS",
      subtitle: "BMW 7 Series or similar",
      seats: 5,
      suitcases: 4,
      transmission: "Automatic",
      image: "/assets/cars/7_series.png",
      desc: "Relax with refined comfort and modern features."
    },
    {
      title: "LUXURY SPORTS CAR",
      subtitle: "BMW 8 Series or similar",
      seats: 4,
      suitcases: 3,
      transmission: "Automatic",
      image: "/assets/cars/sports_car.png",
      desc: "Combine high performance with premium comfort."
    }
  ];

  const regionCountries = {
    'Australia': ['Australia', 'New Zealand'],
    'Europe': ['Germany', 'United Kingdom', 'France', 'Italy', 'Spain', 'Austria', 'Switzerland', 'Netherlands'],
    'North America': ['United States', 'Canada', 'Mexico'],
    'Africa': ['South Africa', 'Morocco', 'Egypt'],
    'Asia': ['Singapore', 'United Arab Emirates', 'Japan', 'Thailand', 'Turkey'],
    'South America': ['Brazil', 'Argentina', 'Colombia', 'Chile']
  };

  return (
    <>
    <section className={`relative w-full flex flex-col justify-start items-center select-none ${isDropdownMode ? 'bg-white py-4 md:py-6' : 'min-h-[520px] md:min-h-0 md:aspect-[7/3] bg-[#0c0d0f] overflow-hidden pt-28'}`}>
      
      {/* Full-width Background Image exactly like the reference */}
      {!isDropdownMode && (
        <div 
          className="absolute inset-0 select-none pointer-events-none z-0"
          style={{ 
            backgroundImage: "url('https://img.sixt.com/1600/87693a11-fe02-464f-b00a-ba0457e28b0c.jpg')",
            backgroundSize: 'cover',
            backgroundPosition: 'top',
            backgroundRepeat: 'no-repeat'
          }}
        ></div>
      )}
      
      {/* Floating Booking Card Widget */}
      <div 
        className={`w-full max-w-[1100px] px-4 md:px-6 z-40 ${
          isDropdownMode 
            ? 'relative mx-auto'
            : isSticky 
              ? 'fixed top-0 md:top-4 left-1/2 animate-slideDownSticky' 
              : 'relative z-20 mx-auto -mt-[15px]'
        }`}
      >
        {/* ═══════════════════════════════════════════════════
            MOBILE FORM: compact single-action (hidden on md+)
            ═══════════════════════════════════════════════════ */}
        <form
          onSubmit={handleSubmit}
          className="md:hidden bg-white rounded-2xl shadow-xl px-5 py-5 flex flex-col gap-4 border border-neutral-200/40 text-neutral-800"
        >
          {/* Tabs */}
          {!isSticky && (
            <div className="flex items-center justify-between">
              <div className="flex gap-2">
                <button type="button" onClick={() => setActiveTab('Cars')}
                  className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold transition-colors ${activeTab === 'Cars' ? 'bg-[#191919] text-white' : 'bg-neutral-100 text-neutral-600'}`}>
                  <svg className="w-[18px] h-[18px] fill-current" viewBox="0 0 24 24"><path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.21.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.5 7h11l1.04 3H5.46l1.04-3zM7.5 17a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm9 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z"/></svg> Cars
                </button>
              </div>
            </div>
          )}

          {/* Location field — tap to open location panel */}
          <div
            onClick={() => setMobilePanel('location')}
            className="flex items-center gap-3 border-2 border-neutral-200 rounded-xl h-[50px] px-4 cursor-pointer"
          >
            <svg className="w-4 h-4 text-neutral-500 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
            <span className="text-sm font-bold text-neutral-900 truncate">{pickupLocation || 'Pickup location'}</span>
          </div>

          {!isSticky && (
            <>
              {/* Search button */}
              <button
                type="button"
                onClick={() => setMobilePanel('details')}
                className="w-full bg-[#C5A059] hover:bg-[#B28F4B] text-white font-condensed font-black text-sm uppercase h-[50px] rounded-xl shadow tracking-wider"
              >
                Search cars
              </button>

              {/* Bottom links */}
              <div className="flex flex-col items-center gap-1.5 pt-1">
                <button type="button" className="text-xs font-bold text-neutral-700 underline">View / edit my booking</button>
                <button type="button" className="text-xs font-bold text-neutral-700 underline">Apply corporate rate</button>
              </div>
            </>
          )}
        </form>

        {/* ═══════════════════════════════════════════════════
            DESKTOP FORM: full inline layout (hidden on mobile)
            ═══════════════════════════════════════════════════ */}
        <form 
          onSubmit={handleSubmit}
          className="hidden md:flex bg-white rounded-2xl shadow-xl p-5 md:p-6 flex-col gap-4 border border-neutral-200/40 text-neutral-800"
        >
          {/* Top Tabs Row */}
          <div className="flex items-center justify-between pb-1">
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setActiveTab('Cars')}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold premium-transition ${
                  activeTab === 'Cars' 
                    ? 'bg-[#191919] text-white' 
                    : 'bg-[#F3F3F3] text-neutral-600 hover:bg-[#EAEAEA]'
                }`}
              >
                <svg className="w-[18px] h-[18px] fill-current" viewBox="0 0 24 24"><path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.21.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.5 7h11l1.04 3H5.46l1.04-3zM7.5 17a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm9 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z"/></svg> Cars
              </button>
            </div>
            
            <button 
              type="button"
              className="text-[12px] font-bold text-neutral-900 hover:underline premium-transition"
            >
              View / edit my booking
            </button>
          </div>

          {/* Form Fields Stack */}
          <div className="flex flex-col gap-3">
            
            {/* Pickup & Return Row (Popup Trigger Wrapper) */}
            <div className="w-full flex flex-col relative">
              {!isDifferentReturn ? (
                <>
                  <label className="text-[11px] font-bold text-neutral-900 mb-1.5 text-left">Pickup & return</label>
                  <div className="flex items-center gap-4">
                    {/* Search Bar Input Container */}
                    <div 
                      onClick={() => {
                        setShowLocationPopup(true);
                        setShowReturnPopup(false);
                      }}
                      className={`flex-grow flex items-center bg-white border rounded-lg px-4 py-2 h-[48px] cursor-pointer premium-transition ${
                        showLocationPopup 
                          ? 'border-[#C5A059]' 
                          : 'border-neutral-200 focus-within:border-black'
                      }`}
                    >
                      <SolidPlaneIcon className="w-5 h-5 text-black mr-3 flex-shrink-0" />
                      <input 
                        type="text"
                        value={pickupLocation}
                        onFocus={() => {
                          setShowLocationPopup(true);
                          setShowReturnPopup(false);
                        }}
                        onChange={(e) => setPickupLocation(e.target.value)}
                        className="bg-transparent border-none outline-none w-full text-[15px] font-normal text-neutral-900 focus:ring-0 p-0"
                        required
                      />
                    </div>
                    
                    <button 
                      type="button"
                      onClick={() => {
                        setIsDifferentReturn(true);
                        setShowLocationPopup(false);
                        setShowReturnPopup(true);
                      }}
                      className="text-[12px] font-semibold text-neutral-500 hover:text-black whitespace-nowrap flex items-center gap-1.5"
                    >
                      <svg className="w-[18px] h-[18px] text-neutral-400 stroke-[2.5]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M12 5v14M5 12h14"/></svg> Different return location
                    </button>
                  </div>
                </>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-start w-full">
                  {/* Pickup field */}
                  <div className="flex flex-col w-full relative">
                    <label className="text-[11px] font-bold text-neutral-900 mb-1.5 text-left">Pickup</label>
                    <div 
                      onClick={() => {
                        setShowLocationPopup(true);
                        setShowReturnPopup(false);
                      }}
                      className={`w-full flex items-center bg-white border rounded-lg px-4 py-2 h-[48px] cursor-pointer premium-transition ${
                        showLocationPopup 
                          ? 'border-[#C5A059]' 
                          : 'border-neutral-200 focus-within:border-black'
                      }`}
                    >
                      <SolidPlaneIcon className="w-5 h-5 text-black mr-3 flex-shrink-0" />
                      <input 
                        type="text"
                        value={pickupLocation}
                        onFocus={() => {
                          setShowLocationPopup(true);
                          setShowReturnPopup(false);
                        }}
                        onChange={(e) => setPickupLocation(e.target.value)}
                        className="bg-transparent border-none outline-none w-full text-[15px] font-normal text-neutral-900 focus:ring-0 p-0"
                        required
                      />
                    </div>
                  </div>

                  {/* Return field */}
                  <div className="flex flex-col w-full relative">
                    <label className="text-[11px] font-bold text-neutral-900 mb-1.5 text-left">Return</label>
                    <div 
                      onClick={() => {
                        setShowReturnPopup(true);
                        setShowLocationPopup(false);
                      }}
                      className={`w-full flex items-center bg-white border rounded-lg px-4 py-2 h-[48px] cursor-pointer premium-transition ${
                        showReturnPopup 
                          ? 'border-[#C5A059]' 
                          : 'border-neutral-200 focus-within:border-black'
                      }`}
                    >
                      {/* Search magnifying glass icon for Return search */}
                      <svg className="w-5 h-5 text-black mr-3 flex-shrink-0 stroke-[2.5]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <circle cx="11" cy="11" r="8" />
                        <line x1="21" y1="21" x2="16.65" y2="16.65" />
                      </svg>
                      <input 
                        type="text"
                        value={returnLocation}
                        placeholder="Airport, city or address"
                        onFocus={() => {
                          setShowReturnPopup(true);
                          setShowLocationPopup(false);
                        }}
                        onChange={(e) => setReturnLocation(e.target.value)}
                        className="bg-transparent border-none outline-none w-full text-[15px] font-normal text-neutral-900 focus:ring-0 p-0"
                        required={isDifferentReturn}
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Click Outside Overlay Layers */}
              {showLocationPopup && (
                <div 
                  className="fixed inset-0 z-30 bg-transparent" 
                  onClick={() => setShowLocationPopup(false)}
                />
              )}

              {showReturnPopup && (
                <div 
                  className="fixed inset-0 z-30 bg-transparent" 
                  onClick={() => setShowReturnPopup(false)}
                />
              )}

              {/* High-Fidelity Location Picker Popup */}
              {showLocationPopup && (
                <div className="absolute top-full mt-2 left-0 w-full md:max-w-[740px] bg-white border border-neutral-200/80 rounded-2xl shadow-2xl z-40 flex flex-col md:flex-row overflow-hidden text-left text-neutral-800 transition-all duration-200 animate-fadeIn">
                  
                  {/* Left Column: Stations Lists */}
                  <div className="w-full md:w-[42%] bg-white py-4 max-h-[300px] md:max-h-[400px] overflow-y-auto">
                    
                    {/* History Section */}
                    {getFilteredStations(historyStations).length > 0 && (
                      <div>
                        <h3 className="px-6 pt-2 pb-1.5 text-sm font-bold text-neutral-900">History</h3>
                        {getFilteredStations(historyStations).map((name) => (
                          <div 
                            key={name}
                            onMouseEnter={() => setHoveredStationKey(name)}
                            onClick={() => {
                              setPickupLocation(name);
                              setShowLocationPopup(false);
                            }}
                            className={`flex items-center gap-4 px-6 py-3 cursor-pointer transition-colors duration-150 ${
                              hoveredStationKey === name 
                                ? 'bg-[#f3f3f3] text-black' 
                                : 'bg-transparent text-neutral-800 hover:bg-[#f9f9f9]'
                            }`}
                          >
                            <SolidPlaneIcon className={`w-4 h-4 ${
                              hoveredStationKey === name ? 'text-black' : 'text-neutral-500'
                            }`} />
                            <span className="text-[13px] font-bold">
                              {name}
                            </span>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Popular Stations Section */}
                    {getFilteredStations(popularStations).length > 0 && (
                      <div className="mt-2">
                        <h3 className="px-6 pt-3 pb-1.5 text-sm font-bold text-neutral-900">Popular stations</h3>
                        {getFilteredStations(popularStations).map((name) => (
                          <div 
                            key={name}
                            onMouseEnter={() => setHoveredStationKey(name)}
                            onClick={() => {
                              setPickupLocation(name);
                              setShowLocationPopup(false);
                            }}
                            className={`flex items-center gap-4 px-6 py-3 cursor-pointer transition-colors duration-150 ${
                              hoveredStationKey === name 
                                ? 'bg-[#f3f3f3] text-black' 
                                : 'bg-transparent text-neutral-800 hover:bg-[#f9f9f9]'
                            }`}
                          >
                            <SolidPlaneIcon className={`w-4 h-4 ${
                              hoveredStationKey === name ? 'text-black' : 'text-neutral-500'
                            }`} />
                            <span className="text-[13px] font-bold">
                              {name}
                            </span>
                          </div>
                        ))}
                      </div>
                    )}

                  </div>

                  {/* Right Column: Station Details Panel */}
                  <div className="w-full md:w-[58%] bg-[#f3f3f3] p-6 md:p-8 flex flex-col justify-between min-h-[260px] md:min-h-[350px]">
                    
                    {/* Upper Details Block */}
                    <div>
                      {/* Top Header Row inside Details Panel */}
                      <div className="flex items-start justify-between">
                        <SolidPlaneIcon className="w-10 h-10 text-neutral-900" />
                        <div className="flex items-center gap-1.5 border border-[#C5A059] text-[#C5A059] px-3 py-1.5 rounded-full text-[11px] font-bold bg-transparent">
                          <RotateCcw className="w-3.5 h-3.5 stroke-[2.5]" /> 24-hour return
                        </div>
                      </div>

                      {/* Station Details */}
                      <div className="mt-6">
                        <h4 className="font-bold text-2xl text-neutral-900 leading-tight">
                          {currentStation.name}
                        </h4>
                        <p className="text-xs text-neutral-500 mt-1.5 font-medium leading-normal">
                          {currentStation.address}
                        </p>
                      </div>

                      {/* Opening Hours list */}
                      <div className="mt-6">
                        <span className="text-xs font-bold text-neutral-900 block mb-2">Opening hours</span>
                        <div className="text-xs space-y-1.5">
                          <div className="flex items-center">
                            <span className="text-neutral-500 font-medium w-24">Mon - Sun:</span>
                            <span className="text-neutral-900 font-bold">{currentStation.hours}</span>
                          </div>
                          <div className="flex items-center">
                            <span className="text-neutral-500 font-medium w-24">Holidays:</span>
                            <span className="text-neutral-900 font-bold">{currentStation.holidays}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Bottom Details Footer Link */}
                    <div className="flex items-center gap-2 mt-6 cursor-pointer group">
                      <div className="w-5 h-5 bg-black rounded-full flex items-center justify-center text-white text-[11px] font-bold flex-shrink-0">
                        i
                      </div>
                      <span className="text-xs font-bold text-neutral-900 underline underline-offset-2 group-hover:text-[#C5A059] transition-colors">
                        Station Details
                      </span>
                    </div>

                  </div>

                </div>
              )}

              {/* High-Fidelity Return Location Picker Popup */}
              {showReturnPopup && (
                <div className="absolute top-full mt-2 left-0 w-full md:max-w-[740px] bg-white border border-neutral-200/80 rounded-2xl shadow-2xl z-40 flex flex-col md:flex-row overflow-hidden text-left text-neutral-800 transition-all duration-200 animate-fadeIn">
                  
                  {/* Left Column: Stations Lists */}
                  <div className="w-full md:w-[42%] bg-white py-4 max-h-[300px] md:max-h-[400px] overflow-y-auto">
                    
                    {/* Return at pickup option */}
                    <div 
                      onClick={() => {
                        setIsDifferentReturn(false);
                        setReturnLocation('');
                        setShowReturnPopup(false);
                      }}
                      className="flex items-center gap-4 px-6 py-3 cursor-pointer hover:bg-[#f9f9f9] border-b border-neutral-100 transition-colors"
                    >
                      <RotateCcw className="w-4 h-4 text-neutral-800 stroke-[2.5]" />
                      <span className="text-[13px] font-bold text-neutral-900">
                        Return at pickup
                      </span>
                    </div>

                    {/* History Section */}
                    <div className="mt-2">
                      <h3 className="px-6 pt-2 pb-1.5 text-sm font-bold text-neutral-900">History</h3>
                      
                      {/* Munich Airport history item */}
                      <div 
                        onMouseEnter={() => setHoveredReturnStationKey('Munich Airport')}
                        onClick={() => {
                          setReturnLocation('Munich Airport');
                          setShowReturnPopup(false);
                        }}
                        className={`flex items-center gap-4 px-6 py-3 cursor-pointer transition-colors duration-150 ${
                          hoveredReturnStationKey === 'Munich Airport' 
                            ? 'bg-[#f3f3f3] text-black' 
                            : 'bg-transparent text-neutral-800 hover:bg-[#f9f9f9]'
                        }`}
                      >
                        <SolidPlaneIcon className={`w-4 h-4 ${
                          hoveredReturnStationKey === 'Munich Airport' ? 'text-black' : 'text-neutral-500'
                        }`} />
                        <span className="text-[13px] font-bold">
                          Munich Airport
                        </span>
                      </div>

                      {/* NYC Long Island City history item */}
                      <div 
                        onMouseEnter={() => setHoveredReturnStationKey('New York City Long Island City')}
                        onClick={() => {
                          setReturnLocation('New York City Long Island City');
                          setShowReturnPopup(false);
                        }}
                        className={`flex items-center gap-4 px-6 py-3 cursor-pointer transition-colors duration-150 ${
                          hoveredReturnStationKey === 'New York City Long Island City' 
                            ? 'bg-[#f3f3f3] text-black' 
                            : 'bg-transparent text-neutral-800 hover:bg-[#f9f9f9]'
                        }`}
                      >
                        <Building className={`w-4 h-4 stroke-[2] ${
                          hoveredReturnStationKey === 'New York City Long Island City' ? 'text-black' : 'text-neutral-500'
                        }`} />
                        <span className="text-[13px] font-bold text-left">
                          New York City Long Island City
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Right Column: Return Station Details Panel */}
                  <div className="w-full md:w-[58%] bg-[#f3f3f3] p-6 md:p-8 flex flex-col justify-between min-h-[260px] md:min-h-[350px]">
                    
                    {/* Upper Details Block */}
                    <div>
                      {/* Top Header Row inside Details Panel */}
                      <div className="flex items-start justify-between">
                        {hoveredReturnStationKey === 'New York City Long Island City' ? (
                          <Building className="w-10 h-10 text-neutral-900 stroke-[1.5]" />
                        ) : (
                          <SolidPlaneIcon className="w-10 h-10 text-neutral-900" />
                        )}
                        <div className="flex items-center gap-1.5 border border-[#C5A059] text-[#C5A059] px-3 py-1.5 rounded-full text-[11px] font-bold bg-transparent">
                          <RotateCcw className="w-3.5 h-3.5 stroke-[2.5]" /> 24-hour return
                        </div>
                      </div>

                      {/* Station Details */}
                      <div className="mt-6">
                        <h4 className="font-bold text-2xl text-neutral-900 leading-tight">
                          {stationsData[hoveredReturnStationKey]?.name || 'Munich Airport'}
                        </h4>
                        <p className="text-xs text-neutral-500 mt-1.5 font-medium leading-normal">
                          {stationsData[hoveredReturnStationKey]?.address || 'Terminalstr. Mitte/MWZ, München, 85356, DE'}
                        </p>
                      </div>

                      {/* Opening Hours list */}
                      <div className="mt-6">
                        <span className="text-xs font-bold text-neutral-900 block mb-2">Opening hours</span>
                        <div className="text-xs space-y-1.5">
                          <div className="flex items-center">
                            <span className="text-neutral-500 font-medium w-24">Mon - Sun:</span>
                            <span className="text-neutral-900 font-bold">{stationsData[hoveredReturnStationKey]?.hours}</span>
                          </div>
                          <div className="flex items-center">
                            <span className="text-neutral-500 font-medium w-24">Holidays:</span>
                            <span className="text-neutral-900 font-bold">{stationsData[hoveredReturnStationKey]?.holidays}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Bottom Details Footer Link */}
                    <div className="flex items-center gap-2 mt-6 cursor-pointer group">
                      <div className="w-5 h-5 bg-black rounded-full flex items-center justify-center text-white text-[11px] font-bold flex-shrink-0">
                        i
                      </div>
                      <span className="text-xs font-bold text-neutral-900 underline underline-offset-2 group-hover:text-[#C5A059] transition-colors">
                        Station Details
                      </span>
                    </div>

                  </div>

                </div>
              )}
            </div>

            {/* Dates & Search Action Row — separate boxes like reference */}
            <div className="grid grid-cols-2 lg:flex lg:flex-row gap-3 lg:gap-4 items-end relative">

              {/* ── PICKUP DATE & TIME ── */}
              <div className="flex flex-col col-span-2 lg:flex-1 relative">
                <label className="text-[11px] font-bold text-neutral-900 mb-1.5 text-left">Pickup date</label>
                <div className={`flex items-center bg-white border rounded-lg h-[48px] cursor-pointer premium-transition ${
                    (showCalendarPopup && activeDateField === 'pickup') || (showTimePopup && activeTimeField === 'pickup')
                      ? 'border-[#C5A059]'
                      : 'border-neutral-200 hover:border-neutral-400'
                  }`}
                >
                  {/* Date Part */}
                  <div 
                    onClick={() => {
                      setShowTimePopup(false);
                      setShowCalendarPopup(true);
                      setActiveDateField('pickup');
                    }}
                    className="flex items-center px-3 md:px-4 h-full flex-grow"
                  >
                    <SolidCalendarIcon className="w-[20px] h-[20px] text-black mr-2 flex-shrink-0" />
                    <span className="text-[15px] font-normal text-neutral-900 select-none truncate">{pickupDate || 'Select date'}</span>
                  </div>
                  
                  {/* Divider */}
                  <div className="h-2/3 w-[1px] bg-neutral-200"></div>

                  {/* Time Part */}
                  <div
                    onClick={(e) => openTimePopup(e, 'pickup')}
                    className="flex items-center px-3 md:px-4 h-full flex-shrink-0"
                  >
                    <span className="text-[15px] font-normal text-neutral-900 select-none whitespace-nowrap">{pickupTime}</span>
                  </div>
                </div>
                {/* Time Picker Popup anchored here */}
                {showTimePopup && activeTimeField === 'pickup' && (
                  <div
                    className="absolute top-[calc(100%+8px)] left-0 w-full bg-white border border-neutral-200 rounded-xl shadow-2xl z-50 animate-fadeIn text-neutral-800 overflow-hidden"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <TimePickerPopup
                      activeTimeField={activeTimeField}
                      currentTime={pickupTime}
                      selectTime={selectTime}
                    />
                  </div>
                )}
              </div>

              {/* ── RETURN DATE & TIME ── */}
              <div className="flex flex-col col-span-2 lg:flex-1 relative">
                <label className="text-[11px] font-bold text-neutral-900 mb-1.5 text-left">Return date</label>
                <div className={`flex items-center bg-white border rounded-lg h-[48px] cursor-pointer premium-transition ${
                    (showCalendarPopup && activeDateField === 'return') || (showTimePopup && activeTimeField === 'return')
                      ? 'border-[#C5A059]'
                      : 'border-neutral-200 hover:border-neutral-400'
                  }`}
                >
                  {/* Date Part */}
                  <div 
                    onClick={() => {
                      setShowTimePopup(false);
                      setShowCalendarPopup(true);
                      setActiveDateField('return');
                    }}
                    className="flex items-center px-3 md:px-4 h-full flex-grow"
                  >
                    <SolidCalendarIcon className="w-[20px] h-[20px] text-black mr-2 flex-shrink-0" />
                    <span className="text-[15px] font-normal text-neutral-900 select-none truncate">{returnDate || 'Select date'}</span>
                  </div>
                  
                  {/* Divider */}
                  <div className="h-2/3 w-[1px] bg-neutral-200"></div>

                  {/* Time Part */}
                  <div
                    onClick={(e) => openTimePopup(e, 'return')}
                    className="flex items-center px-3 md:px-4 h-full flex-shrink-0"
                  >
                    <span className="text-[15px] font-normal text-neutral-900 select-none whitespace-nowrap">{returnTime}</span>
                  </div>
                </div>
                {/* Time Picker Popup anchored here */}
                {showTimePopup && activeTimeField === 'return' && (
                  <div
                    className="absolute top-[calc(100%+8px)] left-0 w-full bg-white border border-neutral-200 rounded-xl shadow-2xl z-50 animate-fadeIn text-neutral-800 overflow-hidden"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <TimePickerPopup
                      activeTimeField={activeTimeField}
                      currentTime={returnTime}
                      selectTime={selectTime}
                    />
                  </div>
                )}
              </div>

              {/* ── SHOW CARS BUTTON ── */}
              <div className="flex flex-col col-span-2 lg:col-span-1" style={{flexShrink: 0}}>
                <label className="hidden lg:block text-[11px] font-bold text-neutral-900 mb-1.5 text-left opacity-0 pointer-events-none">.</label>
                <button 
                  type="submit"
                  className="w-full lg:w-auto bg-[#C5A059] hover:bg-[#B28F4B] text-white font-bold text-[15px] h-[48px] px-8 rounded-lg shadow-lg tracking-wide flex items-center justify-center hover:scale-[1.02] active:scale-95 premium-transition whitespace-nowrap"
                >
                  Show cars
                </button>
              </div>

              {/* Click Outside Overlay for Calendar and Time Picker */}
              {(showCalendarPopup || showTimePopup) && (
                <div 
                  className="fixed inset-0 z-30 bg-transparent" 
                  onClick={() => {
                    setShowCalendarPopup(false);
                    setActiveDateField(null);
                    setShowTimePopup(false);
                    setActiveTimeField(null);
                  }}
                />
              )}

              {/* ── Calendar Range Picker Popup ── */}
              {showCalendarPopup && (
                <div
                  className={`fixed md:absolute top-1/2 md:top-full left-1/2 md:left-0 -translate-x-1/2 -translate-y-1/2 md:translate-x-0 md:translate-y-0 mt-0 md:mt-2 ${
                    activeDateField === 'pickup'
                      ? 'md:left-0'
                      : 'md:left-0 lg:left-auto lg:right-0'
                  } w-[calc(100vw-2rem)] max-w-[400px] md:max-w-none md:w-[650px] lg:w-[900px] bg-white border border-neutral-200/60 rounded-2xl shadow-2xl z-50 animate-fadeIn select-none text-neutral-800 overflow-hidden`}
                  onClick={(e) => e.stopPropagation()}
                >
                  {/* Inner padded area with relative for chevron positioning */}
                  <div className="relative px-10 pt-6 pb-8">
                    {/* Left arrow */}
                    <button
                      type="button"
                      className="absolute top-6 left-4 p-1 text-neutral-400 hover:text-black transition-colors"
                      onClick={() => alert('Previous months unavailable in this visual clone.')}
                    >
                      <ChevronLeft className="w-6 h-6 stroke-[2]" />
                    </button>
                    {/* Right arrow */}
                    <button
                      type="button"
                      className="absolute top-6 right-4 p-1 text-neutral-400 hover:text-black transition-colors"
                      onClick={() => alert('Future months unavailable in this visual clone.')}
                    >
                      <ChevronRight className="w-6 h-6 stroke-[2]" />
                    </button>

                    {/* Three months side by side */}
                    <div className="flex flex-col md:flex-row gap-6 lg:gap-10 justify-between items-start">
                      <div className="flex-1">
                        {renderMonth('June 2026', juneDays, 0)}
                      </div>
                      <div className="hidden md:block flex-1">
                        {renderMonth('July 2026', julyDays, 30)}
                      </div>
                      <div className="hidden lg:block flex-1">
                        {renderMonth('August 2026', augustDays, 61)}
                      </div>
                    </div>
                  </div>
                </div>
              )}

            </div>

          </div>

          {/* Bottom Settings Row */}
          <div className="flex flex-wrap items-center justify-between gap-4 border-t border-neutral-100 pt-3.5 text-xs text-neutral-800">
            <div className="flex items-center gap-3">
              
              {/* Driver's Age Selector Option */}
              <div className="relative">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowAgeDropdown(!showAgeDropdown);
                  }}
                  className="flex items-center gap-1 bg-white text-neutral-900 font-bold hover:text-black cursor-pointer select-none focus:outline-none"
                >
                  <svg className="w-[15px] h-[15px] text-black fill-current" viewBox="0 0 24 24"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>
                  <span>Driver's age {driverAge}</span>
                  <span className="text-[9px] text-neutral-500 font-black ml-0.5">▼</span>
                </button>

                {showAgeDropdown && (
                  <>
                    <div 
                      className="fixed inset-0 z-40 bg-transparent" 
                      onClick={(e) => {
                        e.stopPropagation();
                        setShowAgeDropdown(false);
                      }}
                    />
                    <div className="absolute left-0 mt-2 z-50 bg-white border border-neutral-200 rounded-2xl shadow-xl w-[140px] max-h-[225px] overflow-y-auto text-left text-neutral-800 animate-fadeIn py-1.5">
                      {['30+', '29', '28', '27', '26', '25', '24', '23', '22', '21', '20', '19', '18'].map((age) => {
                        const isSelected = driverAge === age;
                        return (
                          <button
                            key={age}
                            type="button"
                            onClick={() => {
                              setDriverAge(age);
                              setShowAgeDropdown(false);
                            }}
                            className={`flex items-center justify-between w-full px-4 py-2 hover:bg-neutral-50 transition-colors text-xs font-bold leading-none ${
                              isSelected ? 'text-neutral-900' : 'text-neutral-800'
                            }`}
                          >
                            <span>{age}</span>
                            {isSelected && (
                              <span className="text-sm font-black text-neutral-900 leading-none">âœ“</span>
                            )}
                          </button>
                        );
                      })}
                    </div>
                  </>
                )}
              </div>

              <span className="text-neutral-200">|</span>

              {/* Apply Corporate Rate link */}
              <button 
                type="button" 
                className="font-bold text-neutral-900 underline hover:text-[#C5A059] premium-transition"
              >
                Apply corporate rate
              </button>
            </div>
          </div>
        </form>

      </div>

      {/* ═══════════════════════════════════════════════════════════
          MOBILE PANELS — full-screen overlays (hidden on md+)
          ═══════════════════════════════════════════════════════════ */}

      {/* ── PANEL 1B: Return Location Picker ── */}
      {mobilePanel === 'location-return' && (
        <div className="md:hidden fixed inset-0 z-[200] bg-white flex flex-col animate-slideInLeft">
          <div className="flex items-center px-5 py-4 border-b border-neutral-100">
            <button onClick={() => setMobilePanel('details')} className="text-neutral-800 font-bold text-lg p-1 mr-3">✕</button>
            <span className="font-bold text-base text-neutral-900">Return location</span>
          </div>
          <div className="px-5 pt-4 pb-2">
            <div className="flex items-center gap-2 border-2 border-neutral-200 rounded-xl px-3 h-[46px]">
              <svg className="w-4 h-4 text-neutral-400 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
              <input type="text" value={returnLocation} onChange={e => setReturnLocation(e.target.value)}
                className="flex-grow text-sm font-bold text-neutral-900 outline-none" placeholder="City, airport, station..." autoFocus />
              {returnLocation && <button onClick={() => setReturnLocation('')} className="text-neutral-400 text-xs">✕</button>}
            </div>
          </div>
          <div className="flex-grow overflow-y-auto px-5 pb-8">
            <p className="text-xs font-black text-neutral-400 uppercase tracking-wider mt-4 mb-3">Popular stations</p>
            {popularStations.map(name => (
              <button key={name} type="button" onClick={() => { setReturnLocation(name); setHoveredReturnStationKey(name); setMobilePanel('details'); }}
                className="w-full flex items-center gap-4 py-3.5 border-b border-neutral-100 text-left">
                <div className="w-8 h-8 rounded-full bg-neutral-100 flex items-center justify-center flex-shrink-0">
                  <svg className="w-4 h-4 text-neutral-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" fill="currentColor" stroke="none"/><circle cx="12" cy="9" r="2.5" fill="white" stroke="none"/></svg>
                </div>
                <div>
                  <p className="text-sm font-bold text-neutral-900">{name}</p>
                  <p className="text-xs text-neutral-400 truncate max-w-[240px]">{stationsData[name]?.address || ''}</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* ── PANEL 1: Location Picker ── */}
      {mobilePanel === 'location' && (
        <div className="md:hidden fixed inset-0 z-[200] bg-white flex flex-col animate-slideInLeft">
          <div className="flex items-center px-5 py-4 border-b border-neutral-100">
            <button onClick={() => setMobilePanel(null)} className="text-neutral-800 font-bold text-lg p-1 mr-3">✕</button>
            <span className="font-bold text-base text-neutral-900">Pickup location</span>
          </div>
          <div className="px-5 pt-4 pb-2">
            <div className="flex items-center gap-2 border-2 border-neutral-200 rounded-xl px-3 h-[46px]">
              <svg className="w-4 h-4 text-neutral-400 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
              <input type="text" value={pickupLocation} onChange={e => setPickupLocation(e.target.value)}
                className="flex-grow text-sm font-bold text-neutral-900 outline-none" placeholder="City, airport, station..." autoFocus />
              {pickupLocation && <button onClick={() => setPickupLocation('')} className="text-neutral-400 text-xs">✕</button>}
            </div>
          </div>
          <div className="flex-grow overflow-y-auto px-5 pb-8">
            <p className="text-xs font-black text-neutral-400 uppercase tracking-wider mt-4 mb-3">History</p>
            {historyStations.map(name => (
              <button key={name} type="button" onClick={() => { setPickupLocation(name); setHoveredStationKey(name); setMobilePanel('details'); }}
                className="w-full flex items-center gap-4 py-3.5 border-b border-neutral-100 text-left">
                <div className="w-8 h-8 rounded-full bg-neutral-100 flex items-center justify-center flex-shrink-0">
                  <svg className="w-4 h-4 text-neutral-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 8 12 12 14 14"/></svg>
                </div>
                <div>
                  <p className="text-sm font-bold text-neutral-900">{name}</p>
                  <p className="text-xs text-neutral-400">{stationsData[name]?.address || ''}</p>
                </div>
              </button>
            ))}
            <p className="text-xs font-black text-neutral-400 uppercase tracking-wider mt-5 mb-3">Popular stations</p>
            {popularStations.map(name => (
              <button key={name} type="button" onClick={() => { setPickupLocation(name); setHoveredStationKey(name); setMobilePanel('details'); }}
                className="w-full flex items-center gap-4 py-3.5 border-b border-neutral-100 text-left">
                <div className="w-8 h-8 rounded-full bg-neutral-100 flex items-center justify-center flex-shrink-0">
                  <svg className="w-4 h-4 text-neutral-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" fill="currentColor" stroke="none"/><circle cx="12" cy="9" r="2.5" fill="white" stroke="none"/></svg>
                </div>
                <div>
                  <p className="text-sm font-bold text-neutral-900">{name}</p>
                  <p className="text-xs text-neutral-400 truncate max-w-[240px]">{stationsData[name]?.address || ''}</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* ── PANEL 2: Rental Details ── */}
      {mobilePanel === 'details' && (
        <div className="md:hidden fixed inset-0 z-[200] bg-white flex flex-col animate-slideInLeft">
          <div className="flex items-center justify-between px-5 py-4 border-b border-neutral-100">
            <span className="font-black text-base text-neutral-900">Your rental details</span>
            <button onClick={() => setMobilePanel(null)} className="text-neutral-800 font-bold text-lg p-1">✕</button>
          </div>
          <div className="flex-grow overflow-y-auto px-5 py-5 space-y-5">
            <div>
              <p className="text-xs font-black text-neutral-400 uppercase tracking-wider mb-2">Pickup &amp; return</p>
              <button type="button" onClick={() => setMobilePanel('location')}
                className="w-full flex items-center gap-3 border-2 border-neutral-200 rounded-xl h-[50px] px-4 text-left">
                <svg className="w-4 h-4 text-neutral-500 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                <span className="text-sm font-bold text-neutral-900 truncate">{pickupLocation}</span>
              </button>
              <button type="button" onClick={() => setIsDifferentReturn(!isDifferentReturn)}
                className="flex items-center gap-1.5 mt-2 text-xs font-bold text-[#C5A059]">
                <span className="text-base leading-none">{isDifferentReturn ? '−' : '+'}</span>
                {isDifferentReturn ? 'Same return location' : 'Different return location?'}
              </button>
              {isDifferentReturn && (
                <div className="mt-2 flex items-center gap-3 border-2 border-neutral-200 rounded-xl h-[50px] px-4 cursor-pointer"
                  onClick={() => setMobilePanel('location-return')}>
                  <svg className="w-4 h-4 text-neutral-500 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                  <span className="text-sm font-bold text-neutral-900 truncate">{returnLocation || 'Select return location'}</span>
                </div>
              )}
            </div>
            <div className="grid grid-cols-2 gap-3 pt-1">
              <div>
                <p className="text-xs font-black text-neutral-900 mb-2">Pickup</p>
                <button type="button" onClick={() => { setActiveDateField('pickup'); setMobilePanel('calendar'); }}
                  className="w-full flex items-center gap-2 border-2 border-neutral-200 rounded-xl h-[46px] px-3 mb-2">
                  <svg className="w-4 h-4 text-neutral-600 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                  <span className="text-xs font-bold text-neutral-900">{pickupDate || 'Select'}</span>
                </button>
                <button type="button" onClick={() => setMobilePanel('time-pickup')}
                  className="w-full flex items-center gap-2 border-2 border-neutral-200 rounded-xl h-[46px] px-3">
                  <svg className="w-4 h-4 text-neutral-600 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                  <span className="text-xs font-bold text-neutral-900">{pickupTime}</span>
                </button>
              </div>
              <div>
                <p className="text-xs font-black text-neutral-900 mb-2">Return</p>
                <button type="button" onClick={() => { setActiveDateField('return'); setMobilePanel('calendar'); }}
                  className="w-full flex items-center gap-2 border-2 border-neutral-200 rounded-xl h-[46px] px-3 mb-2">
                  <svg className="w-4 h-4 text-neutral-600 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                  <span className="text-xs font-bold text-neutral-900">{returnDate || 'Select'}</span>
                </button>
                <button type="button" onClick={() => setMobilePanel('time-return')}
                  className="w-full flex items-center gap-2 border-2 border-neutral-200 rounded-xl h-[46px] px-3">
                  <svg className="w-4 h-4 text-neutral-600 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                  <span className="text-xs font-bold text-neutral-900">{returnTime}</span>
                </button>
              </div>
            </div>
            
            {/* Action buttons (Show Cars, Corporate Rate, Driver Age) centered at bottom of scroll content */}
            <div className="pt-4 flex flex-col items-center gap-4">
              <button type="button" onClick={() => { onSearch({ pickupLocation, returnLocation: isDifferentReturn ? returnLocation : pickupLocation, pickupDate, pickupTime, returnDate, returnTime, driverAge }); setMobilePanel(null); }}
                className="w-full bg-[#C5A059] hover:bg-[#B28F4B] text-white font-condensed font-black text-sm uppercase h-[52px] rounded-xl shadow tracking-wider">
                Show cars
              </button>
              <button type="button" className="text-xs font-bold text-neutral-600 underline">Apply corporate rate</button>
              <div className="relative">
                <button type="button" onClick={() => setShowAgeDropdown(!showAgeDropdown)}
                  className="flex items-center gap-1.5 text-xs font-bold text-neutral-700">
                  <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                  Driver's age {driverAge} <span className="text-[10px]">▼</span>
                </button>  
                {showAgeDropdown && (
                  <div className="absolute bottom-full mb-1 left-1/2 -translate-x-1/2 bg-white border border-neutral-200 rounded-xl shadow-xl w-[130px] max-h-[200px] overflow-y-auto z-10 py-1">
                    {['30+','29','28','27','26','25','24','23','22','21','20','19','18'].map(age => (
                      <button key={age} type="button" onClick={() => { setDriverAge(age); setShowAgeDropdown(false); }}
                        className={`w-full text-center px-4 py-2 text-xs font-bold ${driverAge === age ? 'text-[#C5A059]' : 'text-neutral-700'} hover:bg-neutral-50`}>
                        {age}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── PANEL 3: Calendar (full-screen stacked months) ── */}
      {mobilePanel === 'calendar' && (
        <div className="md:hidden fixed inset-0 z-[300] bg-white flex flex-col animate-slideInLeft">
          <div className="flex items-center justify-between px-5 py-4 border-b border-neutral-100">
            <button onClick={() => setMobilePanel('details')} className="text-neutral-700 p-1">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M19 12H5M12 5l-7 7 7 7"/></svg>
            </button>
            <span className="font-black text-base text-neutral-900">Trip dates</span>
            <button onClick={() => { setPickupDate(''); setReturnDate(''); }} className="text-xs font-black text-neutral-500 uppercase tracking-wide">✕ Clear</button>
          </div>
          <div className="flex-grow overflow-y-auto px-5 py-6 space-y-10">
            {renderMonth('June 2026', juneDays, 0)}
            {renderMonth('July 2026', julyDays, 30)}
            {renderMonth('August 2026', augustDays, 61)}
          </div>
          <div className="px-5 py-4 border-t border-neutral-100 bg-white">
            <button type="button" onClick={() => { if (pickupDate && returnDate) setMobilePanel('details'); }}
              disabled={!pickupDate || !returnDate}
              className="w-full bg-[#C5A059] disabled:bg-neutral-200 disabled:text-neutral-400 text-white font-condensed font-black text-sm uppercase h-[52px] rounded-xl shadow tracking-wider transition-colors">
              Continue
            </button>
          </div>
        </div>
      )}

      {/* ── PANEL 4a: Time Picker – Pickup ── */}
      {mobilePanel === 'time-pickup' && (
        <div className="md:hidden fixed inset-0 z-[300] bg-white flex flex-col animate-slideInLeft">
          <div className="flex items-center justify-between px-5 py-4 border-b border-neutral-100">
            <button onClick={() => setMobilePanel('details')} className="text-neutral-700 p-1">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M19 12H5M12 5l-7 7 7 7"/></svg>
            </button>
            <span className="font-black text-base text-neutral-900">Select pickup time</span>
            <div className="w-8" />
          </div>
          <div className="grid grid-cols-2 gap-3 px-5 pt-4 pb-2">
            <div className="flex items-center gap-2 border-2 border-[#C5A059] bg-[#FDF8EF] rounded-xl h-[44px] px-3">
              <svg className="w-4 h-4 text-neutral-600 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
              <span className="text-xs font-bold text-neutral-900">{pickupDate || '—'}</span>
            </div>
            <div className="flex items-center gap-2 border-2 border-neutral-200 bg-neutral-50 rounded-xl h-[44px] px-3">
              <svg className="w-4 h-4 text-neutral-600 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
              <span className="text-xs font-bold text-neutral-900">{returnDate || '—'}</span>
            </div>
          </div>
          <p className="px-5 text-[11px] text-neutral-400 font-semibold mb-1">⏱ Opening Times: {stationsData[pickupLocation]?.hours || '05:00 AM - 11:59 PM'}</p>
          <div className="flex-grow overflow-y-auto px-5 pb-8">
            <TimePickerPopup activeTimeField="pickup" currentTime={pickupTime} selectTime={(slot) => { setPickupTime(slot); setMobilePanel('details'); }} />
          </div>
          <div className="px-5 py-4 border-t border-neutral-100 bg-white">
            <button type="button" onClick={() => setMobilePanel('details')}
              className="w-full bg-[#C5A059] text-white font-condensed font-black text-sm uppercase h-[52px] rounded-xl shadow tracking-wider">
              Continue
            </button>
          </div>
        </div>
      )}

      {/* ── PANEL 4b: Time Picker – Return ── */}
      {mobilePanel === 'time-return' && (
        <div className="md:hidden fixed inset-0 z-[300] bg-white flex flex-col animate-slideInLeft">
          <div className="flex items-center justify-between px-5 py-4 border-b border-neutral-100">
            <button onClick={() => setMobilePanel('details')} className="text-neutral-700 p-1">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M19 12H5M12 5l-7 7 7 7"/></svg>
            </button>
            <span className="font-black text-base text-neutral-900">Select return time</span>
            <div className="w-8" />
          </div>
          <div className="grid grid-cols-2 gap-3 px-5 pt-4 pb-2">
            <div className="flex items-center gap-2 border-2 border-neutral-200 bg-neutral-50 rounded-xl h-[44px] px-3">
              <svg className="w-4 h-4 text-neutral-600 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
              <span className="text-xs font-bold text-neutral-900">{pickupDate || '—'}</span>
            </div>
            <div className="flex items-center gap-2 border-2 border-[#C5A059] bg-[#FDF8EF] rounded-xl h-[44px] px-3">
              <svg className="w-4 h-4 text-neutral-600 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
              <span className="text-xs font-bold text-neutral-900">{returnDate || '—'}</span>
            </div>
          </div>
          <p className="px-5 text-[11px] text-neutral-400 font-semibold mb-1">⏱ Opening Times: {stationsData[pickupLocation]?.hours || '05:00 AM - 11:59 PM'}</p>
          <div className="flex-grow overflow-y-auto px-5 pb-8">
            <TimePickerPopup activeTimeField="return" currentTime={returnTime} selectTime={(slot) => { setReturnTime(slot); setMobilePanel('details'); }} />
          </div>
          <div className="px-5 py-4 border-t border-neutral-100 bg-white">
            <button type="button" onClick={() => setMobilePanel('details')}
              className="w-full bg-[#C5A059] text-white font-condensed font-black text-sm uppercase h-[52px] rounded-xl shadow tracking-wider">
              Continue
            </button>
          </div>
        </div>
      )}


      {isSticky && !isDropdownMode && (
        <div className="w-full max-w-[1100px] px-6 h-[420px] md:h-[310px] pointer-events-none" />
      )}

    </section>

    {!isDropdownMode && (
      <>
        {/* Full-width solid Orange Title Banner positioned exactly below the Hero section */}
        <div className="w-full bg-[#C5A059] text-black text-center py-6 md:py-8 z-10 relative">
          <h1 className="font-condensed font-black text-5xl md:text-[80px] tracking-tight uppercase leading-none">
            <span className="text-[#C5A059]">W</span> LUXURY CAR RENTAL
      </h1>
      <p className="text-[10px] md:text-[19px] font-bold mt-4 md:mt-5">
        Choose from our range of top Luxury cars worldwide
      </p>
    </div>

    {/* Section 1: USA/Global Description Box */}
    <div className="w-full bg-[#121212] text-neutral-300 py-16 px-6 text-center flex flex-col items-center justify-center relative z-10">
      <p className="max-w-[850px] mx-auto text-sm md:text-[15px] font-medium leading-relaxed text-neutral-300">
        Need a luxury car rental in the USA? <span className="text-[#C5A059] font-bold">W</span> Luxury Car Rental offers modern, well-maintained vehicles with clear pricing and smooth booking. Whether for city trips, business, or travel around the USA, enjoy comfort, space, and reliable performance. Add add-ons like GPS, child seats, or extra drivers easily online. With numerous branches and consistent quality worldwide, pickup and return are quick and stress-free — premium mobility made simple.
      </p>
      <button 
        type="button"
        onClick={handleScrollToListings}
        className="bg-[#C5A059] hover:bg-[#B28F4B] text-white px-10 py-4 mt-8 font-condensed font-black uppercase text-sm tracking-wider rounded-xl transition-all shadow-lg hover:scale-[1.02] active:scale-95 duration-200"
      >
        Rent now
      </button>
    </div>

    {/* Section 2: Spotlights Recommendation Carousel */}
    <div className="w-full bg-[#070707] text-white py-16 px-6 text-center select-none relative z-10">
      <div className="max-w-[1100px] mx-auto">
        <h2 className="font-condensed font-black text-2xl md:text-4xl text-white tracking-wide uppercase text-center leading-none">
          FIND YOUR LUXURY CAR IN OUR FLEET
        </h2>
        
        {/* Carousel grid of 2 cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12 text-left">
          {carouselSlides[currentSlide].map((item, idx) => (
            <CarCard 
              key={"reco-card-" + idx}
              car={item}
              viewMode="fleet"
              onClick={handleScrollToListings}
            />
          ))}
        </div>

        {/* Carousel Controls */}
        <div className="flex items-center justify-between mt-8 select-none">
          {/* Carousel dots indicator */}
          <div className="flex gap-2">
            {carouselSlides.map((_, index) => (
              <button
                key={`dot-${index}`}
                type="button"
                onClick={() => setCurrentSlide(index)}
                className={`w-1.5 h-1.5 rounded-full transition-all duration-200 ${
                  currentSlide === index ? 'bg-white scale-110' : 'bg-neutral-600 hover:bg-neutral-500'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>

          {/* Chevrons Navigation circles */}
          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => setCurrentSlide(prev => (prev === 0 ? carouselSlides.length - 1 : prev - 1))}
              className="w-10 h-10 rounded-full border border-neutral-800 hover:border-neutral-400 hover:bg-neutral-900 flex items-center justify-center text-white transition-colors"
              aria-label="Previous slide"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              type="button"
              onClick={() => setCurrentSlide(prev => (prev === carouselSlides.length - 1 ? 0 : prev + 1))}
              className="w-10 h-10 rounded-full border border-neutral-800 hover:border-neutral-400 hover:bg-neutral-900 flex items-center justify-center text-white transition-colors"
              aria-label="Next slide"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>



      </div>
    </div>

    {/* Section 3: Features Indicators Row */}
    <div className="w-full bg-[#070707] border-t border-neutral-900/50 py-10 px-6 relative z-10">
      <div className="max-w-[1100px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
        {/* Global reach */}
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-3 text-[18px] font-bold text-white">
            <Globe className="w-6 h-6 text-white stroke-[2.5]" />
            <span>Global reach</span>
          </div>
          <p className="text-[25px] font-bold text-white leading-[1.3] pr-4">
            2,000+ <span className="text-[#C5A059]">W</span> Luxury stations in over 105 countries
          </p>
        </div>

        {/* Top fleet */}
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-3 text-[18px] font-bold text-white">
            <CarFront className="w-6 h-6 text-white stroke-[2.5]" />
            <span>Top fleet</span>
          </div>
          <p className="text-[25px] font-bold text-white leading-[1.3] pr-4">
            Choose your favorite Luxury car from our wide range
          </p>
        </div>

        {/* Exceptional service */}
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-3 text-[18px] font-bold text-white">
            <HandHeart className="w-6 h-6 text-white stroke-[2.5]" />
            <span>Exceptional service</span>
          </div>
          <p className="text-[25px] font-bold text-white leading-[1.3] pr-4">
            Stress-free, trustworthy, no hidden costs
          </p>
        </div>
      </div>
    </div>

    {/* Section 4: Browse Popular Types Grid */}
    <div className="w-full bg-white text-neutral-900 py-20 px-6 text-center select-none relative z-10 border-t border-neutral-100">
      <div className="max-w-[1100px] mx-auto">
        <h2 className="font-condensed font-black text-4xl md:text-6xl lg:text-[64px] text-neutral-900 tracking-wide uppercase text-center leading-none">
          BROWSE POPULAR TYPES
        </h2>

        {/* Top Row Grid: First 4 items */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-16 text-center w-full">
          {popularTypesList.slice(0, 4).map((item, index) => (
            <div 
              key={`popular-${index}`}
              className="w-full flex flex-col items-center transition-all duration-200 mx-auto"
            >
              {/* Car Image central alignment */}
              <div className="relative w-full h-[180px] flex items-center justify-center mb-6">
                <img 
                  src={item.image} 
                  alt={item.title}
                  className="max-h-[160px] w-[105%] object-contain drop-shadow-[0_4px_10px_rgba(0,0,0,0.15)] hover:scale-110 transition-transform duration-300"
                />
              </div>

              <div className="flex flex-col items-center w-full px-2">
                <h3 className="font-condensed font-black text-[26px] md:text-[30px] text-[#191919] uppercase tracking-wide leading-[1.1] mb-1">
                  {item.title}
                </h3>
                <span className="text-[14px] text-[#333333] block mb-3">
                  {item.subtitle}
                </span>

                {/* Clean Specs Row */}
                <div className="flex items-center justify-center gap-3 text-[12px] font-bold text-[#191919] mb-4">
                  <div className="flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5 text-[#191919] stroke-[2.5]" />
                    <span>{item.seats} seaters</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Briefcase className="w-3.5 h-3.5 text-[#191919] stroke-[2.5]" />
                    <span>{item.suitcases} bags</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    {item.transmission.toLowerCase().includes('range') ? (
                      <svg className="w-4 h-4 text-[#191919] stroke-[2.5]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <rect x="2" y="7" width="16" height="10" rx="2" ry="2" />
                        <line x1="22" y1="11" x2="22" y2="13" />
                      </svg>
                    ) : (
                      <span className="w-4 h-4 bg-[#191919] text-white rounded-[2px] flex items-center justify-center text-[10px] font-black leading-none">A</span>
                    )}
                    <span>{item.transmission}</span>
                  </div>
                </div>

                <p className="text-[13px] text-[#333333] leading-relaxed max-w-[240px] mx-auto mb-5">
                  {item.desc}
                </p>
                <button
                  type="button"
                  onClick={handleScrollToListings}
                  className="bg-[#191919] hover:bg-black text-white font-bold text-[13px] py-2.5 px-6 rounded-full transition-all hover:scale-[1.02] active:scale-95 w-fit mx-auto shadow-md"
                >
                  Check availability
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Row Flex: Centered remaining 2 items */}
        <div className="flex flex-col sm:flex-row justify-center gap-6 mt-6 text-center w-full lg:max-w-[50%] mx-auto">
          {popularTypesList.slice(4, 6).map((item, index) => (
            <div 
              key={`popular-${index + 4}`}
              className="w-full flex flex-col items-center transition-all duration-200"
            >
              {/* Car Image central alignment */}
              <div className="relative w-full h-[180px] flex items-center justify-center mb-6">
                <img 
                  src={item.image} 
                  alt={item.title}
                  className="max-h-[160px] w-[105%] object-contain drop-shadow-[0_4px_10px_rgba(0,0,0,0.15)] hover:scale-110 transition-transform duration-300"
                />
              </div>

              <div className="flex flex-col items-center w-full px-2">
                <h3 className="font-condensed font-black text-[26px] md:text-[30px] text-[#191919] uppercase tracking-wide leading-[1.1] mb-1">
                  {item.title}
                </h3>
                <span className="text-[14px] text-[#333333] block mb-3">
                  {item.subtitle}
                </span>

                {/* Clean Specs Row */}
                <div className="flex items-center justify-center gap-3 text-[12px] font-bold text-[#191919] mb-4">
                  <div className="flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5 text-[#191919] stroke-[2.5]" />
                    <span>{item.seats} seaters</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Briefcase className="w-3.5 h-3.5 text-[#191919] stroke-[2.5]" />
                    <span>{item.suitcases} bags</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    {item.transmission.toLowerCase().includes('range') ? (
                      <svg className="w-4 h-4 text-[#191919] stroke-[2.5]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <rect x="2" y="7" width="16" height="10" rx="2" ry="2" />
                        <line x1="22" y1="11" x2="22" y2="13" />
                      </svg>
                    ) : (
                      <span className="w-4 h-4 bg-[#191919] text-white rounded-[2px] flex items-center justify-center text-[10px] font-black leading-none">A</span>
                    )}
                    <span>{item.transmission}</span>
                  </div>
                </div>

                <p className="text-[13px] text-[#333333] leading-relaxed max-w-[240px] mx-auto mb-5">
                  {item.desc}
                </p>
                <button
                  type="button"
                  onClick={handleScrollToListings}
                  className="bg-[#191919] hover:bg-black text-white font-bold text-[13px] py-2.5 px-6 rounded-full transition-all hover:scale-[1.02] active:scale-95 w-fit mx-auto shadow-md"
                >
                  Check availability
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Small warning print at bottom */}
        <p className="text-[10px] text-neutral-400 font-bold mt-10 text-center leading-normal max-w-lg mx-auto">
          Vehicles shown are examples only. Availability may vary based on pickup location and dates.
        </p>

      </div>
    </div>

    {/* Section 5: W LUXURY CAR RENTAL WORLDWIDE Description */}
    <div className="w-full bg-white text-neutral-900 py-20 px-6 relative z-10 border-t border-neutral-100">
      <div className="max-w-[1100px] mx-auto text-center">
        <h2 className="font-condensed font-black text-4xl md:text-6xl lg:text-[64px] text-[#191919] tracking-wide uppercase text-center leading-none mb-16">
          <span className="text-[#C5A059]">W</span> LUXURY CAR RENTAL WORLDWIDE
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 text-left">
          {/* Column 1 */}
          <div>
            <h3 className="font-bold text-[22px] text-[#191919] mb-4">
              <span className="text-[#C5A059]">W</span> Luxury Car Rental
            </h3>
            <div className="text-[15px] text-[#191919] font-normal leading-[1.6] space-y-4 pr-4">
              <p>
                Drive your dream car in style with a luxury car rental from <span className="text-[#C5A059] font-bold">W</span>. Whether you're after the excitement of a convertible or the power of a sleek sports car, we've got the perfect ride for you.
              </p>
              <p>
                Explore our exotic car rental options and choose from top-tier brands like Mercedes-Benz and BMW. With <span className="text-[#C5A059] font-bold">W</span>, renting a luxury or exotic car is simple, affordable, and designed to turn every drive into a special experience. Wherever you're headed, let us help you travel in comfort and style.
              </p>
            </div>
          </div>

          {/* Column 2 */}
          <div>
            <h3 className="font-bold text-[22px] text-[#191919] mb-4">
              Experience the Joy of Driving An Exotic Car
            </h3>
            <div className="text-[15px] text-[#191919] font-normal leading-[1.6] space-y-4 pr-4">
              <p>
                Make heads turn while on the road with <span className="text-[#C5A059] font-bold">W</span>'s exotic fleet. Our extensive selection of vehicles in the US means there's something for everyone.
              </p>
              <p>
                Don't miss out when traveling with a group, with our Cadillac Escalades or Chevrolet Suburban full-size SUVs you can move around in style and comfort. For a super-charged performance, you'll need a sports car, like the Ford Mustang Shelby GT. Our fleet has the largest selection of luxury German cars, including Audi, Porsche, and Mercedes-Benz, available at all US locations. Rent a like new vehicle as ours are on average less than 3 months old.
              </p>
              <p>
                Our affordable prices mean you pay less than you'd expect. Are you ready to drive premium and pay economy?
              </p>
            </div>
          </div>

          {/* Column 3 */}
          <div>
            <h3 className="font-bold text-[22px] text-[#191919] mb-4">
              How to Rent a Luxury Car with <span className="text-[#C5A059]">W</span> Luxury Car Rental
            </h3>
            <div className="text-[15px] text-[#191919] font-normal leading-[1.6] space-y-4 pr-4">
              <p>
                Booking a luxury car with <span className="text-[#C5A059] font-bold">W</span> is quick, seamless, and tailored to your travel needs. Simply choose your preferred vehicle class online or via the <span className="text-[#C5A059] font-bold">W</span> app, select your pickup location and dates, and customize your rental with flexible options like <span className="text-[#C5A059] underline cursor-pointer hover:text-black font-semibold">one-way car rental</span> or <span className="text-[#C5A059] underline cursor-pointer hover:text-black font-semibold">long-term car rental</span>.
              </p>
              <p>
                Whether you're seeking a refined sedan for city driving or an exotic car rental for a weekend escape, our premium fleet is at your fingertips. For more details on what's included and driver eligibility, check out our <span className="text-[#C5A059] underline cursor-pointer hover:text-black font-semibold">luxury car rental FAQ</span>.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>

    {/* Section 6: GOOD TO KNOW WHEN RENTING WITH W Accordion */}
    <div className="w-full bg-white text-neutral-900 py-20 px-6 relative z-10 border-t border-neutral-100">
      <div className="max-w-[1100px] mx-auto text-center">
        <h2 className="font-condensed font-black text-4xl md:text-6xl lg:text-[64px] text-[#191919] tracking-wide uppercase text-center leading-[1.1] mb-16">
          GOOD TO KNOW WHEN RENTING WITH <span className="text-[#C5A059]">W</span>
        </h2>
        
        <div className="text-left max-w-[900px] mx-auto">
          {/* FAQ 1 */}
          <div 
            onClick={() => setActiveFaqIndex(activeFaqIndex === 0 ? null : 0)}
            className="border-t border-[#e5e5e5] py-6 flex flex-col cursor-pointer transition-colors duration-200 hover:bg-neutral-50/50"
          >
            <div className="flex items-center justify-between">
              <span className="font-bold text-[22px] text-[#191919] select-none">
                How old do I need to be to rent a luxury car?
              </span>
              <span className="text-[#191919] font-bold ml-4">
                <svg className="w-6 h-6 text-[#191919]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d={activeFaqIndex === 0 ? "M5 15l7-7 7 7" : "M19 9l-7 7-7-7"} />
                </svg>
              </span>
            </div>
            {activeFaqIndex === 0 && (
              <p className="text-[15px] text-[#191919] font-normal leading-[1.6] mt-4 animate-fadeIn">
                You need to be 25 or older to rent a luxury car with <span className="text-[#C5A059] font-bold">W</span> in the US. Other countries may have a different minimum rental age for luxury models.
              </p>
            )}
          </div>

          {/* FAQ 2 */}
          <div 
            onClick={() => setActiveFaqIndex(activeFaqIndex === 1 ? null : 1)}
            className="border-t border-[#e5e5e5] py-6 flex flex-col cursor-pointer transition-colors duration-200 hover:bg-neutral-50/50"
          >
            <div className="flex items-center justify-between">
              <span className="font-bold text-[22px] text-[#191919] select-none">
                Can I choose which model I will get?
              </span>
              <span className="text-[#191919] font-bold ml-4">
                <svg className="w-6 h-6 text-[#191919]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d={activeFaqIndex === 1 ? "M5 15l7-7 7 7" : "M19 9l-7 7-7-7"} />
                </svg>
              </span>
            </div>
            {activeFaqIndex === 1 && (
              <p className="text-[15px] text-[#191919] font-normal leading-[1.6] mt-4 animate-fadeIn">
                While we cannot guarantee a specific model due to availability, you will receive a premium vehicle within your chosen category. Some models are guaranteed under special tags.
              </p>
            )}
          </div>

          {/* FAQ 3 */}
          <div 
            onClick={() => setActiveFaqIndex(activeFaqIndex === 2 ? null : 2)}
            className="border-t border-b border-[#e5e5e5] py-6 flex flex-col cursor-pointer transition-colors duration-200 hover:bg-neutral-50/50"
          >
            <div className="flex items-center justify-between">
              <span className="font-bold text-[22px] text-[#191919] select-none">
                What are the steps to rent a luxury car?
              </span>
              <span className="text-[#191919] font-bold ml-4">
                <svg className="w-6 h-6 text-[#191919]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d={activeFaqIndex === 2 ? "M5 15l7-7 7 7" : "M19 9l-7 7-7-7"} />
                </svg>
              </span>
            </div>
            {activeFaqIndex === 2 && (
              <p className="text-[15px] text-[#191919] font-normal leading-[1.6] mt-4 animate-fadeIn">
                1. Select your pickup station, dates, and times. 2. Filter or select the luxury category you want. 3. Enter your details and select protection packages. 4. Complete the booking online!
              </p>
            )}
          </div>
        </div>

        <div className="text-center mt-8">
          <button 
            type="button" 
            className="text-xs font-bold text-neutral-900 underline hover:text-[#C5A059] uppercase tracking-wider select-none"
          >
            Show more
          </button>
        </div>
      </div>
    </div>

    {/* Section 7: WHERE WOULD YOU LIKE TO START FROM? */}
    <div className="w-full bg-[#f4f4f4] text-neutral-900 py-20 px-6 relative z-10 border-t border-neutral-200">
      <div className="max-w-[1100px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 text-left items-start">
        {/* Left column */}
        <div className="lg:col-span-5 pr-4">
          <h2 className="font-condensed font-black text-4xl md:text-[56px] lg:text-[64px] text-[#191919] uppercase leading-[0.9] tracking-tight">
            WHERE WOULD YOU LIKE TO START FROM?
          </h2>
        </div>

        {/* Right column */}
        <div className="lg:col-span-7 bg-white rounded-[32px] p-6 md:p-10 shadow-sm">
          {/* Tab Pills list */}
          <div className="flex flex-wrap gap-2 pb-6">
            {['Europe', 'North America', 'Africa', 'Asia', 'South America', 'Australia'].map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => setActiveRegionTab(tab)}
                className={`px-5 py-2.5 rounded-full text-[13px] font-bold transition-all ${
                  activeRegionTab === tab
                    ? 'bg-[#191919] text-white'
                    : 'bg-[#f4f4f4] text-[#191919] hover:bg-[#e5e5e5]'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Listed Countries */}
          <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-y-4 gap-x-4 text-[13px] font-bold text-[#191919]">
            {regionCountries[activeRegionTab]?.map((country) => (
              <div 
                key={country} 
                onClick={() => handleDestinationClick(country)}
                className="hover:text-[#C5A059] cursor-pointer transition-colors truncate pr-2"
                title={country}
              >
                {country}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>

    {/* Section 8: PLACES TO START YOUR JOURNEY */}
    <div className="w-full bg-white text-neutral-900 py-20 px-6 relative z-10 border-t border-neutral-100">
      <div className="max-w-[1100px] mx-auto text-center">
        <h2 
          className="font-condensed font-black text-3xl md:text-4xl lg:text-[48px] text-[#191919] tracking-wide uppercase text-center leading-[1.1] mb-16"
          style={{ WebkitTextStroke: '1.5px #191919' }}
        >
          PLACES TO START YOUR JOURNEY
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { city: 'Los Angeles', img: 'https://images.unsplash.com/photo-1580655653885-65763b2597d0?auto=format&fit=crop&w=600&q=80' },
            { city: 'New York City', img: 'https://images.unsplash.com/photo-1485738422979-f5c462d49f74?auto=format&fit=crop&w=600&q=80' },
            { city: 'Miami, FL', img: 'https://images.unsplash.com/photo-1506970198081-a83a5be7bd20?auto=format&fit=crop&w=600&q=80' },
            { city: 'San Francisco', img: 'https://images.unsplash.com/photo-1506012787146-f92b2d7d6d96?auto=format&fit=crop&w=600&q=80' },
            { city: 'Las Vegas', img: 'https://images.unsplash.com/photo-1522083165195-3427502977a1?auto=format&fit=crop&w=600&q=80' },
            { city: 'London', img: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=600&q=80' }
          ].map((item, idx) => (
            <div 
              key={`dest-${idx}`}
              onClick={() => handleDestinationClick(item.city)}
              className="h-[240px] rounded-3xl overflow-hidden relative group cursor-pointer shadow-md hover:shadow-xl transition-all duration-300 hover:scale-[1.01]"
            >
              <img 
                src={item.img} 
                alt={item.city}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              {/* Overlay shadow gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent z-10" />
              
              {/* Badge */}
              <span className="absolute bottom-5 left-5 bg-black/60 backdrop-blur-md text-white px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider border border-white/5 z-20">
                {item.city}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>

    {/* Section 9: MORE W */}
    <div className="w-full bg-white text-neutral-900 py-20 px-6 relative z-10 border-t border-neutral-100">
      <div className="max-w-[1100px] mx-auto text-center">
        <h2 
          className="font-condensed font-black text-4xl md:text-5xl lg:text-[56px] text-[#191919] tracking-wide uppercase text-center leading-[1.1] mb-16"
          style={{ WebkitTextStroke: '1.5px #191919' }}
        >
          MORE <span className="text-[#C5A059]" style={{ WebkitTextStroke: '0' }}>W</span>
        </h2>

        {/* 3 cards grid carousel */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-6 text-center select-none">
          {moreSixtCards.slice(moreSixtSlide, moreSixtSlide + 3).map((item, idx) => (
            <div 
              key={item.title}
              className="relative h-[480px] rounded-3xl overflow-hidden flex flex-col justify-between p-8 text-white text-center shadow-lg group hover:shadow-2xl transition-all duration-300 bg-[#0F1012] border border-neutral-800"
            >
              {/* Card top text content grouped together */}
              <div className="z-20 relative flex flex-col items-center gap-3">
                <h3 className="font-condensed font-black text-[22px] md:text-2xl text-white uppercase tracking-wide leading-tight">
                  {item.title}
                </h3>
                <p className="text-[13px] text-neutral-200 font-semibold leading-relaxed max-w-[280px]">
                  {item.subtext}
                </p>
                <button 
                  type="button"
                  className="border border-white/60 hover:border-white hover:bg-white hover:text-black text-white text-xs font-bold uppercase tracking-wider px-5 py-2.5 rounded-full transition-all duration-200"
                >
                  {item.buttonText}
                </button>
              </div>

              {/* Card background graphic (spans full height behind content) */}
              <div className="absolute inset-0 z-10 pointer-events-none overflow-hidden">
                <img 
                  src={item.image} 
                  alt={item.title} 
                  className="w-full h-full object-cover object-bottom transform group-hover:scale-[1.03] transition-transform duration-500"
                />
                {/* Dark gradient overlay to blend the image into the card's dark style and ensure readability */}
                <div className="absolute inset-0 bg-gradient-to-b from-[#0F1012] via-[#0F1012]/50 to-transparent" />
              </div>

              {/* App badges overlay for Card 1 */}
              {item.isApp && (
                <div className="z-20 relative flex justify-center gap-2 mt-auto">
                  <div className="bg-black/60 backdrop-blur-md px-3.5 py-1.5 rounded-lg text-[9px] font-bold border border-white/10 tracking-tight">App Store</div>
                  <div className="bg-black/60 backdrop-blur-md px-3.5 py-1.5 rounded-lg text-[9px] font-bold border border-white/10 tracking-tight">Google Play</div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Carousel Controls Row */}
        <div className="flex items-center justify-between mt-8 select-none">
          {/* Dots indicators */}
          <div className="flex gap-2">
            {[0, 1, 2, 3].map((idx) => (
              <button
                key={`more-sixt-dot-${idx}`}
                type="button"
                onClick={() => setMoreSixtSlide(idx)}
                className={`w-1.5 h-1.5 rounded-full transition-all duration-200 ${
                  moreSixtSlide === idx ? 'bg-neutral-800 scale-110' : 'bg-neutral-300 hover:bg-neutral-400'
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>

          {/* Chevrons Navigation circles */}
          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => setMoreSixtSlide(prev => Math.max(0, prev - 1))}
              disabled={moreSixtSlide === 0}
              className={`w-10 h-10 rounded-full border border-neutral-200 hover:border-neutral-800 hover:bg-neutral-50 flex items-center justify-center text-neutral-800 transition-all duration-200 ${
                moreSixtSlide === 0 ? 'opacity-20 cursor-not-allowed pointer-events-none' : ''
              }`}
              aria-label="Previous slide"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              type="button"
              onClick={() => setMoreSixtSlide(prev => Math.min(3, prev + 1))}
              disabled={moreSixtSlide === 3}
              className={`w-10 h-10 rounded-full border border-neutral-200 hover:border-neutral-800 hover:bg-neutral-50 flex items-center justify-center text-neutral-800 transition-all duration-200 ${
                moreSixtSlide === 3 ? 'opacity-20 cursor-not-allowed pointer-events-none' : ''
              }`}
              aria-label="Next slide"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Footer Fleet list */}
        <div className="border-t border-[#e5e5e5] pt-16 grid grid-cols-1 lg:grid-cols-12 gap-12 text-left text-neutral-800">
          {/* Label side */}
          <div className="lg:col-span-5 pr-4">
            <h3 
              className="font-condensed font-black text-3xl md:text-4xl lg:text-[48px] text-[#191919] uppercase leading-[0.9] tracking-tight"
            >
              <span className="text-[#C5A059]">W</span>'S WORLDWIDE FLEET
            </h3>
            <p className="text-[15px] text-[#191919] mt-6 font-normal leading-[1.6]">
              Here you'll find all of our locations as well as the other types of cars we have in our fleet.
            </p>
          </div>

          {/* Links side */}
          <div className="lg:col-span-7 flex flex-col">
            <div className="mb-8">
              <button className="bg-[#191919] text-white text-[13px] font-bold px-5 py-2.5 rounded-full hover:bg-black transition-colors">
                All categories
              </button>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-6 gap-y-6">
              {[
                'Automatic car', 'Electric car', 'Station Wagon', 'Compact car',
                'Minivan', 'SUV', 'Convertible', 'Pickup truck',
                'Economy car', 'Sports car'
              ].map((link) => (
                <div 
                  key={link}
                  className="text-[13px] font-bold text-[#191919] hover:text-[#C5A059] cursor-pointer transition-colors select-none"
                >
                  {link}
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>

    {/* Footer Section */}
    <footer className="w-full bg-[#0a0a0b] py-16 px-6 relative z-10 text-left border-t border-neutral-900/60">
      <div className="max-w-[1100px] mx-auto">
        {/* Logo & Social Row */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-neutral-900 pb-8 mb-10 gap-4">
          <div className="flex flex-col items-start leading-none select-none">
            <span className="font-condensed font-black text-3xl tracking-tighter text-[#C5A059]">W</span>
            <span className="text-[7px] font-extrabold tracking-widest text-neutral-400 mt-0.5 uppercase">LUXURY RENTAL</span>
          </div>

          <div className="flex gap-4">
            <a href="#" aria-label="Instagram" className="w-9 h-9 rounded-full border border-neutral-900 bg-neutral-950 flex items-center justify-center text-neutral-500 hover:text-white hover:border-neutral-700 transition-all duration-200">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
              </svg>
            </a>
            <a href="#" aria-label="LinkedIn" className="w-9 h-9 rounded-full border border-neutral-900 bg-neutral-950 flex items-center justify-center text-neutral-500 hover:text-white hover:border-neutral-700 transition-all duration-200">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
                <rect width="4" height="12" x="2" y="9"/>
                <circle cx="4" cy="4" r="2"/>
              </svg>
            </a>
          </div>
        </div>

        {/* Column list grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 border-b border-neutral-900 pb-12 mb-10 text-left">
          {/* Column 1 */}
          <div>
            <h4 className="font-condensed font-black text-xs text-neutral-500 uppercase tracking-wider mb-5">
              Our programs
            </h4>
            <div className="flex flex-col gap-3.5 text-xs font-bold text-neutral-300">
              {['W+ CAR SUBSCRIPTION', 'W RIDE', 'Car rental deals', 'W ONE rewards program', 'W app'].map((link) => (
                <div key={link} className="hover:text-[#C5A059] transition-colors cursor-pointer select-none">
                  {link}
                </div>
              ))}
            </div>
          </div>

          {/* Column 2 */}
          <div>
            <h4 className="font-condensed font-black text-xs text-neutral-500 uppercase tracking-wider mb-5">
              W for business
            </h4>
            <div className="flex flex-col gap-3.5 text-xs font-bold text-neutral-300">
              {['Register my business', 'Travel agencies', 'Business car rental', 'Business car alternatives'].map((link) => (
                <div key={link} className="hover:text-[#C5A059] transition-colors cursor-pointer select-none">
                  {link}
                </div>
              ))}
            </div>
          </div>

          {/* Column 3 */}
          <div>
            <h4 className="font-condensed font-black text-xs text-neutral-500 uppercase tracking-wider mb-5">
              About us
            </h4>
            <div className="flex flex-col gap-3.5 text-xs font-bold text-neutral-300">
              {['W group', 'W Magazine', 'W News', 'Investor Relations', 'Careers', 'W Luxury Foundation'].map((link) => (
                <div key={link} className="hover:text-[#C5A059] transition-colors cursor-pointer select-none">
                  {link}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* App Store Buttons Row */}
        <div className="flex flex-wrap gap-3.5 mb-10 justify-start">
          <button 
            type="button" 
            className="flex items-center gap-2.5 bg-black border border-neutral-900 hover:border-neutral-800 px-4 py-2 rounded-xl text-left select-none active:scale-95 transition-all text-white"
          >
            <span className="text-xl leading-none"></span>
            <div>
              <span className="text-[8px] text-neutral-500 block font-bold leading-none uppercase">Download on the</span>
              <span className="text-[11px] text-white block font-black leading-none mt-0.5">App Store</span>
            </div>
          </button>
          <button 
            type="button" 
            className="flex items-center gap-2.5 bg-black border border-neutral-900 hover:border-neutral-800 px-4 py-2 rounded-xl text-left select-none active:scale-95 transition-all text-white"
          >
            <span className="text-sm text-[#C5A059] leading-none">▶</span>
            <div>
              <span className="text-[8px] text-neutral-500 block font-bold leading-none uppercase">GET IT ON</span>
              <span className="text-[11px] text-white block font-black leading-none mt-0.5">Google Play</span>
            </div>
          </button>
        </div>

        {/* Footer Bottom Bar */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 border-t border-neutral-900 pt-8 text-[10px] font-bold text-neutral-500 uppercase tracking-wider">
          <div className="flex flex-wrap gap-x-4 gap-y-2.5">
            {[
              'Help', 'Rental information', 'W for business', 'W partners',
              'W Magazine', 'Privacy', 'Do not share or sell my personal information',
              'Terms & conditions', 'Customers with disabilities', 'Cookie-Settings'
            ].map((link) => (
              <span key={link} className="hover:text-white cursor-pointer transition-colors">
                {link}
              </span>
            ))}
          </div>
          <span className="text-neutral-600 whitespace-nowrap block lg:text-right select-none">
            © 2026 <span className="text-[#C5A059]">W</span> Luxury Car Rental
          </span>
        </div>
      </div>
    </footer>
      </>
    )}
    </>
  );
}

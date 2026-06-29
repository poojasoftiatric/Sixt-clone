import React, { useState, useEffect } from 'react';
import Header from './components/Header.jsx';
import Hero from './components/Hero.jsx';
import Filters from './components/Filters.jsx';
import CarCard from './components/CarCard.jsx';
import BookingWizard from './components/BookingWizard.jsx';
import CarCardDetails from './components/CarCardDetails.jsx';
import CheckoutPage from './components/CheckoutPage.jsx';
import { initialCars } from './data/cars.js';

export default function App() {
  // Cars database state directly loaded from asset data file
  const [cars] = useState(initialCars);

  // Selected Booking Search parameters (default placeholders)
  const [searchParams, setSearchParams] = useState({
    pickupLocation: 'Munich Airport',
    pickupDate: '2026-06-27',
    pickupTime: '12:00 PM',
    returnDate: '2026-06-29',
    returnTime: '12:00 PM',
    driverAge: '30+'
  });

  // Selected vehicle for booking wizard modal
  const [selectedCar, setSelectedCar] = useState(null);

  // Inline details panel configuration state
  const [selectedCarId, setSelectedCarId] = useState(null);
  const [wizardStep, setWizardStep] = useState(1);
  const [wizardBookingOption, setWizardBookingOption] = useState('bestPrice');
  const [wizardMileage, setWizardMileage] = useState('included');

  // Track responsive grid columns
  const [cols, setCols] = useState(3);
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setCols(3);
      } else if (window.innerWidth >= 768) {
        setCols(2);
      } else {
        setCols(1);
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Pill filter toggles
  const [activeFilters, setActiveFilters] = useState({
    hotOffers: false,
    premium: false,
    guaranteed: false,
    automatic: false,
    electric: false
  });

  const [isSearchResultsView, setIsSearchResultsView] = useState(false);
  const [showFilterDrawer, setShowFilterDrawer] = useState(false);
  const [heroInitialPanel, setHeroInitialPanel] = useState(null);

  const handleSearchSubmit = (params) => {
    setSearchParams(params);
    setIsSearchResultsView(true);
    setSelectedCarId(null); // Close details on search submit
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  // Filter handlers
  const toggleFilter = (key) => {
    setActiveFilters(prev => ({ ...prev, [key]: !prev[key] }));
    setSelectedCarId(null); // Close details on filter change
  };

  const clearFilters = () => {
    setActiveFilters({
      hotOffers: false,
      premium: false,
      guaranteed: false,
      automatic: false,
      electric: false
    });
    setSelectedCarId(null); // Close details on clear
  };

  // Process filters
  const getFilteredCars = () => {
    let list = cars.filter(car => car.status === 'Enabled');

    if (activeFilters.hotOffers) {
      list = list.filter(car => car.isHotOffer);
    }
    if (activeFilters.premium) {
      list = list.filter(car => !car.isGuaranteedModel);
    }
    if (activeFilters.guaranteed) {
      list = list.filter(car => car.isGuaranteedModel);
    }
    if (activeFilters.automatic) {
      list = list.filter(car => car.transmission === 'Automatic');
    }
    if (activeFilters.electric) {
      list = list.filter(car =>
        car.category.toLowerCase().includes('electric') ||
        car.name.toLowerCase().includes('taycan') ||
        car.name.toLowerCase().includes('plaid') ||
        car.name.toLowerCase().includes('e-tron')
      );
    }

    if (activeFilters.wagon) {
      list = list.filter(car => car.category.toLowerCase().includes('wagon') || car.category.toLowerCase().includes('touring'));
    }
    if (activeFilters.sedan) {
      list = list.filter(car => car.category.toLowerCase().includes('sedan') || car.category.toLowerCase().includes('liftback') || car.category.toLowerCase().includes('executive') || car.category.toLowerCase().includes('vip'));
    }
    if (activeFilters.suv) {
      list = list.filter(car => car.category.toLowerCase().includes('suv'));
    }
    if (activeFilters.convertible) {
      list = list.filter(car => car.category.toLowerCase().includes('convertible') || car.category.toLowerCase().includes('roadster'));
    }
    if (activeFilters.family) {
      list = list.filter(car => car.category.toLowerCase().includes('van') || car.category.toLowerCase().includes('minivan') || car.category.toLowerCase().includes('3-row') || car.seats >= 7);
    }
    if (activeFilters.coupe) {
      list = list.filter(car => car.category.toLowerCase().includes('coupe') || car.category.toLowerCase().includes('supercar') || car.category.toLowerCase().includes('gt') || car.category.toLowerCase().includes('sports'));
    }

    return list;
  };

  const filteredCars = getFilteredCars();

  if (isSearchResultsView) {

    return (
      <div className="min-h-screen bg-white flex flex-col font-sans text-neutral-900">
        {/* Compact dark Header */}
        <Header
          isResultsPage={true}
          searchParams={searchParams}
          onEditSearch={() => {
            setHeroInitialPanel('details');
            setIsSearchResultsView(false);
          }}
          onResetView={() => {
            clearFilters();
            setIsSearchResultsView(false);
          }}
          onOpenFilters={() => setShowFilterDrawer(true)}
        />

        {/* Results Page content */}
        <main className="flex-grow pb-16 pt-10 max-w-[1100px] w-full mx-auto px-6">
          {/* Title */}
          <h2 className="hidden md:block font-condensed font-black text-3xl md:text-[34px] text-neutral-900 tracking-wide uppercase mb-8 text-left">
            WHICH CAR DO YOU WANT TO DRIVE?
          </h2>

          {/* Filters Row */}
          <div className="flex flex-nowrap md:flex-wrap items-center gap-2 mb-6 md:mb-10 overflow-x-auto no-scrollbar select-none py-1">
            {/* Recommended filter */}
            <button className="flex items-center gap-2 bg-white hover:bg-neutral-50 border border-neutral-300 rounded-full px-4 py-2 text-xs font-bold text-neutral-800 transition-colors whitespace-nowrap">
              Recommended
              <svg className="w-3.5 h-3.5 text-neutral-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M6 9l6 6 6-6" /></svg>
            </button>

            {/* Filters toggle (Desktop only) */}
            <button
              onClick={() => setShowFilterDrawer(true)}
              className="hidden md:flex items-center gap-2 bg-black hover:bg-neutral-900 rounded-full px-4 py-2 text-xs font-bold text-white transition-colors border border-black whitespace-nowrap"
            >
              <svg className="w-3.5 h-3.5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <line x1="4" y1="21" x2="4" y2="14" />
                <line x1="4" y1="10" x2="4" y2="3" />
                <line x1="12" y1="21" x2="12" y2="12" />
                <line x1="12" y1="8" x2="12" y2="3" />
                <line x1="20" y1="21" x2="20" y2="16" />
                <line x1="20" y1="12" x2="20" y2="3" />
                <line x1="1" y1="14" x2="7" y2="14" />
                <line x1="9" y1="8" x2="15" y2="8" />
                <line x1="17" y1="16" x2="23" y2="16" />
              </svg>
              Filters
              <svg className="w-3 h-3 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M6 9l6 6 6-6" /></svg>
            </button>

            {/* Hot offers */}
            <button
              onClick={() => toggleFilter('hotOffers')}
              className={`flex items-center gap-1.5 border rounded-full px-4 py-2 text-xs font-bold transition-all whitespace-nowrap ${activeFilters.hotOffers
                  ? 'bg-[#C5A059] border-[#C5A059] text-white'
                  : 'bg-white hover:bg-neutral-50 border-neutral-300 text-neutral-800'
                }`}
            >
              <span>🔥</span> Hot offers
            </button>

            {/* Premium */}
            <button
              onClick={() => toggleFilter('premium')}
              className={`flex items-center gap-1.5 border rounded-full px-4 py-2 text-xs font-bold transition-all whitespace-nowrap ${activeFilters.premium
                  ? 'bg-[#C5A059] border-[#C5A059] text-white'
                  : 'bg-white hover:bg-neutral-50 border-neutral-300 text-neutral-800'
                }`}
            >
              <span>💎</span> Premium
            </button>

            {/* Guaranteed model */}
            <button
              onClick={() => toggleFilter('guaranteed')}
              className={`flex items-center gap-1.5 border rounded-full px-4 py-2 text-xs font-bold transition-all whitespace-nowrap ${activeFilters.guaranteed
                  ? 'bg-[#C5A059] border-[#C5A059] text-white'
                  : 'bg-white hover:bg-neutral-50 border-neutral-300 text-neutral-800'
                }`}
            >
              <span>🚗</span> Guaranteed model
            </button>

            {/* Automatic */}
            <button
              onClick={() => toggleFilter('automatic')}
              className={`flex items-center gap-1.5 border rounded-full px-4 py-2 text-xs font-bold transition-all whitespace-nowrap ${activeFilters.automatic
                  ? 'bg-[#C5A059] border-[#C5A059] text-white'
                  : 'bg-white hover:bg-neutral-50 border-neutral-300 text-neutral-800'
                }`}
            >
              <span className={`w-4 h-4 rounded-full flex items-center justify-center text-[9px] font-black mr-0.5 ${activeFilters.automatic ? 'bg-white text-black' : 'bg-neutral-100 text-neutral-800'
                }`}>A</span>
              Automatic
            </button>
          </div>

          {/* Cars Grid */}
          <div className="w-full">
            {filteredCars.length === 0 ? (
              <div className="text-center py-20 border border-neutral-200 rounded-2xl bg-neutral-50 max-w-[600px] mx-auto px-6">
                <p className="text-neutral-500 font-bold mb-4">No luxury cars fit your currently selected filters.</p>
                <button
                  onClick={clearFilters}
                  className="bg-[#C5A059] text-white px-5 py-2.5 rounded-xl text-xs font-black font-condensed uppercase tracking-wider hover:bg-[#B28F4B] premium-transition"
                >
                  Clear Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredCars.map((car, idx) => {
                  const selectedIndex = filteredCars.findIndex(c => c._id === selectedCarId);
                  const insertAfterIndex = Math.min(
                    Math.floor(selectedIndex / cols) * cols + cols - 1,
                    filteredCars.length - 1
                  );

                  return (
                    <React.Fragment key={car._id}>
                      <div id={`car-card-container-${idx}`}>
                        <CarCard
                          car={car}
                          viewMode="results"
                          index={idx}
                          isSelected={selectedCarId === car._id}
                          onClick={(selected) => {
                            if (selectedCarId === selected._id) {
                              setSelectedCarId(null);
                            } else {
                              setSelectedCarId(selected._id);
                              // Smooth scroll to options section after delay
                              setTimeout(() => {
                                const optionsEl = document.getElementById('car-options-section');
                                if (optionsEl) {
                                  // Add offset so header doesn't cover it
                                  const y = optionsEl.getBoundingClientRect().top + window.scrollY - 80;
                                  window.scrollTo({ top: y, behavior: 'smooth' });
                                }
                              }, 150);
                            }
                          }}
                        />
                      </div>
                      {selectedCarId && idx === insertAfterIndex && !selectedCar && (
                        <div id="car-options-section" className="col-span-1 md:col-span-2 lg:col-span-3 flex justify-center mt-6 mb-4">
                          <div className="w-full max-w-[1100px]">
                            <CarCardDetails
                              car={filteredCars.find(c => c._id === selectedCarId)}
                              searchParams={searchParams}
                              onClose={() => setSelectedCarId(null)}
                              onBookingSuccess={() => {
                                setSelectedCarId(null);
                                setIsSearchResultsView(false);
                                clearFilters();
                              }}
                              onNext={(sCar, opt, mil) => {
                                setWizardBookingOption(opt);
                                setWizardMileage(mil);
                                setWizardStep(2);
                                setSelectedCar(sCar);
                                setSelectedCarId(null);
                              }}
                            />
                          </div>
                        </div>
                      )}
                    </React.Fragment>
                  );
                })}
              </div>
            )}
          </div>

          {/* Booking wizard modal overlay */}
          {selectedCar && (
            <CheckoutPage
              car={selectedCar}
              searchParams={searchParams}
              bookingOption={wizardBookingOption}
              mileage={wizardMileage}
              onClose={() => {
                setSelectedCar(null);
                setWizardStep(1);
              }}
            />
          )}
        </main>

        {/* Visual Footer */}
        <footer className="w-full bg-[#0C0C0C] text-neutral-500 py-10 px-4 border-t border-neutral-900 mt-auto text-xs text-center">
          <div className="max-w-[1100px] mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-col leading-none text-left">
              <span className="font-condensed font-extrabold text-2xl text-neutral-400">
                <span className="text-[#C5A059]">W</span>
              </span>
              <span className="text-[6px] tracking-[0.2em] font-semibold text-neutral-600 uppercase block">
                Luxury Collection
              </span>
            </div>

            <p className="font-semibold text-[10px] tracking-wider uppercase text-neutral-600">
              &copy; 2026 <span className="text-[#C5A059]">W</span> Luxury Car Rental. Created for paired client review. All rights reserved.
            </p>
          </div>
        </footer>

        {/* Slide-out Filter Drawer overlay and drawer itself */}
        {showFilterDrawer && (
          <>
            {/* Backdrop */}
            <div
              className="fixed inset-0 bg-black/50 z-[100] transition-opacity duration-300 animate-fadeIn"
              onClick={() => setShowFilterDrawer(false)}
            />
            {/* Drawer */}
            <div
              className="fixed top-0 left-0 h-full w-[550px] max-w-full bg-white text-neutral-900 shadow-2xl z-[101] flex flex-col justify-between transform transition-transform duration-300 ease-out animate-slideInLeft overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-100 flex-shrink-0 h-[64px]">
                <button
                  onClick={() => setShowFilterDrawer(false)}
                  className="text-neutral-900 hover:text-black font-semibold text-lg p-1.5 transition-colors"
                >
                  <svg className="w-5 h-5 text-neutral-900 stroke-[2.5]" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M15 18l-6-6 6-6"/></svg>
                </button>

                <h3 className="font-condensed font-black text-lg tracking-wide uppercase text-neutral-900 select-none">
                  Filters
                </h3>

                <button
                  onClick={clearFilters}
                  className="text-sm font-bold text-neutral-900 underline hover:text-[#cc3f0c] transition-colors"
                >
                  Clear
                </button>
              </div>

              {/* Scrollable Body */}
              <div className="flex-grow overflow-y-auto px-6 py-6 space-y-8 select-none text-left">
                {/* 1. Vehicle Type */}
                <div>
                  <h4 className="font-black text-[13px] text-neutral-900 uppercase tracking-wide mb-3.5">
                    Vehicle type
                  </h4>
                  <div className="flex flex-wrap gap-2.5">
                    {[
                      { id: 'wagon', label: 'Station wagon', icon: '🚙' },
                      { id: 'sedan', label: 'Sedan', icon: '🚗' },
                      { id: 'suv', label: 'SUV', icon: '🚙' },
                      { id: 'convertible', label: 'Convertible', icon: '🏎️' },
                      { id: 'family', label: 'Family car', icon: '🚐' },
                      { id: 'coupe', label: 'Coupe', icon: '🏎️' }
                    ].map((type) => {
                      const isSelected = activeFilters[type.id];
                      return (
                        <button
                          key={type.id}
                          type="button"
                          onClick={() => toggleFilter(type.id)}
                          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border text-xs font-bold transition-all ${isSelected
                              ? 'bg-black border-black text-white'
                              : 'bg-white hover:bg-neutral-50 border-neutral-200 text-neutral-800'
                            }`}
                        >
                          <span>{type.icon}</span> {type.label}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* 2. Premium selections */}
                <div>
                  <h4 className="font-black text-[13px] text-neutral-900 uppercase tracking-wide mb-3.5">
                    Premium selections
                  </h4>
                  <div className="flex flex-wrap gap-2.5">
                    {[
                      { id: 'premium', label: 'Premium', icon: '💎' },
                      { id: 'guaranteed', label: 'Guaranteed model', icon: '🚗' }
                    ].map((item) => {
                      const isSelected = activeFilters[item.id];
                      return (
                        <button
                          key={item.id}
                          type="button"
                          onClick={() => toggleFilter(item.id)}
                          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border text-xs font-bold transition-all ${isSelected
                              ? 'bg-black border-black text-white'
                              : 'bg-white hover:bg-neutral-50 border-neutral-200 text-neutral-800'
                            }`}
                        >
                          <span>{item.icon}</span> {item.label}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* 3. Features */}
                <div>
                  <h4 className="font-black text-[13px] text-neutral-900 uppercase tracking-wide mb-3.5">
                    Features
                  </h4>
                  <div className="flex flex-wrap gap-2.5">
                    {[
                      { id: 'performance', label: 'High performance', icon: '⚙️' },
                      { id: 'electric', label: 'Electric', icon: '⚡' },
                      { id: 'automatic', label: 'Automatic', icon: 'A' },
                      { id: 'gps', label: 'GPS', icon: '🗺️' },
                      { id: 'hotOffers', label: 'Hot offers', icon: '🔥' }
                    ].map((feature) => {
                      const isSelected = activeFilters[feature.id];
                      return (
                        <button
                          key={feature.id}
                          type="button"
                          onClick={() => toggleFilter(feature.id)}
                          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border text-xs font-bold transition-all ${isSelected
                              ? 'bg-black border-black text-white'
                              : 'bg-white hover:bg-neutral-50 border-neutral-200 text-neutral-800'
                            }`}
                        >
                          {feature.id === 'automatic' ? (
                            <span className={`w-4 h-4 rounded-full flex items-center justify-center text-[9px] font-black mr-0.5 ${isSelected ? 'bg-white text-black' : 'bg-neutral-200 text-neutral-800'
                              }`}>A</span>
                          ) : (
                            <span>{feature.icon}</span>
                          )}
                          {feature.label}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* 4. Minimum number of seats */}
                <div>
                  <h4 className="font-black text-[13px] text-neutral-900 uppercase tracking-wide mb-3.5">
                    Minimum number of seats
                  </h4>
                  <div className="flex gap-2">
                    {[4, 5, 7, 8, 9].map((num) => {
                      const isSelected = activeFilters.minSeats === num;
                      return (
                        <button
                          key={num}
                          type="button"
                          onClick={() => setActiveFilters(prev => ({
                            ...prev,
                            minSeats: isSelected ? null : num
                          }))}
                          className={`w-11 h-11 flex items-center justify-center rounded-xl border text-xs font-black transition-all ${isSelected
                              ? 'bg-black border-black text-white'
                              : 'bg-white hover:bg-neutral-50 border-neutral-200 text-neutral-800'
                            }`}
                        >
                          {num}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* 5. Bags */}
                <div>
                  <h4 className="font-black text-[13px] text-neutral-900 uppercase tracking-wide mb-3.5">
                    Bags
                  </h4>
                  <div className="flex gap-2">
                    {[2, 3, 4, 5, 6, 8].map((num) => {
                      const isSelected = activeFilters.minBags === num;
                      return (
                        <button
                          key={num}
                          type="button"
                          onClick={() => setActiveFilters(prev => ({
                            ...prev,
                            minBags: isSelected ? null : num
                          }))}
                          className={`w-11 h-11 flex items-center justify-center rounded-xl border text-xs font-black transition-all ${isSelected
                              ? 'bg-black border-black text-white'
                              : 'bg-white hover:bg-neutral-50 border-neutral-200 text-neutral-800'
                            }`}
                        >
                          {num}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* 6. Primary driver age */}
                <div>
                  <h4 className="font-black text-[13px] text-neutral-900 uppercase tracking-wide mb-3.5">
                    Primary driver age
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {[18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, '30+'].map((age) => {
                      const isSelected = activeFilters.driverAge === age;
                      return (
                        <button
                          key={age}
                          type="button"
                          onClick={() => setActiveFilters(prev => ({
                            ...prev,
                            driverAge: age
                          }))}
                          className={`px-3.5 h-11 flex items-center justify-center rounded-xl border text-xs font-black transition-all ${isSelected
                              ? 'bg-black border-black text-white shadow-md'
                              : 'bg-white hover:bg-neutral-50 border-neutral-200 text-neutral-800'
                            }`}
                        >
                          {age}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Sticky Footer */}
              <div className="border-t border-neutral-100 p-6 flex-shrink-0 bg-white shadow-[0_-5px_15px_rgba(0,0,0,0.02)]">
                <button
                  type="button"
                  onClick={() => setShowFilterDrawer(false)}
                  className="w-full bg-[#C5A059] hover:bg-[#B28F4B] text-white font-condensed font-black text-sm uppercase py-4 rounded-xl shadow-lg tracking-wider transition-all hover:scale-[1.01] active:scale-[0.99]"
                >
                  Show {filteredCars.length} {filteredCars.length === 1 ? 'offer' : 'offers'}
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#070707] flex flex-col font-sans text-[#F3F3F3]">
      {/* Visual Header */}
      <Header onResetView={() => {
        clearFilters();
        setSelectedCarId(null);
      }} />

      {/* Main Core Booking Experience */}
      <main className="flex-grow">
        <Hero 
          onSearch={handleSearchSubmit} 
          initialMobilePanel={heroInitialPanel} 
          onPanelClosed={() => setHeroInitialPanel(null)}
        />

        {selectedCar && (
          <BookingWizard
            car={selectedCar}
            searchParams={searchParams}
            initialStep={wizardStep}
            initialBookingOption={wizardBookingOption}
            initialMileage={wizardMileage}
            onClose={() => {
              setSelectedCar(null);
              setWizardStep(1);
            }}
            onSubmitSuccess={() => {
              setSelectedCar(null);
              setWizardStep(1);
            }}
          />
        )}
      </main>
    </div>
  );
}

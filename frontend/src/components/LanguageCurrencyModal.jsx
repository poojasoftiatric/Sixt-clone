import React, { useState } from 'react';
import { X, Search, Globe, DollarSign, Check } from 'lucide-react';

export default function LanguageCurrencyModal({ isOpen, onClose }) {
  const [activeTab, setActiveTab] = useState('language'); // 'language' or 'currency'
  const [searchQuery, setSearchQuery] = useState('');
  
  const [selectedLang, setSelectedLang] = useState('English (United States)');
  const [selectedCurrency, setSelectedCurrency] = useState('US Dollar');

  if (!isOpen) return null;

  const popularLanguages = [
    { name: 'English', region: 'United States', flag: 'us' },
    { name: 'Deutsch', region: 'Deutschland', flag: 'de' },
    { name: 'Español', region: 'España', flag: 'es' },
    { name: 'Français', region: 'France', flag: 'fr' }
  ];

  const moreLanguages = [
    { name: 'Deutsch', region: 'Österreich', flag: 'at' },
    { name: 'Deutsch', region: 'Schweiz', flag: 'ch' },
    { name: 'English', region: 'United Arab Emirates', flag: 'ae' },
    { name: 'English', region: 'Australia', flag: 'au' },
    { name: 'English', region: 'Canada', flag: 'ca' },
    { name: 'English', region: 'Saudi Arabia', flag: 'sa' },
    { name: 'English', region: 'Singapore', flag: 'sg' },
    { name: 'English', region: 'United Kingdom', flag: 'gb' }
  ];

  const currencies = [
    { name: 'US Dollar', code: 'USD - $' },
    { name: 'Albanian Lek', code: 'ALL - L' },
    { name: 'Algerian Dinar', code: 'DZD - د.ج' },
    { name: 'Angolan Kwanza', code: 'AOA - Kz' },
    { name: 'Argentine Peso', code: 'ARS - $' },
    { name: 'Armenian Dram', code: 'AMD - ֏' },
    { name: 'Aruban Florin', code: 'AWG - ƒ' },
    { name: 'Australian Dollar', code: 'AUD - A$' },
  ];

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-300">
      <div className="bg-white rounded-2xl w-full max-w-[850px] max-h-[85vh] flex flex-col relative shadow-2xl animate-in zoom-in-95 duration-300">
        
        {/* Close Button Header */}
        <div className="flex justify-end pt-4 pr-4">
          <button 
            onClick={onClose} 
            className="p-2 hover:bg-neutral-100 rounded-full transition-colors z-10"
          >
            <X className="w-6 h-6 text-[#191919]" />
          </button>
        </div>

        {/* Header / Tabs */}
        <div className="px-8 pb-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <button 
              onClick={() => {setActiveTab('language'); setSearchQuery('');}}
              className={`flex items-center gap-2 px-5 py-3 rounded-xl font-bold text-[15px] transition-colors ${
                activeTab === 'language' 
                  ? 'bg-[#191919] text-white' 
                  : 'bg-[#f5f5f5] text-[#191919] hover:bg-neutral-200'
              }`}
            >
              <Globe className={`w-5 h-5 ${activeTab === 'language' ? 'text-white' : 'text-[#191919]'}`} />
              Language & Region
            </button>
            <button 
              onClick={() => {setActiveTab('currency'); setSearchQuery('');}}
              className={`flex items-center gap-2 px-5 py-3 rounded-xl font-bold text-[15px] transition-colors ${
                activeTab === 'currency' 
                  ? 'bg-[#191919] text-white' 
                  : 'bg-[#f5f5f5] text-[#191919] hover:bg-neutral-200'
              }`}
            >
              <DollarSign className={`w-5 h-5 ${activeTab === 'currency' ? 'text-white' : 'text-[#191919]'}`} />
              Currency
            </button>
          </div>

          <div className="relative w-full md:w-auto md:flex-grow md:max-w-[300px]">
            <Search className="w-5 h-5 text-neutral-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input 
              type="text" 
              placeholder={`Search for ${activeTab === 'language' ? 'language or region' : 'currency'}`} 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-neutral-300 rounded-xl outline-none focus:border-[#C5A059] focus:ring-1 focus:ring-[#C5A059] transition-all text-[15px] text-[#191919]"
            />
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-8 pt-2 custom-scrollbar">
          
          {activeTab === 'language' && (
            <div>
              <h2 className="text-2xl font-bold text-[#191919] mb-4">Language & Region</h2>
              
              {!searchQuery && <h3 className="text-[14px] font-bold text-[#191919] mb-4 mt-6">Most popular</h3>}
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {popularLanguages
                  .filter(l => (l.name + l.region).toLowerCase().includes(searchQuery.toLowerCase()))
                  .map(lang => {
                  const isSelected = selectedLang === `${lang.name} (${lang.region})`;
                  return (
                    <div 
                      key={lang.region}
                      onClick={() => setSelectedLang(`${lang.name} (${lang.region})`)}
                      className={`flex items-center gap-3 p-3 rounded-xl cursor-pointer border-2 transition-all ${
                        isSelected ? 'border-[#191919] bg-white' : 'border-transparent hover:bg-neutral-50'
                      }`}
                    >
                      <img src={`https://flagcdn.com/w40/${lang.flag}.png`} alt={lang.region} className="w-8 h-6 rounded-sm shadow-sm object-cover" />
                      <div>
                        <div className="font-bold text-[14px] text-[#191919]">{lang.name}</div>
                        <div className="text-[12px] text-neutral-500">{lang.region}</div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {!searchQuery && <h3 className="text-[14px] font-bold text-[#191919] mb-4 mt-8">More languages</h3>}
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 pb-8">
                {moreLanguages
                  .filter(l => (l.name + l.region).toLowerCase().includes(searchQuery.toLowerCase()))
                  .map(lang => {
                  const isSelected = selectedLang === `${lang.name} (${lang.region})`;
                  return (
                    <div 
                      key={lang.region}
                      onClick={() => setSelectedLang(`${lang.name} (${lang.region})`)}
                      className={`flex items-center gap-3 p-3 rounded-xl cursor-pointer border-2 transition-all ${
                        isSelected ? 'border-[#191919] bg-white' : 'border-transparent hover:bg-neutral-50'
                      }`}
                    >
                      <img src={`https://flagcdn.com/w40/${lang.flag}.png`} alt={lang.region} className="w-8 h-6 rounded-sm shadow-sm object-cover" />
                      <div>
                        <div className="font-bold text-[14px] text-[#191919]">{lang.name}</div>
                        <div className="text-[12px] text-neutral-500">{lang.region}</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {activeTab === 'currency' && (
            <div>
              <h2 className="text-2xl font-bold text-[#191919] mb-6">Currency</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pb-8">
                {currencies
                  .filter(c => (c.name + c.code).toLowerCase().includes(searchQuery.toLowerCase()))
                  .map(currency => {
                  const isSelected = selectedCurrency === currency.name;
                  return (
                    <div 
                      key={currency.name}
                      onClick={() => setSelectedCurrency(currency.name)}
                      className={`flex items-center justify-between p-4 rounded-xl cursor-pointer border-2 transition-all ${
                        isSelected ? 'border-[#191919] bg-white' : 'border-transparent hover:bg-neutral-50'
                      }`}
                    >
                      <div>
                        <div className="font-bold text-[15px] text-[#191919]">{currency.name}</div>
                        <div className="text-[13px] text-neutral-500 mt-1">{currency.code}</div>
                      </div>
                      {isSelected && <Check className="w-5 h-5 text-[#191919] stroke-[2]" />}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}

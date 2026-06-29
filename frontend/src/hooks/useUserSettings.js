import { useState, useEffect } from 'react';

export function useUserSettings() {
  const [langCode, setLangCodeState] = useState(() => localStorage.getItem('user_langCode') || 'EN');
  const [currencySymbol, setCurrencySymbolState] = useState(() => localStorage.getItem('user_currencySymbol') || '$');
  const [langName, setLangNameState] = useState(() => localStorage.getItem('user_langName') || 'English (United States)');
  const [currencyName, setCurrencyNameState] = useState(() => localStorage.getItem('user_currencyName') || 'US Dollar');

  const setLangCode = (val) => { 
    setLangCodeState(val); 
    localStorage.setItem('user_langCode', val); 
    window.dispatchEvent(new Event('settings_changed')); 
  };
  const setCurrencySymbol = (val) => { 
    setCurrencySymbolState(val); 
    localStorage.setItem('user_currencySymbol', val); 
    window.dispatchEvent(new Event('settings_changed')); 
  };
  const setLangName = (val) => { 
    setLangNameState(val); 
    localStorage.setItem('user_langName', val); 
    window.dispatchEvent(new Event('settings_changed')); 
  };
  const setCurrencyName = (val) => { 
    setCurrencyNameState(val); 
    localStorage.setItem('user_currencyName', val); 
    window.dispatchEvent(new Event('settings_changed')); 
  };

  useEffect(() => {
    const handleStorageChange = () => {
      setLangCodeState(localStorage.getItem('user_langCode') || 'EN');
      setCurrencySymbolState(localStorage.getItem('user_currencySymbol') || '$');
      setLangNameState(localStorage.getItem('user_langName') || 'English (United States)');
      setCurrencyNameState(localStorage.getItem('user_currencyName') || 'US Dollar');
    };
    window.addEventListener('settings_changed', handleStorageChange);
    return () => window.removeEventListener('settings_changed', handleStorageChange);
  }, []);

  return {
    langCode, setLangCode,
    currencySymbol, setCurrencySymbol,
    langName, setLangName,
    currencyName, setCurrencyName
  };
}

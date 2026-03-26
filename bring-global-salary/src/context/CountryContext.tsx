import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  type CountryCode,
  DEFAULT_COUNTRY,
  getCountryConfig,
  COUNTRY_CODES,
} from '../config';

const STORAGE_KEY = '@bring_global_salary_active_country';

/** Fallback en memoria cuando AsyncStorage no está disponible (ej. native module null en web/Expo Go). */
let memoryFallback: string | null = null;

async function getStoredCountry(): Promise<string | null> {
  try {
    return await AsyncStorage.getItem(STORAGE_KEY);
  } catch {
    return memoryFallback;
  }
}

async function setStoredCountry(code: string): Promise<void> {
  memoryFallback = code;
  try {
    await AsyncStorage.setItem(STORAGE_KEY, code);
  } catch {
    // Sin persistencia; solo memoria para esta sesión
  }
}

type CountryContextValue = {
  activeCountry: CountryCode;
  setActiveCountry: (code: CountryCode) => void;
  config: ReturnType<typeof getCountryConfig>;
};

const CountryContext = createContext<CountryContextValue | null>(null);

export function CountryProvider({ children }: { children: React.ReactNode }) {
  const [activeCountry, setActiveCountryState] = useState<CountryCode>(DEFAULT_COUNTRY);

  useEffect(() => {
    getStoredCountry().then((stored) => {
      if (stored && COUNTRY_CODES.includes(stored as CountryCode)) {
        setActiveCountryState(stored as CountryCode);
      }
    });
  }, []);

  const setActiveCountry = useCallback((code: CountryCode) => {
    setActiveCountryState(code);
    setStoredCountry(code);
  }, []);

  const config = getCountryConfig(activeCountry);

  return (
    <CountryContext.Provider
      value={{
        activeCountry,
        setActiveCountry,
        config,
      }}
    >
      {children}
    </CountryContext.Provider>
  );
}

export function useCountry(): CountryContextValue {
  const value = useContext(CountryContext);
  if (!value) {
    throw new Error('useCountry must be used within CountryProvider');
  }
  return value;
}

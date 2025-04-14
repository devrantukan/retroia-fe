"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { getLocationInfo } from "../utils/getLocationInfo";

interface CurrencyContextType {
  currency: string;
  rate: number;
  isLoading: boolean;
}

const CurrencyContext = createContext<CurrencyContextType>({
  currency: "TRY",
  rate: 1,
  isLoading: true,
});

export function CurrencyProvider({ children }: { children: React.ReactNode }) {
  const [currency, setCurrency] = useState("TRY");
  const [rate, setRate] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const detectCurrency = async () => {
      try {
        const data = await getLocationInfo();
        if (data && !data.error) {
          setCurrency(data.currency);
          setRate(data.rate);
        }
      } catch (error) {
        console.error("Error fetching location or rates:", error);
        setCurrency("TRY");
        setRate(1);
      } finally {
        setIsLoading(false);
      }
    };

    detectCurrency();
  }, []);

  return (
    <CurrencyContext.Provider value={{ currency, rate, isLoading }}>
      {children}
    </CurrencyContext.Provider>
  );
}

export function useCurrency() {
  return useContext(CurrencyContext);
}

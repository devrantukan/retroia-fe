"use client";

import { useCurrency } from "@/app/context/CurrencyContext";

const PriceDisplay = ({ price }: { price: number }) => {
  const { currency, rate, isLoading } = useCurrency();

  if (isLoading) {
    return <span className="text-2xl font-bold text-primary">...</span>;
  }

  const formatPrice = (price: number, currency: string, rate: number) => {
    const convertedPrice = parseFloat((price * rate).toFixed(2));
    const formatter = new Intl.NumberFormat("tr-TR", {
      style: "currency",
      currency: currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    });
    return formatter.format(convertedPrice);
  };

  return formatPrice(price, currency, rate);
};

export default PriceDisplay;

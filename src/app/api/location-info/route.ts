import { NextResponse } from "next/server";

export async function GET() {
  try {
    // Fetch location data
    const locationResponse = await fetch("https://ipapi.co/json/");
    const locationData = await locationResponse.json();

    // Fetch exchange rates
    const ratesResponse = await fetch(
      "https://api.exchangerate-api.com/v4/latest/TRY"
    );
    const ratesData = await ratesResponse.json();

    // Determine currency based on location
    let selectedCurrency = "USD";
    let selectedRate = ratesData.rates.USD;

    if (locationData.continent_code === "EU") {
      selectedCurrency = "EUR";
      selectedRate = ratesData.rates.EUR;
    } else if (locationData.country_code === "TR") {
      selectedCurrency = "TRY";
      selectedRate = 1;
    } else if (locationData.country_code === "GB") {
      selectedCurrency = "GBP";
      selectedRate = ratesData.rates.GBP;
    }

    return NextResponse.json({
      location: locationData,
      currency: selectedCurrency,
      rate: selectedRate,
    });
  } catch (error) {
    console.error("Error fetching data:", error);
    return NextResponse.json(
      {
        error: "Failed to fetch data",
        currency: "TRY",
        rate: 1,
      },
      { status: 500 }
    );
  }
}

export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import { headers } from "next/headers";

export async function GET() {
  try {
    // Get client IP from headers
    const headersList = headers();
    const forwardedFor = headersList.get("x-forwarded-for");
    const cfConnectingIp = headersList.get("cf-connecting-ip");
    const clientIP =
      cfConnectingIp || (forwardedFor ? forwardedFor.split(",")[0] : null);

    if (!clientIP) {
      console.error("No client IP found in headers:", {
        forwardedFor,
        cfConnectingIp,
        allHeaders: Object.fromEntries(headersList.entries()),
      });
      return NextResponse.json(
        {
          error: "Could not determine client IP",
          currency: "TRY",
          rate: 1,
        },
        { status: 400 }
      );
    }

    // Fetch location data using client IP
    const locationResponse = await fetch(`https://ipapi.co/${clientIP}/json/`);
    if (!locationResponse.ok) {
      throw new Error(
        `Location API error: ${locationResponse.status} ${locationResponse.statusText}`
      );
    }
    const locationData = await locationResponse.json();

    // Fetch exchange rates
    const ratesResponse = await fetch(
      "https://api.exchangerate-api.com/v4/latest/TRY"
    );
    if (!ratesResponse.ok) {
      throw new Error(
        `Exchange rates API error: ${ratesResponse.status} ${ratesResponse.statusText}`
      );
    }
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

import { NextResponse } from "next/server";
import { headers } from "next/headers";

// Simple in-memory rate limiting
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute
const MAX_REQUESTS = 60; // 60 requests per minute
const requestCounts = new Map<string, { count: number; timestamp: number }>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const requestData = requestCounts.get(ip);

  if (!requestData) {
    requestCounts.set(ip, { count: 1, timestamp: now });
    return false;
  }

  if (now - requestData.timestamp > RATE_LIMIT_WINDOW) {
    requestCounts.set(ip, { count: 1, timestamp: now });
    return false;
  }

  if (requestData.count >= MAX_REQUESTS) {
    return true;
  }

  requestData.count++;
  return false;
}

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
        {
          status: 400,
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET",
            "Access-Control-Allow-Headers": "Content-Type",
          },
        }
      );
    }

    // Check rate limit
    if (isRateLimited(clientIP)) {
      return NextResponse.json(
        {
          error: "Too many requests",
          currency: "TRY",
          rate: 1,
        },
        {
          status: 429,
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET",
            "Access-Control-Allow-Headers": "Content-Type",
            "Retry-After": "60",
          },
        }
      );
    }

    // Fetch location data using client IP with timeout
    const locationController = new AbortController();
    const locationTimeout = setTimeout(() => locationController.abort(), 5000);

    const locationResponse = await fetch(`https://ipapi.co/${clientIP}/json/`, {
      signal: locationController.signal,
      headers: {
        Accept: "application/json",
      },
    });
    clearTimeout(locationTimeout);

    if (!locationResponse.ok) {
      console.error("Location API error:", {
        status: locationResponse.status,
        statusText: locationResponse.statusText,
        clientIP,
      });
      // Return fallback data instead of throwing
      return NextResponse.json(
        {
          location: {
            country_code: "TR",
            continent_code: "AS",
            city: "Istanbul",
            region: "Istanbul",
            latitude: 41.0082,
            longitude: 28.9784,
            currency: "TRY",
            languages: "tr",
            country_name: "Turkey",
            continent_name: "Asia",
          },
          currency: "TRY",
          rate: 1,
        },
        {
          status: 200,
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET",
            "Access-Control-Allow-Headers": "Content-Type",
          },
        }
      );
    }

    const locationData = await locationResponse.json();

    // Fetch exchange rates with timeout
    const ratesController = new AbortController();
    const ratesTimeout = setTimeout(() => ratesController.abort(), 5000);

    const ratesResponse = await fetch(
      "https://api.exchangerate-api.com/v4/latest/TRY",
      {
        signal: ratesController.signal,
        headers: {
          Accept: "application/json",
        },
      }
    );
    clearTimeout(ratesTimeout);

    if (!ratesResponse.ok) {
      console.error("Exchange rates API error:", {
        status: ratesResponse.status,
        statusText: ratesResponse.statusText,
      });
      // Return fallback data instead of throwing
      return NextResponse.json(
        {
          location: locationData,
          currency: "TRY",
          rate: 1,
        },
        {
          status: 200,
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET",
            "Access-Control-Allow-Headers": "Content-Type",
          },
        }
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

    return NextResponse.json(
      {
        location: locationData,
        currency: selectedCurrency,
        rate: selectedRate,
      },
      {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET",
          "Access-Control-Allow-Headers": "Content-Type",
          "Cache-Control": "public, max-age=3600",
        },
      }
    );
  } catch (error) {
    console.error("Error in location-info API:", error);
    return NextResponse.json(
      {
        error: "Failed to fetch data",
        details: error instanceof Error ? error.message : "Unknown error",
        currency: "TRY",
        rate: 1,
      },
      {
        status: 500,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET",
          "Access-Control-Allow-Headers": "Content-Type",
        },
      }
    );
  }
}

export const dynamic = "force-dynamic";

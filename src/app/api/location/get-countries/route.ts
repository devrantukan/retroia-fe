import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import prisma from "@/lib/prisma";

export async function GET(request: NextRequest, response: NextResponse) {
  const projectLocations = await prisma.propertyLocation.findMany({
    include: {
      property: {
        select: {
          publishingStatus: true,
        },
      },
    },
    where: {
      property: {
        publishingStatus: "PUBLISHED",
      },
    },
    distinct: ["country"],
  });

  console.log("projectLocationssss", projectLocations);

  let countries: string[] = [];

  projectLocations.forEach((location) => {
    countries.push(location.country);
  });

  console.log("countries", countries);
  function capitalize(s: string): string {
    return String(s[0]).toLocaleUpperCase("tr") + String(s).slice(1);
  }

  const data: any[] = [];
  await Promise.all(
    countries.map(async (country) => {
      const countryData = await prisma.country.findFirst({
        where: { country_name: country },
      });
      console.log("countryData", countryData);

      if (countryData) {
        data.push({
          country_id: countryData.country_id,
          country_name: countryData.country_name,
          country_slug: countryData.slug,
        });
      }
    })
  );

  console.log("data", data);

  return NextResponse.json(data);
}

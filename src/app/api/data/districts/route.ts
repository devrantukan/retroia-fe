import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import prisma from "@/lib/prisma";
import slugify from "slugify";

export async function GET(request: NextRequest, response: NextResponse) {
  const districts = await prisma.district.findMany({});
  const cities = await prisma.city.findMany({});

  let districtsObj: Record<string, string[]> = {};
  for (const city of cities) {
    const districtData = await prisma.district.findMany({
      where: {
        city_name: city.city_name,
      },
    });
    const districtNames = districtData.map(
      (district) => district.district_name
    );

    districtsObj[city.city_name] = districtNames;
  }

  return NextResponse.json(districtsObj);
}

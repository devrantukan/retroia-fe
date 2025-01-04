import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import prisma from "@/lib/prisma";
import slugify from "slugify";

export async function GET(request: NextRequest, response: NextResponse) {
  const neighborhoods = await prisma.neighborhood.findMany({});
  const districts = await prisma.district.findMany({});

  let neighborhoodsObj: Record<string, string[]> = {};
  for (const district of districts) {
    const neighborhoodsData = await prisma.neighborhood.findMany({
      where: {
        district_name: district.district_name,
      },
    });
    //  console.log(neighborhoodsData);
    const neighborhoodNames = neighborhoodsData.map(
      (neighborhood) => neighborhood.neighborhood_name
    );
    // console.log(neighborhoodNames);
    neighborhoodsObj[district.district_name] = neighborhoodNames;
  }

  return NextResponse.json(neighborhoodsObj);
}

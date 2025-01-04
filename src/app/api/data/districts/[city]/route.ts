import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import prisma from "@/lib/prisma";
import slugify from "slugify";

export async function GET(
  request: NextRequest,
  { params }: { params: { city: string } }
) {
  const districts = await prisma.district.findMany({
    where: {
      city_name: params.city,
    },
  });

  let districtsObj: Record<string, string[]> = {};
  const districtNames = districts.map((district) => district.district_name);
  // districtsObj[params.city] = districtNames;

  // console.log(JSON.stringify(districtsObj));

  return NextResponse.json(districtNames);
}

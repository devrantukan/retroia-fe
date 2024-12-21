import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import prisma from "@/lib/prisma";
import slugify from "slugify";

export async function GET(
  request: NextRequest,
  { params }: { params: { district: string } },
  response: NextResponse
) {
  const projectLocations = await prisma.propertyLocation.findMany({
    distinct: ["neighborhood"],
  });

  let neighborhoods: string[] = [];

  projectLocations.forEach((location) => {
    neighborhoods.push(location.neighborhood.toLocaleUpperCase("tr"));
  });

  console.log(neighborhoods);
  function capitalize(s: string): string {
    return String(s[0]).toLocaleUpperCase("tr") + String(s).slice(1);
  }
  const data: any[] = [];
  await Promise.all(
    neighborhoods.map(async (neighborhood) => {
      const neighborhoodData = await prisma.neighborhood.findFirst({
        where: { neighborhood_name: neighborhood },
      });

      if (neighborhoodData) {
        data.push({
          neighborhood_id: neighborhoodData.neighborhood_id,
          label: capitalize(
            neighborhoodData.neighborhood_name.toLocaleLowerCase("tr")
          ),
          value: slugify(neighborhoodData.neighborhood_name, {
            lower: true,
          }),
          district_name: capitalize(
            neighborhoodData.district_name.toLocaleLowerCase("tr")
          ),
          district_slug: slugify(neighborhoodData.district_name, {
            lower: true,
          }),
        });
      }
    })
  );

  return NextResponse.json(data);
}

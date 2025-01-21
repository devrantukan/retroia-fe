import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import prisma from "@/lib/prisma";
import slugify from "slugify";

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
    distinct: ["district"],
  });

  let districts: string[] = [];

  projectLocations.forEach((location) => {
    districts.push(location.district);
  });

  //console.log(districts);

  function capitalize(s: string): string {
    return String(s[0]).toLocaleUpperCase("tr") + String(s).slice(1);
  }
  const data: any[] = [];
  await Promise.all(
    districts.map(async (district) => {
      const districtData = await prisma.district.findFirst({
        where: { district_name: district.toLocaleUpperCase("tr") },
      });
      // console.log(districtData);

      if (districtData) {
        data.push({
          district_id: districtData.district_id,
          label: capitalize(districtData.district_name.toLocaleLowerCase("tr")),
          value: slugify(districtData.district_name, {
            lower: true,
          }),
          city_name: capitalize(districtData.city_name.toLocaleLowerCase("tr")),
          city_slug: slugify(districtData.city_name, {
            lower: true,
          }),
        });
      }
    })
  );

  // console.log(data);

  return NextResponse.json(data);
}

import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import prisma from "@/lib/prisma";
import slugify from "slugify";

export async function GET(request: NextRequest, response: NextResponse) {
  const districts = await prisma.district.findMany({});

  console.log(districts);
  districts.map(async (district) => {
    const slug = slugify(district.district_name, { lower: true });
    district.slug = slug;
    console.log(district.slug);
    console.log(district.district_id);
    await prisma.district.update({
      where: { district_id: district.district_id },
      data: { slug: district.slug },
    });
  });

  return NextResponse.json(districts);
}

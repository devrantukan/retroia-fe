import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import prisma from "@/lib/prisma";
import slugify from "slugify";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: number } },
  response: NextResponse
) {
  const property = await prisma.property.findUnique({
    where: {
      id: +params.id,
      publishingStatus: "PUBLISHED",
    },
    include: {
      status: true,
      feature: true,
      location: true,
      agent: {
        include: {
          office: true,
          role: true,
        },
      },
      contract: true,
      type: true,
      subType: true,
      descriptors: {
        include: {
          descriptor: {
            include: {
              category: true,
            },
          },
        },
      },
      images: {
        select: {
          id: true,
          url: true,
          propertyId: true,
          order: true,
        },
        orderBy: {
          order: "asc",
        },
      },
    },
  });

  return NextResponse.json(property);
}

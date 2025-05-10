import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const properties = await prisma.property.findMany({
      select: {
        id: true,
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
      where: {
        publishingStatus: "PUBLISHED",
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json({ data: properties });
  } catch (error) {
    console.error("Error fetching all properties:", error);
    return NextResponse.json({ data: [] }, { status: 500 });
  }
}

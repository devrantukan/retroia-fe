import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const property = await prisma.property.findFirst({
      where: {
        id: parseInt(params.id),
        publishingStatus: "PUBLISHED",
      },
    });

    return NextResponse.json({ exists: !!property });
  } catch (error) {
    return NextResponse.json({ exists: false });
  }
}

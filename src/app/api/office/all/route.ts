import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const offices = await prisma.office.findMany({
      select: {
        id: true,
      },
    });

    return NextResponse.json({ data: offices });
  } catch (error) {
    console.error("Error fetching all offices:", error);
    return NextResponse.json({ data: [] }, { status: 500 });
  }
}

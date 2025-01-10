import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { firstName, lastName, phone, officeId, message } = body;

    // Validate inputs
    if (!firstName || !lastName || !phone || !officeId || !message) {
      return NextResponse.json(
        { error: "Tüm alanlar zorunludur" },
        { status: 400 }
      );
    }

    // Create contact request
    const contactRequest = await prisma.contactRequest.create({
      data: {
        firstName,
        lastName,
        phone,
        message,
        officeId: officeId.toString(),
        status: "PENDING",
      },
    });

    return NextResponse.json(contactRequest);
  } catch (error) {
    console.error("Contact request error:", error);
    return NextResponse.json({ error: "İşlem başarısız" }, { status: 500 });
  }
}

import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import nodemailer from "nodemailer";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();

    const firstName = formData.get("firstName") as string;
    const lastName = formData.get("lastName") as string;
    const phone = formData.get("phone") as string;
    const officeId = formData.get("officeId") as string;
    const message = formData.get("message") as string;

    // Validate inputs
    if (!firstName || !lastName || !phone || !officeId || !message) {
      return NextResponse.json(
        { error: "Tüm alanlar zorunludur" },
        { status: 400 }
      );
    }

    // Fetch office details
    const office = await prisma.office.findUnique({
      where: {
        id: parseInt(officeId),
      },
      select: {
        name: true,
      },
    });

    if (!office) {
      return NextResponse.json({ error: "Ofis bulunamadı" }, { status: 404 });
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

    // Send email notification
    const transporter = nodemailer.createTransport({
      host: "mail.retroia.com",
      port: 587,
      secure: false,
      auth: {
        user: "info@retroia.com",
        pass: "Info!2025",
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    const emailContent = `
      <h2>Yeni İletişim Talebi</h2>
      <p><strong>Ad Soyad:</strong> ${firstName} ${lastName}</p>
      <p><strong>Telefon:</strong> ${phone}</p>
      <p><strong>Ofis:</strong> ${office.name}</p>
  
      <p><strong>Mesaj:</strong> ${message}</p>
    `;

    await transporter.sendMail({
      from: "info@retroia.com",
      to: "info@retroia.com",
      cc: "devrantukan@gmail.com",
      subject: "Yeni İletişim Talebi",
      html: emailContent,
    });

    return NextResponse.json(contactRequest);
  } catch (error) {
    console.error("Contact request error:", error);
    return NextResponse.json({ error: "İşlem başarısız" }, { status: 500 });
  }
}

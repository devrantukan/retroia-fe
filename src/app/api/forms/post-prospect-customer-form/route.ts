import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import nodemailer from "nodemailer";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();

    const firstName = formData.get("firstName") as string;
    const lastName = formData.get("lastName") as string;
    const email = formData.get("email") as string;
    const phone = formData.get("phone") as string;
    const city = formData.get("city") as string;
    const district = formData.get("district") as string;
    const streetAddress = formData.get("streetAddress") as string;
    const notes = formData.get("notes") as string;
    const propertyType = formData.get("propertyType") as string;
    const contractType = formData.get("contractType") as string;
    const kvkkConsent = formData.get("kvkkConsent") as string;
    const marketingConsent = formData.get("marketingConsent") as string;

    if (!firstName || !lastName || !email || !phone || !city || !district) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const user = await prisma.prospectCustomer.create({
      data: {
        firstName,
        lastName,
        email,
        phone,
        city,
        district,
        streetAddress,
        notes,
        propertyType,
        contractType,
        kvkkConsent: kvkkConsent === "true" ? 1 : 0,
        marketingConsent: marketingConsent === "true" ? 1 : 0,
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
      <h2>Yeni Müşteri Adayı Başvurusu</h2>
      <p><strong>Ad:</strong> ${firstName} ${lastName}</p>
      <p><strong>E-posta:</strong> ${email}</p>
      <p><strong>Telefon:</strong> ${phone}</p>
      <p><strong>Şehir:</strong> ${city}</p>
      <p><strong>İlçe:</strong> ${district}</p>
      <p><strong>Sokak Adresi:</strong> ${streetAddress}</p>
      <p><strong>Emlak Tipi:</strong> ${propertyType}</p>
      <p><strong>Sözleşme Tipi:</strong> ${contractType}</p>
      <p><strong>Notlar:</strong> ${notes}</p>
    `;

    await transporter.sendMail({
      from: "info@retroia.com",
      to: "info@retroia.com",
      cc: "devrantukan@gmail.com",
      subject: "Yeni Müşteri Adayı Başvurusu",
      html: emailContent,
    });

    return NextResponse.json({ message: "success" });
  } catch (error) {
    console.error("Error creating prospect customer:", error);
    return NextResponse.json(
      { error: "Failed to create prospect customer" },
      { status: 500 }
    );
  }
}

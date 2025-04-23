import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import nodemailer from "nodemailer";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();

    let data: Record<string, number> = {};
    formData.forEach((value, key) => (data[key] = parseInt(value as string)));

    const firstName = formData.get("firstName") as string;
    const lastName = formData.get("lastName") as string;
    const email = formData.get("email") as string;
    const phone = formData.get("phone") as string;
    const city = formData.get("city") as string;
    const district = formData.get("district") as string;
    const occupation = formData.get("occupation") as string;
    const educationLevel = formData.get("educationLevel") as string;
    const kvkkConsent = formData.get("kvkkConsent") as string;
    const marketingConsent = formData.get("marketingConsent") as string;

    if (
      !firstName ||
      !lastName ||
      !email ||
      !phone ||
      !city ||
      !district ||
      !occupation ||
      !educationLevel
    ) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const user = await prisma.prospectAgent.create({
      data: {
        firstName,
        lastName,
        email,
        phone,
        city,
        district,
        occupation,
        educationLevel,
        kvkkConsent: kvkkConsent === "1" ? 1 : 0,
        marketingConsent: marketingConsent === "1" ? 1 : 0,
      },
    });

    // // Send email notification
    // const transporter = nodemailer.createTransport({
    //   host: "mail.retroia.com",
    //   port: 465,
    //   secure: true,
    //   auth: {
    //     user: "info@retroia.com",
    //     pass: "Info!2025",
    //   },
    // });

    // const emailContent = `
    //   <h2>New Agent Prospect Submitted</h2>
    //   <p><strong>Name:</strong> ${firstName} ${lastName}</p>
    //   <p><strong>Email:</strong> ${email}</p>
    //   <p><strong>Phone:</strong> ${phone}</p>
    //   <p><strong>City:</strong> ${city}</p>
    //   <p><strong>District:</strong> ${district}</p>
    //   <p><strong>Occupation:</strong> ${occupation}</p>
    //   <p><strong>Education Level:</strong> ${educationLevel}</p>
    // `;

    // await transporter.sendMail({
    //   from: "info@retroia.com",
    //   to: "info@retroia.com",
    //   cc: "devrantukan@gmail.com",
    //   subject: "New Agent Prospect Submission",
    //   html: emailContent,
    // });

    return NextResponse.json({ message: "success" });
  } catch (error) {
    console.error("Error creating prospect agent:", error);
    return NextResponse.json(
      { error: "Failed to create prospect agent" },
      { status: 500 }
    );
  }
}

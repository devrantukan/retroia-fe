import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import nodemailer from "nodemailer";

// Function to test SMTP connection
async function testSMTPConnection() {
  try {
    console.log("Testing SMTP connection...");

    const transporter = nodemailer.createTransport({
      host: "mail.retroia.com",
      port: 587,
      secure: false,
      auth: {
        user: "info@retroia.com",
        pass: "Info!2025",
      },
      debug: true, // Enable debug logging
      logger: true, // Enable logger
      tls: {
        rejectUnauthorized: false,
        minVersion: "TLSv1.2",
      },
      connectionTimeout: 10000,
      greetingTimeout: 10000,
      socketTimeout: 10000,
    });

    // Test connection
    console.log("Attempting to verify connection...");
    await transporter.verify();
    console.log("Connection verified successfully");

    return true;
  } catch (error: any) {
    console.error("SMTP Connection Test Failed:", {
      message: error.message,
      code: error.code,
      command: error.command,
      response: error.response,
    });
    return false;
  }
}

// Function to send email asynchronously
async function sendEmailNotification(data: {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  city: string;
  district: string;
  occupation: string;
  educationLevel: string;
}) {
  try {
    console.log("Starting email notification...");

    // First test the connection
    const connectionTest = await testSMTPConnection();
    if (!connectionTest) {
      throw new Error("SMTP connection test failed");
    }

    const transporter = nodemailer.createTransport({
      host: "mail.retroia.com",
      port: 587,
      secure: false,
      auth: {
        user: "info@retroia.com",
        pass: "Info!2025",
      },
      debug: true,
      logger: true,
      tls: {
        rejectUnauthorized: false,
        minVersion: "TLSv1.2",
      },
      connectionTimeout: 10000,
      greetingTimeout: 10000,
      socketTimeout: 10000,
    });

    const emailContent = `
      <h2>Yeni Emlak Danışmanı Adayı Başvurusu</h2>
      <p><strong>Ad:</strong> ${data.firstName} ${data.lastName}</p>
      <p><strong>E-posta:</strong> ${data.email}</p>
      <p><strong>Telefon:</strong> ${data.phone}</p>
      <p><strong>Şehir:</strong> ${data.city}</p>
      <p><strong>İlçe:</strong> ${data.district}</p>
      <p><strong>Meslek:</strong> ${data.occupation}</p>
      <p><strong>Eğitim Seviyesi:</strong> ${data.educationLevel}</p>
    `;

    const mailOptions = {
      from: "info@retroia.com",
      to: "info@retroia.com",
      cc: "devrantukan@gmail.com",
      subject: "Yeni Emlak Danışmanı Adayı Başvurusu",
      html: emailContent,
    };

    console.log("Sending email with options:", mailOptions);

    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent successfully:", info);

    return info;
  } catch (error) {
    console.error("Error sending email:", error);
    throw error;
  }
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();

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

    // Send email notification asynchronously
    sendEmailNotification({
      firstName,
      lastName,
      email,
      phone,
      city,
      district,
      occupation,
      educationLevel,
    }).catch((error) => {
      console.error("Error in email notification:", error);
      // Log additional error details
      if (error.code) {
        console.error("SMTP Error Code:", error.code);
      }
      if (error.command) {
        console.error("SMTP Command:", error.command);
      }
      if (error.response) {
        console.error("SMTP Response:", error.response);
      }
    });

    return NextResponse.json({ message: "success" });
  } catch (error) {
    console.error("Error creating prospect agent:", error);
    return NextResponse.json(
      { error: "Failed to create prospect agent" },
      { status: 500 }
    );
  }
}

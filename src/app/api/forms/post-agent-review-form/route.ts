import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import nodemailer from "nodemailer";

function average(
  score1: number,
  score2: number,
  score3: number,
  score4: number,
  score5: number,
  score6: number
): number {
  const total = 6;
  let countZero = 0;

  if (score1 === 0) countZero++;
  if (score2 === 0) countZero++;
  if (score3 === 0) countZero++;
  if (score4 === 0) countZero++;
  if (score5 === 0) countZero++;
  if (score6 === 0) countZero++;

  const sum = score1 + score2 + score3 + score4 + score5 + score6;
  const avg = sum / (total - countZero);
  return avg;
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();

    const officeWorkerId = formData.get("officeWorkerId") as string;
    const firstName = formData.get("firstName") as string;
    const lastName = formData.get("lastName") as string;
    const email = formData.get("email") as string;
    const phone = formData.get("phone") as string;
    const review = formData.get("review") as string;
    const score1 = Number(formData.get("score1"));
    const score2 = Number(formData.get("score2"));
    const score3 = Number(formData.get("score3"));
    const score4 = Number(formData.get("score4"));
    const score5 = Number(formData.get("score5"));
    const score6 = Number(formData.get("score6"));
    const kvkkConsent = formData.get("kvkkConsent") as string;
    const marketingConsent = formData.get("marketingConsent") as string;
    const nameConsent = formData.get("nameConsent") as string;

    if (
      !officeWorkerId ||
      !firstName ||
      !lastName ||
      !email ||
      !phone ||
      !review
    ) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const reviewData = await prisma.officeWorkerReview.create({
      data: {
        firstName,
        lastName,
        email,
        phone,
        review,
        score1,
        score2,
        score3,
        score4,
        score5,
        score6,
        isApproved: 0,
        officeWorkerId: parseInt(officeWorkerId),
        avg: average(score1, score2, score3, score4, score5, score6),
        kvkkConsent: kvkkConsent === "true" ? 1 : 0,
        marketingConsent: marketingConsent === "true" ? 1 : 0,
        nameConsent: nameConsent === "true" ? 1 : 0,
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
      <h2>Yeni Danışman Değerlendirmesi</h2>
      <p><strong>Danışman ID:</strong> ${officeWorkerId}</p>
      <p><strong>Müşteri Adı:</strong> ${firstName} ${lastName}</p>
      <p><strong>Müşteri E-posta:</strong> ${email}</p>
      <p><strong>Müşteri Telefon:</strong> ${phone}</p>
      <p><strong>Değerlendirme:</strong> ${review}</p>
      <p><strong>Ortalama Puan:</strong> ${average(
        score1,
        score2,
        score3,
        score4,
        score5,
        score6
      )}/5</p>
    `;

    await transporter.sendMail({
      from: "info@retroia.com",
      to: "info@retroia.com",
      cc: "devrantukan@gmail.com",
      subject: "Yeni Danışman Değerlendirmesi",
      html: emailContent,
    });

    return NextResponse.json({ message: "success", reviewData });
  } catch (error) {
    console.error("Error creating agent review:", error);
    return NextResponse.json(
      { error: "Failed to create agent review" },
      { status: 500 }
    );
  }
}

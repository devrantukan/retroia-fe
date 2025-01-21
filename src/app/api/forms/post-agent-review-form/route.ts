import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import prisma from "@/lib/prisma";

export async function POST(request: NextRequest, response: NextResponse) {
  const formData = await request.formData();

  //console.log(formData);

  let data: Record<string, number> = {};
  formData.forEach((value, key) => (data[key] = parseInt(value as string)));

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
  const officeWorkerId = Number(formData.get("officeWorkerId"));

  let avg;

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

    if (score1 === 0) {
      countZero++;
    }
    if (score2 === 0) {
      countZero++;
    }
    if (score3 === 0) {
      countZero++;
    }
    if (score4 === 0) {
      countZero++;
    }
    if (score5 === 0) {
      countZero++;
    }
    if (score6 === 0) {
      countZero++;
    }

    const sum = score1 + score2 + score3 + score4 + score5 + score6;
    const avg = sum / (total - countZero);
    return avg;
  }
  //console.log(firstName, lastName, email, phone);

  const reviewData = await prisma.officeWorkerReview.create({
    data: {
      firstName: firstName,
      lastName: lastName,
      email: email,
      phone: phone,
      review: review,
      score1: score1,
      score2: score2,
      score3: score3,
      score4: score4,
      score5: score5,
      score6: score6,
      isApproved: 0,
      officeWorkerId: officeWorkerId,
      avg: average(score1, score2, score3, score4, score5, score6),

      kvkkConsent: kvkkConsent === "true" ? 1 : 0,
      marketingConsent: marketingConsent === "true" ? 1 : 0,
    },
  });

  return NextResponse.json({ message: "success" });
}

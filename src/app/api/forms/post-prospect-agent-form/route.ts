import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import prisma from "@/lib/prisma";

export async function POST(request: NextRequest, response: NextResponse) {
  const formData = await request.formData();

  console.log(formData);

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

  console.log(firstName, lastName, email, phone);

  const user = await prisma.prospectAgent.create({
    data: {
      firstName: firstName,
      lastName: lastName,
      email: email,
      phone: phone,
      city: city,
      district: district,
      occupation: occupation,
      educationLevel: educationLevel,
      kvkkConsent: kvkkConsent === "true" ? 1 : 0,
      marketingConsent: marketingConsent === "true" ? 1 : 0,
    },
  });

  return NextResponse.json({ message: "success" });
}

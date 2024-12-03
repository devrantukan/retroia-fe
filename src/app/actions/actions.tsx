"use server";

import { z } from "zod";

const reviewSchema = z.object({
  rating: z.number().min(1).max(5),
  comment: z.string().min(1).max(500),
});

export async function submitReview(p0: null, formData: FormData) {
  const rating = parseInt(formData.get("rating") as string, 10);
  const comment = formData.get("comment") as string;

  const result = reviewSchema.safeParse({ rating, comment });

  if (!result.success) {
    return { success: false, errors: result.error.errors };
  }

  // Here you would typically save the review to your database
  console.log("Received review:", { rating, comment });

  // Simulate a delay to show loading state
  await new Promise((resolve) => setTimeout(resolve, 1000));

  return { success: true, message: "Review submitted successfully!" };
}

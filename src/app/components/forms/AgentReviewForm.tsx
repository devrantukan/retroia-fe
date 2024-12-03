"use client";

import { useState } from "react";
import { useFormState } from "react-dom";
import { StarRating } from "@/app/components/StarRating";
import { submitReview } from "@/app/actions/actions";
import { Button } from "@nextui-org/button";

import { Textarea } from "@nextui-org/input";

import { Input } from "@nextui-org/react";
import { toast } from "react-toastify";

export default function ReviewForm() {
  const [rating, setRating] = useState(0);

  const [state, formAction] = useFormState(submitReview, {
    success: false,
    errors: [],
    message: "",
  });

  const handleSubmit = async (formData: FormData) => {
    const result = await submitReview(null, formData);
    if (result.success) {
      toast.success(result.message);
    } else {
      toast.error(
        result.errors ? result.errors[0]?.message : "An error occurred"
      );
    }
  };

  return (
    <div className=" bg-white  w-full mb-2">
      <form action={handleSubmit} className="space-y-4">
        <Input type="text" label="First Name" />
        <Input type="text" label="Last Name" />
        <Input type="email" label="Email" />
        <Input type="tel" label="Phone Number" />
        <h2 className=" text-blue-950 text-lg font-bold">
          Danışmanınızı Yorumlayın
        </h2>
        <div>
          <div className="flex flex-row items-center justify-between border-b-1">
            <label
              htmlFor="rating"
              className="block text-sm font-medium text-gray-700"
            >
              Düzenli Bilgilendirme
            </label>
            <StarRating onRatingChange={(value) => setRating(value)} />
            <input type="hidden" name="rating" value={rating} />
          </div>
          <div className="flex flex-row items-center justify-between border-b-1">
            <label
              htmlFor="rating"
              className="block text-sm font-medium text-gray-700 "
            >
              Hız
            </label>
            <StarRating onRatingChange={(value) => setRating(value)} />
            <input type="hidden" name="rating" value={rating} />
          </div>
          <div className="flex flex-row items-center justify-between border-b-1">
            <label
              htmlFor="rating"
              className="block text-sm font-medium text-gray-700 "
            >
              Profesyonel Deneyim
            </label>
            <StarRating onRatingChange={(value) => setRating(value)} />
            <input type="hidden" name="rating" value={rating} />
          </div>
          <div className="flex flex-row items-center justify-between border-b-1">
            <label
              htmlFor="rating"
              className="block text-sm font-medium text-gray-700 "
            >
              Sektör Bilgisi
            </label>
            <StarRating onRatingChange={(value) => setRating(value)} />
            <input type="hidden" name="rating" value={rating} />
          </div>
          <div className="flex flex-row items-center justify-between border-b-1">
            <label
              htmlFor="rating"
              className="block text-sm font-medium text-gray-700 "
            >
              Güvenilirlik
            </label>
            <StarRating onRatingChange={(value) => setRating(value)} />
            <input type="hidden" name="rating" value={rating} />
          </div>
          <div className="flex flex-row items-center justify-between border-b-1">
            <label
              htmlFor="rating"
              className="block text-sm font-medium text-gray-700 "
            >
              Diğer
            </label>
            <StarRating onRatingChange={(value) => setRating(value)} />
            <input type="hidden" name="rating" value={rating} />
          </div>
        </div>
        <div>
          <label
            htmlFor="comment"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Yorumunuz
          </label>
          <Textarea
            id="comment"
            name="comment"
            rows={4}
            placeholder="Lütfen Yorumunuzu yazınız..."
            className="mt-1 block w-full"
            required
          />
        </div>
        <Button
          type="submit"
          className="mt-8 bg-blue-950 text-white font-bold text-md "
        >
          Yorumu Gönder
        </Button>
      </form>
    </div>
  );
}

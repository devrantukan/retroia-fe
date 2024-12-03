"use client";

import { useState } from "react";
import { Star } from "@phosphor-icons/react/dist/ssr";

interface StarRatingProps {
  totalStars?: number;
  onRatingChange: (rating: number) => void;
}

export function StarRating({
  totalStars = 5,
  onRatingChange,
}: StarRatingProps) {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);

  return (
    <div className="flex">
      {[...Array(totalStars)].map((_, index) => {
        const starValue = index + 1;
        return (
          <Star
            key={index}
            className={`w-6 h-6 cursor-pointer transition-colors ${
              starValue <= (hover || rating)
                ? "text-yellow-400 fill-yellow-400"
                : "text-gray-300"
            }`}
            onClick={() => {
              setRating(starValue);
              onRatingChange(starValue);
            }}
            onMouseEnter={() => setHover(starValue)}
            onMouseLeave={() => setHover(rating)}
          />
        );
      })}
    </div>
  );
}

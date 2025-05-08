import React from "react";

import Image from "next/image";

export default function OfficeImages({ images }: { images: any[] }) {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {images.map((image, index) => (
          <div key={index} className="aspect-video relative">
            <Image
              className="rounded-lg object-cover"
              src={image.url}
              alt=""
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
        ))}
      </div>
    </>
  );
}

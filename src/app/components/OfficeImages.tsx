import React from "react";

import Image from "next/image";

export default function OfficeImages({ images }: { images: any[] }) {
  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {images.map((image, index) => (
          <div key={index}>
            <Image
              className="h-auto max-w-full rounded-lg"
              src={image.url}
              alt=""
              width={480}
              height={400}
            />
          </div>
        ))}
      </div>
    </>
  );
}

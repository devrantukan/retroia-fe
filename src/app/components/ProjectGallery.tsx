"use client";

import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import dynamic from "next/dynamic";
import { CalendarIcon } from "@heroicons/react/24/outline";

const ProjectMap = dynamic(() => import("./ProjectMap"), {
  ssr: false,
  loading: () => (
    <div className="h-[400px] rounded-lg overflow-hidden bg-slate-100 flex items-center justify-center">
      <p>Harita yükleniyor...</p>
    </div>
  ),
});

interface ProjectGalleryProps {
  images: { url: string }[];
  name: string;
  startDate?: Date;
  endDate?: Date;
  location?: {
    latitude: number | null;
    longitude: number | null;
  } | null;
}

export default function ProjectGallery({
  images = [],
  name,
  startDate,
  endDate,
  location,
}: ProjectGalleryProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  if (!images || images.length === 0) {
    return (
      <div className="space-y-8">
        <div className="relative aspect-[16/9] rounded-lg overflow-hidden bg-slate-100 flex items-center justify-center">
          <p>Görsel bulunamadı</p>
        </div>
        {location?.latitude && location?.longitude && (
          <ProjectMap lat={location.latitude} lng={location.longitude} />
        )}
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Image Slider */}
      <div className="relative w-full h-[50vh] lg:h-[80vh] rounded-lg overflow-hidden">
        {images[currentImageIndex]?.url && (
          <>
            <Image
              src={images[currentImageIndex].url}
              alt={`${name} - Görsel ${currentImageIndex + 1}`}
              fill
              className="object-cover"
            />
            {/* Title and Dates Overlay */}
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <div className="bg-black/50 backdrop-blur-sm px-8 py-4 rounded-lg text-center">
                <h1 className="text-4xl font-bold text-white mb-4">{name}</h1>
                {(startDate || endDate) && (
                  <div className="flex items-center justify-center gap-6 text-white/90">
                    {startDate && (
                      <div className="flex items-center gap-2">
                        <CalendarIcon className="w-5 h-5" />
                        <span>
                          Başlangıç:{" "}
                          {startDate.toLocaleDateString("tr-TR", {
                            day: "numeric",
                            month: "long",
                            year: "numeric",
                          })}
                        </span>
                      </div>
                    )}
                    {endDate && (
                      <div className="flex items-center gap-2">
                        <CalendarIcon className="w-5 h-5" />
                        <span>
                          Teslim:{" "}
                          {endDate.toLocaleDateString("tr-TR", {
                            day: "numeric",
                            month: "long",
                            year: "numeric",
                          })}
                        </span>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </>
        )}
        {/* Navigation Buttons */}
        {images.length > 1 && (
          <>
            <button
              onClick={prevImage}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-md"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-md"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
            {/* Image Counter */}
            <div className="absolute bottom-4 right-4 bg-white/80 px-3 py-1 rounded-full text-sm">
              {currentImageIndex + 1} / {images.length}
            </div>
          </>
        )}
      </div>

      {/* Map */}
      {location?.latitude && location?.longitude && (
        <ProjectMap lat={location.latitude} lng={location.longitude} />
      )}
    </div>
  );
}

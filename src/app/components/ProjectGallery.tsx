"use client";

import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import dynamic from "next/dynamic";
import { CalendarIcon } from "@heroicons/react/24/outline";
import { MapPin } from "lucide-react";

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
    country: string;
    city: string;
    district: string;
    neighborhood: string;
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
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end p-6">
              <div className="space-y-4">
                <h1 className="text-3xl font-bold text-white">{name}</h1>
                {location && (
                  <div className="flex items-center gap-2 text-white/90">
                    <MapPin className="w-5 h-5" />
                    <span>
                      {location.city}, {location.district}
                      {location.neighborhood && `, ${location.neighborhood}`}
                    </span>
                  </div>
                )}
                <div className="flex flex-col gap-2">
                  {startDate && (
                    <div className="flex items-center gap-2 text-white/90">
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
                    <div className="flex items-center gap-2 text-white/90">
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
    </div>
  );
}

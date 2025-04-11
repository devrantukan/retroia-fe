"use client";

import Image from "next/image";
import { ChevronLeft, ChevronRight, MapPin } from "lucide-react";
import { useState } from "react";
import { CalendarIcon } from "@heroicons/react/24/outline";

interface ProjectGalleryProps {
  images: { url: string }[];
  name: string;
  startDate: Date;
  endDate: Date;
  location: {
    country: string;
    city: string;
    district: string;
    neighborhood: string;
    latitude: number | null;
    longitude: number | null;
  } | null;
  catalogUrl?: string;
}

export default function ProjectGallery({
  images = [],
  name,
  startDate,
  endDate,
  location,
  catalogUrl,
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
      <div className="relative aspect-[16/9] rounded-lg overflow-hidden bg-slate-100 flex items-center justify-center">
        <p>Görsel bulunamadı</p>
      </div>
    );
  }

  return (
    <div className="relative w-full h-[50vh] lg:h-[80vh] rounded-lg overflow-hidden">
      {images[currentImageIndex]?.url && (
        <>
          <Image
            src={images[currentImageIndex].url}
            alt={`${name} - Görsel ${currentImageIndex + 1}`}
            fill
            className="object-cover"
          />

          {/* Navigation Buttons */}
          {images.length > 1 && (
            <>
              <button
                onClick={prevImage}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-md z-20"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={nextImage}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-md z-20"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
              {/* Image Counter */}
              <div className="absolute bottom-4 right-4 bg-white/80 px-3 py-1 rounded-full text-sm z-20">
                {currentImageIndex + 1} / {images.length}
              </div>
            </>
          )}

          {/* Project Info Overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 pb-12 bg-gradient-to-t from-black/80 to-transparent z-10">
            <div className="max-w-7xl mx-auto flex flex-col items-center h-full justify-end">
              <div className="w-full max-w-md flex flex-col items-center gap-4 mx-4 sm:mx-8">
                <h1 className="text-2xl sm:text-3xl font-bold text-white bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg w-fit text-center">
                  {name}
                </h1>

                {/* Project Dates */}
                <div className="flex flex-col gap-2 w-fit">
                  <div className="flex items-center justify-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg w-fit">
                    <CalendarIcon className="w-5 h-5 text-primary-400" />
                    <span className="text-white/90 text-sm">
                      Başlangıç:{" "}
                      {startDate.toLocaleDateString("tr-TR", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}
                    </span>
                  </div>
                  <div className="flex items-center justify-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg w-fit">
                    <CalendarIcon className="w-5 h-5 text-primary-400" />
                    <span className="text-white/90 text-sm">
                      Teslim:{" "}
                      {endDate.toLocaleDateString("tr-TR", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}
                    </span>
                  </div>
                </div>

                {/* Catalog Button */}
                {catalogUrl && (
                  <a
                    href={catalogUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 bg-primary-500 text-white px-4 py-2 rounded-lg hover:bg-primary-600 transition-colors duration-200 w-fit min-w-[200px]"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-5 h-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span className="font-medium">Kataloğu İncele</span>
                  </a>
                )}

                {/* Location Info */}
                {location && (
                  <div className="flex items-center justify-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg w-fit">
                    <MapPin className="w-5 h-5 text-primary-400" />
                    <span className="text-white/90 text-center">
                      {location.city}, {location.district},{" "}
                      {location.neighborhood}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

"use client";

import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import dynamic from "next/dynamic";

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
  location?: {
    latitude: number | null;
    longitude: number | null;
  } | null;
}

export default function ProjectGallery({
  images = [],
  name,
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
        <div className="relative aspect-[4/3] rounded-lg overflow-hidden bg-slate-100 flex items-center justify-center">
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
      <div className="relative aspect-[4/3] rounded-lg overflow-hidden">
        {images[currentImageIndex]?.url && (
          <Image
            src={images[currentImageIndex].url}
            alt={`${name} - Görsel ${currentImageIndex + 1}`}
            fill
            className="object-cover"
          />
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

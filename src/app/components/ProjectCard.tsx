import { Card } from "@nextui-org/react";
import { Project } from "@prisma/client";
import {
  MapPin,
  Building2,
  Users,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { CalendarIcon } from "@heroicons/react/24/outline";
import Image from "next/image";

interface ProjectCardProps {
  project: Project & {
    images: { url: string }[];
    location: {
      country: string;
      city: string;
      district: string;
      neighborhood: string;
    };
    unitSizes: {
      value: string;
    }[];
    socialFeatures: {
      value: string;
    }[];
    startDate: Date;
    endDate: Date;
    catalogUrl?: string;
  };
}

const ProjectCard = ({ project }: ProjectCardProps) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const nextImage = useCallback(() => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentImageIndex((prev) =>
      prev === project.images.length - 1 ? 0 : prev + 1
    );
    setTimeout(() => setIsTransitioning(false), 500);
  }, [isTransitioning, project.images.length]);

  const prevImage = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentImageIndex((prev) =>
      prev === 0 ? project.images.length - 1 : prev - 1
    );
    setTimeout(() => setIsTransitioning(false), 500);
  };

  // Auto-advance slides every 5 seconds
  useEffect(() => {
    if (project.images.length <= 1) return;

    const timer = setInterval(() => {
      nextImage();
    }, 5000);

    return () => clearInterval(timer);
  }, [currentImageIndex, project.images.length, nextImage]);

  return (
    <Link href={`/emlak/projelerimiz/${project.slug}/`}>
      <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
        <div className="flex flex-col lg:flex-row">
          {/* Image Section */}
          <div className="relative w-full lg:w-1/2 aspect-[4/3]">
            {project.images.map((image, index) => (
              <div
                key={index}
                className={`absolute inset-0 transition-opacity duration-500 ${
                  index === currentImageIndex
                    ? "opacity-100 z-10"
                    : "opacity-0 z-0"
                }`}
              >
                <Image
                  src={image.url}
                  alt={`${project.name} - Image ${index + 1}`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 33vw"
                  priority={index === 0}
                />
              </div>
            ))}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

            {/* Navigation Arrows */}
            {project.images.length > 1 && (
              <>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    prevImage();
                  }}
                  className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full transition-colors duration-200 z-20"
                  disabled={isTransitioning}
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    nextImage();
                  }}
                  className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full transition-colors duration-200 z-20"
                  disabled={isTransitioning}
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </>
            )}

            {/* Dots Navigation */}
            {project.images.length > 1 && (
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-50">
                {project.images.map((_, index) => (
                  <div
                    key={index}
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      if (!isTransitioning) {
                        setIsTransitioning(true);
                        setCurrentImageIndex(index);
                        setTimeout(() => setIsTransitioning(false), 500);
                      }
                    }}
                    className={`w-2 h-2 rounded-full transition-colors duration-200 cursor-pointer ${
                      index === currentImageIndex
                        ? "bg-white"
                        : "bg-white/50 hover:bg-white/75"
                    }`}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Content Section */}
          <div className="flex flex-col flex-grow w-full lg:w-1/2 p-4 lg:p-5 lg:pt-0">
            {/* Project Info */}
            <div>
              <div className="bg-gradient-to-r from-primary-500/10 to-transparent p-4 rounded-lg">
                <h3 className="text-xl font-bold text-primary-600 mb-2">
                  {project.name}
                </h3>

                {/* Project Dates */}
                <div className="flex flex-col gap-2 text-slate-600">
                  <div className="flex items-center gap-2 bg-white/50 backdrop-blur-sm px-3 py-2 rounded-lg">
                    <CalendarIcon className="w-4 h-4 text-primary-500 flex-shrink-0" />
                    <span className="text-sm w-20">Başlangıç:</span>
                    <span className="text-sm font-medium">
                      {project.startDate?.toLocaleDateString("tr-TR", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 bg-white/50 backdrop-blur-sm px-3 py-2 rounded-lg">
                    <CalendarIcon className="w-4 h-4 text-primary-500 flex-shrink-0" />
                    <span className="text-sm w-20">Teslim:</span>
                    <span className="text-sm font-medium">
                      {project.endDate?.toLocaleDateString("tr-TR", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Unit Sizes */}
            {project.unitSizes && project.unitSizes.length > 0 && (
              <div className="mt-4">
                <div className="flex items-center gap-2 mb-3">
                  <Building2 className="w-4 h-4 text-primary-500" />
                  <p className="text-sm font-semibold text-slate-700">
                    Daire Tipleri
                  </p>
                </div>
                <div className="flex flex-wrap gap-2">
                  {project.unitSizes.map((size, index) => (
                    <span
                      key={index}
                      className="bg-primary-50 text-primary-600 px-3 py-1.5 rounded-full text-sm font-medium hover:bg-primary-100 transition-colors duration-200"
                    >
                      {size.value}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Social Features */}
            {project.socialFeatures && project.socialFeatures.length > 0 && (
              <div className="mt-4">
                <div className="flex items-center gap-2 mb-3">
                  <Users className="w-4 h-4 text-primary-500" />
                  <p className="text-sm font-semibold text-slate-700">
                    Sosyal Alanlar
                  </p>
                </div>
                <div className="flex flex-wrap gap-2">
                  {project.socialFeatures.map((feature, index) => (
                    <span
                      key={index}
                      className="bg-slate-50 text-slate-600 px-3 py-1.5 rounded-full text-sm font-medium hover:bg-slate-100 transition-colors duration-200"
                    >
                      {feature.value}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Location */}
            <div className="flex items-center gap-2 text-slate-600 mt-auto pt-3">
              <MapPin className="w-4 h-4 text-primary-500" />
              <span className="text-sm">
                {project.location?.city}, {project.location?.district}
                {project.location?.neighborhood &&
                  `, ${project.location?.neighborhood}`}
              </span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProjectCard;

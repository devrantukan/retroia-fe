import { Card, Image } from "@nextui-org/react";
import { Project } from "@prisma/client";
import {
  MapPin,
  Building2,
  Users,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useState, useEffect } from "react";
import Link from "next/link";

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
  };
}

const ProjectCard = ({ project }: ProjectCardProps) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const nextImage = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentImageIndex((prev) =>
      prev === project.images.length - 1 ? 0 : prev + 1
    );
    setTimeout(() => setIsTransitioning(false), 500);
  };

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
  }, [currentImageIndex, project.images.length]);

  return (
    <Link href={`/projeler/${project.slug}`}>
      <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
        <div className="flex flex-col lg:flex-row">
          {/* Image Section */}
          <div className="relative w-full lg:w-96 aspect-[4/3]">
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
                  radius="none"
                  src={image.url}
                  className="w-full h-full object-cover"
                  alt={`${project.name} - Image ${index + 1}`}
                  removeWrapper
                />
              </div>
            ))}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

            {/* Navigation Arrows */}
            {project.images.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full transition-colors duration-200 z-20"
                  disabled={isTransitioning}
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full transition-colors duration-200 z-20"
                  disabled={isTransitioning}
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </>
            )}

            {/* Dots Navigation */}
            {project.images.length > 1 && (
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-20">
                {project.images.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      if (!isTransitioning) {
                        setIsTransitioning(true);
                        setCurrentImageIndex(index);
                        setTimeout(() => setIsTransitioning(false), 500);
                      }
                    }}
                    className={`w-2 h-2 rounded-full transition-colors duration-200 ${
                      index === currentImageIndex
                        ? "bg-white"
                        : "bg-white/50 hover:bg-white/75"
                    }`}
                    disabled={isTransitioning}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Content Section */}
          <div className="flex flex-col flex-grow p-5 lg:p-7">
            {/* Project Info */}
            <div className="p-4">
              <h3 className="text-xl font-bold mb-2">{project.name}</h3>

              {/* Location */}
              <div className="flex items-center gap-2 text-slate-600 mb-4">
                <MapPin className="w-4 h-4" />
                <span>
                  {project.location?.city}, {project.location?.district}
                  {project.location?.neighborhood &&
                    `, ${project.location?.neighborhood}`}
                </span>
              </div>
            </div>

            {/* Unit Sizes */}
            {project.unitSizes && project.unitSizes.length > 0 && (
              <div className="mb-4 lg:mb-5">
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
              <div>
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
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProjectCard;

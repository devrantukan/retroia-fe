"use client";

import { Project } from "@prisma/client";
import { MapPin, Building2, Users, CalendarIcon } from "lucide-react";
import ProjectGallery from "./ProjectGallery";
import ProjectMap from "./ProjectMap";

interface ProjectDetailProps {
  project: Project & {
    images: { url: string }[];
    location: {
      country: string;
      city: string;
      district: string;
      neighborhood: string;
      latitude: number | null;
      longitude: number | null;
    } | null;
    unitSizes: {
      value: string;
    }[];
    socialFeatures: {
      value: string;
    }[];
    deedInfo: string;
    landArea: string;
    nOfUnits: string;
  };
}

export default function ProjectDetail({ project }: ProjectDetailProps) {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Main Content */}
      <div className="space-y-8">
        {/* Image Gallery */}
        <ProjectGallery
          images={project.images}
          name={project.name}
          startDate={project.startDate}
          endDate={project.endDate}
          location={project.location}
        />

        {/* Project Details */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left Column - Project Info */}
          <div className="space-y-12">
            {/* Project Description */}
            <div className="prose max-w-none">
              <h2 className="text-3xl font-bold text-slate-900 mb-6">
                Proje Hakkında
              </h2>
              <div
                className="text-slate-600 leading-relaxed"
                dangerouslySetInnerHTML={{ __html: project.description }}
              />
            </div>
          </div>

          {/* Right Column - Features */}
          <div className="space-y-12">
            {/* Unit Sizes */}
            {project.unitSizes.length > 0 && (
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-primary-50 p-2 rounded-lg">
                    <Building2 className="w-5 h-5 text-primary-500" />
                  </div>
                  <h3 className="text-xl font-semibold text-slate-900">
                    Daire Tipleri
                  </h3>
                </div>
                <div className="flex flex-wrap gap-3">
                  {project.unitSizes.map((size, index) => (
                    <span
                      key={index}
                      className="bg-primary-50 text-primary-600 px-4 py-2 rounded-lg text-sm font-medium hover:bg-primary-100 transition-colors duration-200"
                    >
                      {size.value}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Social Features */}
            {project.socialFeatures.length > 0 && (
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-primary-50 p-2 rounded-lg">
                    <Users className="w-5 h-5 text-primary-500" />
                  </div>
                  <h3 className="text-xl font-semibold text-slate-900">
                    Sosyal Alanlar
                  </h3>
                </div>
                <div className="flex flex-wrap gap-3">
                  {project.socialFeatures.map((feature, index) => (
                    <span
                      key={index}
                      className="bg-slate-50 text-slate-600 px-4 py-2 rounded-lg text-sm font-medium hover:bg-slate-100 transition-colors duration-200"
                    >
                      {feature.value}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Additional Project Info - Bottom Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
          <div className="bg-white/50 backdrop-blur-sm p-8 rounded-xl border border-slate-200">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-primary-50 p-2 rounded-lg">
                <MapPin className="w-5 h-5 text-primary-500" />
              </div>
              <h3 className="text-lg font-semibold text-slate-900">
                Arazi Alanı
              </h3>
            </div>
            <p className="text-slate-600 text-lg">{project.landArea} m²</p>
          </div>
          {project.deedInfo && (
            <div className="bg-white/50 backdrop-blur-sm p-8 rounded-xl border border-slate-200">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-primary-50 p-2 rounded-lg">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-primary-500"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-slate-900">
                  Tapu Bilgisi
                </h3>
              </div>
              <p className="text-slate-600 text-lg">{project.deedInfo}</p>
            </div>
          )}
          {project.nOfUnits && (
            <div className="bg-white/50 backdrop-blur-sm p-8 rounded-xl border border-slate-200">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-primary-50 p-2 rounded-lg">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-primary-500"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-slate-900">
                  Daire Sayısı
                </h3>
              </div>
              <p className="text-slate-600 text-lg">{project.nOfUnits}</p>
            </div>
          )}
        </div>

        {/* Map */}
        {project.location?.latitude && project.location?.longitude && (
          <ProjectMap
            lat={project.location.latitude}
            lng={project.location.longitude}
          />
        )}
      </div>
    </div>
  );
}

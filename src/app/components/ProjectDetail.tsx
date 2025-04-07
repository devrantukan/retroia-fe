"use client";

import { Project } from "@prisma/client";
import { MapPin, Building2, Users } from "lucide-react";
import ProjectGallery from "./ProjectGallery";

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
  };
}

export default function ProjectDetail({ project }: ProjectDetailProps) {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Column - Images and Map */}
        <ProjectGallery
          images={project.images}
          name={project.name}
          location={project.location}
        />

        {/* Right Column - Project Details */}
        <div className="space-y-8">
          {/* Project Info */}
          <div>
            <h1 className="text-3xl font-bold mb-4">{project.name}</h1>
            <div className="flex items-center gap-2 text-slate-600">
              <MapPin className="w-5 h-5" />
              <span>
                {project.location?.city}, {project.location?.district}
                {project.location?.neighborhood &&
                  `, ${project.location?.neighborhood}`}
              </span>
            </div>
          </div>

          {/* Description */}
          {project.description && (
            <div className="prose max-w-none">
              <p className="text-slate-600">{project.description}</p>
            </div>
          )}

          {/* Unit Sizes */}
          {project.unitSizes.length > 0 && (
            <div>
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
          {project.socialFeatures.length > 0 && (
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
  );
}

"use client";

import { Project, OfficeWorker } from "@prisma/client";
import { MapPin, Building2, Users, CalendarIcon } from "lucide-react";
import ProjectGallery from "./ProjectGallery";
import ProjectMap from "./ProjectMap";
import { User, EnvelopeSimple, Phone } from "@phosphor-icons/react";
import Image from "next/image";
import Link from "next/link";

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
    catalogUrl: string | null;
  };
  agent?: OfficeWorker & {
    office: {
      id: number;
      name: string;
      slug: string;
    };
    role?: {
      id: number;
      slug: string;
    };
  };
}

export default function ProjectDetail({ project, agent }: ProjectDetailProps) {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Image Gallery */}
      <ProjectGallery
        images={project.images}
        name={project.name}
        startDate={project.startDate}
        endDate={project.endDate}
        location={project.location}
        catalogUrl={project.catalogUrl}
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mt-12">
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

          {/* Agent Info */}
          {agent && (
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-start space-x-3 p-2 justify-between">
                <div className="flex-shrink-0 w-24 h-24">
                  {agent.avatarUrl ? (
                    <Image
                      src={agent.avatarUrl}
                      alt={agent.name}
                      width={64}
                      height={64}
                      className="rounded-full object-cover border border-gray-300"
                    />
                  ) : (
                    <User name={agent.name} className="text-gray-400" />
                  )}
                </div>

                <div className="flex-grow">
                  <h3 className="text-base font-semibold mb-2 text-right">
                    <Link
                      href={`/emlak/ofis/${agent.officeId}/${agent.office.slug}/${agent.role?.slug}/${agent.id}/${agent.slug}`}
                    >
                      {agent.name} {agent.surname}
                    </Link>
                  </h3>

                  <div className="space-y-1 text-right">
                    <a
                      href={`mailto:${agent.email}`}
                      className="flex items-center text-blue-600 hover:text-blue-800 justify-end text-sm"
                    >
                      <EnvelopeSimple
                        size={20}
                        weight="light"
                        className="mr-2"
                      />
                      {agent.email}
                    </a>

                    <a
                      href={`tel:${agent.phone}`}
                      className="flex items-center text-blue-600 hover:text-blue-800 justify-end text-sm"
                    >
                      <Phone size={20} weight="light" className="mr-2" />
                      {agent.phone}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Right Column - Features */}
        <div className="space-y-12">
          {/* Unit Sizes */}
          {project.unitSizes && project.unitSizes.length > 0 && (
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
          {project.socialFeatures && project.socialFeatures.length > 0 && (
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

      {/* Map Section */}
      {project.location &&
        project.location.latitude &&
        project.location.longitude && (
          <div className="mt-12">
            <h3 className="text-lg font-semibold text-slate-900 mb-4 flex items-center">
              <MapPin className="w-5 h-5 mr-2 text-slate-500" />
              Konum
            </h3>
            <div className="h-[400px] rounded-lg overflow-hidden">
              <ProjectMap
                lat={project.location.latitude}
                lng={project.location.longitude}
              />
            </div>
          </div>
        )}
    </div>
  );
}

"use client";

import React, { useState, useEffect } from "react";
import LoadingSpinner from "../../components/LoadingSpinner";
import NotFound from "../../components/NotFound";
import BreadCrumb from "@/app/components/BreadCrumb";
import ProjectGallery from "@/app/components/ProjectGallery";
import ProjectMap from "@/app/components/ProjectMap";
import ProjectDetail from "@/app/components/ProjectDetail";
import { User, EnvelopeSimple, Phone } from "@phosphor-icons/react";
import Image from "next/image";
import Link from "next/link";

interface ProjectPageClientProps {
  params: {
    id: string;
    agentId?: string;
    agentSlug?: string;
  };
}

const ProjectPageClient = ({ params }: ProjectPageClientProps) => {
  const [project, setProject] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [agent, setAgent] = useState<any>(null);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const API_URL =
          process.env.NODE_ENV === "production"
            ? `/emlak/api/projects/${params.id}/`
            : `/api/projects/${params.id}`;

        const response = await fetch(API_URL);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setProject(data);
      } catch (error) {
        console.error("Error fetching project:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProject();
  }, [params.id]);

  useEffect(() => {
    const fetchAgent = async () => {
      if (params.agentId) {
        try {
          const API_URL = new URL(
            process.env.NODE_ENV === "production"
              ? `/emlak/api/officeWorker/${params.agentId}/`
              : `/api/officeWorker/${params.agentId}`,
            window.location.origin
          ).toString();

          const agentResponse = await fetch(API_URL, {
            method: "GET",
            headers: {
              Accept: "application/json",
              "Cache-Control": "no-cache",
            },
            credentials: "same-origin",
            redirect: "follow",
          });

          if (!agentResponse.ok) {
            throw new Error(
              `Failed to fetch agent data: ${agentResponse.status}`
            );
          }

          const agentData = await agentResponse.json();
          if (!agentData) {
            console.error("No agent data received");
            return;
          }

          const transformedAgentData = {
            id: agentData.id,
            name: agentData.name || "",
            surname: agentData.surname || "",
            email: agentData.email || "",
            phone: agentData.phone || "",
            avatarUrl: agentData.avatarUrl || "",
            officeId: agentData.officeId,
            office: {
              id: agentData.office?.id || 0,
              name: agentData.office?.name || "",
              slug: (agentData.office?.name || "")
                .toLowerCase()
                .replace(/\s+/g, "-"),
            },
            role: {
              id: agentData.role?.id || 0,
              name: agentData.role?.name || "",
              slug: agentData.role?.slug || "",
            },
            slug: agentData.slug || params.agentSlug || "",
          };
          setAgent(transformedAgentData);
        } catch (error) {
          console.error("Error fetching agent data:", error);
          setAgent(null);
        }
      }
    };

    fetchAgent();
  }, [params.agentId, params.agentSlug]);

  const renderAgentSection = () => {
    if (params.agentId && params.agentSlug && agent) {
      return (
        <>
          <div className="mt-6">
            <h2 className="text-xl font-bold text-slate-700">
              Danışman Detayları
            </h2>
            <hr className="border border-solid border-slate-300" />
          </div>
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
                  href={`/emlak/ofis/${agent.officeId}/${agent.office.slug}/${agent.role.slug}/${agent.id}/${agent.slug}`}
                >
                  {agent.name} {agent.surname}
                </Link>
              </h3>

              <div className="space-y-1 text-right">
                <a
                  href={`mailto:${agent.email}`}
                  className="flex items-center text-blue-600 hover:text-blue-800 justify-end text-sm"
                >
                  <EnvelopeSimple size={20} weight="light" className="mr-2" />
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
        </>
      );
    }

    return null;
  };

  if (loading) return <LoadingSpinner />;
  if (!project) return <NotFound />;

  return (
    <div className="container mx-auto px-4 py-8">
      <BreadCrumb
        location={{
          country: "",
          city: "",
          district: "",
          neighborhood: "",
          subType: "",
        }}
        contract={{ slug: "", value: "" }}
        propertyType={{ slug: "" }}
      />

      <div className="mt-8">
        <ProjectDetail project={project} agent={agent} />
      </div>

      {project.location && (
        <div className="mt-8">
          <ProjectMap
            lat={project.location.latitude}
            lng={project.location.longitude}
          />
        </div>
      )}
    </div>
  );
};

export default ProjectPageClient;

import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import ProjectDetail from "@/app/components/ProjectDetail";

interface ProjectPageProps {
  params: {
    slug: string;
    agentId: string;
    agentSlug: string;
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const project = await prisma.project.findFirst({
    where: {
      slug: params.slug,
      publishingStatus: "PUBLISHED",
    },
    include: {
      images: true,
      location: true,
      feature: true,
      unitSizes: true,
      socialFeatures: true,
    },
  });

  if (!project) {
    notFound();
  }

  // Check if the agent ID exists in the assignedAgents string
  const agentIds =
    project.assignedAgents?.split(",").map((id) => id.trim()) || [];
  if (!agentIds.includes(params.agentId)) {
    notFound();
  }

  // Try to find the agent by ID first
  let agent = await prisma.officeWorker.findFirst({
    where: {
      id: parseInt(params.agentId),
    },
    include: {
      office: {
        select: {
          id: true,
          name: true,
          slug: true,
        },
      },
      role: {
        select: {
          id: true,
          slug: true,
        },
      },
    },
  });

  // If not found by ID, try with both ID and slug
  if (!agent) {
    agent = await prisma.officeWorker.findFirst({
      where: {
        id: parseInt(params.agentId),
        slug: params.agentSlug,
      },
      include: {
        office: {
          select: {
            id: true,
            name: true,
            slug: true,
          },
        },
        role: {
          select: {
            id: true,
            slug: true,
          },
        },
      },
    });
  }

  if (!agent) {
    notFound();
  }

  return <ProjectDetail project={project} agent={agent} />;
}

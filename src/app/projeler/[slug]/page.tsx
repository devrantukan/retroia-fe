import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import ProjectDetail from "@/app/components/ProjectDetail";

interface ProjectPageProps {
  params: {
    slug: string;
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

  return <ProjectDetail project={project} />;
}

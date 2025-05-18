import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import ProjectDetail from "@/app/components/ProjectDetail";
import { Metadata } from "next";

interface ProjectPageProps {
  params: {
    slug: string;
  };
}

export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {
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
    return {
      title: "Proje Bulunamadı | Retroia Gayrimenkul",
      description: "Aradığınız proje bulunamadı.",
    };
  }

  const locationString = [
    project.location?.neighborhood,
    project.location?.district,
    project.location?.city,
    project.location?.country,
  ]
    .filter(Boolean)
    .join(", ");

  const unitSizesString = project.unitSizes
    ?.map((size) => size.value)
    .join(", ");

  const socialFeaturesString = project.socialFeatures
    ?.map((feature) => feature.value)
    .join(", ");

  return {
    metadataBase: new URL(
      process.env.NEXT_PUBLIC_SITE_URL || "https://www.retroia.com/emlak"
    ),
    title: `${project.name} | ${project.location?.city} Yeni Proje | Retroia`,
    description: `${project.name} - ${
      project.location?.city
    }'de ${locationString} bölgesinde yeni proje. ${
      unitSizesString ? `Daire tipleri: ${unitSizesString}.` : ""
    } ${
      socialFeaturesString ? `Sosyal alanlar: ${socialFeaturesString}.` : ""
    } Detaylı bilgi için hemen inceleyin.`,
    keywords: `${project.name}, ${project.location?.city} yeni proje, ${project.location?.district} yeni proje, ${project.location?.neighborhood} yeni proje, ${unitSizesString}, ${socialFeaturesString}, yeni konut projesi, yatırımlık proje`,
    openGraph: {
      title: `${project.name} | ${project.location?.city} Yeni Proje | Retroia`,
      description: `${project.name} - ${
        project.location?.city
      }'de ${locationString} bölgesinde yeni proje. ${
        unitSizesString ? `Daire tipleri: ${unitSizesString}.` : ""
      } ${
        socialFeaturesString ? `Sosyal alanlar: ${socialFeaturesString}.` : ""
      } Detaylı bilgi için hemen inceleyin.`,
      images: project.images?.[0]?.url
        ? [{ url: project.images[0].url, alt: `${project.name} projesi` }]
        : [],
      siteName: "Retroia",
      locale: "tr_TR",
      type: "website",
      url: `/projelerimiz/${params.slug}`,
    },
    twitter: {
      card: "summary_large_image",
      title: `${project.name} | ${project.location?.city} Yeni Proje | Retroia`,
      description: `${project.name} - ${
        project.location?.city
      }'de ${locationString} bölgesinde yeni proje. ${
        unitSizesString ? `Daire tipleri: ${unitSizesString}.` : ""
      } ${
        socialFeaturesString ? `Sosyal alanlar: ${socialFeaturesString}.` : ""
      } Detaylı bilgi için hemen inceleyin.`,
      images: project.images?.[0]?.url ? [project.images[0].url] : [],
      creator: "@retroia",
      site: "@retroia",
    },
    alternates: {
      canonical: `/projelerimiz/${params.slug}`,
    },
    other: {
      "geo.position":
        project.location?.latitude && project.location?.longitude
          ? `${project.location.latitude};${project.location.longitude}`
          : "",
      "geo.placename": locationString,
      "geo.region": "TR",
    },
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

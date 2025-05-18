import { ImagesSlider } from "@/app/components/ImageSlider";
import OfficeWorkerSidebar from "@/app/components/OfficeWorkerSidebar";
import OfficeWorkerTabs from "@/app/components/OfficeWorkerTabs";
import PageTitle from "@/app/components/pageTitle";
import ReviewModal from "@/app/components/ReviewModal";
import Share from "@/app/components/Share";
import prisma from "@/lib/prisma";
import { Card } from "@nextui-org/react";
import { Metadata } from "next";
import { notFound } from "next/navigation";

interface Props {
  params: {
    id: string;
    workerId: string;
    workerSlug: string;
    slug: string;
    title: string;
  };
}

const stripHtml = (html: string) => {
  if (!html) return "";
  return html.replace(/<[^>]*>/g, "");
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const officeWorker = await prisma.officeWorker.findUnique({
    where: {
      id: +params.workerId,
    },
    include: {
      office: {
        include: {
          neighborhood: true,
          district: true,
          city: true,
          country: true,
        },
      },
      role: true,
    },
  });

  if (!officeWorker) {
    return {
      title: "Danışman Bulunamadı",
      description: "Danışman detayları bulunamadı.",
    };
  }

  const locationString = [
    officeWorker.office?.neighborhood?.neighborhood_name,
    officeWorker.office?.district?.district_name,
    officeWorker.office?.city?.city_name,
    officeWorker.office?.country?.country_name,
  ]
    .filter(Boolean)
    .join(", ");

  const title = `${officeWorker.name} ${officeWorker.surname} - ${
    officeWorker.title || "Gayrimenkul Danışmanı"
  } - ${officeWorker.office?.name || ""}`;
  const description = `${officeWorker.title || "Gayrimenkul Danışmanı"} ${
    officeWorker.name
  } ${officeWorker.surname} - ${
    officeWorker.office?.name || ""
  } - ${locationString}`;
  const keywords = `${officeWorker.title || "Gayrimenkul Danışmanı"}, ${
    officeWorker.name
  } ${officeWorker.surname}, ${officeWorker.office?.name || ""}, ${
    officeWorker.office?.city?.city_name || ""
  }, ${
    officeWorker.office?.district?.district_name || ""
  }, emlak danışmanı, gayrimenkul danışmanı`;
  const ogTitle = `${officeWorker.name} ${officeWorker.surname} - ${
    officeWorker.title || "Gayrimenkul Danışmanı"
  }`;
  const ogDescription = officeWorker.about
    ? stripHtml(officeWorker.about).slice(0, 80) + "..."
    : description;
  const ogImageAlt = `${officeWorker.name} ${officeWorker.surname} - ${
    officeWorker.title || "Gayrimenkul Danışmanı"
  } - ${officeWorker.office?.name || ""}`;
  const twitterDescription = ogDescription;

  return {
    metadataBase: new URL(
      process.env.NEXT_PUBLIC_SITE_URL || "https://www.retroia.com/emlak"
    ),
    title,
    description,
    keywords,
    openGraph: {
      title: ogTitle,
      description: ogDescription,
      images: officeWorker.avatarUrl
        ? [
            {
              url: officeWorker.avatarUrl,
              alt: ogImageAlt,
            },
          ]
        : [],
      siteName: "Retroia",
      locale: "tr_TR",
      type: "website",
      url: `/ofis/${params.id}/${params.slug}/${params.title}/${params.workerId}/${params.workerSlug}`,
    },
    twitter: {
      card: "summary_large_image",
      title: ogTitle,
      description: twitterDescription,
      images: officeWorker.avatarUrl ? [officeWorker.avatarUrl] : [],
      creator: "@retroia",
      site: "@retroia",
    },
    alternates: {
      canonical: `/ofis/${params.id}/${params.slug}/${params.title}/${params.workerId}/${params.workerSlug}`,
    },
  };
}

const OfficeWorkerPage = async ({ params }: Props) => {
  const officeWorker = await prisma.officeWorker.findUnique({
    where: {
      id: +params.workerId,
    },
    include: {
      office: {
        include: {
          neighborhood: true,
          district: true,
          city: true,
          country: true,
        },
      },
      properties: {
        where: {
          publishingStatus: "PUBLISHED",
        },
        include: {
          status: true,
          feature: true,
          location: true,
          contract: true,
          agent: { include: { office: true, role: true } },
          images: true,
        },
      },
      reviews: {
        where: {
          isApproved: 1,
        },
      },
      role: true,
    },
  });

  if (!officeWorker) return notFound();

  // find the office worker's projects
  const projects = await prisma.project.findMany({
    where: {
      officeId: officeWorker?.office?.id,
      publishingStatus: "PUBLISHED",
    },
    select: {
      id: true,
      name: true,
      description: true,
      startDate: true,
      endDate: true,
      assignedAgents: true,
      images: {
        select: {
          url: true,
        },
      },
      location: {
        select: {
          country: true,
          city: true,
          district: true,
          neighborhood: true,
        },
      },
      feature: true,
      unitSizes: {
        select: {
          value: true,
        },
      },
      socialFeatures: {
        select: {
          value: true,
        },
      },
      slug: true,
    },
  });

  // find the office worker's projects
  let assignedProjects: any[] = [];
  projects.map((project) => {
    if (project.assignedAgents.includes(params.workerId)) {
      assignedProjects.push(project);
    }
  });

  if (officeWorker) {
    (officeWorker as any).assignedProjects = assignedProjects;
  }

  return (
    <div>
      <div className="p-4">
        <div className="flex lg:flex-row flex-col">
          <OfficeWorkerSidebar officeWorker={officeWorker} />
          <div className="absolute right-0 mr-10 mt-4 flex gap-x-2">
            <ReviewModal officeWorkerId={officeWorker.id} />
            <Share
              title={`${officeWorker.name} ${officeWorker.surname}`}
              type={"Danışmanı"}
              avatarUrl={officeWorker.avatarUrl || ""}
            />
          </div>
          <OfficeWorkerTabs officeWorker={officeWorker} />
        </div>
      </div>
    </div>
  );
};

export default OfficeWorkerPage;

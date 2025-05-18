import OfficeSidebar from "@/app/components/OfficeSidebar";

import prisma from "@/lib/prisma";

import { notFound } from "next/navigation";

import OfficeTabs from "@/app/components/OfficeTabs";
import Share from "@/app/components/Share";
import { Metadata } from "next";

interface Props {
  params: {
    id: string;
    slug: string;
  };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const office = await prisma.office.findUnique({
    where: {
      id: +params.id,
    },
    include: {
      country: true,
      city: true,
      district: true,
      neighborhood: true,
      workers: {
        include: {
          role: true,
        },
      },
    },
  });

  if (!office) {
    return {
      title: "Ofis Bulunamadı | Retroia Gayrimenkul",
      description: "Aradığınız ofis bulunamadı.",
    };
  }

  const locationString = [
    office.neighborhood?.neighborhood_name,
    office.district?.district_name,
    office.city?.city_name,
    office.country?.country_name,
  ]
    .filter(Boolean)
    .join(", ");

  const workerCount = office.workers?.length || 0;
  const brokerCount =
    office.workers?.filter((w) => w.role?.slug === "broker-manager").length ||
    0;

  return {
    metadataBase: new URL(
      process.env.NEXT_PUBLIC_SITE_URL || "https://www.retroia.com/emlak"
    ),
    title: `${office.name} | ${office.city?.city_name} Gayrimenkul Ofisi | Retroia`,
    description: `${office.name} - ${office.city?.city_name}'de ${brokerCount} gayrimenkul danışmanı ile hizmet veren güvenilir gayrimenkul ofisi. ${locationString} bölgesinde konut, ticari ve arsa araziler için profesyonel danışmanlık.`,
    keywords: `${office.name}, ${office.city?.city_name} gayrimenkul, ${office.district?.district_name} gayrimenkul, ${office.neighborhood?.neighborhood_name} gayrimenkul, emlak ofisi, gayrimenkul danışmanlığı, ${office.city?.city_name} emlak`,
    openGraph: {
      title: `${office.name} | ${office.city?.city_name} Gayrimenkul Ofisi | Retroia`,
      description: `${office.name} - ${office.city?.city_name}'de ${brokerCount} gayrimenkul danışmanı ile hizmet veren güvenilir gayrimenkul ofisi. ${locationString} bölgesinde konut, ticari ve arsa araziler için profesyonel danışmanlık.`,
      images: office.avatarUrl
        ? [{ url: office.avatarUrl, alt: `${office.name} ofisi` }]
        : [],
      siteName: "Retroia",
      locale: "tr_TR",
      type: "website",
      url: `/ofis/${params.id}/${params.slug}`,
    },
    twitter: {
      card: "summary_large_image",
      title: `${office.name} | ${office.city?.city_name} Gayrimenkul Ofisi | Retroia`,
      description: `${office.name} - ${office.city?.city_name}'de ${brokerCount} gayrimenkul danışmanı ile hizmet veren güvenilir gayrimenkul ofisi. ${locationString} bölgesinde konut, ticari ve arsa araziler için profesyonel danışmanlık.`,
      images: office.avatarUrl ? [office.avatarUrl] : [],
      creator: "@retroia",
      site: "@retroia",
    },
    alternates: {
      canonical: `/ofis/${params.id}/${params.slug}`,
    },
    other: {
      "geo.position": `${office.latitude};${office.longitude}`,
      "geo.placename": locationString,
      "geo.region": "TR",
    },
  };
}

const OfficePage = async ({ params }: Props) => {
  const office = await prisma.office.findUnique({
    where: {
      id: +params.id,
    },
    include: {
      workers: {
        include: {
          properties: {
            where: {
              publishingStatus: "PUBLISHED",
            },
            include: {
              status: true,
              feature: true,
              location: true,
              contract: true,
              agent: {
                include: {
                  office: true,
                  role: true,
                },
              },
              images: {
                select: {
                  id: true,
                  url: true,
                  propertyId: true,
                  order: true,
                },
                orderBy: {
                  order: "asc",
                },
              },
            },
            orderBy: {
              price: "asc",
            },
          },
          office: true,
          role: true,
          reviews: {
            where: {
              isApproved: 1,
            },
          },
        },
      },

      country: true,
      city: true,
      district: true,
      neighborhood: true,
      images: true,
      projects: {
        where: {
          publishingStatus: "PUBLISHED",
        },
        include: {
          images: {
            select: {
              id: true,
              url: true,
              order: true,
            },
            orderBy: {
              order: "asc",
            },
          },
          location: true,
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
        },
      },
    },
  });

  if (!office) return notFound();
  return (
    <div>
      <div className="p-4">
        <div className="flex lg:flex-row flex-col">
          <OfficeSidebar office={office} />

          <div className="absolute right-0 mr-10 mt-4 flex gap-x-2">
            <Share
              title={office.name}
              type={"Ofisi"}
              avatarUrl={office.avatarUrl || ""}
            />
          </div>
          <OfficeTabs office={office} />
        </div>
      </div>
    </div>
  );
};
export default OfficePage;

const Title = ({ title, className }: { title: string; className?: string }) => (
  <div className={className}>
    <h2 className="text-xl font-bold text-slate-700">{title} </h2>
    <hr className="boreder border-solid border-slate-300" />
  </div>
);

const Attribute = ({
  label,
  value,
}: {
  label: string;
  value?: string | number;
}) => (
  <div className="flex justify-between">
    <span className="text-sm text-slate-600">{label}</span>
    <span className="text-sm text-slate-600">{value}</span>
  </div>
);

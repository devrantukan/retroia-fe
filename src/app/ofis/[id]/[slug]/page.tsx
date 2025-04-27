import OfficeSidebar from "@/app/components/OfficeSidebar";

import prisma from "@/lib/prisma";

import { notFound } from "next/navigation";

import OfficeTabs from "@/app/components/OfficeTabs";
import Share from "@/app/components/Share";

interface Props {
  params: {
    id: string;
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
              images: true,
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
          images: true,
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

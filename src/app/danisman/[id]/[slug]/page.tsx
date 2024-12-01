import { ImagesSlider } from "@/app/components/ImageSlider";
import OfficeWorkerSidebar from "@/app/components/OfficeWorkerSidebar";
import OfficeWorkerTabs from "@/app/components/OfficeWorkerTabs";
import PageTitle from "@/app/components/pageTitle";
import prisma from "@/lib/prisma";
import { Card } from "@nextui-org/react";
import { notFound } from "next/navigation";

interface Props {
  params: {
    id: string;
  };
}

const OfficeWorkerPage = async ({ params }: Props) => {
  const officeWorker = await prisma.officeWorker.findUnique({
    where: {
      id: +params.id,
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
        include: {
          status: true,
          feature: true,
          location: true,
          agent: { include: { office: true } },
          images: true,
        },
      },
    },
  });
  console.log(officeWorker);
  if (!officeWorker) return notFound();
  return (
    <div>
      <div className="p-4">
        <div className="flex lg:flex-row flex-col">
          <OfficeWorkerSidebar officeWorker={officeWorker} />
          <OfficeWorkerTabs officeWorker={officeWorker} />
        </div>
      </div>
    </div>
  );
};
export default OfficeWorkerPage;

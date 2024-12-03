import { ImagesSlider } from "@/app/components/ImageSlider";
import OfficeWorkerSidebar from "@/app/components/OfficeWorkerSidebar";
import OfficeWorkerTabs from "@/app/components/OfficeWorkerTabs";
import PageTitle from "@/app/components/pageTitle";
import ReviewModal from "@/app/components/ReviewModal";
import Share from "@/app/components/Share";
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
          <div className="absolute right-0 mr-10 mt-4 flex gap-x-2">
            <ReviewModal />
            <Share />
          </div>
          <OfficeWorkerTabs officeWorker={officeWorker} />
        </div>
      </div>
    </div>
  );
};
export default OfficeWorkerPage;

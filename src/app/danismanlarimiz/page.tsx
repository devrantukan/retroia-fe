import { ImagesSlider } from "@/app/components/ImageSlider";
import PageTitle from "@/app/components/pageTitle";
import prisma from "@/lib/prisma";
import { Card } from "@nextui-org/react";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import OfficeWorkerCard from "../components/OfficeWorkerCard";

const OfficeWorkersPage = async () => {
  const officeWorkers = await prisma.officeWorker.findMany({
    include: {
      properties: true,
      office: true,
    },
  });
  if (!officeWorkers) return notFound();
  return (
    <div>
      <div className="h-[480px] bg-slate-300 m-4 p-4 rounded-xl mb-12">
        <h1 className="mt-24 ml-12 text-3xl font-extralight">
          {officeWorkers.length} DANIŞMAN İÇİNDEN <br />
          <span className="font-bold text-xl">SİZE EN UYGUNU BULUN</span>
        </h1>
      </div>
      <div className="m-4 flex flex-col lg:flex-row">
        {officeWorkers.map((officeWorker, index) => (
          <OfficeWorkerCard
            officeWorker={officeWorker}
            index={index}
            key={index}
          />
        ))}
      </div>
    </div>
  );
};
export default OfficeWorkersPage;

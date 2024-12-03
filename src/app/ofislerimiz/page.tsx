import { ImagesSlider } from "@/app/components/ImageSlider";
import PageTitle from "@/app/components/pageTitle";
import prisma from "@/lib/prisma";
import { Card } from "@nextui-org/react";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import OfficeCard from "../components/OfficeCard";

const OfficesPage = async () => {
  const offices = await prisma.office.findMany({});
  if (!offices) return notFound();
  return (
    <div>
      <div className="h-[480px] bg-slate-300 m-6 p-4 rounded-xl mb-12 ">
        <h1 className="mt-24 text-3xl font-extralight ml-12">
          xx İLDE {offices.length} RETROİA OFİSİ
          <br />
          <span className="font-bold text-xl">
            İÇİNDEN SİZE EN YAKININI BULUN
          </span>
        </h1>
      </div>
      <div className="m-6 flex flex-col">
        {offices.map((office, index) => (
          <OfficeCard office={office} key={index} />
        ))}
      </div>
    </div>
  );
};
export default OfficesPage;

import prisma from "@/lib/prisma";
import { Card } from "@nextui-org/react";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import OfficeCard from "../components/OfficeCard";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Retroia Gayrimenkul, Real Estate - Ofislerimiz",
  description: "Retroia Gayrimenkul, Real Estate - Ofislerimiz",
};

const OfficesPage = async () => {
  const offices = await prisma.office.findMany({
    include: {
      workers: true,
    },
  });
  if (!offices) return notFound();
  return (
    <div>
      <div className="h-[480px] bg-slate-300 lg:m-6 p-4 lg:rounded-xl mb-12 relative">
        <Image
          alt="Retroia Gayrimenkul "
          src="https://inegzzkuttzsznxfbsmp.supabase.co/storage/v1/object/public/siteImages/ofisimiz.jpg?t=2024-12-26T00%3A15%3A38.890Z"
          className="object-cover opacity-100 rounded-xl"
          layout="fill"
        />
        <div className="absolute z-40">
          <h1 className="mt-24 text-3xl font-extralight lg:ml-12 ml-6 ">
            {offices.length} RETROİA OFİSİ
            <br />
            <span className="font-bold text-xl">
              İÇİNDEN SİZE EN YAKININI BULUN
            </span>
          </h1>
        </div>
      </div>
      <div className="m-6 grid lg:grid-cols-3 grid-rows-1 gap-y-6">
        {offices.map((office, index) => (
          <OfficeCard office={office} key={index} />
        ))}
      </div>
    </div>
  );
};
export default OfficesPage;

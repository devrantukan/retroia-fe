"use client";

import { Button } from "@nextui-org/react";
import Link from "next/link";
import React from "react";
import { ArrowCircleRight } from "@phosphor-icons/react/dist/ssr";
import Image from "next/image";

export default function HomepageCustomerBanner() {
  return (
    <>
      <div className="flex mx-6 lg:mx-0 lg:ml-6 lg:w-full flex-col items-start p-6  pt-16 h-72  rounded-xl bg-gradient-to-r from-blue-950 from-40% via-sky-500 via-70% to-sky-200 to-90% relative">
        <Image
          alt="Retroia Gayrimenkul "
          src="https://inegzzkuttzsznxfbsmp.supabase.co/storage/v1/object/public/siteImages/gayrimenkul-satilik.png"
          className="object-cover opacity-100 rounded-xl"
          layout="fill"
        />
        <div className="absolute z-30">
          <h2 className="text-2xl font-bold text-white mb-6">
            Gayrimenkulünüzü Satalım Kiralayalım
          </h2>
          <p className="text-lg text-white mb-6">
            Deneyimli danışmanlarımızla tanışın
          </p>
          <Button className=" bg-white">
            <Link
              href="/emlak/gayrimenkullerinizi-satalim-kiralayalim "
              className="text-blue-950 font-bold flex flex-row"
            >
              <span className="mr-4">Hemen Başvur</span>
              <ArrowCircleRight width={20} height={20} />
            </Link>
          </Button>
        </div>
      </div>
    </>
  );
}

"use client";

import { Button } from "@nextui-org/react";
import Link from "next/link";
import React from "react";

import { ArrowCircleRight } from "@phosphor-icons/react/dist/ssr";
import Image from "next/image";

export default function HomepageAgentBanner() {
  return (
    <>
      <div className="flex mx-6 lg:mx-0 lg:mr-6 flex-col lg:w-full items-start p-6 pt-16 h-72 rounded-xl bg-gradient-to-r from-blue-950 from-40% via-sky-500 via-70% to-sky-200 to-90% relative">
        <Image
          alt="Retroia Gayrimenkul "
          src="https://inegzzkuttzsznxfbsmp.supabase.co/storage/v1/object/public/siteImages/danisman-ol.png"
          className="object-cover opacity-100 rounded-xl"
          layout="fill"
        />
        <div className="absolute z-30">
          <h2 className="text-2xl font-bold text-white mb-6">
            Gayrimenkul Danışmanı Olmak İstiyorum
          </h2>
          <p className="text-lg text-white mb-6">
            Bir numara olmak ister misiniz...
          </p>
          <Button className="bg-white">
            <Link
              href="/emlak/gayrimenkul-danismani-basvuru-formu"
              className="text-blue-950 font-bold flex flex-row"
            >
              <span className="mr-4">Danışman Ol</span>
              <ArrowCircleRight width={20} height={20} />
            </Link>
          </Button>
        </div>
      </div>
    </>
  );
}

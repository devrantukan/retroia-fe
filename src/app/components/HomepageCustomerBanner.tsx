"use client";

import { Button } from "@nextui-org/react";
import Link from "next/link";
import React from "react";
import { ArrowCircleRight } from "@phosphor-icons/react/dist/ssr";

export default function HomepageCustomerBanner() {
  return (
    <>
      <div className="flex flex-col items-start lg:ml-6 p-6 pt-16 h-72 w-full rounded-xl bg-gradient-to-r from-blue-950 from-30% via-sky-500 via-60% to-sky-200 to-90%">
        <h2 className="text-2xl text-white mb-6">
          Gayrimenkulünüzü Satalım Kiralayalım
        </h2>
        <p className="text-lg text-white mb-6">
          Deneyimli RE/MAX danışmanlarımızla tanışın
        </p>
        <Button className=" bg-white">
          <Link
            href="/gayrimenkullerinizi-satalim-kiralayalim "
            className="text-blue-950 font-bold flex flex-row"
          >
            <span className="mr-4">Danışman Ol</span>
            <ArrowCircleRight width={20} height={20} />
          </Link>
        </Button>
      </div>
    </>
  );
}

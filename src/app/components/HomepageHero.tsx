"use client";

import React from "react";
import HomepageRefineTabs from "./HomepageRefineTabs";
import Image from "next/image";

export default function HomepageHero() {
  return (
    <>
      <div className="flex justify-left  p-6 items-center lg:h-screen w-full  relative">
        <Image
          alt="Retroia Gayrimenkul "
          src="https://inegzzkuttzsznxfbsmp.supabase.co/storage/v1/object/public/siteImages/ana-sayfa.jpg?t=2024-12-25T23%3A28%3A18.062Z"
          className="w-full h-full object-contain object-center z-0 ml-[100px] mb-[100px] pb-[40px] opacity-50"
          layout="fill"
          objectFit="cover"
          sizes="100vw"
        />
        <HomepageRefineTabs />
      </div>
    </>
  );
}

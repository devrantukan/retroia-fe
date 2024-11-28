"use client";

import React from "react";
import HomepageRefineTabs from "./HomepageRefineTabs";

export default function HomepageRefine() {
  return (
    <>
      <div className="flex flex-col justify-center items-center h-[400px] w-[700px] bg-slate-200 rounded-lg">
        <h1 className="ml-12 mt-24"> sektör</h1>
        <HomepageRefineTabs />
      </div>
    </>
  );
}

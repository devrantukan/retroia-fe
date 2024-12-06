//  "use client";
import { MagnifyingGlassIcon } from "@heroicons/react/16/solid";
import { Input } from "@nextui-org/react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React from "react";
import { useDebouncedCallback } from "use-debounce";
import BlogSearchComponent from "./BlogSearchComponent";
import prisma from "@/lib/prisma";

const Search = ({ type, contract }: { type: string; contract: string }) => {
  // const searchParams = useSearchParams();
  // const pathName = usePathname();
  // const router = useRouter();
  // const handleChange = useDebouncedCallback((query: string) => {
  //   const params = new URLSearchParams(searchParams);
  //   if (query) params.set("query", query);
  //   else params.delete("query");

  //   router.replace(`${pathName}?${params.toString()}`);
  // }, 1000);

  return (
    <div className="p-4 flex  bg-gradient-to-br from-sky-400 to-[#102960]">
      <BlogSearchComponent type={type} contract={contract} />
      {/* <Input
        onChange={(e) => handleChange(e.target.value)}
        className="w-96 shadow"
        endContent={<MagnifyingGlassIcon className="w-4 text-slate-500 " />}
        defaultValue={searchParams.get("query") ?? ""}
      /> */}
    </div>
  );
};

export default Search;

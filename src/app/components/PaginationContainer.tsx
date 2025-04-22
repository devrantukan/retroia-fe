"use client";
import { Pagination } from "@nextui-org/react";
import { useRouter, useSearchParams } from "next/navigation";

interface Props {
  totalPages: number;
  currentPage: number;
  route: string;
}

const PaginationContainer = ({ currentPage, totalPages, route }: Props) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const tab = searchParams.get("tab");

  if (totalPages <= 1) return null;

  return (
    <div className="flex justify-center mt-4">
      <Pagination
        total={totalPages}
        initialPage={currentPage}
        onChange={(page) => {
          const newParams = new URLSearchParams(searchParams.toString());
          newParams.set("pagenum", page.toString());
          if (tab) {
            newParams.set("tab", tab);
          }
          router.push(`${route}?${newParams.toString()}`);
        }}
      />
    </div>
  );
};

export default PaginationContainer;

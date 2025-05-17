"use client";
import { Pagination } from "@nextui-org/react";
import { useRouter, useSearchParams } from "next/navigation";

interface Props {
  currentPage: number;
  totalPages: number;
  route: string;
  onPageChange?: (page: number) => void;
}

const PaginationContainer = ({
  currentPage,
  totalPages,
  route,
  onPageChange,
}: Props) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handlePageChange = (page: number) => {
    if (onPageChange) {
      onPageChange(page);
    } else {
      const params = new URLSearchParams(searchParams.toString());
      params.set("pagenum", page.toString());
      router.push(`${route}?${params.toString()}`, { scroll: false });
    }
  };

  if (totalPages <= 1) return null;

  return (
    <div className="flex justify-center">
      <Pagination
        total={totalPages}
        initialPage={currentPage}
        page={currentPage}
        onChange={handlePageChange}
        showControls
        classNames={{
          wrapper: "gap-0 overflow-visible h-8",
          item: "w-8 h-8 text-small rounded-none bg-transparent",
          cursor: "bg-primary-500 text-white font-bold",
        }}
      />
    </div>
  );
};

export default PaginationContainer;

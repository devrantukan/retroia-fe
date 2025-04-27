"use client";
import { Pagination } from "@nextui-org/react";
import { useRouter, useSearchParams } from "next/navigation";

interface Props {
  currentPage: number;
  totalPages: number;
  route: string;
}

const PaginationContainer = ({ currentPage, totalPages, route }: Props) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("pagenum", page.toString());
    router.push(`${route}?${params.toString()}`);
  };

  if (totalPages <= 1) return null;

  return (
    <div className="flex justify-center">
      <Pagination
        total={totalPages}
        initialPage={currentPage}
        page={currentPage}
        onChange={handlePageChange}
      />
    </div>
  );
};

export default PaginationContainer;

"use client";
import React from "react";
import { Breadcrumbs, BreadcrumbItem } from "@nextui-org/react";

export default function BreadCrumb({
  location,
  contract,
  propertyType,
}: {
  location: {
    country: string;
    city: string;
    district: string;
    neighborhood: string;
  };
  contract: { slug: string; value: string };
  propertyType: { slug: string };
}) {
  console.log(contract);
  const [currentPage, setCurrentPage] =
    React.useState<React.Key>("neighborhood");

  return (
    <Breadcrumbs underline="active" onAction={(key) => setCurrentPage(key)}>
      <BreadcrumbItem
        href="/docs/components/button"
        key="home"
        isCurrent={currentPage === "home"}
      >
        Home
      </BreadcrumbItem>
      <BreadcrumbItem
        href={`/${propertyType.slug}/${contract.slug}`}
        key="contract"
        isCurrent={currentPage === "contract"}
      >
        {contract.value}
      </BreadcrumbItem>
      <BreadcrumbItem
        href={`/${propertyType.slug}/${contract.slug}/${location.country}`}
        key="country"
        isCurrent={currentPage === "country"}
      >
        {location.country} {contract.value}
      </BreadcrumbItem>
      <BreadcrumbItem
        href="/docs/components/button"
        key="city"
        isCurrent={currentPage === "city"}
      >
        {location.city} {contract.value}
      </BreadcrumbItem>
      <BreadcrumbItem
        href="/docs/components/button"
        key="district"
        isCurrent={currentPage === "district"}
      >
        {location.district} {contract.value}
      </BreadcrumbItem>
      <BreadcrumbItem
        key="neighborhood"
        href="/docs/components/button"
        isCurrent={currentPage === "neighborhood"}
      >
        {location.neighborhood}
      </BreadcrumbItem>
    </Breadcrumbs>
  );
}

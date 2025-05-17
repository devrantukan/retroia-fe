"use client";
import React, { useState, useMemo, useRef, useEffect } from "react";

import { Tabs, Tab, Card, CardBody, Pagination } from "@nextui-org/react";
import Link from "next/link";
import PropertyCard from "./PropertyCard";
import OfficeWorkerReviews from "./OfficeWorkerReviews";
import ProjectCard from "./ProjectCard";
import PaginationContainer from "./PaginationContainer";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import PropertySearchPanel from "./PropertySearchPanel";

interface Props {
  officeWorker: any;
}

const OfficeWorkerTabs = ({ officeWorker }: Props) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [sortBy, setSortBy] = useState("newest");
  const [filters, setFilters] = useState<any>({});
  const tabsRef = useRef<HTMLDivElement>(null);

  const activeTab = searchParams.get("tab") || "properties";

  const handleTabChange = (key: React.Key) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("tab", key.toString());
    router.push(`?${params.toString()}`, { scroll: false });
  };

  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("pagenum", page.toString());
    router.push(`?${params.toString()}`, { scroll: false });

    // Scroll to the properties section
    const propertiesSection = document.getElementById("tab-properties");
    if (propertiesSection) {
      const header = document.querySelector("header");
      const headerHeight = header ? header.getBoundingClientRect().height : 0;
      const propertiesTop =
        propertiesSection.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({
        top: propertiesTop - headerHeight - 20,
        behavior: "smooth",
      });
    }
  };

  // Handle initial scroll position
  useEffect(() => {
    if (tabsRef.current) {
      const header = document.querySelector("header");
      const headerHeight = header ? header.getBoundingClientRect().height : 0;
      const tabsTop =
        tabsRef.current.getBoundingClientRect().top + window.scrollY;

      // Add a small delay to ensure content is rendered
      setTimeout(() => {
        window.scrollTo({
          top: tabsTop - headerHeight - 20,
          behavior: "smooth",
        });
      }, 100);
    }
  }, []); // Run only on initial mount

  const handleSortChange = (sortBy: string) => {
    setSortBy(sortBy);
  };

  const handleFilterChange = (newFilters: any) => {
    setFilters(newFilters);
  };

  const filteredAndSortedProperties = useMemo(() => {
    if (!officeWorker.properties) return [];

    let filtered = [...officeWorker.properties];
    // console.log("Total properties before filter:", filtered.length);

    // Apply contract filter
    if (filters.contract) {
      // console.log("Filtering by contract:", filters.contract);
      // console.log("Sample property contract:", filtered[0]?.contract);
      filtered = filtered.filter((property) => {
        // console.log("Property contract:", property.contract);
        return property.contract?.id === parseInt(filters.contract);
      });
      //  console.log("Properties after filter:", filtered.length);
    }

    // Apply sorting
    const sorted = filtered.sort((a, b) => {
      // Get effective price (lower of regular and discounted price)
      const getEffectivePrice = (property: any) => {
        const regularPrice = property.price || 0;
        const discountedPrice = property.discountedPrice || 0;

        // If there's a valid discount, use the discounted price
        if (discountedPrice > 0 && discountedPrice < regularPrice) {
          return discountedPrice;
        }
        return regularPrice;
      };

      const priceA = getEffectivePrice(a);
      const priceB = getEffectivePrice(b);

      // Debug logging for each comparison
      // console.log("Price Comparison:", {
      //   propertyA: {
      //     id: a.id,
      //     name: a.name,
      //     regularPrice: a.price,
      //     discountedPrice: a.discountedPrice,
      //     effectivePrice: priceA,
      //     hasDiscount: a.discountedPrice > 0 && a.discountedPrice < a.price,
      //   },
      //   propertyB: {
      //     id: b.id,
      //     name: b.name,
      //     regularPrice: b.price,
      //     discountedPrice: b.discountedPrice,
      //     effectivePrice: priceB,
      //     hasDiscount: b.discountedPrice > 0 && b.discountedPrice < b.price,
      //   },
      //   comparison:
      //     sortBy === "price_asc"
      //       ? `${priceA} vs ${priceB} = ${priceA - priceB}`
      //       : `${priceB} vs ${priceA} = ${priceB - priceA}`,
      // });

      switch (sortBy) {
        case "price_desc":
          return priceB - priceA;
        case "price_asc":
          return priceA - priceB;
        case "newest":
          return (
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          );
        case "oldest":
          return (
            new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
          );
        default:
          return 0;
      }
    });

    // Log final sorted order
    // console.log(
    //   "Final Sorted Order:",
    //   sorted.map((property) => ({
    //     id: property.id,
    //     name: property.name,
    //     regularPrice: property.price,
    //     discountedPrice: property.discountedPrice,
    //     effectivePrice:
    //       property.discountedPrice > 0 &&
    //       property.discountedPrice < property.price
    //         ? property.discountedPrice
    //         : property.price,
    //   }))
    // );

    return sorted;
  }, [officeWorker.properties, sortBy, filters]);

  const pathname = usePathname();
  const pagenum = searchParams.get("pagenum");
  const selectedPage = parseInt(pagenum || "1");
  const elementsPerPage = 8;
  const totalPages = Math.ceil(
    filteredAndSortedProperties.length / elementsPerPage
  );

  // Get the current page's items
  const paginatedProperties = useMemo(() => {
    const startIndex = (selectedPage - 1) * elementsPerPage;
    const endIndex = startIndex + elementsPerPage;
    return filteredAndSortedProperties.slice(startIndex, endIndex);
  }, [filteredAndSortedProperties, selectedPage, elementsPerPage]);

  return (
    <div className="p-4 flex flex-col justify-between lg:w-3/4">
      <div
        className="flex w-full flex-col"
        ref={tabsRef}
        style={{ scrollMarginTop: "80px" }}
      >
        <Tabs
          aria-label="Options"
          selectedKey={activeTab}
          onSelectionChange={handleTabChange}
        >
          <Tab id="tab-about-me" key="about-me" title="Hakkımda">
            <Card>
              <CardBody>
                <div dangerouslySetInnerHTML={{ __html: officeWorker.about }} />
              </CardBody>
            </Card>
          </Tab>
          <Tab
            id="tab-properties"
            key="properties"
            title={`Portföylerim (${filteredAndSortedProperties.length})`}
          >
            <Card>
              <CardBody>
                <PropertySearchPanel
                  onSortChange={handleSortChange}
                  onFilterChange={handleFilterChange}
                  totalProperties={filteredAndSortedProperties.length}
                />
                {filteredAndSortedProperties.length > 0 ? (
                  <>
                    <div className="grid grid-cols-1 gap-6 mt-6">
                      {paginatedProperties.map((property) => (
                        <PropertyCard key={property.id} property={property} />
                      ))}
                    </div>
                    <div className="mt-6">
                      <PaginationContainer
                        currentPage={selectedPage}
                        totalPages={totalPages}
                        route={pathname}
                        onPageChange={handlePageChange}
                      />
                    </div>
                  </>
                ) : (
                  <div className="text-center py-8">
                    <p className="text-gray-500">
                      Bu kriterlere uygun ilan bulunamadı.
                    </p>
                  </div>
                )}
              </CardBody>
            </Card>
          </Tab>
          {officeWorker.assignedProjects.length > 0 && (
            <Tab id="tab-projects" key="projects" title="Projelerimiz">
              <Card>
                <CardBody className="space-y-6">
                  {officeWorker.assignedProjects.map((project: any) => (
                    <ProjectCard project={project} key={project.id} />
                  ))}
                </CardBody>
              </Card>
            </Tab>
          )}
          {officeWorker.reviews.length > 0 && (
            <Tab
              id="tab-customer-reviews"
              key="customer-reviews"
              title="Müşteri Yorumları"
            >
              <Card>
                <CardBody>
                  <OfficeWorkerReviews reviews={officeWorker.reviews} />
                </CardBody>
              </Card>
            </Tab>
          )}
        </Tabs>
      </div>
    </div>
  );
};
export default OfficeWorkerTabs;

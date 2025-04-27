"use client";
import React, { useState, useMemo } from "react";

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

  const activeTab = searchParams.get("tab") || "properties";

  const handleTabChange = (key: React.Key) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("tab", key.toString());
    router.push(`?${params.toString()}`);
  };

  const handleSortChange = (sortBy: string) => {
    setSortBy(sortBy);
  };

  const handleFilterChange = (newFilters: any) => {
    setFilters(newFilters);
  };

  const filteredAndSortedProperties = useMemo(() => {
    if (!officeWorker.properties) return [];

    let filtered = [...officeWorker.properties];
    console.log("Total properties before filter:", filtered.length);

    // Apply contract filter
    if (filters.contract) {
      console.log("Filtering by contract:", filters.contract);
      console.log("Sample property contract:", filtered[0]?.contract);
      filtered = filtered.filter((property) => {
        console.log("Property contract:", property.contract);
        return property.contract?.id === parseInt(filters.contract);
      });
      console.log("Properties after filter:", filtered.length);
    }

    // Apply sorting
    return filtered.sort((a, b) => {
      switch (sortBy) {
        case "price_desc":
          return (b.price || 0) - (a.price || 0);
        case "price_asc":
          return (a.price || 0) - (b.price || 0);
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
  }, [officeWorker.properties, sortBy, filters]);

  const pathname = usePathname();
  const pagenum = searchParams.get("pagenum");
  const selectedPage = parseInt(pagenum || "1");
  const elementsPerPage = 8;
  const totalPages = Math.ceil(
    filteredAndSortedProperties.length / elementsPerPage
  );

  return (
    <div className="p-4 flex flex-col justify-between lg:w-3/4">
      <div className="flex w-full flex-col">
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
          {filteredAndSortedProperties.length > 0 && (
            <Tab id="tab-properties" key="properties" title="Portföylerim">
              <Card>
                <CardBody>
                  <PropertySearchPanel
                    onSortChange={handleSortChange}
                    onFilterChange={handleFilterChange}
                  />
                  <div className="grid grid-cols-1 gap-6 mt-6">
                    {filteredAndSortedProperties.map((property) => (
                      <PropertyCard key={property.id} property={property} />
                    ))}
                  </div>
                  <div className="mt-6">
                    <PaginationContainer
                      currentPage={selectedPage}
                      totalPages={totalPages}
                      route={pathname}
                    />
                  </div>
                </CardBody>
              </Card>
            </Tab>
          )}
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

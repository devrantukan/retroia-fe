"use client";
import React from "react";

import { Tabs, Tab, Card, CardBody, Pagination } from "@nextui-org/react";
import Link from "next/link";
import PropertyCard from "./PropertyCard";
import OfficeWorkerReviews from "./OfficeWorkerReviews";
import ProjectCard from "./ProjectCard";
import PaginationContainer from "./PaginationContainer";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

interface Props {
  officeWorker: any;
}

const OfficeWorkerTabs = ({ officeWorker }: Props) => {
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams.toString());
  const pagenum = params.get("pagenum");

  console.log(typeof pagenum);

  const pathname = usePathname();

  const selectedPage = parseInt(pagenum || "1");
  const elementsPerPage = 8;
  const totalPages = Math.ceil(
    officeWorker.properties.length / elementsPerPage
  );

  const indexMin = selectedPage;
  const indexMax = indexMin + elementsPerPage;
  const paginatedArray = officeWorker.properties.filter(
    (x: any, index: number) => index >= indexMin && index < indexMax
  );

  console.log(paginatedArray);
  return (
    <div className="p-4 flex flex-col justify-between lg:w-3/4">
      <div className="flex w-full flex-col">
        <Tabs aria-label="Options">
          <Tab key="about-us" title="Hakkımda">
            <Card>
              <CardBody>{officeWorker.about}</CardBody>
            </Card>
          </Tab>
          {paginatedArray.length > 0 && (
            <Tab key="properties" title="Portföylerim">
              <Card>
                <CardBody>
                  {paginatedArray.map((property: any, index: number) => (
                    <PropertyCard
                      property={property}
                      key={index}
                      showAvatar={false}
                    />
                  ))}
                  <PaginationContainer
                    currentPage={selectedPage}
                    totalPages={totalPages}
                    route={pathname}
                  />
                </CardBody>
              </Card>
            </Tab>
          )}
          {officeWorker.assignedProjects.length > 0 && (
            <Tab key="projects" title="Projelerimiz">
              <Card>
                <CardBody>
                  {officeWorker.assignedProjects.map((project: any) => (
                    <ProjectCard project={project} key={project._id} />
                  ))}
                </CardBody>
              </Card>
            </Tab>
          )}
          {officeWorker.reviews.length > 0 && (
            <Tab key="customer-reviews" title="Müşteri Yorumları">
              <Card>
                <CardBody>
                  <OfficeWorkerReviews reviews={officeWorker.reviews} />
                  <div className="mt-6 text-center">
                    <button
                      type="button"
                      className="mb-2 me-2 rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700"
                    >
                      Daha fazla yorum göster
                    </button>
                  </div>
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

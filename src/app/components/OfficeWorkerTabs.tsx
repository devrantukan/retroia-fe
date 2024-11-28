"use client";
import React from "react";

import { Tabs, Tab, Card, CardBody } from "@nextui-org/react";
import Link from "next/link";
import PropertyCard from "./PropertyCard";

interface Props {
  officeWorker: any;
}

const OfficeWorkerTabs = ({ officeWorker }: Props) => {
  return (
    <div className="p-4 flex flex-col justify-between lg:w-3/4">
      <div className="flex w-full flex-col">
        <Tabs aria-label="Options">
          <Tab key="about-us" title="Hakkımda">
            <Card>
              <CardBody>{officeWorker.about}</CardBody>
            </Card>
          </Tab>
          <Tab key="properties" title="Portföylerim">
            <Card>
              <CardBody>
                {officeWorker.properties.map((property: any) => (
                  <PropertyCard property={property} key={property._id} />
                ))}
              </CardBody>
            </Card>
          </Tab>
          <Tab key="projects" title="Projelerimiz">
            <Card>
              <CardBody>projects will appear here</CardBody>
            </Card>
          </Tab>

          <Tab key="customer-reviews" title="Müşteri Yorumları">
            <Card>
              <CardBody>
                Excepteur sint occaecat cupidatat non proident, sunt in culpa
                qui officia deserunt mollit anim id est laborum.
              </CardBody>
            </Card>
          </Tab>
        </Tabs>
      </div>
    </div>
  );
};

export default OfficeWorkerTabs;

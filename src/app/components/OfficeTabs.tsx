"use client";
import React from "react";

import { Tabs, Tab, Card, CardBody } from "@nextui-org/react";
import Link from "next/link";
import OfficeWorkerCard from "./OfficeWorkerCard";
import PropertyCard from "./PropertyCard";
import ShowContactDetailsButton from "./ShowContactDetailsButton";
import OfficeMap from "./OfficeMap";
import { useRouter } from "next/navigation";

interface Props {
  office: any;
}

const OfficeTabs = ({ office }: Props) => {
  // find all properties of office workers
  let propertiesOfOffice: any[] = [];
  office.workers.map((worker: any) => {
    propertiesOfOffice.push(worker.properties);
  });

  propertiesOfOffice.flat().map((property: any) => {
    // console.log(property);
  });

  const router = useRouter();
  const [activeTab, setActiveTab] = React.useState("tab1");

  const handleTabChange = (value: React.Key) => {
    //update the state
    setActiveTab(value.toString());
    // update the URL query parameter
    router.push(`?tab=${value}`);
  };

  // if the query parameter changes, update the state
  React.useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const tabParam = params.get("tab");
    if (tabParam) {
      setActiveTab(tabParam);
    }
  }, []);

  return (
    <div className="p-4 flex flex-col justify-between lg:w-3/4">
      <div className="flex w-full flex-col">
        <Tabs
          aria-label="Options"
          selectedKey={activeTab}
          onSelectionChange={handleTabChange}
        >
          <Tab key="properties" title="Portföylerimiz">
            <Card>
              <CardBody>
                {propertiesOfOffice
                  .flat()
                  .map((property: any, index: number) => (
                    <PropertyCard
                      property={property}
                      key={index}
                      index={index}
                    />
                  ))}
              </CardBody>
            </Card>
          </Tab>
          <Tab key="about-us" title="Hakkımızda">
            <Card>
              <CardBody>{office.description}</CardBody>
            </Card>
          </Tab>
          <Tab key="our-office" title="Ofisimiz">
            <Card>
              <CardBody>
                Excepteur sint occaecat cupidatat non proident, sunt in culpa
                qui officia deserunt mollit anim id est laborum.
              </CardBody>
            </Card>
          </Tab>
          <Tab key="our-staff" title="Ekibimiz">
            <Card>
              <CardBody className="flex flex-row">
                {office.workers.map(
                  (
                    worker: { id: string; slug: string; name: string },
                    index: number
                  ) => (
                    <OfficeWorkerCard
                      officeWorker={worker}
                      key={index}
                      index={index}
                    />
                    // <Link
                    //   key={worker.id}
                    //   href={`/danisman/${worker.id}/${worker.slug}`}
                    // >
                    //   {worker.name}
                    // </Link>
                  )
                )}
              </CardBody>
            </Card>
          </Tab>
          <Tab key="contact-us" title="İletişim">
            <Card>
              <CardBody className="flex lg:flex-row flex-col">
                <div className="lg:w-2/3 h-full  w-full lg:mb-0 mb-4">
                  <OfficeMap />
                </div>
                <div className="lg:w-1/3  w-full">
                  <ShowContactDetailsButton
                    phone={office.phone}
                    fax={office.fax}
                    email={office.email}
                  />
                </div>
              </CardBody>
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
export default OfficeTabs;

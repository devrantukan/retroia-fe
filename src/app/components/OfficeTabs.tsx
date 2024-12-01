"use client";
import React from "react";

import { Tabs, Tab, Card, CardBody, Button } from "@nextui-org/react";
import Link from "next/link";

import PropertyCard from "./PropertyCard";
import ShowContactDetailsButton from "./ShowContactDetailsButton";
import OfficeMap from "./OfficeMap";
import { useRouter } from "next/navigation";
import { Compass, MapPin } from "@phosphor-icons/react/dist/ssr";
import OfficeWorkerCardLight from "./OfficeWorkerCardLight";

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
                      showAvatar={true}
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
              <CardBody className="flex lg:flex-row flex-col">
                {office.workers.map(
                  (
                    worker: { id: string; slug: string; name: string },
                    index: number
                  ) => (
                    <OfficeWorkerCardLight
                      officeWorker={worker}
                      key={index}
                      index={index}
                    />
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
                <div className="lg:w-1/3  w-full lg:ml-4 flex flex-col">
                  <ShowContactDetailsButton
                    phone={office.phone}
                    fax={office.fax}
                    email={office.email}
                  />
                  <p className="text-lg font-medium mx-4 text-slate-600 text-center capitalize my-2">
                    {office.streetAddress}
                  </p>
                  <p className="text-sm text-center font-medium capitalize">
                    {office.neighborhood.neighborhood_name.toLocaleLowerCase(
                      "tr"
                    )}{" "}
                    / {office.district.district_name.toLocaleLowerCase("tr")} /{" "}
                    {office.city.city_name.toLocaleLowerCase("tr")} /{" "}
                    {office.country.country_name}
                  </p>
                  <Button
                    className="mt-4 bg-blue-950 text-white font-bold text-md"
                    onClick={() => window.location.assign("?tab=contact-us")}
                  >
                    <MapPin width={20} height={20} />
                    Ofis Konumu
                  </Button>
                  <Button className="mt-4 bg-blue-950 text-white font-bold text-md">
                    <Link
                      target="_blank"
                      href={`https://www.google.com/maps?daddr=${office.latitude},${office.longitude}`}
                      className="flex flex-row gap-x-1 justify-center items-center"
                    >
                      <Compass width={20} height={20} />
                      Yol Tarifi Al
                    </Link>
                  </Button>
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

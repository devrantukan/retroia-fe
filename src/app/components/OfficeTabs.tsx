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
import OfficeImages from "./OfficeImages";
import OfficeWorkerReviews from "./OfficeWorkerReviews";
import Image from "next/image";

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

  // find all reviews of office workers
  let reviewsOfOffice: any[] = [];
  office.workers.map((worker: any) => {
    if (worker.reviews.length > 0) {
      reviewsOfOffice.push(worker.reviews);
    }
  });

  console.log("rewiews", reviewsOfOffice);

  const router = useRouter();
  const [activeTab, setActiveTab] = React.useState("properties");

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
          <Tab key="projects" title="Projelerimiz">
            <Card>
              <CardBody>Projects will be displayed here</CardBody>
            </Card>
          </Tab>
          <Tab key="about-us" title="Hakkımızda">
            <Card>
              <CardBody>
                <div>
                  <div
                    id="about"
                    className="relative bg-white overflow-hidden "
                  >
                    <div className="max-w-7xl mx-auto">
                      <div className="relative z-10 pb-8 bg-white sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
                        <svg
                          className="hidden lg:block absolute right-0 inset-y-0 h-full w-48 text-white transform translate-x-1/2"
                          fill="currentColor"
                          viewBox="0 0 100 100"
                          preserveAspectRatio="none"
                          aria-hidden="true"
                        >
                          <polygon points="50,0 100,0 50,100 0,100"></polygon>
                        </svg>

                        <div className="pt-1"></div>

                        <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
                          <div className="sm:text-center lg:text-left">
                            <h2 className="my-6 text-2xl tracking-tight font-extrabold text-gray-900 sm:text-3xl md:text-4xl">
                              Hakkımızda
                            </h2>

                            <p>{office.description}</p>
                          </div>
                        </main>
                      </div>
                    </div>
                    <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
                      <Image
                        className="h-56 w-full object-cover object-top sm:h-72 md:h-96 lg:w-full lg:h-full"
                        src="https://cdn.pixabay.com/photo/2024/11/08/09/45/facade-9182972_960_720.jpg 1x, https://cdn.pixabay.com/photo/2024/11/08/09/45/facade-9182972_1280.jpg"
                        alt=""
                        width={800}
                        height={640}
                      />
                    </div>
                  </div>
                </div>
              </CardBody>
            </Card>
          </Tab>
          <Tab key="our-office" title="Ofisimiz">
            <Card>
              <CardBody>
                <OfficeImages images={office.images} />
              </CardBody>
            </Card>
          </Tab>
          <Tab key="our-staff" title="Ekibimiz">
            <Card className="flex lg:flex-row flex-col">
              <CardBody>
                {office.workers.map(
                  (
                    worker: { id: string; slug: string; name: string },
                    index: number
                  ) => (
                    <div className="lg:w-1/3 w-full mr-4" key={index}>
                      <OfficeWorkerCardLight
                        officeWorker={worker}
                        key={index}
                        index={index}
                      />
                    </div>
                  )
                )}
              </CardBody>
            </Card>
          </Tab>
          <Tab key="contact-us" title="İletişim">
            <Card>
              <CardBody className="flex lg:flex-row flex-col">
                <div className="lg:w-2/3 h-full  w-full lg:mb-0 mb-4">
                  <OfficeMap lat={office.latitude} lng={office.longitude} />
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
                {/* <OfficeWorkerReviews reviews={reviewsOfOffice} /> */}
              </CardBody>
            </Card>
          </Tab>
        </Tabs>
      </div>
    </div>
  );
};
export default OfficeTabs;

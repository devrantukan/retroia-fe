"use client";
import React from "react";

import { Tabs, Tab, Card, CardBody, Button } from "@nextui-org/react";
import Link from "next/link";

import PropertyCard from "./PropertyCard";
import ShowContactDetailsButton from "./ShowContactDetailsButton";
import OfficeMap from "./OfficeMap";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Compass, MapPin } from "@phosphor-icons/react/dist/ssr";
import OfficeWorkerCardLight from "./OfficeWorkerCardLight";
import OfficeImages from "./OfficeImages";
import OfficeWorkerReviews from "./OfficeWorkerReviews";
import Image from "next/image";
import ProjectCard from "./ProjectCard";
import PaginationContainer from "./PaginationContainer";
import ContactForm from "./ContactForm";

interface Props {
  office: any;
}

const OfficeTabs = ({ office }: Props) => {
  // find all properties of office workers
  let propertiesOfOffice: any[] = [];
  office.workers.forEach((worker: any) => {
    //    console.log(worker);
    propertiesOfOffice.push(worker.properties);
  });

  let flatArrayProperties: any[] = [];
  propertiesOfOffice.flat().forEach((property: any) => {
    flatArrayProperties.push(property);
  });
  //console.log(flatArrayProperties);

  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams.toString());
  const pagenum = params.get("pagenum");

  //console.log(typeof pagenum);

  const pathname = usePathname();

  const selectedPage = parseInt(pagenum || "1");
  const elementsPerPage = 8;
  const totalPages = Math.ceil(flatArrayProperties.length / elementsPerPage);

  const indexMin = selectedPage;
  const indexMax = indexMin + elementsPerPage;
  const paginatedArray = flatArrayProperties.filter(
    (x: any, index: number) => index >= indexMin && index < indexMax
  );

  // find all reviews of office workers
  let reviewsOfOffice: any[] = [];
  office.workers.forEach((worker: any) => {
    if (worker.reviews.length > 0) {
      reviewsOfOffice.push(worker.reviews);
    }
  });

  const router = useRouter();
  const [activeTab, setActiveTab] = React.useState("our-staff");

  const handleTabChange = (value: React.Key) => {
    //update the state
    setActiveTab(value.toString());
    // update the URL query parameter
    router.replace(`?tab=${value}`, { scroll: false });

    // Smooth scroll to tab
    const selectedTab = document.getElementById(`tab-${value}`);
    if (selectedTab) {
      selectedTab.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  // if the query parameter changes, update the state
  React.useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const tabParam = params.get("tab");
    if (tabParam) {
      setActiveTab(tabParam);
    }
  }, []);

  const aytekTopuzoglu = {
    id: 1,
    name: "Aytek Topuzoğlu",
    slug: "aytek-topuzoglu",
    role: {
      id: 1,
      title: "Broker",
      slug: "broker",
    },
    office: {
      id: 1,
      name: "Retroia",
      slug: "retroia",
    },
    title: "Broker",
    avatarUrl:
      "https://inegzzkuttzsznxfbsmp.supabase.co/storage/v1/object/public/avatars/aytek-topuzoglu.jpg",
    phone: "+90 541 214 14 33",
    email: "aytek@retroia.com",
    properties: [],
    reviews: [],
  };

  const tubaTopuzoglu = {
    id: 2,
    name: "Tuba Ezer Topuzoğlu",
    slug: "tuba-ezer-topuzoglu",
    role: {
      id: 1,
      title: "Broker",
      slug: "broker",
    },
    office: {
      id: 1,
      name: "Retroia",
      slug: "retroia",
    },
    title: "Broker",
    avatarUrl:
      "https://inegzzkuttzsznxfbsmp.supabase.co/storage/v1/object/public/avatars/tuba-ezer-topuzoglu.jpg",
    phone: "+90 541 711 2626",
    email: "tuba@retroia.com",
    properties: [],
    reviews: [],
  };

  const candanDoganoglu = {
    id: 3,
    name: "Candan Doğanoğlu",
    slug: "candan-doganoglu",
    role: {
      id: 2,
      title: "Broker / Manager",
      slug: "broker-manager",
    },
    office: {
      id: 1,
      name: "Retroia",
      slug: "retroia",
    },
    title: "Broker / Manager",
    avatarUrl:
      "https://inegzzkuttzsznxfbsmp.supabase.co/storage/v1/object/public/avatars/candan-doganoglu.jpg",
    phone: "+90 533 667 0091",
    email: "candan@retroia.com",
    properties: [],
    reviews: [],
  };

  const sedaGulec = {
    id: 4,
    name: "Seda Güleç",
    slug: "seda-gulec",
    role: {
      id: 3,
      title: "Ofisler Müdürü",
      slug: "ofisler-muduru",
    },
    office: {
      id: 1,
      name: "Retroia",
      slug: "retroia",
    },
    title: "Ofisler Müdürü",
    avatarUrl:
      "https://inegzzkuttzsznxfbsmp.supabase.co/storage/v1/object/public/avatars/seda-gulec.jpg",
    phone: "+90 543 213 9998",
    email: "seda@retroia.com",
    properties: [],
    reviews: [],
  };

  const cihanEr = {
    id: 5,
    name: "Cihan Er",
    slug: "cihan-er",
    role: {
      id: 4,
      title: "Pazarlama Müdürü",
      slug: "pazarlama-muduru",
    },
    office: {
      id: 1,
      name: "Retroia",
      slug: "retroia",
    },
    title: "Pazarlama Müdürü",
    avatarUrl:
      "https://inegzzkuttzsznxfbsmp.supabase.co/storage/v1/object/public/avatars/cihan-er.jpg",
    phone: "+90 544 464 99 44",
    email: "cihan@retroia.com",
    properties: [],
    reviews: [],
  };

  // First, check if we're NOT on office one
  const isNotOfficeOne = office.id !== 1;

  return (
    <div className="p-4 flex flex-col justify-between lg:w-3/4">
      <div className="flex w-full flex-col">
        <Tabs
          aria-label="Options"
          selectedKey={activeTab}
          onSelectionChange={handleTabChange}
        >
          <Tab id="tab-properties" key="properties" title="Portföylerimiz">
            <Card>
              <CardBody>
                {paginatedArray.flat().map((property: any, index: number) => (
                  <PropertyCard
                    showAvatar={true}
                    property={property}
                    key={index}
                    index={index}
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
          {office.projects.length > 0 && (
            <Tab id="tab-projects" key="projects" title="Projelerimiz">
              <Card>
                <CardBody>
                  {office.projects.map((project: any, index: number) => (
                    <ProjectCard project={project} key={index} />
                  ))}
                </CardBody>
              </Card>
            </Tab>
          )}
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

                            <div
                              dangerouslySetInnerHTML={{
                                __html: office.description,
                              }}
                              className="prose max-w-none"
                            />
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
            <Card>
              <CardBody>
                {isNotOfficeOne && (
                  <>
                    <div className="w-full flex lg:flex-row flex-col">
                      <div className="grid lg:grid-cols-3 grid-cols-1 gap-x-6 mr-4">
                        <OfficeWorkerCardLight
                          officeWorker={aytekTopuzoglu}
                          key={aytekTopuzoglu.id}
                          index={0}
                        />
                        <OfficeWorkerCardLight
                          officeWorker={tubaTopuzoglu}
                          key={tubaTopuzoglu.id}
                          index={1}
                        />
                      </div>
                    </div>
                    <div className="w-full flex lg:flex-row flex-col">
                      <div className="grid lg:grid-cols-3 grid-cols-1 gap-x-6 mr-4">
                        <OfficeWorkerCardLight
                          officeWorker={candanDoganoglu}
                          key={candanDoganoglu.id}
                          index={2}
                        />
                        <OfficeWorkerCardLight
                          officeWorker={sedaGulec}
                          key={sedaGulec.id}
                          index={3}
                        />
                        <OfficeWorkerCardLight
                          officeWorker={cihanEr}
                          key={cihanEr.id}
                          index={4}
                        />
                      </div>
                    </div>
                  </>
                )}

                <div className="w-full flex lg:flex-row flex-col">
                  <div className="grid lg:grid-cols-3  grid-cols-1 gap-x-6 mr-4">
                    {office.workers
                      .filter(
                        (worker: { slug: string; role: { slug: string } }) =>
                          worker.role.slug === "broker"
                      )
                      .sort((a: any, b: any) => a.name.localeCompare(b.name))
                      .map(
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
                  </div>
                </div>
                <div className="w-full flex lg:flex-row flex-col">
                  <div className="grid lg:grid-cols-3  grid-cols-1 gap-x-6 mr-4">
                    {office.workers
                      .filter(
                        (worker: { slug: string; role: { slug: string } }) =>
                          worker.role.slug ===
                          "takim-lideri-gayrimenkul-danismani"
                      )
                      .sort((a: any, b: any) => a.name.localeCompare(b.name))
                      .map(
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
                  </div>
                </div>

                <div className="w-full flex lg:flex-row flex-col">
                  <div className="grid lg:grid-cols-3  grid-cols-1 gap-x-6 mr-4">
                    {office.workers
                      .filter(
                        (worker: { slug: string; role: { slug: string } }) =>
                          worker.role.slug === "is-gelistirme"
                      )
                      .sort((a: any, b: any) => a.name.localeCompare(b.name))
                      .map(
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
                    {office.workers
                      .filter(
                        (worker: { slug: string; role: { slug: string } }) =>
                          worker.role.slug === "proje-gelistirme"
                      )
                      .map(
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
                  </div>
                </div>

                <div className="w-full flex lg:flex-row flex-col">
                  <div className="grid lg:grid-cols-3  grid-cols-1 gap-x-6 mr-4">
                    {office.workers
                      .filter(
                        (worker: { slug: string; role: { slug: string } }) =>
                          worker.role.slug === "broker-manager"
                      )
                      .sort((a: any, b: any) => a.name.localeCompare(b.name))
                      .map(
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
                    {office.workers
                      .filter(
                        (worker: { slug: string; role: { slug: string } }) =>
                          worker.role.slug === "ofisler-muduru"
                      )
                      .sort((a: any, b: any) => a.name.localeCompare(b.name))
                      .map(
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
                    {office.workers
                      .filter(
                        (worker: { slug: string; role: { slug: string } }) =>
                          worker.role.slug === "pazarlama-muduru"
                      )
                      .sort((a: any, b: any) => a.name.localeCompare(b.name))
                      .map(
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
                  </div>
                </div>

                <div className="w-full flex lg:flex-row flex-col">
                  <div className="grid lg:grid-cols-3  grid-cols-1 gap-x-6 mr-4">
                    {office.workers
                      .filter(
                        (worker: { slug: string; role: { slug: string } }) =>
                          worker.role.slug === "proje-satis-temsilcisi"
                      )
                      .sort((a: any, b: any) => a.name.localeCompare(b.name))
                      .map(
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
                  </div>
                </div>
                <div className="w-full flex lg:flex-row flex-col">
                  <div className="grid lg:grid-cols-3  grid-cols-1 gap-x-6 mr-4">
                    {office.workers
                      .filter(
                        (worker: { slug: string; role: { slug: string } }) =>
                          worker.role.slug === "gayrimenkul-danismani"
                      )
                      .sort((a: any, b: any) => a.name.localeCompare(b.name))
                      .map(
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
                  </div>
                </div>
                <div className="w-full flex lg:flex-row flex-col">
                  <div className="grid lg:grid-cols-3  grid-cols-1 gap-x-6 mr-4">
                    {office.workers
                      .filter(
                        (worker: { slug: string; role: { slug: string } }) =>
                          worker.role.slug === "gd-asistani"
                      )
                      .sort((a: any, b: any) => a.name.localeCompare(b.name))
                      .map(
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
                  </div>
                </div>
                <div className="w-full flex lg:flex-row flex-col">
                  <div className="grid lg:grid-cols-3  grid-cols-1 gap-x-6 mr-4">
                    {office.workers
                      .filter(
                        (worker: { slug: string; role: { slug: string } }) =>
                          worker.role.slug === "ofis-asistani"
                      )
                      .sort((a: any, b: any) => a.name.localeCompare(b.name))
                      .map(
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
                  </div>
                </div>
                <div className="w-full flex lg:flex-row flex-col">
                  <div className="grid lg:grid-cols-3  grid-cols-1 gap-x-6 mr-4">
                    {office.workers
                      .filter(
                        (worker: { slug: string; role: { slug: string } }) =>
                          worker.role.slug === "karsilama-ve-servis-sorumlusu"
                      )
                      .sort((a: any, b: any) => a.name.localeCompare(b.name))
                      .map(
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
                  </div>
                </div>
              </CardBody>
            </Card>
          </Tab>
          <Tab key="contact-us" title="İletişim">
            <Card>
              <CardBody className="flex lg:flex-row flex-col">
                <div className="lg:w-2/3 h-full  w-full lg:mb-0 mb-4">
                  <OfficeMap lat={office.latitude} lng={office.longitude} />
                </div>
                <div className="lg:w-1/3 h-full w-full lg:mb-0 mb-4">
                  <ContactForm officeId={office.id} />
                </div>
              </CardBody>
            </Card>
          </Tab>
          <Tab key="customer-reviews" title="Müşteri Yorumları">
            <Card>
              <CardBody>
                {reviewsOfOffice.map((reviews, index) => (
                  <OfficeWorkerReviews reviews={reviews} key={index} />
                ))}
                <div className="mt-6 text-center">
                  <button
                    type="button"
                    className="mb-2 me-2 rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700"
                  >
                    {reviewsOfOffice.length > 0
                      ? "Daha fazla yorum göster"
                      : "Henüz yorum yapılmamış"}
                  </button>
                </div>
              </CardBody>
            </Card>
          </Tab>
        </Tabs>
      </div>
    </div>
  );
};
export default OfficeTabs;

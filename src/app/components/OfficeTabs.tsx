"use client";
import React, { useState, useMemo, useRef } from "react";

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
import PropertySearchPanel from "./PropertySearchPanel";

interface Props {
  office: any;
}

const OfficeTabs = ({ office }: Props) => {
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

  const handleSortChange = (sortBy: string) => {
    setSortBy(sortBy);
  };

  const handleFilterChange = (newFilters: any) => {
    setFilters(newFilters);
  };

  const flatArrayProperties = useMemo(() => {
    let propertiesOfOffice: any[] = [];
    office.workers.forEach((worker: any) => {
      propertiesOfOffice.push(worker.properties);
    });

    let flatArray: any[] = [];
    propertiesOfOffice.flat().forEach((property: any) => {
      flatArray.push(property);
    });

    return flatArray;
  }, [office.workers]);

  const filteredAndSortedProperties = useMemo(() => {
    if (!flatArrayProperties) return [];

    let filtered = [...flatArrayProperties];

    // Apply contract filter
    if (filters.contract) {
      filtered = filtered.filter((property) => {
        return property.contract?.id === parseInt(filters.contract);
      });
    }

    // Log all properties with their effective prices before sorting
    console.log(
      "Properties before sorting:",
      filtered.map((property) => ({
        id: property.id,
        name: property.name,
        regularPrice: property.price,
        discountedPrice: property.discountedPrice,
        effectivePrice:
          property.discountedPrice > 0 &&
          property.discountedPrice < property.price
            ? property.discountedPrice
            : property.price,
        hasDiscount:
          property.discountedPrice > 0 &&
          property.discountedPrice < property.price,
      }))
    );

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
      console.log("Price Comparison:", {
        propertyA: {
          id: a.id,
          name: a.name,
          regularPrice: a.price,
          discountedPrice: a.discountedPrice,
          effectivePrice: priceA,
          hasDiscount: a.discountedPrice > 0 && a.discountedPrice < a.price,
        },
        propertyB: {
          id: b.id,
          name: b.name,
          regularPrice: b.price,
          discountedPrice: b.discountedPrice,
          effectivePrice: priceB,
          hasDiscount: b.discountedPrice > 0 && b.discountedPrice < b.price,
        },
        comparison:
          sortBy === "price_asc"
            ? `${priceA} vs ${priceB} = ${priceA - priceB}`
            : `${priceB} vs ${priceA} = ${priceB - priceA}`,
      });

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
    console.log(
      "Final Sorted Order:",
      sorted.map((property) => ({
        id: property.id,
        name: property.name,
        regularPrice: property.price,
        discountedPrice: property.discountedPrice,
        effectivePrice:
          property.discountedPrice > 0 &&
          property.discountedPrice < property.price
            ? property.discountedPrice
            : property.price,
      }))
    );

    return sorted;
  }, [flatArrayProperties, sortBy, filters]);

  const pagenum = searchParams.get("pagenum");
  const pathname = usePathname();
  const selectedPage = parseInt(pagenum || "1");
  const elementsPerPage = 8;
  const totalPages = Math.ceil(
    filteredAndSortedProperties.length / elementsPerPage
  );
  console.log("Total pages:", totalPages, "Current page:", selectedPage);

  // Get the current page's items
  const paginatedProperties = useMemo(() => {
    const startIndex = (selectedPage - 1) * elementsPerPage;
    const endIndex = startIndex + elementsPerPage;
    const pageItems = filteredAndSortedProperties.slice(startIndex, endIndex);
    console.log("Items on current page:", pageItems.length);
    return pageItems;
  }, [filteredAndSortedProperties, selectedPage, elementsPerPage]);

  // find all reviews of office workers
  let reviewsOfOffice: any[] = [];
  office.workers.forEach((worker: any) => {
    if (worker.reviews.length > 0) {
      reviewsOfOffice.push(worker.reviews);
    }
  });

  const [activeTabState, setActiveTab] = React.useState("our-staff");

  const handleTabChangeState = (value: React.Key) => {
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

  // Add useEffect to handle initial scroll position
  React.useEffect(() => {
    if (window.innerWidth < 768 && tabsRef.current) {
      const header = document.querySelector("header");
      const headerHeight = header ? header.getBoundingClientRect().height : 0;
      const tabsTop =
        tabsRef.current.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({
        top: tabsTop - headerHeight - 60, // Add 60px extra space above
        behavior: "smooth",
      });
    }
  }, [activeTab]);

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
      "https://inegzzkuttzsznxfbsmp.supabase.co/storage/v1/object/public/office-images/aytek.jpg",
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
      "https://inegzzkuttzsznxfbsmp.supabase.co/storage/v1/object/public/office-images/tuba-ezer.jpg",
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
      "https://inegzzkuttzsznxfbsmp.supabase.co/storage/v1/object/public/office-images/candan.jpg",
    phone: "+90 533 667 0091",
    email: "candan@retroia.com",
    properties: [],
    reviews: [],
  };

  const sedaGulec = {
    id: 4,
    name: "Seda Güleç Sebuktekin",
    slug: "seda-gulec-sebuktekin",
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
      "https://inegzzkuttzsznxfbsmp.supabase.co/storage/v1/object/public/office-images/seda.jpg",
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
      "https://inegzzkuttzsznxfbsmp.supabase.co/storage/v1/object/public/office-images/cihan.jpg",
    phone: "+90 544 464 99 44",
    email: "cihan@retroia.com",
    properties: [],
    reviews: [],
  };

  // First, check if we're NOT on office one
  const isNotOfficeOne = office.id !== 1;

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
          <Tab id="tab-properties" key="properties" title="Portföylerimiz">
            <Card>
              <CardBody>
                <PropertySearchPanel
                  onSortChange={handleSortChange}
                  onFilterChange={handleFilterChange}
                />
                <div className="grid grid-cols-1 gap-6 mt-6">
                  {paginatedProperties.map((property) => (
                    <PropertyCard
                      key={property.id}
                      property={property}
                      showAvatar={true}
                    />
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
          {office.projects.length > 0 && (
            <Tab id="tab-projects" key="projects" title="Projeler">
              <Card>
                <CardBody>
                  <div className="grid grid-cols-1 gap-6">
                    {office.projects.map((project: any) => (
                      <ProjectCard key={project.id} project={project} />
                    ))}
                  </div>
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
                {reviewsOfOffice.length > 0 ? (
                  <OfficeWorkerReviews reviews={reviewsOfOffice.flat()} />
                ) : (
                  <p className="text-center text-gray-500">
                    Henüz yorum yapılmamış
                  </p>
                )}
              </CardBody>
            </Card>
          </Tab>
        </Tabs>
      </div>
    </div>
  );
};
export default OfficeTabs;

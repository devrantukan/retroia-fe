import prisma from "@/lib/prisma";

import HomepageHero from "./components/HomepageHero";
import HomepageCustomerBanner from "./components/HomepageCustomerBanner";
import HomepageAgentBanner from "./components/HomepageAgentBanner";
import HomepageAgentSlider from "./components/HomepageAgentSlider";
import HomepageRentalList from "./components/HomepageRentalList";
import HomepageForSaleList from "./components/HomepageForSaleList";

const PAGE_SIZE = 8;

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

interface Props {
  searchParams: { [key: string]: string | string[] | undefined };
}
/* Randomize array in-place using Durstenfeld shuffle algorithm */

function shuffleArray(array: any[]): void {
  for (var i = array.length - 1; i >= 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
}
export default async function Home({ searchParams }: Props) {
  let agents = await prisma.officeWorker.findMany({
    where: {
      roleId: { in: [7, 6] },
    },
    include: {
      role: true,
      office: true,
    },
  });

  shuffleArray(agents);

  const properties = await prisma.property.findMany({
    where: {
      publishingStatus: "PUBLISHED",
    },
    select: {
      id: true,
      name: true,
      price: true,
      discountedPrice: true,
      images: {
        select: {
          url: true,
        },
      },
      location: {
        select: {
          city: true,
          state: true,
          country: true,
          district: true,
          neighborhood: true,
        },
      },
      type: true,
      contract: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  // Get at least 5 satılık konut properties
  const satilikKonut = properties
    .filter((p) => p.type.value === "konut" && p.contract.value === "satılık")
    .slice(0, 5);

  // Get other properties
  const otherProperties = properties.filter(
    (p) => !(p.type.value === "konut" && p.contract.value === "satılık")
  );

  // Combine the results
  const selectedProperties = [...satilikKonut, ...otherProperties];

  return (
    <div>
      <HomepageHero />
      <div className="flex lg:flex-row flex-col gap-y-6  ">
        <HomepageRentalList properties={selectedProperties} />
        <HomepageForSaleList properties={selectedProperties} />
      </div>
      <div className="flex lg:flex-row flex-col gap-y-6 mt-6 gap-x-6">
        <HomepageCustomerBanner />
        <HomepageAgentBanner />
      </div>

      <HomepageAgentSlider agents={agents} />

      {/* <PropertyContainer totalPages={totalPages} currentPage={+pagenum}>
        {properties.map((propertyItem) => (
          <PropertyCard property={propertyItem} key={propertyItem.id} />
        ))}
      </PropertyContainer> */}
    </div>
  );
}

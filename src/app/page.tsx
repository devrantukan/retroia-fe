import prisma from "@/lib/prisma";
import Image from "next/image";
import PropertyCard from "./components/PropertyCard";
import PropertyContainer from "./components/PropertyContainer";
import Search from "./components/Search";
import HomepageHero from "./components/HomepageHero";
import HomepageCustomerBanner from "./components/HomepageCustomerBanner";
import HomepageAgentBanner from "./components/HomepageAgentBanner";
import HomepageAgentSlider from "./components/HomepageAgentSlider";
const PAGE_SIZE = 8;

interface Props {
  searchParams: { [key: string]: string | string[] | undefined };
}
export default async function Home({ searchParams }: Props) {
  const agents = await prisma.officeWorker.findMany({
    where: {
      roleId: { in: [7, 6] },
    },
    include: {
      role: true,
      office: true,
    },
  });

  const pagenum = searchParams.pagenum ?? 0;
  const query = searchParams.query ?? "";
  const propertiesPromise = prisma.property.findMany({
    select: {
      id: true,
      name: true,
      price: true,
      images: {
        select: {
          url: true,
        },
      },
      location: {
        select: {
          city: true,
          state: true,
        },
      },
    },
    ...(!!query && {
      where: {
        name: {
          contains: String(query),
        },
      },
    }),
    skip: +pagenum * PAGE_SIZE,
    take: PAGE_SIZE,
  });
  const totalPropertiesPromise = prisma.property.count({
    ...(!!query && {
      where: {
        name: {
          contains: String(query),
        },
      },
    }),
  });

  const [properties, totalProperties] = await Promise.all([
    propertiesPromise,
    totalPropertiesPromise,
  ]);

  const totalPages = Math.floor(totalProperties / PAGE_SIZE);

  return (
    <div>
      <HomepageHero />
      <div className="flex flex-row">
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

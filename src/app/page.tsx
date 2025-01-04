import prisma from "@/lib/prisma";
import Image from "next/image";
import PropertyCard from "./components/PropertyCard";
import PropertyContainer from "./components/PropertyContainer";
import Search from "./components/Search";
import HomepageHero from "./components/HomepageHero";
import HomepageCustomerBanner from "./components/HomepageCustomerBanner";
import HomepageAgentBanner from "./components/HomepageAgentBanner";
import HomepageAgentSlider from "./components/HomepageAgentSlider";
import HomepageRentalList from "./components/HomepageRentalList";
import HomepageForSaleList from "./components/HomepageForSaleList";
import axios from "axios";
const PAGE_SIZE = 8;

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
          country: true,
          district: true,
          neighborhood: true,
        },
      },
      type: true,
      contract: true,
    },

    skip: 0,
    take: 50,
  });

  const [countries, cities] = await Promise.all([
    prisma.country.findMany(),
    prisma.city.findMany(),
    // prisma.district.findMany(),
    // prisma.neighborhood.findMany(),
  ]);

  async function fetchDistricts() {
    try {
      const response = await fetch(`http://localhost:3000/api/data/districts`);
    } catch (error) {
      console.error("Error fetching districts:", error);
    }
  }

  async function fetchNeighborhoods() {
    try {
      const response = await fetch(
        `http://localhost:3000/api/data/neighborhoods`
      );
    } catch (error) {
      console.error("Error fetching neighborhoods:", error);
    }
  }

  const districts = await fetchDistricts();

  const neighborhoods = await fetchNeighborhoods();

  console.log("neighborhoods", neighborhoods);
  let citiesObj: Record<string, string[]> = {};

  for (const country of countries) {
    const citiesData = await prisma.city.findMany({
      where: {
        country_name: country.country_name,
      },
    });
    const cityNames = citiesData.map((city) => city.city_name);
    citiesObj[country.country_name] = cityNames;
  }

  return (
    <div>
      <HomepageHero />
      <div className="flex lg:flex-row flex-col gap-y-6  ">
        <HomepageRentalList properties={properties} />
        <HomepageForSaleList properties={properties} />
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

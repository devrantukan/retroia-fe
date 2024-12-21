import prisma from "@/lib/prisma";
import Image from "next/image";
import PropertyCard from "@/app/components/PropertyCard";
import PropertyContainer from "@/app/components/PropertyContainer";
import Search from "@/app/components/Search";
const PAGE_SIZE = 8;

interface Props {
  params: {
    type: string;
    contract: string;
    country: string;
    city: string;
  };
}

export default async function Home({ params }: Props) {
  console.log("params is", params);
  const contract = await prisma.propertyContract.findFirst({
    select: {
      slug: true,
      value: true,
    },
    where: { slug: params.contract },
  });

  const type = await prisma.propertyType.findFirst({
    where: {
      slug: params.type,
    },
  });

  const country = await prisma.country.findFirst({
    where: {
      slug: params.country,
    },
  });

  console.log("country", country);

  return (
    <div>
      <Search
        type={type?.value ?? ""}
        contract={contract?.value ?? ""}
        country={country?.country_name ?? ""}
        city={""}
        district={""}
        neighborhood={""}
      />
    </div>
  );
}

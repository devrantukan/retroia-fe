import prisma from "@/lib/prisma";
import Image from "next/image";
import PropertyCard from "@/app/components/PropertyCard";
import PropertyContainer from "@/app/components/PropertyContainer";
import Search from "@/app/components/Search";
import { useRouter } from "next/navigation";
const PAGE_SIZE = 8;

interface Props {
  params: {
    type: string;
    contract: string;
    country: string;
  };
}

export default async function Home({ params }: Props) {
  const contract = await prisma.propertyContract.findFirst({
    select: {
      slug: true,
      value: true,
    },
    where: { slug: params.contract },
  });

  params.type = "ticari";
  const type = await prisma.propertyType.findFirst({
    where: {
      slug: params.type,
    },
  });

  console.log("type is:", type);

  return (
    <div>
      <Search
        type={type?.value ?? ""}
        contract={contract?.value ?? ""}
        country={params.country ?? ""}
        city={""}
        district={""}
        neighborhood={""}
      />
    </div>
  );
}

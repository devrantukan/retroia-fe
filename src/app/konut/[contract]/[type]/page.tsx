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
  };
}

export default async function Home({ params }: Props) {
  console.log("params is: ", params.contract);

  const contract = await prisma.propertyContract.findFirst({
    select: {
      slug: true,
      value: true,
    },
    where: { slug: params.contract },
  });
  console.log(params.type);
  const type = await prisma.propertyType.findFirst({
    where: {
      slug: params.type,
    },
  });

  console.log(contract);
  return (
    <div>
      <Search type={type?.value ?? ""} contract={contract?.value ?? ""} />
    </div>
  );
}

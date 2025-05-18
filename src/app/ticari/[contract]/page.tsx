import prisma from "@/lib/prisma";
import Image from "next/image";
import PropertyCard from "@/app/components/PropertyCard";
import PropertyContainer from "@/app/components/PropertyContainer";
import Search from "@/app/components/Search";
import { Metadata } from "next";
import { useRouter } from "next/navigation";
const PAGE_SIZE = 8;

interface Props {
  params: {
    type: string;
    contract: string;
    country: string;
  };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const contractType = params.contract === "satilik" ? "Satılık" : "Kiralık";

  return {
    metadataBase: new URL(
      process.env.NEXT_PUBLIC_SITE_URL || "https://www.retroia.com/emlak"
    ),
    title: `${contractType} Ticari Gayrimenkul İlanları | Retroia Gayrimenkul`,
    description: `Türkiye'nin en güvenilir gayrimenkul platformunda ${contractType.toLowerCase()} ticari gayrimenkul ilanları. Ofis, dükkan, plaza, depo ve daha fazlası için hemen inceleyin.`,
    keywords: `${contractType.toLowerCase()} ticari gayrimenkul, ${contractType.toLowerCase()} ofis, ${contractType.toLowerCase()} dükkan, ${contractType.toLowerCase()} plaza, ${contractType.toLowerCase()} depo, emlak, gayrimenkul, ticari gayrimenkul ilanları`,
    openGraph: {
      title: `${contractType} Ticari Gayrimenkul İlanları | Retroia Gayrimenkul`,
      description: `Türkiye'nin en güvenilir gayrimenkul platformunda ${contractType.toLowerCase()} ticari gayrimenkul ilanları. Ofis, dükkan, plaza, depo ve daha fazlası için hemen inceleyin.`,
      siteName: "Retroia",
      locale: "tr_TR",
      type: "website",
      url: `/ticari/${params.contract}`,
    },
    twitter: {
      card: "summary_large_image",
      title: `${contractType} Ticari Gayrimenkul İlanları | Retroia Gayrimenkul`,
      description: `Türkiye'nin en güvenilir gayrimenkul platformunda ${contractType.toLowerCase()} ticari gayrimenkul ilanları. Ofis, dükkan, plaza, depo ve daha fazlası için hemen inceleyin.`,
      creator: "@retroia",
      site: "@retroia",
    },
    alternates: {
      canonical: `/ticari/${params.contract}`,
    },
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

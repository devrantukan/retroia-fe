import prisma from "@/lib/prisma";
import Image from "next/image";
import PropertyCard from "@/app/components/PropertyCard";
import PropertyContainer from "@/app/components/PropertyContainer";
import Search from "@/app/components/Search";
import { Metadata } from "next";
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
    title: `${contractType} Konut İlanları | Retroia Gayrimenkul`,
    description: `Türkiye'nin en güvenilir gayrimenkul platformunda ${contractType.toLowerCase()} konut ilanları. Daire, villa, müstakil ev ve daha fazlası için hemen inceleyin.`,
    keywords: `${contractType.toLowerCase()} konut, ${contractType.toLowerCase()} daire, ${contractType.toLowerCase()} villa, ${contractType.toLowerCase()} ev, emlak, gayrimenkul, konut ilanları`,
    openGraph: {
      title: `${contractType} Konut İlanları | Retroia Gayrimenkul`,
      description: `Türkiye'nin en güvenilir gayrimenkul platformunda ${contractType.toLowerCase()} konut ilanları. Daire, villa, müstakil ev ve daha fazlası için hemen inceleyin.`,
      siteName: "Retroia",
      locale: "tr_TR",
      type: "website",
      url: `/konut/${params.contract}`,
    },
    twitter: {
      card: "summary_large_image",
      title: `${contractType} Konut İlanları | Retroia Gayrimenkul`,
      description: `Türkiye'nin en güvenilir gayrimenkul platformunda ${contractType.toLowerCase()} konut ilanları. Daire, villa, müstakil ev ve daha fazlası için hemen inceleyin.`,
      creator: "@retroia",
      site: "@retroia",
    },
    alternates: {
      canonical: `/konut/${params.contract}`,
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

  const type = await prisma.propertyType.findFirst({
    where: {
      slug: params.type,
    },
  });

  return (
    <div>
      <Search
        type={type?.value ?? ""}
        contract={contract?.value ?? ""}
        country={params.country}
        city={""}
        district={""}
        neighborhood={""}
      />
    </div>
  );
}

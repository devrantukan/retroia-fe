import prisma from "@/lib/prisma";
import Image from "next/image";
import PropertyCard from "@/app/components/PropertyCard";
import PropertyContainer from "@/app/components/PropertyContainer";
import Search from "@/app/components/Search";
import { Metadata } from "next";

const PAGE_SIZE = 8;

interface Props {
  params: {
    contract: string;
    type?: string;
  };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const contractType = params.contract === "satilik" ? "Satılık" : "Kiralık";

  return {
    metadataBase: new URL(
      process.env.NEXT_PUBLIC_SITE_URL || "https://www.retroia.com/emlak"
    ),
    title: `${contractType} Arsa ve Arazi İlanları | Retroia Gayrimenkul`,
    description: `Türkiye'nin en güvenilir gayrimenkul platformunda ${contractType.toLowerCase()} arsa ve arazi ilanları. İmar durumu uygun, yatırımlık ve geliştirilebilir arsalar için hemen inceleyin.`,
    keywords: `${contractType.toLowerCase()} arsa, ${contractType.toLowerCase()} arazi, ${contractType.toLowerCase()} tarla, ${contractType.toLowerCase()} bahçe, ${contractType.toLowerCase()} yatırımlık arsa, emlak, gayrimenkul, arsa ilanları`,
    openGraph: {
      title: `${contractType} Arsa ve Arazi İlanları | Retroia Gayrimenkul`,
      description: `Türkiye'nin en güvenilir gayrimenkul platformunda ${contractType.toLowerCase()} arsa ve arazi ilanları. İmar durumu uygun, yatırımlık ve geliştirilebilir arsalar için hemen inceleyin.`,
      siteName: "Retroia",
      locale: "tr_TR",
      type: "website",
      url: `/arsa-arazi/${params.contract}`,
    },
    twitter: {
      card: "summary_large_image",
      title: `${contractType} Arsa ve Arazi İlanları | Retroia Gayrimenkul`,
      description: `Türkiye'nin en güvenilir gayrimenkul platformunda ${contractType.toLowerCase()} arsa ve arazi ilanları. İmar durumu uygun, yatırımlık ve geliştirilebilir arsalar için hemen inceleyin.`,
      creator: "@retroia",
      site: "@retroia",
    },
    alternates: {
      canonical: `/arsa-arazi/${params.contract}`,
    },
  };
}

export default async function Home({ params }: Props) {
  params.type = "arsa-arazi";

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
        country=""
        city={""}
        district={""}
        neighborhood={""}
      />
    </div>
  );
}

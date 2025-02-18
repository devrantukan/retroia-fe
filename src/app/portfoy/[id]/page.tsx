import { Metadata } from "next";
import PropertyPageClient from "./PropertyPageClient";

export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/properties/${params.id}`,
      {
        next: { revalidate: 3600 },
      }
    );

    if (!response.ok) {
      return {
        title: "İlan Bulunamadı",
        description: "İlan detayları bulunamadı.",
      };
    }

    const property = await response.json();

    const locationString = [
      property.location?.neighborhood,
      property.location?.district,
      property.location?.city,
      "Türkiye",
    ]
      .filter(Boolean)
      .join(", ");

    return {
      metadataBase: new URL(
        process.env.NEXT_PUBLIC_SITE_URL || "https://emlak.retroia.com"
      ),
      title: `${property.name} - ${property.location?.city}, ${property.location?.district}`,
      description: `${property.feature?.bedrooms} Yatak Odalı, ${
        property.feature?.bathrooms
      } Banyolu, ${property.feature?.area}m² ${property.type} ${
        property.contract === "sale" ? "Satılık" : "Kiralık"
      } - ${locationString}`,
      keywords: `${property.type}, ${
        property.contract === "sale" ? "satılık" : "kiralık"
      }, ${property.location?.city}, ${property.location?.district}, ${
        property.location?.neighborhood
      }, emlak, gayrimenkul`,
      openGraph: {
        title: property.name,
        description: property.description,
        images:
          property.images?.map((img: any) => ({
            url: img.url,
          })) || [],
        siteName: "Retroia",
        locale: "tr_TR",
        type: "article",
        url: `/property/${params.id}`,
        authors: [property.agent?.name],
        publishedTime: property.created_at,
        modifiedTime: property.updated_at,
        section: "Real Estate",
        tags: [
          property.type,
          property.contract === "sale" ? "satılık" : "kiralık",
          property.location?.city,
          property.location?.district,
          property.location?.neighborhood,
          "emlak",
          "gayrimenkul",
        ],
      },
      alternates: {
        canonical: `/property/${params.id}`,
      },
      other: {
        "geo.position": `${property.location?.latitude};${property.location?.longitude}`,
        "geo.placename": locationString,
        "geo.region": "TR",
      },
    };
  } catch (error) {
    console.error("Error generating metadata:", error);
    return {
      title: "İlan Detayı",
      description: "İlan detay sayfası",
    };
  }
}

export default function PropertyPage({ params }: { params: { id: string } }) {
  return <PropertyPageClient params={params} />;
}

import { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: { id: string; agentId: string; agentSlug: string };
}): Promise<Metadata> {
  try {
    const API_URL = process.env.NEXT_PUBLIC_API_URL || "/emlak/api";
    const response = await fetch(`${API_URL}/properties/${params.id}/`);
    const property = await response.json();

    if (!property) {
      return {
        title: "İlan Bulunamadı | Retroia",
        description: "Aradığınız ilan bulunamadı.",
      };
    }

    return {
      title: `${property.name} | ${property.location?.city} ${property.location?.district} | Retroia`,
      description: `${property.name} - ${property.location?.city} ${property.location?.district} ${property.location?.neighborhood} bölgesinde ${property.type.value} ilanı. ${property.feature?.area} m², ${property.feature?.bedrooms} oda, ${property.feature?.bathrooms} banyo.`,
      openGraph: {
        title: `${property.name} | ${property.location?.city} ${property.location?.district} | Retroia`,
        description: `${property.name} - ${property.location?.city} ${property.location?.district} ${property.location?.neighborhood} bölgesinde ${property.type.value} ilanı. ${property.feature?.area} m², ${property.feature?.bedrooms} oda, ${property.feature?.bathrooms} banyo.`,
        images: property.images?.[0]?.url ? [property.images[0].url] : [],
      },
    };
  } catch (error) {
    return {
      title: "İlan Bulunamadı | Retroia",
      description: "Aradığınız ilan bulunamadı.",
    };
  }
}

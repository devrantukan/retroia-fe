import { Metadata } from "next";
import OfficeWorkerPageClient from "./OfficeWorkerPageClient";

const stripHtml = (html: string) => {
  if (!html) return "";
  return html.replace(/<[^>]*>/g, "");
};

export async function generateMetadata({
  params,
}: {
  params: {
    officeId: string;
    officeSlug: string;
    roleSlug: string;
    workerId: string;
    workerSlug: string;
  };
}): Promise<Metadata> {
  try {
    console.log("Generating metadata for worker:", params.workerId);
    const API_URL =
      process.env.NEXT_PUBLIC_API_URL || "https://www.retroia.com/emlak/api/";
    const url = `${API_URL}officeWorker/${params.workerId}`;
    console.log("Fetching from URL:", url);

    const response = await fetch(url, {
      next: { revalidate: 3600 },
      headers: {
        Accept: "application/json",
      },
    });

    if (!response.ok) {
      console.log(
        "Failed to fetch worker data:",
        response.status,
        response.statusText
      );
      const errorText = await response.text();
      console.log("Error response:", errorText);
      return {
        title: "Danışman Bulunamadı",
        description: "Danışman detayları bulunamadı.",
      };
    }

    const worker = await response.json();
    console.log("Worker data received:", worker);

    const locationString = [
      worker.office?.neighborhood?.neighborhood_name,
      worker.office?.district?.district_name,
      worker.office?.city?.city_name,
      worker.office?.country?.country_name,
    ]
      .filter(Boolean)
      .join(", ");

    return {
      metadataBase: new URL(
        process.env.NEXT_PUBLIC_SITE_URL || "https://www.retroia.com/emlak"
      ),
      title: `${worker.name} ${worker.surname} - ${worker.title} - ${worker.office?.name}`,
      description: `${worker.title} ${worker.name} ${worker.surname} - ${worker.office?.name} - ${locationString}`,
      keywords: `${worker.title}, ${worker.name} ${worker.surname}, ${worker.office?.name}, ${worker.office?.city?.city_name}, ${worker.office?.district?.district_name}, emlak danışmanı, gayrimenkul danışmanı`,
      openGraph: {
        title: `${worker.name} ${worker.surname} - ${worker.title}`,
        description: stripHtml(worker.about || "").slice(0, 80) + "...",
        images: worker.avatarUrl
          ? [
              {
                url: worker.avatarUrl,
                alt: `${worker.name} ${worker.surname} - ${worker.title}`,
              },
            ]
          : [],
        siteName: "Retroia",
        locale: "tr_TR",
        type: "website",
        url: `/ofis/${params.officeId}/${params.officeSlug}/${params.roleSlug}/${params.workerId}/${params.workerSlug}`,
      },
      alternates: {
        canonical: `/ofis/${params.officeId}/${params.officeSlug}/${params.roleSlug}/${params.workerId}/${params.workerSlug}`,
      },
      other: {
        "geo.position": `${worker.office?.latitude};${worker.office?.longitude}`,
        "geo.placename": locationString,
        "geo.region": "TR",
      },
    };
  } catch (error) {
    console.error("Error generating metadata:", error);
    return {
      title: "Danışman Detayı",
      description: "Danışman detay sayfası",
    };
  }
}

export default function OfficeWorkerPage({
  params,
}: {
  params: {
    officeId: string;
    officeSlug: string;
    roleSlug: string;
    workerId: string;
    workerSlug: string;
  };
}) {
  return <OfficeWorkerPageClient params={params} />;
}

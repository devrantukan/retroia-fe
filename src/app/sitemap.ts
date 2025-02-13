import { MetadataRoute } from "next";

async function fetchAllProperties() {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/property/all`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        cache: "no-store",
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching properties:", error);
    return { data: [] };
  }
}

async function fetchAllOffices() {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/office/all`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        cache: "no-store",
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching offices:", error);
    return { data: [] };
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL || "https://emlak.retroia.com";

  // Static routes
  const routes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
    },
  ];

  try {
    const [propertiesData, officesData] = await Promise.all([
      fetchAllProperties(),
      fetchAllOffices(),
    ]);

    // Property routes
    if (Array.isArray(propertiesData?.data)) {
      propertiesData.data.forEach((property: any) => {
        routes.push({
          url: `${baseUrl}/property/${property.id}`,
          lastModified: new Date(property.updatedAt || new Date()),
        });
      });
    }

    // Office routes
    if (Array.isArray(officesData?.data)) {
      officesData.data.forEach((office: any) => {
        routes.push({
          url: `${baseUrl}/office/${office.id}`,
          lastModified: new Date(office.updatedAt || new Date()),
        });
      });
    }
  } catch (error) {
    console.error("Error generating sitemap:", error);
  }

  return routes;
}

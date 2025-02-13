import { MetadataRoute } from "next";
import prisma from "@/lib/prisma";

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
    // Fetch properties directly from Prisma
    const properties = await prisma.property.findMany({
      select: {
        id: true,
        updatedAt: true,
        createdAt: true,
      },
      where: {
        publishingStatus: "PUBLISHED",
      },
    });

    // Fetch offices directly from Prisma
    const offices = await prisma.office.findMany({
      select: {
        id: true,
        updatedAt: true,
        createdAt: true,
      },
    });

    // Add property routes
    properties.forEach((property) => {
      routes.push({
        url: `${baseUrl}/property/${property.id}`,
        lastModified: property.updatedAt || new Date(),
      });
    });

    // Add office routes
    offices.forEach((office) => {
      routes.push({
        url: `${baseUrl}/office/${office.id}`,
        lastModified: office.updatedAt || new Date(),
      });
    });
  } catch (error) {
    console.error("Error generating sitemap:", error);
  }

  return routes;
}

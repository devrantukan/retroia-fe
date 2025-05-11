import { MetadataRoute } from "next";
import prisma from "@/lib/prisma";

export const revalidate = 3600; // Revalidate every hour

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL || "https://www.retroia.com/emlak";

  // Static routes
  const routes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/ofislerimiz/`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/danismanlarimiz/`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/gayrimenkul-danismani-basvuru-formu/`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/gayrimenkullerinizi-satalim-kiralayalim/`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/konut/kiralik/`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/konut/satilik/`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/ticari/kiralik/`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/ticari/satilik/`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/arsa-arazi/kiralik/`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/arsa-arazi/satilik/`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/biz-kimiz/`,
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
      orderBy: {
        createdAt: "desc",
      },
    });

    // Fetch offices directly from Prisma
    const offices = await prisma.office.findMany({
      select: {
        id: true,
        updatedAt: true,
        createdAt: true,
        slug: true,
      },
    });

    // Add property routes
    properties.forEach((property) => {
      routes.push({
        url: `${baseUrl}/portfoy/${property.id}/`,
        lastModified: property.updatedAt || new Date(),
      });
    });

    // Add office routes
    offices.forEach((office) => {
      routes.push({
        url: `${baseUrl}/ofislerimiz/${office.id}/${office.slug}/`,
        lastModified: office.updatedAt || new Date(),
      });
    });
  } catch (error) {
    console.error("Error generating sitemap:", error);
  }

  return routes;
}

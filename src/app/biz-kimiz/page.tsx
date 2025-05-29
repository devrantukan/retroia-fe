import Image from "next/image";
import { MapPin } from "lucide-react";
import { Metadata } from "next";
import prisma from "@/lib/prisma";

function extractImageUrl(html: string): string {
  const match = html.match(/src="([^"]+)"/);
  return match ? match[1] : "";
}

export const metadata: Metadata = {
  title: "Biz Kimiz? | Retroia",
  description: "Retroia Hakkında",
};

async function getBizKimizContent() {
  try {
    const [header, body, bannerImage, bannerText, bannerHeader, offices] =
      await Promise.all([
        prisma.contents.findUnique({
          where: {
            key: "biz-kimiz-header",
          },
        }),
        prisma.contents.findUnique({
          where: {
            key: "biz-kimiz-body",
          },
        }),
        prisma.contents.findUnique({
          where: {
            key: "biz-kimiz-banner-image",
          },
        }),
        prisma.contents.findUnique({
          where: {
            key: "biz-kimiz-banner-text",
          },
        }),
        prisma.contents.findUnique({
          where: {
            key: "biz-kimiz-banner-header",
          },
        }),
        prisma.office.findMany({
          include: {
            images: true,
          },
          orderBy: {
            createdAt: "desc",
          },
        }),
      ]);

    if (!body) {
      console.error("Biz Kimiz content not found in database");
      return null;
    }

    return {
      header: header?.value || "Biz Kimiz?",
      body: body.value,
      bannerImage:
        (bannerImage?.value ? extractImageUrl(bannerImage.value) : "") ||
        "https://cdn.pixabay.com/photo/2024/11/08/09/45/facade-9182972_1280.jpg?width=1920&quality=75",
      bannerText:
        bannerText?.value ||
        "Hayalinizdeki gayrimenkulü bulmanıza yardımcı olurken, en karlı yatırımı da yapmanızı sağlamak için doğru mülk nerede ise biz oradayız.",
      bannerHeader: bannerHeader?.value || "Doğru Gayrimenkulün Olduğu Yerde",
      offices: offices || [],
    };
  } catch (error) {
    console.error("Error fetching Biz Kimiz content:", error);
    return null;
  }
}

export default async function BizKimizPage() {
  const content = await getBizKimizContent();

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative h-[50vh] min-h-[400px] flex items-center justify-center">
          <div className="absolute inset-0 w-full h-full">
            <Image
              src={
                content?.bannerImage ||
                "https://inegzzkuttzsznxfbsmp.supabase.co/storage/v1/object/public/siteImages/retroia.jpg"
              }
              alt="Retroia Gayrimenkul"
              fill
              sizes="100vw"
              priority
              className="object-cover"
              quality={100}
            />
          </div>
          <div className="absolute inset-0 bg-black bg-opacity-50" />
          <div className="relative z-10 text-center text-white">
            <div
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4"
              dangerouslySetInnerHTML={{
                __html:
                  content?.bannerHeader || "Doğru Gayrimenkulün Olduğu Yerde",
              }}
            />
            <div
              className="text-xl md:text-2xl max-w-2xl mx-auto"
              dangerouslySetInnerHTML={{
                __html:
                  content?.bannerText ||
                  "Hayalinizdeki gayrimenkulü bulmanıza yardımcı olurken, en karlı yatırımı da yapmanızı sağlamak için doğru mülk nerede ise biz oradayız.",
              }}
            />
          </div>
        </section>

        {/* Our Story Section */}
        <section className="py-16 px-4 md:px-8 bg-white">
          <div className="max-w-4xl mx-auto">
            {content ? (
              <>
                <div
                  className="text-3xl md:text-4xl font-bold mb-6 text-center"
                  dangerouslySetInnerHTML={{ __html: content.header }}
                />
                <div
                  className="prose max-w-none 
                    [&>h1]:text-3xl [&>h1]:font-bold [&>h1]:mt-8 [&>h1]:mb-6
                    [&>h2]:text-2xl [&>h2]:font-semibold [&>h2]:mt-8 [&>h2]:mb-4 
                    [&>h3]:text-xl [&>h3]:font-semibold [&>h3]:mt-6 [&>h3]:mb-3
                    [&>p]:text-gray-600 [&>p]:mb-4 
                    [&>ul]:list-disc [&>ul]:ml-6 [&>ul]:mb-4 
                    [&>ul>li]:text-gray-600 [&>ul>li]:mb-2
                    [&_a]:text-[#2563eb] [&_a]:hover:text-[#1d4ed8] [&_a]:no-underline"
                  dangerouslySetInnerHTML={{ __html: content.body }}
                />
              </>
            ) : (
              <>
                <h2 className="text-3xl md:text-4xl font-bold mb-6 text-center">
                  Biz Kimiz?
                </h2>
                <div className="prose max-w-none">
                  <p>
                    İçerik yüklenirken bir hata oluştu. Lütfen daha sonra tekrar
                    deneyiniz.
                  </p>
                </div>
              </>
            )}
          </div>
        </section>

        {/* Our Offices Section */}
        <section className="py-16 px-4 md:px-8 bg-gray-100">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-10 text-center">
              Ofislerimiz
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {content?.offices.map((office) => (
                <div
                  key={office.id}
                  className="bg-white rounded-lg shadow-md overflow-hidden"
                >
                  <Image
                    src={
                      office.images[0]?.url ||
                      "https://inegzzkuttzsznxfbsmp.supabase.co/storage/v1/object/public/siteImages/retroia.jpg"
                    }
                    alt={`${office.name} ofisi`}
                    width={400}
                    height={300}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-2">
                      {office.name}
                    </h3>
                    <p className="text-gray-600 mb-4">{office.streetAddress}</p>
                    <a
                      href={`https://www.google.com/maps?q=${office.latitude},${office.longitude}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center text-blue-600 hover:text-blue-800 transition-colors"
                    >
                      <MapPin className="w-5 h-5 mr-2" />
                      <span>Haritada Göster</span>
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

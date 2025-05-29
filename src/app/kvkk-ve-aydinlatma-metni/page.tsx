import { Metadata } from "next";
import prisma from "@/lib/prisma";

export const metadata: Metadata = {
  title: "KVKK ve Aydınlatma Metni | Retroia",
  description: "Retroia KVKK ve Aydınlatma Metni",
};

async function getKVKKContent() {
  try {
    const [header, body] = await Promise.all([
      prisma.contents.findUnique({
        where: {
          key: "kvkk-header",
        },
      }),
      prisma.contents.findUnique({
        where: {
          key: "kvkk-body",
        },
      }),
    ]);

    if (!body) {
      console.error("KVKK body content not found in database");
      return null;
    }

    return {
      header: header?.value || "KVKK Aydınlatma Metni",
      body: body.value,
    };
  } catch (error) {
    console.error("Error fetching KVKK content:", error);
    return null;
  }
}

export default async function KVKKPage() {
  const kvkkContent = await getKVKKContent();

  if (!kvkkContent) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">KVKK Aydınlatma Metni</h1>
        <div className="prose max-w-none">
          <p>
            İçerik yüklenirken bir hata oluştu. Lütfen daha sonra tekrar
            deneyiniz.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1
        className="text-3xl font-bold mb-6"
        dangerouslySetInnerHTML={{ __html: kvkkContent.header }}
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
        dangerouslySetInnerHTML={{ __html: kvkkContent.body }}
      />
    </div>
  );
}

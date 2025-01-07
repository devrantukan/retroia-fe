import Image from "next/image";
import { MapPin } from "lucide-react";

export default function AboutUs() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative h-[50vh] min-h-[400px] flex items-center justify-center">
          <Image
            src="/placeholder.svg?height=800&width=1200"
            alt="Retroia Gayrimenkul"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-50" />
          <div className="relative z-10 text-center text-white">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
              Doğru Gayrimenkulün Olduğu Yerde
            </h1>
            <p className="text-xl md:text-2xl max-w-2xl mx-auto">
              Hayalinizdeki gayrimenkulü bulmanıza yardımcı olurken, en karlı
              yatırımı da yapmanızı sağlamak için doğru mülk nerede ise biz
              oradayız.
            </p>
          </div>
        </section>

        {/* Our Story Section */}
        <section className="py-16 px-4 md:px-8 bg-white">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-center">
              Biz Kimiz?
            </h2>
            <p className="text-lg mb-4">
              Müşterilerimizin hayallerindeki gayrimenkulü bulmalarına yardımcı
              olurken, en karlı yatırımlarını yapmalarını sağlamak için doğru
              mülk nerede ise biz oradayız.
            </p>
          </div>
        </section>

        {/* Our Offices Section */}
        <section className="py-16 px-4 md:px-8 bg-gray-100">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-10 text-center">
              Ofislerimiz
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {offices.map((office, index) => (
                <div
                  key={index}
                  className="bg-white rounded-lg shadow-md overflow-hidden"
                >
                  <Image
                    src={office.image}
                    alt={`${office.name} ofisi`}
                    width={400}
                    height={300}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-2">
                      {office.name}
                    </h3>
                    <p className="text-gray-600 mb-4">{office.address}</p>
                    <div className="flex items-center text-blue-600">
                      <MapPin className="w-5 h-5 mr-2" />
                      <span>Haritada Göster</span>
                    </div>
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

const offices = [
  {
    name: "Retroia Merkez",
    address:
      "Kemalpaşa Mah. Kayserili Ahmet Paşa Cad. No:14/1 Merkez, Çanakkale",
    image:
      "https://inegzzkuttzsznxfbsmp.supabase.co/storage/v1/object/public/siteImages/retroia-barbaros.jpg",
    phone: "0 286 213 99 98",
    email: "info@retroia.com",
  },
  {
    name: "Retroia Barbaros",
    address:
      "Cumhuriyet Mahallesi İnönü Caddesi Ali Birgül Sokak Castle Residence No:5 Kepez, Çanakkale",
    image:
      "https://inegzzkuttzsznxfbsmp.supabase.co/storage/v1/object/public/siteImages/retroia.jpg",
    phone: "0 286 213 99 98",
    email: "info@retroia.com",
  },
  {
    name: "Retroia Kepez",
    address: "Kepez, Çanakkale",
    image:
      "https://inegzzkuttzsznxfbsmp.supabase.co/storage/v1/object/public/siteImages/retroia-kepez.jpg",
    phone: "0 286 213 99 98",
    email: "info@retroia.com",
  },
];

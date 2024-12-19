import BreadCrumb from "@/app/components/BreadCrumb";
import { ImagesSlider } from "@/app/components/ImageSlider";
import PageTitle from "@/app/components/pageTitle";
import ShowOnMapButton from "@/app/components/ShowOnMapButton";
import prisma from "@/lib/prisma";
import { Card } from "@nextui-org/react";
import { Breadcrumbs, BreadcrumbItem } from "@nextui-org/react";

import { notFound } from "next/navigation";
const images = [1, 2, 3, 4, 5, 6].map((image) => `/images/${image}.jpg`);
interface Props {
  params: {
    id: string;
  };
}

const PropertyPage = async ({ params }: Props) => {
  const property = await prisma.property.findUnique({
    where: {
      id: +params.id,
    },
    include: {
      status: true,
      feature: true,
      location: true,
      agent: true,
      images: true,
      contract: true,
      type: true,
    },
  });
  console.log(property);
  if (!property) return notFound();
  return (
    <div className="w-full">
      <div className="p-6 pb-0">
        <BreadCrumb
          location={{
            country: property.location?.country || "",
            city: property.location?.city || "",
            district: property.location?.district || "",
            neighborhood: property.location?.neighborhood || "",
          }}
          contract={property.contract}
          propertyType={property.type}
        />
        <h2 className="text-2xl font-bold text-primary my-5">
          {property.name}
        </h2>
      </div>

      <div className="w-full flex lg:flex-row flex-col ">
        <div className="p-4 flex flex-col lg:w-2/3 w-full">
          <div className="flex flex-col">
            <div className="w-full">
              <ImagesSlider images={images} className="w-full h-[480px] p-6" />
            </div>
            <h2 className="text-2xl font-bold text-gray-700 mt-7 lining-nums">
              {property.price.toLocaleString("tr-TR", {
                minimumFractionDigits: 0,
                maximumFractionDigits: 0,
              })}
              <span className="text-lg">₺</span> / {property.status.value}
            </h2>
            <h3 className="text-lg font-bold mt-6">İlan Açıklaması</h3>
            <p className="text-sm text-slate-600 mt-7">
              {property.description}
            </p>
            <h3 className="text-lg font-bold mt-6">İlan Özellikleri</h3>
          </div>
        </div>
        <div className="flex lg:w-1/3 w-full mb-6 mt-4 mr-4 h-[600px]">
          <Card className="p-5 flex flex-col gap-1 w-full">
            <Title title="Özellikler" />
            <Attribute label="Oda Sayısı" value={property.feature?.bedrooms} />
            <Attribute
              label="Banyo Sayısı"
              value={property.feature?.bathrooms}
            />
            <Attribute
              label="Bulunduğu kat"
              value={property.feature?.parkingSpots}
            />
            <Attribute label="Alan" value={property.feature?.area + " m2"} />

            <Title title="Adres Bilgileri" className="mt-7" />
            <Attribute label="Şehir" value={property.location?.city} />
            <Attribute label="İlçe" value={property.location?.district} />
            <Attribute
              label="Mahalle"
              value={property.location?.neighborhood}
            />
            <div className="mt-6 w-full flex flex-col gap-1">
              <ShowOnMapButton
                lat={property.location?.latitude ?? 0}
                lng={property.location?.longitude ?? 0}
              />
            </div>
            {/* <Attribute label="Landmarks" value={property.location?.landmark} />
            <Attribute label="Zip Code" value={property.location?.zip} /> */}
            {/* <Attribute
              label="Address"
              value={property.location?.streetAddress}
            /> */}

            <Title title="Danışman Detayları" className="mt-6" />
            <Attribute
              label="Adı Soyadı"
              value={property.agent?.name + " " + property.agent?.surname}
            />
            <Attribute label="E-posta" value={property.agent?.email} />
            <Attribute label="Cep telefonu" value={property.agent?.phone} />
          </Card>
        </div>
      </div>
    </div>
  );
};
export default PropertyPage;

const Title = ({ title, className }: { title: string; className?: string }) => (
  <div className={className}>
    <h2 className="text-xl font-bold text-slate-700">{title} </h2>
    <hr className="border border-solid border-slate-300" />
  </div>
);

const Attribute = ({
  label,
  value,
}: {
  label: string;
  value?: string | number;
}) => (
  <div className="flex justify-between">
    <span className="text-sm text-slate-600">{label}</span>
    <span className="text-sm text-slate-600">{value}</span>
  </div>
);

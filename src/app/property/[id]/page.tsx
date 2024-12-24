"use client";
import BreadCrumb from "@/app/components/BreadCrumb";
import DescriptorsAccordion from "@/app/components/DescriptorsAccordion";
import { ImagesSlider } from "@/app/components/ImageSlider";
import PageTitle from "@/app/components/pageTitle";
import ShowOnMapButton from "@/app/components/ShowOnMapButton";
import prisma from "@/lib/prisma";
import { Card } from "@nextui-org/react";
import { Breadcrumbs, BreadcrumbItem } from "@nextui-org/react";
import { CheckCircle } from "@phosphor-icons/react/dist/ssr";

import { notFound } from "next/navigation";
import React from "react";
import ImageGallery from "react-image-gallery";

import "react-image-gallery/styles/css/image-gallery.css";

// const images = [1, 2, 3, 4, 5, 6].map((image) => `/images/${image}.jpg`);

const images = [
  {
    original: "https://picsum.photos/id/1018/1000/600/",
    thumbnail: "https://picsum.photos/id/1018/250/150/",
  },
  {
    original: "https://picsum.photos/id/1015/1000/600/",
    thumbnail: "https://picsum.photos/id/1015/250/150/",
  },
  {
    original: "https://picsum.photos/id/1019/1000/600/",
    thumbnail: "https://picsum.photos/id/1019/250/150/",
  },
];
interface Props {
  params: {
    id: string;
  };
}

const PropertyPage = ({ params }: Props) => {
  const [property, setProperty] = React.useState<any>(null);
  const [loading, setLoading] = React.useState(true);
  const [descriptorsGrouped, setDescriptorsGrouped] = React.useState<
    Record<string, any[]>
  >({});

  React.useEffect(() => {
    const fetchProperty = async () => {
      try {
        const response = await fetch(`/api/properties/${params.id}`);
        if (!response.ok) {
          throw new Error("Property not found");
        }
        const data = await response.json();
        setProperty(data);

        if (data && data.descriptors) {
          const descriptors = data.descriptors.map((descriptor: any) => ({
            category: descriptor.descriptor.category.value,
            descriptor: descriptor.descriptor.value,
          }));

          const grouped = descriptors.reduce(
            (acc: Record<string, any[]>, curr: any) => {
              if (!acc[curr.category]) {
                acc[curr.category] = [];
              }
              acc[curr.category].push(curr);
              return acc;
            },
            {}
          );

          setDescriptorsGrouped(grouped);
        }
      } catch (error) {
        console.error("Error fetching property:", error);
        notFound();
      } finally {
        setLoading(false);
      }
    };

    fetchProperty();
  }, [params.id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!property) {
    return notFound();
  }

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
              <ImageGallery items={images} />
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
      <div className="w-full px-4 mb-12">
        <h3 className="text-xl font-bold mt-4">İlan Özellikleri</h3>
        <DescriptorsAccordion descriptorsGrouped={descriptorsGrouped} />
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

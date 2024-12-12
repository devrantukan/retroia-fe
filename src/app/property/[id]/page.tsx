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
    <div className="lg:h-screen mb-6">
      <div className="p-4">
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

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 h-full">
          <div className="lg:col-span-2 col-span-1 lg:h-full h-[250px]">
            <ImagesSlider images={images} />
            <h2 className="text-2xl font-bold text-gray-700 mt-7 lining-nums">
              {property.price.toLocaleString("tr-TR", {
                minimumFractionDigits: 0,
                maximumFractionDigits: 0,
              })}
              <span className="text-lg">₺</span> / {property.status.value}
            </h2>

            <p className="text-sm text-slate-600 mt-7">
              {property.description}
              {property.contract.slug}
              {property.type.slug}
            </p>
          </div>

          <Card className="p-5 flex flex-col gap-1">
            <Title title="Features" />
            <Attribute label="Bedrooms" value={property.feature?.bedrooms} />
            <Attribute label="Bathrooms" value={property.feature?.bathrooms} />
            <Attribute
              label="Parking Spots"
              value={property.feature?.parkingSpots}
            />
            <Attribute label="Area" value={property.feature?.area} />

            <Title title="Address" className="mt-7" />
            <Attribute label="City" value={property.location?.city} />
            <Attribute label="District" value={property.location?.district} />
            <Attribute
              label="Neighborhood"
              value={property.location?.neighborhood}
            />
            {/* <Attribute label="Landmarks" value={property.location?.landmark} />
            <Attribute label="Zip Code" value={property.location?.zip} /> */}
            {/* <Attribute
              label="Address"
              value={property.location?.streetAddress}
            /> */}

            <Title title="Agent Details" className="mt-7" />
            <Attribute
              label="Name"
              value={property.agent?.name + " " + property.agent?.surname}
            />
            <Attribute label="Email" value={property.agent?.email} />
            <Attribute label="Phone" value={property.agent?.phone} />
            <ShowOnMapButton />
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

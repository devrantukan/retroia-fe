import { Card, Image } from "@nextui-org/react";
import { Prisma } from "@prisma/client";
import Link from "next/link";
import { Avatar } from "@nextui-org/react";

const PropertyCard = ({ property, showAvatar }: any) => {
  return (
    <Card className="w-full flex lg:flex-row mb-4" shadow="md">
      <Link
        className="hover:text-primary-500 transition-colors lg:w-4/5 w-full"
        href={`/property/${property.id}`}
      >
        <div className="flex lg:flex-row flex-col">
          <Image
            radius="none"
            src={
              property.id === 1
                ? property.images[0].url
                : `/images/${Math.floor(Math.random() * 9 + 1)}.jpg`
            }
            className="object-cover w-full lg:w-auto h-auto lg:max-w-[240px]"
            alt={property.name}
          />
          <div className="flex flex-col mt-2">
            <div className="p-4 h-1/2">
              {/* <p className="text-slate-600">
                {property.location.country} / {property.location.city} /{" "}
                {property.location.district} / {property.location.neighborhood}
              </p> */}
              <p className="text-primary-600 text-xl font-bold w-[340px] ">
                {property.name}
              </p>
            </div>
            <div className="bg-gradient-to-br from-slate-50 to-slate-200 p-4 flex justify-start h-1/2">
              <p className="text-2xl lining-nums font-semibold tracking-wider">
                {property.price.toLocaleString("tr-TR", {
                  minimumFractionDigits: 0,
                  maximumFractionDigits: 0,
                })}
              </p>
              <span className="text-lg">₺</span>
            </div>
          </div>
        </div>
      </Link>
      <div className="lg:w-1/5 w-full flex lg:items-center items-start  flex-col my-auto  hover:bg-slate-100 hover:cursor-pointer rounded-xl mr-4">
        {/* <Avatar
          showFallback
          name={property.agent?.name + " " + property.agent?.surname}
          src="https://images.unsplash.com/broken"
        />
        <p>
          {property.agent?.name} {property.agent?.surname}
        </p>
        <p>{property.agent?.office.title}</p> */}
        {showAvatar == true && (
          <Link
            href={`/danisman/${property.agentId}/${property.agent.slug}`}
            className="flex  w-full lg:justify-center  items-center  flex-row lg:flex-col lg:my-6 gap-x-2 lg:gap-x-0"
          >
            <Avatar
              showFallback
              name={property.agent?.name + " " + property.agent?.surname}
              src={property.agent?.avatarUrl}
              className="h-16 w-16 lg:m-0 m-2  mb-2 lg:mx-auto"
            />
            <p className="font-bold">
              {property.agent.name} {property.agent.surname}
            </p>
            <p className="font-light">{property.agent.office.name}</p>
          </Link>
        )}
      </div>
    </Card>
  );
};

export default PropertyCard;

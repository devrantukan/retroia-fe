import { Card, Image } from "@nextui-org/react";
import { Prisma } from "@prisma/client";
import Link from "next/link";
import { Avatar } from "@nextui-org/react";

const PropertySearchCard = ({ property, showAvatar }: any) => {
  return (
    <Card className="w-full flex lg:flex-row mb-4 min-h-[150px]" shadow="md">
      <Link
        className={`hover:text-primary-500 transition-colors justify-between ${
          showAvatar == true ? "lg:w-4/5" : "lg:w-full"
        }`}
        href={`/property/${property.id}`}
      >
        <div className="flex lg:flex-row ">
          <Image
            radius="none"
            src={
              property.id === 1
                ? property.images[0].url
                : `/images/${Math.floor(Math.random() * 9 + 1)}.jpg`
            }
            className="object-cover w-full lg:w-auto h-auto lg:max-w-[240px] lg:min-h-[150px]"
            alt={property.title}
          />
          <div className="flex flex-col w-full">
            <div className="p-4 h-2/3">
              <p className="text-slate-600 mb-1 text-xs w-full">
                {property.country} / {property.city} / {property.district} /{" "}
                {property.neighborhood}
              </p>
              <p className="text-primary-600 text-[1rem] font-bold">
                {property.title}
              </p>
            </div>
            <div className="bg-gradient-to-br from-slate-50 to-slate-200 px-4 flex justify-start items-center h-1/3 w-full">
              <p className="text-2xl lining-nums  font-semibold tracking-wider">
                {" "}
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
      {showAvatar == true && (
        <div className="lg:w-1/5 w-full flex lg:items-center items-start  flex-col my-auto  hover:bg-slate-100 hover:cursor-pointer rounded-xl mr-4">
          <Link
            href={`/danisman/${property.agentId}/${property.agentSlug}`}
            className="flex  w-full lg:justify-center  items-center  flex-row lg:flex-col lg:my-6 gap-x-2 lg:gap-x-0 "
          >
            <Avatar
              showFallback
              name={property.agentName + " " + property.agentSurname}
              src={property.agentAvatarUrl}
              className="h-16 w-16 lg:m-0 m-2  mb-2 lg:mx-auto"
            />
            <p className="font-bold ">
              {property.agentName} {property.agentSurname}
            </p>
            <p className="font-light">{property.agentOffice.name}</p>
          </Link>
        </div>
      )}
    </Card>
  );
};

export default PropertySearchCard;

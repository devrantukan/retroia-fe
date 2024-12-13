import { Card, Image } from "@nextui-org/react";
import { Prisma } from "@prisma/client";
import Link from "next/link";
import { Avatar } from "@nextui-org/react";

const PropertySearchCard = ({ property }: any) => {
  return (
    <Card className="w-full flex flex-row  hover:scale-101 my-2" shadow="md">
      <Link
        className="hover:text-primary-500 transition-colors w-4/5"
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
      <div className="w-1/5 flex items-center flex-col my-auto  hover:bg-slate-100 hover:cursor-pointer lg:rounded-xl">
        <Link
          href={`/danisman/${property.agentId}/${property.agentSlug}`}
          className="flex justify-center items-center flex-col "
        >
          <Avatar
            showFallback
            name={property.agentName + " " + property.agentSurname}
            src={property.agentAvatarUrl}
            className="h-16 w-16 mb-2 mt-2"
          />
          <p className="font-bold text-center">
            {property.agentName} {property.agentSurname}
          </p>
          <p>{property.agentOffice.name}</p>
        </Link>
      </div>
    </Card>
  );
};

export default PropertySearchCard;

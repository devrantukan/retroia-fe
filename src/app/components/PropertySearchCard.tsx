import { Card } from "@nextui-org/react";
import Image from "next/image";
import { Prisma } from "@prisma/client";
import Link from "next/link";
import { Avatar } from "@nextui-org/react";
import { useEffect, useState, useRef } from "react";

const PropertySearchCard = ({ property, showAvatar }: any) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [cardWidth, setCardWidth] = useState(0);

  useEffect(() => {
    const updateWidth = () => {
      if (cardRef.current) {
        const width = cardRef.current.getBoundingClientRect().width;
        console.log("Current width:", width);
        setCardWidth(width);
      }
    };

    // Initial measurement
    updateWidth();

    // Setup resize observer
    const observer = new ResizeObserver(updateWidth);
    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    // Cleanup
    return () => observer.disconnect();
  }, []);

  const imageClassName =
    cardWidth < 700
      ? "object-cover w-full lg:w-auto h-auto lg:max-w-[220px] lg:min-w-[220px] lg:min-h-[150px] lg:max-h-[150px] bg-gray-200"
      : "object-cover w-full lg:w-auto h-auto lg:max-w-[240px] lg:min-w-[240px] lg:min-h-[160px] lg:max-h-[160px] bg-gray-200";
  cardWidth < 400
    ? "object-cover w-full lg:w-auto h-auto lg:max-w-[200px] lg:min-w-[200px] lg:min-h-[130px] lg:max-h-[150px] bg-gray-200"
    : "object-cover w-full lg:w-auto h-auto lg:max-w-[220px] lg:min-w-[220px] lg:min-h-[150px] lg:max-h-[160px] bg-gray-200";

  return (
    <Card
      ref={cardRef}
      className="w-full flex lg:flex-row mb-4 min-h-[150px] lg:max-h-[150px]"
      shadow="md"
    >
      <Link
        className={`hover:text-primary-500 transition-colors justify-between ${
          showAvatar == true ? "lg:w-4/5" : "lg:w-full"
        }`}
        href={`/property/${property.id}`}
      >
        <div className="flex lg:flex-row flex-col w-full m-0">
          <Image
            src={
              property.images?.[0]?.url ||
              "https://inegzzkuttzsznxfbsmp.supabase.co/storage/v1/object/public/siteImages/no-image.jpg"
            }
            className={imageClassName}
            alt={property.images?.[0]?.name || "No Image"}
            width={240}
            height={160}
          />
          <div className="flex flex-col w-full">
            <div className="p-4 h-2/3">
              <p className="text-slate-600 mb-1 text-xs w-full">
                {property.country} / {property.city} / {property.district} /{" "}
                {property.neighborhood}
              </p>
              <p className="text-primary-600 text-[0.9rem] font-bold">
                {property.title}
              </p>
            </div>
            <div className="bg-gradient-to-br from-slate-50 to-slate-200 px-4 flex justify-start items-center h-1/3 w-full">
              <p className="text-2xl lining-nums  font-semibold tracking-wider">
                {property.discountedPrice > 0 ? (
                  <>
                    <div className="flex items-center gap-2">
                      <span className="text-2xl font-bold text-primary">
                        {property.discountedPrice.toLocaleString("tr-TR", {
                          style: "currency",
                          currency: "TRY",
                          maximumFractionDigits: 0,
                        })}
                      </span>
                      <span className="text-lg line-through text-gray-400">
                        {property.price.toLocaleString("tr-TR", {
                          style: "currency",
                          currency: "TRY",
                          maximumFractionDigits: 0,
                        })}
                      </span>
                      <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                        İNDİRİMLİ
                      </span>
                    </div>
                  </>
                ) : (
                  <span className="text-2xl font-bold text-primary">
                    {property.price.toLocaleString("tr-TR", {
                      style: "currency",
                      currency: "TRY",
                      maximumFractionDigits: 0,
                    })}
                  </span>
                )}
              </p>
            </div>
          </div>
        </div>
      </Link>
      {showAvatar == true && (
        <div className="lg:w-1/5 w-full flex lg:items-center items-start  flex-col  hover:bg-slate-100 hover:cursor-pointer rounded-r-xl ">
          <Link
            href={`/ofis/${property.agentOffice.id}/${property.agentOffice.slug}/${property.agentRoleSlug}/${property.agentId}/${property.agentSlug}`}
            className="flex  w-full lg:justify-center  items-center  flex-row lg:flex-col lg:my-6 gap-x-2 lg:gap-x-0 "
          >
            <Avatar
              showFallback
              name={property.agentName + " " + property.agentSurname}
              src={property.agentAvatarUrl}
              className="h-16 w-16 lg:m-0 m-2  mb-2 lg:mx-auto border border-slate-300"
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

"use client";
import { Card } from "@nextui-org/react";
import { Prisma } from "@prisma/client";
import Link from "next/link";
import { Avatar } from "@nextui-org/react";
import Image from "next/image";
import { useRef, useState, useEffect } from "react";

interface PropertyCardProps {
  property: {
    id: number;
    title: string;
    price: number;
    bedrooms: number;
    bathrooms: number;
    size: number;
    images: {
      url: string;
    }[];
    slug: string;
    discountedPrice: number;
    location: {
      country: string;
      city: string;
      district: string;
      neighborhood: string;
    };
    agent: {
      name: string;
      surname: string;
      avatarUrl: string;
      slug: string;
      office: {
        title: string;
        id: number;
        slug: string;
        name: string;
      };
      role: {
        title: string;
        slug: string;
      };
    };
    agentId: number;

    type: string;
    contract: string;
    country: string;
  };
  showAvatar?: boolean;
}

const PriceDisplay = ({ price }: { price: number }) => {
  const [currency, setCurrency] = useState("TRY");
  const [rate, setRate] = useState(1);

  useEffect(() => {
    const detectCurrency = async () => {
      try {
        // Get location from IP
        const geoRes = await fetch("https://ipapi.co/json/");
        const geoData = await geoRes.json();

        // Get exchange rates
        const ratesRes = await fetch(
          "https://api.exchangerate-api.com/v4/latest/TRY"
        );
        const ratesData = await ratesRes.json();

        // Determine currency based on location
        let selectedCurrency = "USD";
        let selectedRate = ratesData.rates.USD;

        if (geoData.continent_code === "EU") {
          selectedCurrency = "EUR";
          selectedRate = ratesData.rates.EUR;
        } else if (geoData.country_code === "TR") {
          selectedCurrency = "TRY";
          selectedRate = 1;
        } else if (geoData.country_code === "GB") {
          selectedCurrency = "GBP";
          selectedRate = ratesData.rates.GBP;
        }

        setCurrency(selectedCurrency);
        setRate(selectedRate);
      } catch (error) {
        console.error("Error fetching location or rates:", error);
        // Fallback to TRY
        setCurrency("TRY");
        setRate(1);
      }
    };

    detectCurrency();
  }, []);

  const formatPrice = (price: number, currency: string, rate: number) => {
    const convertedPrice = parseFloat((price * rate).toFixed(2));
    const formatter = new Intl.NumberFormat("tr-TR", {
      style: "currency",
      currency: currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    });
    return formatter.format(convertedPrice);
  };

  return formatPrice(price, currency, rate);
};

const PropertyCard = ({ property, showAvatar }: PropertyCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [cardWidth, setCardWidth] = useState(0);

  useEffect(() => {
    const updateWidth = () => {
      if (cardRef.current) {
        const width = cardRef.current.getBoundingClientRect().width;
        console.log("Property Card width:", width);
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
    cardWidth < 500
      ? "object-cover w-full lg:w-auto h-auto lg:max-w-[190px] lg:min-w-[190px] lg:min-h-[130px] lg:max-h-[130px] bg-gray-200"
      : cardWidth < 700 && cardWidth > 500
      ? "object-cover w-full lg:w-auto h-auto lg:max-w-[220px] lg:min-w-[220px] lg:min-h-[150px] lg:max-h-[150px] bg-gray-200"
      : "object-cover w-full lg:w-auto h-auto lg:max-w-[240px] lg:min-w-[240px] lg:min-h-[160px] lg:max-h-[160px] bg-gray-200";

  const titleClassName =
    cardWidth < 500
      ? "text-xs"
      : cardWidth < 700 && cardWidth > 500
      ? "text-sm"
      : "text-base";

  const breadcrumbClassName =
    cardWidth < 500
      ? "text-[0.6rem]"
      : cardWidth < 700 && cardWidth > 500
      ? "text-xs"
      : "text-xs";

  const cardClassName =
    cardWidth < 500
      ? "w-full flex lg:flex-row mb-4 min-h-[130px] lg:max-h-[130px]"
      : cardWidth < 700 && cardWidth > 500
      ? "w-full flex lg:flex-row mb-4 min-h-[150px] lg:max-h-[150px]"
      : "w-full flex lg:flex-row mb-4 min-h-[150px] lg:max-h-[150px]";

  return (
    <Card ref={cardRef} className={cardClassName} shadow="md">
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
            alt={property.title}
            width={400}
            height={240}
          />
          <div className="flex flex-col w-full">
            <div className="p-4 h-2/3 ">
              <p
                className={`text-slate-600 mb-1 ${breadcrumbClassName} w-full `}
              >
                {property.location.country} / {property.location.city} /{" "}
                {property.location.district} / {property.location.neighborhood}
              </p>
              <p className={`text-primary-600 ${titleClassName} font-bold `}>
                {property.title}
              </p>
            </div>
            <div className="bg-gradient-to-br from-slate-50 to-slate-200 px-4 flex justify-start items-center h-1/3 w-full ">
              <p className="text-2xl lining-nums font-semibold tracking-wider">
                {property.discountedPrice > 0 ? (
                  <>
                    <div className="flex items-center gap-2">
                      <span className="text-2xl font-bold text-primary">
                        <PriceDisplay price={property.discountedPrice} />
                      </span>
                      <span className="text-lg line-through text-gray-400">
                        <PriceDisplay price={property.price} />
                      </span>
                      <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                        İNDİRİMLİ
                      </span>
                    </div>
                  </>
                ) : (
                  <span className="text-2xl font-bold text-primary">
                    <PriceDisplay price={property.price} />
                  </span>
                )}
              </p>
            </div>
          </div>
        </div>
      </Link>

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
        <div className="lg:w-1/5 w-full flex lg:items-center items-start  flex-col my-auto  hover:cursor-pointer rounded-l-none rounded-xl hover:bg-gradient-to-br hover:from-slate-50 hover:to-slate-200">
          <Link
            href={`/ofis/${property.agent.office.id}/${property.agent.office.slug}/${property.agent.role.slug}/${property.agentId}/${property.agent.slug}`}
            className="flex  w-full lg:justify-center  items-center  flex-row lg:flex-col lg:my-6 gap-x-2 lg:gap-x-0"
          >
            <Avatar
              showFallback
              name={property.agent?.name + " " + property.agent?.surname}
              src={property.agent?.avatarUrl}
              className="h-16 w-16 lg:m-0 m-2  mb-2 lg:mx-auto"
            />
            <p className="font-bold">
              {property.agent.name} {property.agent.surname}{" "}
            </p>
            <p className="font-light">{property.agent.office.name}</p>
          </Link>
        </div>
      )}
    </Card>
  );
};

export default PropertyCard;

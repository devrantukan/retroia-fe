"use client";

import React, { useState, useEffect } from "react";
import LoadingSpinner from "../../components/LoadingSpinner";
import NotFound from "../../components/NotFound";
import BreadCrumb from "@/app/components/BreadCrumb";
import DescriptorsAccordion from "@/app/components/DescriptorsAccordion";
import { ImagesSlider } from "@/app/components/ImageSlider";
import ShowOnMapButton from "@/app/components/ShowOnMapButton";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  Button,
  useDisclosure,
  Card,
  User,
} from "@nextui-org/react";
import { X, EnvelopeSimple, Phone } from "@phosphor-icons/react";
import Image from "next/image";
import Link from "next/link";
import Share from "@/app/components/Share";
import { getLocationInfo } from "@/app/utils/getLocationInfo";

interface PropertyPageClientProps {
  params: {
    id: string;
    agentId?: string;
    agentSlug?: string;
  };
}

const PropertyPageClient = ({ params }: PropertyPageClientProps) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [property, setProperty] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [descriptorsGrouped, setDescriptorsGrouped] = React.useState<
    Record<string, any[]>
  >({});
  const [scrollBehavior, setScrollBehavior] = React.useState<
    "inside" | "outside" | "normal"
  >("outside");
  const [agent, setAgent] = useState<any>(null);

  const defaultImage = {
    original: "https://picsum.photos/id/1018/1000/600",
    thumbnail: "https://picsum.photos/id/1018/250/150",
  };

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const API_URL =
          process.env.NODE_ENV === "production"
            ? `/emlak/api/properties/${params.id}/`
            : `/api/properties/${params.id}`;

        const response = await fetch(API_URL);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
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
      } finally {
        setLoading(false);
      }
    };

    fetchProperty();
  }, [params.id]);

  useEffect(() => {
    const fetchAgent = async () => {
      if (params.agentId) {
        try {
          const API_URL = new URL(
            process.env.NODE_ENV === "production"
              ? `/emlak/api/officeWorker/${params.agentId}/`
              : `/api/officeWorker/${params.agentId}`,
            window.location.origin
          ).toString();

          const agentResponse = await fetch(API_URL, {
            method: "GET",
            headers: {
              Accept: "application/json",
              "Cache-Control": "no-cache",
            },
            credentials: "same-origin",
            redirect: "follow",
          });

          if (!agentResponse.ok) {
            throw new Error(
              `Failed to fetch agent data: ${agentResponse.status}`
            );
          }

          const agentData = await agentResponse.json();
          if (!agentData) {
            console.error("No agent data received");
            return;
          }

          const transformedAgentData = {
            id: agentData.id,
            name: agentData.name || "",
            surname: agentData.surname || "",
            email: agentData.email || "",
            phone: agentData.phone || "",
            avatarUrl: agentData.avatarUrl || "",
            officeId: agentData.officeId,
            office: {
              id: agentData.office?.id || 0,
              name: agentData.office?.name || "",
              slug: (agentData.office?.name || "")
                .toLowerCase()
                .replace(/\s+/g, "-"),
            },
            role: {
              id: agentData.role?.id || 0,
              name: agentData.role?.name || "",
              slug: agentData.role?.slug || "",
            },
            slug: agentData.slug || params.agentSlug || "",
          };
          setAgent(transformedAgentData);
        } catch (agentError) {
          console.error("Error fetching agent data:", agentError);
          // Set agent to null to indicate failed fetch
          setAgent(null);
        }
      }
    };

    fetchAgent();
  }, [params.agentId, params.agentSlug]);

  const getGalleryImages = (propertyImages: any[]) => {
    let galleryItems = [];

    if (property?.videoSource && property.videoSource.startsWith("http")) {
      if (
        property.videoSource.includes("youtube.com") ||
        property.videoSource.includes("youtu.be")
      ) {
        const videoId = property.videoSource.includes("youtube.com")
          ? property.videoSource.split("v=")[1]
          : property.videoSource.split("youtu.be/")[1];

        const embedUrl = `https://www.youtube.com/embed/${videoId}`;

        galleryItems.push({
          original: property.videoSource,
          thumbnail: `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`,
          renderItem: () => (
            <div className="w-full h-full" style={{ aspectRatio: "16/9" }}>
              <iframe
                width="100%"
                height="100%"
                src={embedUrl}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="image-gallery-image"
              />
            </div>
          ),
        });
      } else {
        galleryItems.push({
          original: property.videoSource,
          thumbnail: property.videoSource,
          renderItem: () => (
            <video
              controls
              className="image-gallery-image"
              style={{ width: "100%", height: "100%", objectFit: "contain" }}
            >
              <source src={property.videoSource} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          ),
        });
      }
    }

    if (propertyImages && propertyImages.length > 0) {
      const imageItems = propertyImages.map((image) => {
        // Transform the URL to use the correct bucket names
        const originalUrl = image.url.includes("/propertyImages/")
          ? image.url.replace("/propertyImages/", "/property-images/")
          : image.url;

        const thumbnailUrl = image.url.includes("/propertyImages/")
          ? image.url.replace(
              "/propertyImages/",
              "/thumbnails-property-images/"
            )
          : image.url.includes("/property-images/")
          ? image.url.replace(
              "/property-images/",
              "/thumbnails-property-images/"
            )
          : image.url;

        return {
          original: image.url, // Use original URL for main image
          thumbnail: image.url, // Use original URL for thumbnail
          fallback: image.url,
          renderItem: (item: any) => (
            <div className="relative w-full h-full">
              <Image
                src={image.url}
                alt={`${property.name} - ${property.location.city} ${property.location.district} ${property.location.neighborhood} - ${property.type.name} ${property.subType.name}`}
                fill
                className="object-cover"
                onError={(e) => {
                  const img = e.target as HTMLImageElement;
                  img.src = image.url;
                }}
              />
            </div>
          ),
          renderThumbInner: (item: any) => (
            <div className="relative w-full h-full">
              <Image
                src={image.url}
                alt={`${property.name} - ${property.location.city} ${property.location.district} ${property.location.neighborhood} - ${property.type.name} ${property.subType.name} - Thumbnail`}
                fill
                className="object-cover"
                onError={(e) => {
                  const img = e.target as HTMLImageElement;
                  img.src = image.url;
                }}
              />
            </div>
          ),
        };
      });
      galleryItems = [...galleryItems, ...imageItems];
    }

    return galleryItems.length > 0 ? galleryItems : [defaultImage];
  };

  const renderAgentSection = () => {
    // If URL has agent parameters, show that agent
    if (params.agentId && params.agentSlug && agent) {
      return (
        <>
          <Title title="Danışman Detayları" className="mt-6" />
          <AgentInfo agent={agent} params={params} />
        </>
      );
    }

    // If no URL parameters, show the property's agent
    if (property?.agent) {
      return (
        <>
          <Title title="Danışman Detayları" className="mt-6" />
          <AgentInfo agent={property.agent} params={params} />
        </>
      );
    }

    return null;
  };

  if (loading) return <LoadingSpinner />;
  if (!property) return <NotFound />;

  return (
    <div className="w-full">
      <div className="p-4 lg:p-6 pb-0">
        <BreadCrumb
          location={{
            country: property.location?.country || "",
            city: property.location?.city || "",
            district: property.location?.district || "",
            neighborhood: property.location?.neighborhood || "",
            subType: property.subType.value || "",
          }}
          contract={property.contract}
          propertyType={property.type}
        />
        <div className="space-y-4 mt-4">
          <div className="flex flex-col lg:flex-row items-start gap-4 lg:gap-6 justify-between">
            {/* Left side - Title and Details */}
            <div className="w-full lg:w-3/4">
              <h2 className="text-xl lg:text-2xl font-bold text-primary mb-3">
                {property.name}
              </h2>
              {/* Mobile View */}
              <div className="flex justify-between items-center text-sm text-gray-500 w-full lg:hidden">
                <div className="flex items-center gap-2">
                  <span className="text-primary">İlan No:</span>
                  <span>{property.id}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-primary">Son Güncelleme:</span>
                  <span>
                    {new Date(property.updatedAt).toLocaleDateString("tr-TR", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </span>
                </div>
              </div>
              {/* Desktop View */}
              <div className="hidden lg:flex lg:flex-wrap gap-x-6 gap-y-2 text-sm text-gray-500">
                <div className="flex items-center gap-2">
                  <span className="text-primary">İlan No:</span>
                  <span>{property.id}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-primary">Son Güncelleme:</span>
                  <span>
                    {new Date(property.updatedAt).toLocaleDateString("tr-TR", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </span>
                </div>
              </div>
            </div>

            {/* Right side - Price */}
            <div className="w-full lg:w-1/4 mt-4 lg:mt-0">
              <div className="flex flex-col items-start lg:items-end">
                <div className="flex flex-row lg:flex-col items-center lg:items-end justify-between w-full gap-y-2">
                  <div>
                    {property.discountedPrice > 0 ? (
                      <>
                        <div className="flex items-center gap-3 flex-wrap lg:justify-end">
                          <span className="text-xl lg:text-2xl font-bold text-primary order-1">
                            <PriceDisplay price={property.discountedPrice} />
                          </span>
                          <span className="bg-red-500 text-white text-xs px-3 py-1.5 rounded-full order-2">
                            İNDİRİMLİ
                          </span>
                        </div>
                        <span className="text-base lg:text-lg line-through text-gray-400 mt-2">
                          <PriceDisplay price={property.price} />
                        </span>
                      </>
                    ) : (
                      <span className="text-xl lg:text-2xl font-bold text-primary">
                        <PriceDisplay price={property.price} />
                      </span>
                    )}
                  </div>
                  <Share
                    title={property.name}
                    type={"İlan"}
                    avatarUrl={property.images[0].url || ""}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full flex lg:flex-row flex-col">
        <div className="p-4 flex flex-col lg:w-2/3 w-full">
          <div className="flex flex-col">
            <div className="w-full">
              <ImageGallery
                items={getGalleryImages(property.images)}
                additionalClass="aspect-ratio-gallery"
                lazyLoad={true}
              />
              <style jsx global>{`
                .image-gallery-image {
                  aspect-ratio: 16/9 !important;
                  object-fit: cover;
                  border-radius: 0.75rem !important;
                }
                .image-gallery-thumbnail-image {
                  aspect-ratio: 16/9 !important;
                  object-fit: cover;
                }
                .image-gallery-slide {
                  aspect-ratio: 16/9 !important;
                }
                .image-gallery-content
                  .image-gallery-slide
                  .image-gallery-image {
                  border-radius: 0.75rem !important;
                }
                iframe.image-gallery-image {
                  border-radius: 0.75rem !important;
                }
                video.image-gallery-image {
                  border-radius: 0.75rem !important;
                }
                .image-gallery-thumbnails {
                  padding: 10px 0 !important;
                }
                .image-gallery-thumbnails-container {
                  text-align: center !important;
                }
                .image-gallery-thumbnail {
                  width: 100px !important;
                  height: 75px !important;
                  margin: 0 5px !important;
                  border: 2px solid transparent !important;
                  border-radius: 0.5rem !important;
                  overflow: hidden !important;
                }
                .image-gallery-thumbnail.active {
                  border-color: #0066cc !important;
                }
                .image-gallery-thumbnail:hover {
                  border-color: #0066cc !important;
                }
                .image-gallery-thumbnail .image-gallery-thumbnail-inner {
                  width: 100% !important;
                  height: 100% !important;
                  position: relative !important;
                }
                .image-gallery-thumbnail .image-gallery-thumbnail-image {
                  width: 100% !important;
                  height: 100% !important;
                  object-fit: cover !important;
                  position: absolute !important;
                  top: 0 !important;
                  left: 0 !important;
                }
              `}</style>
            </div>

            <h3 className="text-xl font-bold mt-6">İlan Açıklaması</h3>
            <p
              className="text-sm text-slate-600 mt-7"
              dangerouslySetInnerHTML={{ __html: property.description }}
            />
          </div>
        </div>
        <div className="flex lg:w-1/3 w-full mb-6 mt-4 mr-4 h-[560px]">
          <Card className="p-5 flex flex-col gap-1 w-full">
            <Title title="Özellikler" />
            {property.typeId == 1 && (
              <>
                <Attribute
                  label="Oda Sayısı"
                  value={property.feature?.bedrooms}
                />
                <Attribute
                  label="Banyo Sayısı"
                  value={property.feature?.bathrooms}
                />
                <Attribute
                  label="Bulunduğu kat"
                  value={property.feature?.floor}
                />
                <Attribute
                  label="Binadaki kat sayısı"
                  value={property.feature?.totalFloor}
                />
              </>
            )}
            <Attribute label="Alan" value={property.feature?.area + " m2"} />

            <Title title="Adres Bilgileri" className="mt-7" />
            <Attribute label="Şehir" value={property.location?.city} />
            <Attribute label="İlçe" value={property.location?.district} />
            <Attribute
              label="Mahalle"
              value={property.location?.neighborhood}
            />
            <div className="mt-6 w-full flex flex-row gap-1 justify-between items-center">
              <div className="lg:w-1/2">
                {property.location?.latitude !== 0 &&
                  property.location?.longitude !== 0 && (
                    <ShowOnMapButton
                      lat={property.location.latitude}
                      lng={property.location.longitude}
                    />
                  )}
              </div>
              {property.threeDSource &&
                property.threeDSource.startsWith("http") && (
                  <div className="lg:w-1/2">
                    <Button
                      onPress={onOpen}
                      className="w-full bg-blue-950 text-white py-2 rounded-xl hover:bg-blue-900 hover:scale-[1.01] transition-all duration-300 flex items-center justify-center gap-2 group"
                    >
                      <span>3D Sanal Tur</span>
                    </Button>
                  </div>
                )}
            </div>

            {renderAgentSection()}
          </Card>
        </div>
      </div>
      {descriptorsGrouped && Object.keys(descriptorsGrouped).length > 0 && (
        <div className="w-full px-4 mb-12">
          <h3 className="text-xl font-bold mt-4">İlan Özellikleri</h3>
          <DescriptorsAccordion descriptorsGrouped={descriptorsGrouped} />
        </div>
      )}
      <Modal
        isOpen={isOpen}
        onClose={onOpenChange}
        size="5xl"
        scrollBehavior="inside"
        hideCloseButton={true}
        placement="top-center"
        isDismissable={false}
        isKeyboardDismissDisabled={true}
        motionProps={{
          variants: {
            enter: {
              y: 0,
              opacity: 1,
              transition: {
                duration: 0.3,
                ease: "easeOut",
              },
            },
            exit: {
              y: -20,
              opacity: 0,
              transition: {
                duration: 0.2,
                ease: "easeIn",
              },
            },
          },
        }}
        classNames={{
          base: "mt-0 !rounded-b-xl",
          wrapper: "mt-0",
          body: "!rounded-b-xl overflow-hidden",
        }}
      >
        <ModalContent className="lg:h-[90vh] h-auto mt-0">
          {(onClose) => (
            <>
              <ModalHeader className="flex justify-between items-center">
                3D Sanal Tur
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <X size={24} />
                </button>
              </ModalHeader>
              <ModalBody className="p-0 rounded-b-xl overflow-hidden">
                <div className="w-full aspect-[16/9]">
                  <iframe
                    src={property.threeDSource}
                    className="w-full h-full"
                    allowFullScreen
                    loading="lazy"
                  />
                </div>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
};

const Title = ({ title, className }: { title: string; className?: string }) => (
  <div className={className}>
    <h2 className="text-xl font-bold text-slate-700">{title}</h2>
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

const AgentInfo = ({
  agent,
  params,
}: {
  agent: any;
  params: { agentSlug?: string };
}) => (
  <div className="flex items-start space-x-3 p-2 justify-between">
    <div className="flex-shrink-0 w-24 h-24">
      {agent.avatarUrl ? (
        <Image
          src={agent.avatarUrl}
          alt={agent.name}
          width={64}
          height={64}
          className="rounded-full object-cover border border-gray-300"
        />
      ) : (
        <User name={agent.name} className="text-gray-400" />
      )}
    </div>

    <div className="flex-grow">
      <h3 className="text-base font-semibold mb-2 text-right">
        <Link
          href={`/emlak/ofis/${agent.officeId}/${agent.office.slug}/${agent.role.slug}/${agent.id}/${agent.slug}`}
        >
          {agent.name} {agent.surname}
        </Link>
      </h3>

      <div className="space-y-1 text-right">
        <a
          href={`mailto:${agent.email}`}
          className="flex items-center text-blue-600 hover:text-blue-800 justify-end text-sm"
        >
          <EnvelopeSimple size={20} weight="light" className="mr-2" />
          {agent.email}
        </a>

        <a
          href={`tel:${agent.phone}`}
          className="flex items-center text-blue-600 hover:text-blue-800 justify-end text-sm"
        >
          <Phone size={20} weight="light" className="mr-2" />
          {agent.phone}
        </a>
      </div>
    </div>
  </div>
);

const PriceDisplay = ({ price }: { price: number }) => {
  const [currency, setCurrency] = useState("TRY");
  const [rate, setRate] = useState(1);

  useEffect(() => {
    const detectCurrency = async () => {
      try {
        const data = await getLocationInfo();
        if (data && !data.error) {
          setCurrency(data.currency);
          setRate(data.rate);
        }
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

export default PropertyPageClient;

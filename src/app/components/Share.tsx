"use client";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";
import React, { useEffect } from "react";
import { ShareSocial } from "react-share-social";
import { ShareFat } from "@phosphor-icons/react/dist/ssr";
import { usePathname } from "next/navigation";
import Image from "next/image";
import Head from "next/head";

export default function Share({
  title,
  type,
  avatarUrl,
  description,
}: {
  title: string;
  type: string;
  avatarUrl: string;
  description?: string;
}) {
  const currentPage = usePathname();
  const baseUrl =
    process.env.NEXT_PUBLIC_BASE_URL || "https://www.retroia.com/emlak";
  const fullUrl = `${baseUrl}${currentPage}`;
  const fullImageUrl = avatarUrl.startsWith("http")
    ? avatarUrl
    : `${baseUrl}${avatarUrl}`;

  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [scrollBehavior, setScrollBehavior] = React.useState<
    "inside" | "normal" | "outside"
  >("inside");

  useEffect(() => {
    // Update meta tags when component mounts or props change
    const metaTags = document.getElementsByTagName("meta");

    // Update or create og:image
    let ogImage = document.querySelector('meta[property="og:image"]');
    if (!ogImage) {
      ogImage = document.createElement("meta");
      ogImage.setAttribute("property", "og:image");
      document.head.appendChild(ogImage);
    }
    ogImage.setAttribute("content", fullImageUrl);

    // Update or create og:image:secure_url
    let ogImageSecure = document.querySelector(
      'meta[property="og:image:secure_url"]'
    );
    if (!ogImageSecure) {
      ogImageSecure = document.createElement("meta");
      ogImageSecure.setAttribute("property", "og:image:secure_url");
      document.head.appendChild(ogImageSecure);
    }
    ogImageSecure.setAttribute("content", fullImageUrl);

    // Update or create og:image:width
    let ogImageWidth = document.querySelector(
      'meta[property="og:image:width"]'
    );
    if (!ogImageWidth) {
      ogImageWidth = document.createElement("meta");
      ogImageWidth.setAttribute("property", "og:image:width");
      document.head.appendChild(ogImageWidth);
    }
    ogImageWidth.setAttribute("content", "1200");

    // Update or create og:image:height
    let ogImageHeight = document.querySelector(
      'meta[property="og:image:height"]'
    );
    if (!ogImageHeight) {
      ogImageHeight = document.createElement("meta");
      ogImageHeight.setAttribute("property", "og:image:height");
      document.head.appendChild(ogImageHeight);
    }
    ogImageHeight.setAttribute("content", "630");

    // Update or create og:image:type
    let ogImageType = document.querySelector('meta[property="og:image:type"]');
    if (!ogImageType) {
      ogImageType = document.createElement("meta");
      ogImageType.setAttribute("property", "og:image:type");
      document.head.appendChild(ogImageType);
    }
    ogImageType.setAttribute("content", "image/jpeg");

    // Update or create og:image:alt
    let ogImageAlt = document.querySelector('meta[property="og:image:alt"]');
    if (!ogImageAlt) {
      ogImageAlt = document.createElement("meta");
      ogImageAlt.setAttribute("property", "og:image:alt");
      document.head.appendChild(ogImageAlt);
    }
    ogImageAlt.setAttribute("content", title);

    // Update or create og:title
    let ogTitle = document.querySelector('meta[property="og:title"]');
    if (!ogTitle) {
      ogTitle = document.createElement("meta");
      ogTitle.setAttribute("property", "og:title");
      document.head.appendChild(ogTitle);
    }
    ogTitle.setAttribute("content", title);

    // Update or create og:description
    let ogDescription: HTMLMetaElement | null = null;
    if (description) {
      ogDescription = document.querySelector('meta[property="og:description"]');
      if (!ogDescription) {
        ogDescription = document.createElement("meta");
        ogDescription.setAttribute("property", "og:description");
        document.head.appendChild(ogDescription);
      }
      ogDescription.setAttribute("content", description);
    }

    // Update or create og:url
    let ogUrl = document.querySelector('meta[property="og:url"]');
    if (!ogUrl) {
      ogUrl = document.createElement("meta");
      ogUrl.setAttribute("property", "og:url");
      document.head.appendChild(ogUrl);
    }
    ogUrl.setAttribute("content", fullUrl);

    return () => {
      // Clean up meta tags when component unmounts
      if (ogImage) ogImage.remove();
      if (ogImageSecure) ogImageSecure.remove();
      if (ogImageWidth) ogImageWidth.remove();
      if (ogImageHeight) ogImageHeight.remove();
      if (ogImageType) ogImageType.remove();
      if (ogImageAlt) ogImageAlt.remove();
      if (ogTitle) ogTitle.remove();
      if (ogDescription) ogDescription.remove();
      if (ogUrl) ogUrl.remove();
    };
  }, [title, description, fullImageUrl, fullUrl]);

  return (
    <>
      <Button onPress={onOpen} className="bg-transparent">
        <ShareFat height={20} width={20} />
        Paylaş
      </Button>
      <Modal
        placement="top"
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        isDismissable={false}
        isKeyboardDismissDisabled={true}
        scrollBehavior={scrollBehavior}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 text-blue-950">
                {type} Paylaş
              </ModalHeader>
              <ModalBody>
                <div className="flex flex-row items-center gap-x-6">
                  {avatarUrl && (
                    <Image
                      src={avatarUrl}
                      alt={title}
                      width={640}
                      height={640}
                      className="aspect-auto max-w-[10rem] rounded-lg"
                    />
                  )}
                  <div className="flex flex-col">
                    <h2 className="font-bold">{title}</h2>
                    {description && (
                      <p className="text-sm text-gray-600 mt-2">
                        {description}
                      </p>
                    )}
                  </div>
                </div>
                <ShareSocial
                  url={fullUrl}
                  socialTypes={["facebook", "twitter", "linkedin", "whatsapp"]}
                />
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}

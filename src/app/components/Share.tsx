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
  const fullUrl = `${baseUrl.replace("/emlak", "")}${currentPage}`;

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
    ogImage.setAttribute("content", avatarUrl);

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
      if (ogTitle) ogTitle.remove();
      if (ogDescription) ogDescription.remove();
      if (ogUrl) ogUrl.remove();
    };
  }, [title, description, avatarUrl, fullUrl]);

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
                      <p className="text-sm text-gray-600">{description}</p>
                    )}
                  </div>
                </div>
                <div className="flex flex-col gap-4">
                  <ShareSocial
                    url={fullUrl}
                    socialTypes={[
                      "facebook",
                      "twitter",
                      "linkedin",
                      "whatsapp",
                    ]}
                  />
                  <Button
                    className="w-full"
                    onClick={() => {
                      navigator.clipboard.writeText(fullUrl);
                    }}
                  >
                    Kopyala
                  </Button>
                </div>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}

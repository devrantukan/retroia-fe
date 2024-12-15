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
import React from "react";
import { ShareSocial } from "react-share-social";
import { ShareFat } from "@phosphor-icons/react/dist/ssr";
import { usePathname } from "next/navigation";
import Image from "next/image";

export default function Share({
  title,
  type,
  avatarUrl,
}: {
  title: string;
  type: string;
  avatarUrl: string;
}) {
  const currentPage = usePathname();

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [scrollBehavior, setScrollBehavior] = React.useState<
    "inside" | "normal" | "outside"
  >("inside");

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
              <ModalHeader className="flex flex-col gap-1  text-blue-950">
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
                      className="aspect-square max-w-[10rem] rounded-lg"
                    />
                  )}
                  <h2 className="font-bold">{title}</h2>
                </div>
                <ShareSocial
                  url={`${baseUrl}${currentPage}`}
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

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
import {
  ArrowCircleRight,
  Compass,
  PhoneCall,
  MapPin,
  Envelope,
  Printer,
} from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";

export default function ShowContactDetailsButton({
  phone,
  fax,
  email,
}: {
  phone: string;
  fax: string;
  email: string;
}) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [scrollBehavior, setScrollBehavior] = React.useState<
    "inside" | "normal" | "outside"
  >("inside");

  return (
    <>
      <Button
        className={`${
          isOpen === false ? "" : "hidden"
        } w-full mt-4 bg-blue-950 text-white font-bold text-md`}
        onPress={onOpen}
      >
        <PhoneCall width={20} height={20} />
        İletişim Bilgilerini Göster
      </Button>
      <div className={`${isOpen === true ? "" : "hidden"} mt-4`}>
        {phone && (
          <p className="flex flex-row justify-center gap-x-2">
            <PhoneCall width={20} height={20} />
            <Link href={`tel:${phone}`}>{phone}</Link>
          </p>
        )}
        {fax && (
          <p className="flex flex-row justify-center gap-x-2">
            <Printer width={20} height={20} />
            {fax}
          </p>
        )}
        {email && (
          <p className="flex flex-row justify-center gap-x-2">
            <Envelope width={20} height={20} />
            <Link href={`mailto:${email}`}>{email}</Link>
          </p>
        )}
      </div>
    </>
  );
}

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
import PropertyMap from "./PropertyMap";
import { X } from "@phosphor-icons/react";

export default function ShowOnMapButton({
  lat,
  lng,
}: {
  lat: number;
  lng: number;
}) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [scrollBehavior, setScrollBehavior] = React.useState<
    "inside" | "normal" | "outside"
  >("inside");

  return (
    <>
      <Button onPress={onOpen}>Haritada göster</Button>
      <Modal
        isOpen={isOpen}
        onClose={onOpenChange}
        size="5xl"
        scrollBehavior="inside"
        hideCloseButton={false}
        placement="top-center"
        closeButton={<div className="  mt-2 mr-2" />}
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
          body: "!rounded-b-xl overflow-hidden ",
        }}
      >
        <ModalContent className="lg:h-[90vh] h-auto mt-0">
          {(onClose) => (
            <>
              <ModalHeader className="flex justify-between items-center">
                <span>Konum</span>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <X size={24} />
                </button>
              </ModalHeader>
              <ModalBody>
                <PropertyMap lat={lat} lng={lng} />
              </ModalBody>
              {/* <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" onPress={onClose}>
                  Action
                </Button>
              </ModalFooter> */}
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}

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
        placement="top"
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        isDismissable={false}
        isKeyboardDismissDisabled={true}
        size="full"
        scrollBehavior={scrollBehavior}
        className="w-full p-4"
        closeButton={<div className="  mt-2 mr-2" />}
      >
        <ModalContent>
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

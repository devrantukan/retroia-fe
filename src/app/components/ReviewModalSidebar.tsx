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

import AgentReviewForm from "./forms/AgentReviewForm";
import { ArrowCircleRight, ChatCircle } from "@phosphor-icons/react/dist/ssr";

export default function ReviewModalSidebar({
  officeWorkerId,
}: {
  officeWorkerId: number;
}) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [scrollBehavior, setScrollBehavior] = React.useState<
    "inside" | "normal" | "outside"
  >("inside");

  return (
    <>
      <Button
        onPress={onOpen}
        className="mt-4 bg-blue-950 text-white font-bold text-md"
      >
        Yorum Yaz <ArrowCircleRight width={24} height={24} />
      </Button>
      <Modal
        placement="top"
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        isDismissable={false}
        isKeyboardDismissDisabled={true}
        scrollBehavior={scrollBehavior}
        backdrop="blur"
        size="3xl"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 text-blue-950">
                Yorum Yap
              </ModalHeader>
              <ModalBody>
                <AgentReviewForm officeWorkerId={officeWorkerId} />
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}

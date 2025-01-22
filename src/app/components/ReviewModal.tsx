"use client";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  Button,
  useDisclosure,
} from "@nextui-org/react";
import { ChatCircle } from "@phosphor-icons/react/dist/ssr";
import AgentReviewForm from "./forms/AgentReviewForm";

export default function ReviewModal({
  officeWorkerId,
}: {
  officeWorkerId: number;
}) {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

  return (
    <>
      <Button onPress={onOpen} className="bg-transparent">
        <ChatCircle height={20} width={20} />
        Yorum Yap
      </Button>
      <Modal
        placement="top"
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        isDismissable={false}
        isKeyboardDismissDisabled={true}
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
                <AgentReviewForm
                  officeWorkerId={officeWorkerId}
                  onClose={onClose}
                />
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}

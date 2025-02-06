"use client";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  Button,
  useDisclosure,
} from "@nextui-org/react";
import { ChatCircle, X } from "@phosphor-icons/react/dist/ssr";
import AgentReviewForm from "./forms/AgentReviewForm";

export default function ReviewModal({
  officeWorkerId,
}: {
  officeWorkerId: number;
}) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <Button onPress={onOpen} className="bg-transparent">
        <ChatCircle height={20} width={20} />
        Yorum Yap
      </Button>
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
          body: "!rounded-b-xl overflow-y-auto",
        }}
      >
        <ModalContent className="lg:h-[90vh] h-[95vh] mt-0 relative">
          {(onClose) => (
            <>
              <button onClick={onClose} className="absolute right-4 top-4 z-50">
                <X size={24} className="text-gray-500 hover:text-gray-700" />
              </button>
              <ModalHeader className="flex flex-col gap-1 text-blue-950">
                Yorum Yap
              </ModalHeader>
              <ModalBody className="overflow-y-auto">
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

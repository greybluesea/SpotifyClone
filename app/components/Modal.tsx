import * as Dialog from "@radix-ui/react-dialog";
import React from "react";
import { IoMdClose } from "react-icons/io";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description: string;
  children: React.ReactNode;
};

const Modal = ({
  isOpen,
  onClose,
  title,
  description,
  children,
}: ModalProps) => {
  return (
    <Dialog.Root open={isOpen} onOpenChange={onClose} modal>
      <Dialog.Portal>
        <Dialog.Overlay
          className="
            backdrop-blur-[2px] 
            fixed 
            inset-0
          "
        />
        <Dialog.Content
          className="
            fixed 
            top-[50%] 
            left-[50%]  
            translate-x-[-50%] 
            translate-y-[-50%] 

            bg-BGCOLOR-SECONDARY 
            rounded-md 
            border 
            border-BGCOLOR-SECONDARY
            drop-shadow-md 
             
            w-full 
            h-full 
            max-h-full 
            sm:h-auto 
            sm:max-h-[85vh] 
            sm:w-[90vw] 
            sm:max-w-[450px] 

            p-[25px] 
              
          "
        >
          <Dialog.Title
            className="
              text-2xl 
              text-center 
              font-bold 
              mb-2
            "
          >
            {title}
          </Dialog.Title>
          <Dialog.Description
            className="
              mb-3 
              text-center
            "
          >
            {description}
          </Dialog.Description>

          <Dialog.Close asChild>
            <button
              className="
                text-NEUTRAL
                hover-text-highlight 
                absolute 
                top-[10px] 
                right-[10px] 
                inline-flex 
                h-[35px] 
                w-[35px] 
                appearance-none 
                items-center 
                justify-center 
                rounded-full 
              "
              aria-label="Close"
            >
              <IoMdClose size="25" />
            </button>
          </Dialog.Close>
          <div autoFocus={true}>{children}</div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default Modal;

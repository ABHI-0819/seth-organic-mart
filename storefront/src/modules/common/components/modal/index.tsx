import { Dialog, Transition } from "@headlessui/react"
import { clx } from "@medusajs/ui"
import React, { Fragment } from "react"

import { ModalProvider, useModal } from "@lib/context/modal-context"
import X from "@modules/common/icons/x"

type ModalProps = {
  isOpen: boolean
  close: () => void
  size?: "small" | "medium" | "large"
  search?: boolean
  children: React.ReactNode
  "data-testid"?: string
}

const Modal: React.FC<ModalProps> & {
  Title: React.FC<{ children: React.ReactNode }>
  Description: React.FC<{ children: React.ReactNode }>
  Body: React.FC<{ children: React.ReactNode }>
  Footer: React.FC<{ children: React.ReactNode }>
} = ({
  isOpen,
  close,
  size = "medium",
  search = false,
  children,
  "data-testid": dataTestId,
}) => {
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-[9999]" onClose={close}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-200"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-150"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/60 backdrop-blur-xs" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-hidden">
          <div
            className={clx(
              "flex min-h-full w-full justify-center text-center",
              {
                "items-end sm:items-center p-0 sm:p-4": !search,
                "items-start pt-12 p-4": search,
              }
            )}
          >
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-200"
              enterFrom="opacity-0 translate-y-6 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-150"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-6 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel
                data-testid={dataTestId}
                className={clx(
                  "flex flex-col w-full max-h-[92dvh] sm:max-h-[85vh] text-left align-middle transition-all transform bg-white shadow-2xl border border-stone-200 overflow-hidden",
                  {
                    "rounded-t-2xl sm:rounded-2xl": !search,
                    "max-w-md": size === "small",
                    "max-w-lg": size === "medium",
                    "max-w-2xl": size === "large",
                    "bg-transparent shadow-none border-none": search,
                  }
                )}
              >
                <ModalProvider close={close}>{children}</ModalProvider>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}

const Title: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { close } = useModal()

  return (
    <Dialog.Title className="flex items-center justify-between px-5 py-4 border-b border-stone-200/80 bg-white shrink-0">
      <div className="text-lg font-serif font-bold text-[#143625]">
        {children}
      </div>
      <div>
        <button
          onClick={close}
          type="button"
          className="w-8 h-8 rounded-full flex items-center justify-center text-stone-500 hover:text-stone-900 hover:bg-stone-100 transition"
          data-testid="close-modal-button"
        >
          <X size={20} />
        </button>
      </div>
    </Dialog.Title>
  )
}

const Description: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <Dialog.Description className="flex text-small-regular text-ui-fg-base items-center justify-center px-5 pt-2 pb-4 text- independently shrink-0">
      {children}
    </Dialog.Description>
  )
}

const Body: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="flex-1 overflow-y-auto px-5 py-4 overscroll-contain">
      {children}
    </div>
  )
}

const Footer: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="flex items-center justify-end gap-x-3 px-5 py-3.5 border-t border-stone-200/80 bg-[#FAF7F2] shrink-0">
      {children}
    </div>
  )
}

Modal.Title = Title
Modal.Description = Description
Modal.Body = Body
Modal.Footer = Footer

export default Modal

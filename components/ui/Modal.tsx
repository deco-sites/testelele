import Text from "deco-sites/fashion/components/ui/Text.tsx";
import Button from "deco-sites/fashion/components/ui/Button.tsx";
import { useEffect, useRef } from "preact/hooks";
import { IS_BROWSER } from "$fresh/runtime.ts";
import { useSignal } from "@preact/signals";
import type { JSX } from "preact";

import Icon from "./Icon.tsx";

// Lazy load a <dialog> polyfill.
if (IS_BROWSER && typeof window.HTMLDialogElement === "undefined") {
  await import(
    "https://raw.githubusercontent.com/GoogleChrome/dialog-polyfill/5033aac1b74c44f36cde47be3d11f4756f3f8fda/dist/dialog-polyfill.esm.js"
  );
}

export type Props = JSX.IntrinsicElements["dialog"] & {
  title?: string;
  mode?: "sidebar-right" | "sidebar-left" | "center";
  onClose?: () => Promise<void> | void;
  loading?: "lazy" | "eager";
  type?: "menu";
  closed?: boolean;
};

const dialogStyles = {
  "sidebar-right": "animate-slide-left",
  "sidebar-left": "animate-slide-right",
  center: "animate-fade-in",
};

const sectionStyles = {
  "sidebar-right": "justify-end",
  "sidebar-left": "justify-start",
  center: "justify-center items-center",
};

const containerStyles = {
  "sidebar-right": "h-full w-full sm:max-w-lg",
  "sidebar-left": "h-full w-full sm:max-w-lg",
  center: "",
};

const Modal = ({
  open,
  title,
  mode = "sidebar-right",
  onClose,
  children,
  type,
  loading,
  closed = true,
  ...props
}: Props) => {
  const lazy = useSignal(false);
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (open === false) {
      document.getElementsByTagName("body").item(0)?.classList.remove(
        "no-scroll",
      );
      ref.current?.open === true && ref.current.close();
    } else if (open === true) {
      document.getElementsByTagName("body").item(0)?.classList.add(
        "no-scroll",
      );
      ref.current?.open === false && ref.current.showModal();
      lazy.value = true;
    }
  }, [open]);

  if (type === "menu") {
    return (
      <dialog
        {...props}
        ref={ref}
        class={`bg-transparent p-0 m-0 max-w-full w-full max-h-full h-full backdrop-opacity-50 !overflow-hidden ${
          dialogStyles[mode]
        } ${props.class ?? ""}`}
        onClick={(e) =>
          (e.target as HTMLDialogElement).tagName === "SECTION" && onClose?.()}
        // @ts-expect-error - This is a bug in types.
        onClose={onClose}
      >
        <section
          class={`w-full h-[100vh] flex bg-transparent ${sectionStyles[mode]}`}
        >
          <div
            class={`bg-base-100 flex flex-col max-h-full ${
              containerStyles[mode]
            }`}
          >
            <header class="flex flex-col justify-between ">
              <div class="flex justify-between">
                <div class="bg-primary flex items-center w-[300px] px-6 py-4 rounded-br-full gap-4">
                  <Icon
                    id="User2"
                    width={28}
                    height={24}
                    strokeWidth={2}
                    class="!text-white"
                  />
                  <a href="#" class="flex items-center gap-1">
                    <Icon
                      id="Box"
                      width={18}
                      height={18}
                      strokeWidth={1}
                      class="!text-white"
                    />
                    <Text class="text-white">Meus Pedidos</Text>
                  </a>
                </div>
                <Button
                  variant="icon"
                  onClick={onClose}
                  class="rounded-full shadow-md self-end mr-2"
                >
                  <Icon
                    id="XMark"
                    width={16}
                    height={16}
                    strokeWidth={3}
                    class="text-gray-border"
                  />
                </Button>
              </div>
              <h1 class="p-4 text-xl text-gray-icon">
                <Text variant="heading-2">{title}</Text>
              </h1>
            </header>
            <div class="overflow-y-auto flex-grow flex flex-col">
              {loading === "lazy" ? lazy.value && children : children}
            </div>
          </div>
        </section>
      </dialog>
    );
  }

  return (
    <dialog
      {...props}
      ref={ref}
      class={`bg-transparent p-0 m-0 max-w-full w-full max-h-full h-full backdrop-opacity-50 ${
        dialogStyles[mode]
      } ${props.class ?? ""}`}
      onClick={(e) =>
        (e.target as HTMLDialogElement).tagName === "SECTION" && onClose?.()}
      // @ts-expect-error - This is a bug in types.
      onClose={onClose}
    >
      <section
        class={`w-full h-full flex bg-transparent ${sectionStyles[mode]}`}
      >
        <div
          class={`bg-base-100 flex flex-col max-h-full ${
            containerStyles[mode]
          }`}
        >
          {closed === true
            ? (
              <header class="flex px-4 py-6 justify-between items-center border-b border-base-200">
                <h1>
                  <Text variant="heading-2">{title}</Text>
                </h1>
                <div class="bg-base-100 rounded-full  border-[0.5px] border-[#dadada]">
                  <Button
                    variant="icon"
                    class="border-[0.5px] border-[#dadada]"
                    onClick={onClose}
                  >
                    <Icon
                      id="XMark"
                      class="text-[#babcbe]"
                      width={20}
                      height={20}
                      strokeWidth={2}
                    />
                  </Button>
                </div>
              </header>
            )
            : (
              <header class="flex flex-col gap-3 px-4 py-4 justify-between items-start border-base-200">
                <div class="bg-base-100 rounded-full mb-1 border-[0.5px] border-[#dadada]">
                  <Button
                    variant="icon"
                    class="border-[0.5px] border-[#dadada]"
                    onClick={onClose}
                  >
                    <Icon
                      id="XMark"
                      class="text-[#babcbe]"
                      width={20}
                      height={20}
                      strokeWidth={2}
                    />
                  </Button>
                </div>
                <h1>
                  <Text variant="heading-2">{title}</Text>
                </h1>
              </header>
            )}
          <div class="overflow-y-auto flex-grow   flex flex-col">
            {loading === "lazy" ? lazy.value && children : children}
          </div>
        </div>
      </section>
    </dialog>
  );
};

export default Modal;

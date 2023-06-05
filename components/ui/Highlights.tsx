import Image from "deco-sites/std/components/Image.tsx";
import Container from "deco-sites/fashion/components/ui/Container.tsx";
import Text from "deco-sites/fashion/components/ui/Text.tsx";
import { Slider } from "deco-sites/fashion/components/ui/Slider.tsx";
import type { Image as LiveImage } from "deco-sites/std/components/types.ts";
import Icon from "deco-sites/fashion/components/ui/Icon.tsx";
import Button from "deco-sites/fashion/components/ui/Button.tsx";
import { useId } from "preact/hooks";
import SliderControllerJS from "deco-sites/fashion/islands/SliderJS.tsx";
import { useSignal } from "@preact/signals";

export interface Highlight {
  src: LiveImage;
  alt: string;
  href: string;
  label: string;
}

export interface Props {
  highlights?: Highlight[];
  title: string;
  /**
   * @description this text is going to be displayed in red besides the title
   */
  highlightedTitle?: string;
}

function Highlights({ highlights = [], title }: Props) {
  const id = useId();
  const open = useSignal(false);
  return (
    <>
      <div class="md:hidden py-[18px] bg-camp-gray flex flex-col items-center">
        <Container
          id={id}
          class={`grid grid-cols-1 grid-rows-[48px_1fr] max-w-[1320px] relative transition-height duration-500 ease-in ${
            open.value ? "max-h-full" : "max-h-[315px]"
          }`}
        >
          <h2 class="">
            <Text variant="heading-2">{title}</Text>
          </h2>
          <div
            class={`flex flex-wrap justify-between transition-height duration-500 ease-in  overflow-hidden  ${
              open.value ? "max-h-full" : "max-h-[272px]"
            }`}
          >
            {highlights.map(({ href, src, alt, label }) => (
              <a
                href={href}
                class="flex flex-col gap-4 items-center"
              >
                <div class="bg-white rounded-[10px] w-[100px] h-[100px] flex items-center justify-center">
                  <Image
                    class="max-w-[30px]"
                    src={src}
                    alt={alt}
                    width={38}
                    height={38}
                  />
                </div>
                <Text variant="body" class="text-gray-icon text-sm">
                  {label}
                </Text>
              </a>
            ))}
          </div>
        </Container>
        <Button
          class="bg-transparent !text-gray-icon underline"
          onClick={() => open.value = !open.value}
        >
          {open.value ? "Ver menos" : "Ver mais"}
        </Button>
      </div>
      {/* Desktop version */}
      <div class="hidden md:block py-[18px] px-5 bg-camp-gray">
        <Container
          id={id}
          class="grid grid-cols-1 grid-rows-[48px_1fr] max-w-[1320px] relative"
        >
          <h2 class="">
            <Text variant="heading-2">{title}</Text>
          </h2>
          <div class="hidden absolute w-[43px] top-6 h-[43px] bg-[#FFFFFFE6] border-[0.5px] border-[#dadada] rounded-full left-0 lg:flex items-center justify-center z-10 justify-self-start col-start-1 row-start-2">
            <Button
              variant="icon"
              data-slide="prev"
              aria-label="Previous item"
            >
              <Icon
                class="text-[#babcbe]"
                size={20}
                id="ChevronLeft"
                strokeWidth={3}
              />
            </Button>
          </div>
          <Slider
            class="gap-1 scrollbar-none !items-start"
            snap="snap-center sm:snap-start block"
          >
            {highlights.map(({ href, src, alt, label }) => (
              <a
                href={href}
                class="flex flex-col gap-4 items-center"
              >
                <div class="bg-white rounded-[10px] w-[100px] h-[100px] flex items-center justify-center">
                  <Image
                    class="max-w-[30px]"
                    src={src}
                    alt={alt}
                    width={38}
                    height={38}
                  />
                </div>
                <Text variant="body" class="text-grey-icon text-sm">
                  {label}
                </Text>
              </a>
            ))}
          </Slider>
          <div class="hidden absolute w-[43px] top-6 h-[43px] bg-[#FFFFFFE6] border-[0.5px] border-[#dadada] rounded-full right-0 lg:flex items-center justify-center z-10 justify-self-end col-start-3 row-start-2">
            <Button
              variant="icon"
              data-slide="next"
              aria-label="Next item"
            >
              <Icon
                class="text-[#babcbe]"
                size={20}
                id="ChevronRight"
                strokeWidth={3}
              />
            </Button>
          </div>
          <SliderControllerJS rootId={id} />
        </Container>
      </div>
    </>
  );
}

export default Highlights;

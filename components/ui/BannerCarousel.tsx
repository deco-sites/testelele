import Text from "deco-sites/fashion/components/ui/Text.tsx";
import Icon from "deco-sites/fashion/components/ui/Icon.tsx";
import Button from "deco-sites/fashion/components/ui/Button.tsx";
import {
  Slider,
  SliderDots,
} from "deco-sites/fashion/components/ui/Slider.tsx";
import SliderControllerJS from "deco-sites/fashion/islands/SliderJS.tsx";
import { Picture, Source } from "deco-sites/std/components/Picture.tsx";
import { useId } from "preact/hooks";
import type { Image as LiveImage } from "deco-sites/std/components/types.ts";

export interface Banner {
  /** @description desktop otimized image */
  desktop: LiveImage;
  /** @description mobile otimized image */
  mobile: LiveImage;
  /** @description Image's alt text */
  alt: string;
  /** @description when user clicks on the image, go to this link */
  href: string;
}

export interface Props {
  images?: Banner[];
  /**
   * @description Check this option when this banner is the biggest image on the screen for image optimizations
   */
  preload?: boolean;
  /**
   * @title Autoplay interval
   * @description time (in seconds) to start the carousel autoplay
   */
  interval?: number;
}

function BannerItem({ image, lcp }: { image: Banner; lcp?: boolean }) {
  const {
    alt,
    mobile,
    desktop,
    href,
  } = image;

  return (
    <div class="relative min-w-[100vw] overflow-y-hidden  rounded-lg">
      <a href={href} class=" rounded-lg">
        <Picture class="w-full rounded-lg object-contain" preload={lcp}>
          <Source
            media="(max-width: 767px)"
            fetchPriority={lcp ? "high" : "auto"}
            src={mobile}
            width={423}
            height={287}
          />
          <Source
            media="(min-width: 768px)"
            fetchPriority={lcp ? "high" : "auto"}
            src={desktop}
            width={1280}
            height={343}
          />
          <img
            class="object-cover w-full sm:h-full"
            loading={lcp ? "eager" : "lazy"}
            src={desktop}
            alt={alt}
          />
        </Picture>
      </a>
    </div>
  );
}

function ProgressiveDots({ images, interval = 0 }: Props) {
  return (
    <SliderDots class="col-span-full w-min sm:bg-[#f5f5f5] sm:px-2 sm:rounded-full self-center justify-self-center gap-2  z-10 row-start-5 lg:row-start-4 overflow-hidden lg:h-[18px] lg:self-end">
      {images?.map((_) => (
        <div>
          <div class="w-[6px] h-[6px] sm:w-[10px] sm:h-[10px] rounded border border-[#ec1b2f] sm:border-0 sm:bg-[#dadada] group-disabled:bg-[#ec1b2f]" />
        </div>
      ))}
    </SliderDots>
  );
}

function Controls() {
  return (
    <>
      <div class="hidden absolute w-[43px] h-[43px] bg-[#FFFFFFE6] border-[0.5px] border-[#dadada] rounded-full -left-3 lg:flex items-center justify-center z-10 justify-self-start col-start-1 row-start-2">
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
      <div class="hidden absolute w-[43px] h-[43px] bg-[#FFFFFFE6] border-[0.5px] border-[#dadada] rounded-full -right-3 lg:flex items-center justify-center z-10 justify-self-end col-start-3 row-start-2">
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
    </>
  );
}

function BannerCarousel({ images, preload, interval }: Props) {
  const id = useId();

  return (
    <div class="w-full lg:bg-[#f5f5f5] flex justify-center">
      <div
        id={id}
        class="rounded-lg relative grid px-4 sm:px-6 grid-cols-[48px_1fr_48px] sm:grid-cols-[120px_1fr_120px] grid-rows-[1fr_48px_1fr_48px_22px] lg:grid-rows-[1fr_48px_1fr_48px] max-w-[1280px] xl:px-0"
      >
        <Slider class="col-span-full row-start-1 row-end-5 lg:row-span-full  scrollbar-none gap-6 rounded-lg">
          {images?.map((image, index) => (
            <BannerItem image={image} lcp={index === 0 && preload} />
          ))}
        </Slider>

        <Controls />

        <ProgressiveDots images={images} interval={interval} />

        <SliderControllerJS rootId={id} interval={interval && interval * 1e3} />
      </div>
    </div>
  );
}

export default BannerCarousel;

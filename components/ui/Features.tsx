import Container from "deco-sites/fashion/components/ui/Container.tsx";
import type { Image as LiveImage } from "deco-sites/std/components/types.ts";
import Image from "deco-sites/std/components/Image.tsx";

export interface Feature {
  /**
   * @description Image src
   */
  image: LiveImage;
  alt: string;
}

export interface Props {
  features: Feature[];
}

function FeatureHighlights(
  { features }: Props,
) {
  return (
    <Container class="py-2 lg:py-5">
      {/* desktop */}
      <div class="hidden  border-base-200 border border-solid rounded-lg h-[63px] lg:flex items-center overflow-hidden relative after:absolute after:h-full after:w-2 after:bg-primary after:right-0  before:absolute before:h-full before:w-2 before:bg-primary shadow-default">
        <div class="flex justify-around items-center px-5 flex-grow">
          {features.map(({ image, alt }) => (
            <Image src={image} alt={alt} width={190} height={42} />
          ))}
        </div>
      </div>
      {/* mobile */}
      <div class="lg:hidden flex items-center justify-around gap-4 px-4">
        {features.filter((item, index) => index < 2).map(({ image, alt }) => (
          <div class="bg-camp-gray flex-grow p-4 border border-gray-border rounded-lg flex items-center justify-center">
            <Image src={image} alt={alt} width={328} height={115} />
          </div>
        ))}
      </div>
    </Container>
  );
}

export default FeatureHighlights;

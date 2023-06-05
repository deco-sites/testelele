import type { Image as LiveImage } from "deco-sites/std/components/types.ts";
import Image from "deco-sites/std/components/Image.tsx";

export interface Props {
  image: LiveImage;
  path: string;
}

function Alert({ image, path }: Props) {
  return (
    <a
      href={path}
      class="hidden lg:block w-full bg-primary group-[.micro]:hidden "
    >
      <Image
        src={image}
        width={1280}
        height={34}
        class="w-full max-w-[1280px] mx-auto"
      />
    </a>
  );
}

export default Alert;

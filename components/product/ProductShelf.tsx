import ProductCard from "deco-sites/fashion/components/product/ProductCard.tsx";
import Container from "deco-sites/fashion/components/ui/Container.tsx";
import Text from "deco-sites/fashion/components/ui/Text.tsx";
import { Slider } from "deco-sites/fashion/components/ui/Slider.tsx";
import SliderControllerJS from "deco-sites/fashion/islands/SliderJS.tsx";
import Button from "deco-sites/fashion/components/ui/Button.tsx";
import Icon from "deco-sites/fashion/components/ui/Icon.tsx";
import { useId } from "preact/hooks";
import type { LoaderReturnType } from "$live/types.ts";
import type { Product } from "deco-sites/std/commerce/types.ts";
import ViewSendEvent from "deco-sites/fashion/components/ViewSendEvent.tsx";
import { mapProductToAnalyticsItem } from "deco-sites/std/commerce/utils/productToAnalyticsItem.ts";
import { useOffer } from "deco-sites/fashion/sdk/useOffer.ts";

export interface Props {
  title: string;
  titleEmphasis: string;
  products: LoaderReturnType<Product[] | null>;
  itemsPerPage?: number;
}

function ProductShelf({
  title,
  products,
  titleEmphasis,
}: Props) {
  const id = useId();

  if (!products || products.length === 0) {
    return null;
  }

  return (
    <Container
      id={id}
      class="grid grid-cols-[60px_1fr_60px] grid-rows-[60px_1fr_60px_1fr] py-5 px-2 overflow-y-hidden overflow-x-hidden sm:px-5 "
    >
      <h2 class="text-start row-start-1 col-span-full">
        <Text variant="heading-2">{title}</Text>
        <Text variant="heading-2" class="text-red-700">{titleEmphasis}</Text>
      </h2>

      <Slider
        class="grid grid-rows-5 col-span-full sm:grid-rows-none row-start-2 row-end-5 overflow-y-hidden overflow-x-hidden"
        snap="snap-center sm:snap-start block first:ml-6 sm:first:ml-0 last:mr-6 sm:last:mr-0"
      >
        {products?.map((product) => (
          <div class="max-w-[270px] sm:min-w-[292px] sm:max-w-[292px]">
            <ProductCard product={product} itemListName={title} />
          </div>
        ))}
      </Slider>

      <>
        <div class="hidden relative sm:block  z-10  col-start-1  row-start-3">
          <div class="absolute right-[30%] bg-base-100 rounded-full  border-[0.5px] border-[#dadada] ">
            <Button variant="icon" data-slide="prev" aria-label="Previous item">
              <Icon
                size={20}
                id="ChevronLeft"
                class="text-[#dcdfe2]"
                strokeWidth={2}
              />
            </Button>
          </div>
        </div>
        <div class="hidden relative sm:block z-10 col-start-3 row-start-3 ">
          <div class="absolute left-[30%]  bg-base-100 rounded-full  border-[0.5px] border-[#dadada] ">
            <Button variant="icon" data-slide="next" aria-label="Next item">
              <Icon
                size={20}
                id="ChevronRight"
                class="text-[#dcdfe2]"
                strokeWidth={2}
              />
            </Button>
          </div>
        </div>
      </>

      <SliderControllerJS rootId={id} />

      <ViewSendEvent
        event={{
          name: "view_item_list",
          params: {
            item_list_name: title,
            items: products.map((product) =>
              mapProductToAnalyticsItem({
                product,
                ...(useOffer(product.offers)),
              })
            ),
          },
        }}
      />
    </Container>
  );
}

export default ProductShelf;

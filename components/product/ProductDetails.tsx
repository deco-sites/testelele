import { useId } from "preact/hooks";
import ShippingSimulation from "deco-sites/fashion/islands/ShippingSimulation.tsx";
import Container from "deco-sites/fashion/components/ui/Container.tsx";
import Text from "deco-sites/fashion/components/ui/Text.tsx";
import Breadcrumb from "deco-sites/fashion/components/ui/Breadcrumb.tsx";
import Button from "deco-sites/fashion/components/ui/Button.tsx";
import Icon from "deco-sites/fashion/components/ui/Icon.tsx";
import Image from "deco-sites/std/components/Image.tsx";
import {
  Slider,
  SliderDots,
} from "deco-sites/fashion/components/ui/Slider.tsx";
import SliderJS from "deco-sites/fashion/components/ui/SliderJS.tsx";
import { useOffer } from "deco-sites/fashion/sdk/useOffer.ts";
import { formatPrice } from "deco-sites/fashion/sdk/format.ts";
import type { LoaderReturnType } from "$live/types.ts";
import type { ProductDetailsPage } from "deco-sites/std/commerce/types.ts";
import ViewSendEvent from "deco-sites/fashion/components/ViewSendEvent.tsx";
import { mapProductToAnalyticsItem } from "deco-sites/std/commerce/utils/productToAnalyticsItem.ts";

import ProductSelector from "./ProductVariantSelector.tsx";
import ProductImageZoom from "deco-sites/fashion/islands/ProductImageZoom.tsx";
import WishlistButton from "../wishlist/WishlistButton.tsx";
import QuantityAddToCartButton from "./QuantityAddToCartButton.tsx";
import PaymentTables from "deco-sites/le-biscuit/islands/PaymentTables.ts";
import { Runtime } from "deco-sites/le-biscuit/runtime.ts";

export type Variant = "front-back" | "slider" | "auto";

export interface Props {
  page: LoaderReturnType<ProductDetailsPage | null>;
  /**
   * @title Product view
   * @description Ask for the developer to remove this option since this is here to help development only and should not be used in production
   */
  variant?: Variant;
}

const WIDTH = 358;
const HEIGHT = 358;
const ASPECT_RATIO = `${WIDTH} / ${HEIGHT}`;

/**
 * Rendered when a not found is returned by any of the loaders run on this page
 */
function NotFound() {
  return (
    <div class="w-full flex justify-center items-center py-28">
      <div class="flex flex-col items-center justify-center gap-6">
        <Text variant="heading-2">Página não encontrada</Text>
        <a href="/">
          <Button>Voltar à página inicial</Button>
        </a>
      </div>
    </div>
  );
}

function ProductInfo({ page }: { page: ProductDetailsPage }) {
  const {
    breadcrumbList,
    product,
  } = page;
  const {
    description,
    productID,
    offers,
    name,
    brand,
    gtin,
    isVariantOf,
  } = product;
  const { price, listPrice, seller, installments, sellerName } = useOffer(
    offers,
  );

  const { model, additionalProperty } = isVariantOf ?? {};

  // console.log(isVariantOf?.model);

  // console.log(additionalProperty);

  return (
    <>
      <div class="lg:max-w-[50%] pr-[2rem]">
        {/* Code and name */}
        <div class="hidden lg:block">
          <div class="flex mt-4 sm:mt-8">
            <h1>
              <span class="text-[16px] font-bold">{name}</span>
            </h1>
            <div>
              <Icon id="ShareGraph" width={24} height={24} strokeWidth={1} />
            </div>
          </div>
          <div>
            <Text tone="base-300" variant="caption">
              (Código: {model})
            </Text>{" "}
            <Text tone="base-300" variant="caption">
              Marca: <span class="text-primary">{brand}</span>
            </Text>
          </div>
        </div>
        {/* mini Description*/}
        <div class="hidden lg:flex mt-4 sm:mt-6">
          <Text variant="caption">
            {description && (
              <div>
                <div class="line-clamp-3 text-[14px]">{description}</div>
                <a
                  href="#description"
                  class="underline text-primary mt-[5px] inline-flex"
                >
                  Ler descrição completa
                </a>
              </div>
            )}
          </Text>
        </div>

        {/* Sku Selector */}
        <div class="mt-4 sm:mt-6">
          <ProductSelector product={product} />
        </div>
      </div>
      <div class="w-full lg:max-w-[50%]">
        {/* Prices */}
        <div class="mt-4 border rounded-[10px] p-[16px] shadow-[0_2px_2px_rgb(0_0_0/10%)]">
          <div class="flex flex-col gap-2 ">
            <span class="line-through text-base-200 text-[16px]">
              de {formatPrice(listPrice, offers!.priceCurrency!)}
            </span>

            <div class="flex">
              <span class="text-[20px] font-bold pr-8">
                {formatPrice(price, offers!.priceCurrency!)}{" "}
                <span class="text-[14px] font-normal">a vista</span>
              </span>
              <div class="flex flex-row gap-[2px] justify-center items-center bg-camp-gray text-blue-text-discount text-[12px] rounded-[4px] sm:h-[30px] sm:w-[50px] sm:text-xs">
                <Icon id="ArrowDown" width={10} height={10} strokeWidth={2} />
                <span class="">
                  {Math.trunc((listPrice! - price!) / listPrice! * 100)}%
                </span>
              </div>
            </div>
          </div>
          <Text tone="base-300" variant="caption">
            {installments}
          </Text>
          <PaymentTables product={product} />
        </div>
        {/* Add to Cart and Favorites button */}
        <div class="mt-4 sm:mt-10 flex flex-col gap-2">
          {seller && (
            <QuantityAddToCartButton
              skuId={productID}
              sellerId={seller}
              price={price ?? 0}
              discount={price && listPrice ? listPrice - price : 0}
              name={product.name ?? ""}
              productGroupId={product.isVariantOf?.productGroupID ?? ""}
            />
          )}
          {
            /* <WishlistButton
            variant="full"
            productId={isVariantOf?.productGroupID}
            sku={productID}
            title={name}
          /> */
          }
        </div>
        <div>
          <span class="underline text-[12px]">Vendido e entregue por:</span>
          {" "}
          {sellerName}
        </div>
        {/* Shipping Simulation */}
        <div class="mt-8 border rounded-[10px] p-[16px] shadow-[0_2px_2px_rgb(0_0_0/10%)]">
          <ShippingSimulation
            items={[{
              id: Number(product.sku),
              quantity: 1,
              seller: seller ?? "1",
            }]}
          />
        </div>

        <ViewSendEvent
          event={{
            name: "view_item",
            params: {
              items: [
                mapProductToAnalyticsItem({
                  product,
                  breadcrumbList,
                  price,
                  listPrice,
                }),
              ],
            },
          }}
        />
      </div>
    </>
  );
}

function Details({
  page,
  variant,
}: { page: ProductDetailsPage; variant: Variant }) {
  const id = `product-image-gallery:${useId()}`;
  const {
    product: { image: images = [], description, name, isVariantOf, brand },
    breadcrumbList,
  } = page;

  const { model } = isVariantOf ?? {};

  // console.log(page.product);
  /**
   * Product slider variant
   *
   * Creates a three columned grid on destkop, one for the dots preview, one for the image slider and the other for product info
   * On mobile, there's one single column with 3 rows. Note that the orders are different from desktop to mobile, that's why
   * we rearrange each cell with col-start- directives
   */
  if (variant === "slider") {
    return (
      <>
        <Container class="py-0 sm:py-10">
          {/* Breadcrumb */}
          <Breadcrumb
            itemListElement={breadcrumbList?.itemListElement}
          />
          <div class="block lg:hidden">
            <div class="flex mt-4 sm:mt-8">
              <h1>
                <span class="text-[16px] font-bold">{name}</span>
              </h1>
              <div>
                <Icon id="ShareGraph" width={24} height={24} strokeWidth={1} />
              </div>
            </div>
            <div>
              <Text tone="base-300" variant="caption">
                (Código: {model})
              </Text>{" "}
              <Text tone="base-300" variant="caption">
                Marca: <span class="text-primary">{brand}</span>
              </Text>
            </div>
          </div>
          <div
            id={id}
            class={`grid grid-cols-1 gap-4 sm:grid-cols-[33%_66%] sm:grid-rows-1 sm:justify-center sm:max-h-[calc(${
              (HEIGHT / WIDTH).toFixed(2)
            }*40vw)]`}
          >
            <div class="sm:grid-rows-[max-content_30vw]">
              {/* Image Slider */}
              <div class="relative sm:col-start-2 sm:col-span-1 sm:row-start-1">
                <Slider class="gap-6 scrollbar-none">
                  {images.map((img, index) => (
                    <Image
                      class="snap-center min-w-[100vw] sm:min-w-[30vw]"
                      sizes="(max-width: 640px) 100vw, 40vw"
                      style={{ aspectRatio: ASPECT_RATIO }}
                      src={img.url!}
                      alt={img.alternateName}
                      width={WIDTH}
                      height={HEIGHT}
                      // Preload LCP image for better web vitals
                      preload={index === 0}
                      loading={index === 0 ? "eager" : "lazy"}
                    />
                  ))}
                </Slider>

                <div class="absolute left-2 bottom-[-50px] rounded-full">
                  <Button
                    variant="icon"
                    data-slide="prev"
                    aria-label="Previous"
                  >
                    <Icon size={20} id="ChevronLeft" strokeWidth={3} />
                  </Button>
                </div>
                <div class="absolute right-2 bottom-[-50px] rounded-full">
                  <Button variant="icon" data-slide="next" aria-label="Next">
                    <Icon size={20} id="ChevronRight" strokeWidth={3} />
                  </Button>
                </div>

                <div class="absolute top-2 right-2 bg-base-100 rounded-full">
                  <ProductImageZoom
                    images={images}
                    width={1280}
                    height={1280 * HEIGHT / WIDTH}
                  />
                </div>
              </div>

              {/* Dots */}
              <SliderDots class="gap-2 sm:justify-start scrollbar-none overflow-auto px-4 sm:px-0 mx-8 sm:col-start-1 sm:col-span-1 sm:row-start-1">
                {images.map((img, _) => (
                  <Image
                    style={{ aspectRatio: ASPECT_RATIO }}
                    class="group-disabled:border-base-300 border rounded min-w-[50px] sm:min-w-[50px]"
                    width={50}
                    height={50}
                    src={img.url!}
                    alt={img.alternateName}
                  />
                ))}
              </SliderDots>
            </div>
            {/* Product Info */}
            <div class="px-4 sm:pr-0 sm:pl-6 sm:col-start-2 sm:col-span-1 sm:row-start-1 flex flex-col lg:flex-row ">
              <ProductInfo page={page} />
            </div>
          </div>
          <SliderJS rootId={id}></SliderJS>
        </Container>
      </>
    );
  }

  /**
   * Product front-back variant.
   *
   * Renders two images side by side both on mobile and on desktop. On mobile, the overflow is
   * reached causing a scrollbar to be rendered.
   */
  return (
    <div class="grid grid-cols-1 gap-4 sm:grid-cols-[50vw_25vw] sm:grid-rows-1 sm:justify-center">
      {/* Image slider */}
      <Slider class="gap-6">
        {[images[0], images[1] ?? images[0]].map((img, index) => (
          <Image
            class="snap-center min-w-[100vw] sm:min-w-[24vw]"
            sizes="(max-width: 640px) 100vw, 24vw"
            style={{ aspectRatio: ASPECT_RATIO }}
            src={img.url!}
            alt={img.alternateName}
            width={WIDTH}
            height={HEIGHT}
            // Preload LCP image for better web vitals
            preload={index === 0}
            loading={index === 0 ? "eager" : "lazy"}
          />
        ))}
      </Slider>

      {/* Product Info */}
      <div class="px-4 sm:pr-0 sm:pl-6">
        <ProductInfo page={page} />
      </div>
    </div>
  );
}

function ProductDetails({ page, variant: maybeVar = "auto" }: Props) {
  /**
   * Showcase the different product views we have on this template. In case there are less
   * than two images, render a front-back, otherwhise render a slider
   * Remove one of them and go with the best suited for your use case.
   */
  const variant = maybeVar === "auto"
    ? page?.product.image?.length && page?.product.image?.length < 2
      ? "front-back"
      : "slider"
    : maybeVar;

  return (
    <>
      {page ? <Details page={page} variant={variant} /> : <NotFound />}
    </>
  );
}

export default ProductDetails;

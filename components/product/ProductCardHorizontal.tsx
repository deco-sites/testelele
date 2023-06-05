import Image from "deco-sites/std/components/Image.tsx";
import Text from "deco-sites/fashion/components/ui/Text.tsx";
import Avatar from "deco-sites/fashion/components/ui/Avatar.tsx";
import Button from "deco-sites/fashion/components/ui/Button.tsx";
import WishlistIcon from "deco-sites/fashion/islands/WishlistButton.tsx";
import { useOffer } from "deco-sites/fashion/sdk/useOffer.ts";
import { formatPrice } from "deco-sites/fashion/sdk/format.ts";
import { useVariantPossibilities } from "deco-sites/fashion/sdk/useVariantPossiblities.ts";
import type { Product } from "deco-sites/std/commerce/types.ts";
import ButtonSendEvent from "deco-sites/fashion/components/ButtonSendEvent.tsx";
import { mapProductToAnalyticsItem } from "deco-sites/std/commerce/utils/productToAnalyticsItem.ts";
import Icon from "deco-sites/fashion/components/ui/Icon.tsx";
import AddToCartButton from "./AddToCartButton.tsx";

/**
 * A simple, inplace sku selector to be displayed once the user hovers the product card
 * It takes the user to the pdp once the user clicks on a given sku. This is interesting to
 * remove JS from the frontend
 */
function Sizes(product: Product) {
  const possibilities = useVariantPossibilities(product);
  const options = Object.entries(
    possibilities["TAMANHO"] ?? possibilities["Tamanho"] ?? {},
  );

  return (
    <ul class="flex justify-center items-center gap-2">
      {options.map(([value, urls]) => {
        const url = urls.find((url) => url === product.url) || urls[0];

        return (
          <a href={url}>
            <Avatar
              variant="abbreviation"
              content={value}
              disabled={url === product.url}
            />
          </a>
        );
      })}
    </ul>
  );
}

interface Props {
  product: Product;
  /** Preload card image */
  preload?: boolean;

  /** @description used for analytics event */
  itemListName?: string;
}

function ProductCardHorizontal({ product, preload, itemListName }: Props) {
  const {
    url,
    productID,
    // name,
    image: images,
    offers,
    inProductGroupWithID,
    isVariantOf,
  } = product;
  const [front, back] = images ?? [];
  const { listPrice, price, seller } = useOffer(offers);

  const { name } = isVariantOf ?? {};

  return (
    <div
      data-deco="view-product"
      id={`product-card-${productID}`}
      class="flex flex-row relative content-center  gap-1 text-start rounded-lg border border-camp-gray group shadow-lg p-4"
    >
      <a href={url} aria-label="product link" class="flex relative flex-grow">
        <div class="absolute top-0.5 left-1 flex flex-row gap-[2px] justify-center items-center bg-bottom-green text-white text-[12px] rounded-bl-2xl rounded-tr-xl sm:text-xs p-2">
          <span class="flex items-center">
            -{Math.trunc((listPrice! - price!) / listPrice! * 100)}% Off
          </span>
        </div>
        <div class="flex justify-center pr-[2rem]">
          <Image
            src={front.url!}
            alt={front.alternateName}
            width={100}
            height={100}
            class="rounded h-[100px] w-[100px]  mb-1 sm:w-[180px] sm:h-[180px]"
            preload={preload}
            loading={preload ? "eager" : "lazy"}
            sizes=" (max-width: 640px) 50vw, 20vw"
          />
        </div>

        <div class="flex flex-col lg:flex-row w-full  items-center lg:items-start justify-center gap-1 px-3 flex-grow">
          <span class="h-[45px] w-full overflow-hidden text-ellipsis whitespace-break-spaces text-[16px] font-bold">
            {name!.length > 0 ? name! : "Sem item no estoque"}
          </span>
          <div class="flex-grow">
            <div class="flex flex-row w-full gap-1 ">
              <Icon id="Star-Yellow" width={20} height={20} />
              <Icon id="Star-Yellow" width={20} height={20} />
              <Icon id="Star-Yellow" width={20} height={20} />
              <Icon id="Star-Yellow" width={20} height={20} />
              <Icon id="Star-Yellow" width={20} height={20} />
            </div>
            <div class="flex flex-col justify-start self-start">
              {price !== listPrice
                ? (
                  <div class="flex justify-between gap-2 w-full">
                    <Text
                      class="line-through"
                      variant="list-price"
                      tone="base-300"
                    >
                      {formatPrice(listPrice, offers!.priceCurrency!)}
                    </Text>
                  </div>
                )
                : ""}
              <span class="text-[12px] sm:text-[18px]">
                {formatPrice(price, offers!.priceCurrency!)}
              </span>
            </div>
            <div class="flex flex-col w-full">
              {/* a verificar */}
              <span class="text-[8px] sm:text-[12px]">
                12x {formatPrice(price! / 12, offers!.priceCurrency!)}{" "}
                s/ juros no cartão de crédito
              </span>
              <div
                href={url}
                class=""
              >
                {/* FIXME: Understand why fresh breaks rendering this component */}
                {
                  /* <ButtonSendEvent
                as="a"
                href={product.url}
                event={{
                  name: "select_item",
                  params: {
                    item_list_name: itemListName,
                    items: [
                      mapProductToAnalyticsItem({
                        product,
                        price,
                        listPrice,
                      }),
                    ],
                  },
                }}
              >
                Adicionar
              </ButtonSendEvent> */
                }
                {seller && (
                  <AddToCartButton
                    skuId={productID}
                    sellerId={seller}
                    price={listPrice!}
                    name={name!}
                    discount={price!}
                    productGroupId={inProductGroupWithID!}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </a>
    </div>
  );
}

export default ProductCardHorizontal;

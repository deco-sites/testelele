import Image from "deco-sites/std/components/Image.tsx";
import Text from "deco-sites/fashion/components/ui/Text.tsx";
import Avatar from "deco-sites/fashion/components/ui/Avatar.tsx";
import Button from "deco-sites/fashion/components/ui/Button.tsx";
import WishlistIcon from "deco-sites/fashion/islands/WishlistButton.tsx";
import { useOffer } from "deco-sites/fashion/sdk/useOffer.ts";
import { formatPrice } from "deco-sites/fashion/sdk/format.ts";
import { useVariantPossibilities } from "deco-sites/fashion/sdk/useVariantPossiblities.ts";
import type { Product } from "deco-sites/std/commerce/types.ts";
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

function ProductCard({ product, preload, itemListName }: Props) {
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
      class="flex-col w-[180px] h-[300px] relative py-5 content-center gap-1 text-start rounded-lg border border-camp-gray group sm:h-[430px]  sm:w-[240px]  "
    >
      <a href={url} aria-label="product link">
        <div
          href={url}
          class="absolute  hidden sm:group-hover:flex flex-col justify-center content-center gap-2 h-[80%] w-full pb-5  px-5"
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
            Adicionar à sacola
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
        <div class="flex h-[100px]  w-full justify-center sm:h-[200px]">
          <div class="absolute top-0 right-0 mr-1 mt-1">
            {/* icon heart */}
            <WishlistIcon
              variant="heart"
              productId={isVariantOf?.productGroupID}
              sku={productID}
              title={name}
            />
          </div>
          <Image
            src={front.url!}
            alt={front.alternateName}
            width={100}
            height={100}
            class="rounded h-[100px] w-[100px]  mb-1 sm:w-[200px] sm:h-[200px]"
            preload={preload}
            loading={preload ? "eager" : "lazy"}
            sizes=" (max-width: 640px) 50vw, 20vw"
          />
        </div>

        <div class="flex flex-col w-full  items-center justify-center gap-1 px-3">
          <Text
            class="h-[45px] w-full overflow-hidden text-ellipsis text-xs whitespace-break-spaces"
            variant="caption"
          >
            {name!.length > 0 ? name! : "Sem item no estoque"}
          </Text>
          <div class="flex flex-row w-full gap-1 ">
            <Icon id="Star-Yellow" width={20} height={20} />
            <Icon id="Star-Yellow" width={20} height={20} />
            <Icon id="Star-Yellow" width={20} height={20} />
            <Icon id="Star-Yellow" width={20} height={20} />
            <Icon id="Star-Yellow" width={20} height={20} />
          </div>

          {price !== listPrice
            ? (
              <div class="flex justify-between gap-2 w-full">
                <Text class="line-through" variant="list-price" tone="base-300">
                  {formatPrice(listPrice, offers!.priceCurrency!)}
                </Text>
                <div class="flex flex-row gap-[2px] justify-center items-center bg-camp-gray text-blue-text-discount text-[12px] rounded-[4px] sm:h-[30px] sm:w-[50px] sm:text-xs">
                  <Icon id="ArrowDown" width={10} height={10} strokeWidth={2} />
                  <span class="">
                    {Math.trunc((listPrice! - price!) / listPrice! * 100)}%
                  </span>
                </div>
              </div>
            )
            : ""}
          <div class="flex flex-col w-full">
            <span class="text-[12px] sm:text-[18px]">
              {price! > 0
                ? formatPrice(price, offers!.priceCurrency!)
                : "Item sem estoque"}
            </span>
            {/* a verificar */}
            {price! > 0
              ? (
                <span class="text-[8px] sm:text-[12px]">
                  12x {formatPrice(price! / 12, offers!.priceCurrency!)}{" "}
                  s/ juros no cartão de crédito
                </span>
              )
              : ""}
            <div
              href={url}
              class="flex flex-col justify-center content-center h-[40px] w-full pb-2 mb-1 mt-3 px-2 sm:hidden "
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
            </div>
          </div>
        </div>
      </a>
    </div>
  );
}

export default ProductCard;

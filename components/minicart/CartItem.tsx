import Image from "deco-sites/std/components/Image.tsx";
import Icon from "deco-sites/fashion/components/ui/Icon.tsx";
import Text from "deco-sites/fashion/components/ui/Text.tsx";
import Button from "deco-sites/fashion/components/ui/Button.tsx";
import QuantitySelector from "deco-sites/fashion/components/ui/QuantitySelector.tsx";
import { useCart } from "deco-sites/std/commerce/vtex/hooks/useCart.ts";
import { formatPrice } from "deco-sites/fashion/sdk/format.ts";
import { AnalyticsEvent } from "deco-sites/std/commerce/types.ts";

declare global {
  interface Window {
    DECO_SITES_STD: {
      sendAnalyticsEvent: (args: AnalyticsEvent) => void;
    };
  }
}

interface Props {
  index: number;
}

function CartItem({ index }: Props) {
  const { loading, cart, updateItems, mapItemsToAnalyticsItems } = useCart();
  const item = cart.value!.items[index];
  const locale = cart.value?.clientPreferencesData.locale;
  const currencyCode = cart.value?.storePreferencesData.currencyCode;
  const {
    imageUrl,
    skuName,
    sellingPrice,
    listPrice,
    name,
    quantity,
    additionalInfo: {
      brandName,
    },
  } = item;

  // console.log(item);

  const isGift = sellingPrice < 0.01;

  return (
    <div class="flex flex-row justify-between items-start gap-4">
      <Image
        src={imageUrl}
        alt={skuName}
        width={54}
        height={54}
        class="object-cover object-center"
      />
      <div class="flex-grow">
        <div class="flex">
          <div class="flex-grow flex flex-col items-start">
            <div class="leading-none">
              <span class="text-primary text-[12px] font-bold">
                {brandName}
              </span>
            </div>
            <span class="text-[12px] font-bold">
              {name}
            </span>
          </div>
          <Button
            onClick={() => {
              updateItems({ orderItems: [{ index, quantity: 0 }] });
              if (!cart.value) return;
              window.DECO_SITES_STD.sendAnalyticsEvent({
                name: "remove_from_cart",
                params: {
                  items: mapItemsToAnalyticsItems({
                    items: [item],
                    marketingData: cart.value.marketingData,
                  }),
                },
              });
            }}
            disabled={loading.value || isGift}
            loading={loading.value}
            variant="icon"
            class="text-primary"
          >
            <Icon id="Trash" width={20} height={20} />
          </Button>
        </div>
        <div class="mt-6 w-full flex justify-between">
          <QuantitySelector
            disabled={loading.value || isGift}
            quantity={quantity}
            variant="select"
            onChange={(quantity) => {
              updateItems({ orderItems: [{ index, quantity }] });
              const quantityDiff = quantity - item.quantity;

              if (!cart.value) return;

              window.DECO_SITES_STD.sendAnalyticsEvent({
                name: quantityDiff < 0 ? "remove_from_cart" : "add_to_cart",
                params: {
                  items: mapItemsToAnalyticsItems({
                    items: [{
                      ...item,
                      quantity: Math.abs(quantityDiff),
                    }],
                    marketingData: cart.value.marketingData,
                  }),
                },
              });
            }}
          />

          <div class="flex flex-col items-end">
            <span class="line-through text-base-300 text-[10px]">
              {formatPrice(listPrice / 100, currencyCode!, locale)}
            </span>
            <span class="text-[16px] font-bold">
              {isGift
                ? "Grátis"
                : formatPrice(sellingPrice / 100, currencyCode!, locale)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartItem;

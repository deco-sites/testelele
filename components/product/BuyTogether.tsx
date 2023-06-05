import type { LoaderReturnType } from "$live/types.ts";
import type { Product } from "deco-sites/std/commerce/types.ts";
import Container from "../ui/Container.tsx";
import Icon from "../ui/Icon.tsx";
import Image from "deco-sites/std/components/Image.tsx";
import { useOffer } from "../../sdk/useOffer.ts";
import { formatPrice } from "../../sdk/format.ts";

export interface Props {
  products: LoaderReturnType<Product[] | null>;
}

function BuyTogether({ products }: Props) {
  if (!products) return null;

  return (
    <Container>
      <div class="py-8 lg:px-4">
        <h2 class="text-[24px] font-bold  mb-[30px]">Compre Junto</h2>
        <div class="flex flex-col lg:flex-row w-full items-center gap-6">
          <ul class="flex gap-5 w-full flex-wrap">
            {products.map((product) => {
              const { listPrice, price, seller } = useOffer(product.offers);
              const [front] = product.image ?? [];

              return (
                <li class="flex rounded shadow-[0_4px_16px_0_rgba(0,0,0,.08)] max-h-[108px] p-5 max-w-[330px] gap-2">
                  <input type="checkbox" name="buyTogether" id={product.sku} />
                  <Image
                    src={front.url!}
                    alt={product.name}
                    width={67}
                    height={67}
                    class="object-cover object-center"
                  />
                  <div>
                    <span class="text-[12px] leading-none font-semibold line-clamp-3">
                      {product.name}
                    </span>
                    <a href={product.url}>
                      <div class="flex flex-col">
                        {listPrice && (
                          <span class="line-through text-base-300 text-[10px]">
                            {formatPrice(
                              listPrice,
                              product.offers!.priceCurrency!,
                            )}
                          </span>
                        )}
                        <span class="text-[16px] font-bold">
                          {formatPrice(price, product.offers!.priceCurrency!)}
                        </span>
                      </div>
                    </a>
                  </div>
                </li>
              );
            })}
          </ul>
          <button class="h-[48px] w-full min-w-[230px] lg:max-w-[230px]  bg-[#444] flex rounded text-white items-center justify-center">
            Quero esses produtos{" "}
            <Icon id="ShoppingCart" width={20} height={20} />
          </button>
        </div>
      </div>
    </Container>
  );
}

export default BuyTogether;

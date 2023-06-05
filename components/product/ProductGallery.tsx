import { Product } from "deco-sites/std/commerce/types.ts";
import { useUI } from "../../sdk/useUI.ts";

import ProductCard from "./ProductCard.tsx";
import ProductCardHorizontal from "./ProductCardHorizontal.tsx";

export interface Columns {
  mobile?: number;
  desktop?: number;
}

export interface Props {
  products: Product[] | null;
}

function ProductGallery({ products }: Props) {
  const { listingType } = useUI();
  if (listingType.value === "grid") {
    return (
      <div class="flex flex-wrap gap-2 lg:gap-4 pt-4 justify-center">
        {products?.map((product, index) => (
          <ProductCard product={product} preload={index === 0} />
        ))}
      </div>
    );
  } else {
    return (
      <div class="flex flex-col gap-4 pt-4">
        {products?.map((product, index) => (
          <ProductCardHorizontal product={product} preload={index === 0} />
        ))}
      </div>
    );
  }
}

export default ProductGallery;

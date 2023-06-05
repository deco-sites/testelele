import Button from "deco-sites/fashion/components/ui/Button.tsx";
import {
  Options as UseAddToCartProps,
  useAddToCart,
} from "deco-sites/fashion/sdk/useAddToCart.ts";

interface Props extends UseAddToCartProps {
  /**
   * @description Product id
   */
  sellerId: string;
  quantity?: number;
  variant?: string;
}

function AddToCartButton(
  { skuId, sellerId, discount, price, productGroupId, name, variant, quantity }:
    Props,
) {
  const props = useAddToCart({
    skuId,
    sellerId,
    discount,
    price,
    productGroupId,
    name,
    quantity,
  });

  return (
    <Button data-deco="add-to-cart" {...props} variant={"green"} class="w-full">
      Adicionar à Sacola
    </Button>
  );
}

export default AddToCartButton;

import Text from "deco-sites/fashion/components/ui/Text.tsx";
import Avatar from "deco-sites/fashion/components/ui/Avatar.tsx";
import { useVariantPossibilities } from "deco-sites/fashion/sdk/useVariantPossiblities.ts";
import type { Product } from "deco-sites/std/commerce/types.ts";

interface Props {
  product: Product;
}

function VariantSelector({ product }: Props) {
  const possibilities = useVariantPossibilities(product);
  const { url: currentUrl, isVariantOf } = product;

  const { additionalProperty } = isVariantOf ?? {};

  return (
    <ul class="flex flex-col gap-4">
      {Object.keys(possibilities).filter((name) =>
        name !== "category" && name !== "cluster"
      ).map((name) => (
        <li class="flex flex-col gap-2">
          <span class="font-bold text-[14px]">
            {name}
            {": "}
            <span class="text-primary">
              {additionalProperty?.find((prop) =>
                prop.name == name && prop.value !== "UNICA"
              )?.value}
            </span>
          </span>
          <ul class="flex flex-row gap-2">
            {Object.entries(possibilities[name]).map(([value, urls]) => {
              const url = urls.find((url) => url === currentUrl) || urls[0];

              let newValue = value;
              if (value == "UNICA") {
                newValue = additionalProperty?.find((prop) =>
                  prop.name == name && prop.value !== "UNICA"
                )?.value ?? value as string;
              }

              return (
                <li>
                  <a href={url}>
                    <Avatar
                      // deno-lint-ignore no-explicit-any
                      content={newValue as any}
                      disabled={url === currentUrl}
                      variant={name === "COR" ? "color" : "abbreviation"}
                    />
                  </a>
                </li>
              );
            })}
          </ul>
        </li>
      ))}
    </ul>
  );
}

export default VariantSelector;

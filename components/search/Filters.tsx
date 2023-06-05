import Text from "deco-sites/fashion/components/ui/Text.tsx";
import Avatar from "deco-sites/fashion/components/ui/Avatar.tsx";
import type {
  Filter,
  FilterToggle,
  ProductListingPage,
} from "deco-sites/std/commerce/types.ts";
import Icon from "../ui/Icon.tsx";

interface Props {
  filters: ProductListingPage["filters"];
}

const isToggle = (filter: Filter): filter is FilterToggle =>
  filter["@type"] === "FilterToggle";

function FilterValues({ key, values }: FilterToggle) {
  const flexDirection = key === "tamanho" || key === "cor"
    ? "flex-row"
    : "flex-col";

  return (
    <ul class={`flex flex-wrap gap-2 p-4 ${flexDirection}`}>
      {values.map(({ label, value, url, selected, quantity }) => {
        if (key === "cor") {
          return (
            <a href={url}>
              <Avatar
                // deno-lint-ignore no-explicit-any
                content={value as any}
                disabled={selected}
                variant="color"
              />
            </a>
          );
        }

        if (key === "tamanho") {
          return (
            <a href={url}>
              <Avatar
                content={label}
                disabled={selected}
                variant="abbreviation"
              />
            </a>
          );
        }

        return (
          <a href={url} class="flex items-center gap-2">
            <input type="checkbox" checked={selected} />
            <span class="text-[16px]">{label}</span>
            {
              /* <Text tone="base-300" variant="caption">
              ({quantity})
            </Text> */
            }
          </a>
        );
      })}
    </ul>
  );
}

function Filters({ filters }: Props) {
  return (
    <ul class="flex flex-col gap-6 mt-6 lg:mt-0">
      {filters
        .filter(isToggle)
        .map((filter) => (
          <li class="flex flex-col gap-4 px-4 lg:px-0">
            <details class="group">
              <summary class="list-none flex w-full justify-between">
                <span class="text-[16px] font-bold">{filter.label}</span>
                <Icon
                  id="ChevronDown"
                  width={20}
                  height={20}
                  strokeWidth={2}
                  class="text-primary transition-all group-open:rotate-180"
                />
              </summary>
              <FilterValues {...filter} />
            </details>
          </li>
        ))}
    </ul>
  );
}

export default Filters;

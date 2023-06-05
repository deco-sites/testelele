import Container from "deco-sites/fashion/components/ui/Container.tsx";
import Button from "deco-sites/fashion/components/ui/Button.tsx";
import Icon from "deco-sites/fashion/components/ui/Icon.tsx";
import Filters from "deco-sites/fashion/components/search/Filters.tsx";
import Sort from "deco-sites/fashion/components/search/Sort.tsx";
import Modal from "deco-sites/fashion/components/ui/Modal.tsx";
import { useSignal } from "@preact/signals";
import type { ProductListingPage } from "deco-sites/std/commerce/types.ts";
import GridListToggle from "./GridListToggle.tsx";

type Props =
  & Pick<ProductListingPage, "filters" | "sortOptions">
  & {
    displayFilter?: boolean;
  };

function SearchControls(
  { filters, displayFilter, sortOptions }: Props,
) {
  const open = useSignal(false);

  return (
    <div class="flex flex-col justify-end mb-4 p-4 sm:mb-0 sm:p-0 sm:gap-4 sm:flex-row sm:h-[53px] sm:border-b sm:border-base-200">
      <div class="flex flex-row items-center justify-between border-b border-base-200 sm:gap-4 sm:border-none">
        <Button
          class={displayFilter ? "" : "sm:hidden"}
          variant="ghost"
          onClick={() => {
            open.value = true;
          }}
        >
          Filtrar
          <Icon id="FilterList" width={16} height={16} />
        </Button>
        {sortOptions.length > 0 && <Sort sortOptions={sortOptions} />}
        <GridListToggle />
      </div>

      <Modal
        loading="lazy"
        title="Filtrar"
        mode="sidebar-right"
        open={open.value}
        onClose={() => {
          open.value = false;
        }}
      >
        <Filters filters={filters} />
      </Modal>
    </div>
  );
}

export default SearchControls;

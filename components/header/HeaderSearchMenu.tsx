import { lazy, Suspense } from "preact/compat";

import { useUI } from "deco-sites/fashion/sdk/useUI.ts";
import Loading from "deco-sites/fashion/components/ui/Loading.tsx";
import { headerHeight } from "deco-sites/fashion/components/header/constants.ts";
import type { Props as SearchbarProps } from "deco-sites/fashion/components/search/Searchbar.tsx";

const Searchbar = lazy(() =>
  import("deco-sites/fashion/components/search/Searchbar.tsx")
);

interface Props {
  searchbar: SearchbarProps;
}

export default function headerSearchBar({ searchbar }: Props) {
  const shouldRender = self?.location;

  return (
    <div
      class={"w-full"}
    >
      {shouldRender && (
        <Suspense fallback={<div />}>
          <Searchbar {...searchbar} />
        </Suspense>
      )}
    </div>
  );
}

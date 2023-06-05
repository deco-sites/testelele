import Modals from "deco-sites/fashion/islands/HeaderModals.tsx";
import type { Image } from "deco-sites/std/components/types.ts";
import type { EditableProps as SearchbarProps } from "deco-sites/fashion/components/search/Searchbar.tsx";
import type { LoaderReturnType } from "$live/types.ts";
import type { Product, Suggestion } from "deco-sites/std/commerce/types.ts";
import type { Image as LiveImage } from "deco-sites/std/components/types.ts";
import { useId } from "preact/hooks";

import Alert from "./Alert.tsx";
import Navbar from "./Navbar.tsx";
import { headerHeight } from "./constants.ts";
import ScrollTrackJS from "../../islands/ScrollTrackJS.tsx";

export interface NavItem {
  label: string;
  href: string;
  children?: Array<{
    label: string;
    href: string;
    children?: Array<{
      label: string;
      href: string;
    }>;
  }>;
  image?: {
    src: LiveImage;
    alt: string;
  };
}

export interface NavItemDesktop {
  label: string;
  href: string;
}

export interface Props {
  alert: { image: LiveImage; path: string };
  /** @title Search Bar */
  searchbar?: SearchbarProps;
  /**
   * @title Navigation items
   * @description Navigation items used both on mobile and desktop menus
   */
  navItems?: NavItem[];
  navItemsDesktop?: NavItemDesktop[];

  /**
   * @title Product suggestions
   * @description Product suggestions displayed on search
   */
  products?: LoaderReturnType<Product[] | null>;

  /**
   * @title Enable Top Search terms
   */
  suggestions?: LoaderReturnType<Suggestion | null>;
  image: {
    desktop: LiveImage;
    mobile: LiveImage;
  };
}

function Header(
  {
    alert,
    image,
    searchbar: _searchbar,
    products,
    navItems = [],
    navItemsDesktop = [],
    suggestions,
  }: Props,
) {
  const searchbar = { ..._searchbar, products, suggestions };
  const id = useId();

  return (
    <header style={{ height: headerHeight }}>
      <div id={id} class="bg-base-100 fixed w-full z-50 group">
        <Alert image={alert.image} path={alert.path} />
        <Navbar items={navItemsDesktop} searchbar={searchbar} image={image} />
        <ScrollTrackJS rootId={id} />
      </div>
      <Modals
        menu={{ items: navItems }}
        searchbar={searchbar}
      />
    </header>
  );
}

export default Header;

import HeaderButton from "deco-sites/fashion/islands/HeaderButton.tsx";
import Icon from "deco-sites/fashion/components/ui/Icon.tsx";
import Button from "deco-sites/fashion/components/ui/Button.tsx";
import Image from "deco-sites/std/components/Image.tsx";
import type { Image as LiveImage } from "deco-sites/std/components/types.ts";
import { useUI } from "../../sdk/useUI.ts";
import Text from "deco-sites/fashion/components/ui/Text.tsx";

import NavItem from "./NavItem.tsx";
import { navbarHeight } from "./constants.ts";
import HeaderSearchMenu from "deco-sites/fashion/islands/HeaderSearchMenu.tsx";
import type { INavItem } from "./NavItem.tsx";
import type { Props as SearchbarProps } from "deco-sites/fashion/components/search/Searchbar.tsx";

function Navbar({ items, searchbar, image }: {
  items: INavItem[];
  searchbar: SearchbarProps;
  image: {
    desktop: LiveImage;
    mobile: LiveImage;
  };
}) {
  const { displaySearchbar } = useUI();
  const open = displaySearchbar.value;
  return (
    <>
      {/* Mobile Version */}
      <div class="lg:hidden flex flex-col justify-between items-center w-full bg-white pr-4">
        <div class="lg:hidden flex flex-row justify-between items-center w-full gap-2">
          <div class="!bg-[#ed1b2f] rounded-br-[30px] h-[54px] w-[66px] flex items-center justify-center">
            <HeaderButton variant="menu" />
          </div>

          <a
            href="/"
            class="flex-grow inline-flex items-center pl-[25px]"
            style={{ minHeight: navbarHeight }}
            aria-label="Store logo"
          >
            <Image src={image.mobile} alt="logo" width={114} height={21} />
          </a>

          <div class="flex gap-2">
            <Image
              src="https://lebiscuit.vtexassets.com/assets/vtex/assets-builder/lebiscuit.le-store/1.2.114/svg/geral/blackfriday/__central___5ffa5a472896c28ee84ebd15c89b7a82.svg"
              width={30}
              height={30}
            />
            <Image
              src="https://lebiscuit.vtexassets.com/assets/vtex/assets-builder/lebiscuit.le-store/1.2.114/svg/geral/blackfriday/__login___55e0d0a6a008b5c070b32233488787b1.svg"
              width={24}
              height={24}
            />
            <HeaderButton variant="cart" />
          </div>
        </div>
        <div class="w-full">
          <HeaderSearchMenu searchbar={searchbar} />
        </div>
      </div>

      {/* Desktop Version */}
      <div class="hidden lg:flex border-b border-base-200 bg-white">
        <div class="hidden lg:flex flex-col border-b border-base-200 w-full pr-3 max-w-[1320px] mx-auto">
          <div class="h-[70px] flex flex-row items-center  bg-white isolate">
            <div class="flex-none w-44 bg-primary h-[55px] flex items-center self-start rounded-br-full after:w-screen after:h-[55px] after:absolute after:z-[-1] after:right-0  after:bg-[linear-gradient(90deg,#ed1b2f_17%,#fff_0)]  group-[.micro]:hidden">
              <a
                href="/"
                aria-label="Store logo"
                class="block px-4 py-3 w-[160px] "
              >
                <Image src={image.desktop} alt="logo" width={129} height={22} />
              </a>
            </div>
            <div class="hidden bg-white group-[.micro]:block">
              <div class="flex items-center gap-[10px]">
                <div class="!bg-[#ed1b2f] rounded h-[32px] w-[32px] flex items-center justify-center">
                  <HeaderButton variant="menu" />
                </div>
                <a
                  href="/"
                  aria-label="Store logo"
                  class="block px-4 py-3 w-[160px] "
                >
                  <Icon
                    id="Logo"
                    alt="logo"
                    width={129}
                    height={22}
                    class="text-primary"
                  />
                </a>
              </div>
            </div>
            <HeaderSearchMenu searchbar={searchbar} />
            <div class="flex gap-2">
              <div class="flex items-center gap-2">
                <Image
                  src="https://lebiscuit.vtexassets.com/assets/vtex.file-manager-graphql/images/d7838ef6-cbea-4c52-9a3b-e04a76a4fca3___225f8a774cc2394aae97d166fd42e0c5.svg"
                  width={30}
                  height={30}
                />
                <Text class="!text-[10px] !leading-[14px] w-max font-medium">
                  Ver ofertas na região
                </Text>
              </div>
              <div class="flex items-center gap-2">
                <Image
                  src="https://lebiscuit.vtexassets.com/assets/vtex/assets-builder/lebiscuit.le-store/1.2.114/svg/geral/blackfriday/__central___5ffa5a472896c28ee84ebd15c89b7a82.svg"
                  width={30}
                  height={30}
                />
                <Text class="!text-[10px] !leading-[14px] w-max font-medium">
                  Central de atendimento
                </Text>
              </div>
              <div class="flex items-center gap-2">
                <Image
                  src="https://lebiscuit.vtexassets.com/assets/vtex/assets-builder/lebiscuit.le-store/1.2.114/svg/geral/blackfriday/__pedidos___59107f5918142e12d5b5534aa5350583.svg"
                  width={30}
                  height={30}
                />
                <Text class="!text-[10px] !leading-[14px] w-max font-medium">
                  Meus pedidos
                </Text>
              </div>
              <div class="flex items-center gap-2">
                <Image
                  src="https://lebiscuit.vtexassets.com/assets/vtex/assets-builder/lebiscuit.le-store/1.2.114/svg/geral/blackfriday/__login___55e0d0a6a008b5c070b32233488787b1.svg"
                  width={24}
                  height={24}
                />
                <Text class="!text-[10px] !leading-[14px] w-max font-medium">
                  Olá! Entrar
                </Text>
              </div>
              <div class="flex items-center gap-2">
                <HeaderButton variant="cart" />
                <Text class="!text-[10px] !leading-[14px] w-max font-medium">
                  Minha sacola
                </Text>
              </div>
            </div>
          </div>
          <div class="flex flex-row items-center px-5 pb-2 justify-between group-[.micro]:hidden">
            <div class="flex items-center gap-[10px]">
              <div class="!bg-[#ed1b2f] rounded h-[32px] w-[32px] flex items-center justify-center">
                <HeaderButton variant="menu" />
              </div>
              <Text class="text-primary font-semibold">
                Todos os departamentos
              </Text>
            </div>
            <div class="flex-auto flex justify-around">
              {items.map((item) => <NavItem item={item} />)}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Navbar;

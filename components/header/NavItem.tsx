import Text from "deco-sites/fashion/components/ui/Text.tsx";
import type { Image as LiveImage } from "deco-sites/std/components/types.ts";
import { headerHeight } from "./constants.ts";

export interface INavItem {
  image?: {
    src: LiveImage;
    alt: string;
  };
  label: string;
  href: string;
  children?: INavItem[];
}

function NavItem({ item }: { item: INavItem }) {
  const { href, label, children } = item;

  return (
    <li class="group flex items-center">
      <a href={href} class="px-4">
        <Text class="group-hover:underline" variant="menu">
          {label}
        </Text>
      </a>

      {children && children.length > 0 &&
        (
          <div
            class="fixed hidden hover:flex group-hover:flex bg-base-100 z-50 items-start justify-center gap-6 border-t border-b-2 border-base-200 w-screen"
            style={{ top: "0px", left: "0px", marginTop: headerHeight }}
          >
            <ul class="flex items-start justify-center gap-6">
              {children.map((node) => (
                <li class="p-6">
                  <a class="hover:underline" href={node.href}>
                    <Text variant="menu">{node.label}</Text>
                  </a>

                  <ul class="flex flex-col gap-1 mt-4">
                    {node.children?.map((leaf) => (
                      <li>
                        <a class="hover:underline" href={leaf.href}>
                          <Text variant="caption">{leaf.label}</Text>
                        </a>
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
          </div>
        )}
    </li>
  );
}

export default NavItem;

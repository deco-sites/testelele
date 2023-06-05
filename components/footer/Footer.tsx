import Icon, {
  AvailableIcons,
} from "deco-sites/fashion/components/ui/Icon.tsx";
import Text from "deco-sites/fashion/components/ui/Text.tsx";
import Container from "deco-sites/fashion/components/ui/Container.tsx";
import type { Image as LiveImage } from "deco-sites/std/components/types.ts";
import Image from "deco-sites/std/components/Image.tsx";

import Newsletter from "./Newsletter.tsx";
import type { ComponentChildren } from "preact";

export type IconItem = { icon: AvailableIcons };
export type StringItem = {
  label: string;
  href: string;
};

export type Item = StringItem | IconItem;

export type Section = {
  label: string;
  children: Item[];
};

const isIcon = (item: Item): item is IconItem =>
  // deno-lint-ignore no-explicit-any
  typeof (item as any)?.icon === "string";

function SectionItem({ item }: { item: Item }) {
  return (
    <Text
      variant="caption"
      tone="primary-content"
      class="!text-gray-icon !text-base !leading-[22.5px]"
    >
      {isIcon(item)
        ? (
          <div class="border-base-100 border border-solid py-1.5 px-2.5">
            <Icon
              id={item.icon}
              width={25}
              height={20}
              strokeWidth={0.01}
            />
          </div>
        )
        : (
          <a href={item.href}>
            {item.label}
          </a>
        )}
    </Text>
  );
}

function FooterContainer(
  { children, class: _class = "" }: {
    class?: string;
    children: ComponentChildren;
  },
) {
  return <div class={`py-6 sm:py-12 flex flex-col ${_class}`}>{children}</div>;
}

export interface Props {
  sections?: Section[];
  socials: LiveImage[];
}

function Footer({ sections = [], socials }: Props) {
  return (
    <footer class="w-full flex flex-col ">
      <div>
        <Container class="w-full flex flex-col ">
          <FooterContainer>
            <Newsletter />
          </FooterContainer>
        </Container>
        <div class="w-full h-2 bg-camp-gray" />
        <Container class="w-full flex flex-col ">
          <FooterContainer>
            <div class="flex flex-col gap-[9px] p-2">
              <Text class="!text-[9px] !leading-[13.5px] font-medium">
                *RETIRADA EXPRESSA
              </Text>
              <Text class="!text-[9px] !leading-[13.5px]">
                O prazo pode variar conforme dia da semana e horário de
                funcionamento na loja. Confira as lojas participantes e prazo
                final antes de finalizar sua compra. Prazo começa a ser contado
                após a aprovação da compra. Sujeito a disponibilidade de estoque
                na loja.
              </Text>
            </div>
            {/* Desktop view */}
            <ul class="hidden lg:flex flex-row gap-20 px-2 pt-[48px]">
              {sections.map((section) => (
                <li>
                  <div>
                    <Text
                      variant="heading-3"
                      tone="primary-content"
                      class="!text-black !text-base"
                    >
                      {section.label}
                    </Text>

                    <ul
                      class={`flex ${
                        isIcon(section.children[0]) ? "flex-row" : "flex-col"
                      } gap-2 pt-2 flex-wrap  `}
                    >
                      {section.children.map((item) => (
                        <li>
                          <SectionItem item={item} />
                        </li>
                      ))}
                    </ul>
                  </div>
                </li>
              ))}
            </ul>
            <div class="hidden lg:flex flex-col self-end items-start pb-2 pt-5 max-w-[320px]">
              <div class="flex gap-4 mb-[22px]">
                <Image
                  width={131}
                  height={44}
                  alt="app download"
                  src="https://lebiscuit.vtexassets.com/assets/vtex.file-manager-graphql/images/c95e176a-6e93-43e7-8892-d63a65349241___c30f106b2ecf911efe78c9e34cca3a4e.svg"
                />
                <Image
                  width={131}
                  height={44}
                  alt="app download"
                  src="https://lebiscuit.vtexassets.com/assets/vtex.file-manager-graphql/images/4ae0af3c-45de-4c5e-9e60-0774adcdf0c9___971446451009eb3aac1946f7592ea248.svg"
                />
              </div>
              <Text class="font-bold text-gray-icon">Siga a Le Biscuit</Text>
              <ul class="flex gap-4 my-2">
                {socials.map((social) => (
                  <li>
                    <Image
                      src={social}
                      width={36}
                      height={36}
                      alt="social icon"
                    />
                  </li>
                ))}
              </ul>
            </div>

            {/* Mobile view */}
            <>
              <div class="flex flex-col lg:hidden items-center bg-camp-gray pb-2 pt-5">
                <div class="flex gap-4 mb-[22px]">
                  <Image
                    width={131}
                    height={44}
                    alt="app download"
                    src="https://lebiscuit.vtexassets.com/assets/vtex.file-manager-graphql/images/c95e176a-6e93-43e7-8892-d63a65349241___c30f106b2ecf911efe78c9e34cca3a4e.svg"
                  />
                  <Image
                    width={131}
                    height={44}
                    alt="app download"
                    src="https://lebiscuit.vtexassets.com/assets/vtex.file-manager-graphql/images/4ae0af3c-45de-4c5e-9e60-0774adcdf0c9___971446451009eb3aac1946f7592ea248.svg"
                  />
                </div>
                <Text class="font-bold text-gray-icon">Siga a Le Biscuit</Text>
                <ul class="flex gap-4 my-2">
                  {socials.map((social) => (
                    <li>
                      <Image
                        src={social}
                        width={36}
                        height={36}
                        alt="social icon"
                      />
                    </li>
                  ))}
                </ul>
              </div>
              <ul class="flex flex-col lg:hidden gap-4 pt-10">
                {sections.map((section) => (
                  <li>
                    <Text variant="body" tone="primary-content">
                      <details class="group pb-10 border-b border-gray-border overflow-hidden">
                        <summary class="list-none flex items-center justify-between text-gray-icon z-10 transition-all font-bold duration-300 px-2 -mb-5 ease-in-out group-open:mb-0 bg-white">
                          {section.label}
                          <Icon
                            id="ChevronDown"
                            width={15}
                            height={20}
                            strokeWidth={4}
                            class="transition-all duration-300 group-open:rotate-180 text-gray-icon"
                          />
                        </summary>

                        <ul
                          class={`flex ${
                            isIcon(section.children[0])
                              ? "flex-row"
                              : "flex-col"
                          } gap-2 px-2 pt-2 z-0`}
                        >
                          {section.children.map((item) => (
                            <li>
                              <SectionItem item={item} />
                            </li>
                          ))}
                        </ul>
                      </details>
                    </Text>
                  </li>
                ))}
              </ul>
            </>
          </FooterContainer>
        </Container>
      </div>

      <div class="bg-camp-gray">
        <Container class="w-full">
          <FooterContainer class="flex !flex-row justify-between items-center w-full">
            <Text
              class="flex items-center gap-1"
              variant="body"
              tone="primary-content"
            >
              Powered by{" "}
              <a
                href="https://www.deco.cx"
                aria-label="powered by https://www.deco.cx"
              >
                <Icon id="Deco" height={20} width={60} strokeWidth={0.01} />
              </a>
            </Text>

            <ul class="flex items-center justify-center gap-2">
              <li>
                <a
                  href="https://www.instagram.com/deco.cx"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram logo"
                >
                  <Icon
                    class="text-primary-content"
                    width={32}
                    height={32}
                    id="Instagram"
                    strokeWidth={1}
                  />
                </a>
              </li>
              <li>
                <a
                  href="http://www.deco.cx/discord"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Discord logo"
                >
                  <Icon
                    class="text-primary-content"
                    width={32}
                    height={32}
                    id="Discord"
                    strokeWidth={5}
                  />
                </a>
              </li>
            </ul>
          </FooterContainer>
        </Container>
      </div>
    </footer>
  );
}

export default Footer;

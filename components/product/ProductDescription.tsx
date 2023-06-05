import Container from "../ui/Container.tsx";
import type { LoaderReturnType } from "$live/types.ts";
import type { ProductDetailsPage } from "deco-sites/std/commerce/types.ts";
import Text from "deco-sites/fashion/components/ui/Text.tsx";
import { useSignal } from "@preact/signals";

export interface Props {
  page: LoaderReturnType<ProductDetailsPage | null>;
}

function ProductDescription({ page }: Props) {
  const open = useSignal(false);

  if (!page) return null;

  const {
    product: { description },
  } = page;

  return (
    <div class="bg-gray-100">
      <Container class="py-0 sm:py-10">
        {/* Description*/}
        <div
          class={`pt-4 sm:pt-6 relative overflow-hidden transition-all ${
            open.value ? "" : "max-h-[200px] "
          }`}
          id="description"
        >
          <Text variant="caption">
            {description && (
              <div>
                <h2 class="text-[20px] font-bold mb-[12px]">
                  Descrição do produto
                </h2>
                <div>
                  <span
                    class="text-[14px] leading-[25px] whitespace-break-spaces"
                    dangerouslySetInnerHTML={{ __html: description }}
                  >
                  </span>
                </div>
              </div>
            )}
          </Text>
          <div
            class={`absolute bottom-0 right-0 left-0 ${
              open.value ? "" : "bg-[linear-gradient(transparent,#fff)]"
            }  flex justify-center itens-end h-[100px]`}
          >
            <button
              class="bg-base-200 p-2 leading-none text-primary h-min"
              onClick={() => {
                if (open.value) {
                  open.value = false;
                  return;
                }
                open.value = true;
              }}
            >
              {open.value ? "ver menos" : "ver mais"}
            </button>
          </div>
        </div>
      </Container>
    </div>
  );
}

export default ProductDescription;

import Container from "../ui/Container.tsx";
import type { LoaderReturnType } from "$live/types.ts";
import type { ProductDetailsPage } from "deco-sites/std/commerce/types.ts";

export interface Props {
  page: LoaderReturnType<ProductDetailsPage | null>;
}

function ProductSpecification({ page }: Props) {
  if (!page) return null;

  return (
    <div class="bg-gray-100 pt-[32px]">
      <Container>
        <div class="flex flex-col lg:flex-row gap-[60px]">
          <div class="w-full lg:max-w-[50%]">
            <h2 class="text-[20px] font-bold mb-[12px] pl-[23px]">
              Especificações
            </h2>
            <div class="bg-white rounded-md py-[10px] px-[15px]">
              <ul class=" divide-y-2 ">
                {page.product.isVariantOf?.additionalProperty.map(
                  (item) => {
                    return (
                      <li class="py-[8px] px-[16px] w-full text-[14px] flex items-center">
                        <div class="w-[50%] lg:w-[33%]">
                          <span class="font-bold inline-block">
                            {item.name}:
                          </span>
                        </div>
                        <div class="max-w-[50%] lg:max-w=[66%]">
                          <span
                            dangerouslySetInnerHTML={{
                              __html: item.value ?? "",
                            }}
                          >
                          </span>
                        </div>
                      </li>
                    );
                  },
                )}
              </ul>
            </div>
          </div>
          <div>
          </div>
        </div>
      </Container>
    </div>
  );
}

export default ProductSpecification;

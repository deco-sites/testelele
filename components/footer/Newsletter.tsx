import Text from "deco-sites/fashion/components/ui/Text.tsx";
import Image from "deco-sites/std/components/Image.tsx";

function Newsletter() {
  return (
    <div class="flex flex-col sm:flex-row items-center gap-6 sm:gap-20 bg-white sm:justify-between px-2">
      <div class="flex items-center gap-12">
        <Image
          class="hidden lg:block"
          src="https://lebiscuit.vtexassets.com/assets/vtex/assets-builder/lebiscuit.le-store/1.2.114/svg/desktop/lebiscuit-news-logo___e2b96d3861d9c4d46c63aca2024fbd52.svg"
          width={68}
          height={68}
          alt="logo"
        />
        <div class="flex flex-col gap-2 max-w-[540px] items-center lg:items-start">
          <Text
            variant="heading-2"
            tone="primary-content"
            class="!text-dark-red"
          >
            Newsletter Le
          </Text>
          <Text
            variant="caption"
            tone="primary-content"
            class="!text-gray-icon text-center lg:text-left"
          >
            Quer saber todas as novidades, lançamentos e vantagens exclusivas de
            nossa loja? Deixe seu e-mail com a gente.
          </Text>
        </div>
      </div>
      <form class="flex flex-row gap-2 font-body text-body w-full sm:w-[408px]">
        <input
          class="py-3 px-3 flex-grow rounded text-primary-content border border-solid border-gray-border placeholder:text-gray-icon"
          placeholder="Digite seu e-mail"
        />
        <button
          class="py-2 px-3 bg-dark-red text-white rounded-lg font-semibold"
          type="bgutton" // prevent form's default behavior
        >
          Cadastrar
        </button>
      </form>
    </div>
  );
}

export default Newsletter;

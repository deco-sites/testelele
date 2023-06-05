import { useSignal } from "@preact/signals";
import { useCallback } from "preact/hooks";
import Button from "deco-sites/fashion/components/ui/Button.tsx";
import Input from "deco-sites/fashion/components/ui/Input.tsx";
import Text from "deco-sites/fashion/components/ui/Text.tsx";
import { formatPrice } from "deco-sites/fashion/sdk/format.ts";
import { useCart } from "deco-sites/std/commerce/vtex/hooks/useCart.ts";
import type {
  SimulationOrderForm,
  SKU,
  Sla,
} from "deco-sites/std/commerce/vtex/types.ts";
import Icon from "./Icon.tsx";

export interface Props {
  items: Array<SKU>;
}

const handleShippingTime = (estimate: string) => {
  const [, time, type] = estimate.split(/(\d+)/);

  if (type === "bd") return `${time} dias úteis`;
  if (type === "d") return `${time} dias`;
  if (type === "h") return `${time} horas`;
};

function ShippingContentError() {
  return (
    <div class="p-2">
      <span>CEP inválido</span>
    </div>
  );
}

function ShippingContent(
  { simulation, locale, currencyCode }: {
    simulation: SimulationOrderForm;
    locale: string;
    currencyCode: string;
  },
) {
  if (!simulation.logisticsInfo?.length) {
    return <ShippingContentError />;
  }

  const methods = simulation.logisticsInfo.reduce<Sla[]>(
    (initial, logistic) => {
      return [...initial, ...logistic.slas];
    },
    [],
  );

  if (!methods.length) {
    return <ShippingContentError />;
  }

  return (
    <ul class="flex flex-col gap-2 rounded-[4px] border-y py-2">
      {methods.map((method) => (
        <li class="flex justify-between items-center border border-base-200 not-first-child:border-t p-4 rounded-md h-[80px]">
          <Text variant="body" class="text-button max-w-[30%] line-clamp-3">
            {method.pickupStoreInfo.friendlyName ||
              method.name}
          </Text>
          <Text variant="body" class="text-button">
            Em até {handleShippingTime(method.shippingEstimate)}
          </Text>
          <span class="text-[14px] text-right border-l pl-1">
            {method.price === 0 ? "Grátis" : (
              formatPrice(method.price / 100, currencyCode!, locale)
            )}
          </span>
        </li>
      ))}
    </ul>
  );
}

function ShippingSimulation({ items }: Props) {
  const postalCode = useSignal("");
  const loading = useSignal(false);
  const simulateResult = useSignal<SimulationOrderForm | null>(null);

  const { simulate, cart } = useCart();

  const locale = cart.value?.clientPreferencesData.locale || "pt-BR";
  const currencyCode = cart.value?.storePreferencesData.currencyCode || "BRL";

  const handleSimulation = useCallback(() => {
    const simulationData = {
      items: items,
      postalCode: postalCode.value,
      country: cart.value?.storePreferencesData.countryCode || "BRA",
    };

    if (postalCode.value.length == 8) {
      loading.value = true;
      simulate(simulationData)
        .then((result) => {
          simulateResult.value = result;
          loading.value = false;
        });
    }
  }, []);

  return (
    <>
      <div class="flex flex-col gap-2">
        <div class="flex">
          <Text variant="body" class="inline-flex">
            <Icon
              id="Truck"
              width={22}
              height={22}
              strokeWidth={1}
              class="mr-[10px]"
            />
            Taxa e prazo de entrega
          </Text>
        </div>
        <div>
          <form
            class="flex gap-2"
            onSubmit={(e) => {
              e.preventDefault();
              handleSimulation();
            }}
          >
            <Input
              as="input"
              type="text"
              variant="input"
              class="w-full p-2 max-w-[220px] rounded-[4px] border border-solid border-base-200 h-[40px]"
              placeholder="Seu cep aqui"
              onChange={(e: { currentTarget: { value: string } }) => {
                postalCode.value = e.currentTarget.value;
              }}
              value={postalCode.value}
              maxlength={8}
            >
            </Input>
            <Button
              type="submit"
              loading={loading.value}
            >
              Calcular
            </Button>
          </form>
        </div>
        <a
          href="https://buscacepinter.correios.com.br/app/endereco/index.php?t"
          class="underline"
          target="_blank"
        >
          Não sei meu cep
        </a>

        <div>
          {simulateResult.value && (
            <div>
              <ShippingContent
                simulation={simulateResult.value}
                locale={locale}
                currencyCode={currencyCode}
              />
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default ShippingSimulation;

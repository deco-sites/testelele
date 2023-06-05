import Button from "../ui/Button.tsx";

interface Props {
  quantity: number;
  disabled?: boolean;
  loading?: boolean;
  onChange?: (quantity: number) => void;
  variant?: "select" | "stepper";
}

const QUANTITY_MAX_VALUE = 100;

// Remove default browser behavior: https://www.w3schools.com/howto/howto_css_hide_arrow_number.asp
// TODO: Figure out how to add it via tailwind config.
const innerStyle = `
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

input[type="number"] {
  -moz-appearance: textfield;
}
`;

function QuantitySelector(
  { onChange, quantity, disabled, loading, variant = "stepper" }: Props,
) {
  const decrement = () => onChange?.(Math.max(0, quantity - 1));

  const increment = () =>
    onChange?.(Math.min(quantity + 1, QUANTITY_MAX_VALUE));

  if (variant == "select") {
    const options = [];

    // Adiciona 10 elementos option ao array
    for (let i = 1; i < 10; i++) {
      options.push(
        <option key={i} value={i} selected={i === quantity}>{i}</option>,
      );
    }

    return (
      <div class="flex items-center">
        <select name="quantity" id="quantity" class="w-[72px] border">
          {options}
        </select>
      </div>
    );
  }

  return (
    <div class="flex items-center">
      <Button
        class="h-9 w-9 border border-base-200"
        variant="icon"
        onClick={decrement}
        disabled={disabled}
        loading={loading}
      >
        -
      </Button>
      <style dangerouslySetInnerHTML={{ __html: innerStyle }} />
      <input
        class="text-center text-base-content text-body font-body bg-transparent outline-none disabled:opacity-50 border border-base-200 rounded"
        type="number"
        inputMode="numeric"
        pattern="[0-9]*"
        max={QUANTITY_MAX_VALUE}
        min={1}
        value={quantity}
        disabled={disabled}
        onBlur={(e) => onChange?.(e.currentTarget.valueAsNumber)}
      />
      <Button
        class="h-9 w-9 border border-base-200"
        variant="icon"
        onClick={increment}
        disabled={disabled}
        loading={loading}
      >
        +
      </Button>
    </div>
  );
}

export default QuantitySelector;

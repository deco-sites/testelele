import Icon from "deco-sites/fashion/components/ui/Icon.tsx";
import { useUI } from "../../sdk/useUI.ts";

function GridListToggle() {
  const { listingType } = useUI();
  return (
    <div class="flex rounded-md overflow-hidden">
      <button
        onClick={() => listingType.value = "grid"}
        class={`${
          listingType.value === "grid" ? "bg-primary" : "bg-camp-gray"
        } flex items-center gap-1 p-[6px]`}
      >
        <Icon
          id="Grid"
          width={16}
          height={16}
          strokeWidth={2}
          class={`${
            listingType.value === "grid" ? "text-white" : "text-gray-icon"
          } text-base sm:text-[8px]`}
        />
        <p
          class={`${
            listingType.value === "grid" ? "text-white" : "text-gray-icon"
          } hidden sm:block text-sm`}
        >
          Grade
        </p>
      </button>
      <button
        onClick={() => listingType.value = "list"}
        class={`${
          listingType.value === "list" ? "bg-primary" : "bg-camp-gray"
        } flex items-center gap-1 p-[6px]`}
      >
        <Icon
          id="List"
          width={16}
          height={16}
          strokeWidth={2}
          class={`${
            listingType.value === "list" ? "text-white" : "text-gray-icon"
          } text-base sm:text-[8px]`}
        />
        <p
          class={`${
            listingType.value === "list" ? "text-white" : "text-gray-icon"
          } hidden sm:block text-sm`}
        >
          Lista
        </p>
      </button>
    </div>
  );
}

export default GridListToggle;

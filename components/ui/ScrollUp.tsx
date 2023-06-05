import Button from "./Button.tsx";
import Icon from "./Icon.tsx";

function enableArrowUp() {
  let buttonEl: Element | null;

  globalThis.addEventListener("scroll", () => {
    if (!buttonEl) {
      buttonEl = document.querySelector("button[data-arrow-up]");

      if (!buttonEl) return;

      buttonEl.addEventListener("click", () => {
        window.scrollTo({ left: 0, top: 0, behavior: "smooth" });
      });
    }

    if (!buttonEl) return;

    if (window.scrollY > 400) {
      buttonEl.classList.remove("hidden");
    } else {
      buttonEl.classList.add("hidden");
    }
  });
}

export default function ScrollUp() {
  return (
    <>
      <script
        dangerouslySetInnerHTML={{ __html: `(${enableArrowUp.toString()})()` }}
      />
      <Button
        class="hidden fixed bottom-4 right-4 text-white"
        data-arrow-up=""
      >
        <Icon id="ChevronUp" width={20} height={20} strokeWidth={3} />
      </Button>
    </>
  );
}

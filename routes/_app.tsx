import { AppProps } from "$fresh/server.ts";
import GlobalTags from "deco-sites/fashion/components/GlobalTags.tsx";
import ScrollUp from "../components/ui/ScrollUp.tsx";

function App(props: AppProps) {
  return (
    <>
      {/* Include fonts, icons and more */}
      <GlobalTags />

      {/* Rest of Preact tree */}
      <props.Component />

      <ScrollUp />
    </>
  );
}

export default App;

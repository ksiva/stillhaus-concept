import { defineConfig } from "astro/config";

// Spec / concept site. Hosted on GitHub Pages under /stillhaus-concept/.
export default defineConfig({
  site: "https://ksiva.github.io",
  base: "/stillhaus-concept",
  trailingSlash: "always",
  image: { responsiveStyles: true },
});

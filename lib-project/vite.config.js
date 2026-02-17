import { defineConfig } from "vite";
import viteImagemin from "@vheemstra/vite-plugin-imagemin";

export default defineConfig({
  plugins: [
    viteImagemin({
 optipng: {
  optimizationLevel: 2,
},
      pngquant: {
        quality: [0.7, 0.85],
        speed: 6,
      },

      svgo: {
        plugins: [
          {
            name: "preset-default",
            params: {
              overrides: {
                removeViewBox: false,
              },
            },
          },
          "removeDimensions",
        ],
      },
    }),
  ],
});

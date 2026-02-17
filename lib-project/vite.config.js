import { defineConfig } from 'vite';
import viteImagemin from 'vite-plugin-imagemin';

export default defineConfig({
  base: '/openLibrary/',
  plugins: [
    viteImagemin({
      pngquant: {
        quality: [0.7, 0.85],
        speed: 6,
      },
      svgo: {
        plugins: [
          {
            name: 'preset-default',
            params: {
              overrides: {
                removeViewBox: false,
              },
            },
          },
          'removeDimensions',
        ],
      },
    }),
  ],
});

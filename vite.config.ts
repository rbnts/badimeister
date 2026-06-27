import { sveltekit } from "@sveltejs/kit/vite";
import { defineConfig } from "vite";

const bernProxyPrefix = /^\/bern/;

export default defineConfig({
  plugins: [sveltekit()],
  css: {
    preprocessorOptions: {
      scss: {
        quietDeps: true
      }
    }
  },
  server: {
    proxy: {
      "/bern": {
        target: "https://sportamtbern-api.webcloud7.ch",
        changeOrigin: true,
        rewrite: path => path.replace(bernProxyPrefix, "/sportanlagen/outdoor-anlagen/freibaeder")
      }
    }
  }
});

import { defineConfig } from "vitest/config";
import { loadEnv } from "vite";
import vue from "@vitejs/plugin-vue";
import vuetify from "vite-plugin-vuetify";
import { fileURLToPath } from "node:url";

export default defineConfig(({ mode }) => {
  // Load env file based on `mode`
  const env = loadEnv(mode, process.cwd(), "");

  return {
    plugins: [vue(), vuetify({ autoImport: true })],
    test: {
      globals: true,
      environment: "jsdom",
      setupFiles: "src/test/setup.ts",
      server: {
        deps: {
          inline: ["vuetify"],
        },
      },
    },
    resolve: {
      alias: {
        "@": fileURLToPath(new URL("./src", import.meta.url)),
      },
    },
    // Expose env variables to the app
    define: {
      "import.meta.env.VITE_API_BASE_URL": JSON.stringify(
        env.VITE_API_BASE_URL
      ),
    },
  };
});

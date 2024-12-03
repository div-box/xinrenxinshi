/* eslint-disable no-undef */
import { fileURLToPath, URL } from "node:url";
import topLevelAwait from "vite-plugin-top-level-await";
import { defineConfig, loadEnv } from "vite";
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";
import vueSetupExtend from "vite-plugin-vue-setup-extend-plus";
import viteCompression from "vite-plugin-compression";
import AutoImport from "unplugin-auto-import/vite";

const autoImportSettings = {
  imports: ["vue", "vue-router", "@vueuse/core", "pinia", { '/@/utils/dayjs': ['hcDayjs'] }],
  dts: "./src/types/auto-imports.d.ts",
  eslintrc: {
    enabled: true,
  },
  dirs: [
    './src/i18n',
    './src/utils/dayjs',
  ]
};

// https://vitejs.dev/config/
const viteConfig = defineConfig((mode) => {
  const env = loadEnv(mode.mode, process.cwd());
  return {
    plugins: [vue(), vueSetupExtend(), topLevelAwait({
      // The export name of top-level await promise for each chunk module
      promiseExportName: "__tla",
      // The function to generate import names of top-level await promise in each chunk module
      promiseImportName: i => `__tla_${i}`
    }), AutoImport(autoImportSettings), viteCompression(), vueJsx(),],
    resolve: {
      alias: {
        "/@": fileURLToPath(new URL("./src", import.meta.url)),
      },
    },
    // base: env.VITE_PUBLIC_PATH,
    base: "./",
    server: {
      host: "0.0.0.0",
      port: env.VITE_PORT,
      open: JSON.parse(env.VITE_OPEN),
      cors: true,
      hmr: true,
      proxy: {
        "/localapi": {
          target: env.VITE_TARGET_URL,
          changeOrigin: true,
          rewrite: (path) => {
            return path.replace(/^\/localapi/, "");
          },
        },
      },
      configure: (proxy, options) => {
        console.log(proxy, options);
      },
    },
    build: {
      outDir: "dist",
      chunkSizeWarningLimit: 1500,
      rollupOptions: {
        output: {
          chunkFileNames: "assets/js/[name]-[hash].js",
          entryFileNames: "assets/js/[name]-[hash].js",
          assetFileNames: "assets/[ext]/[name]-[hash].[ext]",
          manualChunks(id) {
            if (id.includes("node_modules")) {
              return id.toString().match(/\/node_modules\/(?!.pnpm)(?<moduleName>[^\/]*)\//)?.groups.moduleName ?? "vender";
            }
          },
        },
      },
    },
    esbuild: {
      pure: ["console.log"],
      minify: true,
    },
    css: { preprocessorOptions: { css: { charset: false } } },
    define: {
      __VUE_I18N_LEGACY_API__: JSON.stringify(false),
      __VUE_I18N_FULL_INSTALL__: JSON.stringify(false),
      __INTLIFY_PROD_DEVTOOLS__: JSON.stringify(false),
      __HC_VERSION__: JSON.stringify(process.env.npm_package_version),
      __HC_NAME__: JSON.stringify(process.env.npm_package_name),
    },
  };
});
export default viteConfig;

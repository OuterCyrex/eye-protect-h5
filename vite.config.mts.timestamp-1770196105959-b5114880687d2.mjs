// build/vite/plugins/index.ts
import vue from "file:///D:/frontsProject/eye-protect-h5/node_modules/@vitejs/plugin-vue/dist/index.mjs";
import vueJsx from "file:///D:/frontsProject/eye-protect-h5/node_modules/@vitejs/plugin-vue-jsx/dist/index.mjs";

// build/vite/plugins/svgIcons.ts
import { createSvgIconsPlugin } from "file:///D:/frontsProject/eye-protect-h5/node_modules/vite-plugin-svg-icons/dist/index.mjs";
import path from "path";
var ConfigSvgIconsPlugin = (isBuild) => {
  return createSvgIconsPlugin({
    // 指定需要缓存的图标文件夹
    iconDirs: [path.resolve(process.cwd(), "src/assets/icons")],
    // 指定symbolId格式
    symbolId: "icon-[dir]-[name]",
    svgoOptions: isBuild
  });
};

// build/vite/plugins/component.ts
import Components from "file:///D:/frontsProject/eye-protect-h5/node_modules/unplugin-vue-components/dist/vite.mjs";
import { VueUseComponentsResolver } from "file:///D:/frontsProject/eye-protect-h5/node_modules/unplugin-vue-components/dist/resolvers.mjs";
import NutUIResolver from "file:///D:/frontsProject/eye-protect-h5/node_modules/@nutui/auto-import-resolver/dist/index.mjs";
import { VarletImportResolver } from "file:///D:/frontsProject/eye-protect-h5/node_modules/@varlet/import-resolver/lib/index.js";
import { VantResolver } from "file:///D:/frontsProject/eye-protect-h5/node_modules/@vant/auto-import-resolver/dist/index.js";
var ConfigAutoComponentsPlugin = () => {
  return Components({
    dirs: ["src/components"],
    extensions: ["vue", "md"],
    deep: true,
    dts: "types/components.d.ts",
    directoryAsNamespace: false,
    globalNamespaces: [],
    directives: true,
    include: [/\.vue$/, /\.vue\?vue/, /\.md$/],
    exclude: [/[\\/]node_modules[\\/]/, /[\\/]\.git[\\/]/, /[\\/]\.nuxt[\\/]/],
    resolvers: [VueUseComponentsResolver(), VantResolver(), VarletImportResolver(), NutUIResolver()]
  });
};

// build/vite/plugins/autoImport.ts
import AutoImport from "file:///D:/frontsProject/eye-protect-h5/node_modules/unplugin-auto-import/dist/vite.mjs";
import { VarletImportResolver as VarletImportResolver2 } from "file:///D:/frontsProject/eye-protect-h5/node_modules/@varlet/import-resolver/lib/index.js";
import { VantResolver as VantResolver2 } from "file:///D:/frontsProject/eye-protect-h5/node_modules/@vant/auto-import-resolver/dist/index.js";
var ConfigAutoImportPlugin = () => {
  return AutoImport({
    dts: "types/auto-imports.d.ts",
    imports: [
      "vue",
      "pinia",
      "vue-router",
      {
        "@vueuse/core": []
      }
    ],
    eslintrc: {
      enabled: true
    },
    resolvers: [VarletImportResolver2({ autoImport: true }), VantResolver2()]
  });
};

// build/vite/plugins/mock.ts
import { viteMockServe } from "file:///D:/frontsProject/eye-protect-h5/node_modules/vite-plugin-mock/dist/index.mjs";
var ConfigMockPlugin = (isBuild) => {
  return viteMockServe({
    ignore: /^\_/,
    mockPath: "mock",
    enable: !isBuild,
    logger: !isBuild
  });
};

// build/vite/plugins/compress.ts
import viteCompression from "file:///D:/frontsProject/eye-protect-h5/node_modules/vite-plugin-compression/dist/index.mjs";
var ConfigCompressPlugin = () => {
  return viteCompression({
    verbose: true,
    // 默认即可
    disable: false,
    //开启压缩(不禁用)，默认即可
    deleteOriginFile: false,
    //删除源文件
    threshold: 10240,
    //压缩前最小文件大小
    algorithm: "gzip",
    //压缩算法
    ext: ".gz"
    //文件类型
  });
};

// build/vite/plugins/pages.ts
import Pages from "file:///D:/frontsProject/eye-protect-h5/node_modules/vite-plugin-pages/dist/index.js";
var ConfigPagesPlugin = () => {
  return Pages({
    dirs: "src/pages",
    extensions: ["vue", "ts"],
    importMode: "async"
  });
};

// build/vite/plugins/restart.ts
import ViteRestart from "file:///D:/frontsProject/eye-protect-h5/node_modules/vite-plugin-restart/dist/index.js";
var ConfigRestartPlugin = () => {
  return ViteRestart({
    restart: ["*.config.[jt]s", "**/config/*.[jt]s"]
  });
};

// build/vite/plugins/progress.ts
import progress from "file:///D:/frontsProject/eye-protect-h5/node_modules/vite-plugin-progress/dist/index.mjs";
var ConfigProgressPlugin = () => {
  return progress();
};

// build/vite/plugins/eruda.ts
import eruda from "file:///D:/frontsProject/eye-protect-h5/node_modules/@zhaojjiang/vite-plugin-eruda/dist/index.js";
var ConfigErudaPlugin = () => {
  return eruda();
};

// build/vite/plugins/imagemin.ts
import viteImagemin from "file:///D:/frontsProject/eye-protect-h5/node_modules/vite-plugin-imagemin/dist/index.mjs";
function ConfigImageminPlugin() {
  const plugin = viteImagemin({
    gifsicle: {
      optimizationLevel: 7,
      interlaced: false
    },
    mozjpeg: {
      quality: 20
    },
    optipng: {
      optimizationLevel: 7
    },
    pngquant: {
      quality: [0.8, 0.9],
      speed: 4
    },
    svgo: {
      plugins: [
        {
          name: "removeViewBox"
        },
        {
          name: "removeEmptyAttrs",
          active: false
        }
      ]
    }
  });
  return plugin;
}

// build/vite/plugins/visualizer.ts
import { visualizer } from "file:///D:/frontsProject/eye-protect-h5/node_modules/rollup-plugin-visualizer/dist/plugin/index.js";
var ConfigVisualizerPlugin = () => {
  return visualizer({
    filename: "./node_modules/.cache/visualizer/stats.html",
    open: true,
    gzipSize: true,
    brotliSize: true
  });
};

// build/vite/plugins/ssl.ts
import basicSsl from "file:///D:/frontsProject/eye-protect-h5/node_modules/@vitejs/plugin-basic-ssl/dist/index.mjs";
var ConfigSslPlugin = () => {
  return basicSsl();
};

// build/vite/plugins/qrcode.ts
import { qrcode } from "file:///D:/frontsProject/eye-protect-h5/node_modules/vite-plugin-qrcode/dist/index.js";
var ConfigQrcodePlugin = () => {
  return qrcode();
};

// build/vite/plugins/pwa.ts
import { VitePWA } from "file:///D:/frontsProject/eye-protect-h5/node_modules/vite-plugin-pwa/dist/index.js";
var ConfigPwaPlugin = () => {
  return VitePWA({
    registerType: "autoUpdate",
    includeAssets: ["favicon.svg", "robots.txt", "apple-touch-icon.png"],
    devOptions: {
      enabled: true,
      type: "module"
    },
    manifest: {
      name: "Vue-H5-Template",
      short_name: "Vue-H5-Template",
      description: "\u4E00\u4E2A\u4F7F\u7528 Vite \u548C Vue3\u6784\u5EFA\u7684\u5E94\u7528",
      theme_color: "#ffffff",
      background_color: "#ffffff",
      display: "standalone",
      orientation: "portrait",
      scope: "/",
      start_url: "/",
      screenshots: [
        {
          src: "logo-320.png",
          sizes: "320x320",
          type: "image/png"
        },
        {
          src: "logo-512.png",
          sizes: "512x512",
          type: "image/png",
          form_factor: "wide"
        }
      ],
      icons: [
        {
          src: "logo-320.png",
          sizes: "320x320",
          type: "image/png"
        },
        {
          src: "logo-512.png",
          sizes: "512x512",
          type: "image/png"
        }
      ]
    },
    workbox: {
      // 全局模式匹配
      globPatterns: ["**/*.{css,js,html,svg,png,ico,txt,woff2}"],
      // 运行时缓存配置
      runtimeCaching: [
        {
          // API 请求缓存
          urlPattern: ({ url }) => url.pathname.startsWith("/api"),
          handler: "CacheFirst",
          options: {
            cacheName: "api-cache",
            expiration: {
              maxEntries: 10,
              maxAgeSeconds: 60 * 60 * 24
              // 1天
            },
            cacheableResponse: {
              statuses: [0, 200]
            }
          }
        },
        {
          // 图片缓存
          urlPattern: /\.(?:png|jpg|jpeg|svg|gif|webp)$/,
          handler: "CacheFirst",
          options: {
            cacheName: "images-cache",
            expiration: {
              maxEntries: 60,
              maxAgeSeconds: 60 * 60 * 24 * 30
              // 30天
            }
          }
        }
      ]
    }
  });
};

// build/vite/plugins/index.ts
function createVitePlugins(env, isBuild) {
  const { VITE_USE_MOCK, VITE_USE_ERUDA, VITE_USE_COMPRESS, VITE_USE_REPORT, VITE_USE_HTTPS, VITE_USE_PWA } = env;
  const vitePlugins = [
    // vue支持
    vue(),
    // JSX支持
    vueJsx()
  ];
  vitePlugins.push(ConfigAutoComponentsPlugin());
  vitePlugins.push(ConfigAutoImportPlugin());
  vitePlugins.push(ConfigPagesPlugin());
  vitePlugins.push(ConfigRestartPlugin());
  vitePlugins.push(ConfigProgressPlugin());
  vitePlugins.push(ConfigSvgIconsPlugin(isBuild));
  if (VITE_USE_ERUDA) {
    vitePlugins.push(ConfigErudaPlugin());
  }
  if (VITE_USE_REPORT) {
    vitePlugins.push(ConfigVisualizerPlugin());
  }
  if (VITE_USE_MOCK) {
    vitePlugins.push(ConfigMockPlugin(isBuild));
  }
  if (VITE_USE_HTTPS) {
    vitePlugins.push(ConfigSslPlugin());
  }
  if (VITE_USE_PWA) {
    vitePlugins.push(ConfigPwaPlugin());
  }
  if (isBuild) {
    if (VITE_USE_COMPRESS) {
      vitePlugins.push(ConfigCompressPlugin());
      vitePlugins.push(ConfigImageminPlugin());
    }
  }
  if (!isBuild) {
    vitePlugins.push(ConfigQrcodePlugin());
  }
  return vitePlugins;
}

// vite.config.mts
import { loadEnv } from "file:///D:/frontsProject/eye-protect-h5/node_modules/vite/dist/node/index.js";

// build/utils.ts
function wrapperEnv(envConf) {
  const ret = {};
  for (const envName of Object.keys(envConf)) {
    let realName = envConf[envName].replace(/\\n/g, "\n");
    realName = realName === "true" ? true : realName === "false" ? false : realName;
    if (envName === "VITE_PORT") {
      realName = Number(realName);
    }
    if (envName === "VITE_PROXY" && realName) {
      try {
        realName = JSON.parse(realName.replace(/'/g, '"'));
      } catch {
        realName = "";
      }
    }
    ret[envName] = realName;
    if (typeof realName === "string") {
      process.env[envName] = realName;
    } else if (typeof realName === "object") {
      process.env[envName] = JSON.stringify(realName);
    }
  }
  return ret;
}

// vite.config.mts
import { fileURLToPath, URL } from "node:url";
import { readdirSync, statSync } from "node:fs";
import { dirname } from "node:path";
var __vite_injected_original_import_meta_url = "file:///D:/frontsProject/eye-protect-h5/vite.config.mts";
function vite_config_default({ command, mode }) {
  const isProduction = command === "build";
  const root = process.cwd();
  const env = loadEnv(mode, root);
  const viteEnv = wrapperEnv(env);
  const devOptimizeDepsInclude = ["eruda"];
  if (!isProduction) {
    const excludedDirs = ["utils", "style", "composables"];
    const __dirname = dirname(fileURLToPath(__vite_injected_original_import_meta_url));
    const uiLibraries = [
      { name: "vant/es", path: "node_modules/vant/es" },
      { name: "@nutui/nutui/dist/packages", path: "node_modules/@nutui/nutui/dist/packages" },
      { name: "@varlet/ui/es", path: "node_modules/@varlet/ui/es" }
    ];
    uiLibraries.forEach((lib) => {
      try {
        const dirNames = readdirSync(`${__dirname}/${lib.path}`);
        dirNames.filter((dirName) => {
          const fullPath = `${__dirname}/${lib.path}/${dirName}`;
          const isDir = statSync(fullPath).isDirectory();
          const isExcluded = excludedDirs.includes(dirName);
          return isDir && !isExcluded;
        }).forEach((dirName) => {
          if (lib.name === "@nutui/nutui/dist/packages") {
            if (dirName !== "locale") {
              devOptimizeDepsInclude.push(`${lib.name}/${dirName}/style/css`);
            }
          } else if (lib.name === "vant/es") {
            devOptimizeDepsInclude.push(`${lib.name}/${dirName}/style/index`);
          } else {
            devOptimizeDepsInclude.push(`${lib.name}/${dirName}/style/index.mjs`);
          }
        });
      } catch (err) {
        console.warn(`Failed to read directory for ${lib.name}: ${err}`);
      }
    });
  }
  return {
    base: "/",
    root,
    resolve: {
      alias: {
        "@": fileURLToPath(new URL("./src", __vite_injected_original_import_meta_url)),
        "#": fileURLToPath(new URL("./types", __vite_injected_original_import_meta_url))
      }
    },
    server: {
      host: true,
      hmr: true
    },
    plugins: createVitePlugins(viteEnv, isProduction),
    build: {
      minify: "terser",
      target: ["es2022", "chrome91", "edge91", "firefox89", "safari15"],
      terserOptions: {
        compress: {
          drop_console: true,
          drop_debugger: true
        }
      }
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@use "@/styles/variable.scss" as *;@use "@nutui/nutui/dist/styles/variables.scss" as *;`,
          quietDeps: true
        }
      }
    },
    optimizeDeps: {
      include: [...devOptimizeDepsInclude],
      esbuildOptions: {
        target: "es2022"
      }
    }
  };
}
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiYnVpbGQvdml0ZS9wbHVnaW5zL2luZGV4LnRzIiwgImJ1aWxkL3ZpdGUvcGx1Z2lucy9zdmdJY29ucy50cyIsICJidWlsZC92aXRlL3BsdWdpbnMvY29tcG9uZW50LnRzIiwgImJ1aWxkL3ZpdGUvcGx1Z2lucy9hdXRvSW1wb3J0LnRzIiwgImJ1aWxkL3ZpdGUvcGx1Z2lucy9tb2NrLnRzIiwgImJ1aWxkL3ZpdGUvcGx1Z2lucy9jb21wcmVzcy50cyIsICJidWlsZC92aXRlL3BsdWdpbnMvcGFnZXMudHMiLCAiYnVpbGQvdml0ZS9wbHVnaW5zL3Jlc3RhcnQudHMiLCAiYnVpbGQvdml0ZS9wbHVnaW5zL3Byb2dyZXNzLnRzIiwgImJ1aWxkL3ZpdGUvcGx1Z2lucy9lcnVkYS50cyIsICJidWlsZC92aXRlL3BsdWdpbnMvaW1hZ2VtaW4udHMiLCAiYnVpbGQvdml0ZS9wbHVnaW5zL3Zpc3VhbGl6ZXIudHMiLCAiYnVpbGQvdml0ZS9wbHVnaW5zL3NzbC50cyIsICJidWlsZC92aXRlL3BsdWdpbnMvcXJjb2RlLnRzIiwgImJ1aWxkL3ZpdGUvcGx1Z2lucy9wd2EudHMiLCAidml0ZS5jb25maWcubXRzIiwgImJ1aWxkL3V0aWxzLnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiRDpcXFxcZnJvbnRzUHJvamVjdFxcXFxleWUtcHJvdGVjdC1oNVxcXFxidWlsZFxcXFx2aXRlXFxcXHBsdWdpbnNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkQ6XFxcXGZyb250c1Byb2plY3RcXFxcZXllLXByb3RlY3QtaDVcXFxcYnVpbGRcXFxcdml0ZVxcXFxwbHVnaW5zXFxcXGluZGV4LnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9EOi9mcm9udHNQcm9qZWN0L2V5ZS1wcm90ZWN0LWg1L2J1aWxkL3ZpdGUvcGx1Z2lucy9pbmRleC50c1wiOy8qKlxyXG4gKiBAbmFtZSBjcmVhdGVWaXRlUGx1Z2luc1xyXG4gKiBAZGVzY3JpcHRpb24gXHU1QzAxXHU4OEM1cGx1Z2luc1x1NjU3MFx1N0VDNFx1N0VERlx1NEUwMFx1OEMwM1x1NzUyOFxyXG4gKi9cclxuXHJcbmltcG9ydCB0eXBlIHsgUGx1Z2luT3B0aW9uIH0gZnJvbSAndml0ZSc7XHJcbmltcG9ydCB2dWUgZnJvbSAnQHZpdGVqcy9wbHVnaW4tdnVlJztcclxuaW1wb3J0IHZ1ZUpzeCBmcm9tICdAdml0ZWpzL3BsdWdpbi12dWUtanN4JztcclxuaW1wb3J0IHsgQ29uZmlnU3ZnSWNvbnNQbHVnaW4gfSBmcm9tICcuL3N2Z0ljb25zJztcclxuaW1wb3J0IHsgQ29uZmlnQXV0b0NvbXBvbmVudHNQbHVnaW4gfSBmcm9tICcuL2NvbXBvbmVudCc7XHJcbmltcG9ydCB7IENvbmZpZ0F1dG9JbXBvcnRQbHVnaW4gfSBmcm9tICcuL2F1dG9JbXBvcnQnO1xyXG5pbXBvcnQgeyBDb25maWdNb2NrUGx1Z2luIH0gZnJvbSAnLi9tb2NrJztcclxuaW1wb3J0IHsgQ29uZmlnQ29tcHJlc3NQbHVnaW4gfSBmcm9tICcuL2NvbXByZXNzJztcclxuaW1wb3J0IHsgQ29uZmlnUGFnZXNQbHVnaW4gfSBmcm9tICcuL3BhZ2VzJztcclxuaW1wb3J0IHsgQ29uZmlnUmVzdGFydFBsdWdpbiB9IGZyb20gJy4vcmVzdGFydCc7XHJcbmltcG9ydCB7IENvbmZpZ1Byb2dyZXNzUGx1Z2luIH0gZnJvbSAnLi9wcm9ncmVzcyc7XHJcbmltcG9ydCB7IENvbmZpZ0VydWRhUGx1Z2luIH0gZnJvbSAnLi9lcnVkYSc7XHJcbmltcG9ydCB7IENvbmZpZ0ltYWdlbWluUGx1Z2luIH0gZnJvbSAnLi9pbWFnZW1pbic7XHJcbmltcG9ydCB7IENvbmZpZ1Zpc3VhbGl6ZXJQbHVnaW4gfSBmcm9tICcuL3Zpc3VhbGl6ZXInO1xyXG5pbXBvcnQgeyBDb25maWdTc2xQbHVnaW4gfSBmcm9tICcuL3NzbCc7XHJcbmltcG9ydCB7IENvbmZpZ1FyY29kZVBsdWdpbiB9IGZyb20gJy4vcXJjb2RlJztcclxuaW1wb3J0IHsgQ29uZmlnUHdhUGx1Z2luIH0gZnJvbSAnLi9wd2EnO1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZVZpdGVQbHVnaW5zKGVudjogVml0ZUVudiwgaXNCdWlsZDogYm9vbGVhbikge1xyXG4gIGNvbnN0IHsgVklURV9VU0VfTU9DSywgVklURV9VU0VfRVJVREEsIFZJVEVfVVNFX0NPTVBSRVNTLCBWSVRFX1VTRV9SRVBPUlQsIFZJVEVfVVNFX0hUVFBTLCBWSVRFX1VTRV9QV0EgfSA9IGVudjtcclxuXHJcbiAgY29uc3Qgdml0ZVBsdWdpbnM6IChQbHVnaW5PcHRpb24gfCBQbHVnaW5PcHRpb25bXSlbXSA9IFtcclxuICAgIC8vIHZ1ZVx1NjUyRlx1NjMwMVxyXG4gICAgdnVlKCksXHJcbiAgICAvLyBKU1hcdTY1MkZcdTYzMDFcclxuICAgIHZ1ZUpzeCgpLFxyXG4gIF07XHJcblxyXG4gIC8vIFx1ODFFQVx1NTJBOFx1NjMwOVx1OTcwMFx1NUYxNVx1NTE2NVx1N0VDNFx1NEVGNlxyXG4gIHZpdGVQbHVnaW5zLnB1c2goQ29uZmlnQXV0b0NvbXBvbmVudHNQbHVnaW4oKSk7XHJcblxyXG4gIC8vIFx1ODFFQVx1NTJBOFx1NjMwOVx1OTcwMFx1NUYxNVx1NTE2NVx1NEY5RFx1OEQ1NlxyXG4gIHZpdGVQbHVnaW5zLnB1c2goQ29uZmlnQXV0b0ltcG9ydFBsdWdpbigpKTtcclxuXHJcbiAgLy8gXHU4MUVBXHU1MkE4XHU3NTFGXHU2MjEwXHU4REVGXHU3NTMxXHJcbiAgdml0ZVBsdWdpbnMucHVzaChDb25maWdQYWdlc1BsdWdpbigpKTtcclxuXHJcbiAgLy8gXHU3NkQxXHU1NDJDXHU5MTREXHU3RjZFXHU2NTg3XHU0RUY2XHU2NTM5XHU1MkE4XHU5MUNEXHU1NDJGXHJcbiAgdml0ZVBsdWdpbnMucHVzaChDb25maWdSZXN0YXJ0UGx1Z2luKCkpO1xyXG5cclxuICAvLyBcdTY3ODRcdTVFRkFcdTY1RjZcdTY2M0VcdTc5M0FcdThGREJcdTVFQTZcdTY3NjFcclxuICB2aXRlUGx1Z2lucy5wdXNoKENvbmZpZ1Byb2dyZXNzUGx1Z2luKCkpO1xyXG5cclxuICAvLyBzdmcgXHU1NkZFXHU2ODA3XHJcbiAgdml0ZVBsdWdpbnMucHVzaChDb25maWdTdmdJY29uc1BsdWdpbihpc0J1aWxkKSk7XHJcblxyXG4gIC8vIGVydWRhXHU4QzAzXHU4QkQ1XHU1REU1XHU1MTc3XHJcbiAgaWYgKFZJVEVfVVNFX0VSVURBKSB7XHJcbiAgICB2aXRlUGx1Z2lucy5wdXNoKENvbmZpZ0VydWRhUGx1Z2luKCkpO1xyXG4gIH1cclxuXHJcbiAgLy8gXHU2MjUzXHU1MzA1XHU1MjA2XHU2NzkwXHU1REU1XHU1MTc3XHJcbiAgaWYgKFZJVEVfVVNFX1JFUE9SVCkge1xyXG4gICAgdml0ZVBsdWdpbnMucHVzaChDb25maWdWaXN1YWxpemVyUGx1Z2luKCkpO1xyXG4gIH1cclxuXHJcbiAgLy8gXHU2NTcwXHU2MzZFIG1vY2tcclxuICBpZiAoVklURV9VU0VfTU9DSykge1xyXG4gICAgdml0ZVBsdWdpbnMucHVzaChDb25maWdNb2NrUGx1Z2luKGlzQnVpbGQpKTtcclxuICB9XHJcblxyXG4gIGlmIChWSVRFX1VTRV9IVFRQUykge1xyXG4gICAgLy8gXHU1RjE1XHU1MTY1XHU2QTIxXHU2MkRGIFNTbCBcdThCQzFcdTRFNjZcclxuICAgIHZpdGVQbHVnaW5zLnB1c2goQ29uZmlnU3NsUGx1Z2luKCkpO1xyXG4gIH1cclxuXHJcbiAgaWYgKFZJVEVfVVNFX1BXQSkge1xyXG4gICAgdml0ZVBsdWdpbnMucHVzaChDb25maWdQd2FQbHVnaW4oKSk7XHJcbiAgfVxyXG5cclxuICBpZiAoaXNCdWlsZCkge1xyXG4gICAgLy8gXHU1RjAwXHU1NDJGLmd6XHU1MzhCXHU3RjI5XHJcbiAgICBpZiAoVklURV9VU0VfQ09NUFJFU1MpIHtcclxuICAgICAgdml0ZVBsdWdpbnMucHVzaChDb25maWdDb21wcmVzc1BsdWdpbigpKTtcclxuICAgICAgLy8gXHU1NkZFXHU3MjQ3XHU1MzhCXHU3RjI5XHJcbiAgICAgIHZpdGVQbHVnaW5zLnB1c2goQ29uZmlnSW1hZ2VtaW5QbHVnaW4oKSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBpZiAoIWlzQnVpbGQpIHtcclxuICAgIC8vIFx1NUYwMFx1NTQyRlx1NEU4Q1x1N0VGNFx1NzgwMVx1NjNEMlx1NEVGNlxyXG4gICAgdml0ZVBsdWdpbnMucHVzaChDb25maWdRcmNvZGVQbHVnaW4oKSk7XHJcbiAgfVxyXG5cclxuICByZXR1cm4gdml0ZVBsdWdpbnM7XHJcbn1cclxuIiwgImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJEOlxcXFxmcm9udHNQcm9qZWN0XFxcXGV5ZS1wcm90ZWN0LWg1XFxcXGJ1aWxkXFxcXHZpdGVcXFxccGx1Z2luc1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiRDpcXFxcZnJvbnRzUHJvamVjdFxcXFxleWUtcHJvdGVjdC1oNVxcXFxidWlsZFxcXFx2aXRlXFxcXHBsdWdpbnNcXFxcc3ZnSWNvbnMudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0Q6L2Zyb250c1Byb2plY3QvZXllLXByb3RlY3QtaDUvYnVpbGQvdml0ZS9wbHVnaW5zL3N2Z0ljb25zLnRzXCI7LyoqXHJcbiAqIEBuYW1lIENvbmZpZ1N2Z0ljb25zUGx1Z2luXHJcbiAqIEBkZXNjcmlwdGlvbiBcdTUyQTBcdThGN0RTVkdcdTY1ODdcdTRFRjZcdUZGMENcdTgxRUFcdTUyQThcdTVGMTVcdTUxNjVcclxuICovXHJcblxyXG5pbXBvcnQgeyBjcmVhdGVTdmdJY29uc1BsdWdpbiB9IGZyb20gJ3ZpdGUtcGx1Z2luLXN2Zy1pY29ucyc7XHJcbmltcG9ydCBwYXRoIGZyb20gJ3BhdGgnO1xyXG5cclxuZXhwb3J0IGNvbnN0IENvbmZpZ1N2Z0ljb25zUGx1Z2luID0gKGlzQnVpbGQ6IGJvb2xlYW4pID0+IHtcclxuICByZXR1cm4gY3JlYXRlU3ZnSWNvbnNQbHVnaW4oe1xyXG4gICAgLy8gXHU2MzA3XHU1QjlBXHU5NzAwXHU4OTgxXHU3RjEzXHU1QjU4XHU3Njg0XHU1NkZFXHU2ODA3XHU2NTg3XHU0RUY2XHU1OTM5XHJcbiAgICBpY29uRGlyczogW3BhdGgucmVzb2x2ZShwcm9jZXNzLmN3ZCgpLCAnc3JjL2Fzc2V0cy9pY29ucycpXSxcclxuICAgIC8vIFx1NjMwN1x1NUI5QXN5bWJvbElkXHU2ODNDXHU1RjBGXHJcbiAgICBzeW1ib2xJZDogJ2ljb24tW2Rpcl0tW25hbWVdJyxcclxuICAgIHN2Z29PcHRpb25zOiBpc0J1aWxkLFxyXG4gIH0pO1xyXG59O1xyXG4iLCAiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIkQ6XFxcXGZyb250c1Byb2plY3RcXFxcZXllLXByb3RlY3QtaDVcXFxcYnVpbGRcXFxcdml0ZVxcXFxwbHVnaW5zXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJEOlxcXFxmcm9udHNQcm9qZWN0XFxcXGV5ZS1wcm90ZWN0LWg1XFxcXGJ1aWxkXFxcXHZpdGVcXFxccGx1Z2luc1xcXFxjb21wb25lbnQudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0Q6L2Zyb250c1Byb2plY3QvZXllLXByb3RlY3QtaDUvYnVpbGQvdml0ZS9wbHVnaW5zL2NvbXBvbmVudC50c1wiOy8qKlxyXG4gKiBAbmFtZSBDb25maWdBdXRvQ29tcG9uZW50c1BsdWdpblxyXG4gKiBAZGVzY3JpcHRpb24gXHU2MzA5XHU5NzAwXHU1MkEwXHU4RjdEXHVGRjBDXHU4MUVBXHU1MkE4XHU1RjE1XHU1MTY1XHU3RUM0XHU0RUY2XHJcbiAqIEByZXR1cm5zIHtpbXBvcnQoJ3ZpdGUnKS5QbHVnaW59IFZpdGVcdTYzRDJcdTRFRjZcdTkxNERcdTdGNkVcclxuICovXHJcblxyXG5pbXBvcnQgQ29tcG9uZW50cyBmcm9tICd1bnBsdWdpbi12dWUtY29tcG9uZW50cy92aXRlJztcclxuaW1wb3J0IHsgVnVlVXNlQ29tcG9uZW50c1Jlc29sdmVyIH0gZnJvbSAndW5wbHVnaW4tdnVlLWNvbXBvbmVudHMvcmVzb2x2ZXJzJztcclxuaW1wb3J0IE51dFVJUmVzb2x2ZXIgZnJvbSAnQG51dHVpL2F1dG8taW1wb3J0LXJlc29sdmVyJztcclxuaW1wb3J0IHsgVmFybGV0SW1wb3J0UmVzb2x2ZXIgfSBmcm9tICdAdmFybGV0L2ltcG9ydC1yZXNvbHZlcic7XHJcbmltcG9ydCB7IFZhbnRSZXNvbHZlciB9IGZyb20gJ0B2YW50L2F1dG8taW1wb3J0LXJlc29sdmVyJztcclxuXHJcbmV4cG9ydCBjb25zdCBDb25maWdBdXRvQ29tcG9uZW50c1BsdWdpbiA9ICgpID0+IHtcclxuICByZXR1cm4gQ29tcG9uZW50cyh7XHJcbiAgICBkaXJzOiBbJ3NyYy9jb21wb25lbnRzJ10sXHJcbiAgICBleHRlbnNpb25zOiBbJ3Z1ZScsICdtZCddLFxyXG4gICAgZGVlcDogdHJ1ZSxcclxuICAgIGR0czogJ3R5cGVzL2NvbXBvbmVudHMuZC50cycsXHJcbiAgICBkaXJlY3RvcnlBc05hbWVzcGFjZTogZmFsc2UsXHJcbiAgICBnbG9iYWxOYW1lc3BhY2VzOiBbXSxcclxuICAgIGRpcmVjdGl2ZXM6IHRydWUsXHJcbiAgICBpbmNsdWRlOiBbL1xcLnZ1ZSQvLCAvXFwudnVlXFw/dnVlLywgL1xcLm1kJC9dLFxyXG4gICAgZXhjbHVkZTogWy9bXFxcXC9dbm9kZV9tb2R1bGVzW1xcXFwvXS8sIC9bXFxcXC9dXFwuZ2l0W1xcXFwvXS8sIC9bXFxcXC9dXFwubnV4dFtcXFxcL10vXSxcclxuICAgIHJlc29sdmVyczogW1Z1ZVVzZUNvbXBvbmVudHNSZXNvbHZlcigpLCBWYW50UmVzb2x2ZXIoKSwgVmFybGV0SW1wb3J0UmVzb2x2ZXIoKSwgTnV0VUlSZXNvbHZlcigpXSxcclxuICB9KTtcclxufTtcclxuIiwgImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJEOlxcXFxmcm9udHNQcm9qZWN0XFxcXGV5ZS1wcm90ZWN0LWg1XFxcXGJ1aWxkXFxcXHZpdGVcXFxccGx1Z2luc1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiRDpcXFxcZnJvbnRzUHJvamVjdFxcXFxleWUtcHJvdGVjdC1oNVxcXFxidWlsZFxcXFx2aXRlXFxcXHBsdWdpbnNcXFxcYXV0b0ltcG9ydC50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vRDovZnJvbnRzUHJvamVjdC9leWUtcHJvdGVjdC1oNS9idWlsZC92aXRlL3BsdWdpbnMvYXV0b0ltcG9ydC50c1wiOy8qKlxyXG4gKiBAbmFtZSBDb25maWdBdXRvSW1wb3J0UGx1Z2luXHJcbiAqIEBkZXNjcmlwdGlvbiBcdTYzMDlcdTk3MDBcdTUyQTBcdThGN0RcdUZGMENcdTgxRUFcdTUyQThcdTVGMTVcdTUxNjVcclxuICovXHJcblxyXG5pbXBvcnQgQXV0b0ltcG9ydCBmcm9tICd1bnBsdWdpbi1hdXRvLWltcG9ydC92aXRlJztcclxuaW1wb3J0IHsgVmFybGV0SW1wb3J0UmVzb2x2ZXIgfSBmcm9tICdAdmFybGV0L2ltcG9ydC1yZXNvbHZlcic7XHJcbmltcG9ydCB7IFZhbnRSZXNvbHZlciB9IGZyb20gJ0B2YW50L2F1dG8taW1wb3J0LXJlc29sdmVyJztcclxuXHJcbmV4cG9ydCBjb25zdCBDb25maWdBdXRvSW1wb3J0UGx1Z2luID0gKCkgPT4ge1xyXG4gIHJldHVybiBBdXRvSW1wb3J0KHtcclxuICAgIGR0czogJ3R5cGVzL2F1dG8taW1wb3J0cy5kLnRzJyxcclxuICAgIGltcG9ydHM6IFtcclxuICAgICAgJ3Z1ZScsXHJcbiAgICAgICdwaW5pYScsXHJcbiAgICAgICd2dWUtcm91dGVyJyxcclxuICAgICAge1xyXG4gICAgICAgICdAdnVldXNlL2NvcmUnOiBbXSxcclxuICAgICAgfSxcclxuICAgIF0sXHJcbiAgICBlc2xpbnRyYzoge1xyXG4gICAgICBlbmFibGVkOiB0cnVlLFxyXG4gICAgfSxcclxuICAgIHJlc29sdmVyczogW1ZhcmxldEltcG9ydFJlc29sdmVyKHsgYXV0b0ltcG9ydDogdHJ1ZSB9KSwgVmFudFJlc29sdmVyKCldLFxyXG4gIH0pO1xyXG59O1xyXG4iLCAiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIkQ6XFxcXGZyb250c1Byb2plY3RcXFxcZXllLXByb3RlY3QtaDVcXFxcYnVpbGRcXFxcdml0ZVxcXFxwbHVnaW5zXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJEOlxcXFxmcm9udHNQcm9qZWN0XFxcXGV5ZS1wcm90ZWN0LWg1XFxcXGJ1aWxkXFxcXHZpdGVcXFxccGx1Z2luc1xcXFxtb2NrLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9EOi9mcm9udHNQcm9qZWN0L2V5ZS1wcm90ZWN0LWg1L2J1aWxkL3ZpdGUvcGx1Z2lucy9tb2NrLnRzXCI7LyoqXHJcbiAqIEBuYW1lIENvbmZpZ01vY2tQbHVnaW5cclxuICogQGRlc2NyaXB0aW9uIFx1NUYxNVx1NTE2NW1vY2tqc1x1RkYwQ1x1NjcyQ1x1NTczMFx1NkEyMVx1NjJERlx1NjNBNVx1NTNFM1xyXG4gKi9cclxuXHJcbmltcG9ydCB7IHZpdGVNb2NrU2VydmUgfSBmcm9tICd2aXRlLXBsdWdpbi1tb2NrJztcclxuZXhwb3J0IGNvbnN0IENvbmZpZ01vY2tQbHVnaW4gPSAoaXNCdWlsZDogYm9vbGVhbikgPT4ge1xyXG4gIHJldHVybiB2aXRlTW9ja1NlcnZlKHtcclxuICAgIGlnbm9yZTogL15cXF8vLFxyXG4gICAgbW9ja1BhdGg6ICdtb2NrJyxcclxuICAgIGVuYWJsZTogIWlzQnVpbGQsXHJcbiAgICBsb2dnZXI6ICFpc0J1aWxkLFxyXG4gIH0pO1xyXG59O1xyXG4iLCAiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIkQ6XFxcXGZyb250c1Byb2plY3RcXFxcZXllLXByb3RlY3QtaDVcXFxcYnVpbGRcXFxcdml0ZVxcXFxwbHVnaW5zXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJEOlxcXFxmcm9udHNQcm9qZWN0XFxcXGV5ZS1wcm90ZWN0LWg1XFxcXGJ1aWxkXFxcXHZpdGVcXFxccGx1Z2luc1xcXFxjb21wcmVzcy50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vRDovZnJvbnRzUHJvamVjdC9leWUtcHJvdGVjdC1oNS9idWlsZC92aXRlL3BsdWdpbnMvY29tcHJlc3MudHNcIjsvKipcclxuICogQG5hbWUgQ29uZmlnQ29tcHJlc3NQbHVnaW5cclxuICogQGRlc2NyaXB0aW9uIFx1NUYwMFx1NTQyRi5nelx1NTM4Qlx1N0YyOVxyXG4gKi9cclxuXHJcbmltcG9ydCB2aXRlQ29tcHJlc3Npb24gZnJvbSAndml0ZS1wbHVnaW4tY29tcHJlc3Npb24nO1xyXG5cclxuZXhwb3J0IGNvbnN0IENvbmZpZ0NvbXByZXNzUGx1Z2luID0gKCkgPT4ge1xyXG4gIHJldHVybiB2aXRlQ29tcHJlc3Npb24oe1xyXG4gICAgdmVyYm9zZTogdHJ1ZSwgLy8gXHU5RUQ4XHU4QkE0XHU1MzczXHU1M0VGXHJcbiAgICBkaXNhYmxlOiBmYWxzZSwgLy9cdTVGMDBcdTU0MkZcdTUzOEJcdTdGMjkoXHU0RTBEXHU3OTgxXHU3NTI4KVx1RkYwQ1x1OUVEOFx1OEJBNFx1NTM3M1x1NTNFRlxyXG4gICAgZGVsZXRlT3JpZ2luRmlsZTogZmFsc2UsIC8vXHU1MjIwXHU5NjY0XHU2RTkwXHU2NTg3XHU0RUY2XHJcbiAgICB0aHJlc2hvbGQ6IDEwMjQwLCAvL1x1NTM4Qlx1N0YyOVx1NTI0RFx1NjcwMFx1NUMwRlx1NjU4N1x1NEVGNlx1NTkyN1x1NUMwRlxyXG4gICAgYWxnb3JpdGhtOiAnZ3ppcCcsIC8vXHU1MzhCXHU3RjI5XHU3Qjk3XHU2Q0Q1XHJcbiAgICBleHQ6ICcuZ3onLCAvL1x1NjU4N1x1NEVGNlx1N0M3Qlx1NTc4QlxyXG4gIH0pO1xyXG59O1xyXG4iLCAiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIkQ6XFxcXGZyb250c1Byb2plY3RcXFxcZXllLXByb3RlY3QtaDVcXFxcYnVpbGRcXFxcdml0ZVxcXFxwbHVnaW5zXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJEOlxcXFxmcm9udHNQcm9qZWN0XFxcXGV5ZS1wcm90ZWN0LWg1XFxcXGJ1aWxkXFxcXHZpdGVcXFxccGx1Z2luc1xcXFxwYWdlcy50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vRDovZnJvbnRzUHJvamVjdC9leWUtcHJvdGVjdC1oNS9idWlsZC92aXRlL3BsdWdpbnMvcGFnZXMudHNcIjsvKipcclxuICogQG5hbWUgQ29uZmlnUGFnZXNQbHVnaW5cclxuICogQGRlc2NyaXB0aW9uIFx1NTJBOFx1NjAwMVx1NzUxRlx1NjIxMFx1OERFRlx1NzUzMVxyXG4gKi9cclxuXHJcbmltcG9ydCBQYWdlcyBmcm9tICd2aXRlLXBsdWdpbi1wYWdlcyc7XHJcblxyXG5leHBvcnQgY29uc3QgQ29uZmlnUGFnZXNQbHVnaW4gPSAoKSA9PiB7XHJcbiAgcmV0dXJuIFBhZ2VzKHtcclxuICAgIGRpcnM6ICdzcmMvcGFnZXMnLFxyXG4gICAgZXh0ZW5zaW9uczogWyd2dWUnLCAndHMnXSxcclxuICAgIGltcG9ydE1vZGU6ICdhc3luYycsXHJcbiAgfSk7XHJcbn07XHJcbiIsICJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiRDpcXFxcZnJvbnRzUHJvamVjdFxcXFxleWUtcHJvdGVjdC1oNVxcXFxidWlsZFxcXFx2aXRlXFxcXHBsdWdpbnNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkQ6XFxcXGZyb250c1Byb2plY3RcXFxcZXllLXByb3RlY3QtaDVcXFxcYnVpbGRcXFxcdml0ZVxcXFxwbHVnaW5zXFxcXHJlc3RhcnQudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0Q6L2Zyb250c1Byb2plY3QvZXllLXByb3RlY3QtaDUvYnVpbGQvdml0ZS9wbHVnaW5zL3Jlc3RhcnQudHNcIjsvKipcclxuICogQG5hbWUgQ29uZmlnUmVzdGFydFBsdWdpblxyXG4gKiBAZGVzY3JpcHRpb24gXHU3NkQxXHU1NDJDXHU5MTREXHU3RjZFXHU2NTg3XHU0RUY2XHU0RkVFXHU2NTM5XHU4MUVBXHU1MkE4XHU5MUNEXHU1NDJGVml0ZVxyXG4gKi9cclxuXHJcbmltcG9ydCBWaXRlUmVzdGFydCBmcm9tICd2aXRlLXBsdWdpbi1yZXN0YXJ0JztcclxuXHJcbmV4cG9ydCBjb25zdCBDb25maWdSZXN0YXJ0UGx1Z2luID0gKCkgPT4ge1xyXG4gIHJldHVybiBWaXRlUmVzdGFydCh7XHJcbiAgICByZXN0YXJ0OiBbJyouY29uZmlnLltqdF1zJywgJyoqL2NvbmZpZy8qLltqdF1zJ10sXHJcbiAgfSk7XHJcbn07XHJcbiIsICJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiRDpcXFxcZnJvbnRzUHJvamVjdFxcXFxleWUtcHJvdGVjdC1oNVxcXFxidWlsZFxcXFx2aXRlXFxcXHBsdWdpbnNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkQ6XFxcXGZyb250c1Byb2plY3RcXFxcZXllLXByb3RlY3QtaDVcXFxcYnVpbGRcXFxcdml0ZVxcXFxwbHVnaW5zXFxcXHByb2dyZXNzLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9EOi9mcm9udHNQcm9qZWN0L2V5ZS1wcm90ZWN0LWg1L2J1aWxkL3ZpdGUvcGx1Z2lucy9wcm9ncmVzcy50c1wiOy8qKlxyXG4gKiBAbmFtZSBDb25maWdQcm9ncmVzc1BsdWdpblxyXG4gKiBAZGVzY3JpcHRpb24gXHU2Nzg0XHU1RUZBXHU2NjNFXHU3OTNBXHU4RkRCXHU1RUE2XHU2NzYxXHJcbiAqL1xyXG5cclxuaW1wb3J0IHByb2dyZXNzIGZyb20gJ3ZpdGUtcGx1Z2luLXByb2dyZXNzJztcclxuXHJcbmV4cG9ydCBjb25zdCBDb25maWdQcm9ncmVzc1BsdWdpbiA9ICgpID0+IHtcclxuICByZXR1cm4gcHJvZ3Jlc3MoKTtcclxufTtcclxuIiwgImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJEOlxcXFxmcm9udHNQcm9qZWN0XFxcXGV5ZS1wcm90ZWN0LWg1XFxcXGJ1aWxkXFxcXHZpdGVcXFxccGx1Z2luc1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiRDpcXFxcZnJvbnRzUHJvamVjdFxcXFxleWUtcHJvdGVjdC1oNVxcXFxidWlsZFxcXFx2aXRlXFxcXHBsdWdpbnNcXFxcZXJ1ZGEudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0Q6L2Zyb250c1Byb2plY3QvZXllLXByb3RlY3QtaDUvYnVpbGQvdml0ZS9wbHVnaW5zL2VydWRhLnRzXCI7LyoqXHJcbiAqIEBuYW1lIENvbmZpZ0VydWRhUGx1Z2luXHJcbiAqIEBkZXNjcmlwdGlvbiBcdTYzQTdcdTUyMzZcdTUzRjBcdUZGMENcdTY1QjlcdTRGQkZcdTc5RkJcdTUyQThcdTdBRUZcdThDMDNcdThCRDVcclxuICovXHJcblxyXG5pbXBvcnQgZXJ1ZGEgZnJvbSAnQHpoYW9qamlhbmcvdml0ZS1wbHVnaW4tZXJ1ZGEnO1xyXG5cclxuZXhwb3J0IGNvbnN0IENvbmZpZ0VydWRhUGx1Z2luID0gKCkgPT4ge1xyXG4gIHJldHVybiBlcnVkYSgpO1xyXG59O1xyXG4iLCAiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIkQ6XFxcXGZyb250c1Byb2plY3RcXFxcZXllLXByb3RlY3QtaDVcXFxcYnVpbGRcXFxcdml0ZVxcXFxwbHVnaW5zXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJEOlxcXFxmcm9udHNQcm9qZWN0XFxcXGV5ZS1wcm90ZWN0LWg1XFxcXGJ1aWxkXFxcXHZpdGVcXFxccGx1Z2luc1xcXFxpbWFnZW1pbi50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vRDovZnJvbnRzUHJvamVjdC9leWUtcHJvdGVjdC1oNS9idWlsZC92aXRlL3BsdWdpbnMvaW1hZ2VtaW4udHNcIjsvKipcclxuICogQG5hbWUgQ29uZmlnSW1hZ2VtaW5QbHVnaW5cclxuICogQGRlc2NyaXB0aW9uIFx1NTZGRVx1NzI0N1x1NTM4Qlx1N0YyOVxyXG4gKi9cclxuXHJcbmltcG9ydCB2aXRlSW1hZ2VtaW4gZnJvbSAndml0ZS1wbHVnaW4taW1hZ2VtaW4nO1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIENvbmZpZ0ltYWdlbWluUGx1Z2luKCkge1xyXG4gIGNvbnN0IHBsdWdpbiA9IHZpdGVJbWFnZW1pbih7XHJcbiAgICBnaWZzaWNsZToge1xyXG4gICAgICBvcHRpbWl6YXRpb25MZXZlbDogNyxcclxuICAgICAgaW50ZXJsYWNlZDogZmFsc2UsXHJcbiAgICB9LFxyXG4gICAgbW96anBlZzoge1xyXG4gICAgICBxdWFsaXR5OiAyMCxcclxuICAgIH0sXHJcbiAgICBvcHRpcG5nOiB7XHJcbiAgICAgIG9wdGltaXphdGlvbkxldmVsOiA3LFxyXG4gICAgfSxcclxuICAgIHBuZ3F1YW50OiB7XHJcbiAgICAgIHF1YWxpdHk6IFswLjgsIDAuOV0sXHJcbiAgICAgIHNwZWVkOiA0LFxyXG4gICAgfSxcclxuICAgIHN2Z286IHtcclxuICAgICAgcGx1Z2luczogW1xyXG4gICAgICAgIHtcclxuICAgICAgICAgIG5hbWU6ICdyZW1vdmVWaWV3Qm94JyxcclxuICAgICAgICB9LFxyXG4gICAgICAgIHtcclxuICAgICAgICAgIG5hbWU6ICdyZW1vdmVFbXB0eUF0dHJzJyxcclxuICAgICAgICAgIGFjdGl2ZTogZmFsc2UsXHJcbiAgICAgICAgfSxcclxuICAgICAgXSxcclxuICAgIH0sXHJcbiAgfSk7XHJcbiAgcmV0dXJuIHBsdWdpbjtcclxufVxyXG4iLCAiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIkQ6XFxcXGZyb250c1Byb2plY3RcXFxcZXllLXByb3RlY3QtaDVcXFxcYnVpbGRcXFxcdml0ZVxcXFxwbHVnaW5zXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJEOlxcXFxmcm9udHNQcm9qZWN0XFxcXGV5ZS1wcm90ZWN0LWg1XFxcXGJ1aWxkXFxcXHZpdGVcXFxccGx1Z2luc1xcXFx2aXN1YWxpemVyLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9EOi9mcm9udHNQcm9qZWN0L2V5ZS1wcm90ZWN0LWg1L2J1aWxkL3ZpdGUvcGx1Z2lucy92aXN1YWxpemVyLnRzXCI7LyoqXHJcbiAqIEBuYW1lIENvbmZpZ1Zpc3VhbGl6ZXJQbHVnaW5cclxuICogQGRlc2NyaXB0aW9uIFx1NjI1M1x1NTMwNVx1NEY1M1x1NzlFRlx1NTIwNlx1Njc5MFxyXG4gKi9cclxuXHJcbmltcG9ydCB7IHZpc3VhbGl6ZXIgfSBmcm9tICdyb2xsdXAtcGx1Z2luLXZpc3VhbGl6ZXInO1xyXG5pbXBvcnQgdHlwZSB7IFBsdWdpbk9wdGlvbiB9IGZyb20gJ3ZpdGUnO1xyXG5cclxuZXhwb3J0IGNvbnN0IENvbmZpZ1Zpc3VhbGl6ZXJQbHVnaW4gPSAoKSA9PiB7XHJcbiAgcmV0dXJuIHZpc3VhbGl6ZXIoe1xyXG4gICAgZmlsZW5hbWU6ICcuL25vZGVfbW9kdWxlcy8uY2FjaGUvdmlzdWFsaXplci9zdGF0cy5odG1sJyxcclxuICAgIG9wZW46IHRydWUsXHJcbiAgICBnemlwU2l6ZTogdHJ1ZSxcclxuICAgIGJyb3RsaVNpemU6IHRydWUsXHJcbiAgfSkgYXMgUGx1Z2luT3B0aW9uO1xyXG59O1xyXG4iLCAiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIkQ6XFxcXGZyb250c1Byb2plY3RcXFxcZXllLXByb3RlY3QtaDVcXFxcYnVpbGRcXFxcdml0ZVxcXFxwbHVnaW5zXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJEOlxcXFxmcm9udHNQcm9qZWN0XFxcXGV5ZS1wcm90ZWN0LWg1XFxcXGJ1aWxkXFxcXHZpdGVcXFxccGx1Z2luc1xcXFxzc2wudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0Q6L2Zyb250c1Byb2plY3QvZXllLXByb3RlY3QtaDUvYnVpbGQvdml0ZS9wbHVnaW5zL3NzbC50c1wiOy8qKlxyXG4gKiBAbmFtZSBDb25maWdTc2xQbHVnaW5cclxuICogQGRlc2NyaXB0aW9uIFx1NUYxNVx1NTE2NVx1NkEyMVx1NjJERiBTU2wgXHU4QkMxXHU0RTY2XHJcbiAqL1xyXG5cclxuaW1wb3J0IGJhc2ljU3NsIGZyb20gJ0B2aXRlanMvcGx1Z2luLWJhc2ljLXNzbCc7XHJcblxyXG5leHBvcnQgY29uc3QgQ29uZmlnU3NsUGx1Z2luID0gKCkgPT4ge1xyXG4gIHJldHVybiBiYXNpY1NzbCgpO1xyXG59O1xyXG4iLCAiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIkQ6XFxcXGZyb250c1Byb2plY3RcXFxcZXllLXByb3RlY3QtaDVcXFxcYnVpbGRcXFxcdml0ZVxcXFxwbHVnaW5zXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJEOlxcXFxmcm9udHNQcm9qZWN0XFxcXGV5ZS1wcm90ZWN0LWg1XFxcXGJ1aWxkXFxcXHZpdGVcXFxccGx1Z2luc1xcXFxxcmNvZGUudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0Q6L2Zyb250c1Byb2plY3QvZXllLXByb3RlY3QtaDUvYnVpbGQvdml0ZS9wbHVnaW5zL3FyY29kZS50c1wiOy8qKlxyXG4gKiBAbmFtZSBDb25maWdRcmNvZGVQbHVnaW5cclxuICogQGRlc2NyaXB0aW9uIFx1NUYxNVx1NTE2NXFyY29kZVx1NjNEMlx1NEVGNlx1RkYwQ1x1NzUyOFx1NEU4RVx1NTcyOFx1NkQ0Rlx1ODlDOFx1NTY2OFx1NEUyRFx1NjYzRVx1NzkzQVx1NUY1M1x1NTI0RFx1OTg3NVx1OTc2Mlx1NzY4NFx1NEU4Q1x1N0VGNFx1NzgwMVxyXG4gKi9cclxuXHJcbmltcG9ydCB7IHFyY29kZSB9IGZyb20gJ3ZpdGUtcGx1Z2luLXFyY29kZSc7XHJcblxyXG5leHBvcnQgY29uc3QgQ29uZmlnUXJjb2RlUGx1Z2luID0gKCkgPT4ge1xyXG4gIHJldHVybiBxcmNvZGUoKTtcclxufTtcclxuIiwgImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJEOlxcXFxmcm9udHNQcm9qZWN0XFxcXGV5ZS1wcm90ZWN0LWg1XFxcXGJ1aWxkXFxcXHZpdGVcXFxccGx1Z2luc1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiRDpcXFxcZnJvbnRzUHJvamVjdFxcXFxleWUtcHJvdGVjdC1oNVxcXFxidWlsZFxcXFx2aXRlXFxcXHBsdWdpbnNcXFxccHdhLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9EOi9mcm9udHNQcm9qZWN0L2V5ZS1wcm90ZWN0LWg1L2J1aWxkL3ZpdGUvcGx1Z2lucy9wd2EudHNcIjsvKipcclxuICogQG5hbWUgQ29uZmlnUHdhUGx1Z2luXHJcbiAqIEBkZXNjcmlwdGlvbiBcdTYzMDlcdTk3MDBcdTUyQTBcdThGN0RcdUZGMENcdTgxRUFcdTUyQThcdTVGMTVcdTUxNjVcclxuICovXHJcblxyXG5pbXBvcnQgeyBWaXRlUFdBIH0gZnJvbSAndml0ZS1wbHVnaW4tcHdhJztcclxuXHJcbmV4cG9ydCBjb25zdCBDb25maWdQd2FQbHVnaW4gPSAoKSA9PiB7XHJcbiAgcmV0dXJuIFZpdGVQV0Eoe1xyXG4gICAgcmVnaXN0ZXJUeXBlOiAnYXV0b1VwZGF0ZScsXHJcbiAgICBpbmNsdWRlQXNzZXRzOiBbJ2Zhdmljb24uc3ZnJywgJ3JvYm90cy50eHQnLCAnYXBwbGUtdG91Y2gtaWNvbi5wbmcnXSxcclxuICAgIGRldk9wdGlvbnM6IHtcclxuICAgICAgZW5hYmxlZDogdHJ1ZSxcclxuICAgICAgdHlwZTogJ21vZHVsZScsXHJcbiAgICB9LFxyXG4gICAgbWFuaWZlc3Q6IHtcclxuICAgICAgbmFtZTogJ1Z1ZS1INS1UZW1wbGF0ZScsXHJcbiAgICAgIHNob3J0X25hbWU6ICdWdWUtSDUtVGVtcGxhdGUnLFxyXG4gICAgICBkZXNjcmlwdGlvbjogJ1x1NEUwMFx1NEUyQVx1NEY3Rlx1NzUyOCBWaXRlIFx1NTQ4QyBWdWUzXHU2Nzg0XHU1RUZBXHU3Njg0XHU1RTk0XHU3NTI4JyxcclxuICAgICAgdGhlbWVfY29sb3I6ICcjZmZmZmZmJyxcclxuICAgICAgYmFja2dyb3VuZF9jb2xvcjogJyNmZmZmZmYnLFxyXG4gICAgICBkaXNwbGF5OiAnc3RhbmRhbG9uZScsXHJcbiAgICAgIG9yaWVudGF0aW9uOiAncG9ydHJhaXQnLFxyXG4gICAgICBzY29wZTogJy8nLFxyXG4gICAgICBzdGFydF91cmw6ICcvJyxcclxuICAgICAgc2NyZWVuc2hvdHM6IFtcclxuICAgICAgICB7XHJcbiAgICAgICAgICBzcmM6ICdsb2dvLTMyMC5wbmcnLFxyXG4gICAgICAgICAgc2l6ZXM6ICczMjB4MzIwJyxcclxuICAgICAgICAgIHR5cGU6ICdpbWFnZS9wbmcnLFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgc3JjOiAnbG9nby01MTIucG5nJyxcclxuICAgICAgICAgIHNpemVzOiAnNTEyeDUxMicsXHJcbiAgICAgICAgICB0eXBlOiAnaW1hZ2UvcG5nJyxcclxuICAgICAgICAgIGZvcm1fZmFjdG9yOiAnd2lkZScsXHJcbiAgICAgICAgfSxcclxuICAgICAgXSxcclxuICAgICAgaWNvbnM6IFtcclxuICAgICAgICB7XHJcbiAgICAgICAgICBzcmM6ICdsb2dvLTMyMC5wbmcnLFxyXG4gICAgICAgICAgc2l6ZXM6ICczMjB4MzIwJyxcclxuICAgICAgICAgIHR5cGU6ICdpbWFnZS9wbmcnLFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgc3JjOiAnbG9nby01MTIucG5nJyxcclxuICAgICAgICAgIHNpemVzOiAnNTEyeDUxMicsXHJcbiAgICAgICAgICB0eXBlOiAnaW1hZ2UvcG5nJyxcclxuICAgICAgICB9LFxyXG4gICAgICBdLFxyXG4gICAgfSxcclxuICAgIHdvcmtib3g6IHtcclxuICAgICAgLy8gXHU1MTY4XHU1QzQwXHU2QTIxXHU1RjBGXHU1MzM5XHU5MTREXHJcbiAgICAgIGdsb2JQYXR0ZXJuczogWycqKi8qLntjc3MsanMsaHRtbCxzdmcscG5nLGljbyx0eHQsd29mZjJ9J10sIC8vIFx1OEZEMFx1ODg0Q1x1NjVGNlx1N0YxM1x1NUI1OFx1OTE0RFx1N0Y2RVxyXG4gICAgICBydW50aW1lQ2FjaGluZzogW1xyXG4gICAgICAgIHtcclxuICAgICAgICAgIC8vIEFQSSBcdThCRjdcdTZDNDJcdTdGMTNcdTVCNThcclxuICAgICAgICAgIHVybFBhdHRlcm46ICh7IHVybCB9KSA9PiB1cmwucGF0aG5hbWUuc3RhcnRzV2l0aCgnL2FwaScpLFxyXG4gICAgICAgICAgaGFuZGxlcjogJ0NhY2hlRmlyc3QnLFxyXG4gICAgICAgICAgb3B0aW9uczoge1xyXG4gICAgICAgICAgICBjYWNoZU5hbWU6ICdhcGktY2FjaGUnLFxyXG4gICAgICAgICAgICBleHBpcmF0aW9uOiB7XHJcbiAgICAgICAgICAgICAgbWF4RW50cmllczogMTAsXHJcbiAgICAgICAgICAgICAgbWF4QWdlU2Vjb25kczogNjAgKiA2MCAqIDI0LCAvLyAxXHU1OTI5XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGNhY2hlYWJsZVJlc3BvbnNlOiB7XHJcbiAgICAgICAgICAgICAgc3RhdHVzZXM6IFswLCAyMDBdLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgfSxcclxuICAgICAgICB9LFxyXG4gICAgICAgIHtcclxuICAgICAgICAgIC8vIFx1NTZGRVx1NzI0N1x1N0YxM1x1NUI1OFxyXG4gICAgICAgICAgdXJsUGF0dGVybjogL1xcLig/OnBuZ3xqcGd8anBlZ3xzdmd8Z2lmfHdlYnApJC8sXHJcbiAgICAgICAgICBoYW5kbGVyOiAnQ2FjaGVGaXJzdCcsXHJcbiAgICAgICAgICBvcHRpb25zOiB7XHJcbiAgICAgICAgICAgIGNhY2hlTmFtZTogJ2ltYWdlcy1jYWNoZScsXHJcbiAgICAgICAgICAgIGV4cGlyYXRpb246IHtcclxuICAgICAgICAgICAgICBtYXhFbnRyaWVzOiA2MCxcclxuICAgICAgICAgICAgICBtYXhBZ2VTZWNvbmRzOiA2MCAqIDYwICogMjQgKiAzMCwgLy8gMzBcdTU5MjlcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgfSxcclxuICAgICAgXSxcclxuICAgIH0sXHJcbiAgfSk7XHJcbn07XHJcbiIsICJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiRDpcXFxcZnJvbnRzUHJvamVjdFxcXFxleWUtcHJvdGVjdC1oNVwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiRDpcXFxcZnJvbnRzUHJvamVjdFxcXFxleWUtcHJvdGVjdC1oNVxcXFx2aXRlLmNvbmZpZy5tdHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0Q6L2Zyb250c1Byb2plY3QvZXllLXByb3RlY3QtaDUvdml0ZS5jb25maWcubXRzXCI7aW1wb3J0IHsgY3JlYXRlVml0ZVBsdWdpbnMgfSBmcm9tICcuL2J1aWxkL3ZpdGUvcGx1Z2lucyc7XHJcbmltcG9ydCB0eXBlICB7IENvbmZpZ0VudiwgVXNlckNvbmZpZyB9IGZyb20gJ3ZpdGUnO1xyXG5pbXBvcnQgeyBsb2FkRW52IH0gZnJvbSAndml0ZSc7XHJcbmltcG9ydCB7IHdyYXBwZXJFbnYgfSBmcm9tICcuL2J1aWxkL3V0aWxzJztcclxuaW1wb3J0IHsgZmlsZVVSTFRvUGF0aCwgVVJMIH0gZnJvbSAnbm9kZTp1cmwnO1xyXG5pbXBvcnQgeyByZWFkZGlyU3luYywgc3RhdFN5bmMgfSBmcm9tICdub2RlOmZzJztcclxuaW1wb3J0IHsgZGlybmFtZSB9IGZyb20gJ25vZGU6cGF0aCc7XHJcblxyXG4vLyBodHRwczovL3ZpdGVqcy5kZXYvY29uZmlnL1xyXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAoeyBjb21tYW5kLCBtb2RlIH06IENvbmZpZ0Vudik6IFVzZXJDb25maWcge1xyXG4gIGNvbnN0IGlzUHJvZHVjdGlvbiA9IGNvbW1hbmQgPT09ICdidWlsZCc7XHJcbiAgY29uc3Qgcm9vdCA9IHByb2Nlc3MuY3dkKCk7XHJcbiAgY29uc3QgZW52ID0gbG9hZEVudihtb2RlLCByb290KTtcclxuICBjb25zdCB2aXRlRW52ID0gd3JhcHBlckVudihlbnYpO1xyXG5cclxuICBjb25zdCBkZXZPcHRpbWl6ZURlcHNJbmNsdWRlOiBBcnJheTxzdHJpbmc+ID0gWydlcnVkYSddO1xyXG4gIGlmICghaXNQcm9kdWN0aW9uKSB7XHJcbiAgICBjb25zdCBleGNsdWRlZERpcnMgPSBbJ3V0aWxzJywgJ3N0eWxlJywgJ2NvbXBvc2FibGVzJ107XHJcbiAgICBjb25zdCBfX2Rpcm5hbWUgPSBkaXJuYW1lKGZpbGVVUkxUb1BhdGgoaW1wb3J0Lm1ldGEudXJsKSk7XHJcblxyXG4gICAgY29uc3QgdWlMaWJyYXJpZXMgPSBbXHJcbiAgICAgIHsgbmFtZTogJ3ZhbnQvZXMnLCBwYXRoOiAnbm9kZV9tb2R1bGVzL3ZhbnQvZXMnIH0sXHJcbiAgICAgIHsgbmFtZTogJ0BudXR1aS9udXR1aS9kaXN0L3BhY2thZ2VzJywgcGF0aDogJ25vZGVfbW9kdWxlcy9AbnV0dWkvbnV0dWkvZGlzdC9wYWNrYWdlcycgfSxcclxuICAgICAgeyBuYW1lOiAnQHZhcmxldC91aS9lcycsIHBhdGg6ICdub2RlX21vZHVsZXMvQHZhcmxldC91aS9lcycgfSxcclxuICAgIF07XHJcblxyXG4gICAgdWlMaWJyYXJpZXMuZm9yRWFjaCgobGliKSA9PiB7XHJcbiAgICAgIHRyeSB7XHJcbiAgICAgICAgY29uc3QgZGlyTmFtZXMgPSByZWFkZGlyU3luYyhgJHtfX2Rpcm5hbWV9LyR7bGliLnBhdGh9YCk7XHJcbiAgICAgICAgZGlyTmFtZXNcclxuICAgICAgICAgIC5maWx0ZXIoKGRpck5hbWUpID0+IHtcclxuICAgICAgICAgICAgY29uc3QgZnVsbFBhdGggPSBgJHtfX2Rpcm5hbWV9LyR7bGliLnBhdGh9LyR7ZGlyTmFtZX1gO1xyXG4gICAgICAgICAgICBjb25zdCBpc0RpciA9IHN0YXRTeW5jKGZ1bGxQYXRoKS5pc0RpcmVjdG9yeSgpO1xyXG4gICAgICAgICAgICBjb25zdCBpc0V4Y2x1ZGVkID0gZXhjbHVkZWREaXJzLmluY2x1ZGVzKGRpck5hbWUpO1xyXG4gICAgICAgICAgICByZXR1cm4gaXNEaXIgJiYgIWlzRXhjbHVkZWQ7XHJcbiAgICAgICAgICB9KVxyXG4gICAgICAgICAgLmZvckVhY2goKGRpck5hbWUpID0+IHtcclxuICAgICAgICAgICAgaWYgKGxpYi5uYW1lID09PSAnQG51dHVpL251dHVpL2Rpc3QvcGFja2FnZXMnKSB7XHJcbiAgICAgICAgICAgICAgaWYgKGRpck5hbWUgIT09ICdsb2NhbGUnKSB7XHJcbiAgICAgICAgICAgICAgICBkZXZPcHRpbWl6ZURlcHNJbmNsdWRlLnB1c2goYCR7bGliLm5hbWV9LyR7ZGlyTmFtZX0vc3R5bGUvY3NzYCk7XHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKGxpYi5uYW1lID09PSAndmFudC9lcycpIHtcclxuICAgICAgICAgICAgICBkZXZPcHRpbWl6ZURlcHNJbmNsdWRlLnB1c2goYCR7bGliLm5hbWV9LyR7ZGlyTmFtZX0vc3R5bGUvaW5kZXhgKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICBkZXZPcHRpbWl6ZURlcHNJbmNsdWRlLnB1c2goYCR7bGliLm5hbWV9LyR7ZGlyTmFtZX0vc3R5bGUvaW5kZXgubWpzYCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH0pO1xyXG4gICAgICB9IGNhdGNoIChlcnIpIHtcclxuICAgICAgICBjb25zb2xlLndhcm4oYEZhaWxlZCB0byByZWFkIGRpcmVjdG9yeSBmb3IgJHtsaWIubmFtZX06ICR7ZXJyfWApO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIHJldHVybiB7XHJcbiAgICBiYXNlOiAnLycsXHJcbiAgICByb290LFxyXG4gICAgcmVzb2x2ZToge1xyXG4gICAgICBhbGlhczoge1xyXG4gICAgICAgICdAJzogZmlsZVVSTFRvUGF0aChuZXcgVVJMKCcuL3NyYycsIGltcG9ydC5tZXRhLnVybCkpLFxyXG4gICAgICAgICcjJzogZmlsZVVSTFRvUGF0aChuZXcgVVJMKCcuL3R5cGVzJywgaW1wb3J0Lm1ldGEudXJsKSlcclxuICAgICAgfSxcclxuICAgIH0sXHJcbiAgICBzZXJ2ZXI6IHtcclxuICAgICAgaG9zdDogdHJ1ZSxcclxuICAgICAgaG1yOiB0cnVlLFxyXG4gICAgfSxcclxuICAgIHBsdWdpbnM6IGNyZWF0ZVZpdGVQbHVnaW5zKHZpdGVFbnYsIGlzUHJvZHVjdGlvbiksXHJcbiAgICBidWlsZDoge1xyXG4gICAgICBtaW5pZnk6ICd0ZXJzZXInLFxyXG4gICAgICB0YXJnZXQ6IFsnZXMyMDIyJywgJ2Nocm9tZTkxJywgJ2VkZ2U5MScsICdmaXJlZm94ODknLCAnc2FmYXJpMTUnXSxcclxuICAgICAgdGVyc2VyT3B0aW9uczoge1xyXG4gICAgICAgIGNvbXByZXNzOiB7XHJcbiAgICAgICAgICBkcm9wX2NvbnNvbGU6IHRydWUsXHJcbiAgICAgICAgICBkcm9wX2RlYnVnZ2VyOiB0cnVlLFxyXG4gICAgICAgIH0sXHJcbiAgICAgIH0sXHJcbiAgICB9LFxyXG4gICAgY3NzOiB7XHJcbiAgICAgIHByZXByb2Nlc3Nvck9wdGlvbnM6IHtcclxuICAgICAgICBzY3NzOiB7XHJcbiAgICAgICAgIGFkZGl0aW9uYWxEYXRhOiBgQHVzZSBcIkAvc3R5bGVzL3ZhcmlhYmxlLnNjc3NcIiBhcyAqO0B1c2UgXCJAbnV0dWkvbnV0dWkvZGlzdC9zdHlsZXMvdmFyaWFibGVzLnNjc3NcIiBhcyAqO2AsXHJcbiAgICAgICAgIHF1aWV0RGVwczogdHJ1ZSxcclxuICAgICAgICB9LFxyXG4gICAgICB9LFxyXG4gICAgfSxcclxuICAgIG9wdGltaXplRGVwczoge1xyXG4gICAgICBpbmNsdWRlOiBbLi4uZGV2T3B0aW1pemVEZXBzSW5jbHVkZV0sXHJcbiAgICAgIGVzYnVpbGRPcHRpb25zOiB7XHJcbiAgICAgICAgdGFyZ2V0OiAnZXMyMDIyJ1xyXG4gICAgICB9XHJcbiAgICB9LFxyXG4gIH07XHJcbn0iLCAiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIkQ6XFxcXGZyb250c1Byb2plY3RcXFxcZXllLXByb3RlY3QtaDVcXFxcYnVpbGRcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkQ6XFxcXGZyb250c1Byb2plY3RcXFxcZXllLXByb3RlY3QtaDVcXFxcYnVpbGRcXFxcdXRpbHMudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0Q6L2Zyb250c1Byb2plY3QvZXllLXByb3RlY3QtaDUvYnVpbGQvdXRpbHMudHNcIjsvLyBSZWFkIGFsbCBlbnZpcm9ubWVudCB2YXJpYWJsZSBjb25maWd1cmF0aW9uIGZpbGVzIHRvIHByb2Nlc3MuZW52XHJcbmV4cG9ydCBmdW5jdGlvbiB3cmFwcGVyRW52KGVudkNvbmY6IFJlY29yZGFibGUpOiBWaXRlRW52IHtcclxuICBjb25zdCByZXQ6IGFueSA9IHt9O1xyXG5cclxuICBmb3IgKGNvbnN0IGVudk5hbWUgb2YgT2JqZWN0LmtleXMoZW52Q29uZikpIHtcclxuICAgIGxldCByZWFsTmFtZSA9IGVudkNvbmZbZW52TmFtZV0ucmVwbGFjZSgvXFxcXG4vZywgJ1xcbicpO1xyXG4gICAgcmVhbE5hbWUgPSByZWFsTmFtZSA9PT0gJ3RydWUnID8gdHJ1ZSA6IHJlYWxOYW1lID09PSAnZmFsc2UnID8gZmFsc2UgOiByZWFsTmFtZTtcclxuXHJcbiAgICBpZiAoZW52TmFtZSA9PT0gJ1ZJVEVfUE9SVCcpIHtcclxuICAgICAgcmVhbE5hbWUgPSBOdW1iZXIocmVhbE5hbWUpO1xyXG4gICAgfVxyXG4gICAgaWYgKGVudk5hbWUgPT09ICdWSVRFX1BST1hZJyAmJiByZWFsTmFtZSkge1xyXG4gICAgICB0cnkge1xyXG4gICAgICAgIHJlYWxOYW1lID0gSlNPTi5wYXJzZShyZWFsTmFtZS5yZXBsYWNlKC8nL2csICdcIicpKTtcclxuICAgICAgfSBjYXRjaCB7XHJcbiAgICAgICAgcmVhbE5hbWUgPSAnJztcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0W2Vudk5hbWVdID0gcmVhbE5hbWU7XHJcbiAgICBpZiAodHlwZW9mIHJlYWxOYW1lID09PSAnc3RyaW5nJykge1xyXG4gICAgICBwcm9jZXNzLmVudltlbnZOYW1lXSA9IHJlYWxOYW1lO1xyXG4gICAgfSBlbHNlIGlmICh0eXBlb2YgcmVhbE5hbWUgPT09ICdvYmplY3QnKSB7XHJcbiAgICAgIHByb2Nlc3MuZW52W2Vudk5hbWVdID0gSlNPTi5zdHJpbmdpZnkocmVhbE5hbWUpO1xyXG4gICAgfVxyXG4gIH1cclxuICByZXR1cm4gcmV0O1xyXG59XHJcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFNQSxPQUFPLFNBQVM7QUFDaEIsT0FBTyxZQUFZOzs7QUNGbkIsU0FBUyw0QkFBNEI7QUFDckMsT0FBTyxVQUFVO0FBRVYsSUFBTSx1QkFBdUIsQ0FBQyxZQUFxQjtBQUN4RCxTQUFPLHFCQUFxQjtBQUFBO0FBQUEsSUFFMUIsVUFBVSxDQUFDLEtBQUssUUFBUSxRQUFRLElBQUksR0FBRyxrQkFBa0IsQ0FBQztBQUFBO0FBQUEsSUFFMUQsVUFBVTtBQUFBLElBQ1YsYUFBYTtBQUFBLEVBQ2YsQ0FBQztBQUNIOzs7QUNWQSxPQUFPLGdCQUFnQjtBQUN2QixTQUFTLGdDQUFnQztBQUN6QyxPQUFPLG1CQUFtQjtBQUMxQixTQUFTLDRCQUE0QjtBQUNyQyxTQUFTLG9CQUFvQjtBQUV0QixJQUFNLDZCQUE2QixNQUFNO0FBQzlDLFNBQU8sV0FBVztBQUFBLElBQ2hCLE1BQU0sQ0FBQyxnQkFBZ0I7QUFBQSxJQUN2QixZQUFZLENBQUMsT0FBTyxJQUFJO0FBQUEsSUFDeEIsTUFBTTtBQUFBLElBQ04sS0FBSztBQUFBLElBQ0wsc0JBQXNCO0FBQUEsSUFDdEIsa0JBQWtCLENBQUM7QUFBQSxJQUNuQixZQUFZO0FBQUEsSUFDWixTQUFTLENBQUMsVUFBVSxjQUFjLE9BQU87QUFBQSxJQUN6QyxTQUFTLENBQUMsMEJBQTBCLG1CQUFtQixrQkFBa0I7QUFBQSxJQUN6RSxXQUFXLENBQUMseUJBQXlCLEdBQUcsYUFBYSxHQUFHLHFCQUFxQixHQUFHLGNBQWMsQ0FBQztBQUFBLEVBQ2pHLENBQUM7QUFDSDs7O0FDcEJBLE9BQU8sZ0JBQWdCO0FBQ3ZCLFNBQVMsd0JBQUFBLDZC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QUksS0FBSyxHQUFHLEVBQUU7QUFBQSxNQUNqRTtBQUFBLElBQ0YsQ0FBQztBQUFBLEVBQ0g7QUFFQSxTQUFPO0FBQUEsSUFDTCxNQUFNO0FBQUEsSUFDTjtBQUFBLElBQ0EsU0FBUztBQUFBLE1BQ1AsT0FBTztBQUFBLFFBQ0wsS0FBSyxjQUFjLElBQUksSUFBSSxTQUFTLHdDQUFlLENBQUM7QUFBQSxRQUNwRCxLQUFLLGNBQWMsSUFBSSxJQUFJLFdBQVcsd0NBQWUsQ0FBQztBQUFBLE1BQ3hEO0FBQUEsSUFDRjtBQUFBLElBQ0EsUUFBUTtBQUFBLE1BQ04sTUFBTTtBQUFBLE1BQ04sS0FBSztBQUFBLElBQ1A7QUFBQSxJQUNBLFNBQVMsa0JBQWtCLFNBQVMsWUFBWTtBQUFBLElBQ2hELE9BQU87QUFBQSxNQUNMLFFBQVE7QUFBQSxNQUNSLFFBQVEsQ0FBQyxVQUFVLFlBQVksVUFBVSxhQUFhLFVBQVU7QUFBQSxNQUNoRSxlQUFlO0FBQUEsUUFDYixVQUFVO0FBQUEsVUFDUixjQUFjO0FBQUEsVUFDZCxlQUFlO0FBQUEsUUFDakI7QUFBQSxNQUNGO0FBQUEsSUFDRjtBQUFBLElBQ0EsS0FBSztBQUFBLE1BQ0gscUJBQXFCO0FBQUEsUUFDbkIsTUFBTTtBQUFBLFVBQ0wsZ0JBQWdCO0FBQUEsVUFDaEIsV0FBVztBQUFBLFFBQ1o7QUFBQSxNQUNGO0FBQUEsSUFDRjtBQUFBLElBQ0EsY0FBYztBQUFBLE1BQ1osU0FBUyxDQUFDLEdBQUcsc0JBQXNCO0FBQUEsTUFDbkMsZ0JBQWdCO0FBQUEsUUFDZCxRQUFRO0FBQUEsTUFDVjtBQUFBLElBQ0Y7QUFBQSxFQUNGO0FBQ0Y7IiwKICAibmFtZXMiOiBbIlZhcmxldEltcG9ydFJlc29sdmVyIiwgIlZhbnRSZXNvbHZlciIsICJWYXJsZXRJbXBvcnRSZXNvbHZlciIsICJWYW50UmVzb2x2ZXIiXQp9Cg==

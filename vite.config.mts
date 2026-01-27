import { createVitePlugins } from './build/vite/plugins';
import type  { ConfigEnv, UserConfig } from 'vite';
import { loadEnv } from 'vite';
import { wrapperEnv } from './build/utils';
import { fileURLToPath, URL } from 'node:url';
import { readdirSync, statSync } from 'node:fs';
import { dirname } from 'node:path';

// https://vitejs.dev/config/
export default function ({ command, mode }: ConfigEnv): UserConfig {
  const isProduction = command === 'build';
  const root = process.cwd();
  const env = loadEnv(mode, root);
  const viteEnv = wrapperEnv(env);

  const devOptimizeDepsInclude: Array<string> = ['eruda'];
  if (!isProduction) {
    const excludedDirs = ['utils', 'style', 'composables'];
    const __dirname = dirname(fileURLToPath(import.meta.url));

    const uiLibraries = [
      { name: 'vant/es', path: 'node_modules/vant/es' },
      { name: '@nutui/nutui/dist/packages', path: 'node_modules/@nutui/nutui/dist/packages' },
      { name: '@varlet/ui/es', path: 'node_modules/@varlet/ui/es' },
    ];

    uiLibraries.forEach((lib) => {
      try {
        const dirNames = readdirSync(`${__dirname}/${lib.path}`);
        dirNames
          .filter((dirName) => {
            const fullPath = `${__dirname}/${lib.path}/${dirName}`;
            const isDir = statSync(fullPath).isDirectory();
            const isExcluded = excludedDirs.includes(dirName);
            return isDir && !isExcluded;
          })
          .forEach((dirName) => {
            if (lib.name === '@nutui/nutui/dist/packages') {
              if (dirName !== 'locale') {
                devOptimizeDepsInclude.push(`${lib.name}/${dirName}/style/css`);
              }
            } else if (lib.name === 'vant/es') {
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
    base: '/',
    root,
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
        '#': fileURLToPath(new URL('./types', import.meta.url))
      },
    },
    server: {
      host: true,
      hmr: true,
    },
    plugins: createVitePlugins(viteEnv, isProduction),
    build: {
      minify: 'terser',
      target: ['es2022', 'chrome91', 'edge91', 'firefox89', 'safari15'],
      terserOptions: {
        compress: {
          drop_console: true,
          drop_debugger: true,
        },
      },
    },
    css: {
      preprocessorOptions: {
        scss: {
         additionalData: `@use "@/styles/variable.scss" as *;@use "@nutui/nutui/dist/styles/variables.scss" as *;`,
         quietDeps: true,
        },
      },
    },
    optimizeDeps: {
      include: [...devOptimizeDepsInclude],
      esbuildOptions: {
        target: 'es2022'
      }
    },
  };
}
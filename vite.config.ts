import uni from '@dcloudio/vite-plugin-uni'
import icons from 'unplugin-icons/vite'
import vueMarcos from 'unplugin-vue-macros/vite'
import { fileURLToPath } from 'url'
import { defineConfig } from 'vite'
import eslintPlugin from 'vite-plugin-eslint'
import inspect from 'vite-plugin-inspect'
import { viteMockServe } from 'vite-plugin-mock'
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import postcssPresetEnv from 'postcss-preset-env'

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    target: 'es6'
  },
  css: {
    // FIX: not support postcss config file yet
    postcss: {
      plugins: [
        postcssPresetEnv({
          stage: 3,
          features: { 'nesting-rules': false }
        })
      ]
    },
    preprocessorOptions: {
      less: {
        additionalData: '@import "@/assets/variables.less";'
        // javascriptEnabled: true,
        // modifyVars: {
        //   hack: `true; @import "${resolve(process.cwd(), './src/assets').replace(/\\/g, '\\\\')}/variables.less";`
        // }
      }
      // scss: {
      //   charset: false,
      //   additionalData: `@use "@/styles/variables.scss" as *;`
      // }
    }
  },
  envPrefix: ['VITE_', 'UNI_'],
  optimizeDeps: {
    exclude: ['vue-demi']
  },
  plugins: [
    icons({
      compiler: 'vue3',
      defaultClass: 'el-icon'
    }),
    vueMarcos(),
    uni({
      vueOptions: {
        reactivityTransform: true
      },
      viteLegacyOptions: {
        targets: ['ios >= 10', 'chrome >= 53']
      }
    }),
    eslintPlugin({
      include: ['src/**/*.ts', 'src/**/*.vue', 'src/*.ts', 'src/*.vue'],
      exclude: ['./node_modules/**']
    }),
    viteMockServe({
      localEnabled: process.env.NODE_ENV != 'production'
    }),
    inspect()
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('src', import.meta.url))
    }
  }
})

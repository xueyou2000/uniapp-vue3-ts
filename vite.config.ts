import uni from '@dcloudio/vite-plugin-uni'
import { resolve } from 'path'
import { defineConfig } from 'vite'
import eslintPlugin from 'vite-plugin-eslint'
import { viteMockServe } from 'vite-plugin-mock'

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    target: 'es6'
  },
  server: {
    host: '0.0.0.0'
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src')
    }
  },
  css: {
    preprocessorOptions: {
      less: {
        additionalData: '@import "@/assets/variables.less";'
        // javascriptEnabled: true,
        // modifyVars: {
        //   hack: `true; @import "${resolve(process.cwd(), './src/assets').replace(/\\/g, '\\\\')}/variables.less";`
        // }
      }
    }
  },
  plugins: [
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
    })
  ]
})

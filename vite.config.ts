import { defineConfig } from 'vite'
import uni from '@dcloudio/vite-plugin-uni'
import eslintPlugin from 'vite-plugin-eslint'
import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
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
    uni(),
    eslintPlugin({
      include: ['src/**/*.ts', 'src/**/*.vue', 'src/*.ts', 'src/*.vue']
    })
  ]
})

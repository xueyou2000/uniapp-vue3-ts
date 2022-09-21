import 'core-js/actual'
import { createSSRApp } from 'vue'
import * as Pinia from 'pinia'
import App from './App.vue'
import { initDayjs } from '@/initialize/dayjs'
import { VueQueryPlugin } from 'vue-query'
import { vueQueryPluginOptions } from './helpers'

import '@/assets/global.less'

initDayjs()

export function createApp() {
  const app = createSSRApp(App)
  app.use(Pinia.createPinia()).use(VueQueryPlugin, vueQueryPluginOptions)
  return {
    app,
    Pinia
  }
}

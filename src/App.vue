<script setup lang="ts">
import { onLaunch, onShow, onHide } from '@dcloudio/uni-app'
import { useUserStore } from '@/stores'

onLaunch(() => {
  console.log('App Launch')
  const userStore = useUserStore()
  userStore.getUserInfo()
})
onShow(() => {
  console.log('App Show')
})
onHide(() => {
  console.log('App Hide')
})
</script>
<style>
@import '@/static/iconfont/iconfont.css';
page {
  font-feature-settings: 'liga', 'kern';
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  -webkit-text-size-adjust: none;
  -webkit-overflow-scrolling: auto;
  font-family: 'PingFang SC', 'Microsoft Yahei', Colfax, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell,
    Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
  height: 100%;
}
/** 设置了 titleNView:false 的，请加入此样式，否则app状态栏会被遮挡 */
.title-nview {
  // #ifdef H5
  height: var(--status-bar-height);
  // #endif
  width: 100%;
}
</style>

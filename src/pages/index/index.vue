<template>
  <view class="content">
    <image class="logo" src="/static/logo.png" @click="increment" />
    <view class="text-area">
      <text class="title">{{ title }} Count: {{ count }} Double: {{ double }}</text>
    </view>
  </view>
</template>

<script lang="ts">
import { onLoad } from '@dcloudio/uni-app'
import { defineComponent, ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useCounterStore } from '@/stores/counter'

export default defineComponent({
  setup() {
    const title = ref('Hello')
    const countStore = useCounterStore()
    const { count, double } = storeToRefs(countStore)

    onLoad((params) => {
      console.log(uni.getSystemInfoSync())
      console.log('首页 onLoad params: ', params)
    })
    return {
      title,
      count,
      double,
      increment: countStore.increment
    }
  }
})
</script>

<style lang="less">
.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.logo {
  height: 200rpx;
  width: 200rpx;
  margin-top: 200rpx;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 50rpx;
}

.text-area {
  display: flex;
  justify-content: center;
}

.title {
  font-size: 36rpx;
  color: @uni-color-success;
}
</style>

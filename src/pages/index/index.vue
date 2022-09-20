<template>
  <view class="content">
    <image class="logo" src="/static/logo.png" @click="increment" />
    <view class="text-area">
      <text class="title">{{ title }} Count: {{ count }} Double: {{ double }}</text>
    </view>
    <view>
      <text v-if="isLoading">加载中...</text>
      <text>{{ data }}</text>
    </view>
    <button type="primary" @click="id++">发起请求</button>
    <button type="primary" @click="refetch()">发起请求(缓存)</button>
    <!-- <button type="primary" @click="fetch(false)">发起请求</button>
    <button type="primary" @click="fetch(true)">发起请求(缓存)</button> -->
  </view>
</template>

<script lang="ts">
import { onLoad } from '@dcloudio/uni-app'
import { defineComponent, ref, computed } from 'vue'
import { storeToRefs } from 'pinia'
import { useCounterStore } from '@/stores/counter'
import { uanInstance } from '@/helpers'
import { useQuery } from 'vue-query'

export default defineComponent({
  setup() {
    const title = ref('Hello')
    const id = ref(1)
    const countStore = useCounterStore()
    const { count, double } = storeToRefs(countStore)

    const { data, isLoading, refetch } = useQuery<TResponseData, IRequestError>([computed(() => `/api/get?id=${id.value}`)])

    function fetch(cache = false) {
      uanInstance
        .get<TResponseData, TRequestData, IRequestResponse<TResponseData, TRequestData>>(
          cache ? '/api/get' : `/api/get?time=${new Date().getTime()}`
        )
        .then((res) => {
          console.log('res', res)
        })
        .catch((error) => {
          console.dir(error)
        })

      // uni.request({
      //   url: cache ? '/api/get' : `/api/get?time=${new Date().getTime()}`,
      //   success: (res) => {
      //     console.log('res', res)
      //   },
      //   fail: (error) => {
      //     console.log('error', error)
      //   }
      // })
    }

    onLoad((params) => {
      console.log(uni.getSystemInfoSync())
      console.log('首页 onLoad params: ', params)
    })
    return {
      title,
      count,
      double,
      increment: countStore.increment,
      fetch,
      id,
      data,
      isLoading,
      refetch
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

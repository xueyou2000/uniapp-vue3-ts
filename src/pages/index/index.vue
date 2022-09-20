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
    <uni-list :border="true">
      <!-- 显示圆形头像 -->
      <uni-list-chat
        :avatar-circle="true"
        title="uni-app"
        avatar="https://vkceyugu.cdn.bspapp.com/VKCEYUGU-dc-site/460d46d0-4fcc-11eb-8ff1-d5dcf8779628.png"
        note="您收到一条新的消息"
        time="2020-02-02 20:20"
      ></uni-list-chat>
      <!-- 右侧带角标 -->
      <uni-list-chat
        title="uni-app"
        avatar="https://vkceyugu.cdn.bspapp.com/VKCEYUGU-dc-site/460d46d0-4fcc-11eb-8ff1-d5dcf8779628.png"
        note="您收到一条新的消息"
        time="2020-02-02 20:20"
        badge-text="12"
      ></uni-list-chat>
      <!-- 头像显示圆点 -->
      <uni-list-chat
        title="uni-app"
        avatar="https://vkceyugu.cdn.bspapp.com/VKCEYUGU-dc-site/460d46d0-4fcc-11eb-8ff1-d5dcf8779628.png"
        note="您收到一条新的消息"
        time="2020-02-02 20:20"
        badge-positon="left"
        badge-text="dot"
      ></uni-list-chat>
      <!-- 头像显示角标 -->
      <uni-list-chat
        title="uni-app"
        avatar="https://vkceyugu.cdn.bspapp.com/VKCEYUGU-dc-site/460d46d0-4fcc-11eb-8ff1-d5dcf8779628.png"
        note="您收到一条新的消息"
        time="2020-02-02 20:20"
        badge-positon="left"
        badge-text="99"
      ></uni-list-chat>
      <!-- 显示多头像 -->
      <uni-list-chat
        title="uni-app"
        :avatar-list="avatarList"
        note="您收到一条新的消息"
        time="2020-02-02 20:20"
        badge-positon="left"
        badge-text="dot"
      ></uni-list-chat>
      <!-- 自定义右侧内容 -->
      <uni-list-chat
        title="uni-app"
        :avatar-list="avatarList"
        note="您收到一条新的消息"
        time="2020-02-02 20:20"
        badge-positon="left"
        badge-text="dot"
      >
        <view class="chat-custom-right">
          <text class="chat-custom-text">刚刚</text>
          <!-- 需要使用 uni-icons 请自行引入 -->
          <uni-icons type="star-filled" color="#999" size="18"></uni-icons>
        </view>
      </uni-list-chat>
    </uni-list>
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
      refetch,
      avatarList: [
        {
          url: 'https://vkceyugu.cdn.bspapp.com/VKCEYUGU-dc-site/460d46d0-4fcc-11eb-8ff1-d5dcf8779628.png'
        },
        {
          url: 'https://vkceyugu.cdn.bspapp.com/VKCEYUGU-dc-site/460d46d0-4fcc-11eb-8ff1-d5dcf8779628.png'
        },
        {
          url: 'https://vkceyugu.cdn.bspapp.com/VKCEYUGU-dc-site/460d46d0-4fcc-11eb-8ff1-d5dcf8779628.png'
        }
      ]
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
.chat-custom-right {
  flex: 1;
  /* #ifndef APP-NVUE */
  display: flex;
  /* #endif */
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-end;
}

.chat-custom-text {
  font-size: 12px;
  color: #999;
}
</style>

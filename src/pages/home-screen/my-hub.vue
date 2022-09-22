<template>
  <view class="my-hub">
    <view class="title-nview"></view>
    <view class="page_hd">
      <view class="user-panel">
        <view class="avatar">
          <image class="avatar-img" :src="userInfo?.avatar || '/static/fallback/avatar.png'"></image>
        </view>
        <view class="user-summary">
          <view class="summary__name">
            <text class="name">{{ userInfo?.name || '未登录' }}</text>
          </view>
          <view class="summary__addr" @click="copyChinaAddr">
            <text>区块链地址：</text>
            <text class="address">{{ chinaAddrMasking(userInfo?.chainAddress || '') }}</text>
            <uni-icons size="14" custom-prefix="iconfont" type="icon-file-copy"></uni-icons>
          </view>
        </view>
      </view>
      <view class="primary-entrance">
        <navigator url="/pages/account/dashboard" open-type="navigate">
          <view class="entrance-item" data-type="wallet">
            <view class="intro">
              <text class="title">钱包</text>
              <text class="desc">点击查看余额</text>
            </view>
            <image class="img" src="@/static/pages/home-screen/wallet_whilte_icon.png"></image>
          </view>
        </navigator>
        <navigator url="/pages/world" open-type="navigate">
          <view class="entrance-item" data-type="world">
            <view class="intro">
              <text class="title">我的世界</text>
              <text class="desc">铸造已开放</text>
            </view>
            <image class="img" src="@/static/pages/home-screen/wallet_whilte_icon.png"></image>
          </view>
        </navigator>
      </view>

      <uni-grid
        class="menu-grid"
        :column="4"
        :show-border="false"
        :square="false"
        :highlight="false"
        @change="onMenuGridClick($event.detail.index)"
      >
        <uni-grid-item v-for="(item, index) in HD_MENUS" :index="index" :key="index">
          <view class="grid-item-item">
            <image class="image" :src="item.icon" />
            <text class="text">{{ item.text }}</text>
          </view>
        </uni-grid-item>
      </uni-grid>
    </view>
  </view>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { storeToRefs } from 'pinia'
import { useUserStore } from '@/stores'
import { chinaAddrMasking } from '@/utils/string-utils'

const HD_MENUS = [
  {
    icon: '/static/pages/home-screen/menu_icons/order.png',
    text: '全部订单',
    path: '/pages/account/order-list'
  },
  {
    icon: '/static/pages/home-screen/menu_icons/interest.png',
    text: '我的勋章',
    path: '/pages/account/medal'
  },
  {
    icon: '/static/pages/home-screen/menu_icons/friend.png',
    text: '邀请好友',
    path: '/pages/my/share'
  },
  {
    icon: '/static/pages/home-screen/menu_icons/setting.png',
    text: '个人中心',
    path: '/pages/my/setting'
  }
]

export default defineComponent({
  setup() {
    const userStore = useUserStore()
    const { userInfo } = storeToRefs(userStore)

    function onMenuGridClick(index: number) {
      const item = HD_MENUS[index]
      uni.navigateTo({
        url: item.path
      })
    }

    return {
      HD_MENUS,
      userInfo,
      chinaAddrMasking,
      copyChinaAddr: userStore.copyChinaAddr,
      onMenuGridClick
    }
  }
})
</script>

<style scoped lang="less">
.my-hub {
  min-height: 100%;
  background: #f6f6f6;
  .title-nview {
    position: sticky;
    top: 0;
    background-color: #fff;
  }
}
.page_hd {
  padding: 20rpx 26rpx 40rpx 26rpx;
  background: #fff;

  .user-panel {
    display: flex;
    align-items: center;

    .avatar {
      width: 120rpx;
      height: 120rpx;
      border-radius: 50%;
      overflow: hidden;

      .avatar-img {
        width: 100%;
        height: 100%;
      }
    }

    .user-summary {
      flex: 1;
      margin-left: 22rpx;
      color: #0f0f0f;
    }
    .summary__name {
      font-size: 34rpx;
      font-weight: bold;
    }
    .summary__addr {
      display: inline-block;
      margin-top: 12rpx;
      padding: 6rpx 20rpx;
      background: #f6f6f6;
      border-radius: 26rpx;
      font-size: 28rpx;
      font-weight: 500;

      .address {
        margin: 0 6rpx;
      }
    }
  }

  .primary-entrance {
    display: flex;
    justify-content: space-between;
    margin-top: 36rpx;

    .entrance-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 30rpx 28rpx 30rpx 32rpx;
      background: #1c1e20 url(@/static/pages/home-screen/card_texture.png) no-repeat;
      background-size: contain;
      color: #fff;
      border-radius: 15rpx;

      .intro {
        margin-right: 56rpx;
      }

      .title {
        display: block;
        font-size: 32rpx;
        font-weight: 500;
      }
      .desc {
        display: block;
        margin-top: 12rpx;
        font-size: 24rpx;
        font-weight: 100;
        color: #dedede;
      }

      &[data-type='wallet'] {
        .img {
          width: 79rpx;
          height: 76rpx;
        }
      }
      &[data-type='world'] {
        .img {
          width: 103rpx;
          height: 85rpx;
        }
      }
    }
  }

  .menu-grid {
    display: flex;
    margin-top: 30rpx;
    .grid-item-item {
      display: flex;
      flex-direction: column;
      align-items: center;

      .image {
        width: 60rpx;
        height: 60rpx;
        margin: auto;
      }
      .text {
        font-size: 24rpx;
        font-weight: 400;
        color: #0f0f0f;
        margin-top: 12rpx;
      }
    }
  }
}
</style>

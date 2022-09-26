<template>
  <view class="my-hub">
    <view class="title-nview"></view>
    <z-paging ref="pagingRef" @scroll="scroll" refresher-only :scrollable="scrollable" @query="refresh">
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
      <view class="page_bd" :class="{ sticked }" :style="'height:' + contentHeight + 'px'">
        <!-- 小程序中直接修改组件style为position: sticky;无效，需要在组件外层套一层view -->
        <view class="tabs-wrapper" style="z-index: 100; position: sticky; top: 0">
          <z-tabs
            ref="tabsRef"
            :list="tabList"
            :current="currentTab"
            @change="changeTab"
            :scroll-count="1"
            active-color="#0f0f0f"
            inactive-color="#999"
            :bar-style="{ background: '#FFDE75', borderRadius: '6px', height: '8rpx' }"
          ></z-tabs>
        </view>
        <swiper class="swiper" :current="currentTab" @transition="swiperTransition" @animationfinish="swiperAnimationfinish">
          <swiper-item class="swiper-item" v-for="(item, index) in tabList" :key="index">
            <MyGoodsList
              ref="myGoodsListRef"
              :tabIndex="index"
              :currentIndex="currentTab"
              :sticked="sticked"
              @set-scrollable="setScrollable"
              @set-sticked="setSticked"
            ></MyGoodsList>
          </swiper-item>
        </swiper>
      </view>
    </z-paging>
  </view>
</template>

<script lang="ts">
import { onLoad } from '@dcloudio/uni-app'
import { defineComponent, ref, nextTick, computed } from 'vue'
import { storeToRefs } from 'pinia'
import { useUserStore } from '@/stores'
import { chinaAddrMasking } from '@/utils/string-utils'
import MyGoodsList from '@/components/my-collection/my-goods-list.vue'

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
  components: {
    MyGoodsList
  },
  setup() {
    const userStore = useUserStore()
    const { userInfo } = storeToRefs(userStore)
    const currentTab = ref(0)
    const tabList = ref(['我的藏品', '我的空投', '我的盲盒'])
    const scrollable = ref(true)
    const sticked = ref(false)
    const tabsNode = ref({ height: 0, top: 0 })
    const contentHeight = ref(640)
    const pagingRef = ref<InstanceType<any>>()
    const myGoodsListRef = ref<InstanceType<any>>()
    const tabsRef = ref<InstanceType<any>>()

    function onMenuGridClick(index: number) {
      const item = HD_MENUS[index]
      uni.navigateTo({
        url: item.path
      })
    }

    function refresh() {
      myGoodsListRef.value[currentTab.value].reload(() => {
        pagingRef.value?.complete([])
      })
    }

    function scroll(e: any) {
      const scrollTop = e.detail.scrollTop
      //如果当前页面的scroll-view的scrollTop大于等于headerView的高度，则代表吸顶了
      if (scrollTop < tabsNode.value.top) {
        //还没吸顶
        //禁止子组件的z-paging(scroll-view)滚动，当前页面的z-paging(scroll-view)允许滚动
        scrollable.value = true
        myGoodsListRef.value[currentTab.value].setScrollable(false)
        sticked.value = false
      } else {
        //吸顶了
        //允许子组件的z-paging(scroll-view)滚动，当前页面的z-paging(scroll-view)禁止滚动
        scrollable.value = false
        myGoodsListRef.value[currentTab.value].setScrollable(true)
        sticked.value = true
      }
    }

    function setScrollable(_scrollable: boolean) {
      scrollable.value = _scrollable
    }

    function setSticked() {
      scrollable.value = false
      pagingRef.value?.scrollToY(tabsNode.value.top)
      sticked.value = true
    }

    function changeTab(i: number) {
      currentTab.value = i
    }

    /** 同步swiper滑动过程中tabs下的横线滑动 */
    function swiperTransition(e: any) {
      // tabsRef.value?.setDx(e.detail.dx)
    }
    function swiperAnimationfinish(e: any) {
      currentTab.value = e.detail.current
      // myGoodsListRef.value[currentTab.value].setScrollable(!scrollable.value)
      // tabsRef.value?.unlockDx(e.detail.dx)
    }

    onLoad(() => {
      const info = uni.getSystemInfoSync()
      // contentHeight.value = 630
      nextTick(() => {
        const query = uni.createSelectorQuery()
        query
          .select('.tabs-wrapper')
          .boundingClientRect((data: any) => {
            tabsNode.value = data
            console.log(data)
            // const surplus = info.windowHeight + data.top - info.screenHeight
            // console.log(info.screenHeight, info.windowHeight)
            // contentHeight.value = surplus > 0 ? info.windowHeight : info.windowHeight + surplus
          })
          .exec()
      })
    })

    return {
      HD_MENUS,
      userInfo,
      chinaAddrMasking,
      copyChinaAddr: userStore.copyChinaAddr,
      onMenuGridClick,
      currentTab,
      changeTab,
      tabList,
      pagingRef,
      myGoodsListRef,
      scrollable,
      refresh,
      setScrollable,
      setSticked,
      scroll,
      tabsRef,
      swiperTransition,
      swiperAnimationfinish,
      contentHeight,
      sticked
    }
  }
})
</script>

<style scoped lang="less">
.my-hub {
  height: 100%;
  background: #f6f6f6;
  .title-nview {
    position: sticky;
    top: 0;
    background-color: #fff;
  }
  :deep(.zp-paging-container-content) {
    height: 100%;
    display: flex;
    flex-direction: column;
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
.page_bd {
  background: #fff;
  margin-top: 40rpx;
  // flex: 1;
  display: flex;
  flex-direction: column;
  .tabs-wrapper {
    background: #fff;
    padding: 20rpx 30rpx;
    padding-bottom: 0;
  }
  .swiper {
    flex: 1;
    padding-top: 20rpx;
    padding-bottom: 80rpx;
  }

  &.sticked {
    .tabs-wrapper {
      box-shadow: 0 0 50px 0px rgb(30 0 60 / 30%);
    }
  }

  :deep(.z-tabs-item) {
    font-size: 34px;
    font-weight: 500;

    &:not(:last-child) {
      margin-right: 40rpx;
    }
  }
}
</style>

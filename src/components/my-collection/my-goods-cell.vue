<template>
  <view class="my-goods">
    <image class="thumbnail" :src="item?.goods_thumb" />
    <view class="content">
      <view
        ><text class="title">{{ item?.goods_name }}</text></view
      >
      <view
        ><text class="count">共{{ item?.total }}个</text></view
      >
    </view>
  </view>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import type { PropType } from 'vue'

export default defineComponent({
  props: {
    item: {
      type: Object as PropType<MyGoodsInfo>,
      require: true
    }
  },
  setup() {
    return {}
  }
})
</script>

<style scoped lang="less">
.my-goods {
  width: 330rpx;
  display: flex;
  flex-direction: column;
  border-radius: 20rpx;
  overflow: hidden;
  box-shadow: 0rpx 6rpx 12rpx rgba(153, 153, 153, 0.16);
  .thumbnail {
    width: 330rpx;
    height: 330rpx;
  }
  .content {
    padding: 20rpx;
    display: flex;
    flex-direction: column;
    background-color: #fff;
    .title {
      color: #0f0f0f;
      font-size: 30rpx;
      font-weight: bold;
    }
    .count {
      margin-top: 10rpx;
      font-size: 26rpx;
      font-weight: 400;
      color: #999999;
    }
  }
}
</style>

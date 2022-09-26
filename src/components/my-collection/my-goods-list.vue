<template>
  <view class="my-goods-list" :class="{ empty: dataList.length == 0 }">
    <z-paging
      class="zpadding"
      ref="pagingRef"
      v-model="dataList"
      @query="queryByPage"
      :fixed="false"
      :auto="false"
      @scroll="scroll"
      :watch-touch-direction-change="true"
      @touchDirectionChange="touchDirectionChange"
      :scrollable="scrollable"
      :refresher-enabled="false"
      @scrolltoupper="scrolltoupper"
    >
      <template v-slot:loading>
        <uni-load-more status="loading" />
      </template>
      <uni-grid :column="2" :highlight="false" :showBorder="false">
        <uni-grid-item v-for="(item, index) in dataList" :key="item.goods_pid" :index="index">
          <my-goods-cell class="item" :item="item"></my-goods-cell>
        </uni-grid-item>
      </uni-grid>
      <!-- <my-goods-cell class="item" v-for="item in dataList" :key="item.goods_pid"></my-goods-cell> -->
    </z-paging>
  </view>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue'
import { queryMyGoodsByPage } from '@/service/goods'
import MyGoodsCell from '@/components/my-collection/my-goods-cell.vue'

export default defineComponent({
  name: 'MyGoodsList',
  components: {
    MyGoodsCell
  },
  props: {
    /** 当前组件的index，也就是当前组件是swiper中的第几个 */
    tabIndex: {
      type: Number,
      default: 0
    },
    /** 当前swiper切换到第几个index */
    currentIndex: {
      type: Number,
      default: 0
    },
    sticked: {
      type: Boolean,
      default: false
    }
  },
  emits: ['setScrollable', 'setSticked'],
  setup(props, { emit }) {
    const dataList = ref<MyGoodsInfo[]>([])
    const firstLoaded = ref(false)
    const pagingRef = ref<InstanceType<any>>()
    const scrollable = ref(false)
    const scrollTop = ref(0)
    const completeFunc = ref<(() => void) | null>(null)

    function queryByPage(pageNum: number, pageSize: number) {
      return queryMyGoodsByPage({ page: pageNum, page_size: pageSize, type: props.tabIndex })
        .then((data) => {
          pagingRef.value?.complete(data)
          firstLoaded.value = true
          if (completeFunc.value) {
            completeFunc.value()
          }
        })
        .catch(() => {
          pagingRef.value?.complete(false)
          if (completeFunc.value) {
            completeFunc.value()
          }
        })
    }

    function touchDirectionChange(direction: string) {
      /** 当前列表滚动至顶部且吸顶时才需判断 */
      if (!(scrollTop.value === 0 && props.sticked)) return

      if (direction === 'top') {
        // 用户将列表向上移动(scrollTop不断减小)，这时候要禁止当前组件的列表滚动，允许页面z-paging滚动
        emit('setScrollable', true)
        scrollable.value = false
      } else if (direction === 'bottom') {
        // 用户将列表向下移动(scrollTop不断增大)，这时候要允许当前组件的列表滚动，禁止页面z-paging滚动
        emit('setScrollable', false)
        scrollable.value = true
      }
    }

    function scroll(e: any) {
      scrollTop.value = e.detail?.scrollTop || 0
      if (scrollTop.value > 10) {
        emit('setScrollable', false)
      }
      // 如果组件内list滚动的时候，是未吸顶的状态，则通知页面滚动到吸顶状态并且禁止页面列表滚动
      if (!props.sticked) {
        emit('setSticked', false)
      }
    }

    function scrolltoupper() {
      scrollTop.value = 0
      emit('setScrollable', true)
    }

    watch(
      [() => props.currentIndex, () => pagingRef.value],
      ([newValue]) => {
        if (newValue === props.tabIndex && pagingRef.value) {
          if (!firstLoaded.value) {
            setTimeout(() => {
              // 此tab内容初次切换到，则自动加载
              pagingRef.value?.reload()
              setTimeout(() => {
                // 首次切换到当前tab时，如果当前是吸顶状态，则设置当前列表允许滚动
                if (props.sticked) {
                  scrollable.value = true
                }
              }, 100)
            }, 100)
          }

          // 非首次切换到当前tab时，如果scrollTop=0，则页面list允许滚动
          if (scrollTop.value === 0 && firstLoaded.value) {
            emit('setScrollable', true)
          }
        }
      },
      { immediate: true }
    )

    function setScrollable(_scrollable: boolean) {
      scrollable.value = _scrollable
    }

    function reload(_completeFunc: () => void) {
      completeFunc.value = _completeFunc
      pagingRef.value?.reload()
    }

    function reset() {
      pagingRef.value?.scrollToY(0)
    }

    return {
      dataList,
      scrollable,
      queryByPage,
      pagingRef,
      setScrollable,
      reload,
      touchDirectionChange,
      scrolltoupper,
      scroll,
      reset
    }
  }
})
</script>

<style lang="less">
.my-goods-list {
  height: 100%;

  .item {
    margin: 20rpx auto;
  }

  :deep(.uni-grid-wrap) {
    padding: 40rpx 0;
  }

  &.empty {
    /** TIPS: 这里只有H5生效，小程序无法选择子组件的样式，:deep只能用于页面，不能用于组件！ */
    :deep(.zp-paging-container) {
      .zp-paging-container-content {
        height: auto !important;
      }
      .zp-empty-view-center {
        margin-top: -600rpx !important;
      }
    }
  }
}
</style>

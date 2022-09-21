<template>
  <view class="content">
    <uni-data-checkbox mode="list" v-model="value" :localdata="options" multiple></uni-data-checkbox>
  </view>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  setup() {
    return {
      value: ['sh'],
      options: [
        { value: 'bj', text: '北京' },
        { value: 'sh', text: '上海' },
        { value: 'gz', text: '广州' }
      ]
    }
  }
})
</script>

<template>
  <a-breadcrumb class="container-breadcrumb">
    <a-breadcrumb-item>
      <icon-apps />
    </a-breadcrumb-item>
    <a-breadcrumb-item v-for="item in items" :key="item">
      {{ internationalization ? $t(item) : item }}
    </a-breadcrumb-item>
  </a-breadcrumb>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';

export default defineComponent({
  props: {
    items: {
      type: Array as PropType<string[]>,
      default() {
        return [];
      },
    },
    internationalization: {
      type: Boolean,
      default: true,
    },
  },
});
</script>

<style scoped lang="less">
.container-breadcrumb {
  margin: 16px 0;
  :deep(.arco-breadcrumb-item) {
    color: rgb(var(--gray-6));
    &:last-child {
      color: rgb(var(--gray-8));
    }
  }
}
</style>

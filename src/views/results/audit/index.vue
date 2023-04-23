<template>
  <div class="container">
    <Breadcrumb
      :items="['成果管理', '成果审核']"
      :internationalization="false"
    />
    <a-card title="">
      <result-table-list usage-type="audit" />
    </a-card>
  </div>
</template>

<script lang="ts">
import ResultTableList from '@/views/results/component/result-table-list.vue';

export default {
  components: { ResultTableList },
  setup() {
    return {};
  },
};
</script>

<style scoped>
.container {
  padding: 0 20px 40px 20px;
  overflow: hidden;
}

/*.layout-demo :deep(.arco-layout-sider-children),*/
/*.layout-demo :deep(.arco-layout-content) {*/
/*  display: flex;*/
/*  flex-direction: column;*/
/*  font-size: 16px;*/
/*  font-stretch: condensed;*/
/*}*/

/*.layout-demo :deep(.arco-layout-sider) {*/
/*  width: 206px;*/
/*  min-width: 150px;*/
/*  max-width: 500px;*/
/*  min-height: 520px;*/
/*}*/
</style>

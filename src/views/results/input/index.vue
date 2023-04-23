<template>
  <div class="container">
    <Breadcrumb
      :items="['成果管理', '成果录入']"
      :internationalization="false"
    />
    <a-card title="">
      <result-table-list usage-type="input" />
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
</style>

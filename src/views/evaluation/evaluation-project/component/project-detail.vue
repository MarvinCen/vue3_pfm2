<template>
  <Breadcrumb :items="['menu.list', 'menu.list.cardList']" />
  <a-card>
    <a-tabs class="step-tabs" type="rounded" v-model:active-key="currentTab" animation destroy-on-hide>
        <a-tab-pane :key="1" title="成果录入">
					<result-table-list usage-type="input" />
        </a-tab-pane>
        <a-tab-pane :key="2" title="成果分配">
					<result-table-list usage-type="distribution" />
        </a-tab-pane>
        <a-tab-pane :key="3" title="导出结果"></a-tab-pane>
    </a-tabs>

  </a-card>

</template>

<script setup lang="ts">
import {reactive, ref} from "vue";
import ResultTableList from "@/views/results/component/result-table-list.vue";

const currentTab = ref(1);

</script>

<style scoped lang="less">
//.arco-tabs-nav-tab {
//  justify-content:  center;
//  align-content: center;
//}
</style>
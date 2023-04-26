<template>
  <a-layout style="min-height: 500px; max-height: 500px">
    <a-layout-sider style="max-width: 200px">
      <div style="margin-right: 10px">
        <a-table
          :data="plans"
          :columns="PlanNameColumns"
          @row-click="selectPlan"
        />
      </div>
    </a-layout-sider>
    <a-layout-content>
      <a-table :columns="evaluationEmployeeColumns"></a-table>
    </a-layout-content>
  </a-layout>
</template>

<script setup>
import { defineProps, ref } from 'vue';

defineProps({
  plans: {
    type: Array,
    required: true,
    default: () => {
      return [];
    },
  },
});

const PlanNameColumns = [
  {
    dataIndex: 'name',
    title: '考核方案名称',
    align: 'center',
    ellipsis: true,
    tooltip: true,
  },
];
const evaluationEmployeeColumns = [
  {
    dataIndex: 'name',
    title: '姓名',
    align: 'center',
    ellipsis: true,
    tooltip: true,
  },
  {
    dataIndex: 'jobNumber',
    title: '工号',
    align: 'center',
    ellipsis: true,
    tooltip: true,
  },
  {
    dataIndex: 'hireType',
    title: '聘用类型',
    align: 'center',
    ellipsis: true,
    tooltip: true,
  },
  {
    dataIndex: 'position',
    title: '岗位',
    align: 'center',
    ellipsis: true,
    tooltip: true,
  },
  {
    dataIndex: 'positionLevel',
    title: '岗位等级',
    align: 'center',
    ellipsis: true,
    tooltip: true,
  },
  {
    dataIndex: 'needCalc',
    title: '是否参与计算',
    align: 'center',
    ellipsis: true,
    tooltip: true,
  },
  {
    title: '操作',
    align: 'center',
    ellipsis: true,
    tooltip: true,
    slotName: 'operation',
  },
];

const selectedPlan = ref({});
const selectPlan = (plan) => {
  selectedPlan.value = plan;
};
</script>

<style scoped>
.arco-layout-sider-light {
  box-shadow: none;
}
</style>

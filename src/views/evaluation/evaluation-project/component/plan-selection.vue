<template>
  <a-layout style="min-height: 500px; max-height: 500px">
    <a-layout-sider style="max-width: 200px">
      <div style="margin-right: 10px">
        <a-table
          :data="plans"
          :columns="PlanNameColumns"
          @row-click="selectPlan"
          :pagination="false"
        />
      </div>
    </a-layout-sider>
    <a-layout-content>
      <a-table :columns="evaluationEmployeeColumns" :data="employees">
        <template #operation>
          <a-button status="success" size="small">计算</a-button>
          <a-divider direction="vertical" />
          <a-button status="danger"  size="small">删除</a-button>
        </template>
      </a-table>
    </a-layout-content>
  </a-layout>
</template>

<script setup lang="ts">
import { defineProps, ref } from 'vue';
import { EvaluationPlan } from '@/types/evaluation';
import {TableColumnData} from "@arco-design/web-vue";
import {findEmployeeByPlanFilter} from "@/api/evaluation/evaluation-plan";
import {Employee} from "@/types/basic-data";

defineProps({
  plans: {
    type: Array,
    required: true,
    default: () => {
      return [];
    },
  },
});

const PlanNameColumns: TableColumnData[] = [
  {
    dataIndex: 'name',
    title: '考核方案名称',
    align: 'center',
    ellipsis: true,
    tooltip: true,
  },
];
const evaluationEmployeeColumns: TableColumnData[] = [
  {
    dataIndex: 'name',
    title: '姓名',
    align: 'center',
    ellipsis: true,
    tooltip: true,
    width: 80,
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
    width: 240,
  },
];

const selectedPlan = ref<EvaluationPlan>();
const employees = ref<Employee[]>([]);
const selectPlan = (plan: EvaluationPlan) => {
  selectedPlan.value = plan;
  findEmployeeByPlanFilter(
    plan.positions as string[],
    plan.professionalTitles as string[]
  ).then(res => {
    employees.value = res.data.list;
  });
};

</script>

<style scoped lang="less">
.arco-layout-sider-light {
  box-shadow: none;
}
</style>

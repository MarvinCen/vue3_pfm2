<template>
  <div class="container">
    <Breadcrumb
      :items="[
        'menu.evaluation',
        'menu.evaluation.evaluationProject',
        'menu.evaluation.evaluationProjectCreation',
      ]"
    />
    <a-form :model="project">
      <a-card class="general-card" title="基本信息">
        <a-row :gutter="[24, 30]">
          <a-col :span="8">
            <a-form-item field="type" label="项目类型">
              <a-select v-model="project.type" style="width: 280px">
                <a-option>年度考核项目</a-option>
                <a-option>聘期考核项目</a-option>
              </a-select>
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="[24, 30]">
          <a-col :span="8">
            <a-form-item field="startTime" label="开始时间">
              <a-date-picker v-model="project.startTime" style="width: 280px" />
            </a-form-item>
          </a-col>
          <a-col :span="8">
            <a-form-item field="startTime" label="结束时间">
              <a-date-picker v-model="project.endTime" style="width: 280px" />
            </a-form-item>
          </a-col>
          <a-col :span="8"></a-col>
          <a-col :span="8"></a-col>
        </a-row>
        <a-row :gutter="16" align="center" :wrap="false">
          <a-col :span="8">
            <a-form-item field="startTime" label="成果分配截止时间">
              <a-date-picker
                v-model="project.resultCheckedExpireTime"
                style="width: 280px"
              />
            </a-form-item>
          </a-col>
          <a-col :span="8">
            <a-form-item field="startTime" label="绩效确认截止时间">
              <a-date-picker
                v-model="project.pfmCheckedExpireTime"
                style="width: 280px"
              />
            </a-form-item>
          </a-col>
        </a-row>
      </a-card>
      <a-card
        class="general-card"
        title="选择考核方案"
        style="margin-top: 20px"
      >
        <a-select
          v-model="selectedPlans"
          multiple
          allow-clear
          :scrollbar="true"
          size="large"
        >
          <a-option
            v-for="plan in allPlans"
            :key="plan.eid"
            :value="plan"
            :label="plan.name"
          />
        </a-select>
        <plan-selection />
      </a-card>
    </a-form>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { EvaluationPlan } from '@/types/evaluation';
import { findEvaluationPlans } from '@/api/evaluation/evaluation-plan';
import { Response } from '@/types/global';
import PlanSelection from './plan-selection.vue';

const project = ref({});

const allPlans = ref<EvaluationPlan[]>([]);
onMounted(() => {
  findEvaluationPlans().then((res) => {
    const resp = res as Response;
    allPlans.value = resp.data.list;
    console.log(allPlans.value);
  });
});

const selectedPlans = ref<EvaluationPlan[]>([]);
</script>

<style scoped lang="less">
.container {
  padding: 0 20px 20px 20px;
}

.general-card {
  border: none;
  border-radius: 4px;

  & > .arco-card-header {
    height: auto;
    padding: 20px;
    border: none;
  }

  & > .arco-card-body {
    padding: 0 20px 20px;
  }
}
</style>

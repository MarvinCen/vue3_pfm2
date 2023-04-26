<template>
  <div class="container">
    <Breadcrumb
      :items="[
        'menu.evaluation',
        'menu.evaluation.evaluationPlan',
        'menu.evaluation.evaluationPlanCreation',
      ]"
    />
    <a-card class="card">
      <a-steps :current="currentStep" label-placement="vertical">
        <a-step>填写表单</a-step>
        <a-step>创建考核指标</a-step>
        <a-step>完成创建</a-step>
      </a-steps>
    </a-card>

    <plan-basic-info v-if="currentStep === 1" @change-step="changeStep" />
    <plan-indicator
      v-if="currentStep === 2"
      @change-step="changeStep"
      @create-evaluation-plan="doCreateEvaluationPlan"
    />
    <a-card v-if="currentStep === 3" style="margin-top: 20px; height: 400px">
      <div style="margin-top: 40px">
        <a-result status="success" title="创建成功~">
          <template #extra>
            <a-space>
              <a-button
                type="primary"
                @click="
                  () => {
                    $router.push({ name: 'evaluationPlan' });
                  }
                "
              >
                返回列表
              </a-button>
            </a-space>
          </template>
        </a-result>
      </div>
    </a-card>

    <div></div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import PlanBasicInfo from '@/views/evaluation/evaluation-plan/component/plan-basic-info.vue';
import PlanIndicator from '@/views/evaluation/evaluation-plan/component/plan-indicator.vue';

export default defineComponent({
  components: { PlanIndicator, PlanBasicInfo },
  setup() {
    const evaluationPlan = ref({
      positions: [],
      professionalTitles: [],
      customData: {},
      customDataString: '',
    });
    const currentStep = ref(1);
    const changeStep = (direction: string, args: any) => {
      evaluationPlan.value = { ...evaluationPlan.value, ...args };
      if (direction === 'prev') currentStep.value -= 1;
      else currentStep.value += 1;
    };

    const doCreateEvaluationPlan = () => {
      // TODO CreateEvaluationPlan
    };
    return {
      currentStep,
      changeStep,

      doCreateEvaluationPlan,
    };
  },
});
</script>

<style scoped>
.container {
  padding: 0 20px 40px 20px;
  overflow: hidden;
}

.card {
  padding: 20px 20px 10px;
}
</style>

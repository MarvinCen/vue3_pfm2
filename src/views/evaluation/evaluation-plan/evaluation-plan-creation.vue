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
        <a-step>填写基本信息</a-step>
        <a-step>创建考核指标</a-step>
        <a-step>完成创建</a-step>
      </a-steps>
    </a-card>

    <keep-alive>
			<plan-basic-info
					usage="creation"
					v-if="currentStep === 1"
					@create-or-update-plan="createOrUpdatePlan"
			/>
			<plan-indicator
				usage="creation"
				v-else-if="currentStep === 2"
				@change-step="changeStep"
				@create-indicator="doCreateIndicator"
			/>
			<a-card v-else-if="currentStep === 3" style="margin-top: 20px; height: 400px">
				<div style="margin-top: 40px">
					<a-result status="success" title="创建成功~">
						<template #extra>
							<a-space>
								<a-button
									type="primary"
									@click="() => {$router.push({ name: 'evaluationPlan' });}"
								>
									返回列表
								</a-button>
							</a-space>
						</template>
					</a-result>
				</div>
			</a-card>
    </keep-alive>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import PlanBasicInfo from '@/views/evaluation/evaluation-plan/component/plan-basic-info.vue';
import PlanIndicator from '@/views/evaluation/evaluation-plan/component/plan-indicator.vue';
import {createEvaluationPlan, createIndicator, updateEvaluationPlan} from "@/api/evaluation/evaluation-plan";
import {EvaluationPlan, Indicator} from "@/types/evaluation";
import {Message} from "@arco-design/web-vue";

export default defineComponent({
  components: { PlanIndicator, PlanBasicInfo },
  setup() {
    const evaluationPlan = ref<EvaluationPlan>({
      positions: [],
      professionalTitles: [],
      customData: '',
    });
    const currentStep = ref(1);
		const firstIn = ref(true);
		const planId = ref<number>();
		const createOrUpdatePlan = (basicInfoForm: any) => {
			evaluationPlan.value = { ...evaluationPlan.value, ...basicInfoForm };
			if (firstIn.value) {
				createEvaluationPlan(evaluationPlan.value).then((res) => {
					planId.value = res.data.planId;
					console.log(res.data.planId)
					Message.success('提交成功');
					firstIn.value = false;
					changeStep('next', {});
				})
			}
			else {
				evaluationPlan.value.eid = planId.value;
				updateEvaluationPlan(evaluationPlan.value).then(() => {
					Message.success('更新成功');
					changeStep('next', {});
				})
			}
		}
    const changeStep = (direction: string, args: any) => {
      evaluationPlan.value = { ...evaluationPlan.value, ...args };
      if (direction === 'prev') currentStep.value -= 1;
      else currentStep.value += 1;
    };

		const doCreateIndicator = (indicator: Indicator) => {
			indicator.evaluationPlanId = planId.value;
			createIndicator(indicator).then(() => {
				Message.success('创建成功');
			})
		}
    return {
      currentStep,
      changeStep,

			createOrUpdatePlan,
			planId,
			doCreateIndicator,
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

<template>
	<div class="container">
		<plan-basic-info
				:usage="usage"
				:plan="plan"
				@create-or-update-plan="updatePlan"
		/>
		<plan-indicator
				:usage="usage"
				:plan="plan"
				@create-indicator="doCreateIndicator"
		/>
  </div>
	<div v-if="usage === 'creation'" class="actions">
		<a-space>
			<a-button status="normal" @click="$router.push('evaluationPlan')"> 取消 </a-button>
			<a-button type="primary" @click="updatePlan"> 保存 </a-button>
		</a-space>
	</div>
</template>

<script setup lang="ts">
import {useRoute} from "vue-router";
import PlanBasicInfo from "@/views/evaluation/evaluation-plan/component/plan-basic-info.vue";
import PlanIndicator from "@/views/evaluation/evaluation-plan/component/plan-indicator.vue";
import {EvaluationPlan, Indicator} from "@/types/evaluation";
import {createIndicator, updateEvaluationPlan} from "@/api/evaluation/evaluation-plan";
import {Message} from "@arco-design/web-vue";


const route = useRoute()
const editable = Boolean(JSON.parse(route.query.editable as string));
const plan = JSON.parse(route.query.plan as string) as EvaluationPlan;
const usage = !editable ? 'check' : 'edit';


const updatePlan = (plan: EvaluationPlan) => {
	// TODO 通过v-model的方式与子组件绑定
	updateEvaluationPlan(plan).then(() => {
		Message.success('更新成功')
	})
}

const doCreateIndicator = (indicator: Indicator) => {
	indicator.evaluationPlanId = plan.eid;
	createIndicator(indicator).then(() => {
		Message.success('创建成功');
	})
}
</script>

<style scoped>
.container {
	padding: 0 20px 20px 20px;
}

.actions {
	position: fixed;
	left: 0;
	right: 0;
	bottom: 0;
	height: 60px;
	padding: 14px 20px 14px 0;
	background: var(--color-bg-2);
	text-align: right;
}
</style>
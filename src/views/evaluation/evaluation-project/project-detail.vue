<template>
  <div class="container">
	  <Breadcrumb :items="['menu.list', 'menu.list.cardList']" />
    <a-card title="考核方案列表">
      <a-row :gutter="25" style="margin-top: 10px">
				<a-col :span="12">
          <a-space>
						<a-button status="warning">按钮1</a-button>
						<a-button status="danger">按钮1</a-button>
					</a-space>
				</a-col>
				<a-col :span="12" style="text-align: right">
					<a-button status="success" >按钮1</a-button>
				</a-col>
      </a-row>
      <a-card
        v-for="(plan) in plans"
        :key="plan.eid"
        style="width: 100%; height: 200px; border-radius: 8px; margin-top: 10px"
        bordered
				hoverable
				@click="toPlanOfProject(plan)"
      >
				<div>
					<div>
						<h3>{{ plan.name }}</h3>
					</div>

				</div>
      </a-card>
    </a-card>
	</div>

</template>

<script setup lang="ts">
import {onMounted, ref} from "vue";
import {EvaluationPlan, EvaluationProject} from "@/types/evaluation";
import {findEvaluationPlans2} from "@/api/evaluation/evaluation-plan";
import {Condition} from "@/types/global";
import {useRoute, useRouter} from "vue-router";


const route = useRoute();
const project = JSON.parse(route.query.project as string) as EvaluationProject;
const plans = ref<EvaluationPlan[]>();

onMounted(() => {
	const cond: Condition = {
		prop: 'eid',
    type: 'in',
    value: project.evaluationPlanIds as number[]
	}
	findEvaluationPlans2({ conditions: [cond] }).then((res) => {
		plans.value = res.data.list;
  })
})


const router = useRouter();
const toPlanOfProject = (plan: EvaluationPlan) => {
	router.push({
		path: 'pfmCalculation',
		query: {
			plan: JSON.stringify(plan),
			project: JSON.stringify(project)
		}
	})
}
</script>

<style scoped lang="less">
.container {
  padding: 0 20px 20px 20px;
}

.arco-card-header {
	padding: 20px 20px 20px 20px;
}
</style>
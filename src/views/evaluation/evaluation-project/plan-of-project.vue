<template>
  <div class="container">
		<Breadcrumb :items="['menu.list', 'menu.list.cardList']" />
		<a-card :bordered="false">
			<keep-alive>
				<a-tabs default-active-key="1">
					<a-tab-pane key="1" title="考核人员">
						<eva-employee
								:plan="plan"
								:project="project"
						/>
					</a-tab-pane>
					<a-tab-pane key="2" title="绩效考核">
						<pfm-evaluation
							:plan="plan"
							:project="project" />
					</a-tab-pane>
					<a-tab-pane key="3" title="薪资计算">
						<pfm-evaluation
								:plan="plan"
								:project="project" />
					</a-tab-pane>
					<a-tab-pane key="4" title="绩效报告">
						<a-row style="margin-top: 16px">
							<a-col :flex="1" class="panel" style="margin-right: 16px">
								<PopularContent />
							</a-col>
							<a-col :flex="1" class="panel">
								<CateforiesPercent />
							</a-col>
						</a-row>
						<div class="panel">
							<ContentChart />
						</div>
					</a-tab-pane>
				</a-tabs>
			</keep-alive>

			<div class="actions">
				<a-space>
					<a-button
						@click="$router.go(-1)"
					>
						返回
					</a-button>
				</a-space>
			</div>
		</a-card>
  </div>
</template>

<script setup lang="ts">
import EvaEmployee from "@/views/evaluation/evaluation-project/component/eva-employee.vue";
import PfmEvaluation from "@/views/evaluation/evaluation-project/component/pfm-evaluation.vue";
import ContentChart from "@/views/dashboard/workplace/components/content-chart.vue";
import Banner from "@/views/dashboard/workplace/components/banner.vue";
import PopularContent from "@/views/dashboard/workplace/components/popular-content.vue";
import DataPanel from "@/views/dashboard/workplace/components/data-panel.vue";
import CateforiesPercent from "@/views/dashboard/workplace/components/categories-percent.vue";
import {useRoute} from "vue-router";
import {EvaluationPlan, EvaluationProject} from "@/types/evaluation";

const route = useRoute();
const project = JSON.parse(route.query.project as string) as EvaluationProject;
const plan = JSON.parse(route.query.plan as string) as EvaluationPlan;

</script>

<style scoped lang="less">
.container {
  padding: 0 20px 20px 20px;
}

.panel {
	background-color: var(--color-bg-2);
	border-radius: 4px;
	overflow: auto;
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
<template>
  <div class="container">
	  <Breadcrumb :items="['menu.list', 'menu.list.cardList']" />

		<a-card class="general-card" title="基本信息" style="margin-bottom: 20px">
			<a-form :model="project"
				:label-col-props="{span: 6}"
				:wrapper-col-props="{span: 15}"
			>
				<a-row :gutter="25">
					<a-col :span="12">
						<a-form-item field="name" label="项目名称">
							<a-input v-model="project.name" placeholder="请输入项目名称" />
						</a-form-item>
					</a-col>
				</a-row>
				<a-row :gutter="25">
					<a-col :span="12">
						<a-form-item field="type" label="项目类型">
							<a-select v-model="project.type" placeholder="请输入项目类型">
								<a-option>年度考核</a-option>
								<a-option>聘期考核</a-option>
							</a-select>
						</a-form-item>
					</a-col>
					<a-col :span="12" v-if="project.type === '年度考核'">
						<a-form-item field="year" label="年份">
							<a-year-picker
									v-model="project.year"
									placeholder="请选择年份"
									style="width: 100%"
							/>
						</a-form-item>
					</a-col>
				</a-row>
				<a-row :gutter="25">
					<a-col :span="12">
						<a-form-item field="startTime" label="开始时间">
							<a-date-picker
									show-time
									format="YYYY-MM-DD HH:mm:ss"
									v-model="project.startTime"
									placeholder="请输入开始时间"
									style="width: 100%"
							/>
						</a-form-item>
					</a-col>
					<a-col :span="12">
						<a-form-item field="endTime" label="结束时间">
							<a-date-picker
									show-time
									format="YYYY-MM-DD HH:mm:ss"
									v-model="project.endTime"
									placeholder="请输入结束时间"
									style="width: 100%"
							/>
						</a-form-item>
					</a-col>
				</a-row>
				<a-row :gutter="25">
					<a-col :span="12">
						<a-form-item field="resultCheckedExpireTime" label="成果分配截止时间">
							<a-date-picker
									show-time
									format="YYYY-MM-DD HH:mm:ss"
									v-model="project.resultCheckedExpireTime"
									placeholder="请输入成果分配截止时间"
									style="width: 100%"
							/>
						</a-form-item>
					</a-col>
					<a-col :span="12">
						<a-form-item field="pfmCheckedExpireTime" label="绩效确认截止时间">
							<a-date-picker
									show-time
									format="YYYY-MM-DD HH:mm:ss"
									v-model="project.pfmCheckedExpireTime"
									placeholder="请输入绩效确认截止时间"
									style="width: 100%"
							/>
						</a-form-item>
					</a-col>
				</a-row>
				<a-row :gutter="25">
					<a-col :span="12">
						<a-form-item field="dataGrabRuleId" label="成果数据抓取规则">
							<a-select
									v-model="project.dataGrabRuleId"
									:options="dataGrabRules"
									:field-names="{ value: 'eid', label: 'name' }"
									@change="ruleChange"
									placeholder="请选择抓取规则"
									style="width: 250px"
							/>
						</a-form-item>
					</a-col>
				</a-row>
				<a-row :gutter="25">
					<a-col :span="12">
						<a-typography-paragraph style="color: #86909c; font-size: 13px; margin-top: -15px; margin-left: 17px">
							规则描述：{{ ruleDetail ? ruleDetail : '--' }}
						</a-typography-paragraph>
					</a-col>
				</a-row>
			</a-form>
		</a-card>

    <a-card class="general-card" title="考核方案列表">
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
import {Rule} from "@/types/rule";
import ruleApi from "@/api/rule/rule";
import ResultDataGrab from "@/views/evaluation/results/result-data-grab.vue";


const route = useRoute();
const project = ref<EvaluationProject>(JSON.parse(route.query.project as string));
const plans = ref<EvaluationPlan[]>();

onMounted(() => {
	const cond: Condition = {
		prop: 'eid',
    type: 'in',
    value: project.value.evaluationPlanIds as number[]
	}
	findEvaluationPlans2({ conditions: [cond] }).then((res) => {
		plans.value = res.data.list;
  })

	ruleApi.findRules({conditions: [{ prop: 'category', type: 'eq', value: '成果数据抓取' }]}).then(res => {
		dataGrabRules.value = res.data.list;
		if (project.value.dataGrabRuleId)
			ruleDetail.value = dataGrabRules.value?.find((rule) => {
				return rule.eid === project.value.dataGrabRuleId
			})?.remark as string
	})
})


const router = useRouter();
const toPlanOfProject = (plan: EvaluationPlan) => {
	router.push({
		path: 'pfmCalculation',
		query: {
			plan: JSON.stringify(plan),
			project: JSON.stringify(project.value)
		}
	})
}

const dataGrabRules = ref<Rule[]>();
const ruleDetail = ref('');
const ruleChange = (ruleId: number) => {
	ruleDetail.value = dataGrabRules.value?.find((rule) => rule.eid === ruleId)?.remark as string
}
</script>

<style scoped lang="less">
.container {
  padding: 0 20px 20px 20px;
}

.arco-card-header {
	padding: 20px 20px 20px 20px;
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
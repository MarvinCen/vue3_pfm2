<template>
  <div class="container">
		<a-row>
			<a-col :span="8">
				<multi-search
					:columns="columns"
					@search="search"
				/>
			</a-col>
			<a-col :span="16" style="text-align: right">
				<a-space>
					<a-button type="primary" >添加考核人员</a-button>
				</a-space>
			</a-col>
		</a-row>
		<a-table
				:columns="columns"
				:data="evaEmployees"
				:pagination="pager"
				@page-change="pageChange"
				@page-size-change="pageSizeChange"
				style="margin-top: 10px"
		>
			<template #needToEva="{record}">
				<a-switch
					v-model="record.needToCalc"
				/>
			</template>
			<template #operation="{ record }">
				<a-button
						status="danger"
						size="small"
						@click="removeEvaEmployee(record)"
				>
					删除
				</a-button>
			</template>
		</a-table>
  </div>
</template>

<script setup lang="ts">
import {PaginationProps, TableColumnData} from "@arco-design/web-vue";
import {onMounted, reactive, ref} from "vue";
import {EvaEmployee, EvaluationPlan, EvaluationProject} from "@/types/evaluation";
import {BasePaginationSetting, Condition} from "@/types/global";
import MultiSearch from "@/components/table/multi-search.vue";
import {findEvaEmployees} from "@/api/evaluation/evaluation-project";

const props = defineProps({
  project: {
		required: true,
    type: Object
  },
  plan: {
		required: true,
    type: Object
  }
})
const project = props.project as EvaluationProject;
const plan = props.plan as EvaluationPlan;


// table相关变量
const columns: TableColumnData[] = [
	{
		dataIndex: 'name',
		title: '姓名',
		align: 'center',
		ellipsis: true,
	},
	{
		dataIndex: 'jobNumber',
		title: '工号',
		align: 'center',
		ellipsis: true,
	},
	{
		dataIndex: 'position',
		title: '岗位类别',
		align: 'center',
		ellipsis: true,
	},
	{
		dataIndex: 'positionLevel',
		title: '岗位级别',
		align: 'center',
		ellipsis: true,
	},
	// {
	// 	dataIndex: 'evaluationType',
	// 	title: '考核类别',
	// 	align: 'center',
	// 	ellipsis: true,
	// },
	{
		dataIndex: 'hireType',
		title: '聘用类型',
		align: 'center',
		ellipsis: true,
	},
	{
		dataIndex: 'needToEva',
		title: '是否考核',
		align: 'center',
		ellipsis: true,
		slotName: 'needToEva'
	},
	{
		title: '操作',
		align: 'center',
		ellipsis: true,
		slotName: 'operation'
	},
]
const evaEmployees = ref<EvaEmployee[]>([]);
const pager: PaginationProps = reactive({
	current: 1,
	pageSize: 10,
	total: undefined,
	...BasePaginationSetting,
});
const pageSizeChange = (pageSize?: number) => {
	pager.pageSize = pageSize;
};
const pageChange = (page?: number) => {

};

onMounted(() => {
	const conditions: Condition[] = [
		{
			prop: 'planId',
			type: 'eq',
			value: plan.eid as number,
		},
		{
			prop: 'projectId',
			type: 'eq',
			value: project.eid as number
		}
	]
	findEvaEmployees({ conditions, pager }).then(res => {
		evaEmployees.value = res.data.list;
		pager.total = res.data.pager.total;
		pager.current = res.data.pager.current;
	})
})


const search = (conditions: any) => {
	// TODO
}
const removeEvaEmployee = (record: EvaEmployee) => {
	// TODO
}
</script>

<style scoped>
.container {
  padding: 0 20px 20px 20px;
}
</style>
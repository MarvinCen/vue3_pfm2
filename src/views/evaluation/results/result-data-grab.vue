<template>
	<a-spin :loading="loading" tip="This may take a while..." style="width: 100%;">
		<a-row style="margin-bottom: 10px">
			<a-col :span="8">
				<a-select
						:options="tables"
						:field-names="{value: 'eid', label: 'name'}"
						placeholder="选择要查看的成果表" style="width: 250px"
						@change="onChange"
				/>
			</a-col>
			<a-col :span="8">
				<multi-search :columns="columns" />
			</a-col>
			<a-col :span="8" style="text-align: right">
				<a-button
						type="outline"
						@click="doGrabResultData()"
				>
					抓取成果
				</a-button>
			</a-col>
		</a-row>
		<a-table
				:columns="columns"
				:data="data"
				:pagination="pager"
		>
			<template #empty>
				<a-empty description="暂无数据~" />
			</template>
		</a-table>
	</a-spin>
</template>




<script setup lang="ts">
import {getCurrentInstance, onMounted, reactive, ref} from "vue";
import MultiSearch from "@/components/table/multi-search.vue";
import {EvaluationPlan, EvaluationProject, Result} from "@/types/evaluation";
import {grabResultData} from "@/api/evaluation/evaluation-project";
import {BasePaginationSetting, Condition, Response} from "@/types/global";
import {findResultTableColumns, findResultTables} from "@/api/results/results";
import {RColumn, ResultTable} from "@/types/results";
import resultApi from "@/api/evaluation/result"
import {PaginationProps, TableColumnData} from "@arco-design/web-vue";
import cellDataApi from "@/api/results/result-data"


const loading = ref<boolean>(false);
const Notification = getCurrentInstance()?.appContext.config.globalProperties.$notification;
const props = defineProps({
	project: {
		required: true,
		type: Object,
	},
	plan: {
		required: true,
		type: Object,
	}
})
const project = props.project as EvaluationProject;
const plan = props.plan as EvaluationPlan;




const tables = ref<ResultTable[]>([])
onMounted(() => {
	findResultTables({}).then(res => {
		tables.value = res.data.list || []
	})
})

const pager: PaginationProps = reactive({
	current: 1,
	pageSize: 10,
	total: undefined,
	...BasePaginationSetting,
});
const columns = ref<TableColumnData[]>([]);
const data = ref<any[]>([])
const onChange = (tableId: number) => {
	setColumnsAndData(tableId);
}

const setColumnsAndData = async (tableId: number) => {
	const conditions: Condition[] = [
		{ prop: 'tableId', type: 'eq', value: tableId },
		{ prop: 'projectId', type: 'eq', value: project.eid as number },
		{ prop: 'planId', type: 'eq', value: plan.eid as number }
	]
	loading.value = true;
	try {
		const resultResp = await resultApi.findResults({ conditions, pager });
		const columnsResp = await findResultTableColumns(tableId);

		columns.value = getColumns(columnsResp.data.list || []);
		await getResultsWithRow((resultResp.data.list as Result[]) || [], tableId)
	} catch (e) {

	} finally {
		loading.value = false
	}
}

const getResultsWithRow = async (results: Result[], tableId: number) => {
	if (results.length === 0) return;
	const rowIds = results.map(r => r.rowId) as number[] || [];

	const rowResp = await cellDataApi.findResultDataBy({
		pager,
		conditions: [{ prop: 'rowId', type: 'in', value: rowIds }]
	}, tableId);
	const rows = rowResp.data.list as any[] || [];
	const rowMap = rows.reduce((map, row) => {
		map[row.rowId] = row;
		return map;
	}, {});
	results.forEach(result => {
		result.row = rowMap[result.rowId as number];
	})
	data.value = results;
}

const getColumns = (cols: RColumn[]) => {
	const tempCols: TableColumnData[] = []
	cols.forEach(col => {
		const column: TableColumnData = {
			dataIndex: col.name,
			title: col.name,
			tooltip: true,
			ellipsis: true,
			align: 'center'
		}
		tempCols.push(column)
	})
	const additional: TableColumnData[] = [
		{
			dataIndex: 'result.indicatorName',
			title: '考核指标'
		},
		{
			dataIndex: 'result.workload',
			title: '工作量'
		},
		{
			dataIndex: 'result.tip',
			title: '工作量说明'
		}
	]
	tempCols.push(...additional)
	return tempCols;
}



const doGrabResultData = () => {
	loading.value = true;
	const dto = {
		project,
		plan,
	}
	grabResultData(dto).then(res => {
		const data = (res as unknown as Response).data;
		Notification.success({
			title: '抓取数据成功！',
			content: data.tip + '可在最左侧的下拉框选择要查看的成果表',
			closable: true,
			duration: 1000 * 60 * 5
		});
	}).finally(() => {
		loading.value = false;
	})
}
</script>



<style scoped lang="less">
.grab-overall-card {
	border: none;
	border-radius: 4px;

	& > .arco-card-header {
		height: auto;
		padding: 20px;
		border: none;
		border-bottom: 1px;
	}

	& > .arco-card-body {
		padding: 0 20px 20px;
	}
}
</style>
<template>
	<a-row style="margin-bottom: 16px">
		<a-col :span="14">
			<multi-search
				:columns="columns"
				@search="search"
				style="margin-top: 20px; width: 400px"
			/>
		</a-col>
		<a-col :span="10">
			<div style="width: 100%; text-align: right">
				<a-button
						type="outline"
						status="normal"
						style="margin-top: 20px"
				>
					新增规则
				</a-button>
			</div>
		</a-col>
	</a-row>
	<a-table
		row-key="eid"
		:columns="columns"
		:data="data"
		:loading="loading"
		:pagination="pager"
		:scrollbar="data && data.length > 0"
		@row-click="handleRowClick"
	>
		<template #operation>
			<a-space>
				<a-button
					size="mini"
					type="text"
					status="normal"
					@click.stop="() => {}"
				>
					编辑
				</a-button>
				<a-button
					size="mini"
					type="text"
					status="danger"
					@click.stop="() => {}"
				>
					删除
				</a-button>
			</a-space>
		</template>
		<template #source="{ record }">
			{{ record.organizationId === -1 ? '内置' : record.organizationName }}
		</template>
	</a-table>
</template>

<script setup lang="ts">
import {computed, onMounted, reactive, ref} from "vue";
import {PaginationProps, TableColumnData} from "@arco-design/web-vue";
import {BasePaginationSetting} from "@/types/global";
import {Rule} from "@/types/rule";
import ruleApi from "@/api/rule/rule"
import MultiSearch from "@/components/table/multi-search.vue";
import {log} from "echarts/types/src/util/log";

const props = defineProps({
	ruleId: {
		required: true,
		type: Number
	}
})
const emit = defineEmits(['update:ruleId'])
const ruleId = computed<number | undefined>({
	get() {
		return props.ruleId;
	},
	set(value) {
		emit('update:ruleId', value)
	}
})


const data = ref<Rule[]>([]);
const pager: PaginationProps = reactive({
	current: 1,
	pageSize: 10,
	total: undefined,
	...BasePaginationSetting,
});
const columns: TableColumnData[] = [
	{
		dataIndex: 'name',
		title: '规则名称',
		ellipsis: true,
		tooltip: true,
		align: 'center',
		width: 100
	},
	{
		dataIndex: 'category',
		title: '类别',
		ellipsis: true,
		tooltip: true,
		align: 'center',
		width: 100
	},
	{
		dataIndex: 'organizationId',
		title: '来源',
		ellipsis: true,
		tooltip: true,
		align: 'center',
		slotName: 'source',
		width: 100
	},
	{
		dataIndex: 'remark',
		title: '备注',
		ellipsis: true,
		tooltip: true,
		align: 'center',
		width: 100,
	},
	{
		title: '操作',
		ellipsis: true,
		tooltip: true,
		align: 'center',
		width: 120,
		fixed: 'right',
		slotName: 'operation'
	}
]
const tempData = [{}]
const search = (conditions: any) => {
	ruleApi.findRules({
		pager,
		conditions,
	}).then(res => {
		data.value = res.data.list;
	})
}

const handleRowClick = (record: Rule) => {
	ruleId.value = record.eid as number;
}

const loading = ref(false);
onMounted(() => {
	loading.value = true;
	ruleApi.findRules({pager}).then(res => {
		data.value = res.data.list;
	}).finally(() => {
		loading.value = false;
	})
})
</script>

<style scoped>

</style>
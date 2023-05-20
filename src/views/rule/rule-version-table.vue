<template>
	<a-row style="margin-bottom: 16px">
		<a-col :span="24">
			<div style="width: 100%; text-align: right">
				<a-button
						type="outline"
						status="normal"
						style="margin-top: 20px"
				>
					新增版本
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
		<template #operation="{ record }">
			<a-space>
				<a-button
					size="small"
					type="text"
					status="warning"
				>
					{{ record.status === '启用' ? '禁用' : '启用' }}
				</a-button>
				<a-button
					size="small"
					type="text"
					status="normal"
				>
					编辑
				</a-button>
				<a-button
					size="small"
					type="text"
					status="danger"
				>
					删除
				</a-button>
			</a-space>
		</template>
	</a-table>
</template>

<script setup lang="ts">
import {computed, onMounted, reactive, ref, watch} from "vue";
import {PaginationProps, TableColumnData} from "@arco-design/web-vue";
import {BasePaginationSetting, Condition} from "@/types/global";
import {Rule, RuleVersion} from "@/types/rule";
import ruleVersionApi from "@/api/rule/rule-version"

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

watch(() => props.ruleId, (rId) => {
	if (!rId) return;
	loading.value = true;
	ruleVersionApi.findRuleVersions({
		pager,
		conditions: [{
			prop: 'ruleId',
			type: 'eq',
			value: rId
		}]
	}).then(res => {
		data.value = res.data.list;
	}).finally(() => {
		loading.value = false;
	})
})

const loading = ref<boolean>(false)
const data = ref<RuleVersion[]>([]);
const pager: PaginationProps = reactive({
	current: 1,
	pageSize: 10,
	total: undefined,
	...BasePaginationSetting,
});
const columns: TableColumnData[] = [
	{
		dataIndex: 'value',
		title: '公式版本',
		ellipsis: true,
		tooltip: true,
		align: 'center',
		width: 80,
	},
	{
		dataIndex: 'active',
		title: '状态',
		ellipsis: true,
		tooltip: true,
		align: 'center',
		width: 80,
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
	if (!ruleId) return;

	const condition: Condition = {
		prop: 'ruleId',
		type: 'eq',
		value: ruleId.value as number
	}
	conditions.push(condition)
	ruleVersionApi.findRuleVersions({
		pager,
		conditions,
	})
}

const handleRowClick = (record: Rule) => {
	ruleId.value = record.eid as number;
}

onMounted(() => {
	if (!ruleId) return;
	ruleVersionApi.findRuleVersions({
		pager,
	})
})
</script>

<style scoped>

</style>
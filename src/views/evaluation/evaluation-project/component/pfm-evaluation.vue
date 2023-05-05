<template>
<div class="container">
	<a-row>
		<a-col :span="8">
			<multi-search
				:columns="columns"
				@search="search"
			/>
		</a-col>
		<a-col :span="8" style="text-align: right">
			<a-space>
				<a-button size="small" status="normal">全部</a-button>
				<a-button size="small" status="success">通过考核</a-button>
				<a-button size="small" status="danger">未通过考核</a-button>
			</a-space>
		</a-col>
		<a-col :span="8" style="text-align: right">
			<a-space>
				<a-button type="outline">

					汇总成果
				</a-button>
				<a-button type="outline">计算绩效</a-button>
				<a-button type="outline">计算薪资</a-button>
			</a-space>
		</a-col>
	</a-row>
	<a-table
		:columns="columns"
		:data="evaResults as TableData[]"
		:pagination="pager"
		@page-change="pageChange"
		@page-size-change="pageSizeChange"
		style="margin-top: 10px"
	>
		<template #needToEva>
			<a-radio />
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
import MultiSearch from "@/components/table/multi-search.vue";
import {PaginationProps, TableColumnData} from "@arco-design/web-vue";
import {reactive, ref} from "vue";
import {TableData} from "@arco-design/web-vue/es/table/interface";
import {BasePaginationSetting} from "@/types/global";

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
const project = props.project;
const plan = props.plan;


// table相关的变量
const columns: TableColumnData[] = [
	{
		dataIndex: '',
    title: '考核人员',
    ellipsis: true,
    align: 'center',
		tooltip: true
  },
	{
		dataIndex: '',
		title: '考核年度',
		ellipsis: true,
		align: 'center',
		tooltip: true
	},
	{
		dataIndex: '',
		title: '考核方案',
		ellipsis: true,
		align: 'center',
		tooltip: true
	},
	{
		dataIndex: '',
		title: '所属单位',
		ellipsis: true,
		align: 'center',
		tooltip: true
	},
	{
		dataIndex: '',
		title: '分值',
		ellipsis: true,
		align: 'center',
		tooltip: true
	},
	{
		title: '操作',
		align: 'center',
		slotName: 'operation'
	},
]
const evaResults = ref<TableData[]>()
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


const search = () => {

}

</script>

<style scoped>
.container {
  padding: 0 20px 20px 20px;
}
</style>
<template>
	<div class="container">
		<Breadcrumb
			:items="['权限管理', '菜单管理']"
			:internationalization="false"
		/>
		<a-card class="general-card">
			<a-row style="margin-bottom: 16px">
				<a-col :span="16">
					<a-space style="margin-top: 20px">
						<multi-search
							ref="multiSearch"
							:columns="columns"
							@search="search"
						/>
					</a-space>
				</a-col>
				<a-col :span="8" style="text-align: right">
					<a-space style="margin-top: 20px">
						<a-button type="primary" @click="toCreate()">
							<template #icon>
								<icon-plus />
							</template>
							{{ $t('searchTable.operation.create') }}
						</a-button>
					</a-space>
				</a-col>
			</a-row>
			<a-table
				row-key="eid"
				:columns="columns"
				:data="tempData"
				:pagination="pager"
				:scrollbar="data && data.length > 0"
				@page-change="pageChange()"
				@page-size-change="pageSizeChange()"
			>
				<template #operation="{ record }">
					<a-space>
						<a-button
							size="mini"
							status="normal"
							type="text"
							@click="toEdit(record)"
						>
							编辑
						</a-button>
						<a-button
							size="mini"
							status="success"
							type="text"
							@click="toCreate()"
						>
							新增
						</a-button>
						<a-popconfirm
							content="确定要删除吗？"
							@ok="deleteUser(record.eid)"
						>
							<a-button
								size="mini"
								status="danger"
								type="text"
							>
								删除
							</a-button>
						</a-popconfirm>
					</a-space>
				</template>
			</a-table>
		</a-card>

		<edit
			v-model:visible="modalVisible"
			v-model:to-create="isToCreate"
			:record="curRecord"
			@find-user="findMenus"
		/>
	</div>
</template>

<script setup lang="ts">
import MultiSearch from "@/components/table/multi-search.vue";
import {Message, PaginationProps, TableColumnData} from "@arco-design/web-vue";
import {TableData} from "@arco-design/web-vue/es/table/interface";
import {onMounted, reactive, ref} from "vue";
import {BasePaginationSetting} from "@/types/global";
import menuApi from "@/api/permission/menu";
import Edit from "@/views/permission/menu/edit.vue";

const multiSearch = ref(null)

const data = ref<TableData[]>([]);
const pager: PaginationProps = reactive({
	current: 1,
	pageSize: 10,
	total: undefined,
	...BasePaginationSetting,
});
const columns: TableColumnData[] = [
	{
		dataIndex: 'name',
		title: '菜单名称',
		ellipsis: true,
		tooltip: true,
		align: 'center',
		width: 180,
		fixed: 'left'
	},
	{
		dataIndex: 'icon',
		title: '图标',
		ellipsis: true,
		tooltip: true,
		align: 'center',
		width: 120,
	},
	{
		dataIndex: 'order',
		title: '排序',
		ellipsis: true,
		tooltip: true,
		align: 'center',
		width: 100,
	},
	{
		dataIndex: 'code',
		title: '权限标识',
		ellipsis: true,
		tooltip: true,
		align: 'center',
		width: 100,
	},
	{
		dataIndex: 'componentPath',
		title: '组件路径',
		ellipsis: true,
		tooltip: true,
		align: 'center',
		width: 100,
	},
	{
		dataIndex: 'status',
		title: '状态',
		ellipsis: true,
		tooltip: true,
		align: 'center',
		width: 100,
	},
	{
		title: '操作',
		align: "center",
		slotName: 'operation',
		width: 160,
		fixed: 'right'
	},
]
const tempData = [{}]
const search = (conditions: any) => {
	menuApi.findMenus({
		pager,
		conditions,
	})
}
const findMenus = () => {
	(multiSearch.value as any)?.search();
}

const pageChange = (page?: number) => {
	pager.current = page;
	(multiSearch.value as any)?.search();
}

const pageSizeChange = (pageSize?: number) => {
	pager.pageSize = pageSize;
	(multiSearch.value as any)?.search();
};

const deleteUser = (eid: number) =>{
	menuApi.deleteMenu(eid).then(() => {
		Message.success('删除成功')
	})
}

const curRecord = ref<any>({});
const isToCreate = ref<boolean>(false);
const modalVisible = ref<boolean>(false);
const toEdit = (record: any) => {
	isToCreate.value = false;
	curRecord.value = record;
	modalVisible.value = true;
}
const toCreate = () => {
	isToCreate.value = true;
	curRecord.value = {};
	modalVisible.value = true;
}

onMounted(() => {
	menuApi.findMenus({
		pager,
	})
})
defineExpose({
	columns,
})
</script>

<style scoped lang="less">
.container {
	padding: 0 20px 20px 20px;
}
</style>
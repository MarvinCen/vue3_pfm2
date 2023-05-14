<template>
	<div>
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
					<a-popconfirm
							content="确定要删除吗？"
							@ok="deletePermission(record.eid)"
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
	</div>



	<edit
			v-model:visible="modalVisible"
			v-model:to-create="isToCreate"
			:record="curRecord"
			@find-permissions="findPermissions"
	/>
</template>

<script setup lang="ts">
import MultiSearch from "@/components/table/multi-search.vue";
import {Message, PaginationProps, TableColumnData} from "@arco-design/web-vue";
import {TableData} from "@arco-design/web-vue/es/table/interface";
import {computed, onMounted, reactive, ref} from "vue";
import {BasePaginationSetting} from "@/types/global";
import permissionApi from "@/api/permission/permission"
import Edit from "@/views/permission/permission/edit.vue";


const multiSearch = ref(null)

const props = defineProps({
	menuId: {
		required:true,
		type: Number,
	}
})
const emit = defineEmits(['update:menuId'])
const menuId = computed<number | undefined>({
	get() {
		return props.menuId;
	},
	set(value) {
		emit('update:menuId', value)
	}
})


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
		title: '权限点名称',
		ellipsis: true,
		tooltip: true,
		align: 'center',
		width: 100,
		fixed: 'left'
	},
	{
		dataIndex: 'code',
		title: '权限点编码',
		ellipsis: true,
		tooltip: true,
		align: 'center',
		width: 100,
	},
	{
		dataIndex: 'createDatetime',
		title: '创建时间',
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
	permissionApi.findPermissions({
		pager,
		conditions,
	})
}
const findPermissions = () => {
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

const deletePermission = (eid: number) => {
	permissionApi.deletePermission(eid).then(() => {
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
	permissionApi.findPermissions({
		conditions: [{
			prop: 'menuId',
			type: 'eq',
			value: menuId.value
		}],
		pager,
	})
})
</script>

<style scoped>

</style>
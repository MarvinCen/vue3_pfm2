<template>
	<a-row style="margin-bottom: 16px">
		<a-col :span="24">
			<a-input-search
					style="width: 100%; margin-top: 20px"
			/>
		</a-col>
	</a-row>
	<a-table
		row-key="eid"
		:columns="columns"
		:data="data"
		:pagination="pager"
		:scrollbar="data && data.length > 0"
		@row-click="handleRowClick"
	/>
</template>

<script setup lang="ts">
import {PaginationProps, TableColumnData} from "@arco-design/web-vue";
import {TableData} from "@arco-design/web-vue/es/table/interface";
import {computed, onMounted, reactive, ref} from "vue";
import {BasePaginationSetting} from "@/types/global";
import menuApi from "@/api/permission/menu";
import {Menu} from "@/types/permission";
import MultiSearch from "@/components/table/multi-search.vue";




const props = defineProps({
	menuId: {
		required: true,
		type: Number
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
		title: '菜单名称',
		ellipsis: true,
		tooltip: true,
		align: 'center',
		width: 100,
		fixed: 'left'
	},
]
const tempData = [{}]
const search = (conditions: any) => {
	menuApi.findMenus({
		pager,
		conditions,
		props: ['name']
	})
}

const handleRowClick = (record: Menu) => {
	menuId.value = record.eid as number;
}

onMounted(() => {
	menuApi.findMenus({
		pager,
		props:['eid', 'name']
	})
})
</script>

<style scoped>

</style>
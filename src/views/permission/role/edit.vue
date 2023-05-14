<template>
	<a-modal
		v-model:visible="visible"
		@ok="handleOk"
		@cancel="handleCancel"
		:width="1200"
		draggable
	>
		<template #title>
			{{ toCreate ? '创建角色' : '更新角色' }}
		</template>

		<a-form :model="record">
			<a-row :gutter="[25, 16]">
				<a-col :span="8">
					<a-form-item label="角色名称">
						<a-input v-model="record.name" />
					</a-form-item>
				</a-col>
				<a-col :span="8">
					<a-form-item label="角色编码">
						<a-input v-model="record.code" />
					</a-form-item>
				</a-col>
				<a-col :span="8">
					<a-form-item label="状态">
						<a-input v-model="record.status" />
					</a-form-item>
				</a-col>
			</a-row>
		</a-form>

		<a-table
				row-key="eid"
				:columns="permissionColumns"
				:data="data"
				:pagination="false"
				:scrollbar="data && data.length > 0"
		/>
	</a-modal>
</template>

<script setup lang="ts">
import {computed, onActivated, ref} from "vue";
import roleApi from "@/api/permission/role";
import menuApi from "@/api/permission/menu"
import permissionApi from "@/api/permission/permission"
import {Menu, Role} from "@/types/permission";
import {Message, TableColumnData} from "@arco-design/web-vue";

const props = defineProps({
	visible: {
		required: true,
		type: Boolean,
	},
	toCreate: {
		required: true,
		type: Boolean,
	},
	record: {
		required: false,
		type: Object,
	}
})
const record = ref<Role>(props.record as Role)

const emit = defineEmits(['update:visible', 'update:toCreate', 'findRole'])
const visible = computed<boolean>({
	get() {
		return props.visible;
	},
	set(value) {
		emit('update:visible', value)
	}
})
const toCreate = computed<boolean>({
	get() {
		return props.toCreate;
	},
	set(value) {
		emit('update:toCreate', value)
	}
})


const handleCancel = () => {
	visible.value = false;
	emit('update:visible', visible.value)
}

const handleOk = () => {
	toCreate ? create() : update()
	handleCancel()
}
const create = () => {
	roleApi.createRole(record.value).then(() => {
		emit('findRole')
		Message.success('创建成功')
	})
}
const update = () => {
	roleApi.updateRole(record.value).then(() => {
		emit('findRole')
		Message.success('更新成功')
	})
}



const permissionColumns: TableColumnData[] = [
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
const data = ref([]);
const loading = ref(false);
onActivated(() => {
	loading.value = true;
	if (toCreate.value) {
		menuApi.findMenus({ withs: ['permissions'] }).then(res => {
			data.value = convert(res.data.list);
		}).finally(() => {
			loading.value = false;
		})
	}
	else {
		permissionApi.findByRoleId(record.value.eid as number).then(res => {
			data.value = convert(res.data.list);
		}).finally(() => {
			loading.value = false;
		})
	}
})
const convert = (menus: Menu[]) => {
	// TODO
	return [];
}
</script>

<style scoped lang="less">

</style>
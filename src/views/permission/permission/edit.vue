<template>
	<a-modal
		v-model:visible="visible"
		@ok="handleOk"
		@cancel="handleCancel"
		:width="1000"
	>
		<template #title>
			{{ toCreate ? '创建权限点' : '更新权限点' }}
		</template>

		<a-form :model="record" :label-col-props="{span: 7}" :wrapper-col-props="{span: 17}">
			<a-row :gutter="[25, 16]">
				<a-col :span="8">
					<a-form-item label="所属菜单">
						<a-input v-model="record.menuId" />
					</a-form-item>
				</a-col>
				<a-col :span="8">
					<a-form-item label="权限点名称">
						<a-input v-model="record.name" />
					</a-form-item>
				</a-col>
				<a-col :span="8">
					<a-form-item label="权限点编码">
						<a-input v-model="record.code" />
					</a-form-item>
				</a-col>
			</a-row>

			<a-row :gutter="[25, 16]">
				<a-col :span="24">
					<a-form-item
						label="接口"
						:label-col-props="{span: 2}"
						:wrapper-col-props="{span: 22}"
					>
						<a-textarea
							v-model="record.urls"
							style="min-height: 100px"
							placeholder='一个接口写一行'
						/>
					</a-form-item>
				</a-col>
			</a-row>
		</a-form>
	</a-modal>
</template>

<script setup lang="ts">
import {computed, ref} from "vue";
import permissionApi from "@/api/permission/permission";
import {Permission} from "@/types/permission";
import {Message} from "@arco-design/web-vue";

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
const record = ref<Permission>(props.record as Permission)

const emit = defineEmits(['update:visible', 'update:toCreate', 'findPermissions'])
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
	permissionApi.createPermission(record.value).then(() => {
		emit('findPermissions')
		Message.success('创建成功')
	})
}
const update = () => {
	permissionApi.updatePermission(record.value).then(() => {
		emit('findPermissions')
		Message.success('更新成功')
	})
}
</script>

<style scoped lang="less">

</style>
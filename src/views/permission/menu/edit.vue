<template>
	<a-modal
		v-model:visible="visible"
		@ok="handleOk"
		@cancel="handleCancel"
		:width="700"
	>
		<template #title>
			{{ toCreate ? '创建菜单' : '修改菜单' }}
		</template>

		<a-form
				:model="record"
				:label-col-props="{span: 6}"
				:wrapper-col-props="{span: 18}"
				label-align="left"
		>
			<a-row :gutter="[25, 16]">
				<a-col :span="12">
					<a-form-item
							label="菜单类型"
							:label-col-props="{span: 6}"
					>
						<a-radio
								v-model="record.type"
						/>
					</a-form-item>
				</a-col>
			</a-row>

			<a-row :gutter="[25, 16]">
				<a-col :span="12">
					<a-form-item label="上级菜单">
						<a-input
							v-model="record.parentId"
							disabled
						/>
					</a-form-item>
				</a-col>
				<a-col :span="12">
					<a-form-item label="菜单名称">
						<a-input v-model="record.name" />
					</a-form-item>
				</a-col>
			</a-row>

			<a-row :gutter="[25, 16]">
				<a-col :span="12">
					<a-form-item label="显示顺序">
						<a-input-number v-model="record.order" />
					</a-form-item>
				</a-col>
				<a-col :span="12">
					<a-form-item label="菜单图标">
						<a-select
								v-model="record.icon"
						/>
					</a-form-item>
				</a-col>
			</a-row>

			<a-row :gutter="[25, 16]">
				<a-col :span="12">
					<a-form-item label="菜单状态">
						<a-select
							v-model="record.status"
							default-active-first-option
						>
							<a-option>启用</a-option>
							<a-option>禁用</a-option>
						</a-select>
					</a-form-item>
				</a-col>
				<a-col :span="12">
					<a-form-item label="路由地址">
						<a-input v-model="record.route" />
					</a-form-item>
				</a-col>
			</a-row>

			<a-row :gutter="[25, 16]">
				<a-col :span="8">
					<a-form-item
						label="是否显示"
						:label-col-props="{span: 10}"
						:wrapper-col-props="{span: 6}"
					>
						<a-switch
								v-model="record.hidden"
						/>
					</a-form-item>
				</a-col>
				<a-col :span="8">
					<a-form-item
							label="是否缓存"
							:label-col-props="{span: 10}"
							:wrapper-col-props="{span: 6}"
					>
						<a-switch
								v-model="record.keepAlive"
						/>
					</a-form-item>
				</a-col>
				<a-col :span="8">
					<a-form-item
						label="是否外链"
						:label-col-props="{span: 10}"
						:wrapper-col-props="{span: 6}"
					>
						<a-switch
								v-model="record.outLink"
						/>
					</a-form-item>
				</a-col>
			</a-row>
		</a-form>
	</a-modal>
</template>

<script setup lang="ts">
import {computed, ref} from "vue";
import menuApi from "@/api/permission/menu";
import {Menu} from "@/types/permission";
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
const record = ref<Menu>(props.record as Menu)

const emit = defineEmits(['update:visible', 'update:toCreate', 'findMenu'])
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
	menuApi.createMenu(record.value).then(() => {
		emit('findMenu')
		Message.success('创建成功')
	})
}
const update = () => {
	menuApi.updateMenu(record.value).then(() => {
		emit('findMenu')
		Message.success('更新成功')
	})
}
</script>

<style scoped lang="less">

</style>
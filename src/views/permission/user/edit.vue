<template>
	<a-modal
    v-model:visible="visible"
    @ok="handleOk"
    @cancel="handleCancel"
		:width="1000"
  >
		<template #title>
			{{ toCreate ? '创建用户' : '更新用户' }}
		</template>

		<a-form :model="record">
			<a-row :gutter="[25, 16]">
				<a-col :span="8">
					<a-form-item label="用户名">
						<a-input v-model="record.username" />
					</a-form-item>
				</a-col>
				<a-col :span="8">
					<a-form-item label="密码">
						<a-input-password v-model="record.password" />
					</a-form-item>
				</a-col>
				<a-col :span="8">
					<a-form-item label="微信ID">
						<a-input v-model="record.wechatId" />
					</a-form-item>
				</a-col>
			</a-row>

			<a-row :gutter="[25, 16]">
				<a-col :span="8">
					<a-form-item label="QQ号">
						<a-input v-model="record.qqId" />
					</a-form-item>
				</a-col>
				<a-col :span="8">
					<a-form-item label="邮箱">
						<a-input v-model="record.email" />
					</a-form-item>
				</a-col>
				<a-col :span="8">
					<a-form-item label="手机号">
						<a-input v-model="record.phone" />
					</a-form-item>
				</a-col>
			</a-row>
		</a-form>
	</a-modal>
</template>

<script setup lang="ts">
import {computed, ref} from "vue";
import userApi from "@/api/permission/user";
import {User} from "@/types/permission";
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
const record = ref<User>(props.record as User)

const emit = defineEmits(['update:visible', 'update:toCreate', 'findUser'])
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
	userApi.createUser(record.value).then(() => {
		emit('findUser')
		Message.success('创建成功')
	})
}
const update = () => {
	userApi.updateUser(record.value).then(() => {
		emit('findUser')
		Message.success('更新成功')
	})
}
</script>

<style scoped lang="less">

</style>
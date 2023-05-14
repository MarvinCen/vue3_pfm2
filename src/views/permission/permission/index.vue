<template>
	<div class="container">
		<Breadcrumb
			:items="['权限管理', '权限点管理']"
			:internationalization="false"
		/>

		<a-card>
			<a-row :gutter="16">
				<a-col :span="6">
					<menu-table :menu-id="menuId as number" />
				</a-col>
				<a-col :span="18">
					<permission-table :menu-id="menuId as number" />
				</a-col>
			</a-row>
		</a-card>
	</div>
</template>

<script setup lang="ts">
import {ref} from "vue";
import MenuTable from "@/views/permission/permission/menu-table.vue";
import PermissionTable from "@/views/permission/permission/permission-table.vue";

const menuId = ref<number>();
</script>

<style scoped lang="less">
.container {
	padding: 0 20px 20px 20px;
}
</style>
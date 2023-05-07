<template>
<a-card :body-style="{ padding: '24px 16px 0 16px' }" :bordered="false">
	<template #title>
		<strong>快速入口</strong>
	</template>
	<a-row :gutter="0">
		<a-col v-for="link in links" :key="link" :span="6" class="wrapper">
			<div class="icon">
				<component :is="link.icon" />
			</div>
			<a-typography-paragraph class="text">
				{{ link.text }}
			</a-typography-paragraph>
		</a-col>
	</a-row>
</a-card>
</template>

<script setup lang="ts">
import FastInCard from "@/views/homepage/component/fast-in-card.vue";
const links = [
	{ text: '录入成果', icon: 'icon-file' },
	{ text: '审核成果', icon: 'icon-storage' },
	{ text: '我的成果', icon: 'icon-settings' },
	{ text: '分配成果', icon: 'icon-mobile' },
	{ text: '查看绩效', icon: 'icon-fire' },
	{ text: '分配绩效', icon: 'icon-select-all' },
];
</script>

<style scoped lang="less">
.icon {
	display: inline-block;
	width: 32px;
	height: 32px;
	margin-bottom: 4px;
	color: rgb(var(--dark-gray-1));
	line-height: 32px;
	font-size: 16px;
	text-align: center;
	background-color: rgb(var(--gray-1));
	border-radius: 4px;
}

.text {
	font-size: 12px;
	text-align: center;
	color: rgb(var(--gray-8));
}

:deep(.wrapper) {
	margin-bottom: 8px;
	text-align: center;
	cursor: pointer;

	&:last-child {
		.text {
			margin-bottom: 0;
		}
	}
	&:hover {
		.icon {
			color: rgb(var(--arcoblue-6));
			background-color: #e8f3ff;
		}
		.text {
			color: rgb(var(--arcoblue-6));
		}
	}
}
</style>
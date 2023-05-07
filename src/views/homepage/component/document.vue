<template>
<a-card :bordered="false">
	<template #title>
		<strong>帮助文档</strong>
	</template>
	<div
			:style="{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: '48px'
      }"
	>
      <span
					:style="{
					display: 'flex',
					alignItems: 'center',
					color: '#1D2129'
				}"
			>
        <IconFont type="icon-WORD" :size="20" />
        <a-typography-text style="margin-left: 12px">操作手册</a-typography-text>
      </span>
		<icon-download />
	</div>
	<div
			:style="{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: '48px'
      }"
	>
      <span
					:style="{
					display: 'flex',
					alignItems: 'center',
					color: '#1D2129'
				}"
			>
        <IconFont type="icon-WORD" :size="20" />
        <a-typography-text style="margin-left: 12px">常见问题</a-typography-text>
      </span>
		<icon-download />
	</div>

</a-card>
</template>

<script setup lang="ts">
import {range} from "lodash";
import { Icon } from '@arco-design/web-vue';

const IconFont = Icon.addFromIconFontCn({ src: '/src/assets/font/iconfont.js' });
</script>

<style scoped>

</style>
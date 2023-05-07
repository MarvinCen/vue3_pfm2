<template>
<a-card :bordered="false" style="height: 100%">
  <template #title>
    <strong>我的绩效</strong>
  </template>
	<template #extra>
		<a-select style="width: 200px">
			<a-option>2022</a-option>
			<a-option>2023</a-option>
		</a-select>
	</template>
	<a-form label-align="right" :label-col-props="{ span: 5 }">
		<a-row>
			<a-form-item label="教学">
				<a-progress status='success' :percent="0.8" />
			</a-form-item>
		</a-row>
		<a-row>
			<a-form-item label="科研">
				<a-progress status='danger' :percent="0.15" />
			</a-form-item>
		</a-row>
		<a-row>
			<a-form-item label="公共服务">
				<a-progress status='normal' :percent="0.5" />
			</a-form-item>
		</a-row>
		<a-row>
			<a-col :span="12">
				<div style="display: flex; flex-direction: column; align-items: center">
					<a-progress type="circle" status='warning' :percent="0.47" style="margin-top: -12px; margin-bottom: 5px" />
					<span>岗位工作完成率</span>
				</div>
			</a-col>
			<a-col :span="12">
				<div style="display: flex; flex-direction: column; align-items: center">
					<a-progress type="circle" status='normal' :percent="0" style="margin-top: -12px; margin-bottom: 5px" />
					<span>质量系数</span>
				</div>
			</a-col>
		</a-row>
	</a-form>
</a-card>
</template>

<script setup lang="ts">

</script>

<style scoped>

</style>
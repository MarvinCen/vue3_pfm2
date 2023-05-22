<template>
  <div class="container">
		<breadcrumb
			:items="['绩效考核', '成果分配']"
			:internationalization="false"
		/>

		<a-grid :cols="4" :col-gap="10">
			<a-grid-item>
				<a-card class="overall-card" title="分配情况概览" style="max-height: 560px; height: 560px">
					<a-spin :loading="loading" style="width: 100%">
						<a-scrollbar v-if="project" style="height:470px; overflow: auto;">
							<div style="display: flex; flex-flow: wrap; justify-content: space-around;">
								<a-card
										:style="{
							width: '100%'
						}"
										title="成果表Demo1"
										:bordered="true"
										class="table-card"
								>
									<template #extra>
										<a-link>去分配</a-link>
									</template>
									<div style="display: flex; justify-content: space-between; align-items: center">
										<div style="width: 95px">待分配 15</div>
										<a-progress
												status='success'
												size="large"
												:percent="20 / 35"
												:show-text="false"
												style="flex-shrink: 3; margin-right: 15px"
										/>
										<div style="width: 80px">已分配 20</div>
									</div>
								</a-card>
								<a-card
										:style="{
							width: '100%'
						}"
										title="成果表Demo2"
										:bordered="true"
										class="table-card"
								>
									<template #extra>
										<a-link>去分配</a-link>
									</template>
									<div style="display: flex; justify-content: space-between; align-items: center">
										<div style="width: 95px">待分配 3</div>
										<a-progress
												status='success'
												size="large"
												:percent="15 / 18"
												:show-text="false"
												style="flex-shrink: 3; margin-right: 15px"
										/>
										<div style="width: 80px">已分配 15</div>
									</div>
								</a-card>
								<a-card
										v-for="dto in overallDTOs"
										:key="dto.tableId"
										:style="{
							width: '100%'
						}"
										:title="dto.tableName"
										:bordered="true"
										class="table-card"
								>
									<template #extra>
										<a-link
												@click="doFindDistributionDetail(project.eid as number, dto.tableId)"
										>
											去分配
										</a-link>
									</template>
									<div style="display: flex; justify-content: space-between; align-items: center">
										<div style="width: 95px">待分配 {{ dto.haveNotDistCount }}</div>
										<a-progress
												status='success'
												size="large"
												:percent="(dto.distributedCount) / (dto.haveNotDistCount + dto.distributedCount)"
												:show-text="false"
												style="flex-shrink: 3; margin-right: 15px"
										/>
										<div style="width: 80px">已分配 {{ dto.distributedCount }}</div>
									</div>
								</a-card>
							</div>
						</a-scrollbar>

						<a-empty v-else style="height: inherit">
							<template #image>
								<icon-exclamation-circle-fill />
							</template>
							暂无数据~ 请先选择考核项目
						</a-empty>
					</a-spin>
				</a-card>
			</a-grid-item>

			<a-grid-item :span="3">
				<a-card title="成果分配" style="height: 560px" :scrollbar="true">
					<template #extra>
						<a-select
								v-model="project"
								:options="projects"
								:field-names="{ label: 'name', value: 'eid' }"
								placeholder="请选择考核项目"
								@change="change"
								style="min-width: 200px"
						>
							<template #option="{ data }">
								<div style="display: flex; justify-content: space-between; width: 170px">
									<div>{{ data.name }}</div>
									<div>
										<a-tag
												:color="data.status === '已结束' ? 'red' : 'green' "
												size="small"
										>
											{{ data.status }}
										</a-tag>
									</div>
								</div>
							</template>
						</a-select>
					</template>
					<a-spin :loading="loading" style="width: 100%">

						<a-table
								v-if="project"
								:columns="[]"
								:data="[]"
								:loading="tableLoading"
						>
							<template #empty>
								<a-empty
										description="暂无成果数据"
								/>
							</template>
						</a-table>

						<a-empty v-else style="height: inherit">
							<template #image>
								<icon-exclamation-circle-fill />
							</template>
							暂无数据~ 请先选择考核项目
						</a-empty>
					</a-spin>
				</a-card>
			</a-grid-item>
		</a-grid>
  </div>
</template>

<script setup lang="ts">

import {onMounted, ref} from "vue";
import {findEvaluationProjects} from "@/api/evaluation/evaluation-project";
import {EvaluationProject} from "@/types/evaluation";
import {useEmployeeStore} from "@/store";
import resultApi from "@/api/evaluation/result";
import {TableColumnData} from "@arco-design/web-vue";

const employeeStore = useEmployeeStore();


const projects = ref<EvaluationProject[]>([])
const loading = ref<boolean>(false)
const tableLoading = ref<boolean>(false)
onMounted(async () => {
	const projectsResp = await findEvaluationProjects()
	projects.value = projectsResp.data.list
})


const project = ref<EvaluationProject | undefined>(undefined);
const overallDTOs =  ref<{
	tableId: number;
	tableName: string;
	haveNotDistCount: number;
	distributedCount: number;
}[]>([])
const change = async (projectId: number) => {
	loading.value = true
	try {
		await (new Promise((resolve) => {
			setTimeout(() => resolve("done!"), 1000)
		}))
		const overallResp = await resultApi
				.findDistributionOverall(projectId, false, employeeStore.employeeInfo.eid as number)
		overallDTOs.value = overallResp.data.list
	} catch (e) {} finally {
		loading.value = false
	}

	if (overallDTOs.value && overallDTOs.value.length !== 0) {
		tableLoading.value = true
		try {
			await doFindDistributionDetail(projectId, overallDTOs.value[0].tableId)
		} catch (e) {} finally {
			tableLoading.value = false;
		}
	}
}


const data = ref<any[]>([])
const columns = ref<TableColumnData[]>([])
const doFindDistributionDetail = async (projectId: number, tableId: number) => {
	console.log(123)
	const resp = await resultApi
			.findDistributionDetail(projectId, false, employeeStore.employeeInfo.eid as number, tableId)
	// TODO find and set columns
	data.value = resp.data.list
}
</script>

<style scoped lang="less">
.container {
  padding: 0 20px 20px 20px;
}

.table-card + .table-card {
	margin-top: 20px;
}
</style>
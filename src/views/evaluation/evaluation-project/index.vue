<template>
  <div class="container">
    <Breadcrumb
				:items="['考核项目', '考核项目列表']"
				:internationalization="false"
		/>
    <a-row :gutter="20" align="stretch">
      <a-col :span="24">
        <a-card class="general-card" title="考核项目列表">
          <a-row justify="space-between">
            <a-col :span="24">
              <a-tabs :default-active-tab="1" type="rounded">
                <a-tab-pane key="1" title="全部">
                  <project-card
											:loading="loading"
											:evaluation-projects="evaluationProjects"
									/>
                </a-tab-pane>
                <a-tab-pane key="2" title="正在进行">
									<project-card
											:loading="loading"
											:evaluation-projects="unFinishedProjects"
									/>
                </a-tab-pane>
                <a-tab-pane key="3" title="已结束">
									<project-card
											:loading="loading"
											:evaluation-projects="finishedProjects"
									/>
                </a-tab-pane>
              </a-tabs>
            </a-col>
            <a-col :span="12">
              <a-space>
                <a-button
                  status="success"
                  style="position: absolute; top: 60px; right: 280px"
                  @click="() => {modalVisible = true}"
                >
                  新建考核項目
                </a-button>
                <a-input-search
                  :placeholder="$t('cardList.searchInput.placeholder')"
                  style="
                    width: 240px;
                    position: absolute;
                    top: 60px;
                    right: 20px;
                  "
                />
              </a-space>
            </a-col>
          </a-row>
        </a-card>
      </a-col>
    </a-row>

		<a-modal
			v-model:visible="modalVisible"
			:title="'新建考核项目'"
			:width="800"
			@ok="handleSubmit"
			@cancel="() => { modalVisible = false }"
		>
			<a-form :model="newProject">
				<a-row :gutter="25">
					<a-col :span="12">
						<a-form-item field="name" label="项目名称">
							<a-input v-model="newProject.name" placeholder="请输入项目名称" />
						</a-form-item>
					</a-col>
				</a-row>
				<a-row :gutter="25">
					<a-col :span="12">
						<a-form-item field="type" label="项目类型">
							<a-select v-model="newProject.type" placeholder="请输入项目类型">
								<a-option>年度考核</a-option>
								<a-option>聘期考核</a-option>
							</a-select>
						</a-form-item>
					</a-col>
					<a-col :span="12" v-if="newProject.type === '年度考核'">
						<a-form-item field="year" label="年份">
							<a-year-picker
									v-model="newProject.year"
									placeholder="请选择年份"
									style="width: 100%"
							/>
						</a-form-item>
					</a-col>
				</a-row>
				<a-row :gutter="25">
					<a-col :span="12">
						<a-form-item field="startTime" label="开始时间">
							<a-date-picker
									show-time
									format="YYYY-MM-DD HH:mm:ss"
									v-model="newProject.startTime"
									placeholder="请输入开始时间"
									style="width: 100%"
							/>
						</a-form-item>
					</a-col>
					<a-col :span="12">
						<a-form-item field="endTime" label="结束时间">
							<a-date-picker
									show-time
									format="YYYY-MM-DD HH:mm:ss"
									v-model="newProject.endTime"
									placeholder="请输入结束时间"
									style="width: 100%"
							/>
						</a-form-item>
					</a-col>
				</a-row>
				<a-row :gutter="25">
					<a-col :span="12">
						<a-form-item field="resultCheckedExpireTime" label="成果分配截止时间">
							<a-date-picker
									show-time
									format="YYYY-MM-DD HH:mm:ss"
									v-model="newProject.resultCheckedExpireTime"
									placeholder="请输入成果分配截止时间"
									style="width: 100%"
							/>
						</a-form-item>
					</a-col>
					<a-col :span="12">
						<a-form-item field="pfmCheckedExpireTime" label="绩效确认截止时间">
							<a-date-picker
									show-time
									format="YYYY-MM-DD HH:mm:ss"
									v-model="newProject.pfmCheckedExpireTime"
									placeholder="请输入绩效确认截止时间"
									style="width: 100%"
							/>
						</a-form-item>
					</a-col>
				</a-row>
				<a-row :gutter="25">
					<a-col :span="24">
						<a-form-item field="evaluationPlanIds" label="考核方案" label-col-flex="56px">
							<a-select
									v-model="newProject.evaluationPlanIds"
									placeholder="请选择考核方案"
									multiple
							>
								<a-option :value="plan.eid" v-for="plan in plans">
									{{ plan.name }}
								</a-option>
							</a-select>
						</a-form-item>
					</a-col>
				</a-row>
			</a-form>
		</a-modal>
  </div>
</template>

<script setup lang="ts">
import ProjectCard from '@/views/evaluation/evaluation-project/component/project-card.vue';
import {computed, onMounted, ref} from 'vue';
import {createEvaluationProject, findEvaluationProjects} from '@/api/evaluation/evaluation-project';
import {EvaluationPlan, EvaluationProject} from "@/types/evaluation";
import {findEvaluationPlans} from "@/api/evaluation/evaluation-plan";
import {projectStatus} from "@/types/evaluation";

const evaluationProjects = ref([]);
const plans = ref<EvaluationPlan[]>([]);
const loading = ref(false);
const refreshProjects = () => {
	loading.value = true;
	findEvaluationProjects().then((res) => {
		evaluationProjects.value = res.data.list;
	}).finally(() => { loading.value = false });
}
onMounted(() => {
	refreshProjects();
	findEvaluationPlans({
		enablePagination: false,
		conditions: {},
		props: ['eid', 'name'],
	}).then((res) => {
		plans.value = res.data.list;
	})
});
const finishedProjects = computed(() => {
	return evaluationProjects.value.filter((item: EvaluationProject) => {
    return item.status === projectStatus.finished;
  });
})
const unFinishedProjects = computed(() => {
	return evaluationProjects.value.filter((item: EvaluationProject) => {
		return item.status !== projectStatus.finished;
	});
})




const newProject = ref<EvaluationProject>({});
const modalVisible = ref(false);
const handleSubmit = () => {
	newProject.value.status = projectStatus.unStarted;
	createEvaluationProject(newProject.value).then(() => {
		refreshProjects();
		modalVisible.value = false;
	})
}

</script>

<style scoped lang="less">
.container {
  padding: 0 20px 20px 20px;
}

:deep(.list-wrap) {
  // min-height: 140px;
  .list-row {
    align-items: stretch;
    .list-col {
      margin-bottom: 16px;
    }
  }
  :deep(.arco-space) {
    width: 100%;
    .arco-space-item {
      &:last-child {
        flex: 1;
      }
    }
  }
}
</style>

<template>
  <div class="container">
    <Breadcrumb :items="['menu.list', 'menu.list.cardList']" />
    <a-row :gutter="20" align="stretch">
      <a-col :span="24">
        <a-card class="general-card" :title="$t('menu.list.cardList')">
          <a-row justify="space-between">
            <a-col :span="24">
              <a-tabs :default-active-tab="1" type="rounded">
                <a-tab-pane key="1" title="全部">
                  <project-card :evaluation-projects="evaluationProjects" />
                  <TheService />
                  <RulesPreset />
                </a-tab-pane>
                <a-tab-pane key="2" title="正在进行">
                  <TheService />
                </a-tab-pane>
                <a-tab-pane key="3" title="已结束">
                  <RulesPreset />
                </a-tab-pane>
              </a-tabs>
            </a-col>
            <a-col :span="12">
              <a-space>
                <a-button
                  status="success"
                  style="position: absolute; top: 60px; right: 280px"
                  @click="$router.push('evaluationProjectDetails')"
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
  </div>
</template>

<script setup>
import TheService from '@/views/list/card/components/the-service.vue';
import RulesPreset from '@/views/list/card/components/reules-preset.vue';
import ProjectCard from '@/views/evaluation/evaluation-project/component/project-card.vue';
import { onMounted, ref } from 'vue';
import { findEvaluationProjects } from '@/api/evaluation/evaluation-project';

const evaluationProjects = ref([]);
onMounted(() => {
  findEvaluationProjects().then((res) => {
    evaluationProjects.value = res.data.list;
    console.log(res);
  });
});
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

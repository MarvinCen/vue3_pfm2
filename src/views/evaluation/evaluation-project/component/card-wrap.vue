<template>
  <a-card v-if="loading" :bordered="true" hoverable>
    <slot name="skeleton"></slot>
  </a-card>
  <a-card v-else :bordered="true" hoverable>
    <a-space align="start">
      <a-avatar :size="24" style="margin-right: 8px; background-color: #626aea">
        <icon-filter />
      </a-avatar>
      <a-card-meta>
        <template #title>
          <div style="display: flex">
            <a-typography-text style="margin-right: 10px">
              {{ evaluationProject.name }}
            </a-typography-text>
            <span style="vertical-align: baseline">
              <a-tag
                v-if="evaluationProject.status !== '已结束'"
                size="small"
                color="green"
              >
                <template #icon>
                  <icon-check-circle-fill />
                </template>
                <span>{{ evaluationProject.status }}</span>
              </a-tag>
              <a-tag v-else size="small" color="red">
                <template #icon>
                  <icon-check-circle-fill />
                </template>
                <span>{{ evaluationProject.status }}</span>
              </a-tag>
            </span>
          </div>
        </template>
        <template #description>
          <div class="desc">
            {{ '开始时间：' + evaluationProject.startTime }}
            <br />
            {{ '结束时间：' + evaluationProject.endTime }}
					</div>
          <slot></slot>
        </template>
      </a-card-meta>
    </a-space>

    <template #actions>
      <a-space>
				<a-button
          size="mini"
					status="normal"
					@click="$router.push('evaluationProjectDetail')"
				>
					查看详情
				</a-button>
				<a-button
					v-if="evaluationProject.status === projectStatus.unStarted"
					size="mini"
					type="outline"
					status="normal"
					@click="() => {evaluationProject.status = projectStatus.input}"
				>
					启动
				</a-button>
				<a-button
					v-else-if="evaluationProject.status === projectStatus.input"
					size="mini"
					type="outline"
					status="normal"
					@click="() => {evaluationProject.status = projectStatus.resultDistribution}"
				>
					开放分配
				</a-button>
				<a-button
					v-else-if="evaluationProject.status === projectStatus.resultDistribution"
					size="mini"
					type="outline"
					status="normal"
					@click="() => {evaluationProject.status = projectStatus.pfmAnnouncement}"
				>
					开放公示
				</a-button>
				<a-button
					v-else-if="evaluationProject.status === projectStatus.pfmAnnouncement"
					size="mini"
					type="outline"
					status="normal"
					@click="() => {evaluationProject.status = projectStatus.pfmDistribution}"
				>
					开放分配
				</a-button>
				<a-button
					v-else-if="evaluationProject.status === projectStatus.pfmDistribution"
					size="mini"
					type="outline"
					status="normal"
					@click="() => {evaluationProject.status = projectStatus.finished}"
				>
					结束考核
				</a-button>
      </a-space>
    </template>
  </a-card>
</template>

<script setup>
import {projectStatus} from "@/types/evaluation";

defineProps({
  loading: {
    type: Boolean,
    default: false,
  },
  evaluationProject: {
    type: Object,
    required: true,
    default() {
      return {
        name: '',
        status: '',
        type: '',
        startTime: '',
        endTime: '',
      };
    },
    validator(value) {
      return projectStatus.allStatus.includes(value.status);
    },
  },
});
</script>

<style scoped lang="less">
.desc {
  color: rgb(var(--gray-6));;
  font-size: 12px;
  line-height: 20px;
  margin-top: 10px;
}
</style>

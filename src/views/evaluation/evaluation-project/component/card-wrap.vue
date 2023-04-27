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
                v-if="evaluationProject.status !== '考核结束'"
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
          {{ '开始时间：' + evaluationProject.startTime }}
          {{ '結束時間：' + evaluationProject.endTime }}
          <slot></slot>
        </template>
      </a-card-meta>
    </a-space>

    <template #actions>
      <a-button status="normal" @click="$router.push('evaluationProjectDetail')">查看详情</a-button>
    </template>
  </a-card>
</template>

<script setup>
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
      return [
        '数据录入',
        '工作量计算',
        '成果分配',
        '绩效计算',
        '绩效分配',
        '考核结束',
      ].includes(value.status);
    },
  },
});
</script>

<style scoped></style>

<template>
  <a-card class="general-card" style="margin-top: 20px">
    <h1>TODO</h1>
  </a-card>
  <div class="actions">
    <a-space>
      <a-button type="primary" @click="changeStepOnClick"> 上一步 </a-button>
      <a-button type="primary" @click="submit"> 提交 </a-button>
    </a-space>
  </div>
</template>

<script setup>
const emit = defineEmits(['changeStep', 'createEvaluationPlan']);
const submit = () => {
  emit('changeStep', 'next', {});
  emit('createEvaluationPlan');
};

const changeStepOnClick = () => {
  emit('changeStep', 'prev', {});
};
</script>

<style scoped lang="less">
.general-card {
  border: none;
  border-radius: 4px;

  & > .arco-card-header {
    height: auto;
    padding: 20px;
    border: none;
  }

  & > .arco-card-body {
    padding: 0 20px 20px;
  }
}

.actions {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  height: 60px;
  padding: 14px 20px 14px 0;
  background: var(--color-bg-2);
  text-align: right;
}
</style>

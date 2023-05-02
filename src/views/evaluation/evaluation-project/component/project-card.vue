<template>
  <div class="list-wrap">
    <a-row class="list-row" :gutter="24">
      <a-col
        v-for="item in evaluationProjects"
        :key="item.id"
        :span="6"
        class="list-col"
        style="min-height: 162px"
      >
        <card-wrap :loading="loading" :evaluation-project="item">
          <template #skeleton>
            <a-skeleton :animation="true">
              <a-skeleton-line :widths="['100%', '40%', '100%']" :rows="3" />
              <a-skeleton-line :widths="['40%']" :rows="1" />
            </a-skeleton>
          </template>
        </card-wrap>
      </a-col>
    </a-row>
  </div>
</template>

<script setup>
import CardWrap from '@/views/evaluation/evaluation-project/component/card-wrap.vue';

defineProps({
  evaluationProjects: {
    type: Array,
    required: true,
    default: () => {
      return [];
    },
  },
  loading: {
		required: true,
    type: Boolean,
    default: false,
  }
});

</script>

<style scoped></style>

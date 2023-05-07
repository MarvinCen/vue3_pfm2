<template>
  <div class="container">
    <breadcrumb :items="['首页']" :internationalization="false" />
    <a-grid
      :cols="6"
			:colGap="16"
			:rowGap="16"
    >
      <a-grid-item :span="2" class="grid-item">
				<fast-in />
      </a-grid-item>

			<a-grid-item :span="2" class="grid-item">
        <carousel />
			</a-grid-item>

			<a-grid-item :span="2" class="grid-item">
         <pfm-info />
			</a-grid-item>

      <a-grid-item class="document">
				<document />
      </a-grid-item>

      <a-grid-item :span="5" class="eva-process">
        <eva-steps />
      </a-grid-item>
    </a-grid>
  </div>
</template>

<script setup lang="ts">

import FastIn from "@/views/homepage/component/fast-in.vue";
import Document from "@/views/homepage/component/document.vue";
import EvaSteps from "@/views/homepage/component/eva-steps.vue";
import PfmInfo from "@/views/homepage/component/pfm-info.vue";
import Carousel from "@/views/dashboard/workplace/components/carousel.vue";
</script>

<style scoped lang="less">
.container {
  padding: 0 20px 20px 20px;
}

.grid-item,
.document,
.eva-process {

}

.grid-item {
  box-sizing: border-box;
  height: 300px;
  background-color: white;
}

.grid-item-scrollbar {
  height: 300px;
  overflow: auto;
}

.document,
.eva-process {
  height: 240px;
  background-color: white;
}
</style>

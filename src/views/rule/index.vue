<template>
  <div class="container">
    <Breadcrumb
      :items="['计算规则', '规则管理']"
      :internationalization="false"
    />
    <a-card>
			<a-row :gutter="16">
				<a-col :span="16">
					<rule-table v-model:rule-id="ruleId as number" />
				</a-col>
				<a-col :span="8">
					<rule-version-table v-model:rule-id="ruleId as number" />
				</a-col>
			</a-row>
    </a-card>
  </div>
</template>

<script setup lang="ts">
import RuleVersionTable from "@/views/rule/rule-version-table.vue";
import RuleTable from "@/views/rule/rule-table.vue";
import {ref} from "vue";

const ruleId = ref<number>();


</script>

<style scoped lang="less">
.container {
  padding: 0 20px 20px 20px;
}
</style>
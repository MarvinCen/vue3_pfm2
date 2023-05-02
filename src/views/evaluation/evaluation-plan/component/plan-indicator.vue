<template>
  <a-card class="general-card" style="margin-top: 20px">
    <div style="padding: 20px 0 10px 0">
			<a-row :gutter="[24, 50]">
				<a-col :span="10">
					<multi-search :columns="columns" />
				</a-col>
				<a-col :span="14" style="text-align: right; align-content: center">
          <a-space>
						<a-button status="normal">查看树形图</a-button>
						<a-button status="success" @click="() => { modalVisible = true }">新建指标</a-button>
						<a-modal
								v-model:visible="modalVisible"
								:title="'新建指标'"
								:width="800"
								@ok="handleSubmit"
								@cancel="() => { modalVisible = false }"
						>
							<template #footer>
                <a-button @click="clearNewIndicator()">重置</a-button>
								<a-divider direction="vertical" />
								<a-button @click="() => { modalVisible = false }">取消</a-button>
								<a-divider direction="vertical" />
								<a-button type="primary" @click="handleSubmit()">确定</a-button>
							</template>
              <a-form :model="newIndicator">
                <a-row :gutter="25">
                  <a-col :span="12">
                    <a-form-item field="name" label="名称">
                      <a-input v-model="newIndicator.name" placeholder="请输入名称" />
                    </a-form-item>
                  </a-col>
									<a-col :span="12">
										<a-form-item field="name" label="上级指标">
											<a-tree-select
													v-model="newIndicator.parentId"
													placeholder="请输入上级指标"
													:data="data"
													:field-names="{
														key: 'eid',
														title: 'name',
														children: 'children'
													}"
													allow-search
											/>
										</a-form-item>
									</a-col>
                </a-row>
								<a-row :gutter="25">
									<a-col :span="12">
										<a-form-item field="name" label="单位">
											<a-select
													v-model="newIndicator.unit"
													placeholder="请输入单位"
													:options="unitOptions"
													default-active-first-option
											/>
										</a-form-item>
									</a-col>
									<a-col :span="12">
										<a-form-item field="name" label="单位分值">
											<a-input-number
													v-model="newIndicator.score"
													placeholder="请输入单位分值"
											/>
										</a-form-item>
									</a-col>
								</a-row>
								<a-row :gutter="25">
									<a-col :span="12">
										<a-form-item field="name" label="汇总系数">
											<a-input-number
													v-model="newIndicator.ratio"
													placeholder="请输入汇总系数"
													:step="1"
													:default-value="1"
											/>
										</a-form-item>
									</a-col>
									<a-col :span="12">
										<a-form-item field="name" label="最高限分">
											<a-input-number
													v-model="newIndicator.limitScore"
													placeholder="请输入最高限分"
											/>
										</a-form-item>
									</a-col>
								</a-row>
								<a-row :gutter="25">
									<a-col :span="12">
										<a-form-item field="name" label="最高限项">
											<a-input-number
													v-model="newIndicator.limitItem"
													placeholder="请输入最高限项"
											/>
										</a-form-item>
									</a-col>
									<a-col :span="12">
										<a-form-item field="name" label="成果类型">
											<a-tree-select
													v-model="newIndicator.resultMatchers"
													placeholder="请输入成果类型"
													:data="resultTypeOptions"
													:field-names="{
														key: 'eid',
														title: 'name',
														children: 'children'
													}"
													allow-search
											/>
										</a-form-item>
									</a-col>
								</a-row>
              </a-form>
            </a-modal>
          </a-space>
				</a-col>
			</a-row>
    </div>

		<a-table
      :columns="columns"
      :data="data"
      :row-selection="rowSelection"
    >
      <template #operation>
        <a-button status="success">新建子节点</a-button>
        <a-button status="warning">编辑</a-button>
				<a-button status="danger">删除</a-button>
			</template>
    </a-table>
  </a-card>
  <div v-if="usage === 'creation'" class="actions">
    <a-space>
			<a-button status="normal" @click="$router.push('evaluationPlan')"> 取消 </a-button>
      <a-button status="normal" @click="changeStepOnClick()"> 上一步 </a-button>
      <a-button type="primary" @click="submit()"> 完成 </a-button>
    </a-space>
  </div>
</template>

<script setup lang="ts">
import {TableColumnData, TableRowSelection} from "@arco-design/web-vue";
import {onMounted, reactive, ref} from "vue";
import {Indicator} from "@/types/evaluation";
import MultiSearch from "@/components/table/multi-search.vue";
import {findResultTypes} from "@/api/results/results";
import {findIndicatorsBy} from "@/api/evaluation/evaluation-plan";
import utils from '@/utils/common';

const props = defineProps({
	usage: {
		required: true,
		type: String,
		default: 'creation'
	},
	plan: {
		required: false,
		type: Object,
		default: () => {}
	}
});
const emit = defineEmits(['changeStep', 'createIndicator']);
const submit = () => {
	emit('changeStep', 'next', {});
};

const changeStepOnClick = () => {
  emit('changeStep', 'prev', {});
};

const columns: TableColumnData[] = [
	{
		dataIndex: 'name',
		title: '序号',
    fixed: 'left',
    ellipsis: true,
    align: 'center',
  },
	{
		dataIndex: 'isLeaf',
		title: '是否叶节点',
		ellipsis: true,
		align: 'center',
	},
	{
		dataIndex: 'score',
		title: '单位分值',
		ellipsis: true,
		align: 'center',
	},
	{
		dataIndex: 'ratio',
		title: '汇总系数',
		ellipsis: true,
		align: 'center',
	},
	{
		dataIndex: 'limitScore',
		title: '最高限分',
		ellipsis: true,
		align: 'center',
	},
	{
		dataIndex: 'limitItem',
		title: '最高限项',
		ellipsis: true,
		align: 'center',
	},
	{
		dataIndex: 'operation',
		title: '操作',
		ellipsis: true,
		align: 'center',
	},
];
const data = ref<Indicator[]>([]);
const rowSelection: TableRowSelection = reactive({
	type: 'checkbox',
	showCheckedAll: true,
	checkStrictly: true
});


const newIndicator = ref<Indicator>({});
const modalVisible = ref(false);
const handleSubmit = () => {
	newIndicator.value.ratio = newIndicator.value.ratio || 1;
	newIndicator.value.isLeaf = true;

	emit('createIndicator', newIndicator.value)

	if (!newIndicator.value.parentId) {
		data.value.push(newIndicator.value)
	}
	modalVisible.value = false;
}
const clearNewIndicator = () => {
	newIndicator.value = {};
}


// 表单数据准备
const resultTypeOptions = ref([]);
const unitOptions = ref(['分', '元']);
onMounted(() => {
	findResultTypes({
		enablePagination: false,
	}).then(res => {
		resultTypeOptions.value = res.data.list;
	})

	if (props.usage !== 'creation') {
		findIndicatorsBy(props.plan.eid).then(res => {
			const indicators = res.data.list;
			console.log(indicators)
			data.value = utils.treeify(indicators, {
				id: 'eid',
				parentId: 'parentId',
				children: 'children'
			}) as Indicator[];
			console.log(data.value)
		})
	}
})
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

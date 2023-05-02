<template>
	<Breadcrumb
		:items="[
        'menu.evaluation',
        'menu.evaluation.evaluationPlan',
        'menu.evaluation.evaluationPlanEdit',
      ]"
	/>
  <a-card
    class="general-card"
    style="margin-top: 20px"
    title="表单"
  >
    <a-form
      ref="formRef"
      :model="formData"
      :label-col-props="{span: 3}"
      label-align="left"
      auto-label-width
    >
      <a-row :gutter="25">
        <a-col :span="8">
          <a-form-item field="name" label="名称：">
            <a-input
              v-model="formData.name"
              placeholder="请输入方案名称"
            />
          </a-form-item>
        </a-col>
        <a-col :span="8">
          <a-form-item field="positions" label="岗位：">
            <a-select
              v-model="formData.positions"
              multiple
              allow-clear
              style="width: 300px; flex-grow: 2"
              :scrollbar="true"
              @change="onSelectPositions"
            >
							<a-option
                v-for="position of positionOptions"
                :key="position.eid"
                :value="position.name"
              >
								{{ position.name }}
							</a-option>
            </a-select>
          </a-form-item>
        </a-col>
        <a-col :span="8">
          <a-form-item field="professionalTitles" label="职称：">
            <a-select
							v-model="formData.professionalTitles"
              multiple
              allow-clear
              :scrollbar="true"
              @change="onSelectProTitles"
            >
							<a-option
								v-for="position of proTitleOptions"
								:key="position.eid"
								:value="position.professionalTitle"
							>
								{{ position.professionalTitle }}
							</a-option>
            </a-select>
          </a-form-item>
        </a-col>
      </a-row>
      <a-row :gutter="25">
				<a-col :span="24">
					<a-form-item field="remark" label="备注：">
						<a-textarea
							v-model="formData.remark"
							placeholder="请输入备注"
						/>
					</a-form-item>
				</a-col>
      </a-row>
    </a-form>
  </a-card>
  <a-card class="general-card" title="自定义数据" style="margin: 20px 0 40px">
    <a-textarea
      v-model:model-value="formData.customData"
      placeholder="Please enter something"
      allow-clear
    />
  </a-card>
  <div v-if="usage === 'creation'" class="actions">
    <a-space>
			<a-button status="normal" @click="$router.push('evaluationPlan')"> 取消 </a-button>
      <a-button type="primary" @click="onNextClick()"> 提交并下一步 </a-button>
    </a-space>
  </div>
</template>

<script lang="ts">
import {defineComponent, onMounted, ref, watch} from 'vue';
import { FormInstance } from '@arco-design/web-vue/es/form';
import {findPositions} from "@/api/basic-data/position";
import {Position} from "@/types/basic-data";
import {Response} from "@/types/global";
import {EvaluationPlan} from "@/types/evaluation";

export default defineComponent({
  emits: ['createOrUpdatePlan'],
  props: {
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
  },
  setup(props, ctx) {
		const plan = props.plan as EvaluationPlan;

    const formRef = ref<FormInstance>();
    const formData = ref<EvaluationPlan>(plan);
		if (!formData.value) {
			formData.value = {
				name: '',
        positions: [],
        professionalTitles: [],
				customData: '',
				remark: ''
      };
    }


    const onNextClick = async () => {
      const res = await formRef.value?.validate();
      if (!res) {
        ctx.emit('createOrUpdatePlan', { ...formData.value });
      }
    };

    const positions = ref<Position[]>([]);

		const positionOptions = ref<Position[]>([]);
    const proTitleOptions = ref<Position[]>([])
    watch(
			() => formData.value.positions,
      (newPs) => {
				if (newPs) {
					const temp = positions.value.filter((p: Position) => {
						return newPs.includes(p.name as string)
					});
					proTitleOptions.value = temp.filter((p, idx, arr) => {
						return arr.findIndex((pt) => {
							return pt.professionalTitle === p.professionalTitle;
						}) === idx;
					})
				}
    })

		const onSelectProTitles = (value: string[]) => {
			formData.value.professionalTitles = value;
		}


		const onSelectPositions = (value: string[]) => {
			formData.value.positions = value;
    }

		onMounted(() => {
			findPositions({
				enablePagination: false,
				conditions: {
					organizationId: '',
				}
			}).then((res) => {
				positions.value = (res as Response).data.list;
				positionOptions.value = positions.value.filter((p, idx, arr) => {
					return arr.findIndex((pt) => {
						return pt.name === p.name;
          }) === idx;
				})
			});

		})

    return {
      formData,
      formRef,
      onNextClick,

      onSelectPositions,
			onSelectProTitles,
			positionOptions,
			proTitleOptions,
    };
  },
});
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

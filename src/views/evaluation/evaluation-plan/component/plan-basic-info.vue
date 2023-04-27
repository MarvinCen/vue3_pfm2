<template>
  <a-card
    class="general-card"
    style="margin-top: 20px"
    title="筛选需要考核的人员"
  >
    <a-form ref="formRef" :model="formData" layout="inline">
      <a-row :gutter="0">
        <a-col :span="12">
          <a-form-item field="positions" label="岗位：">
            <a-select
              multiple
              allow-clear
              style="width: 300px"
              :scrollbar="true"
            >
							<a-option
                v-for="position of Object.keys(proTitles)"
                :key="position"
                :value="position"
              >
								{{ position }}
							</a-option>
            </a-select>
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item field="professionalTitles" label="职称：">
            <a-select
              multiple
              allow-clear
              :scrollbar="true"
              :options="professionalTitlesOptions"
            />
          </a-form-item>
        </a-col>
      </a-row>
    </a-form>
  </a-card>
  <a-card class="general-card" title="自定义数据" style="margin-top: 12px">
    <a-textarea
      v-model:model-value="formData.customDataString"
      placeholder="Please enter something"
      allow-clear
    />
  </a-card>
  <div class="actions">
    <a-space>
			<a-button status="normal" @click="$router.push('evaluationPlan')"> 取消 </a-button>
      <a-button type="primary" @click="onNextClick"> 下一步 </a-button>
    </a-space>
  </div>
</template>

<script lang="ts">
import {computed, defineComponent, onMounted, ref, watch} from 'vue';
import { FormInstance } from '@arco-design/web-vue/es/form';
import {findPositions} from "@/api/basic-data/position";
import fetchPageList from "@/utils/request";
import {Position} from "@/types/basic-data";

export default defineComponent({
  emits: ['changeStep'],
  setup(props, ctx) {
    const formRef = ref<FormInstance>();
    const formData = ref({
      positions: [],
      professionalTitles: [],
      customData: {},
      customDataString: '',
    });

    const onNextClick = async () => {
      const res = await formRef.value?.validate();
      if (!res) {
        ctx.emit('changeStep', 'next', { ...formData.value });
      }
    };

		const proTitles = ref<any>({});
		const findProTitlesGroupByPosition = () => {
			findPositions({
        enablePagination: false
      }).then(res => {
				const positions: Position[] = res.data.list;
				for (let i = 0; i < positions.length; i++) {
          const position = positions[i].name as string;
					if (!proTitles.value[position]) {
						proTitles.value[position] = [];
          }
					proTitles.value[position].push(positions[i].professionalTitle);
				}
      })
    };

		onMounted(() => {
			findProTitlesGroupByPosition();
    })

    const professionalTitlesOptions = computed(() =>{
			const positions = formData.value.positions;
			const opts = [];
			for (let i = 0; i < positions.length; i++) {
        opts.push(proTitles[positions[i]]);
      }
			return opts;
    })

    return {
      formData,
      formRef,
      onNextClick,

			proTitles,
			professionalTitlesOptions,
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

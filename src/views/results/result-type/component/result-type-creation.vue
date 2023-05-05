<template>
  <div class="container">
    <Breadcrumb
      :items="['成果管理', '成果类型', '新增成果类型']"
      :internationalization="false"
    />
    <a-card class="general-card" title="新增成果类型">
      <a-steps :current="currentStep" label-placement="vertical">
        <a-step>创建成果类型</a-step>
        <a-step>创建成果表</a-step>
        <a-step>完成</a-step>
      </a-steps>
		</a-card>
		<div v-if="currentStep === 1" style="margin-top: 20px">
			<a-form ref="formRef" layout="vertical" :model="resultType">
				<a-card class="general-card">
					<template #title>
						{{ '基本信息' }}
					</template>
					<a-row :gutter="80">
						<a-col :span="7">
							<a-form-item label="名称" field="resultType.name">
								<a-input
										v-model="resultType.name"
										placeholder="请输入名称"
								/>
							</a-form-item>
						</a-col>
						<a-col :span="7">
							<a-form-item label="状态" field="resultType.status">
								<a-select
										v-model="resultType.status"
										placeholder="请选择状态"
								>
									<a-option value="enable">启用</a-option>
									<a-option value="disable">禁用</a-option>
								</a-select>
							</a-form-item>
						</a-col>
					</a-row>
					<a-row :gutter="80">
						<a-col :span="7">
							<a-form-item label="父级成果类型" field="resultType.parentId">
								<a-tree-select
									v-model="resultType.parentId"
									:data="resultTypeOptions"
									placeholder="请选择父级成果类型（如果有）"
									allow-clear
									:field-names="{ key: 'eid', title: 'name' }"
									@change="parentResultTypeChanged"
								/>
							</a-form-item>
						</a-col>
						<a-col :span="7">
							<a-form-item label="所属部门" field="resultType.departmentId">
								<a-select
									placeholder="请选择所属部门"
									:options="departmentOptions"
									:field-names="{ label: 'name', value: 'eid' }"
									v-model="resultType.departmentId"
								/>
							</a-form-item>
						</a-col>
					</a-row>
					<a-form-item label="备注" field="resultType.remark">
						<a-textarea
							placeholder="请输入备注"
							v-model="resultType.remark"
						/>
					</a-form-item>
				</a-card>
				<a-card class="general-card" :bordered="false" style="margin: 20px 0 40px">
					<template #title>
						{{ '自定义数据' }}
					</template>
					<a-form-item field="resultType.customData">
						<a-textarea v-model="resultType.customData" />
					</a-form-item>
				</a-card>
			</a-form>
		</div>
		<a-card v-if="currentStep === 2" :bordered="false" style="margin-top: 20px">
			<result-table-creation
					:result-tables="resultTables"
			/>
		</a-card>
		<a-card v-if="currentStep === 3" :bordered="false" style="margin-top: 20px">
			<a-result status="success" title="创建成功~">
				<template #extra>
					<a-space>
						<a-button
							type="primary"
							@click="() => { $router.push({ name: 'resultType' });}"
						>返回列表</a-button
						>
					</a-space>
				</template>
			</a-result>
		</a-card>
		<div class="actions">
			<a-space>
				<a-button @click="$router.push('resultType')">
					取消
				</a-button>
				<a-button v-if="currentStep === 1">
					{{ $t('groupForm.reset') }}
				</a-button>
				<a-button
					v-if="currentStep === 2"
					type="primary"
					status="success"
					@click="prevStep(currentStep)"
				>
					上一步
				</a-button>
				<a-button
					v-if="currentStep === 1"
					type="primary"
					:loading="loading"
					@click="createResultTypeClick()"
				>
					提交并下一步
				</a-button>
				<a-button
						v-if="currentStep === 2"
						type="primary"
						:loading="loading"
						@click="doCreateResultTable()"
				>
					完成
				</a-button>
			</a-space>
		</div>
  </div>
</template>

<script lang="ts">
import { ref, onMounted, reactive } from 'vue';
import useLoading from '@/hooks/loading';
import {
	createResultTables,
	createResultType,
	findResultTypes,
	updateResultType,
} from '@/api/results/results';
import ResultTableCreation from '@/views/results/result-type/component/result-table-creation.vue';
import {findDepartments} from "@/api/basic-data/organization";
import {Message} from "@arco-design/web-vue";
import {ResultTable, ResultType} from "@/types/results";
import {Department} from "@/types/basic-data";

export default {
  components: { ResultTableCreation },
  setup() {
    const { loading, setLoading } = useLoading();



    /** 表单数据准备 */
    const resultTypeOptions = ref<ResultType[]>([]);
		const departmentOptions = ref<Department[]>([]);
    onMounted(async () => {
      await findResultTypes({
        enablePagination: false,
        conditions: {},
        props: ['eid', 'name'],
      }).then((res) => {
        resultTypeOptions.value = res.data.list;
      });
			await findDepartments({
				enablePagination: false,
				conditions: {},
				props: ['eid', 'name'],
			}).then((res) => {
				departmentOptions.value = res.data.list;
			})
    });


		const res = ref<ResultType>()
		const findParentResultType = (rts: ResultType[], pid: number) => {
			if (res.value) return;

			for (let i = 0; i < rts.length; i++) {
				const rt = rts[i];
				if (rt.eid === pid) {
					res.value = rt;
					return;
				}

				if (rt.children && rt.children.length !== 0) {
					findParentResultType(rt.children, pid);
				}
			}
		}

		const parentResultTypeChanged = (pid: number) => {
			res.value = undefined;
			findParentResultType(resultTypeOptions.value, pid);
			const rt = res.value as unknown as ResultType;
			if (!rt) return;

			resultType.value.departmentId = rt.departmentId;
		}
    /** 表单数据准备 end */



    /** 步骤条 */
    const currentStep = ref(1);
    const stepVersion = reactive({
      prevStep: 0,
    });
    const prevStep = (currStep: number) => {
      if (currentStep.value === 2) {
        stepVersion.prevStep += 1;
      }
      currentStep.value = currStep - 1;
    };
    /** 步骤条 end */



    /** 成果类型创建与更新 */
    const resultType = ref<ResultType>({});
    const formRef = ref();
    const createResultTypeClick = () => {
			setLoading(true);
			const ok = false;
			// const ok = formRef.value?.validate();
      if (ok) {
				Message.warning('保存成果类型失败');
				setLoading(false);
      } else {
				resultType.value.isLeaf = true;
        if (stepVersion.prevStep >= 1) {
					updateResultType(resultType.value).then(() => {
						Message.success('更新成果类型成功');
						currentStep.value += 1;
					}).finally(() => { setLoading(false); });
          return;
        }
        createResultType(resultType.value).then((res) => {
					resultType.value.eid = res.data.eid;
					Message.success('创建成果类型成功');
          currentStep.value += 1;
        }).finally(() => { setLoading(false); });
      }
    };
    /** 成果类型创建与更新 end */


		const resultTables = ref<ResultTable[]>([]);
		const doCreateResultTable = () => {
			setLoading(true);
			resultTables.value.forEach(rt => {
				rt.resultTypeId = resultType.value.eid;
			})

			createResultTables(resultTables.value).then(() => {
				const msg = (resultTables.value && resultTables.value.length === 0) ?
						'创建成功' : '创建成功！快去录入数据叭~';
				Message.success(msg)
				currentStep.value += 1;
			}).finally(() => {
				setLoading(false);
			})
		}


    return {
      currentStep,
      loading,
      formRef,
      createResultTypeClick,
      prevStep,
      resultType,

      resultTypeOptions,
			departmentOptions,
			parentResultTypeChanged,

			resultTables,
			doCreateResultTable,
    };
  },
};
</script>

<style scoped lang="less">
.container {
  padding: 0 20px 40px 20px;
  overflow: hidden;
}

//:deep(.arco-table-th) {
//  &:last-child {
//    .arco-table-th-item-title {
//      margin-left: 16px;
//    }
//  }
//}

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

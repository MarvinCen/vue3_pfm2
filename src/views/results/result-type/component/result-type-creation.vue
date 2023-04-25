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
      <a-divider />
      <div v-if="currentStep === 1">
        <a-form ref="formRef" layout="vertical" :model="resultType">
          <a-space direction="vertical" :size="16">
            <a-card class="general-card">
              <template #title>
                {{ '基本信息' }}
              </template>
              <a-row :gutter="80">
                <a-col :span="8">
                  <a-form-item label="名称" field="resultType.name">
                    <a-input placeholder="请输入名称" />
                  </a-form-item>
                </a-col>
                <a-col :span="8">
                  <a-form-item label="父级成果类型" field="resultType.parentId">
                    <a-tree-select
                      :data="resultTypeTreeSelect"
                      placeholder="请选择父级成果类型（如果有）"
                    />
                  </a-form-item>
                </a-col>
                <a-col :span="8">
                  <a-form-item label="状态" field="resultType.status">
                    <a-select placeholder="请选择状态">
                      <a-option value="enable">启用</a-option>
                      <a-option value="disable">禁用</a-option>
                    </a-select>
                  </a-form-item>
                </a-col>
              </a-row>
              <a-form-item label="备注" field="resultType.remark">
                <a-textarea placeholder="请输入备注" />
              </a-form-item>
            </a-card>
            <a-card class="general-card" :bordered="false">
              <template #title>
                {{ '自定义数据' }}
              </template>
              <a-form-item field="resultType.customData">
                <a-textarea />
              </a-form-item>
            </a-card>
          </a-space>
        </a-form>
      </div>
      <div v-if="currentStep === 2">
        <a-tabs
          v-model:active-key="currentTabKey"
          position="left"
          :editable="true"
          auto-switch
          animation
          justify
          style="min-height: 320px"
          @change="resultTableTabSwitched"
          @tab-click="resultTableTabSwitched"
          @delete="deleteResultTableTab"
        >
          <template #extra>
            <div style="margin-top: 8px">
              <a-popconfirm @ok="newResultTableTab">
                <template #content>
                  给新创建的表格起个名字叭~
                  <a-form :model="newTableModel" auto-label-width>
                    <a-form-item
                      field="name"
                      :rules="newTableInputRules"
                      extra="当需要创建多个成果表时，给表格命名能够很好地区分它们."
                      :validate-status="nameResultTableStatus"
                      feedback
                      :label-col-props="{ span: 0 }"
                    >
                      <a-input v-model="newTableModel.name" />
                    </a-form-item>
                  </a-form>
                </template>
                <div style="margin: 0 36px">
                  <a-button shape="round">
                    <template #icon>
                      <icon-plus-circle-fill />
                    </template>
                  </a-button>
                </div>
              </a-popconfirm>
            </div>
          </template>
          <a-tab-pane
            v-for="tab in resultTableTabs"
            :key="tab.key"
            :title="tab.title"
          >
            <template #title>
              {{
                tab.title.length > 4
                  ? tab.title.substring(0, 4) + '...'
                  : tab.title
              }}
            </template>
            <result-table-creation :ref="tab.title" />
          </a-tab-pane>
        </a-tabs>
      </div>
      <div v-if="currentStep === 3">
        <a-result status="success" title="创建成功~">
          <template #extra>
            <a-space>
              <a-button
                type="primary"
                @click="
                  () => {
                    $router.push({ name: 'resultType' });
                  }
                "
                >返回列表</a-button
              >
            </a-space>
          </template>
        </a-result>
      </div>
      <div class="actions">
        <a-space>
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
            v-if="currentStep !== 3"
            type="primary"
            :loading="loading"
            @click="createResultTypeClick"
          >
            {{ currentStep === 1 ? '提交并下一步' : '完成' }}
          </a-button>
        </a-space>
      </div>
      <!--      <div style="line-height: 140px; text-align: center; color: #c9cdd4">-->
      <!--        Step 2 Content-->
      <!--      </div>-->
    </a-card>
  </div>
</template>

<script>
import { ref, getCurrentInstance, onMounted, reactive } from 'vue';
import useLoading from '@/hooks/loading';
import {
  createResultType,
  findResultTypes,
  updateResultType,
} from '@/api/results/results';
import ResultTableCreation from '@/views/results/result-type/component/result-table-creation.vue';

export default {
  components: { ResultTableCreation },
  setup() {
    const { loading, setLoading } = useLoading();
    const message =
      getCurrentInstance()?.appContext.config.globalProperties.$message;

    /** 表单数据准备 */
    const resultTypeTreeSelect = ref([]);
    onMounted(() => {
      findResultTypes({
        enablePagination: false,
        conditions: {},
        props: ['eid', 'name'],
      }).then((res) => {
        resultTypeTreeSelect.value = res.data.list;
      });
    });
    /** 表单数据准备 end */

    /** 步骤条 */
    const currentStep = ref(1);
    const stepVersion = reactive({
      prevStep: 0,
    });
    const prevStep = (currStep) => {
      if (currentStep.value === 2) {
        stepVersion.prevStep += 1;
      }
      currentStep.value = currStep - 1;
    };
    /** 步骤条 end */

    /** 成果类型创建与更新 */
    const resultType = ref({});
    const formRef = ref();
    const prevStepToUpdateResultType = () => {
      updateResultType(resultType.value).then(() => {
        message.success('更新成果类型成功');
      });
    };
    const createResultTypeClick = async () => {
      const res = await formRef.value?.validate();
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
      }, 1000);
      if (res) {
        message.warning('保存成果类型失败');
      } else {
        if (stepVersion.prevStep >= 1) {
          prevStepToUpdateResultType(resultType.value);
          currentStep.value += 1;
          return;
        }
        createResultType(resultType.value).then(() => {
          message.success('创建成果类型成功');
          currentStep.value += 1;
        });
      }
    };
    /** 成果类型创建 end */

    /** 成果表创建 */
    const newTableModel = ref({
      name: '',
    });
    const resultTableTabs = ref([]);
    const currentTabKey = ref('');
    const nameResultTableStatus = ref('');
    const newTableInputRules = [
      {
        validator: (value, cb) => {
          value = value.split(' ').join('');
          newTableModel.value.name = value;
          // eslint-disable-next-line no-restricted-syntax
          for (const tab of resultTableTabs.value) {
            if (!value) {
              cb('名称不能为空');
            }
            if (!value || value === tab.title) {
              cb('名称重复，请重新输入！');
              nameResultTableStatus.value = 'error';
            } else {
              nameResultTableStatus.value = 'success';
            }
          }
        },
      },
    ];
    const tableRefs = {};
    const newResultTableTab = () => {
      if (nameResultTableStatus.value === 'error') {
        newTableModel.value.name = '';
        return;
      }

      resultTableTabs.value.push({
        key: newTableModel.value.name,
        title: newTableModel.value.name,
      });
      tableRefs[newTableModel.value.name] = ref(null);
      currentTabKey.value = newTableModel.value.name;
      newTableModel.value.name = '';
    };
    const resultTableTabSwitched = (key) => {
      currentTabKey.value = key;
    };
    const deleteResultTableTab = (key) => {
      const rtTabs = resultTableTabs.value;
      if (currentTabKey.value === key && rtTabs.length !== 0) {
        currentTabKey.value = rtTabs[0].key;
      }
      // eslint-disable-next-line no-plusplus
      for (let i = 0; i < rtTabs.length; i++) {
        if (rtTabs[i].key === key) {
          rtTabs.splice(i, 1);
        }
      }
    };
    /** 成果表创建 end */

    return {
      currentStep,
      loading,
      formRef,
      createResultTypeClick,
      prevStepToUpdateResultType,
      prevStep,
      resultType,
      nameResultTableStatus,

      resultTypeTreeSelect,

      newTableModel,
      resultTableTabs,
      newResultTableTab,
      deleteResultTableTab,
      newTableInputRules,
      resultTableTabSwitched,
      currentTabKey,
      ...tableRefs,
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

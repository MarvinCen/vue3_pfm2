<template>
  <div class="container">
    <Breadcrumb
      :items="['成果管理', '成果类型', '新增成果类型']"
      :internationalization="false"
    />
    <a-card class="general-card" title="新增成果类型">
      <a-steps :current="currentStep" label-placement="vertical">
        <a-step>Succeeded</a-step>
        <a-step>Processing</a-step>
        <a-step>Pending</a-step>
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
        <div style="margin-bottom: 20px">
          <a-popconfirm @ok="newResultTableTab">
            <template #content>
              给这个表格起个名字叭~
              <a-form :model="newTableModel">
                <a-form-item field="name" :rules="newTableInputRules">
                  <a-input v-model="newTableModel.name" />
                </a-form-item>
              </a-form>
            </template>
            <a-button type="primary"> 新建表格 </a-button>
          </a-popconfirm>
          <a-divider direction="vertical" />
          <a-button type="primary" @click="newARow">新建一行</a-button>
        </div>
        <a-tabs position="left" :editable="true" auto-switch animation>
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
              <a-button type="primary">返回列表</a-button>
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
            @click="onSubmitClick"
          >
            {{ currentStep === 1 ? '提交并下一步' : '提交并完成' }}
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
import { ref, getCurrentInstance, onMounted } from 'vue';
import useLoading from '@/hooks/loading';
import { createResultType, findResultTypeList } from '@/api/results/results';
import ResultTableCreation from '@/views/results/result-type/component/result-table-creation.vue';

export default {
  components: { ResultTableCreation },
  setup() {
    const currentStep = ref(1);
    const { loading, setLoading } = useLoading();

    const resultTypeTreeSelect = ref([]);

    const resultType = ref({});
    const formRef = ref();
    const message =
      getCurrentInstance()?.appContext.config.globalProperties.$message;
    const onSubmitClick = async () => {
      const res = await formRef.value?.validate();
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
      }, 1000);
      if (res) {
        message.warning('保存成果类型失败');
      } else {
        createResultType(resultType.value).then(() => {
          message.success('创建成果类型成功');
          currentStep.value += 1;
        });
      }
    };

    const prevStep = (currStep) => {
      currentStep.value = currStep - 1;
    };

    const newTableModel = ref({
      name: '',
    });
    const resultTableTabs = ref([]);
    const newTableInputRules = [
      {
        validator: (value, cb) => {
          return new Promise((resolve) => {
            // eslint-disable-next-line no-restricted-syntax
            for (const tab of resultTableTabs.value) {
              if (value === tab.title) {
                cb('名称重复，请重新输入！');
              }
            }
            resolve();
          });
        },
      },
    ];
    const newResultTableTab = () => {
      resultTableTabs.value.push({
        key: newTableModel.value.name,
        title: newTableModel.value.name,
      });
    };
    const newARow = () => {
      // TODO
    };

    onMounted(() => {
      findResultTypeList({
        enablePagination: false,
        conditions: {},
        props: ['eid', 'name'],
      }).then((res) => {
        resultTypeTreeSelect.value = res.data.list;
      });
    });

    return {
      currentStep,
      loading,
      formRef,
      onSubmitClick,
      prevStep,
      resultType,

      resultTypeTreeSelect,

      newTableModel,
      resultTableTabs,
      newResultTableTab,
      newTableInputRules,
      newARow,
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

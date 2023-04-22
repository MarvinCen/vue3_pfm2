<template>
  <div class="container">
    <a-card class="general-card" title="">
      <div class="layout-demo">
        <a-layout>
          <a-layout>
            <a-layout-sider :resize-directions="['right']">
              <a-card
                hoverable
                :style="{ width: '100%', marginBottom: '20px' }"
              >
                <div
                  :style="{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }"
                >
                  <span
                    :style="{
                      display: 'flex',
                      alignItems: 'center',
                      color: '#1D2129',
                    }"
                  >
                    <a-avatar
                      :style="{
                        marginRight: '8px',
                        backgroundColor: '#165DFF',
                      }"
                      :size="28"
                    >
                      A
                    </a-avatar>
                    <a-typography-text>成果类型</a-typography-text>
                  </span>
                  <a-link>More</a-link>
                </div>
              </a-card>
              <a-tree
                :default-selected-keys="['0-0-1']"
                :data="resultTypeTree.list"
                :selected-keys="selectedResultType"
                :show-line="true"
                :check-strictly="true"
                size="small"
                @select="resultTypeOnSelected"
              >
                <template #icon>
                  <IconStar />
                </template>
              </a-tree>
            </a-layout-sider>
            <a-layout-content>
              <div style="height: 100%; width: 100%; margin-left: 10px">
                <a-empty v-if="noResultTypeSelected">
                  <template #image>
                    <icon-exclamation-circle-fill />
                  </template>
                  请先在左侧选择成果类型~
                </a-empty>
                <a-tabs
                  v-else
                  ref="resultTableTab"
                  :justify="true"
                  :animation="true"
                >
                  <a-tab-pane
                    v-for="table in resultTables.value"
                    :key="table.eid"
                    :title="table.name"
                  >
                    <template #title> <icon-nav /> {{ table.name }} </template>
                    <a-row style="margin-bottom: 16px">
                      <a-col :span="16">
                        <a-space>
                          <a-button type="primary">
                            <template #icon>
                              <icon-plus />
                            </template>
                            {{ $t('searchTable.operation.create') }}
                          </a-button>
                          <a-button>
                            <template #icon>
                              <icon-upload />
                            </template>
                            {{ $t('searchTable.operation.batchUpload') }}
                          </a-button>
                          <a-button>
                            <template #icon>
                              <icon-download />
                            </template>
                            {{ $t('searchTable.operation.download') }}
                          </a-button>
                        </a-space>
                      </a-col>
                      <a-col :span="8" style="text-align: right">
                        <a-space>
                          <a-button type="primary" status="danger">
                            <template #icon>
                              <icon-delete />
                            </template>
                            {{ $t('searchTable.operation.batchDelete') }}
                          </a-button>
                        </a-space>
                      </a-col>
                    </a-row>
                    <a-table
                      v-model:expandedKeys="expandedKeys"
                      row-key="eid"
                      :columns="columns"
                      :data="tableData.list"
                      :pagination="paginationProp"
                      :row-selection="rowSelection"
                      :row-click="rowClick"
                      @page-change="pageChange"
                      @page-size-change="pageSizeChange"
                    >
                      <template #operation="{}">
                        <div style="width: fit-content; margin: 0 auto">
                          <a-button status="success">{{
                            $t('global.operation.button.edit')
                          }}</a-button>
                          <a-divider direction="vertical" />
                          <a-button status="danger">{{
                            $t('global.operation.button.delete')
                          }}</a-button>
                        </div>
                      </template>
                    </a-table>
                  </a-tab-pane>
                </a-tabs>
              </div>
            </a-layout-content>
          </a-layout>
        </a-layout>
      </div>
    </a-card>
  </div>
</template>

<script lang="ts">
import { onMounted, reactive, ref, toRef } from 'vue';
import { useI18n } from 'vue-i18n';
import {
  PaginationProps,
  TableColumnData,
  TableRowSelection,
} from '@arco-design/web-vue';
import { BasePaginationSetting, Response } from '@/types/global';
import fetchPageList from '@/utils/request';
import { findResultTablesBy, findResultTypeList } from '@/api/results/results';
import { TableData } from '@arco-design/web-vue/es/table/interface';

const initFormModel = () => {
  return {
    name: '',
    departmentName: '',
    status: '',
  };
};
export default {
  setup() {
    const expandedKeys = ref([]);
    const { t } = useI18n();
    const formModel = ref(initFormModel());
    const pager: PaginationProps = reactive({
      current: 1,
      pageSize: 10,
      total: undefined,
      ...BasePaginationSetting,
    });
    pager.showJumper = false;
    pager.defaultPageSize = 5;
    const rowSelection: TableRowSelection = reactive({
      type: 'checkbox',
      showCheckedAll: true,
      checkStrictly: true,
    });

    const columns: TableColumnData[] = [
      {
        title: t('results.resultType.column.title.name'),
        dataIndex: 'name',
        ellipsis: true,
        tooltip: true,
        align: 'center',
      },
      {
        title: t('results.resultType.column.title.departmentName'),
        dataIndex: 'departmentName',
        ellipsis: true,
        tooltip: true,
        align: 'center',
      },
      {
        title: t('global.column.remark'),
        dataIndex: 'remark',
        ellipsis: true,
        tooltip: true,
        align: 'center',
      },
      {
        title: t('results.resultType.column.title.status'),
        dataIndex: 'status',
        ellipsis: true,
        tooltip: true,
        align: 'center',
      },
      {
        title: t('global.column.operation'),
        slotName: 'operation',
        align: 'center',
      },
    ];
    const tableData = reactive({
      list: [],
    });

    const reset = () => {
      formModel.value = initFormModel();
    };

    const search = () => {
      fetchPageList(
        {
          enablePagination: true,
          pager: {
            current: pager.current,
            pageSize: pager.pageSize,
            total: pager.total,
          },
          conditions: formModel.value,
        },
        {
          tableData,
          pager,
        },
        findResultTypeList
      );
    };
    function pageChange(page: number): number {
      pager.current = page;
      fetchPageList(
        {
          enablePagination: true,
          pager: {
            current: pager.current,
            pageSize: pager.pageSize,
          },
          conditions: formModel,
        },
        {
          tableData,
          pager,
        },
        findResultTypeList
      );
      return page;
    }

    const pageSizeChange = (pageSize?: number) => {
      pager.pageSize = pageSize;
    };

    const rowClick = (record?: TableData, event?: Event) => {
      // eslint-disable-next-line no-console
      console.log(record, event);
      // TODO do something
    };

    const resultTypeTree = reactive({
      list: [],
    });
    onMounted(() => {
      fetchPageList(
        {
          enablePagination: false,
          conditions: {}, // 利用数据规则
          props: ['eid', 'name'],
        },
        {
          tableData: resultTypeTree,
        },
        findResultTypeList
      );
    });

    const selectedResultType = ref([]); // actually only one selected in the array
    const resultTables = reactive({
      value: undefined,
    });
    const resultTableTab = ref(null);
    const noResultTypeSelected = ref(true);
    const resultTypeOnSelected = (
      checkedKeys: Array<string | number>,
      node: any
    ) => {
      const eid = checkedKeys[0] as number;
      findResultTablesBy(eid).then((res) => {
        const resp = res as Response;
        resultTables.value = resp.data.list;
      });
      noResultTypeSelected.value = false;
      return eid;
    };

    return {
      columns,
      tableData,
      expandedKeys,
      rowSelection,
      formModel,
      reset,
      search,
      paginationProp: pager,
      pageChange,
      pageSizeChange,
      rowClick,

      selectedResultType,
      resultTypeOnSelected,
      resultTypeTree,
      resultTables,
      resultTableTab,

      noResultTypeSelected,
    };
  },
};
</script>

<style scoped>
.layout-demo :deep(.arco-layout-sider-children),
.layout-demo :deep(.arco-layout-content) {
  display: flex;
  flex-direction: column;
  font-size: 16px;
  font-stretch: condensed;
}

.layout-demo :deep(.arco-layout-sider) {
  width: 206px;
  min-width: 150px;
  max-width: 500px;
  min-height: 500px;
  max-height: 500px;
}

.layout-demo {
  margin-top: 20px;
}
</style>

<template>
  <div class="container">
    <Breadcrumb :items="['menu.basicData', 'menu.basicData.employee']" />
    <a-card class="general-card">
      <a-row style="margin-bottom: 16px">
        <a-col :span="16">
          <a-space style="margin-top: 20px">
            <a-input-search :style="{ width: '320px' }" search-button />
          </a-space>
        </a-col>
        <a-col :span="8" style="text-align: right">
          <a-space style="margin-top: 20px">
            <a-button type="primary">
              <template #icon>
                <icon-plus />
              </template>
              {{ $t('searchTable.operation.create') }}
            </a-button>
          </a-space>
        </a-col>
      </a-row>
      <a-table
        v-model:expandedKeys="expandedKeys"
        row-key="eid"
        :columns="columns"
        :data="tableData.list"
        :pagination="pager"
        :row-selection="rowSelection"
        :scrollbar="false"
        :scroll="{ x: '150%', y: '200%' }"
        @row-click="rowClick"
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
    </a-card>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, reactive, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import {
  PaginationProps,
  TableColumnData,
  TableRowSelection,
} from '@arco-design/web-vue';
import { BasePaginationSetting } from '@/types/global';
import fetchPageList from '@/utils/request';
import { TableData } from '@arco-design/web-vue/es/table/interface';
import { findEmployees } from '@/api/basic-data/organization';

const initFormModel = () => {
  return {
    name: '',
  };
};

const expandedKeys = ref([]);
const { t } = useI18n();
const formModel = ref(initFormModel());
const pager: PaginationProps = reactive({
  current: 1,
  pageSize: 10,
  total: undefined,
  ...BasePaginationSetting,
});
const rowSelection: TableRowSelection = reactive({
  type: 'checkbox',
  showCheckedAll: true,
  checkStrictly: true,
});

const columns: TableColumnData[] = [
  {
    title: t('basicData.employee.column.title.name'),
    dataIndex: 'name',
    ellipsis: true,
    tooltip: true,
    align: 'center',
  },
  {
    title: t('basicData.employee.column.title.sex'),
    dataIndex: 'sex',
    ellipsis: true,
    tooltip: true,
    align: 'center',
  },
  {
    title: t('basicData.employee.column.title.jobNumber'),
    dataIndex: 'jobNumber',
    ellipsis: true,
    tooltip: true,
    align: 'center',
  },
  {
    title: t('basicData.employee.column.title.linkTel'),
    dataIndex: 'linkTel',
    ellipsis: true,
    tooltip: true,
    align: 'center',
  },
  {
    title: t('basicData.employee.column.title.birthDate'),
    dataIndex: 'birthDate',
    ellipsis: true,
    tooltip: true,
    align: 'center',
  },
  {
    title: t('basicData.employee.column.title.email'),
    dataIndex: 'email',
    ellipsis: true,
    tooltip: true,
    align: 'center',
  },
  {
    title: t('basicData.employee.column.title.hireType'),
    dataIndex: 'hireType',
    ellipsis: true,
    tooltip: true,
    align: 'center',
  },
  {
    title: t('basicData.employee.column.title.postSequenceLevel'),
    dataIndex: 'postSequenceLevel',
    ellipsis: true,
    tooltip: true,
    align: 'center',
  },
  {
    title: t('basicData.employee.column.title.status'),
    dataIndex: 'status',
    ellipsis: true,
    tooltip: true,
    align: 'center',
  },
  {
    title: t('global.column.operation'),
    slotName: 'operation',
    align: 'center',
    width: 180,
  },
];
const tableData = reactive({
  list: [],
});
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
    findEmployees
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
    findEmployees
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

onMounted(() => {
  fetchPageList(
    {
      enablePagination: true,
      pager: {
        current: BasePaginationSetting.defaultCurrent,
        pageSize: BasePaginationSetting.defaultPageSize,
        total: undefined,
      },
      conditions: {},
    },
    {
      tableData,
      pager,
    },
    findEmployees
  );
});
</script>

<style scoped lang="less">
.container {
  padding: 0 20px 20px 20px;
}
</style>

<template>
  <div class="container">
    <Breadcrumb :items="['menu.basicData', 'menu.basicData.department']" />
    <a-card class="general-card">
      <a-row style="margin-bottom: 16px">
        <a-col :span="16">
          <a-space style="margin-top: 20px">
            <multi-search
              :columns="columns"
              @search="search"
            />
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
import { findDepartments } from '@/api/basic-data/organization';
import MultiSearch from "@/components/table/multi-search.vue";

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
    title: t('basicData.department.column.title.name'),
    dataIndex: 'name',
    ellipsis: true,
    tooltip: true,
    align: 'center',
  },
  {
    title: t('basicData.department.column.title.officePhoneNumber'),
    dataIndex: 'officePhoneNumber',
    ellipsis: true,
    tooltip: true,
    align: 'center',
  },
  {
    title: t('basicData.department.column.title.faxNumber'),
    dataIndex: 'faxNumber',
    ellipsis: true,
    tooltip: true,
    align: 'center',
  },
  {
    title: t('basicData.department.column.title.remark'),
    dataIndex: 'remark',
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
const search = (formModel: any) => {
  fetchPageList(
    {
      enablePagination: true,
      pager: {
        current: pager.current,
        pageSize: pager.pageSize,
        total: pager.total,
      },
      conditions: formModel,
    },
    {
      tableData,
      pager,
    },
    findDepartments
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
    findDepartments
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
    findDepartments
  );
});
</script>

<style scoped lang="less">
.container {
  padding: 0 20px 20px 20px;
}
</style>

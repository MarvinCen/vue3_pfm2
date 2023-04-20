<template>
  <div class="container">
    <a-card class="general-card" :title="$t('menu.list.searchTable')">
      <a-row>
        <a-col :flex="1">
          <a-form
            :model="formModel"
            :label-col-props="{ span: 6 }"
            :wrapper-col-props="{ span: 18 }"
            label-align="left"
          >
            <a-row :gutter="16">
              <a-col :span="12">
                <a-form-item
                  field="name"
                  :label="$t('results.resultType.column.title.name')"
                >
                  <a-input
                    v-model="formModel.name"
                    :placeholder="
                      $t('results.resultType.column.placeholder.name')
                    "
                  />
                </a-form-item>
              </a-col>
              <a-col :span="12">
                <a-form-item
                  field="departmentName"
                  :label="$t('results.resultType.column.title.departmentName')"
                >
                  <a-input
                    v-model="formModel.departmentName"
                    :placeholder="
                      $t('results.resultType.column.placeholder.departmentName')
                    "
                  />
                </a-form-item>
              </a-col>
              <a-col :span="12">
                <a-form-item
                  field="status"
                  :label="$t('results.resultType.column.title.status')"
                >
                  <a-input
                    v-model="formModel.status"
                    :placeholder="
                      $t('results.resultType.column.placeholder.status')
                    "
                  />
                </a-form-item>
              </a-col>
            </a-row>
          </a-form>
        </a-col>
        <a-divider style="height: 84px" direction="vertical" />
        <a-col :flex="'86px'" style="text-align: right">
          <a-space direction="vertical" :size="18">
            <a-button type="primary" @click="search()">
              <template #icon>
                <icon-search />
              </template>
              {{ $t('searchTable.form.search') }}
            </a-button>
            <a-button @click="reset()">
              <template #icon>
                <icon-refresh />
              </template>
              {{ $t('searchTable.form.reset') }}
            </a-button>
          </a-space>
        </a-col>
      </a-row>
      <a-divider style="margin-top: 0" />
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
    </a-card>
  </div>
</template>

<script lang="ts">
import { onMounted, reactive, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { BasePaginationSetting } from '@/types/global';
import { findResultTypeList } from '@/api/results/results';
import {
  PaginationProps,
  TableColumnData,
  TableRowSelection,
} from '@arco-design/web-vue';
import { TableData } from '@arco-design/web-vue/es/table/interface.d';
import fetchPageList from '@/utils/request';

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
        findResultTypeList
      );
    });

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
    };
  },
};
</script>

<style scoped></style>

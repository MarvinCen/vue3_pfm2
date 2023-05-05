<template>
  <div class="container">
    <Breadcrumb
      :items="['成果管理', '成果类型']"
      :internationalization="false"
    />
    <a-card style="padding-top: 10px">
      <a-row style="margin-bottom: 16px">
        <a-col :span="16">
          <a-space>
            <multi-search :columns="columns" />
          </a-space>
        </a-col>
        <a-col :span="8" style="text-align: right">
          <a-space>
						<a-button
							type="primary"
							@click="$router.push('resultTypeCreation')"
						>
							<template #icon>
								<icon-plus />
							</template>
							{{ $t('searchTable.operation.create') }}
						</a-button>
						<a-button>
							<template #icon>
								<icon-download />
							</template>
							{{ $t('searchTable.operation.download') }}
						</a-button>
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
        <template #status="{ record }">
          <a-tag :color="record.status === 'enable' ? 'green' : 'orangered'">
            {{ record.status === 'enable' ? '已启用' : '已禁用' }}
          </a-tag>
        </template>
        <template #operation="{record}">
          <div style="width: fit-content; margin: 0 auto">
						<a-button
              size="small"
              :status="record.status === 'enable' ? 'warning' : 'success'"
            >
              {{ record.status === 'enable' ? '禁用' : '启用' }}
            </a-button>
						<a-divider direction="vertical" />
            <a-button size="small" status="normal">{{
              $t('global.operation.button.edit')
            }}</a-button>
            <a-divider direction="vertical" />
            <a-button size="small" status="danger">{{
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
import { findResultTypes } from '@/api/results/results';
import {
  PaginationProps,
  TableColumnData,
  TableRowSelection,
} from '@arco-design/web-vue';
import { TableData } from '@arco-design/web-vue/es/table/interface.d';
import fetchPageList from '@/utils/request';
import MultiSearch from "@/components/table/multi-search.vue";

const initFormModel = () => {
  return {
    name: '',
    departmentName: '',
    status: '',
  };
};

export default {
	components: {MultiSearch},
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
        slotName: 'status'
      },
      {
        title: t('global.column.operation'),
        slotName: 'operation',
        align: 'center',
        width: 270
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
        findResultTypes
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
        findResultTypes
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
        findResultTypes
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

<style scoped>
.container {
  padding: 0 20px 20px 20px;
}
</style>

<template>
  <div class="layout-demo">
		<a-layout>
			<a-layout-sider :resize-directions="['right']">
				<div style="margin-right: 8px">
					<a-card hoverable :bordered="false" :style="{ width: '100%' }">
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
                  <!--                <a-avatar-->
									<!--                  :style="{-->
									<!--                    marginRight: '8px',-->
									<!--                    backgroundColor: '#4b4c4e',-->
									<!--                  }"-->
									<!--                  :size="28"-->
									<!--                >-->
									<!--                  <icon-down />-->
									<!--                </a-avatar>-->
                  <strong style="font-size: 18px">成果类型</strong>
                </span>
							<a-button type="primary" shape="circle" size="small">
								<icon-search />
							</a-button>
						</div>
					</a-card>
					<a-scrollbar style="height: 430px; overflow: auto">
						<a-tree
							v-model:selected-keys="selectedResultType"
							:data="resultTypeTree.list"
							:show-line="true"
							:check-strictly="true"
							size="small"
							animation
							only-check-leaf
							block-node
							@select="resultTypeOnSelected"
						>
							<!--              <template #icon>-->
							<!--                <IconStar />-->
							<!--              </template>-->
						</a-tree>
					</a-scrollbar>
				</div>
			</a-layout-sider>
			<a-layout-content>
				<div style="height: 100%; width: 100%; margin-left: 10px">
					<div
						v-if="noResultTypeSelected"
						style="display: table; width: 100%; height: 90%"
					>
						<div style="display: table-cell; vertical-align: middle">
							<a-empty>
								<template #image>
									<icon-exclamation-circle-fill />
								</template>
								先在左侧选择成果类型~
							</a-empty>
						</div>
					</div>
					<a-tabs
						v-else
						ref="resultTableTab"
						:justify="true"
						:animation="true"
					>
						<template #extra>
							<strong style="position: absolute; right: 12px">成果表</strong>
						</template>
						<a-tab-pane
							v-for="table in resultTables.value"
							:key="table.eid"
							:title="table.name"
						>
							<template #title> <icon-nav /> {{ table.name }} </template>
							<a-row style="margin-bottom: 16px">
								<a-col :span="16">
									<a-space v-if="usageTypeRef === 'input'">
										<a-button type="primary">
											<template #icon>
												<icon-plus />
											</template>
											{{ $t('searchTable.operation.create') }}
										</a-button>
										<a-button status="success">
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
									<a-space v-if="usageTypeRef === 'audit'">
										<a-button type="primary">
											<template #icon>
												<icon-eye />
											</template>
											批量审核
										</a-button>
									</a-space>
									<a-space v-if="usageTypeRef === 'checkMine'">
										<a-button type="primary">
											<template #icon>
												<icon-eye />
											</template>
											新建
										</a-button>
										<a-button type="primary">
											<template #icon>
												<icon-down-circle />
											</template>
											下载
										</a-button>
										<a-button type="primary">
											<template #icon>
												<icon-user />
											</template>
											我负责的
										</a-button>
										<a-button type="primary">
											<template #icon>
												<icon-user-group />
											</template>
											我参与的
										</a-button>
									</a-space>
									<a-space v-if="usageTypeRef === 'distribution'">
										<a-button type="outline" status="success">
											<template #icon>
												<icon-filter />
											</template>
											全部
										</a-button>
										<a-button type="outline" status="warning">
											<template #icon>
												<icon-filter />
											</template>
											已分配
										</a-button>
										<a-button type="outline" status="danger">
											<template #icon>
												<icon-filter />
											</template>
											未分配
										</a-button>
										<a-input-search placeholder="" search-button/>
									</a-space>
								</a-col>
								<a-col :span="8" style="text-align: right">
									<a-space v-if="usageTypeRef == 'input'">
										<a-button type="primary" status="danger">
											<template #icon>
												<icon-delete />
											</template>
											{{ $t('searchTable.operation.batchDelete') }}
										</a-button>
									</a-space>
									<a-space v-if="usageTypeRef == 'audit'">
										<a-button status="success">
											<template #icon>
												<icon-check-circle-fill />
											</template>
											批量通过
										</a-button>
									</a-space>
									<a-space v-if="usageTypeRef === 'checkMine'">
										<a-button status="danger">
											<template #icon>
												<icon-delete />
											</template>
											批量删除
										</a-button>
									</a-space>
									<a-space v-if="usageTypeRef === 'distribution'">
										<a-button status="success">
											<template #icon>
												<icon-check-circle-fill />
											</template>
											确认成果分配结果
										</a-button>
										<!--											<a-button status="normal">-->
										<!--												<template #icon>-->
										<!--													<icon-check-circle-fill />-->
										<!--												</template>-->
										<!--												导出Excel-->
										<!--											</a-button>-->
									</a-space>
								</a-col>
							</a-row>
							<a-table
								v-model:expandedKeys="expandedKeys"
								row-key="rowId"
								:columns="columns"
								:data="tableData.list"
								:pagination="paginationProp"
								:row-selection="rowSelection"
								:row-click="rowClick"
								:scrollbar="false"
								:scroll="{ x: '150%', y: '200%' }"
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
  </div>
</template>

<script lang="ts">
import { onMounted, reactive, ref } from 'vue';
import { PaginationProps, TableRowSelection } from '@arco-design/web-vue';
import { BasePaginationSetting, Response } from '@/types/global';
import fetchPageList from '@/utils/request';
import {
  findResultTableColumns,
  findResultTableDataById,
  findResultTablesBy,
  findResultTypes,
} from '@/api/results/results';
import { TableData } from '@arco-design/web-vue/es/table/interface';
import { ResultTable } from '@/types/results';

const initFormModel = () => {
  return {
    name: '',
    departmentName: '',
    status: '',
  };
};
interface Data {
  [key: string]: unknown;
}
export default {
  props: {
    usageType: {
      type: String,
      required: true,
    },
  },
  setup(props: Data) {
    const usageTypeRef = ref(props.usageType);
    const expandedKeys = ref([]);
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

    const columns = ref<any[]>([]);
    // TODO 将每个tab选项卡的成果表数据独立出来
    const tableData = reactive({
      list: [],
    });

    const reset = () => {
      formModel.value = initFormModel();
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
        findResultTypes
      );
    });

    const selectedResultType = ref([]); // actually only one selected in the array
    const resultTables = reactive<{ value: ResultTable[] }>({
      value: [],
    });
    const resultTableTab = ref(null);
    const noResultTypeSelected = ref(true);
    const resultTypeOnSelected = (checkedKeys: Array<string | number>) => {
      const eid = checkedKeys[0] as number;
      findResultTablesBy(eid).then((r1) => {
        const resp = r1 as Response;
        resultTables.value = resp.data.list;

        if (!resultTables.value) {
          return;
        }
        const rt = resultTables.value[0];
        findResultTableColumns(rt.eid).then((r2) => {
          const { columns: rtColumns, resultTableId } = (r2 as Response).data;
          columns.value.splice(0);
          // eslint-disable-next-line no-plusplus
          for (let i = 0; i < rtColumns.length; i++) {
            const rtCol = rtColumns[i];
            const convertedCol = {
              title: rtCol.name,
              dataIndex: rtCol.name,
              ellipsis: true,
              tooltip: true,
              align: 'center',
              width: '',
            };
            if (i === 0) convertedCol.width = '80px';
            if (i === rtColumns.length - 1) convertedCol.width = '120px';
            columns.value.push(convertedCol);
          }
          findResultTableDataById(resultTableId).then((r3) => {
            const { list } = (r3 as Response).data;
            tableData.list = list;
          });
        });
      });
      noResultTypeSelected.value = false;
      return eid;
    };

    return {
      usageTypeRef,
      columns,
      tableData,
      expandedKeys,
      rowSelection,
      formModel,
      reset,
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

<style scoped lang="less">
.container {
  padding: 0 20px 20px 20px;
}

.layout-demo :deep(.arco-layout-sider-children),
.layout-demo :deep(.arco-layout-content) {
  display: flex;
  flex-direction: column;
  font-size: 16px;
  font-stretch: condensed;
}

.layout-demo :deep(.arco-layout-sider) {
  width: 230px;
  min-width: 180px;
  max-width: 500px;
  min-height: 597px;
  max-height: 597px;
}
</style>

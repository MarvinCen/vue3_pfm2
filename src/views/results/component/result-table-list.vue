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
							v-model:expanded-keys="expandedResultTypeIds"
							:data="resultTypeTree.list"
							:show-line="true"
							:check-strictly="true"
							:field-names="{ key: 'eid', title: 'name' }"
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
				<div style="height: 100%; width: 100%; padding-left: 10px">
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
						v-model:active-key="activeTableId as number"
						:justify="true"
						:animation="true"
						@change="switchTable"
					>
						<template #extra>
							<strong>成果表</strong>
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
										<a-button
												type="primary"
												@click="toCreateTableData"
										>
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
								v-model:selected-keys="selectedTableDataIds"
								row-key="eid"
								:columns="columns"
								:data="tableData.list"
								:pagination="paginationProp"
								:row-selection="rowSelection"
								:row-click="rowClick"
								:scrollbar="false"
								:scroll="{ x: '150%', y: '200%' }"
								@page-change="pageChange"
								@page-size-change="pageSizeChange"
								@select="selectTableData"
							>
								<template #status="{ record }">
									<a-tag
											v-if="record.metadata.status === '通过'"
											color="green"
											size="small"
									>
										{{ record.metadata.status }}
									</a-tag>
									<a-tag
											v-else-if="record.metadata.status === '驳回'"
											color="red"
											size="small"
									>
										{{ record.metadata.status }}
									</a-tag>
									<a-tag
											v-else-if="record.metadata.status === '草稿'"
											color="default"
											size="small"
									>
										{{ record.metadata.status }}
									</a-tag>
									<a-tag
											v-else-if="record.metadata.status === '待审核'"
											color="blue"
											size="small"
									>
										{{ record.metadata.status }}
									</a-tag>
									<a-tag
											v-else
											color="#f53f3f"
									>
										错误
									</a-tag>
								</template>
								<template #operation="{record, rowIndex}">
									<div style="width: fit-content; margin: 0 auto">
										<a-button
												size="small"
												status="normal"
												@click="toEditTableData(record)"
                    >
											{{ $t('global.operation.button.edit') }}
										</a-button>
										<a-divider direction="vertical" />
										<a-button
												size="small"
												status="danger"
												@click="toDeleteTableData()"
                    >
											{{ $t('global.operation.button.delete') }}
										</a-button>
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
import {onActivated, onMounted, reactive, ref, watch} from 'vue';
import {PaginationProps, TableColumnData, TableRowSelection, TreeNodeData} from '@arco-design/web-vue';
import { BasePaginationSetting, Response } from '@/types/global';
import {
	findResultTableDataById,
	findResultTypes2,
} from '@/api/results/results';
import { TableData } from '@arco-design/web-vue/es/table/interface';
import {ResultTable, ResultType} from '@/types/results';
import ResultData from "@/views/results/component/result-data-edit.vue";
import {useRouter} from "vue-router";
import util from '@/utils/common'

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
	components: {
		ResultData
	},
  props: {
    usageType: {
      type: String,
      required: true,
    },
  },
  setup(props: Data) {
    const usageTypeRef = ref(props.usageType);
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
			onlyCurrent: false,
    });

    const columns = ref<any[]>([]);
    const tableData = reactive({
      list: [],
    });

    const reset = () => {
      formModel.value = initFormModel();
    };

    function pageChange(page: number): number {
      pager.current = page;
      // TODO
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

    const resultTypeTree = reactive<{list: ResultType[]}>({
      list: [],
    });
    onMounted(() => {
      findResultTypes2({ withs: ['resultTables'] }).then(res => {
				const rTypes = res.data.list;
				console.log(rTypes)
				resultTypeTree.list = util.treeify(rTypes);
			})
    });
		onActivated(() => {
			findResultTypes2({ withs: ['resultTables'] }).then(res => {
				const rTypes = res.data.list;
				console.log(rTypes)
				resultTypeTree.list = util.treeify(rTypes);
			})

    })

    const selectedResultType = ref([]); // actually only one selected in the array
    const resultTables = reactive<{ value?: ResultTable[] }>({
      value: [],
    });
    const resultTableTab = ref(null);
    const noResultTypeSelected = ref(true);
		const expandedResultTypeIds = ref<number[]>([]);
		interface Data {
			selected?: boolean | undefined;
			selectedNodes: TreeNodeData[];
			node?: TreeNodeData | undefined;
			e?: Event | undefined;
		}
    const resultTypeOnSelected = (checkedKeys: Array<string | number>, data: Data) => {
			// 如果点击非叶子节点，只执行展开/收起动作
			const resultType = data.node as ResultType;
			if (!resultType.isLeaf) {
				const idx = expandedResultTypeIds.value.findIndex((val) => {
					return val === resultType.eid;
				});
				if (idx < 0)
					expandedResultTypeIds.value.push(resultType.eid as number);
				else
					expandedResultTypeIds.value.splice(idx, 1);
				return;
			}

			// 如果点击叶子节点，查询成果表及成果表数据
			resultTables.value = resultType.resultTables;
			if (!resultTables.value) {
				return;
			}

			// 获取table的columns
			const rt = resultTables.value[0];
			activeTableId.value = rt.eid;
			columns.value.splice(0);
			const newColumns = [];
			let rtColumns = rt.columns;
			if (!rtColumns || rtColumns.length === 0) {
				columns.value = [];
				rtColumns = [];
			}
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
				newColumns.push(convertedCol);
			}
			if (newColumns.length > 0) {
				newColumns.push({
					title: '状态',
					dataIndex: 'status',
					ellipsis: true,
					tooltip: true,
					align: 'center',
					width: 80,
					slotName: 'status',
					fixed: 'right'
				});
				newColumns.push({
					title: '操作',
					ellipsis: true,
					tooltip: true,
					align: 'center',
					width: 180,
					slotName: 'operation',
					fixed: 'right'
				});
			}
			columns.value = newColumns;

			// 查询数据
			findResultTableDataById(rt.eid as number, pager).then((r3) => {
				const { list, pager: page } = (r3 as Response).data;
				pager.total = page.total;
				pager.current = page.current;
				tableData.list = list;
			});

      noResultTypeSelected.value = false;
    };


		const activeTableId = ref<number>();
		const activeTable = ref<ResultTable>();
		watch(activeTableId, (value) => {
			activeTable.value = resultTables.value?.filter(rt => rt.eid === value)[0];
		})
		const switchTable = (tableId: number) => {
			findResultTableDataById(tableId, pager).then((r3) => {
				const { list, pager: page } = (r3 as Response).data;
				pager.total = page.total;
				pager.current = page.current;
				tableData.list = list;
			});
		}


		const selectedTableDataIds = ref([]);
		const selectTableData = () => {
			setTimeout(() => {
				console.log(selectedTableDataIds.value)
			}, 500)
		}


		const router = useRouter();
		const toCreateTableData = () => {
			router.push({
				path: 'resultTableDataEdit',
				query: {
					columns: JSON.stringify(activeTable.value?.columns),
					useForCreation: JSON.stringify(true),
				}
			})
		}
		const toEditTableData = (record: TableColumnData) => {
			router.push({
				path: 'resultTableDataEdit',
				query: {
					columns: JSON.stringify(activeTable.value?.columns),
					useForCreation: JSON.stringify(false),
					editable: JSON.stringify(true),
					record: JSON.stringify(record)
				}
			})
		}
		const toDeleteTableData = () => {

		}
		const toCheckTableData = (record: TableColumnData) => {
			router.push({
				path: 'resultTableDataEdit',
				query: {
					columns: JSON.stringify(activeTable.value?.columns),
					useForCreation: JSON.stringify(false),
					editable: JSON.stringify(false),
					record: JSON.stringify(record)
				}
			})
		}

    return {
      usageTypeRef,
      columns,
      tableData,
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
			expandedResultTypeIds,

      resultTables,
      resultTableTab,
			switchTable,
			activeTable,
			activeTableId,

      noResultTypeSelected,

			selectedTableDataIds,
			selectTableData,

			toCreateTableData,
			toDeleteTableData,
			toEditTableData,
			toCheckTableData,
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

<template>
  <div class="container">
    <Breadcrumb
      :items="['menu.evaluation', 'menu.evaluation.evaluationPlan']"
    />
    <a-card class="general-card">
      <a-row style="margin-bottom: 16px">
        <a-col :span="16">
          <a-space style="margin-top: 20px">
            <MultiSearch :columns="columns" @search="search" />
          </a-space>
        </a-col>
        <a-col :span="8" style="text-align: right">
          <a-space style="margin-top: 20px">
            <a-button
              type="primary"
              @click="$router.push('evaluationPlanCreation')"
            >
              <template #icon>
                <icon-plus />
              </template>
              {{ $t('searchTable.operation.create') }}
            </a-button>
          </a-space>
        </a-col>
      </a-row>
      <a-table
        v-model:selected-keys="selectedPlanIds"
        row-key="eid"
        :columns="columns"
        :data="tableData.list"
        :pagination="pager"
        :row-selection="rowSelection"
        @page-change="pageChange"
        @page-size-change="pageSizeChange"
      >
        <template #operation="{record}">
          <div style="width: fit-content; margin: 0 auto">
            <a-button
              status="success"
							@click="toCheckOrEdit(record, 'edit')"
						>
              {{ $t('global.operation.button.edit') }}
            </a-button>
            <a-divider direction="vertical" />
						<a-popconfirm
              position="left"
							content="你确定要删除吗？请确保与之关联的考核项目都已结束~"
              @ok="deletePlan(record)">
							<a-button
								status="danger"
							>
								{{ $t('global.operation.button.delete') }}
							</a-button>
            </a-popconfirm>
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
	Message,
	PaginationProps,
	TableColumnData,
	TableRowSelection,
} from '@arco-design/web-vue';
import { BasePaginationSetting, Response } from '@/types/global';
import fetchPageList from '@/utils/request';
import { TableData } from '@arco-design/web-vue/es/table/interface';
import {deleteEvaluationPlan, findEvaluationPlans} from "@/api/evaluation/evaluation-plan";
import MultiSearch from "@/components/table/multi-search.vue";
import {EvaluationPlan} from "@/types/evaluation";
import {useRouter} from "vue-router";

const initFormModel = () => {
  return {
    name: '',
  };
};

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
    title: t('evaluation.plan.column.title.name'),
    dataIndex: 'name',
    ellipsis: true,
    tooltip: true,
    align: 'center',
		fixed: 'left',
    width: 120,
  },
  {
    title: t('evaluation.plan.column.title.positions'),
    dataIndex: 'positions',
    ellipsis: true,
    tooltip: true,
    align: 'center',
  },
  {
    title: t('evaluation.plan.column.title.professionalTitles'),
    dataIndex: 'professionalTitles',
    ellipsis: true,
    tooltip: true,
    align: 'center',
  },
  {
    title: t('evaluation.plan.column.title.remark'),
    dataIndex: 'remark',
    ellipsis: true,
    tooltip: true,
    align: 'center',
  },
  {
    title: t('global.column.operation'),
    slotName: 'operation',
    align: 'center',
    width: 180,
    fixed: 'right',
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
    findEvaluationPlans
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
		findEvaluationPlans
  );
  return page;
}

const pageSizeChange = (pageSize?: number) => {
  pager.pageSize = pageSize;
};


const selectedPlanIds = ref<number[]>([]);

const deletePlan = (record: EvaluationPlan) => {
	const eid = record.eid;
  deleteEvaluationPlan(eid as number).then((res) => {
		if ((res as Response).code === 20000) {
			Message.success('删除成功');
			search({});
    }
		else Message.warning((res as Response).message as string)
  })

}


const router = useRouter();
const toCheckOrEdit = (plan: EvaluationPlan, opt: string) => {
	const query = {
		plan: JSON.stringify(plan),
    editable: JSON.stringify(opt !== 'check')
  }
	router.push({
		path: 'evaluationPlanEdit',
		query,
	})
}

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
		findEvaluationPlans
  );
});
</script>

<style scoped>
.container {
  padding: 0 20px 20px 20px;
}
</style>

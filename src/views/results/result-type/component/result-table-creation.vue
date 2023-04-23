<template>
  <a-row style="margin-bottom: 16px">
    <a-col :span="16">
      <a-space>
        <a-button type="primary" @click="newARow">
          <template #icon>
            <icon-plus />
          </template>
          新建一行
        </a-button>
        <a-button status="success" @click="newResultTable">
          <template #icon>
            <icon-save />
          </template>
          保存成果表
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
  <a-table :columns="tableDefColumns" :data="resultTables">
    <template #name="{ record }">
      <a-input v-model="record.name" style="max-width: 200px" />
    </template>
    <template #componentType="{ record }">
      <a-select v-model="record.componentType">
        <a-option
          v-for="componentType in componentTypes"
          :key="componentType.label"
        >
          {{ componentType.label }}
        </a-option>
      </a-select>
    </template>
    <template #dataType="{ record }">
      <a-select v-model="record.dataType">
        <a-option v-for="dataType in dataTypes" :key="dataType.label">
          {{ dataType.label }}
        </a-option>
      </a-select>
    </template>
    <template #unique="{ record }">
      <a-select v-model="record.unique" default-value="否">
        <a-option>是</a-option>
        <a-option>否</a-option>
      </a-select>
    </template>
    <template #nullable="{ record }">
      <a-select v-model="record.nullable" default-value="否">
        <a-option>是</a-option>
        <a-option>否</a-option>
      </a-select>
    </template>
    <template #example="{ record }">
      <a-input v-model="record.example" />
    </template>
    <template #designateAs="{ record }">
      <a-select v-model="record.designateAs" default-value="无">
        <a-option>无</a-option>
        <a-option>负责人</a-option>
        <a-option>参与人</a-option>
      </a-select>
    </template>
    <template #operation="{ record }">
      <a-button status="danger" @click="deleteRow(record)">删除</a-button>
    </template>
  </a-table>
</template>

<script>
import { getCurrentInstance, ref } from 'vue';
import { createResultTable } from '@/api/results/results';

export default {
  setup() {
    const message =
      getCurrentInstance()?.appContext.config.globalProperties.$message;

    const resultTables = ref([]);
    const tableDefColumns = [
      {
        dataIndex: 'name',
        title: '名称',
        align: 'center',
        slotName: 'name',
        width: 220,
      },
      {
        dataIndex: 'componentType',
        title: '组件类型',
        align: 'center',
        slotName: 'componentType',
        width: 147,
      },
      {
        dataIndex: 'dataType',
        title: '数据类型',
        align: 'center',
        slotName: 'dataType',
        width: 130,
      },
      {
        dataIndex: 'unique',
        title: '是否唯一',
        align: 'center',
        slotName: 'unique',
        width: 113,
      },
      {
        dataIndex: 'nullable',
        title: '是否可以为空',
        align: 'center',
        slotName: 'nullable',
        width: 138,
      },
      {
        dataIndex: 'example',
        title: '示例数据',
        align: 'center',
        slotName: 'example',
      },
      {
        dataIndex: 'designateAs',
        title: '指定为',
        align: 'center',
        slotName: 'designateAs',
        width: 147,
      },
      {
        title: '操作',
        align: 'center',
        slotName: 'operation',
      },
    ];
    const componentTypes = [
      {
        label: '文本框',
      },
      {
        label: '多选框',
      },
      {
        label: '单选框',
      },
      {
        label: '数字输入框',
      },
    ];
    const dataTypes = [
      {
        label: '文本',
      },
      {
        label: '整数',
      },
      {
        label: '小数',
      },
      {
        label: '金额',
      },
      {
        label: '二值',
      },
    ];

    const resultTablesGetter = () => {
      return resultTables.value;
    };
    const newARow = () => {
      resultTables.value.push({});
    };
    const deleteRow = (record) => {
      const { name } = record;
      // eslint-disable-next-line no-plusplus
      for (let i = 0; i < resultTables.value.length; i++) {
        if (resultTables.value[i].name === name) {
          resultTables.value.splice(i, 1);
          return;
        }
      }
    };
    const newResultTable = () => {
      createResultTable(resultTables.value).then(() => {
        message.success('创建成果表成功~');
      });
    };

    return {
      resultTables,
      tableDefColumns,
      componentTypes,
      dataTypes,

      resultTablesGetter,
      newARow,
      deleteRow,
      newResultTable,
    };
  },
};
</script>

<style scoped></style>

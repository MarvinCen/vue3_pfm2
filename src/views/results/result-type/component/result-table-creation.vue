<template>
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
  </a-table>
</template>

<script>
import { reactive } from 'vue';

export default {
  setup() {
    const resultTables = reactive([]);
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
      return resultTables;
    };
    const newARow = () => {
      resultTables.push({});
    };

    return {
      resultTables,
      tableDefColumns,
      componentTypes,
      dataTypes,

      resultTablesGetter,
      newARow,
    };
  },
};
</script>

<style scoped></style>

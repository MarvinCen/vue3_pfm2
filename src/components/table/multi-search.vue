<template>
  <div style="display: flex">
    <div style="position: absolute; top: -5px">
      <a-space>
				<a-tag
               v-for="(val,key) in titleValue"
               :key="key"
							 closable
               color="cyan"
               size="small"
        >
          {{ key + '：' + val }}
        </a-tag>
      </a-space>
    </div>
    <a-select
      v-model:model-value="currSelect"
      v-model:input-value="currInput"
      style="width: 170px">
      <a-option v-for="col in columns" :key="col.dataIndex">
        {{ col.title }}
      </a-option>
    </a-select>
		<a-input-search
      search-button
      :placeholder="inputSearchPlaceholder()"
      @input="onInput"
      @search="search"
    />
	</div>
</template>

<script setup lang="ts">
import {ref} from "vue";
import {TableColumnData} from "@arco-design/web-vue";

const props =defineProps({
  columns: {
		type: Array,
    default: () => ([])
  }
});

let columns = props.columns as TableColumnData[];
columns = columns.filter((col) => {
	return col.title !== '操作' && col.title !== 'operation'
});
const formModel = ref<any>({});
const titleValue = ref<any>({});
const currSelect = ref();
const currInput = ref();

const onInput = (val: string) => {
	const col = getColBy(currSelect.value) as TableColumnData;
	formModel.value[col.dataIndex as string] = val;
	titleValue.value[col.title as string] = val;
	if (!val || val === '') {
	  delete formModel.value[col.dataIndex as string];
		delete titleValue.value[col.title as string];
  }
}
const getColBy = (title: string) => {
	for (let col of columns) {
		if (col.title === title) {
			return col;
    }
  }
	return null;
}

const emit = defineEmits(['search']);
const search = () => {
  emit('search', formModel.value);
}

const inputSearchPlaceholder = () => {
	if (currSelect.value) {
		return '请输入' + currSelect.value;
  }
	else return '请先选择要搜索的字段';
}
</script>

<style scoped lang="less">

</style>
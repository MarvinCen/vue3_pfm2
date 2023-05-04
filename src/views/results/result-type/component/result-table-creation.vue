<template>
	<a-tabs
		v-model:active-key="currTabKey"
		position="left"
		:editable="true"
		auto-switch
		animation
		justify
		style="min-height: 320px"
		@change="rtTabChanged"
		@tab-click="rtTabChanged"
		@delete="deleteRtTab"
	>
		<template #extra>
			<div style="margin-top: 8px">
				<a-popconfirm @ok="newRtTab">
					<template #content>

						<a-form :model="newTableModel" auto-label-width>
							<a-form-item
								field="name"
								title="表名称"
								:rules="tableNameInputRules"
								extra="当需要创建多个成果表时，给表格命名能够很好地区分它们."
								:validate-status="rtNameValidRes"
								feedback
								:label-col-props="{ span: 2 }"
							>
								<a-input
										placeholder="请输入成果表名称"
										v-model="newTableModel.name"
								/>
							</a-form-item>
							<a-form-item
									field="inputWay"
									title="录入方式"
									:label-col-props="{ span: 2 }"
							>
								<a-select
										placeholder="请选择录入方式"
										v-model="newTableModel.inputWay"
								>
									<a-option>部门录入</a-option>
									<a-option>个人录入</a-option>
								</a-select>
							</a-form-item>
						</a-form>
					</template>
					<div style="margin: 0 36px">
						<a-button shape="round">
							<template #icon>
								<icon-plus-circle-fill />
							</template>
						</a-button>
					</div>
				</a-popconfirm>
			</div>
		</template>
		<a-tab-pane
			v-for="rt in rts"
			:key="rt.name"
			:title="rt.name"
		>
			<template #title>
				{{
					(rt.name as string).length > 4
              ? (rt.name as string).substring(0, 4) + '...'
              : rt.name
				}}
			</template>
			<a-row style="margin-bottom: 16px">
				<a-col :span="16">
					<a-space>
						<a-button type="primary" @click="newARow()">
							<template #icon>
								<icon-plus />
							</template>
							新建一行
						</a-button>
					</a-space>
				</a-col>
			</a-row>
			<a-table :columns="tableDefColumns" :data="rt.columns as TableData[]">
				<template #name="{ record }">
					<a-input
							v-model="record.name"
							style="max-width: 200px"
							@change="onChanged()"
					/>
				</template>
				<template #componentType="{ record }">
					<a-select
							v-model="record.componentType"
							@change="onChanged()"
					>
						<a-option
							v-for="componentType in componentTypeOptions"
							:key="componentType.label"
							:value="componentType.value"
						>
							{{ componentType.label }}
						</a-option>
					</a-select>
				</template>
				<template #dataType="{ record }">
					<a-select
							v-model="record.dataType"
							@change="onChanged()"
					>
						<a-option
								v-for="dataType in dataTypeOptions"
								:key="dataType.label"
								:value="dataType.value"
						>
							{{ dataType.label }}
						</a-option>
					</a-select>
				</template>
				<template #unique="{ record }">
					<a-select
							v-model="record.unique"
							default-value="否"
							@change="onChanged()"
					>
						<a-option value="true">是</a-option>
						<a-option value="false">否</a-option>
					</a-select>
				</template>
				<template #nullable="{ record }">
					<a-select
							v-model="record.nullable"
							default-value="否"
							@change="onChanged()"
					>
						<a-option value="true">是</a-option>
						<a-option value="false">否</a-option>
					</a-select>
				</template>
				<template #example="{ record }">
					<a-input
							v-model="record.example"
							@change="onChanged()"
					/>
				</template>
				<template #designateAs="{ record }">
					<a-select
							v-model="record.designateAs"
							default-value=""
							@change="onChanged()"
					>
						<a-option></a-option>
						<a-option>负责人姓名</a-option>
						<a-option>参与人</a-option>
					</a-select>
				</template>
				<template #operation="{ record }">
					<a-button status="danger" @click="deleteRow(record)">删除</a-button>
				</template>
			</a-table>
		</a-tab-pane>
	</a-tabs>
</template>

<script lang="ts" setup>
import { ref, defineProps, defineEmits } from 'vue';
import { TableColumnData } from "@arco-design/web-vue";
import { RColumn, dataTypeOptions, componentTypeOptions, ResultTable } from "@/types/results";
import { TableData } from "@arco-design/web-vue/es/table/interface";

const props = defineProps({
	resultTables: {
		required: true,
		type: Array,
		default() {
			return [];
		},
	}
})
const emit = defineEmits(['update:resultTables'])
const rts = ref<ResultTable[]>(props.resultTables as ResultTable[]);

/** 成果表Tab选项卡创建 */
const newTableModel = ref({
	name: '',
	inputWay: '部门导入',
});
const currTabKey = ref<string>('');
const rtNameValidRes = ref<"error" | "success" | "warning" | "validating" | undefined>(undefined);
const tableNameInputRules = [
	{
		validator: (value: string, cb: any) => {
			if (!value) {
				cb('名称不能为空');
			}

			value = value.split(' ').join('');
			newTableModel.value.name = value;
			for (const rt of rts.value) {
				if (!value || value === rt.name) {
					cb('名称重复，请重新输入！');
					rtNameValidRes.value = 'error';
				} else {
					rtNameValidRes.value = 'success';
				}
			}
		},
	},
];
const newRtTab = () => {
	if (rtNameValidRes.value === 'error') {
		newTableModel.value.name = '';
		return;
	}

	rts.value.push({
		name: newTableModel.value.name,
		inputWay: newTableModel.value.inputWay,
		columns: [],
	})
	emit('update:resultTables', rts.value)

	currTabKey.value = newTableModel.value.name;
	newTableModel.value.name = '';  // reset
};
const rtTabChanged = (key: string) => {
	currTabKey.value = key;
};
const deleteRtTab = (key: string) => {
	if (currTabKey.value === key && rts.value.length !== 0) {
		currTabKey.value = rts.value[0].name as string;
	}

	for (let i = 0; i < rts.value.length; i++) {
		const name = rts.value[i].name;
		if (name === key) {
			rts.value.splice(i, 1);
			emit('update:resultTables', rts.value)
		}
	}
};
/** 成果表Tab选项卡创建 end */





const tableDefColumns: TableColumnData[] = [
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
const getCurrRt = () => {
	for (let rt of rts.value) {
		if (rt.name === currTabKey.value) {
			return rt;
		}
	}
}
const newARow = () => {
	const rt = getCurrRt();
	if (!rt) return;
	rt.columns = rt.columns || [];
	rt.columns.push({});
	emit('update:resultTables', rts);
};
const deleteRow = (record: RColumn) => {
	const { name } = record;
	const rt = getCurrRt();
	if (!rt) return;
	rt.columns = rt.columns || [];
	for (let i = 0; i < rt.columns.length; i++) {
		if (rt.columns[i].name === name) {
			rt.columns.splice(i, 1);
			emit('update:resultTables', rts);
			return;
		}
	}
};

const onChanged = () => {
	emit('update:resultTables', rts);
}
</script>

<style scoped></style>

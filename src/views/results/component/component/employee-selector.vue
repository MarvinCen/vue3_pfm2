<template>
  <a-form
			:model="metadata"
			label-align="right"
			:label-col-props="{ span: 2 }"
	>
    <a-row :gutter="25">
      <a-col :span="24">
				<a-form-item label="负责人">
					<a-select
						v-model="metadata.directorId"
						style="width: 400px"
						allow-clear
						allow-search
						:options="employees"
						:field-names="{ label: 'name', value: 'eid' }"
						@change="onSelectDirector"
					>
						<template #label="record">
							{{
								record.data.name +
								(record.data.jobNumber ? ' [' + record.data.jobNumber + ']' : '')
							}}
						</template>
					</a-select>
				</a-form-item>
      </a-col>
    </a-row>
		<a-row :gutter="25">
			<a-col :span="24">
				<a-form-item label="参与人员">
					<a-table
						:columns="columns"
						:data="participants"
						:pagination="false"
          >
						<template #type="{ record }">
							<a-select
									v-model="record.type"
									@change="onChangeType(record)"
							>
								<a-option>校内教师</a-option>
								<a-option>校外</a-option>
								<a-option>学生</a-option>
							</a-select>
						</template>
						<template #name="{ record }">
							<a-select
									v-if="record.type === '校内教师'"
									v-model="record.eidOrName"
									allow-clear
									allow-search
									:options="employees"
									:field-names="{ label: 'name', value: 'eid' }"
									@change="onSelectParticipant(record)"
							>
								<template #label="record">
									{{
										record.data.name +
										(record.data.jobNumber ? ' [' + record.data.jobNumber + ']' : '')
									}}
								</template>
							</a-select>
							<a-input
									v-else
									v-model="record.eidOrName"
									@change="onChangeEidOrName()"
							/>
						</template>
						<template #jobNumber="{ record }">
							<a-input
									allow-clear
									v-model="record.jobNumber"
									@change="onChangeJobNumber(record)"
							/>
						</template>
						<template #operation="{ record }">
							<a-button
									size="small"
									@click="newARow()"
							>
								<icon-plus-circle-fill />
							</a-button>
							<a-divider direction="vertical" />
							<a-button
									size="small"
									@click="removeRow(record)"
							>
								<icon-minus-circle-fill />
							</a-button>
						</template>
					</a-table>
				</a-form-item>
			</a-col>
		</a-row>

  </a-form>
</template>

<script setup lang="ts">
import {Metadata} from "@/types/results";
import {Message, TableColumnData} from "@arco-design/web-vue";
import {Employee} from "@/types/basic-data";
import {computed, onMounted, ref} from "vue";
import {findEmployees} from "@/api/basic-data/organization";

const props = defineProps({
	metadata: {
		required: true,
		type: Object
	}
})
const emit = defineEmits(['update:metadata'])
const metadata = computed<Metadata>({
	get() {
		return props.metadata;
	},
	set(value) {
		emit('update:metadata', value)
  }
})

interface Participant {
	type?: string;
	eidOrName?: string;
	jobNumber?: string;
}
const columns: TableColumnData[] = [
	{
		dataIndex: 'type',
		title: '类型',
		align: 'center',
		ellipsis: true,
		slotName: 'type'
	},
	{
		dataIndex: 'name',
		title: '姓名',
		align: 'center',
		ellipsis: true,
		slotName: 'name'
	},
	{
		dataIndex: 'jobNumber',
		title: '工号/学号/单位',
		align: 'center',
		ellipsis: true,
		slotName: 'jobNumber'
	},
	{
		title: '操作',
		align: 'center',
		ellipsis: true,
		slotName: 'operation'
	}
]
const participants = ref<Participant[]>([]);
participants.value.push({})

const employees = ref<Employee[]>([]);
onMounted(() => {
	findEmployees({
		enablePagination: false
	}).then((res) => {
		employees.value = res.data.list;
	})
})


const newARow = () => { participants.value.push({}) };
const removeRow = (record: any) => {
	participants.value.splice(record, 1);
	if (participants.value.length === 0) {
		participants.value.push({})
	}
}

const getEmployee = (eid: number) => {
	return employees.value.filter(e => {
		return e.eid === eid;
	})[0];
}


const onSelectParticipant = (record: Participant) => {
	if (record.eidOrName === metadata.value.directorId) {
		Message.warning('参与人中不能包含负责人')
		record.eidOrName = '';
		return;
	}
	record.jobNumber = employees.value.filter(e => {
		return e.eid === record.eidOrName;
	})[0].jobNumber;
	setMetadataFromTable();
}

const onSelectDirector = (eid: number) => {
	if (metadata.value.participantIds?.includes(eid)) {
		Message.warning('负责人不能在参与人列表中')
		metadata.value.directorId = undefined
    return;
	}

	const employee = getEmployee(eid);
	metadata.value.directorId = eid;
	metadata.value.directorName = employee.name;
	metadata.value.directorJobNumber = employee.jobNumber;
	emit('update:metadata', metadata)
}

const onChangeType = (record: Participant) => {
	if (record.eidOrName) record.eidOrName = ''
}

const onChangeEidOrName = () => {
	setMetadataFromTable()
}

const onChangeJobNumber = (record: Participant) => {
	if (record.type === '校内教师') {
		record.jobNumber =
				getEmployee(record.eidOrName as unknown as number).jobNumber;
	}
  setMetadataFromTable()
}

const setMetadataFromTable = () => {
	console.log(666)
	let participantsStr = '';
	let participantIds: number[] = [];
	let participantNames: string[] = [];

	for (let i = 0; i < participants.value.length; i++) {
		const p = participants.value[i];
		const type = p.type === '校内教师' ? '' : '（' + p.type + '）';
		if (p.type === '校内教师') {
			const name = getEmployee(p.eidOrName as unknown as number).name;
			participantsStr += type + name + '[' + p.jobNumber + ']' + ', ';
			participantIds.push(Number(p.eidOrName));
			participantNames.push(name as string);
		}
		else {
			const jn = p.jobNumber ? p.jobNumber : '';
			participantsStr += type + p.eidOrName + '[' + jn + ']' + ', ';
			participantIds.push(-1);
			participantNames.push(p.eidOrName as string);
		}
	}
	metadata.value.participants = participantsStr;
	metadata.value.participantIds = participantIds;
	metadata.value.participantNames = participantNames;
}

</script>

<style scoped>

</style>
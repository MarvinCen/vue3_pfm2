<template>
  <div class="container">
		<Breadcrumb
				:items="['成果数据', pageType()]"
				:internationalization="false"
		/>
		<a-form
				:model="record"
				:label-col-props="{span: 8, offset: 0}"
				label-align="left"
				auto-label-width
		>
			<a-card title="负责人与参与人" style="padding: 20px;">
				<employee-selector
							v-model:metadata="record.metadata"
				/>
			</a-card>
			<a-card title="表单" style="padding: 20px; margin-top: 20px">
				<a-row :gutter="0">
					<a-col
							v-for="col in filteredColumns"
							:key="col.name"
							:span="8"
					>
						<a-form-item
								:field="col.name as string"
								:label="(col.name as string) + '：'"
						>
							<input-component
									:component="col.componentType"
									v-model="record[col.name]"
									@data-change="(value) => {record[col.name] = value}"
							/>
						</a-form-item>
					</a-col>
				</a-row>
			</a-card>
			<a-card title="附件" style="padding: 20px; margin: 20px 0 80px">
				<a-upload draggable action="/" />
			</a-card>
		</a-form>
	</div>

  <div class="actions">
    <a-space>
			<a-button @click="cancel()">返回</a-button>
			<a-button
					v-if="pageType() === '创建成果'"
					status="warning"
					@click="saveFor('draft')"
			>
				暂存
			</a-button>
			<a-button
        v-if="pageType() === '创建成果'"
        status="success"
        @click="saveFor('create')"
      >
        保存
      </a-button>
			<a-button
        v-if="pageType() === '编辑成果'"
				status="success"
        @click="saveFor('update')"
      >
        保存
      </a-button>
    </a-space>
  </div>
</template>

<script setup lang="ts">
import InputComponent from "@/views/results/component/component/input-component.vue";
import {designateAsOptions, Metadata, RColumn} from "@/types/results";
import {useRoute, useRouter} from "vue-router";
import EmployeeSelector from "@/views/results/component/component/employee-selector.vue";
import moment from "moment";
import {createResultData} from "@/api/results/results";
import {Message} from "@arco-design/web-vue";
import {ref} from "vue";
const route = useRoute();
const props: {
	columns?: string;
	record?: any;
	editable?: string;
	useForCreation?: string;
} = route.query;
const columns: RColumn[] = JSON.parse(props.columns as string)as RColumn[];
const directorNameCol = ref<RColumn>({});
const participantsCol = ref<RColumn | undefined>(undefined);
const jobNumberCol = ref<RColumn | undefined>(undefined);
const filteredColumns: RColumn[] = columns.filter(c => {
	if (!c.designateAs) return true;
	if (c.designateAs === designateAsOptions.directorName)
		directorNameCol.value = c;
	if (c.designateAs === designateAsOptions.participant)
		participantsCol.value = c;
  if (c.designateAs === designateAsOptions.jobNumber)
		jobNumberCol.value = c;
	return false;
})

let record: Record<string, any> = {};
if (props.record) record = JSON.parse(props.record);
console.log(record)
record.metadata = {}

let editable: boolean = false;
if (props.editable) editable = JSON.parse(props.editable);

let useForCreation: boolean = false;
if (props.useForCreation) useForCreation = JSON.parse(props.useForCreation);

const pageType = () => {
	if (useForCreation) return '创建成果';
	else if (editable) return '编辑成果';
	else return '查看成果';
}



const resolveConvertingCircularStructureToJSON = (metadata: Metadata) =>{
	const copy: Metadata = {
		createDatetime: metadata.createDatetime,
		updateDatetime: metadata.updateDatetime,
		importerId: metadata.importerId,
		importerName: metadata.importerName,
		directorId: metadata.directorId,
		directorName: metadata.directorName,
		participantIds: metadata.participantIds,
		participantNames: metadata.participantNames,
		participants: metadata.participants,
		status: metadata.status,
		pfmResultsIds: metadata.pfmResultsIds,
	}
	return copy;
}
const computeStatus = (metadata: Metadata, usage: string) => {
	// TODO 需要成果表的录入类型
	return usage === 'draft' ? '草稿' : '待审核';
}

const router = useRouter();
const saveFor = (usage: string) => {
	const metadata = record.metadata as Metadata;
	if (useForCreation) {
		metadata.createDatetime = moment(Date.now()).format('YYYY-MM-DD HH:mm:ss')
	}
	metadata.updateDatetime = moment(Date.now()).format('YYYY-MM-DD HH:mm:ss')
	metadata.status = computeStatus(metadata, usage)
	// TODO
	metadata.importerId = 9999;
	metadata.importerName = '管理员';

	record[directorNameCol.value.name as string] = metadata.directorName;
	if (participantsCol.value)
		record[participantsCol.value?.name as string] = metadata.participants;
	if (jobNumberCol.value) {
		record[jobNumberCol.value.name as string] = metadata.directorJobNumber;
	}

	console.log(record)
	record.metadata = resolveConvertingCircularStructureToJSON(record.metadata);
	createResultData(record).then(() => {
		Message.success('保存成功');
		router.push('inputResult')
	})
}
const cancel = () => {
	router.go(-1);
}
</script>

<style scoped>
.container {
	padding: 0 20px;
}

.actions {
	position: fixed;
	left: 0;
	right: 0;
	bottom: 0;
	height: 60px;
	padding: 14px 20px 14px 0;
	background: var(--color-bg-2);
	text-align: right;
}
</style>
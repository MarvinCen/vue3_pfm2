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
				<a-row :gutter="0">
					<a-col
							v-for="col in columns"
							:key="col.name"
							:span="8"
					>
						<a-form-item
								:v-if="![
							'#EmployeeSelector',
							 '#StudentInput'
						].includes(col.componentType?.type as string)"
								:field="col.name as string"
								:label="(col.name as string) + '：'"
						>
							<input-component
									:component="col.componentType"
									v-model:model-value="record[col.name]"
									@data-change="(value) => {record[col.name] = value}"
							/>
						</a-form-item>
					</a-col>
				</a-row>
			</a-card>
			<a-card title="表单" style="padding: 20px; margin-top: 20px">
				<a-row :gutter="0">
					<a-col
							v-for="col in columns"
							:key="col.name"
							:span="8"
					>
						<a-form-item
								:v-if="![
							'#EmployeeSelector',
							 '#StudentInput'
						].includes(col.componentType?.type as string)"
								:field="col.name as string"
								:label="(col.name as string) + '：'"
						>
							<input-component
									:component="col.componentType"
									v-model:model-value="record[col.name]"
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
			<a-button @click="cancel">返回</a-button>
			<a-button
        v-if="pageType() === '创建成果'"
        status="success"
        @click="save"
      >
        保存
      </a-button>
			<a-button
        v-if="pageType() === '编辑成果'"
				status="success"
        @click="update"
      >
        保存
      </a-button>
    </a-space>
  </div>
</template>

<script setup lang="ts">
import InputComponent from "@/views/results/component/component/input-component.vue";
import {ResultTableColumn} from "@/types/results";
import {log} from "echarts/types/src/util/log";
import {useRoute, useRouter} from "vue-router";
const route = useRoute();
const props: {
	columns?: string;
	record?: any;
	editable?: string;
	useForCreation?: string;
} = route.query;
const columns: ResultTableColumn[] = JSON.parse(props.columns as string)as ResultTableColumn[];

let record: Record<string, any> = {};
if (props.record) record = JSON.parse(props.record);
console.log(record)

let editable: boolean = false;
if (props.editable) editable = JSON.parse(props.editable);

let useForCreation: boolean = false;
if (props.useForCreation) useForCreation = JSON.parse(props.useForCreation);

const pageType = () => {
	if (useForCreation) return '创建成果';
	else if (editable) return '编辑成果';
	else return '查看成果';
}


const router = useRouter();
const save = () => {

}
const update = () => {

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
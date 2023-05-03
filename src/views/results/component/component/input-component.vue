<template>
  <div>
    <a-input
      v-if="_cp.type === 'TextInput'"
			v-model="modelValue as string"
			@change="onChange"
    />
		<a-input-number
      v-else-if="_cp.type === 'IntInput'"
			v-model="modelValue as number"
      mode="button"
      :precision="0"
      :step="1"
			@change="onChange"
    />
		<a-input-number
			v-else-if="_cp.type === 'DecInput'"
			v-model="modelValue as number"
			mode="button"
			:precision="0.01"
			:step="0.01"
			@change="onChange"
		/>
		<a-input-number
			v-else-if="_cp.type === 'MoneyInput'"
			v-model="modelValue as number"
			mode="button"
			:precision="0.01"
			:step="0.01"
      :formatter="(value) => {
				const values = value.split('.');
        values[0]=values[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
				return values.join('.');
      }"
      :parser="(value) => {
        return value.replace(/,/g, '');
			}"
			@change="onChange"
		/>
		<a-radio-group
				v-else-if="[
				'StrRadio',
				].includes(_cp.type as string)"
				v-model="modelValue as string"
				@change="onChange"
		>
			<a-radio
					v-for="(item, index) in _cp.params.options"
					:key="index"
					:value="item"
			/>
		</a-radio-group>
		<a-radio-group
				v-else-if="[
				'IntRadio',
				'DecRadio',
				].includes(_cp.type as string)"
				v-model="modelValue as number"
				@change="onChange"
		>
			<a-radio
					v-for="(item, index) in _cp.params.options"
					:key="index"
					:value="item"
			/>
		</a-radio-group>
		<a-checkbox-group
				v-else-if="[
				'IntCheckbox',
				'DecCheckbox',
				'StrCheckbox',
				'Checkbox',
				].includes(_cp.type as string)"
				v-model="modelValue as (number | string)[]"
				@change="onChange"
		>
			<a-checkbox
          v-for="(item, index) in _cp.params.options"
          :key="index"
          :value="item"
      />
		</a-checkbox-group>
		<a-select
				v-else-if="[
				'DecSelector',
				'IntSelector',
				'StrSelector',
				'Selector'
				].includes(_cp.type as string)"
				v-model="modelValue as string| number| Record<string, any>| (string | number | Record<string, any>)[]"
				:multiple="_cp.params.multiple"
				@change="onChange"
		>
			<a-option
					v-for="(item, index) in _cp.params.options"
					:key="index"
					:value="item"
			/>
		</a-select>
		<a-date-picker
				v-else-if="_cp.type === 'DatePicker'"
				v-model="modelValue"
				@change="onChange"
		/>
		<a-date-picker
				v-else-if="_cp.type === 'DatetimePicker'"
				show-time
				format="YYYY-MM-DD HH:mm:ss"
				v-model="modelValue"
				@change="onChange"
		/>
		<a-range-picker
				v-else-if="_cp.type === 'DateRangePicker'"
				format="YYYY-MM-DD"
				v-model="modelValue as (string | number | Date)[] | undefined"
				@change="onChange"
		/>
		<a-range-picker
				v-else-if="_cp.type === 'DatetimeRangePicker'"
				show-time
				format="YYYY-MM-DD"
				v-model="modelValue as (string | number | Date)[] | undefined"
				@change="onChange"
		/>

  </div>
</template>

<script setup lang="ts">
import {ComponentType} from "@/types/results";
import {watch} from "vue";

const props = defineProps({
	component: {
		required: true,
    type: Object,
    validator: (component: ComponentType) => {
      return [
				'DatetimeRangePicker', 'DateRangePicker', 'DatetimePicker', 'DatePicker',
				'StrSelector', 'IntSelector', 'DecSelector',
				'DecCheckbox', 'IntCheckbox', 'StrCheckbox',
				'DecRadio', 'IntRadio', 'StrRadio', 'TextRadio',
				'MoneyInput', 'DecInput', 'IntInput', 'TextInput',
				'#Attachment', '#EmployeeSelector', '#StudentInput'
			].findIndex((value) => {
				return value === component.type as string;
			}) >= 0;
    },
		default: () => {},
	},
	modelValue: {
		required: true,
    default: '',
	},
});

const _cp = props.component as ComponentType;
let val: any = props.modelValue;
if (!val) val = '';
const emit = defineEmits(['update:modelValue', 'dataChange'])
// watch(val, (value) => {
// 	emit('dataChange', value);
// })

const onChange = (value: any) => {
	emit('update:modelValue', value);
}
</script>

<style scoped lang="less">

</style>
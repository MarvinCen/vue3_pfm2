import {Department} from "@/types/basic-data";
import {BaseEntity} from "@/types/global";

export interface ResultType extends BaseEntity {
  key?: number;
  title?: string;
  eid?: number;
  parentId?: number;
  name?: string;
  departmentId?: number;
  departmentName?: string;
  department?: Department;
  customData?: string;
  isLeaf?: boolean;
  status?: 'enable' | 'disable';
  children?: ResultType[];
  resultTables?: ResultTable[];
  remark?: string;
}

export interface ResultTable extends BaseEntity {
  eid?: number;
  resultTypeId?: number;
  name?: string;
  inputWay?: string;
  columns?: RColumn[];
}

export interface ComponentType {
  type: string;
  params?: any;
}

export const componentTypeOptions = [
  {
    label: '文本框',
    value: '文本框'
  },
  {
    label: '选择器',
    value: '选择器'
  },
  {
    label: '时间选择器',
    value: '时间选择器'
  },
  {
    label: '单选框',
    value: '单选框'
  },
  {
    label: '多选框',
    value: '多选框'
  },
  {
    label: '文本域',
    value: '文本域'
  },
]
export const dataTypeOptions = [
  {
    label: '文本',
    value: '文本',
  },
  {
    label: '整数',
    value: '整数',
  },
  {
    label: '小数',
    value: '小数',
  },
  {
    label: '日期时间',
    value: '日期时间',
  },
  {
    label: '日期',
    value: '日期',
  },
  {
    label: '时间',
    value: '时间',
  },
  {
    label: '年份',
    value: '年份',
  },
]

export interface RColumn {
  eid?: number;
  resultTableId?: number;
  name?: string;
  componentType?: ComponentType;
  dataType?: string;
  unique?: boolean;
  nullable?: boolean;
  example?: string;
  designateAs?: '负责人姓名' | '参与人' | '工号' | undefined;
}
export const designateAsOptions = {
  directorName: '负责人姓名',
  participant: '参与人',
  jobNumber: '工号',
  all: [
    '负责人姓名',
    '参与人',
    '工号'
  ],
}

export interface Metadata {
  eid?: number;
  createDatetime?: Date | string;
  updateDatetime?: Date | string;
  importerId?: number;
  importerName?: string;
  directorId?: number;
  directorName?: string;
  directorJobNumber?: string;
  participantIds?: number[];
  participantNames?: string[];
  participants?: string;
  status?: '草稿' | '待审核' | '驳回' | '通过';
  pfmResultsIds?: number[];
}



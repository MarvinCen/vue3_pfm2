import {Department} from "@/types/basic-data";

export interface ResultType {
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

export interface ResultTable {
  eid?: number;
  resultTypeId?: number;
  name?: string;
  inputWay?: string;
  columns?: ResultTableColumn[];
}

export interface ResultTableColumn {
  eid?: number;
  resultTableId?: number;
  name?: string;
  componentType?: string;
  dataType?: string;
  unique?: boolean;
  nullable?: boolean;
  example?: string;
  designateAs?: string;
}

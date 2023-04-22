export interface ResultType {
  key?: number;
  title?: string;
  eid: number;
  parentId: number;
  name: string;
  departmentId: number;
  departmentName: string;
  customData?: string;
  isLeaf: boolean;
  status: 'enable' | 'disable';
  children: ResultType[];
  remark: string;
}

export interface ResultTable {
  eid: number;
  resultTypeId: number;
  name: string;
}

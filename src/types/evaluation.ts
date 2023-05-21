import {BaseEntity} from "@/types/global";
import {Rule} from "@/types/rule";

export interface Result {
  eid?: number;
  rowId?: number;
  row?: any;
  projectId?: number;
  planId?: number;
  tableId?: number;
  workload?: number;
  indicatorId?: number;
  indicatorName?: string;
  tip?: string;
}

export interface Matcher {
  indicatorId?: number;
  tableId?: number;
  tableName?: string;
  filters?: Filter[];
}

export interface Filter {
  columnId?: number;
  operator?: '等于' | '包含'
  value?: string;
}

export interface Indicator extends BaseEntity {
  eid?: number;
  parentId?: number;
  evaluationPlanId?: number;
  name?: string;
  isLeaf?: boolean;
  code?: string;
  score?: number;
  unitScore?: number;
  unit?: string;
  ratio?: number;
  limitScore?: number;
  limitItem?: number;
  children?: Indicator[];
  matcher?: Matcher;
  results?: Result[];
  tableId?: number;
}

export interface EvaluationPlan extends BaseEntity {
  eid?: number;
  organizationId?: number;
  name?: string;
  positions?: string[];
  professionalTitles?: string[];
  indicatorRoot?: Indicator;
  customData?: string;
  dataGrabRuleId?: number;
  dataGrabRule?: Rule;
  remark?: string;
  grabResultData?: Function;
}

export interface EvaluationProject extends BaseEntity {
  eid?: number;
  organizationId?: number;
  type?: string;
  year?: number;
  name?: string;
  startTime?: Date | string;
  endTime?: Date | string;
  resultCheckedExpireTime?: Date | string;
  pfmCheckedExpireTime?: Date | string;
  status?: string;
  evaluationPlans?: EvaluationPlan[];
  evaluationPlanIds?: number[];
  dataGrabRuleId?: number;
  dataGrabRule?: Rule;
}

export const projectStatus = {
  allStatus: [
    '未启动',   // 点击创建时
    '数据录入', // 点击启动时
    '成果分配', // 开放分配时
    '绩效计算', // 点击计算时
    '绩效公示', // 开放公示时
    '绩效分配', // 开放分配时
    '已结束',  // 点击结束时
  ],
  unStarted: '未启动',
  input: '数据录入',
  resultDistribution: '成果分配',
  pfmCalculation: '绩效计算',
  pfmAnnouncement: '绩效公示',
  pfmDistribution: '绩效分配',
  finished: '已结束'
}


export interface EvaEmployee extends BaseEntity {
  name?: string;
  jobNumber?: string;
  position?: string;
  positionLevel?: string;
  hireType?: string;
  needToCalc?: boolean;
  planId?: number;
  projectId?: number;
}

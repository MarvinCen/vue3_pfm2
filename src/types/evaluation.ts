import {BaseEntity} from "@/types/global";

export interface Result {

}

export interface ResultMatcher {

}

export interface Indicator extends BaseEntity {
  eid?: number;
  parentId?: number;
  evaluationPlanId?: number;
  name?: string;
  isLeaf?: boolean;
  code?: string;
  score?: number;
  unit?: string;
  ratio?: number;
  limitScore?: number;
  limitItem?: number;
  children?: Indicator[];
  resultMatchers?: ResultMatcher[];
  results?: Result[];
}

export interface EvaluationPlan extends BaseEntity {
  eid?: number;
  organizationId?: number;
  name?: string;
  positions?: string[];
  professionalTitles?: string[];
  indicatorRoot?: Indicator;
  customData?: string;
  remark?: string;
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
}

export const projectStatus = {
  allStatus: [
    '未启动',   // 点击创建时
    '数据录入', // 点击启动时
    '成果分配', // 开放分配时
    '绩效公示', // 开放公示时
    '绩效分配', // 开放分配时
    '已结束',  // 点击结束时
  ],
  unStarted: '未启动',
  input: '数据录入',
  resultDistribution: '成果分配',
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
}

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
  startTime?: Date;
  endTime?: Date;
  resultCheckedExpireTime?: Date;
  pfmCheckedExpireTime?: Date;
  status?: string;
  evaluationPlans?: EvaluationPlan[];
  evaluationPlanIds?: number[];
}

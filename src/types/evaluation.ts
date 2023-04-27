export interface Result {

}

export interface ResultMatcher {

}

export interface Indicator {
  eid?: number;
  parentId?: number;
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

export interface EvaluationPlan {
  eid?: number;
  organizationId?: number;
  name?: string;
  positions?: string[];
  professionalTitles?: string[];
  indicatorRoot?: Indicator;
  customData?: string;
  remark?: string;
}

export interface EvaluationProject {
  eid?: number;
  organizationId?: number;
  name?: string;
  startTime?: Date;
  endTime?: Date;
  resultCheckedExpireTime?: Date;
  pfmCheckedExpireTime?: Date;
  status?: string;
  evaluationPlans?: EvaluationPlan[];
}

export interface Indicator {
  eid?: number;
  name?: string;
}

export interface EvaluationPlan {
  eid?: number;
  organizationId?: number;
  name?: string;
  positions?: string[];
  professionalTitles?: string[];
  indicatorRoot: Indicator;
  customData: string;
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

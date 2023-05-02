import axios from 'axios';
import Mock from 'mockjs';
import {ReqPagerParams} from "@/types/global";
import { EvaluationPlan, Indicator } from '@/types/evaluation';

// eslint-disable-next-line import/prefer-default-export
export function findEvaluationPlans(reqPagerParams: ReqPagerParams) {
  reqPagerParams.conditions = reqPagerParams.conditions ? reqPagerParams.conditions : {};
  reqPagerParams.conditions.organizationId = Number(Mock.Random.id());
  return axios.get('/evaluation/evaluationPlans', {
    params: {
      reqPagerParams,
    },
  });
}

export function findEmployeeByPlanFilter(positions: string[], professionalTitle: string[]) {
  return axios.get('/common/organization/employees', {
    params: {
      positions,
      professionalTitle,
    }
  })
}

export function createEvaluationPlan(evaluationPlan: EvaluationPlan) {
  return axios.post('/evaluation/evaluationPlan', {
    evaluationPlan,
  });
}

export function updateEvaluationPlan(evaluationPlan: EvaluationPlan) {
  return axios.put('/evaluation/evaluationPlan', {
    evaluationPlan,
  });
}

export function deleteEvaluationPlan(eid: number) {
  return axios.delete(`/evaluation/evaluationPlan/${eid}`);
}

export function createIndicator(indicator: Indicator) {
  return axios.post('/evaluation/indicator', {
    indicator
  });
}

export function findIndicatorsBy(planId: number) {
  return axios.get('/evaluation/indicators', {
    params: {
      planId,
    },
  })
}
